/* eslint-disable @next/next/no-img-element */
import React, { SyntheticEvent, useState } from "react";
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
  otherUser: any;
  pastCollabs: any[];
  isFetchingOtherUser: boolean;
  isFetchingPastCollabs: boolean;
  onCollabRequestSend: (id: string) => void;
} & ConnectedProps<typeof connector>;

const CollabPage = ({
  user,
  otherUser,
  pastCollabs,
  isFetchingPastCollabs,
  isFetchingOtherUser,
  onCollabRequestSend
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

  const { toArtistProfile, toCollabPage } = useRoutesContext();
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const getDate = (collabTime: number) => {
    return moment(collabTime).format("DD-MM-YYYY");
  };

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

  return (
    <div>
      <div className="collabPage_container">
        <p className="h1 collabPage_title">{`Your collaboration with ${otherUser.firstName}`}</p>
        <div className="padding20_sides">
          <Alert
            banner
            message="NOTE : You can have a maximum of 3 open collaborations with an artist at a time."
          ></Alert>
        </div>
        <div className="collabPage_userAndFormContainer">
          {/* JUST USER CARD */}
          <div className="collabPage_userCollabPageContainer">
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
                <div className="mt16 collabPage_pastCollabCardsContainer">{getCollabCards()}</div>
              )}
            </div>
          </div>
          {/* USER CARD ENDS */}
          <div className="collabPage_formContainer padding20">
            <SendCollabRequestModal
              otherUser={otherUser.userId}
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
