import { Button } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

import LoginModal from '../../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../../components/modal/newUserModal';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/asset/genericBreadcrumb";
import notFoundImage from '../../public/images/not-found.svg';
import GenericActionBanner from "@/components/asset/genericActionBanner";
import GenericPageBanner from "@/components/asset/genericPageBanner";

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails,
  user: any,
  artistListData: any
} & ConnectedProps<typeof connector>;


const Privacy = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(-1);

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
    setWindowWidth(window.innerWidth);
  }, [user])

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
  }, [artistListData]);

  return (
    <Layout
      title={"Privacy Policy | Wondor Help Center"}
      name={"description"}
      content={"Privacy policy for using Wondor. Know the privacy Policy while using Wondor here."}
    >


      <div className='genericPageLayout_container'>
        {windowWidth > 500 &&
          <GenericBreadcrumb
            page={"Privacy Policy"}
          />
        }
        <div className="terms-privacy-policy-section-container">
          <GenericPageBanner
            heading="We are dedicate to uphold the security, confidentiality, and privacy of your personal information"
            paragraph="This document outlines our privacy principles. If you have any questions about the practices described in this Privacy Policy, please contact us."
          />
          <div style={{ paddingTop: "4%" }}>
            <div className="terms-privacy-policy-text-section">
              <p className="common-p-style">
                This page is used to inform website visitors regarding my policies with the collection, use,
                and disclosure of Personal Information if anyone decided to use my Service.<br></br>
                If you choose to use my Service, then you agree to the collection and use of information in relation to this policy.
                The Personal Information that we collect is used for providing and improving the Service.
                we will not use or share your information with anyone except as described in this Privacy Policy.<br></br>
                The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
                which is accessible at the web app unless otherwise defined in this Privacy Policy. <br></br>
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Information Collection and Use</h5>
              <p className="common-p-style">
                For a better experience, while using our Service, we may require you to provide us with certain personally
                identifiable information. The information that we request is retained on your device and is not collected
                by me in any way <br></br>
                The web app does use third party services that may collect information used to identify you.<br></br>
                Link to privacy policy of third party service providers used by the web app
                Google Cloud, GoogleAnalytics, AdSense, Sentry, Cloudflare.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Log Data</h5>
              <p className="common-p-style">
                we want to inform you that whenever you use my Service, in a case of an error in the web app
                we collect data and information (through third party products) on your phone called Log Data.
                This Log Data may include information such as your device Internet Protocol (“IP”) address,
                device name, operating system version, the configuration of the web app when utilizing my Service,
                the time and date of your use of the Service, and other statistics.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Cookies</h5>
              <p className="common-p-style">
                Cookies are files with small amount of data that is commonly used an anonymous unique identifier.
                These are sent to your browser from the website that you visit and are stored on your device internal memory.<br></br>

                This Service does not use these “cookies” explicitly. However, the web app may use third party code and libraries
                that use “cookies” to collection information and to improve their services. You have the option to either accept
                or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies,
                you may not be able to use some portions of this Service.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Service Providers </h5>
              <p className="common-p-style">
                we may employ third-party companies and individuals due to the following reasons:<br></br>

                To facilitate our Service;<br></br>
                To provide the Service on our behalf;<br></br>
                To perform Service-related services; or<br></br>
                To assist us in analyzing how our Service is used.<br></br>

                we want to inform users of this Service that these third parties have access to your Personal Information.
                The reason is to perform the tasks assigned to them on our behalf.
                However, they are obligated not to disclose or use the information for any other purpose.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Security</h5>
              <p className="common-p-style">
                we value your trust in providing us your Personal Information, thus we are striving to use commercially
                acceptable means of protecting it. But remember that no method of transmission over the internet,
                or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Data Deletion</h5>
              <p className="common-p-style">
                You may have the right to request access to the personal information we collect from you, change
                that information, or delete it in some circumstances. To request to review, update, or
                delete your personal information, please Contact Us.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Links to Other Sites</h5>
              <p className="common-p-style">
                This Service may contain links to other sites. If you click on a third-party link,
                you will be directed to that site. Note that these external sites are not operated by me.
                Therefore, we strongly advise you to review the Privacy Policy of these websites.
                we have no control over and assume no responsibility for the content, privacy policies,
                or practices of any third-party sites or services.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Children’s Privacy</h5>
              <p className="common-p-style">
                These Services do not address anyone under the age of 18.
                we do not knowingly collect personally identifiable information from children under 18.
                In the case we discover that a child under 18 has provided me with personal information,
                we immediately delete this from our servers. If you are a parent or guardian and you are aware
                that your child has provided us with personal information, please contact me so that we will be able to
                do necessary actions.
              </p>
            </div>

            <div className="terms-privacy-policy-text-section">
              <h5 className="common-h5-style">Changes to This Privacy Policy</h5>
              <p className="common-p-style">
                we may update our Privacy Policy from time to time.
                Thus, you are advised to review this page periodically for any changes.
                we will notify you of any changes by posting the new Privacy Policy on this page.
                These changes are effective immediately after they are posted on this page.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  )
}

export default connector(Privacy)