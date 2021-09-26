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

export const WondorFooterDetails: React.FC<{}> = ({ }) => {
  const { toWondorHome } = useRoutesContext();
  return (
    <div className="col-md-4 col-xl-5">
      <div className="pr-xl-4">
        {/* <h2 className="navbar-brand f-30 appLogo">Wondor</h2> */}
        <Link  href={routeToHref(toWondorHome())} passHref>
            <Image src={titleDesktopImg}  alt="Landing page" className="footer-image" />   
        </Link>
        <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
        <p id="footer-social">
          <span><em className="fa fa-facebook-official"></em></span>
          <span><em className="fa fa-instagram"></em></span>
          <span><em className="fa fa-twitter"></em></span>
          <span><em className="fa fa-pinterest"></em></span>
        </p>
      </div>
    </div>
  )
}


export const Footer: React.FC<FooterProps> = ({
  footerLinkColumns
}) => {
  return (
    <footer className="custom-footer" style={{ background: "#F9F9F9" }}>
      <div className="container">
        <div className="row row-30">
          <WondorFooterDetails />
          <FooterColumns columns={footerLinkColumns} />
          <div className="row">
            <div className="col-xls-12 col-md-12 col-sm-12 rights-div">
              <p className="rights"><span>©  </span><span className="copyright-year">2018</span><span> </span><span>Waves</span><span>. </span><span>All Rights Reserved.</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
