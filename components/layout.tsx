
import { footerLinkColumns } from "copy/footer";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        {children}
      </main>
      <Footer footerLinkColumns={footerLinkColumns}/>
    </div>
  );
}

export default Layout