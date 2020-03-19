import HttpStatusCodes from "http-status-codes";

import { AUTHENTICATION_CALLBACK_ROUTE } from "@/routes";

import { WebAPIError } from "./errors";
import {
  ServerPayload,
  LoginPayload,
  DevicePayload,
  PlayerPayload,
  ItemPayload,
  ChatPayload,
  BanPayload
} from "./payloads";

export type ApiFunction<TResult, TArgs extends any[]> = (
  webapiServerUrl: string,
  authorization: string,
  ...args: TArgs
) => Promise<TResult>;

export function adjustOpenIDReturnTo(openIdSigninUrl: string): string {
  var returnTo = new URL(PUBLIC_URL);
  returnTo.hash = AUTHENTICATION_CALLBACK_ROUTE;

  var signinUrl = new URL(openIdSigninUrl);
  signinUrl.searchParams.set("openid.realm", PUBLIC_URL);
  signinUrl.searchParams.set("openid.return_to", returnTo.toString());
  return signinUrl.toString();
}

export interface RedirectAuthenticationResult {
  type: "redirect";
  location: string;
}
export interface JwtAutenticationResult {
  type: "jwt";
  authorization: string;
}
export type AuthenticationResult =
  | RedirectAuthenticationResult
  | JwtAutenticationResult;
export async function authenticate(
  webapiServerUrl: string
): Promise<AuthenticationResult> {
  const url = new URL(webapiServerUrl);
  url.pathname = "login";

  const response = await fetch(url.toString(), { method: "GET" });
  // This does not work, as redirects are handled by the browser and we cannot get the redirect url.
  // if (response.status === HttpStatusCodes.TEMPORARY_REDIRECT) {
  //   var location = response.headers.get("Location");
  //   if (!location) {
  //     throw new WebAPIError(
  //       HttpStatusCodes.INTERNAL_SERVER_ERROR,
  //       "Server returned redirect but no location header."
  //     );
  //   }
  //   return {
  //     type: "redirect",
  //     location
  //   };
  // }

  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  // HACK: We get the redirect location through the body if desired.
  const body = await response.json();
  if (body.location) {
    return {
      type: "redirect",
      location: body.location
    };
  }

  var authorization = response.headers.get("Authorization");
  if (!authorization) {
    throw new WebAPIError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Server returned OK but no authorization header."
    );
  }

  return {
    type: "jwt",
    authorization
  };
}

export async function authenticateOpenID(
  webapiServerUrl: string,
  openIdQuery: string
): Promise<JwtAutenticationResult> {
  const url = new URL(webapiServerUrl);
  url.pathname = "login";
  url.search = openIdQuery;

  const response = await fetch(url.toString(), {
    method: "GET",
    redirect: "manual"
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  var authorization = response.headers.get("Authorization");
  if (!authorization) {
    throw new WebAPIError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Server returned OK but no authorization header."
    );
  }

  return {
    type: "jwt",
    authorization
  };
}

export async function getServer(
  webapiServerUrl: string,
  authorization: string
): Promise<ServerPayload> {
  const url = new URL(webapiServerUrl);
  url.pathname = "server";

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ServerPayload = await response.json();
  return result;
}

export async function postServer(
  webapiServerUrl: string,
  authorization: string,
  body: Partial<ServerPayload>
): Promise<ServerPayload> {
  const url = new URL(webapiServerUrl);
  url.pathname = "server";

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: authorization
    },
    body: JSON.stringify(body)
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ServerPayload = await response.json();
  return result;
}

export async function getPlayers(
  webapiServerUrl: string,
  authorization: string
): Promise<PlayerPayload[]> {
  const url = new URL(webapiServerUrl);
  url.pathname = "players";

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: PlayerPayload[] = await response.json();
  return result;
}

export async function kickPlayer(
  webapiServerUrl: string,
  authorization: string,
  steamId: string,
  reason: string | null
): Promise<void> {
  const url = new URL(webapiServerUrl);
  url.pathname = `players/${steamId}/kick`;

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: authorization
    },
    body: JSON.stringify({ reason })
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }
  return;
}

export async function banPlayer(
  webapiServerUrl: string,
  authorization: string,
  steamId: string,
  reason: string | null,
  hours: number = 1
): Promise<void> {
  const url = new URL(webapiServerUrl);
  url.pathname = `players/${steamId}/ban`;

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: authorization
    },
    body: JSON.stringify({ reason, hours })
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }
  return;
}

export async function getBans(
  webapiServerUrl: string,
  authorization: string
): Promise<BanPayload[]> {
  const url = new URL(webapiServerUrl);
  url.pathname = `bans`;

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }
  return await response.json();
}

export async function removeBan(
  webapiServerUrl: string,
  authorization: string,
  steamId: string
): Promise<void> {
  const url = new URL(webapiServerUrl);
  url.pathname = `bans/${steamId}`;

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }
  return;
}

export async function getChat(
  webapiServerUrl: string,
  authorization: string
): Promise<ChatPayload[]> {
  const url = new URL(webapiServerUrl);
  url.pathname = "chat";

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ChatPayload[] = await response.json();
  return result;
}

export async function getDevices(
  webapiServerUrl: string,
  authorization: string
): Promise<DevicePayload[]> {
  const url = new URL(webapiServerUrl);
  url.pathname = "devices";

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: DevicePayload[] = await response.json();
  return result;
}

export async function getItems(
  webapiServerUrl: string,
  authorization: string
): Promise<ItemPayload[]> {
  const url = new URL(webapiServerUrl);
  url.pathname = "items";

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization
    }
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ItemPayload[] = await response.json();
  return result;
}
