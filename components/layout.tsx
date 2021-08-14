import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      {/* <Navbar /> */}
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout