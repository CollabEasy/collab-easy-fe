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
        <p className="copyright ">Wondor © 2022</p>
        <ul className="list-inline">
          <li className="list-inline-item common-text-style"><Link href={toAboutUs().href} passHref>About Us</Link></li>
          {/* <li className="list-inline-item"><Link href={toFAQ().href} passHref>FAQs</Link></li> */}
          <li className="list-inline-item common-text-style"><Link href={toTerms().href} passHref>Terms</Link></li>
          <li className="list-inline-item common-text-style"><Link href={toPrivacy().href} passHref>Privacy</Link></li>
          <li className="list-inline-item common-text-style"><Link href={toContactUs().href} passHref>Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
