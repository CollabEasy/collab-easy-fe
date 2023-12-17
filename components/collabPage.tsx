/* eslint-disable @next/next/no-img-element */
import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  Artist,
  CollabRequestData,
  SendCollabRequest as CollabRequestModel,
} from "types/model";
import { Dispatch } from "redux";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { Alert, DatePicker } from "antd";
import Image from "next/image";
import { AppState } from "state";
import { GetUserSkillsTags } from "../helpers/profilePageHelper";
import SendCollabRequestModal from "./modal/sendCollabRequestModal";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "./routeContext";
import { getCollabCardTag } from "../helpers/collabPageHelper";
import moment from "moment";
import Loader from "./loader";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  bigScreenWidth?: number;
  otherUser: any;
  showBackButton?: boolean;
  proposalId?: string;
  onClickBackButton?: () => void;
  pastCollabs: any[];
  isFetchingOtherUser: boolean;
  isFetchingPastCollabs: boolean;
  onCollabRequestSend: (id: string) => void;
  collabTitle?: string;
  collabTheme?: string;
  collabDate?: Date;
} & ConnectedProps<typeof connector>;

const CollabPage = ({
  user,
  bigScreenWidth = 1200,
  showBackButton = false,
  collabTitle = "",
  collabTheme = "",
  proposalId="",
  collabDate = new Date(),
  otherUser,
  pastCollabs,
  isFetchingPastCollabs,
  isFetchingOtherUser,
  onClickBackButton,
  onCollabRequestSend,
}: Props) => {
  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: collabDate,
    requestData: {
      message: collabTitle,
      collabTheme: collabTheme,
    },

    status: "",
    createdAt: undefined,
    updatedAt: undefined,
    proposalId: proposalId,
  };

  const { toArtistProfile, toCollabPage } = useRoutesContext();
  const [width, setWidth] = useState(0);
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const getDate = (collabTime: number) => {
    return moment(collabTime).format("DD-MM-YYYY");
  };

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);

  const getCollabCards = () => {
    const collabsCards = [];
    if (pastCollabs.length === 0) {
      return <Alert message="No open collaborations" type="info" showIcon />;
    }
    pastCollabs.forEach((collab) => {
      collabsCards.push(
        <div className="padding20_sides collabPage_pastRequestCardContainer">
          <a className="h4 mt16" href={routeToHref(toCollabPage(collab.id))}>
            {collab.requestData.collabTheme}
          </a>
          <div className="collabPage_collabCard_dateStatusContainer">
            <p>{getDate(collab.collabDate)}</p>
            {getCollabCardTag(collab.status)}
          </div>
        </div>
      );
    });
    return collabsCards;
  };
  const bannerMsg =
    pastCollabs.length < 3
      ? "NOTE : You can have a maximum of 3 open collaborations with an artist at a time."
      : "NOTE : You already have 3 open collaboration requests with the artist. Please complete or close existing.";

  return (
    <div>
      <div className="collabPage_container">
        {showBackButton && (
          <p
            onClick={() => {
              onClickBackButton();
            }}
            className="padding20 textlink"
          >
            {"< Go Back"}
          </p>
        )}
        <h1 className="common-h1-style collabPage_title">{`Your collaboration(s) with ${otherUser.firstName}`}</h1>
        <div className="padding20_sides">
          <Alert
            banner
            type={ pastCollabs.length < 3 ? "info" : "error"}
            message={bannerMsg}
          ></Alert>
        </div>
        <div className="collabPage_userAndFormContainer">
          {/* JUST USER CARD */}
          <div
            className={
              width > bigScreenWidth
                ? "collabPage_userCollabPageContainer"
                : "collabPage_userCollabPageContainerFullWidth"
            }
          >
            <div className="collabPage_userContainer">
              <div className="collabPage_picNameContainer padding20">
                <img src={otherUser.profilePicUrl} className="profilePic" />
                <div className="collabPage_skill_name_container">
                  <a
                    href={routeToHref(toArtistProfile(otherUser.slug))}
                    className="h4"
                  >
                    {otherUser.firstName} {otherUser.lastName}
                  </a>
                </div>
              </div>
              <p className="mt4 artistProfile__skillsAndSocialContainer common-p-style">
                {GetUserSkillsTags(otherUser.skills, true)}
              </p>
            </div>
            <div className="collabPage_pastRequestContainer">
              <p className="h4 text-center">Active/Pending Collaborations</p>
              {isFetchingPastCollabs ? (
                <Loader />
              ) : (
                <div className="mt16 collabPage_pastCollabCardsContainer">
                  {getCollabCards()}
                </div>
              )}
            </div>
          </div>
          {/* USER CARD ENDS */}
          <div
            className={
              width > bigScreenWidth
                ? "collabPage_formContainer padding20"
                : "collabPage_formContainerFullWidth padding20"
            }
          >
            <SendCollabRequestModal
              proposalId={proposalId}
              otherUser={otherUser.userId}
              sendButtonEnabled={pastCollabs.length < 3}
              collabDetails={collabRequestDetails}
              onCollabRequestSend={(id: string) => {
                onCollabRequestSend(id);
              }}
            />
          </div>
        </div>

        {/* <img src={otherUser.profilePicUrl} className="profilePic" /> */}
      </div>
    </div>
  );
};

export default connector(CollabPage);
