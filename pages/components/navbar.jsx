export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light hdr-clr">
      <div className="container-fluid">
        <a className="navbar-brand">Wondor</a>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Discover</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}