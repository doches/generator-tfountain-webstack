import moment from "moment";
import fromPairs from "lodash-es/fromPairs";
import map from "lodash-es/map";

export let baseURL: string = "http://localhost:8020/api/";
if (window.location.hostname !== "localhost") {
  baseURL = "/api/";
}

export const USERNAME_COOKIE = "<%= slug %>_u";
export const SESSION_COOKIE = "<%= slug %>_s";

export const headers = new Headers();
headers.set("Content-Type", "application/json");

export function authorize(user: string, session: string) {
  headers.set("Authorization", "Bearer " + session);

  const expires = moment().add(7, "days").toDate().toUTCString();
  document.cookie = `${USERNAME_COOKIE}=${encodeURIComponent(user)};expires=${expires}`;
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(session)};expires=${expires}`;
}

export function logout() {
  authorize("", "");
}

export function check() {
  const cookies = fromPairs(
    map(
      document.cookie.split(";"),
      (pair: string) => map(pair.split("=", 2), (part: string) => part.trim()),
    ),
  );

  if (cookies[USERNAME_COOKIE] && cookies[SESSION_COOKIE]) {
    authorize(
      decodeURIComponent(cookies[USERNAME_COOKIE]),
      decodeURIComponent(cookies[SESSION_COOKIE]),
    );
    return {email: cookies[USERNAME_COOKIE], session: cookies[SESSION_COOKIE]};
  } else {
    return false;
  }
}

