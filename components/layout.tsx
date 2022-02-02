import { footerLinkColumns } from "copy/footer";
import Footer from "./footer";
import Navbar from "./navbar";
import { useRouter } from 'next/router'

import { getLoginDetails } from "helpers/helper";
import { updateLoginData } from "state/action";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import RoutesContext from "./routeContext";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails))
});

const connector = connect(null, mapDispatchToProps);

type Props = {
  children: any
} & ConnectedProps<typeof connector>;

const Layout = ({ children, updateLoggedInData }: Props) => {
  const ISSERVER = typeof window === "undefined";
  const router = useRouter();
  let accessToken = null;

  if (!ISSERVER) {
    console.log("is not server")
    if (localStorage.getItem("token") === null) {
      console.log("to login")
      if (router.pathname !== '/') router.push("/");
    } else {
      accessToken = localStorage.getItem('token');
      const user = getLoginDetails();
      updateLoggedInData(user);
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
