export interface NavItem {
  path: string;
  i18nKey: string;
  requireWebapiConnection?: boolean;
}

const NavItems: NavItem[] = [
  {
    path: "/settings",
    i18nKey: "pages.settings.title",
    requireWebapiConnection: true,
  },
  {
    path: "/players",
    i18nKey: "pages.players.title",
    requireWebapiConnection: true,
  },
  {
    path: "/bans",
    i18nKey: "pages.bans.title",
    requireWebapiConnection: true,
  },
  {
    path: "/chat",
    i18nKey: "pages.chat.title",
    requireWebapiConnection: true,
  },
  {
    path: "/devices",
    i18nKey: "pages.devices.title",
    requireWebapiConnection: true,
  },
  {
    path: "/items",
    i18nKey: "pages.items.title",
    requireWebapiConnection: true,
  },
];

export default NavItems;
