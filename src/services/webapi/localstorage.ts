const LOCALSTORAGE_KEY_AUTHORIZATION = "webapi.authorization";

export function storeAuthorization(authorization: string) {
  if (!window.localStorage) {
    return;
  }
  window.localStorage.setItem(LOCALSTORAGE_KEY_AUTHORIZATION, authorization);
}

export function getStoredAuthorization(): string | null {
  if (!window.localStorage) {
    return null;
  }
  return window.localStorage.getItem(LOCALSTORAGE_KEY_AUTHORIZATION);
}
