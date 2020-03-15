export interface LoginPayload {
  steamId: string;
  authorization: string;
}

export interface ServerPayload {
  name: string;
  mapName: string;
  maxPlayers: number;
  password: string;
}
export interface PlayerPayload {
  steamName: string;
  steamId: string;
}

export interface ThingPayload {
  referenceId: string;
  prefabHash: number;
  health: number;
  prefabName: string;
  customName: string | null;
  accessState: number;
  slotReferenceIds: Record<number, string>;
}

export interface DevicePayload extends ThingPayload {
  displayName: string;
  logicValues: Record<string, number>;
  slotValues: Record<number, Record<string, number>>;
}
