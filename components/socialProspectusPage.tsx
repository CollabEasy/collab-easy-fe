import Image from "next/image";
import AvatarImg from "../public/images/avatar.png";
import InstagramImg from "../public/images/instagram.png";
import FacebookImg from "../public/images/facebook.png";
import TikTokImg from "../public/images/tiktok.png";
import React, { useEffect, useState } from "react";
import { Card, Tabs, Button } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSocialProspectus } from "types/model";
import * as actions from "state/action";
import { SOCIAL_PLATFORMS } from "config/constants";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => ({
  socialProspectus: state.socialProspectus,
  isFetchingSocialProspectus: state.socialProspectus?.isFetchingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSocialProspectus: () => dispatch(actions.fetchArtistSocialProspectus()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const SocialProspectusPage = ({
  socialProspectus,
  isFetchingSocialProspectus,
  fetchArtistSocialProspectus,
}: Props) => {
  const router = useRouter();
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);

  useEffect(() => {
    fetchArtistSocialProspectus();
  }, []);

  useEffect(() => {
    setUserSocialProspectus(socialProspectus.socialProspectus);
  }, [socialProspectus])

  const getSocialPlatformName = (id) => {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
      if (SOCIAL_PLATFORMS[i].id === id) {
        return SOCIAL_PLATFORMS[i].name;
      }
    }
    return "";
  };

  const GetSocialPlatformImage = (socialPlatformId) => {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
      if (SOCIAL_PLATFORMS[i].id == socialPlatformId) {
        return SOCIAL_PLATFORMS[i].image;
      }
    }
  }

  const getCurrentSocialProspectus = () => {
    const prospectusCard: JSX.Element[] = [];
    let data = userSocialProspectus.length != 0 ? userSocialProspectus[0].data : [];
    // "name": getSocialPlatformName(element.socialPlatformId),
    data.forEach(element => {
      let iconPath = GetSocialPlatformImage(element.socialPlatformId);
      prospectusCard.push(
        <div className="col-sm-3">
          <div className="card" style={{width: "18rem;"}}>
            <Image
              width={100}
              height={200}
              src={InstagramImg}
              className="card-img-top" 
              alt="social platform"/>
            <div className="card-body text-center">
              <h4>{element.handle}</h4>
              <p className="card-text">{element.description}</p>
            </div>
          </div>
        </div>
      )
    });

    return prospectusCard;
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {socialProspectus.length === 0 && (
          <h2 className="text-center">🥺 Let everyone know 🥺.</h2>
        )}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {socialProspectus.length === 0 ? (
          <Button
            shape="round"
            //size="large"
            type="primary"
          >Add more profiles.
          </Button>
        ) : (
            <div className="container">
              <div className="row socialProspectus_viewCardContainer">
                {getCurrentSocialProspectus()}
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default connector(SocialProspectusPage);
