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
  const { toEditProfile, toGetInspired, toAllContestPage, toAboutUs, toTutorial, toTerms, toPrivacy, toContactUs } = useRoutesContext()
  return (
    <footer className="footer-body">
      <div className="container-fluid mt-5">
        <div className="footer-card mx-5">
          <div className="row mb-4">
            <div className="col-md-4 col-sm-4 col-xs-4">
              <div className="footer-text pull-left">
                <div className="d-flex">
                  <h1 style={{ color: "#404040", fontFamily: "pacifico", fontSize: "30px" }}>Wondor</h1>
                </div>
                <p className="common-p-style">Unlock new avenues for creativity, collaboration, and success in the world of creators 🤝 💡 🎉</p>
                <p><i className="fa fa-copyright"></i> 2020 </p>
                {/* <div className="social mt-2 mb-3"> <i className="fa fa-facebook-official fa-lg"></i> <i className="fa fa-instagram fa-lg"></i> <i className="fa fa-twitter fa-lg"></i> <i className="fa fa-linkedin-square fa-lg"></i> <i className="fa fa-facebook"></i> </div> */}
              </div>
            </div>
            <div className="col-md-2 col-sm-2 col-xs-2"></div>
            <div className="col-md-2 col-sm-2 col-xs-2">
              <h6 className="common-h6-style">Company</h6>
              <ul className="common-text-style">
                <li><a href={toAboutUs().href} >About Us</a></li>
                <li><a href={toTerms().href} >Terms & Policy</a></li>
                <li><a href={toPrivacy().href} >Privacy</a></li>
                <li><a href={toTutorial().href} >Tutorial</a></li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2 col-xs-2">
              <h6 className="common-h6-style">Artists</h6>
              <ul className="common-text-style">
                <li><a href={toEditProfile("profile", "profile").href} >Portal</a></li>
                <li><a href={toGetInspired().href} >Inspiration</a></li>
                <li><a href={toAllContestPage().href} >Contests</a></li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2 col-xs-2">
              <h6 className="common-h6-style">Contact</h6>
              <ul className="common-text-style">
                <li><a href={toContactUs().href}>Contact Us</a></li>
              </ul>
            </div>
          </div>
          {/* <div className="divider mb-4"> </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
