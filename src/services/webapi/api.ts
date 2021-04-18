import HttpStatusCodes from "http-status-codes";

import history from "@/history";

import { AUTHENTICATION_CALLBACK_ROUTE } from "@/routes";

import { rootHost, rootUrl } from "@/env";

import { WebAPIError } from "./errors";
import {
  SettingsPayload,
  DevicePayload,
  PlayerPayload,
  ItemPayload,
  ChatPayload,
  BanPayload,
  LogicValuePayload,
  AnyThingPayload,
  ThingPayload,
} from "./payloads";

export type ApiFunction<TResult, TArgs extends any[]> = (
  webapiServerUrl: string,
  authorization: string,
  ...args: TArgs
) => Promise<TResult>;

export async function getLoginMethods(
  webapiServerUrl: string
): Promise<string[]> {
  const url = appendPath(webapiServerUrl, "api/login");

  const response = await fetch(url, { method: "GET" });

  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const body = await response.json();
  if (!Array.isArray(body.loginMethods)) {
    throw new Error("Unexpected response from api/login");
  }

  return body.loginMethods;
}

export function adjustOpenIDReturnTo(
  openIdSigninUrl: string,
  serverAddress: string
): string {
  const returnTo =
    rootUrl +
    history.createHref({
      pathname: AUTHENTICATION_CALLBACK_ROUTE,
      search: `server-address=${encodeURIComponent(serverAddress)}`,
    });

  var signinUrl = new URL(openIdSigninUrl);
  signinUrl.searchParams.set("openid.realm", rootHost);
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
  const url = appendPath(webapiServerUrl, "api/login/steam");

  const response = await fetch(url, { method: "GET" });

  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  // HACK: We get the redirect location through the body if desired.
  const body = await response.json();
  if (body.location) {
    return {
      type: "redirect",
      location: body.location,
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
    authorization,
  };
}

export async function authenticateOpenID(
  webapiServerUrl: string,
  openIdQuery: string
): Promise<JwtAutenticationResult> {
  let url = appendPath(webapiServerUrl, "api/login/steam");
  url = setUrlSearch(url, openIdQuery);

  const response = await fetch(url, {
    method: "GET",
    redirect: "manual",
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
    authorization,
  };
}

export async function getSettings(
  webapiServerUrl: string,
  authorization: string
): Promise<SettingsPayload> {
  const url = appendPath(webapiServerUrl, "api/settings");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: SettingsPayload = await response.json();
  return result;
}

export async function setSettings(
  webapiServerUrl: string,
  authorization: string,
  body: Partial<SettingsPayload>
): Promise<SettingsPayload> {
  const url = appendPath(webapiServerUrl, "api/settings");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify(body),
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: SettingsPayload = await response.json();
  return result;
}

export async function getPlayers(
  webapiServerUrl: string,
  authorization: string
): Promise<PlayerPayload[]> {
  const url = appendPath(webapiServerUrl, "api/players");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
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
  const url = appendPath(webapiServerUrl, `api/players/${steamId}/kick`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify({ reason }),
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
  const url = appendPath(webapiServerUrl, `api/players/${steamId}/ban`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify({ reason, hours }),
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
  const url = appendPath(webapiServerUrl, `api/bans`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
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
  const url = appendPath(webapiServerUrl, `api/bans/${steamId}`);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
    },
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
  const url = appendPath(webapiServerUrl, "api/chat");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ChatPayload[] = await response.json();
  return result;
}

export async function getThing(
  webapiServerUrl: string,
  authorization: string,
  referenceId: string
): Promise<AnyThingPayload> {
  const url = appendPath(webapiServerUrl, `api/things/${referenceId}`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: AnyThingPayload = await response.json();
  return result;
}

export async function setThing(
  webapiServerUrl: string,
  authorization: string,
  referenceId: string,
  payload: Partial<ThingPayload>
): Promise<AnyThingPayload> {
  const url = appendPath(webapiServerUrl, `api/things/${referenceId}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify(payload),
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: AnyThingPayload = await response.json();
  return result;
}

export async function getDevices(
  webapiServerUrl: string,
  authorization: string
): Promise<DevicePayload[]> {
  const url = appendPath(webapiServerUrl, "api/devices");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: DevicePayload[] = await response.json();
  return result;
}

export async function getDevice(
  webapiServerUrl: string,
  authorization: string,
  referenceId: string
): Promise<DevicePayload> {
  const url = appendPath(webapiServerUrl, `api/devices/${referenceId}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: DevicePayload = await response.json();
  return result;
}

export async function setDevice(
  webapiServerUrl: string,
  authorization: string,
  referenceId: string,
  body: Partial<DevicePayload>
): Promise<DevicePayload> {
  const url = appendPath(webapiServerUrl, `api/devices/${referenceId}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify(body),
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: DevicePayload = await response.json();
  return result;
}

export async function setDeviceLogic(
  webapiServerUrl: string,
  authorization: string,
  referenceId: string,
  logicType: string,
  logicValue: number
): Promise<LogicValuePayload> {
  const url = appendPath(
    webapiServerUrl,
    `api/devices/${referenceId}/logicValues/${logicType}`
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authorization,
    },
    body: JSON.stringify({ value: logicValue }),
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: LogicValuePayload = await response.json();
  return result;
}

export async function getItems(
  webapiServerUrl: string,
  authorization: string
): Promise<ItemPayload[]> {
  const url = appendPath(webapiServerUrl, "api/items");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
  if (response.status !== HttpStatusCodes.OK) {
    throw new WebAPIError(response.status, response.statusText);
  }

  const result: ItemPayload[] = await response.json();
  return result;
}

function appendPath(url: string, path: string) {
  if (url.endsWith("/")) {
    url = url.substr(0, url.length - 1);
  }
  if (path.startsWith("/")) {
    path = path.substr(1);
  }

  return `${url}/${path}`;
}

function setUrlSearch(url: string, search: string) {
  var parsed = new URL(url);
  parsed.search = search;
  return parsed.toString();
}
