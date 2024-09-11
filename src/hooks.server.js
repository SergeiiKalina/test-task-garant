import { redirect } from "@sveltejs/kit";
import { VITE_ACCESS } from "$env/static/private";

export async function handle({ event, resolve }) {
  if (
    event.url.pathname.startsWith("/about") &&
    VITE_ACCESS !== "ACCESS_PROD"
  ) {
    throw redirect(307, "/");
  }
  return resolve(event);
}
