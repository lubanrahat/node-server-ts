import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const filePath = path.join(dir, "user.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]");
}

export function readUsers() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function writeUser(users: any) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
