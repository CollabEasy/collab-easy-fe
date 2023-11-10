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
    /* eslint-disable react/jsx-key */
    CURRENT_THEMES.forEach((element, index) => {
      themes.push(
        /* eslint-disable react/jsx-key */
        element["value"].map((assesment) => (
          <div className="col my-3">
            <div className="card border-hover-primary">
              <div className="card-body">
                <h6 className="font-weight-bold mb-3">{assesment.title}</h6>
                <p className="text-muted mb-0">{assesment.description}</p>
              </div>
            </div>
          </div>
        ))
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

      <div className="getInspired-parentContainer">
        <GenericBreadcrumb
          page={"Inspiration Hub"}
        />
        <div className="row">
          <div style={{ width: "100%" }}>
            <div className="row d-flex justify-content-center getInspired-cover">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">
                    <div className="text-center">
                      <Image
                        src={coverSection["imgUrl"]}
                        height={250}
                        width={250}
                        alt={coverSection["imgAltTag"]}
                        priority
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="getInspired-cnt">
                      <div className="getInspired-text text-center">
                        <h3 className="common-h3-style">
                          {coverSection["heading"]}
                        </h3>
                        <p className="common-p-style">
                          {coverSection["paragraph"]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            Here, we update our list of themes and quotes on a weekly basis, so be sure to check back often. You will not want to miss out!
          </div>
          <div className="getInspired-textContainer">
            <section className="bg-light-primary">
              <div className="row row-cols-lg-2 row-cols-md-1 row-cols-1 justify-content-left px-xl-6">
                {getThemes()}
              </div>
            </section>
          </div>

          <div className="getInspired-sectionContainer">
            <div className="getInspired-textContainer">
              <p className="common-p-style">
                Think you got enough to get your creative juices going? Send a collab request to a fellow artist on one of these topics
                because we do believe <b><i>together you create better!</i></b>
              </p>
            </div>
            <div style={{ paddingTop: "30px", paddingBottom: "30px" }} className="getInspired-buttonContainer">
              <Button type="primary" className="common-btn-dimension">
                <Link
                  href={routeToHref(toDiscover())}
                  passHref
                >Collaborate Now</Link>
              </Button>
            </div>
          </div>
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