import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import styles from '../public/styles/navbar.module.scss';

const Navbar = () => {
  const { toLogin, toSignup, toDiscover } = useRoutesContext()
  return (
    <nav className="navbar navbar-light bg-light hdr-clr">
      <div className="container-fluid">
        <a className={'navbar-brand ' + styles.appLogo}>Wondor</a>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link href={toDiscover().href}>
              <a className="nav-link active" aria-current="page">
                Discover
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={toLogin().href}>
              <a className="nav-link">
                Login
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={toSignup().href}>
              <a className="nav-link">
                Sign up
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar