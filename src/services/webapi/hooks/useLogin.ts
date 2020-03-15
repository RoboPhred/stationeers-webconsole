import * as React from "react";

import { createSteamLoginOpenIdUrl, authenticate } from "../api";
import { LoginPayload } from "../payloads";

export type LoginStatus = "idle" | "logging-in" | "success" | "error";
export interface UseLogin {
  loginStatus: LoginStatus;
  login(): void;
}

export function useLogin(
  searchString: string,
  onLogin: (auth: LoginPayload | null, error?: Error) => void
): UseLogin {
  const [loginStatus, setLoginStatus] = React.useState<LoginStatus>("idle");

  const login = React.useCallback(() => {
    if (loginStatus != "idle") {
      return;
    }
    window.location.href = createSteamLoginOpenIdUrl("login");
  }, [loginStatus]);

  React.useEffect(() => {
    async function doLogin() {
      let loginPayload: LoginPayload;
      try {
        setLoginStatus("logging-in");
        loginPayload = await authenticate(DEFAULT_WEBAPI_URL, searchString);
      } catch (e) {
        setLoginStatus("error");
        onLogin(null, e);
        return;
      }
      setLoginStatus("success");
      onLogin(loginPayload);
    }
    if (searchString && searchString.length > 0) {
      doLogin();
    }
  }, [searchString]);

  return {
    loginStatus,
    login
  };
}
