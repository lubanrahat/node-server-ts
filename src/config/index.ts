import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ?? 8080,
};

export default ENV;
