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
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Loader from "./loader";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => ({
  socialProspectus: state.socialProspectus,
  isFetchingSocialProspectus: state.socialProspectus?.isFetchingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSocialProspectus: (slug: string) => dispatch(actions.fetchArtistSocialProspectus(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  isSelf: boolean;
} & ConnectedProps<typeof connector>;

const SocialProspectusPage = ({
  user,
  isSelf,
  socialProspectus,
  isFetchingSocialProspectus,
  fetchArtistSocialProspectus,
}: Props) => {
  const router = useRouter();
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);

  useEffect(() => {
    fetchArtistSocialProspectus(user.slug);
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

  const { toEditProfile } = useRoutesContext();

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
          <div className="card" style={{ width: "18rem;" }}>
            <Image
              width={100}
              height={200}
              src={InstagramImg}
              className="card-img-top"
              alt="social platform" />
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

  console.log(isFetchingSocialProspectus);
  return (

    <>
      {isFetchingSocialProspectus? (
        <Loader/>
      ) : (
        <>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {(userSocialProspectus.length === 0 || userSocialProspectus[0].data.length == 0) && (
            <>
              {isSelf ? (
                <div className="socialProspectus_noProfiles">
                  <p className="text-center">{user.first_name}, add social profiles and Let everyone know!</p>
                  <Button
                    type="primary"
                  >
                    <Link
                      href={routeToHref(toEditProfile("profile", "samples"))}
                      passHref
                    >Add profiles</Link>
                  </Button>
                </div>
              ) : (
                <div className="socialProspectus_noProfiles">
                  <p className="text-center">Oops, looks like {user.first_name} has not added any social profile.</p>
                </div>
              )}
            </>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {socialProspectus.length != 0 && (
            <div className="container">
              <div className="row socialProspectus_viewCardContainer">
                {getCurrentSocialProspectus()}
              </div>
            </div>
          )
          }
        </div>
        </>
      )}
    </>
  );
};

export default connector(SocialProspectusPage);
