import React from "react";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import * as action from "../../../state/action";
import { fetchBasicUser } from "../../../state/action";
import CollabPage from "@/components/collabPage";
import Loader from "@/components/loader";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "@/components/routeContext";
import NotAuthorised from "@/components/error/notAuthorised";
import NewUserModal from "@/components/modal/newUserModal";
import LoginModal from "@/components/modal/loginModal";

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const loginModalDetails = state.home.loginModalDetails;

  const otherUser = state.user.basicUser;
  const isFetchingBasicUser = state.user.isFetchingBasicUser;
  const isLoggedIn = state.user.isLoggedIn;
  const isFetchingUser = state.user.isFetchingUser;
  const collab = state.collab;
  const collabWithUser = state.collab.userCollabs;
  return {
    user,
    collab,
    loginModalDetails,
    isLoggedIn,
    isFetchingUser,
    collabWithUser,
    isFetchingBasicUser,
    otherUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBasicUser: (slug: string) => dispatch(action.fetchBasicUser(slug)),
  fetchCollabsWithUser: (slug: string) =>
    dispatch(action.fetchCollabsWithUser(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const SendCollabRequestPage = ({
  user,
  collab,
  isLoggedIn,
  loginModalDetails,
  isFetchingUser,
  otherUser,
  collabWithUser,
  isFetchingBasicUser,
  fetchBasicUser,
  fetchCollabsWithUser,
}: Props) => {
  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: "",
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined,
  };

  const { toCollabPage } = useRoutesContext();
  const [isSelf, setIsSelf] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const router = useRouter();
  const { slug: slug } = router.query;

  useEffect(() => {
    fetchBasicUser(slug.toString());
    fetchCollabsWithUser(slug.toString());
  }, []);

  
  if (otherUser === {}) {
    return <div />;
  }

  if (otherUser.userId === null) {
    return <p>No such user</p>;
  }


  const getUserName = (user: User) => {
    return user.first_name + " " + user.last_name;
  }

  return (
    <Layout
      title={
        "Send collab request to " +
        (isSelf ? getUserName(user) : getUserName(otherUser)) +
        " | Wondor"
      }
      name={"description"}
      content={
        "Work with " + (isSelf ? getUserName(user) : getUserName(otherUser)) +
        ". Send them a collaboration request | Wondor"
      }
    >
      {isLoggedIn ? (
        <CollabPage
          otherUser={otherUser}
          pastCollabs={collabWithUser.collabs}
          isFetchingPastCollabs={collabWithUser.isFetchingCollabsWithUser}
          isFetchingOtherUser={isFetchingBasicUser}
          onCollabRequestSend={(id: string) => {
            router.push("/collab/details/" + id);
          }}
        />
      ) : (
        <NotAuthorised error={"Please login to see collaboration details."} />
      )}
    </Layout>
  )
};

export default connector(SendCollabRequestPage);
