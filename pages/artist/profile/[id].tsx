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


import LoginModal from '@/components/loginModal';
import { updateLoginData } from 'state/action';
import { LoginModalDetails } from 'types/model';
import NewUserModal from '@/components/modal/newUserModal';

// https://ant.design/components/card/
const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const artistListData = state.home.artistListDetails;
  return { user, isLoggedIn, loginModalDetails, artistListData }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSocialProspectus: (slug: string) => dispatch(actions.fetchArtistSocialProspectus(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ArtistProfile = ({
  user,
  isLoggedIn,
  loginModalDetails,
  fetchArtistSocialProspectus }: Props) => {
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
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
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
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
