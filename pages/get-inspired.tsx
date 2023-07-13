import { NextPage } from 'next'
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { routeToHref } from "config/routes";
import happyImage from "public/images/happy.svg";
import { useRoutesContext } from "../components/routeContext";
import Title from 'components/title'
import LoginModal from '../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../components/modal/newUserModal';

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
      <Title title="Ideas for your next hit" />
      <div className="getInspired-parentContainer">
        <div className="getInspired-sectionContainer">
          <div className="getInspired-happyImage">
            <Image
              src={happyImage}
              alt="Landing page"
              priority
            />
          </div>
        </div>
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            <h3 className="common-h3-style">Looking for insipiration?</h3>
            <p className="common-p-style">
              This page is the perfect destination for you. Here, we update our list of themes
              and quotes on a <strong>weekly basis</strong>, so be sure to check back often.
              You won&apos;t want to miss out!
              <br></br>
            </p >
            <div className="theme">
              {/* <h5 className="card-text common-h5-style">Important events of the month</h5> */}
              <p className="card-text common-p-style">
                Celebrate the month of June with Wondor.art. Make art on any of topics below or beyond with the artists you have been wanting to work with on your next big hit!
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Themes for the week</h5>
              <p className="card-text common-p-style">
                1. <b>Sun-inspired artwork:</b>: Create vibrant paintings or drawings that capture the warmth and radiance of the sun. Experiment with different color palettes to represent the changing hues of the sky during sunrise and sunset.
              </p>
              <p className="card-text common-p-style">
                2. <b>Nature&apos;s abundance</b>: Depict the lushness of nature during the summer season. Focus on blooming flowers, vibrant green landscapes, and abundant fruits and vegetables. Use various mediums like watercolors, pastels, or even create a nature-inspired collage.
              </p>
              <p className="card-text common-p-style">
                3. <b>Outdoor scenes</b>: Illustrate scenes of people enjoying outdoor activities that are popular during the summer months, such as picnics, beach trips, hiking, or playing sports. Capture the joy and energy of these moments in your artwork.
              </p>
              <p className="card-text common-p-style">
                4. <b>Light and shadow</b>: Explore the interplay of light and shadow during the longest day of the year. Experiment with different techniques to create dramatic effects and emphasize the changing angles of sunlight throughout the day.
              </p>
              <p className="card-text common-p-style">
                5. <b>Symbolic representations</b>: Use symbols associated with the summer solstice, such as sunflowers, bonfires, fairies, or mythical creatures like dragons. These symbols can add a touch of magic and mystery to your artwork.
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Quotes for the week</h5>
              <p className="card-text common-p-style">
                1. June is the gateway to summer! - Jean Hersey.
              </p>
              <p className="card-text common-p-style">
                2. June is the joyous month of harvest; the grass is green, the breeze is cool, and the sun&apos;s rays are golden! - Matshona Dhliwayo.
              </p>
              <p className="card-text common-p-style">
                3. And what is so rare as a day in June? Then, if ever, come perfect days! - James Russell Lowell.
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Think you got enough to get your creative juices going?</h5>
              <p className="card-text common-p-style">
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
      </div>
    </>
  )
}

export default connector(GetInspired);