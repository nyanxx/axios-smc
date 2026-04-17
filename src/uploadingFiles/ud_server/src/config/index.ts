interface Config {
  port: number;
  nodeEnv: "development" | "testing" | "production";
  secretKey: Buffer | undefined;
  isDevEnv: boolean;
  allowedOrigins: string[];
}

const port = process.env.PORT ? +process.env.PORT : 3001;
const sk = process.env.SECRET_KEY_CUSTOM_JWT;
const secretKey = sk ? Buffer.from(sk, "utf-8") : undefined;
const nodeEnv = (process.env.NODE_ENV as Config["nodeEnv"]) || "development";

const config: Config = {
  port,
  nodeEnv,
  secretKey: secretKey,
  isDevEnv: nodeEnv === "development",
  allowedOrigins: [
    // "http://www.yoursite.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
  ],
};

export default config;
