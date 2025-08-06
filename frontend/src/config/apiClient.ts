import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";

export type ApiErrorResponse = {
  errorCode?: string; // npr. "InvalidAccessToken"
  message?: string; // opcioni opis greške
};

type QueueItem = {
  resolve: () => void;
  reject: (err: unknown) => void;
};

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const options = {
  baseURL: import.meta.env.VITE_API_URL as string | undefined,
  withCredentials: true, // šalje i prima kolačiće
};

// Ovde koristimo odvojen client da izbegnemo beskonačne loop-ove u interceptoru
const TokenRefreshClient: AxiosInstance = axios.create(options);

TokenRefreshClient.interceptors.response.use((r: AxiosResponse) => r.data);

const API: AxiosInstance = axios.create(options);

// --- STATE promenljive za kontrolu refresh logike ---

// Flag koji kaže da li se trenutno radi refresh tokena
let isRefreshing = false;

// Lista requestova koji su dobili 401 dok se refresh dešava
// Svaki element ima funkcije resolve/reject — to su Promise callbackovi
let failedQueue: QueueItem[] = [];

// Funkcija koja "prazni" red čekanja (failedQueue) nakon refresh-a
// Ako je refresh uspeo -> zovi resolve na sve, ako nije -> zovi reject
const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error); // obavesti sve da refresh nije uspeo
    } else {
      resolve(); // obavesti sve da refresh jeste uspeo
    }
  });
  failedQueue = []; // očisti queue posle obrade
};

// --- Interceptor za API instancu ---
// On "presreće" SVAKI response
API.interceptors.response.use(
  // Ako je response uspešan, vrati samo `data` (kao u originalnom JS kodu)
  (response: AxiosResponse) => response.data,

  // Ako je response neuspešan (error):
  async (err: unknown) => {
    // Pretvaramo error u AxiosError tipizovan sa ApiErrorResponse
    const error = err as AxiosError<ApiErrorResponse>;

    // Originalna konfiguracija requesta (path, method, headers...) — koristi se za retry
    const originalConfig = error.config as RetryableRequestConfig | undefined;

    if (!error.response) {
      return Promise.reject(error);
    }

    // HTTP status kod (npr. 401, 404...)
    const status = error.response?.status;

    // Podaci iz backend greške (mogu biti undefined)
    const data = error.response?.data;

    // Ako je greška 401 + specifični errorCode "InvalidAccessToken"
    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      // Ako nemamo originalConfig (nema requesta koji retry-ujemo), nema smisla retry
      if (!originalConfig) {
        // Očisti cache podataka i redirektuj na login
        queryClient.clear();
        navigate("/login", {
          state: { redirectUrl: window.location.pathname },
        });
        return Promise.reject(error);
      }

      if (originalConfig._retry) {
        return Promise.reject(error);
      }

      originalConfig._retry = true;

      // Ako refresh već traje:
      if (isRefreshing) {
        // Dodaj se u queue i čekaj dok refresh ne završi
        // koristimo Promise<void>
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // nakon što se resolve-uje (bez vrednosti), retry-uj originalni request
            return API.request(originalConfig);
          })
          .catch((queueErr) => Promise.reject(queueErr));
      }

      // Ako refresh ne traje — pokrećemo ga sada
      isRefreshing = true;

      try {
        // Pokušaj refresh-a tokena (GET /auth/refresh)
        await TokenRefreshClient.request({
          method: "get",
          url: "/auth/refresh",
        });

        // Refresh uspeo → obavesti sve iz queue-a da mogu retry-ovati
        processQueue(null);

        // Ponovi originalni request
        return API.request(originalConfig);
      } catch (refreshErr) {
        // Refresh nije uspeo → obavesti sve iz queue-a da propadnu
        processQueue(refreshErr);

        // Očisti podatke iz React Query cache-a
        queryClient.clear();

        // Pošalji korisnika na login, uz redirect nazad posle logina
        navigate("/login", {
          state: { redirectUrl: window.location.pathname },
        });

        // Vrati grešku
        return Promise.reject(refreshErr ?? error);
      } finally {
        // Refresh više ne traje
        isRefreshing = false;
      }
    }

    // Za sve druge greške (npr. 404, 500...) — vrati originalni AxiosError
    return Promise.reject(error);
  }
);

export default API;

/*import axios, { AxiosError, type AxiosInstance } from "axios";
import queryClient from "./queryClient";
import { navigate } from "@/lib/navigation";

export type ApiErrorResponse = {
  errorCode: string;
  message?: string;
  // dodaj ostala polja koja backend vraća ako treba
};

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient: AxiosInstance = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API: AxiosInstance = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ApiErrorResponse>) => {
    // try to refresh the access token behind the scenes
    if (
      error.response?.status === 401 &&
      error.response.data?.errorCode === "InvalidAccessToken"
    ) {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(error.config!); //! ovo je problematicno jer config moze biti undefined
      } catch {
        queryClient.clear();
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }

    return Promise.reject({
      status: error.response?.status,
      ...(error.response?.data as object),
    });
  }
);

export default API;*/
