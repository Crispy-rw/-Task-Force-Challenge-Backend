import express from "express";

const routes = express.Router();

/**
 * CHEAT SHEET
 * -------------------------------------------------------------------------------------------------- *
 * HTTP   |  CRUD     |  Entire Collection (e.g. /customers) |  Specific Item (e.g. /customers/{id})  *
 * -------|-----------|--------------------------------------|--------------------------------------- *
 * POST   |  Create   |  201 (Created)                       |  404 (Not Found)                       *
 *        |           |  'Location' header with link to      |  409 (Conflict) if resource already    *
 *        |           |  /customers/{id} containing new ID.  |                 exists.                *
 * -------|-----------|--------------------------------------|--------------------------------------- *
 * GET    |  Read     |  200 (OK), list of customers.        |  200 (OK), single customer.            *
 *        |           |  Use pagination, sorting and         |  404 (Not Found), if ID not found      *
 *        |           |  filtering to navigate big lists.    |                   or invalid.          *
 * -------|-----------|--------------------------------------|--------------------------------------- *
 * PUT    |  Replace  |  405 (Method Not Allowed), unless    |  200 (OK) or 204 (No Content).         *
 *        |           |  you want to update/replace every    |  404 (Not Found), if ID not found      *
 *        |           |  resource in the entire collection.  |                   or invalid.          *
 * -------|-----------|--------------------------------------|--------------------------------------- *
 * DELETE |  Delete   |  405 (Method Not Allowed), unless    |  200 (OK).                             *
 *        |           |  you want to delete the whole        |  404 (Not Found), if ID not found      *
 *        |           |  collection—not often desirable.     |                   or invalid.          *
 * -------------------------------------------------------------------------------------------------- *
 */

import authApi from "./authApi";
import todosApi from "./todosApi";

routes.use("/auth", authApi);
routes.use("/todos", todosApi);

export default routes;
