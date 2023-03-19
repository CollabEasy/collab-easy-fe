import { LISTING_BANNERS } from "config/constants";

export function getLoginDetails() {
  const accessToken = localStorage.getItem("token");
  if (accessToken !== null) {
    const details = parseJwt(accessToken);
    const expiry = details["exp"];
    const now = Math.floor(Date.now() / 1000).toString();
    if (expiry > now) return details;
  }
  return {};
}

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function getCurrentUserId() {
  const loginDetails = getLoginDetails();
  return loginDetails.id;
}

export function allowedFileTypes() {
  const allowed = ["image", "video", "audio"];

  return allowed;
}

export function getPublicRoutes() {
  return [
    "/about-us",
    "/terms-and-policy",
    "/privacy",
    "/contact-us",
    "/discover-artist/[id]",
  ];
}

export function convertTimestampToDate(timestamp) {
  const d = new Date(timestamp);
  return d;
}

export const getListingHeaderData = (selectedCategorySlug) => {
  for (var i = 0; i < LISTING_BANNERS.length; i++) {
    if (LISTING_BANNERS[i]["slug"] == selectedCategorySlug) {
      return LISTING_BANNERS[i];
    }
  }
  return {};
};
