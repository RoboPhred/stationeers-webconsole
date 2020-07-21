export interface LoginPayload {
  steamId: string;
  authorization: string;
}

export interface SettingsPayload {
  name: string;
  mapName: string;
  maxPlayers: number;
  password: string;
}
export interface PlayerPayload {
  steamName: string;
  steamId: string;
  playerName: string;
  playTime: number;
  ping: number;
  score: number;
}

export interface BanPayload {
  steamId: string;
  endTimestamp: number;
}

export interface ChatPayload {
  displayName: string;
  message: string;
}

export interface ThingPayloadBase {
  type: string;
  referenceId: string;
  prefabHash: number;
  health: number;
  prefabName: string;
  customName: string | null;
  accessState: number;
  slotReferenceIds: Record<number, string>;
}

export interface ThingPayload extends ThingPayloadBase {
  type: "thing";
}

export interface DevicePayload extends ThingPayloadBase {
  type: "device";
  displayName: string;
  logicTypes: Record<string, LogicValuePayload>;
  slotValues: Record<number, Record<string, number>>;
}

export interface ItemPayload extends ThingPayloadBase {
  type: "item";
  parentSlotReferenceId: string;
  parentSlotId: number;
  quantityText: string;
}

export type AnyThingPayload = ThingPayload | DevicePayload | ItemPayload;

export interface LogicValuePayload {
  value: number;
  writable: boolean;
}
