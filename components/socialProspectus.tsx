import Image from "next/image";
import {
  CloseOutlined,
  CheckOutlined,
  PictureOutlined,
} from "@ant-design/icons";
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

  const getSocialPlatformImage = (socialPlatformId) => {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
      if (SOCIAL_PLATFORMS[i].id == socialPlatformId) {
        return SOCIAL_PLATFORMS[i].image;
      }
    }
  }

  const getSocialPlatformBaseUrl = (socialPlatformId) => {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
      if (SOCIAL_PLATFORMS[i].id == socialPlatformId) {
        return SOCIAL_PLATFORMS[i].base_url;
      }
    }
  }

  const getCurrentSocialProspectus = () => {
    const prospectusCard: JSX.Element[] = [];
    let data = userSocialProspectus.length != 0 ? userSocialProspectus[0].data : [];
    // "name": getSocialPlatformName(element.socialPlatformId),
    data.forEach(element => {
      let iconPath = getSocialPlatformImage(element.socialPlatformId);
      let url = getSocialPlatformBaseUrl(element.socialPlatformId).concat("/", element.handle);
      prospectusCard.push(
        <div>
          <div className="row p-2 bg-white border rounded social-card">
            <div className="col-md-3 mt-1 social-profile-picture">
              <Image
                src={iconPath}
                className="card-img-top"
                alt="social platform" />
            </div>
            <div className="col-md-6 mt-1">
              <h5 className="common-h5-style">{element.handle}</h5>
              <p className="text-justify para mb-0  break-word common-p-style">{element.description}<br></br><br></br></p>
              <div>
                {element.up_for_collab == "false" ? (
                  <p className="common-p-style"><CloseOutlined style={{ color: 'red', marginRight: '5px' }} />{user.first_name} is not available to collab on {getSocialPlatformName(element.socialPlatformId)}</p>
                ) : (
                  <p className="common-p-style"><CheckOutlined style={{ color: 'green', marginRight: '5px' }} />{user.first_name} is available to collab on {getSocialPlatformName(element.socialPlatformId)}</p>
                )}
              </div>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-column mt-4">
                <Button
                  block
                  type="primary"
                  className="common-btn-dimension"
                  style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
                  <a href={url} target="_blank" rel="noopener noreferrer">Profile</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return prospectusCard;
  }

  return (
    <>
      {isFetchingSocialProspectus ? (
        <Loader />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {(userSocialProspectus.length === 0 || userSocialProspectus[0].data.length == 0) && (
              <>
                {isSelf ? (
                  <div className="socialProspectus_noProfiles">
                    <p className="text-center common-text-style">{user.first_name}, add social media profiles and Let everyone know you are a creator!</p>
                    <Button
                      type="primary"
                      className="common-btn-dimension"
                    >
                      <Link
                        href={routeToHref(toEditProfile("profile", "social-prospectus"))}
                        passHref
                      >Add profiles</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="socialProspectus_noProfiles">
                    <p className="text-center common-text-style">Oops, looks like {user.first_name} has not added any social media profile.</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {socialProspectus && (
              <div className="col-md-8 socialProspectus_viewCardContainer">
                {getCurrentSocialProspectus()}
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
