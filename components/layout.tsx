import { footerLinkColumns } from "copy/footer";
import Footer from "./footer";
import Navbar from "./navbar";
import { useRouter } from 'next/router'

import { getLoginDetails } from "helpers/helper";
import { updateLoginData, fetchArtistPreferences } from "state/action";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import RoutesContext from "./routeContext";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
  fetchArtistPreferences: () => dispatch(fetchArtistPreferences()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  children: any
} & ConnectedProps<typeof connector>;

const Layout = ({ user, children, updateLoggedInData, fetchArtistPreferences } : Props) => {
  const ISSERVER = typeof window === "undefined";
  const router = useRouter();
  let accessToken = null;

  if (!ISSERVER && (user === undefined || Object.keys(user).length === 1)) {
    if (localStorage.getItem("token") === null) {
      if (router.pathname !== '/') router.push("/");
    } else {
      accessToken = localStorage.getItem('token');
      const user = getLoginDetails();
      updateLoggedInData(user);
      fetchArtistPreferences();
    }
  }

  return (
    <div className="container-fluid">
      <Navbar />
      <main>{children}</main>
      <Footer footerLinkColumns={footerLinkColumns} />
    </div>
  );
};

export default connector(Layout);
