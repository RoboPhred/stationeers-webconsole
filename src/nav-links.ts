export interface NavItem {
  path: string;
  i18nKey: string;
  requireWebapiConnection?: boolean;
}

const NavItems: NavItem[] = [
  {
    path: "/server",
    i18nKey: "pages.server.title",
    requireWebapiConnection: true
  },
  {
    path: "/players",
    i18nKey: "pages.players.title",
    requireWebapiConnection: true
  },
  {
    path: "/devices",
    i18nKey: "pages.devices.title",
    requireWebapiConnection: true
  }
];

export default NavItems;
