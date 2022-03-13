import { NextPage } from 'next'
import Title from 'components/title'
import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

import LoginModal from '../components/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../components/newUserModal';

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
  const { toDiscover } = useRoutesContext();

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
  }, [user])

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
  }, [artistListData]);

  console.log("loginModalDetails ", loginModalDetails);
  return (
    <>
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
      <div className='footer_privacyContainer'>
        <div className="footer_privacySectionContainer">
          <h1>Terms & Conditions</h1>
          <p>
            We built Wondor for commercial purpose.
            This SERVICE is provided by Wondor and is intended for use as is. <br></br>
            This page is used to inform website visitors regarding my policies with the collection, use,
            and disclosure of Personal Information if anyone decided to use my Service.<br></br>
            If you choose to use my Service, then you agree to the collection and use of information in relation to this policy.
            The Personal Information that I collect is used for providing and improving the Service.
            I will not use or share your information with anyone except as described in this Privacy Policy.<br></br>
            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
            which is accessible at the web app unless otherwise defined in this Privacy Policy. <br></br>
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Information Collection and Use</h5>
          <p>
            For a better experience, while using our Service, I may require you to provide us with certain personally
            identifiable information. The information that I request is retained on your device and is not collected
            by me in any way <br></br>
            The web app does use third party services that may collect information used to identify you.<br></br>
            Link to privacy policy of third party service providers used by the web app
            Google Cloud, GoogleAnalytics, AdSense, Sentry, Cloudflare.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Log Data</h5>
          <p>
            I want to inform you that whenever you use my Service, in a case of an error in the web app
            I collect data and information (through third party products) on your phone called Log Data.
            This Log Data may include information such as your device Internet Protocol (“IP”) address,
            device name, operating system version, the configuration of the web app when utilizing my Service,
            the time and date of your use of the Service, and other statistics.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Cookies</h5>
          <p>
            Cookies are files with small amount of data that is commonly used an anonymous unique identifier.
            These are sent to your browser from the website that you visit and are stored on your device internal memory.<br></br>

            This Service does not use these “cookies” explicitly. However, the web app may use third party code and libraries
            that use “cookies” to collection information and to improve their services. You have the option to either accept
            or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies,
            you may not be able to use some portions of this Service.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Service Providers </h5>
          <p>
            I may employ third-party companies and individuals due to the following reasons:<br></br>

            To facilitate our Service;<br></br>
            To provide the Service on our behalf;<br></br>
            To perform Service-related services; or<br></br>
            To assist us in analyzing how our Service is used.<br></br>

            I want to inform users of this Service that these third parties have access to your Personal Information.
            The reason is to perform the tasks assigned to them on our behalf.
            However, they are obligated not to disclose or use the information for any other purpose.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Security</h5>
          <p>
            I value your trust in providing us your Personal Information, thus we are striving to use commercially
            acceptable means of protecting it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Data Deletion</h5>
          <p>
            You may have the right to request access to the personal information we collect from you, change
            that information, or delete it in some circumstances. To request to review, update, or
            delete your personal information, please Contact Us.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Links to Other Sites</h5>
          <p>
            This Service may contain links to other sites. If you click on a third-party link,
            you will be directed to that site. Note that these external sites are not operated by me.
            Therefore, I strongly advise you to review the Privacy Policy of these websites.
            I have no control over and assume no responsibility for the content, privacy policies,
            or practices of any third-party sites or services.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Children’s Privacy</h5>
          <p>
            These Services do not address anyone under the age of 13.
            I do not knowingly collect personally identifiable information from children under 13.
            In the case I discover that a child under 13 has provided me with personal information,
            I immediately delete this from our servers. If you are a parent or guardian and you are aware
            that your child has provided us with personal information, please contact me so that I will be able to
            do necessary actions.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Changes to This Privacy Policy</h5>
          <p>
            I may update our Privacy Policy from time to time.
            Thus, you are advised to review this page periodically for any changes.
            I will notify you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately after they are posted on this page.
          </p>
        </div>

        <div className="footer_privacySectionContainer">
          <h5>Contact Us</h5>
          <p>
            If you have any questions or suggestions about my Privacy Policy, do not hesitate to Contact Us.
          </p>
        </div>
        <div className="footer_privacySectionContainer">
          <Button type="primary">
            <Link
              href={routeToHref(toDiscover())}
              passHref
            >Explore Wondor</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default connector(Privacy)