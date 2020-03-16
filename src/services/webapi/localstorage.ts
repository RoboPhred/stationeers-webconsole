const LOCALSTORAGE_KEY_AUTHORIZATION = "webapi.authorization";

export function storeAuthorization(authorization: string | null) {
  if (!window.localStorage) {
    return;
  }

  if (authorization == null) {
    window.localStorage.removeItem(LOCALSTORAGE_KEY_AUTHORIZATION);
  } else {
    window.localStorage.setItem(LOCALSTORAGE_KEY_AUTHORIZATION, authorization);
  }
}

export function getStoredAuthorization(): string | null {
  if (!window.localStorage) {
    return null;
  }
  return window.localStorage.getItem(LOCALSTORAGE_KEY_AUTHORIZATION);
}
