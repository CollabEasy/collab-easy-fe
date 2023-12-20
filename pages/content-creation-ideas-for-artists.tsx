import { Button } from "antd";
import Image from "next/image";
import ideaImage from "../public/images/idea.svg";
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
import { CURRENT_THEMES } from "constants/inspirationIdeas";
import { Collapse } from 'antd';
import GenericActionBanner from "@/components/genericActionBanner";
import GenericPageBanner from "@/components/genericPageBanner";
import { GetUserSkillsTags } from "helpers/profilePageHelper";

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

const GetInspired = ({
  isLoggedIn,
  updateLoggedInData,
  loginModalDetails,
  user,
  artistListData,
  CURRENT_THEMES,
  coverSection,
}) => {

  const { Panel } = Collapse;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(-1);
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
    setWindowWidth(window.innerWidth);
  }, [artistListData]);


  // Array of random colors
  const colors = [  '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff',  '#ffb6c1', '#ffd700', '#add8e6', '#98fb98', '#dda0dd',  '#ffcccb', '#d3ffce', '#f0fff0', '#f5f5dc', '#e6e6fa',  '#ffe4e1', '#f0e68c', '#dda0dd', '#87cefa', '#faebd7'];

  // Function to get a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };


  const getThemes = () => {
    const themes: JSX.Element[] = [];
    /* eslint-disable react/jsx-key */
    CURRENT_THEMES.forEach((element, index) => {
      const cardColor = getRandomColor();
      themes.push(
        <article style={{ backgroundColor: cardColor, borderRadius: '10px' }}>
          <h3 className="common-h3-style">{element.title}</h3>
          <p className="common-p-style">{element.description}</p>
          <p className="common-p-style" style={{ paddingTop: "10px" }}> {GetUserSkillsTags(element["categories"], true)}</p>
        </article>
      )
    });
    return themes;
  }

  return (
    <Layout
      title={"New Topics, Themes, and Quotes for Creators: Inspire Your Next Content"}
      name={"description"}
      content={"Discover new and trending content ideas instantly for your next blog post, video, or artwork every week. Start now and find the perfect theme to engage your audience and grow your reach."}

    >
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }

      <div className="genericPageLayout_container">
        {windowWidth > 500 &&
          <GenericBreadcrumb
            page={"Inspiration Hub"}
          />
        }
        <div className="row">
          <GenericPageBanner
            heading={coverSection["heading"]}
            paragraph={coverSection["paragraph"]}
          />
        </div>
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            <p className="common-p-style">
              Here, we update our list of themes and quotes on a weekly basis, so be sure to check back often. You will not want to miss out!
            </p>
          </div>
          <div className="inspo-grid">
            {getThemes()}
          </div>

          <div className="getInspired-sectionContainer">
            <div className="getInspired-textContainer">
              <p className="common-p-style">
                Think you got enough to get your creative juices going? Send a collab request to a fellow artist on one of these topics
                because we do believe <b><i>together you create better!</i></b>
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

const coverSection = {
  imgUrl: ideaImage,
  heading: "Looking for new content inspiration? Look no further than Wondor's Inspiration Hub!",
  paragraph: "Whether you are a blogger, YouTuber, social media influencer, or any other type of content creator, Wondor's Inspiration Hub can help you take your content to the next level.",
  imgAltTag: "Easy content ideas for Photographers, Writers, Singers, Musicians for your next post on youtube and instagram.",
}

export async function getStaticProps({ }) {

  // Pass post data to the page via props
  return { props: { CURRENT_THEMES, coverSection } }
}

export default connector(GetInspired);