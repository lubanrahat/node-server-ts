import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 8080,
  PORT: process.env.PORT,
};

export default ENV;
