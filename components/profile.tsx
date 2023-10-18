import Image from "next/image";
import Link from "next/link";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Avatar,
  Pagination,
  Space,
  Tabs,
  Input,
  Tooltip,
} from "antd";
import CollabRequestTab from "./collabRequestTab";
import SamplePage from "./samplePage";
import SocialProspectusPage from "./socialProspectus";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import * as action from "../state/action";
import Loader from "./loader";
import SendCollabRequestModal from "./modal/sendCollabRequestModal";
import CollabRequest from "./collabRequestSend";
import { encryptContent } from "../helpers/helper";
import { routeToHref } from "config/routes";
1;
import Layout from "components/layout";
import {
  StarFilled,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  SaveOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useRoutesContext } from "components/routeContext";
import avatarImage from "../public/images/avatar.png";
import {
  GetPendingCollabRequest,
  GetUserSkills,
} from "../helpers/profilePageHelper";
import { ConvertTimestampToDate } from "../helpers/collabCardHelper";
import ProfilePicture from "./profilePicture";
import CategorySelector from "./categorySelector";
import { fetchArtistSkills } from "../state/action";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const collab = state.collab;

  const isFetchingCollabs = state.collab.isFetchingCollabDetails;

  const userSamples = state.sample.samples;

  const isFetchingSamples = state.sample.isFetchingSamples;

  const showCollabModal = state.collab.showCollabModal;

  const isUpdatingProfile = state.user.isUpdatingProfile;

  return {
    isUpdatingProfile,

    showCollabModal,

    userSamples,

    collab,

    isFetchingCollabs,

    isFetchingSamples,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSamples: (slug: string) =>
    dispatch(action.fetchArtistSamples(slug)),
  getCollabRequestsAction: (data: SearchCollab) =>
    dispatch(action.getCollabRequestsAction(data)),
  setShowCollabModalState: (show: boolean, id: string) =>
    dispatch(action.setShowCollabModalState(show, id)),
  updateArtistProfile: (user: any) =>
    dispatch(action.updateArtistProfile(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isSelf: boolean;

  upForCollab: boolean;

  loggedInUserId: string;

  user: User;

  isProfileComplete: boolean;

  isLoggedIn: boolean;
} & ConnectedProps<typeof connector>;

const Profile = ({
  user,
  isSelf,
  upForCollab,
  loggedInUserId,
  userSamples,
  collab,
  isLoggedIn,
  showCollabModal,
  isFetchingCollabs,
  isFetchingSamples,
  isUpdatingProfile,
  isProfileComplete,
  setShowCollabModalState,
  fetchArtistSamples,
  getCollabRequestsAction,
  updateArtistProfile,
}: Props) => {
  const router = useRouter();

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

  // const [userSocialProspectus, setUserSocialProspectus] = useState([]);
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const [hasPendingCollab, setHasPendingCollab] = useState(false);
  const [userDataCached, setUserDataCached] = useState<User>(user);
  const [isEditBioClicked, setIsEditBioClicked] = useState(false);
  const [isEditCategoriesClicked, setIsEditCategoriesClicked] = useState(false);
  const [saveArtistCategoryTrigger, setSaveArtistCategoryTrigger] =
    useState(false);
  const [updating, setUpdating] = useState("");

  const { toEditProfile, toDiscover } = useRoutesContext();

  useEffect(() => {
    fetchArtistSamples(user.slug);

    if (!isLoggedIn) {
      return;
    }
    if (isSelf) {
      getCollabRequestsAction({});
    } else {
      getCollabRequestsAction({
        otherUserId: user.artist_id,
      });
    }
  }, [user.slug]);

  useEffect(() => {
    setHasPendingCollab(false);
    setCollabRequestDetails(emptyCollabDetails);
    if (!isFetchingCollabs && !isSelf) {
      // you are checking someone else page therefore fetch collab status.
      var filteredCollab = GetPendingCollabRequest(
        collab,
        loggedInUserId,
        user.artist_id
      );

      if (filteredCollab.id !== "") {
        // empty collab receieved.
        setCollabRequestDetails(filteredCollab);
        setHasPendingCollab(true);
      }
    }
  }, [collab, user.artist_id]);

  // data from prismic.io returns the image src as an absolute url, so no need to set up the full url on loader....

  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  // show loader till the collab requests of other user is fetched (for collaborate button status)

  if (isLoggedIn && !isSelf && collab.isFetchingCollabDetails) {
    return <Loader />;
  }

  const onSave = () => {
    updateArtistProfile(userDataCached);
    setIsEditBioClicked(false);
  };

  const getIconForEditBio = () => {
    if (isUpdatingProfile && updating === "bio") {
      return <LoadingOutlined />;
    }

    if (isEditBioClicked) {
      return (
        <SaveOutlined
          style={{ display: "flex", alignItems: "center" }}
          onClick={onSave}
        />
      );
    }

    return (
      <EditOutlined
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          setIsEditBioClicked(true);
          setUpdating("bio");
        }}
      />
    );
  };

  const getIconForEditCategories = () => {
    if (isUpdatingProfile && updating === "categories") {
      return <LoadingOutlined />;
    }

    if (isEditCategoriesClicked) {
      return (
        <SaveOutlined
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setSaveArtistCategoryTrigger(true);
          }}
        />
      );
    }

    return (
      <EditOutlined
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          setIsEditCategoriesClicked(true);
          setUpdating("categories");
        }}
      />
    );
  };

  const getButton = () => {
    if (!isLoggedIn) {
      return !upForCollab ? (
        <span className="common-text-style">
          <CloseOutlined style={{ color: "red", marginTop: "20px" }} />
          {user.first_name} is not available to collab!{" "}
        </span>
      ) : (
        <span className="common-text-style">
          <CheckOutlined style={{ color: "green", marginTop: "20px" }} />
          {user.first_name} is available to collab!{" "}
        </span>
      )
    }
    return isSelf ? (
      <Tooltip title={isLoggedIn ? "" : "Login to send collab request"}>
        <Button
          type="primary"
          disabled={!isLoggedIn}
          className="common-medium-btn"
          style={{ height: "auto", marginTop: "10px" }}
        >
          <Link
            href={routeToHref(toEditProfile("profile", "profile"))}
            passHref
          >
            Edit profile.
          </Link>
        </Button>
      </Tooltip>
    ) : (
      <>
        {hasPendingCollab ? (
          <>
            <Tooltip title={isLoggedIn ? "" : "Login to view collab status"}>
              <Button
                type="primary"
                className="common-medium-btn"
                disabled={!isLoggedIn}
                style={{ height: "auto", marginTop: "10px" }}
                onClick={() => {
                  setShowCollabModalState(true, collabRequestDetails.id);
                  setCollabRequestDetails(collabRequestDetails);
                }}
              >
                {collabRequestDetails.status === "PENDING"
                  ? "Show pending request"
                  : "Show active request"}
              </Button>
            </Tooltip>

            {collabRequestDetails.status === "PENDING" ? (
              <span className="common-text-style">
                <StarFilled style={{ color: "orange", margin: "5px" }} />
                You have a pending collab request with {user.first_name}.
              </span>
            ) : (
              <span className="common-text-style">
                <StarFilled style={{ color: "orange", margin: "5px" }} />
                You have an active collab request with {user.first_name}.
              </span>
            )}
          </>
        ) : (
          <>
            <Tooltip title={isLoggedIn ? "" : "Login to send collab request"}>
              <Button
                type="primary"
                className="common-medium-btn"
                style={{ height: "auto", marginTop: "10px" }}
                disabled={!isLoggedIn || !upForCollab}
                onClick={() => {
                  setShowCollabModalState(true, collabRequestDetails.id);
                }}
              >
                {" "}
                Let&apos;s collaborate
              </Button>
            </Tooltip>

            {!upForCollab ? (
              <span className="common-text-style">
                <CloseOutlined style={{ color: "red", marginTop: "20px" }} />
                {user.first_name} is not available to collab!{" "}
              </span>
            ) : (
              <span className="common-text-style">
                <CheckOutlined style={{ color: "green", marginTop: "20px" }} />
                {user.first_name} is available to collab!{" "}
              </span>
            )}
          </>
        )}
      </>
    );
  };

  const getBioComponent = () => {
    if (!isEditBioClicked) {
      return (
        <p className="mt4 artistProfile__bioContainer common-p-style">
          {user.bio}
        </p>
      );
    }

    return (
      <Input.TextArea
        className="mt4 artistProfile__bioContainer common-p-style"
        value={userDataCached.bio}
        maxLength={300}
        showCount
        onChange={(e) => {
          setUserDataCached((prevState) => ({
            ...prevState,

            bio: e.target.value,
          }));
        }}
      />
    );
  };

  return (
    <>
      <div className="artistProfile__profileContainer">
        {isProfileComplete !== null && isSelf && (
          <>
            {!isProfileComplete ? (
              <div
                style={{
                  backgroundColor: "#EDC5CD",

                  paddingBottom: ".5px",

                  paddingTop: "1%",

                  textAlign: "center",
                }}
              >
                <p>
                  <b>{user.first_name}</b>, looks like your profile is not
                  complete 😔. For maximum reach, please complete it by adding
                  bio, skills, samples, and social account.
                  <Link
                    href={routeToHref(toEditProfile("profile", "profile"))}
                    passHref
                  >
                    {" here."}
                  </Link>
                </p>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#E2F0CB",

                  paddingBottom: ".5px",

                  paddingTop: "1%",

                  textAlign: "center",
                }}
              >
                <p>
                  <b>{user.first_name}</b> well done, your profile is complete
                  🎉. Don&apos;t forget to collaborate with fellow artists! Find
                  who is available
                  <Link href={routeToHref(toDiscover())} passHref>
                    {" now"}
                  </Link>
                </p>
              </div>
            )}{" "}
          </>
        )}

        <div className="container">
          <div className="artistProfile__profileCoverContainer">
            <div className="graph"></div>
          </div>

          <ProfilePicture isSelf={isSelf} userProfileOpened={user} />
        </div>

        <div className="artistProfile__artistDetailContainer common-text-style">
          <h2 className="f-20 common-h2-style">
            {user.first_name + " " + user.last_name}
          </h2>

          <h3 className="f-15 common-h3-style">{GetUserSkills(user, false)}</h3>

          {getButton()}
        </div>

        <div className="artistProfile__tabsContainer common-text-style">
          <Tabs defaultActiveKey="1" type="card" size={"large"} centered>
            <TabPane tab="About" key="1">
              <div className="artistProfile__tabContainer">
                <div className="artistProfile__bioButtonsContainer">
                  <b className="f-16 common-text-style">Bio</b>
                  {isSelf && getIconForEditBio()}
                </div>
                {getBioComponent()}
                <div>
                  <div className="artistProfile__bioButtonsContainer">
                    <b className="f-16 common-text-style">Skills</b>
                    {isSelf && getIconForEditCategories()}
                  </div>
                  {!isEditCategoriesClicked ? (
                    <p className="mt4 common-p-style">
                      {GetUserSkills(user, true)}{" "}
                    </p>
                  ) : (
                    <CategorySelector
                      saveArtistTrigger={saveArtistCategoryTrigger}
                      setSaveArtistTrigger={(value: boolean) => {
                        setSaveArtistCategoryTrigger(value);
                        setIsEditCategoriesClicked(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </TabPane>

            <TabPane tab="Samples" key="2">
              <div className="artistProfile__tabContainer">
                {userSamples.length == 0 ? (
                  <div className="samplePage__container">
                    <div className="samplePage__nosample">
                      {!isSelf ? (
                        <p className="common-p-style">
                          Oops, looks like {user.first_name} has not uploaded
                          any samples.
                        </p>
                      ) : (
                        <>
                          <p className="common-p-style">
                            You have not uploaded any samples. You can upload 6
                            of them now and flaunt your best work to others!
                          </p>

                          <Button className="common-medium-btn" type="primary">
                            <Link
                              href={routeToHref(
                                toEditProfile("profile", "samples")
                              )}
                              passHref
                            >
                              Upload Samples
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <SamplePage
                      isSelf={isSelf && isLoggedIn}
                      user={user}
                      showLoader={isFetchingSamples}
                    />
                  </>
                )}
              </div>
            </TabPane>

            <TabPane tab="Social prospectus" key="4">
              <div className="artistProfile__tabContainer">
                <SocialProspectusPage isSelf={isSelf} user={user} />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      {showCollabModal.show && (
        <SendCollabRequestModal
          otherUser={user.artist_id}
          onCancel={() => {
            setShowCollabModalState(false, "");
          }}
          collabDetails={collabRequestDetails}
        />
      )}
    </>
  );
};

export default connector(Profile);
