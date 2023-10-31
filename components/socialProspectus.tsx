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
import { SOCIAL_PLATFORMS } from "constants/constants";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Loader from "./loader";
import { GetSocialMediaUrl, IsPersonalWebsite, GetSocialPlatformName, GetSocialPlatformImage, GetSocialPlatformBaseUrl } from '../helpers/socialProspectusHelper';

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
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);

  useEffect(() => {
    fetchArtistSocialProspectus(user.slug);
  }, []);

  useEffect(() => {
    setUserSocialProspectus(socialProspectus.socialProspectus);
  }, [socialProspectus])

  const { toEditProfile } = useRoutesContext();

  const getSocialProspectus = () => {
    const prospectusCard: JSX.Element[] = [];
    let data = userSocialProspectus.length != 0 ? userSocialProspectus[0].data : [];
    // "name": GetSocialPlatformName(element.socialPlatformId),
    data.forEach(element => {
      let iconPath = GetSocialPlatformImage(element.socialPlatformId);
      let url = GetSocialMediaUrl(element.socialPlatformId, element.handle);
      prospectusCard.push(
        <div className="col my-3">
          <div className="card border-hover-primary">
            <div className="card-body">
              <Image
                src={iconPath}
                className="card-img-top"
                alt="social platform"
                height={50}
                width={50}
              />
              <div>
                {element.upForCollab === "false" ? (
                  <p className="common-p-style"><CloseOutlined style={{ color: 'red' }} />Not available to collab</p>
                ) : (
                  <p className="common-p-style"><CheckOutlined style={{ color: 'green' }} />Available to collab</p>
                )}
              </div>
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
                    <p className="text-center common-text-style">{user.first_name}, add social media profiles and let everyone know you create art!</p>
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
                <section className="bg-light-primary">
                  <div className="row row-cols-lg-3 row-cols-md-2 row-cols-2 text-center justify-content-center px-xl-6">
                    {getSocialProspectus()}
                  </div>
                </section>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default connector(SocialProspectusPage);
