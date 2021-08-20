import React from 'react'
import { FooterColumn } from 'types/core';
import styles from '../styles/index.module.scss';
import { FooterColumns } from './footerColumns';

export interface FooterProps {
  footerLinkColumns: FooterColumn[]
}

export const WondorFooterDetails: React.FC<{}> = ({ }) => {
  return (
    <div className="col-md-4 col-xl-5">
      <div className="pr-xl-4">
        <h2 className={'navbar-brand f-30 ' + styles.appLogo}>Wondor</h2>
        <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
        <p className="rights"><span>©  </span><span className="copyright-year">2018</span><span> </span><span>Waves</span><span>. </span><span>All Rights Reserved.</span></p>
        <dl className={styles["contact-list"]}>
          <dd><a href="mailto:#">dkstudioin@gmail.com</a></dd>
        </dl>
        <dl className={styles["contact-list"]}>
          <dd><a href="tel:#">https://karosearch.com</a> <span>or</span> <a href="tel:#">https://karosearch.com</a>
          </dd>
        </dl>
      </div>
    </div>
  )
}


export const Footer: React.FC<FooterProps> = ({
  footerLinkColumns
}) => {
  return (
    <footer className={styles["footer"]} style={{ background: "#F9F9F9" }}>
      <div className="container">
        <div className="row row-30">
          <WondorFooterDetails />
          <FooterColumns columns={footerLinkColumns} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
