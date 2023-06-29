import { footerLinkColumns } from "copy/footer";
import Footer from "./footer";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import { getLoginDetails } from "helpers/helper";
import {
  updateLoginData,
  fetchArtistPreferences,
  setIsLoading,
  setIsFetchingUser,
} from "state/action";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import { getPublicRoutes } from "helpers/helper";
import Loader from "./loader";
import Notification from "./notifications/notification";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isFetchingUser: state.user.isFetchingUser,
  notification: state.notification,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setIsFetchingUser: (value: boolean) => dispatch(setIsFetchingUser(value)),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  updateLoggedInData: (loginDetails: any) =>
    dispatch(updateLoginData(loginDetails)),
  fetchArtistPreferences: () => dispatch(fetchArtistPreferences()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  children: any;
} & ConnectedProps<typeof connector>;

const Layout = ({
  user,
  children,
  isFetchingUser,
  notification,
  updateLoggedInData,
  fetchArtistPreferences,
  setIsFetchingUser,
}: Props) => {
  const ISSERVER = typeof window === "undefined";
  const router = useRouter();
  let accessToken = null;
  const publicRoutes = getPublicRoutes();

  if (!ISSERVER && (user === undefined || Object.keys(user).length === 1)) {
    const userDetailsCached = getLoginDetails();
    if (
      localStorage.getItem("token") === null ||
      Object.keys(userDetailsCached).length === 0
    ) {
      // if (router.pathname !== '/' && !publicRoutes.includes(router.pathname)) router.push("/");
      setIsFetchingUser(false);
    } else {
      accessToken = localStorage.getItem("token");
      const user = getLoginDetails();
      updateLoggedInData(user);
      fetchArtistPreferences();
    }
  }

  function IsArtistPortal() {
    return router.pathname.includes("/artist/settings");
  }

  return (
    <div>
      <Notification
        showNotification={notification.showNotification}
        isSuccess={notification.isSuccess}
        message={notification.message}
      />

      <div className="layout__layoutContainer">
        {!IsArtistPortal() && (
          <Navbar />
        )}

        {isFetchingUser ? (
          <Loader />
        ) : (
          <main className="page-content">{children}</main>
        )}
        {!IsArtistPortal() && (
          <Footer footerLinkColumns={footerLinkColumns} />
        )}
      </div>
    </div>
  );
};

export default connector(Layout);
