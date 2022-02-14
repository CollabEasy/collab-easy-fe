import React from 'react'
import { FooterColumn } from 'types/model/footer';
import Link from 'next/link';
import { useRoutesContext } from "../components/routeContext";

export interface FooterProps {
  footerLinkColumns: FooterColumn[]
}

export const Footer: React.FC<FooterProps> = ({
  footerLinkColumns
}) => {
  const { toAboutUs, toFAQ, toTerms, toPrivacy, toContactUs } = useRoutesContext()
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
            <li className="list-inline-item"><Link href={toAboutUs().href} passHref>About</Link></li>
            <li className="list-inline-item"><Link href={toFAQ().href} passHref>FAQs</Link></li>
            <li className="list-inline-item"><Link href={toTerms().href} passHref>Terms</Link></li>
            <li className="list-inline-item"><Link href={toPrivacy().href} passHref>Privacy Policy</Link></li>
            <li className="list-inline-item"><Link href={toContactUs().href} passHref>Contact Us</Link></li>
          </ul>
        </footer>
      </div>
    </footer>
  )
}

export default Footer
