import { NextPage } from 'next'
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { routeToHref } from "config/routes";
import happyImage from "public/images/happy.svg";
import { useRoutesContext } from "../components/routeContext";
import Title from 'components/title'
import LoginModal from '../components/loginModal';
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
              You have landed on the right place! An updated list of themes and quotes will be published on this page
              <strong> every week.</strong>
              Therefore, do not forget to come back again.
              <br></br>
            </p >
            <div className="theme">
              <h5 className="card-text common-h5-style">Themes for art</h5>
              <p className="card-text common-p-style">
                1. Nature and landscapes.
              </p>
              <p className="card-text common-p-style">
                2. Abstract art and non-representational art
              </p>
              <p className="card-text common-p-style">
                3. Portraiture and figurative art
                </p>
              <p className="card-text common-p-style">
                4. Still life and objects
                </p>
              <p className="card-text common-p-style">
                5. Social issues and political commentary
                </p>
              <p className="card-text common-p-style">
                6. Culture and identity
                </p>
              <p className="card-text common-p-style">
                7. History and mythology
                </p>
              <p className="card-text common-p-style">
                8. Science and technology
                </p>
              <p className="card-text common-p-style">
                9. Pop culture and media
                </p>
              <p className="card-text common-p-style">
                10. Emotions and psychological states
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Themes for writing</h5>
              <p className="card-text common-p-style">
                  1. Relationships and love
              </p>
              <p className="card-text common-p-style">
                  2. Coming of age and personal growth
                </p>
              <p className="card-text common-p-style">
                  3. Mystery and suspense
                </p>
               <p className="card-text common-p-style">
                  4. Science fiction and fantasy
                </p>
                <p className="card-text common-p-style">
                  5. Historical fiction and non-fiction
                </p>
                <p className="card-text common-p-style">
                  6. Memoir and autobiography
                </p>
                <p className="card-text common-p-style">
                  7. Social issues and activism
                </p>
                <p className="card-text common-p-style">
                  8. Politics and government
                </p>
                <p className="card-text common-p-style">
                  9. Travel and adventure
                </p>
                <p className="card-text common-p-style">
                  10. Humor and satire
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

      <div className="getInspired-parentContainer">
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            <div className="theme">
              <h5 className="card-text common-h5-style">Last week themes</h5>
              <p className="card-text common-p-style">
                1. Sustainability: With increasing concern for the environment,
                artists are exploring themes of sustainability, eco-friendliness,
                and climate change in their work.
              </p>
              <p className="card-text common-p-style">
                2. Mental health: In the wake of the pandemic, mental health has become
                an important topic. Artwork related to mental health and wellness,
                such as mindfulness and self-care, is becoming more prevalent.
              </p>
              <p className="card-text common-p-style">
                3. Diversity and inclusion: There is a growing interest in promoting diversity
                and inclusivity in art, with artists exploring themes related to race,
                gender, sexuality, and disability.
              </p>
            </div>
          </div>
        </div>
        <div className="getInspired-sectionContainer">
          <div className="theme">
            <h5 className="card-text common-h5-style">Last week quotes</h5>
            <p className="card-text common-p-style">
              1. Healing takes time, and asking for help is a courageous step. - Mariska Hargitay
            </p>
            <p className="card-text common-p-style">
              2. The strongest people are not those who show strength in front of us, but those who
              win battles we know nothing about. - Unknown
            </p>
            <p className="card-text common-p-style">
              3. It is okay not to be okay, as long as you are not giving up. - Unknown
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(GetInspired);