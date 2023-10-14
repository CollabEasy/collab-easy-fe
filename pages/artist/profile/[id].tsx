import Layout from "../../../components/layout";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Card } from "antd";
import Profile from "components/profile";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import * as artistApi from "api/artist-user";
import { User } from "types/model";
import * as actions from "state/action";
import Loader from "@/components/loader";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";

// https://ant.design/components/card/
const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const artistListData = state.home.artistListDetails;
  return { user, isLoggedIn, loginModalDetails, artistListData };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSocialProspectus: (slug: string) =>
    dispatch(actions.fetchArtistSocialProspectus(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ArtistProfile = ({
  user,
  isLoggedIn,
  loginModalDetails,
  artistListData,
  fetchArtistSocialProspectus,
}: Props) => {
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isSelf, setIsSelf] = useState(false);
  const [upForCollab, setCollaborationStatus] = useState(true);
  const [otherUser, setOtherUser] = useState<User>({});
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  useEffect(() => {
    async function fetchOtherUser() {
      let res = await artistApi.fetchUserByHandle(slug.toString());
      if (res.data !== undefined) {
        setOtherUser(res.data);
        setCollaborationStatus(
          res.data.up_for_collab === "true" ? true : false
        );
      }
    }

    async function updateProfileCompleteStatus() {
      let res = await artistApi.fetchProfileCompleteStatus();
      if (res.data !== undefined) {
        setIsProfileComplete(res.data);
      }
    }

    const { id: slug } = router.query;
    if (user.slug === slug) {
      setIsSelf(true);
      if (isLoggedIn && (!isProfileComplete || isProfileComplete === null)) {
        updateProfileCompleteStatus();
      }
    } else {
      setShowLoader(true);
      setIsSelf(false);
      fetchOtherUser();
    }
    setShowLoader(false);
    fetchArtistSocialProspectus(user.slug);
  }, [router.query, user.slug]);

  if (
    showLoader ||
    (isSelf && Object.keys(user).length === 1) ||
    (!isSelf && (!otherUser || Object.keys(otherUser).length === 0))
  ) {
    return <Loader />;
  }

  return (
    <Layout
      title={
        (isSelf ? user.first_name : otherUser.first_name) +
        " " +
        (isSelf ? user.last_name : otherUser.last_name) +
        " - Send Collaboration Request Now | Wondor"
      }
      name={"description"}
      content={
        "Work with " +
        (isSelf ? user.first_name : otherUser.first_name) +
        " " +
        (isSelf ? user.last_name : otherUser.last_name) +
        ". Send them a collaboration request."
      }
    >
      {loginModalDetails.openModal && !user.new_user && <LoginModal />}
      {showProfileModal && <NewUserModal />}
      <Profile
          isSelf={isSelf}
          upForCollab={upForCollab}
          isLoggedIn={isLoggedIn}
          loggedInUserId={isLoggedIn ? user.artist_id : ""}
          user={isSelf ? user : otherUser}
          isProfileComplete={isProfileComplete}
        />
    </Layout>
  );
};

export default connector(ArtistProfile);
