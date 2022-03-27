import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Pagination, Space, Tabs } from "antd";
import { Button, Card, Avatar } from "antd";
import Profile from "components/profile";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import * as artistApi from "api/artist-user"
import { User } from "types/model";
import Loader from "@/components/loader";

// https://ant.design/components/card/
const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  return { user }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ArtistProfile = ({ user }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [isSelf, setIsSelf] = useState(false);
  const [upForCollab, setCollaborationStatus] = useState(true);
  const [otherUser, setOtherUser] = useState<User>({});

  useEffect(() => {
    async function fetchOtherUser() {
      let res = await artistApi.fetchUserByHandle(slug.toString())
      setOtherUser(res.data);
      console.log(res.data);
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
  }, [router.query, user.slug]);

  if (showLoader || (isSelf && Object.keys(user).length === 1) ||
      (!isSelf && (!otherUser || Object.keys(otherUser).length === 0)))
    return <Loader />;

  return (
    <Profile 
      isSelf={isSelf}
      upForCollab={upForCollab}
      user={isSelf ? user : otherUser}
    />
  );
};

export default connector(ArtistProfile);
