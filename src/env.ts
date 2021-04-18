export const isProd: boolean = process.env.NODE_ENV === "production";

export const rootHost = window.location.origin;

const rootUrlBuilder = new URL(rootHost);
rootUrlBuilder.pathname = __webpack_public_path__;
export const rootUrl = rootUrlBuilder.toString();
