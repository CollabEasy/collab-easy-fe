import React, { useEffect, useState } from "react";
import { Pagination, Button, Card, Avatar, Select } from "antd";
import Meta from "antd/lib/card/Meta";
import {
  CollabRequestData,
  CollabResponse,
  SendCollabRequest,
} from "types/model";
import { AppState } from "state";
import {
  acceptCollabRequestAction,
  getCollabRequestsAction,
  rejectCollabRequestAction,
} from "state/action";
import { Dispatch } from "redux";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import * as action from "./../state/action";
import { CollabRequestStatus } from "config/constants";
import CollabDetailCard from "./collabDetailCard";
import Loader from "./loader";

const { Option } = Select;

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isFetchingCollabDetails: state.collab.isFetchingCollabDetails,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendCollabRequestAction: (data: SendCollabRequest) =>
    dispatch(action.sendCollabRequestAction(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  otherUser: string;
  collabRequests: CollabResponse;
  onClickCollabRequest: (collabRequest: CollabRequestData) => void;
} & ConnectedProps<typeof connector>;



export const CollabRequestTab = ({
  user,
  otherUser,
  collabRequests,
  isFetchingCollabDetails,
  onClickCollabRequest,
}: Props) => {
  const dispatch = useDispatch();
  const [sentReceivedStatus, setSentReceivedStatus] = useState("received");
  const [collabStatusFilter, setCollabStatusFilter] = useState("all");

  const getCollabRequestCards = () => {
    const requestsToShow =
      collabRequests[sentReceivedStatus][collabStatusFilter];
    const htmlElement: JSX.Element[] = [];
    requestsToShow.forEach((request: CollabRequestData, index: number) => {
      htmlElement.push(
        <div
          style={request.status !== "COMPLETED" ? { cursor: "pointer" } : {}}
          onClick={() => {
            if (request.status !== "COMPLETED") onClickCollabRequest(request);
          }}
        >
          <CollabDetailCard showUser={user.artist_id === otherUser} collabDetails={request} />
        </div>
      );
    });

    return htmlElement;
  };

  return (
    <>
      <div className="collabRequestTab__container">
        <div className="collabRequestTab__filterContainer">
          <Select
            className="collabRequestTab__filter collabRequestTab__antFilter"
            defaultValue="Received"
            onChange={(value) => {
              setSentReceivedStatus(value);
            }}
          >
            <Option value="sent">Sent</Option>
            <Option value="received">Received</Option>
          </Select>
          <Select
            className="collabRequestTab__filter collabRequestTab__antFilter"
            defaultValue="all"
            onChange={(value) => {
              setCollabStatusFilter(value);
            }}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="pending">Pending</Option>
            <Option value="rejected">Rejected</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>
      </div>

      {isFetchingCollabDetails ? (
        <Loader />
      ) : (
        <div className="collabRequestTab__collabListContainer">
          {getCollabRequestCards()}
        </div>
      )}
    </>
  );
};

export default connector(CollabRequestTab);
