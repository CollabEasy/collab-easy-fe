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


  const getThemes = () => {
    const themes: JSX.Element[] = [];
    /* eslint-disable react/jsx-key */
    CURRENT_THEMES.forEach((element, index) => {
      themes.push(
        /* eslint-disable react/jsx-key */
        <div className="col my-3">
          <div className="card border-hover-primary">
            <div className="card-body">
              <h6 className="font-weight-bold mb-3">{element.title}</h6>
              <p className="text-muted mb-0">{element.description}</p>
              <p style={{ paddingTop: "10px" }}> {GetUserSkillsTags(element["categories"], true)}</p>
            </div>
          </div>
        </div>
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
            Here, we update our list of themes and quotes on a weekly basis, so be sure to check back often. You will not want to miss out!
          </div>
          <div className="newGrid">
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Paleo_food.jpg" />
              <h3>1 All of These Headlines Are Not Exactly The Same</h3>
              <p>In the real world, you don't know how long the content will be. Writers will write what they need. Photos will be cropped to the shape that they should be. That's good. Make a system that allows this. You want it to be flexible and robust.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Indian_bengali_food.jpg" />
              <h3>2 Some Are Short</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Food_in_Miyajima.jpg" />
              <h3>3 Some Headlines Can Sometimes Be Quite Long, Because It Takes Time to Make A Point</h3>
              <p>Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/P1-Food_with_love.jpg" />
              <h3>4 Also, Why Are We Using Fake Content? Let's Make Some Real-ish Content.</h3>
              <p>By using real content, we can see the variation inherent in what this site might present. And we can design for those real world needs.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Beautiful_Chaldean_Food_for_Everyone.jpg" />
              <h3>5 Look At That</h3>
              <p>Doesn't that look yummy?</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Birds_on_stick_Shanghai_Qibao.jpg" />
              <h3>6 See how this layout is broken?</h3>
              <p>That's because floats are really crap at handling layout. We've been using a screwdriver as a hammer. It sort of works, but badly.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Restaurant_food_Kunming_Yunnan.jpg" />
              <h3>7 The New CSS Will Fix Things</h3>
              <p>Finally we get some real hammers.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Bunter_Teller.jpg" />
              <h3>8 Several Kinds of Hammers</h3>
              <p>Grid, Flexbox, Alignment, Shapes, .</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/P3-Egyptian_food_Koshary.jpg" />
              <h3>9 Size, Isn't That Magical!</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris tindunt.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Mexican_food.jpg" />
              <h3>10 All of These Headlines</h3>
              <p>Always three lines of text, which fits exactly in the available space. Describing where you will go when you click.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/P2-Arepitas_Food_Macro.jpg" />
              <h3>11 Are Exactly the Same</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris tindunt.</p>
            </article>
            <article>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/Ravenna_food.jpg" />
              <h3>12 Size, Isn't That Magical!</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris tindunt.</p>
            </article>
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