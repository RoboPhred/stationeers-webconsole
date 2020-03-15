export interface NavItem {
  name: string;
  path: string;
  i18nKey: string;
  requireWebapiConnection?: boolean;
}

const NavItems: NavItem[] = [
  {
    name: "Devices",
    path: "/devices",
    i18nKey: "pages.devices.title",
    requireWebapiConnection: true
  }
];

export default NavItems;
