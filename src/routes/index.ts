import { readUsers, writeUser } from "../helpers/fileDB";
import parseBody from "../helpers/parseBody";
import { addRoutes } from "../helpers/RouteHandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    message: "Hello from node with typescript..",
    path: req.url,
  });
});

addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, {
    message: "Health status ok",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  const users = readUsers();
  const newUser = {
    ...body,
  };

  users.push(newUser);

  writeUser(users);

  sendJson(res, 200, { status: true, body });
});

addRoutes("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;

  const body = await parseBody(req);
  const users = readUsers();

  const index = users.findIndex((user: any) => user.id === Number(id));

  if (index === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  const updatedUser = {
    ...users[index],
    ...body,
  };

  users[index] = updatedUser;

  writeUser(users);

  res.statusCode = 200;
  res.end(JSON.stringify(updatedUser));
});
