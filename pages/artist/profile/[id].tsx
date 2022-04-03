import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Pagination, Space, Tabs } from "antd";
import { Button, Card, Avatar, Result, Skeleton } from "antd";
import Profile from "components/profile";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import * as artistApi from "api/artist-user"
import { User } from "types/model";
import * as actions from "state/action";
import Loader from "@/components/loader";
import NotAuthorised from "@/components/error/notAuthorised";

// https://ant.design/components/card/
const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  return { user, isLoggedIn }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSocialProspectus: (slug: string) => dispatch(actions.fetchArtistSocialProspectus(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ArtistProfile = ({ user, isLoggedIn, fetchArtistSocialProspectus }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [isSelf, setIsSelf] = useState(false);
  const [upForCollab, setCollaborationStatus] = useState(true);
  const [otherUser, setOtherUser] = useState<User>({});

  useEffect(() => {
    async function fetchOtherUser() {
      let res = await artistApi.fetchUserByHandle(slug.toString())
      setOtherUser(res.data);
      setCollaborationStatus(
        res.data.up_for_collab == "true" ? true : false
      );
    }

    const { id: slug } = router.query;
    if (user.slug === slug) {
      setIsSelf(true);
    } else {
      setShowLoader(true);
      setIsSelf(false);
      fetchOtherUser();
    }
    setShowLoader(false);
    fetchArtistSocialProspectus(user.slug);
  }, [router.query, user.slug]);

  if (showLoader || (isSelf && Object.keys(user).length === 1) ||
    (!isSelf && (!otherUser || Object.keys(otherUser).length === 0))) {
    return <Loader />;
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          <NotAuthorised />
        </>
      ) : (
        <Profile
          isSelf={isSelf}
          upForCollab={upForCollab}
          user={isSelf ? user : otherUser}
        />
      )}
    </>
  );
};

export default connector(ArtistProfile);
