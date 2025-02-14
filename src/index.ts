import express, { Express, json, Request, Response, urlencoded } from "express";
import appRouter from "./routers";
import dotenv from "dotenv";
import token_verify from "./middlewares/token_verify";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

appRouter.notUseMiddleware(app);
app.use(token_verify.tokenVerify);
appRouter.useAuthMiddleware(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
