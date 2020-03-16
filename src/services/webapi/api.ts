import { stringify } from "query-string";

import { AUTHENTICATION_CALLBACK_ROUTE } from "@/routes";

import { WebAPIError } from "./errors";
import {
  ServerPayload,
  LoginPayload,
  DevicePayload,
  PlayerPayload,
  ItemPayload,
  ChatPayload
} from "./payloads";

export type ApiFunction<TResult, TArgs extends any[]> = (
  webapiServerUrl: string,
  authorization: string,
  ...args: TArgs
) => Promise<TResult>;

export function createSteamLoginOpenIdUrl(): string {
  var returnTo = new URL(PUBLIC_URL);
  returnTo.hash = AUTHENTICATION_CALLBACK_ROUTE;

  const query = {
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnTo.toString(),
    "openid.realm": PUBLIC_URL,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select"
  };
  return "https://steamcommunity.com/openid/login?" + stringify(query);
}

export async function authenticate(
  webapiServerUrl: string,
  openIdQuery: string
): Promise<LoginPayload> {
  const url = new URL(webapiServerUrl);
  url.pathname = "login";
  url.search = openIdQuery;

  const response = await fetch(url.toString(), { method: "POST" });
  if (response.status !== 200) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: LoginPayload = await response.json();
  // Doesn't work.  CORS?
  // Sending it by body now.
  //result.authorization = response.headers.get("Authorization")!;
  return result;
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
      Authorization: `Bearer ${authorization}`
    }
  });
  if (response.status !== 200) {
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
      Authorization: `Bearer ${authorization}`
    },
    body: JSON.stringify(body)
  });
  if (response.status !== 200) {
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
      Authorization: `Bearer ${authorization}`
    }
  });
  if (response.status !== 200) {
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
      Authorization: `Bearer ${authorization}`
    },
    body: JSON.stringify({ reason })
  });
  if (response.status !== 200) {
    throw new WebAPIError(response.status, response.statusText);
  }
  return;
}

export async function banPlayer(
  webapiServerUrl: string,
  authorization: string,
  steamId: string,
  reason: string | null,
  duration: number = 1
): Promise<void> {
  const url = new URL(webapiServerUrl);
  url.pathname = `players/${steamId}/ban`;

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authorization}`
    },
    body: JSON.stringify({ reason, duration })
  });
  if (response.status !== 200) {
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
      Authorization: `Bearer ${authorization}`
    }
  });
  if (response.status !== 200) {
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
      Authorization: `Bearer ${authorization}`
    }
  });
  if (response.status !== 200) {
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
      Authorization: `Bearer ${authorization}`
    }
  });
  if (response.status !== 200) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ItemPayload[] = await response.json();
  return result;
}
