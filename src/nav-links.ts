export interface NavItem {
  name: string;
  path: string;
  i18nKey: string;
  requireWebapiConnection?: boolean;
}

const NavItems: NavItem[] = [
  {
    name: "Players",
    path: "/players",
    i18nKey: "pages.players.title",
    requireWebapiConnection: true
  },
  {
    name: "Devices",
    path: "/devices",
    i18nKey: "pages.devices.title",
    requireWebapiConnection: true
  }
];

export default NavItems;
