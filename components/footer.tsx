import React from 'react'
import { FooterColumn } from 'types/model/footer';
import { FooterColumns } from './footerColumns';
import Link from 'next/link';
import Image from 'next/image';
import titleDesktopImg from '../public/images/title-desktop.svg';
import { useRoutesContext } from "../components/routeContext";
import { routeToHref } from "config/routes";

export interface FooterProps {
  footerLinkColumns: FooterColumn[]
}

// export const WondorFooterDetails: React.FC<{}> = ({ }) => {
//   const { toWondorHome } = useRoutesContext();
//   return (
    
//   )
// }


export const Footer: React.FC<FooterProps> = ({
  footerLinkColumns
}) => {
  return (
    <footer >
      <div className="footer-basic">
        <footer>
            {/* <div className="social">
              <a href="#"><i className="icon ion-social-instagram"></i></a>
              <a href="#"><i className="icon ion-social-snapchat"></i></a>
              <a href="#"><i className="icon ion-social-twitter"></i></a>
              <a href="#"><i className="icon ion-social-facebook"></i></a>
            </div> */}
            <p className="copyright">Wondor © 2022</p>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">About</a></li>
                <li className="list-inline-item"><a href="#">FAQs</a></li>
                <li className="list-inline-item"><a href="#">Terms</a></li>
                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                <li className="list-inline-item"><a href="#">Contact Us</a></li>
            </ul>
        </footer>
      </div>
    </footer>
  )
}

export default Footer
