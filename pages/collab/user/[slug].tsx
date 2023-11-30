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

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const otherUser = state.user.basicUser;
  const isFetchingBasicUser = state.user.isFetchingBasicUser;
  const isLoggedIn = state.user.isLoggedIn;
  const collab = state.collab;
  const collabWithUser = state.collab.userCollabs;
  return {
    user,
    collab,
    isLoggedIn,
    collabWithUser,
    isFetchingBasicUser,
    otherUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBasicUser: (slug: string) => dispatch(action.fetchBasicUser(slug)),
  fetchCollabsWithUser: (slug: string) => dispatch(action.fetchCollabsWithUser(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const SendCollabRequestPage = ({
  user,
  collab,
  isLoggedIn,
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

  const router = useRouter();
  const { slug: slug } = router.query;

  if (!isLoggedIn) {
      return <NotAuthorised
      error={"Please login to collaborate with artists."}
  />
  }

  useEffect(() => {
    fetchBasicUser(slug.toString());
    fetchCollabsWithUser(slug.toString());
  }, []);

  if (isFetchingBasicUser) {
      return <Loader />
  }

  if (otherUser === {}) {
      return <div />
  }

  if (otherUser.userId === null) {
      return <p>No such user</p>
  }

  return (
    <Layout
      title={
        "Send collab request to " +
        (isSelf ? user.last_name : otherUser.last_name) +
        " | Wondor"
      }
      name={"description"}
      content={
        "Work with " +
        (isSelf ? user.first_name : otherUser.first_name) +
        " " +
        (isSelf ? user.last_name : otherUser.last_name) +
        ". Send them a collaboration request | Wondor"
      }
    >
      <CollabPage
        otherUser={otherUser}
        pastCollabs={collabWithUser.collabs}
        isFetchingPastCollabs={collabWithUser.isFetchingCollabsWithUser}
        isFetchingOtherUser={isFetchingBasicUser}
        onCollabRequestSend={(id: string) => {
            router.push("/collab/details/" + id);
        }}
      />
    </Layout>
  );
};

export default connector(SendCollabRequestPage);
