/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
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
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import notFoundImage from '../../public/images/not-found.svg';
import GenericActionBanner from "@/components/genericActionBanner";

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

const TermsAndPolicy = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toDiscover, toFAQ } = useRoutesContext();

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

  return (
    <Layout
      title={"Terms and Policy | Wondor Help Center"}
      name={"description"}
      content={"Know the Terms and Condition while using Wondor here. Learn how we collect, use and share user data to support you. Use tools to manage your privacy preferences."}
    >
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }

      <div className='genericPageLayout_container'>
        <GenericBreadcrumb
          page={"Terms & Conditions"}
        />
        <div className="terms-privacy-policy-section-container">
          <div className="terms-privacy-policy-text-section">
            <h1 className="common-h1-style">Terms & Conditions</h1>
            <p className="common-p-style">
              <b>Welcome to Wondor!.</b> When we say “Wondor”, “Company”, “we”, “our”, or “us” in this document,
              we are referring to wondor.art a product built by us. When we say “Services”, we mean any
              product created and maintained in as part of Wondor.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Terms</h5>
            <p className="common-p-style">
              By accessing the Wondor, you are agreeing to be bound by these terms of service, all applicable laws
              and regulations, and agree that you are responsible for compliance with any applicable local laws.
              If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Disclaimer</h5>
            <p className="common-p-style">
              The materials on Wondor's website are provided on an 'as is' basis.
              Wondor makes no warranties, expressed or implied, and hereby disclaims and negates
              all other warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights. Further, Wondor does not warrant or make any
              representations concerning the accuracy, likely results, or reliability of the use of the
              materials on its website or otherwise relating to such materials or on any sites linked to
              this site.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Eligibility</h5>
            <p className="common-p-style">
              You must be 18 years or older to use our service. By using our service, you represent and
              warrant that you are at least 18 years old.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Account Creation</h5>
            <p className="common-p-style">
              To use our service, you may be required to create an account. You agree to
              provide accurate, current, and complete information during the account creation process and
              to update such information as necessary to ensure its accuracy.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Accuracy</h5>
            <p className="common-p-style">
              The materials appearing on Wondor's website could include technical, typographical, or photographic errors.
              Wondor does not warrant that any of the materials on its website are accurate, complete or current.
              Wondor may make changes to the materials contained on its website at any time without notice.
              However Wondor does not make any commitment to update the materials.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Prohibited Conduct</h5>
            <p className="common-p-style">
              You agree not to use our service for any unlawful or prohibited purpose. You may not post any
              content that is offensive, harmful, or violates any third-party rights.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Abuse</h5>
            <p className="common-p-style">
              We reserve the right to take action in response to reported abuse of our services.
              This action may include - but is not limited to - the deletion of user data or
              other account details. Abuse may include - but is not limited to - any action
              which is illegal under the city, state, or federal laws where you are currently present.
              This includes copyright infringement under the DMCA or any activity which we deem disruptive.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Modification</h5>
            <p className="common-p-style">
              Wondor may revise these terms of service for its website at any time without notice.
              By using this website you are agreeing to be bound by the then current version of
              these terms of service.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Termination</h5>
            <p className="common-p-style">
              We reserve the right to terminate your access to our service at any time and for any reason.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Governing Law</h5>
            <p className="common-p-style">
              These terms and conditions will be governed by and construed in accordance with the laws of
              the State of California, United States of America, without giving effect to any principles of
              conflicts of law.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <h5 className="common-h5-style">Contact Us</h5>
            <p className="common-p-style">
              If you have any questions or suggestions about my Privacy Policy, do not hesitate to Contact Us.
            </p>
          </div>
          <div className="terms-privacy-policy-text-section">
            <p className="common-p-style">
              By using our service, you agree to these terms and conditions. If you do not agree to these
              terms and conditions, you should not use our service.
            </p>
          </div>
        </div>
        <div className="row">
          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  )
}

export default connector(TermsAndPolicy);