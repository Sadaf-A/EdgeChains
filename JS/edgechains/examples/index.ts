import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import DatabaseConnection from "./src/config/db.js";
import { HydeSearchRouter } from "./src/routes/hydeSearch.route.js";
import { view } from './htmljs'
import ExampleLayout from "./src/layouts/app.js";

DatabaseConnection.establishDatabaseConnection();

const app = new Hono();

app.route("/", HydeSearchRouter);

app.get("/", view(ExampleLayout));
serve(app, () => {
  console.log("server running on port 3000");
});
