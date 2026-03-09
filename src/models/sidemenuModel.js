
import { pool } from "../config/db.js";
export function getSideMenu() {
  return pool.query(
    "SELECT public.fn_get_sidemenu() AS sidemenu"
  );
}