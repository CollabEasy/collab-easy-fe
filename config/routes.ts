import { AppRouteCreators } from "../types/core";

export const routes: AppRouteCreators = {
  toWondorHome: () => ({ href: "/" }),
  toLogin: () => ({ href: "/login" }),
  toSignup: () => ({ href: "/signup" }),
  toDiscover: () => ({ href: "/" }),
  toArtist: () => ({ href: "/discover-artist/" }),
};
