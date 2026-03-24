// Interceptor for handling expired / invalid token and refreshing them
import axios, { type AxiosInstance } from "axios";
import { createServer, Response } from "miragejs";

/**
 * Creates a fake mirage.js server to simulate "api/refresh" and "api/protected" endpoint
 * @returns Server
 */
export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "api";
      this.logging = false;

      // Protected route that sometimes fails with 401
      this.get("/protected", (_schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        if (authHeader === "Bearer valid-token") {
          return { data: "Secret data" };
        }
        return new Response(401, {}, { error: "Unauthorized" });
      });

      // Refresh endpoint
      this.get("/refresh", () => {
        // Always return a new token for testing
        return { token: "valid-token" };
      });
    },
  });

  return server;
}

makeServer(); // Server initilization

/**
 * In order to not fall in infinite loop you can follow the following methods
 *
 * Method 1: Using isRetry flag in axion instance
 * Add isRetry:false as default to the axio instance config (add global augmentation in .d.ts if necessary)
 *
 * ```ts
 * import "axios";
 * declare module "axios" {
 *     export interface AxiosRequestConfig {
 *         isRetry?: boolean;
 *     }
 * }
 * ```
 */
export const refreshTestingWithIsRetry: AxiosInstance = axios.create({
  isRetry: false,
});

refreshTestingWithIsRetry.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.error(
      `Status Code:${err.status} - Cannot get data from "api/protected" route (Unauthorized)`,
    );
    if (err.response?.status === 401 && !err.config.isRetry) {
      // Get a new token
      try {
        console.log("Performing refresh of token");
        const newToken = await axios.get("/api/refresh", {
          withCredentials: true,
        });
        console.log("Adding new token...");
        err.config.headers.Authorization = `Bearer ${newToken.data.token}`;
        console.log(
          "Token is refreshed (a new token has been fetched from '/api/refresh' and added in header.authorization)",
        );
        // Retry the failed request
        console.log("Retrying the failed request to '/api/protected'");
        return refreshTestingWithIsRetry({ ...err.config, isRetry: true });
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  },
);

// Usage
const tryMethodOne = () => {
  refreshTestingWithIsRetry
    .get("/api/protected", {
      headers: {
        Authorization: `Bearer ${"invalid-token"}`,
      },
    })
    .then((res) => console.log(res));
};

/**
 * Method 2: Simpler version of _retry flag (without global augmentation)
 */
export const refreshTestingWithRequestURL = axios.create();

refreshTestingWithRequestURL.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.error(
      `Status Code:${err.status} - Cannot get data from "api/protected" route (Unauthorized)`,
    );
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true;
      // Get a new token
      try {
        console.log("Performing refresh of token");
        const newToken = await axios.get("/api/refresh", {
          withCredentials: true,
        });
        console.log("Adding new token...");
        err.config.headers.Authorization = `Bearer ${newToken.data.token}`;
        console.log(
          "Token is refreshed (a new token has been fetched from '/api/refresh' and added in header.authorization)",
        );
        // Retry the failed request
        console.log("Retrying the failed request to '/api/protected'");
        return refreshTestingWithRequestURL(err.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  },
);

// Usage
const tryMethodTwo = () => {
  refreshTestingWithRequestURL
    .get("/api/protected", {
      headers: {
        Authorization: `Bearer ${"invalid-token"}`,
      },
    })
    .then((res) => console.log(res));
};

tryMethodOne();
tryMethodTwo();
