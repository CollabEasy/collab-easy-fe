import { Button } from "antd";
import Link from "next/link";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "../components/routeContext";
import LoginModal from '../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../components/modal/newUserModal';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import { THEMES } from "constants/inspirationIdeas";
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

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

const GetInspired = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {

  const { Panel } = Collapse;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toDiscover } = useRoutesContext()

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


  const getThemes = () => {
    const themes: JSX.Element[] = [];
    THEMES.forEach((element) => {
      themes.push(
        <div className="theme">
          <h4 className="common-h4-style">
            {element["category"]}
            <Collapse defaultActiveKey={["0"]} accordion>
              {element["value"].map((assesment, index) => (
                <Panel header={assesment.title} key={index}>
                  <p className="common-p-style">{assesment.description}</p>
                </Panel>
              ))}
            </Collapse>
          </h4>
        </div>
      )
    });
    return themes;
  }

  return (
    <Layout
      title={"New Topics, Themes, Quotes for Upcoming Work | Wondor"}
      name={"description"}
      content={"Find inspiration for your upcoming work. New topics, themes, quotes posted every week on Wondor"}

    >
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }

      <div className="getInspired-parentContainer">
        <GenericBreadcrumb
          page={"Inspiration"}
        />
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            <h3 className="common-h3-style">Looking for insipiration?</h3>
            <p className="common-p-style">
              This page is the perfect destination for you. Here, we update our list of themes
              and quotes on a <strong>weekly basis</strong>, so be sure to check back often.
              You won&apos;t want to miss out!
              <br></br>
            </p >
          </div>
        </div>
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
              {getThemes()}
          </div>
        </div>
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            <h3 className="common-h3-style">Think you got enough to get your creative juices going?</h3>
            <p className="common-p-style">
              Send a collab request to a fellow artist on one of these topics
              because we do believe <b><i>together you create better!</i></b>
            </p>
          </div>
          <div style={{ paddingTop: "30px", paddingBottom: "30px" }} className="getInspired-buttonContainer">
            <Button type="primary" className="common-btn-dimension">
              <Link
                href={routeToHref(toDiscover())}
                passHref
              >Let&apos;s collaborate</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default connector(GetInspired);