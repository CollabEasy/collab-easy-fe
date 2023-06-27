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
import { useRoutesContext } from "./routeContext";
import router from "next/router";
import CollabCalender from "./collabCalender";

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
  const { toCollabPage } = useRoutesContext();
  const dispatch = useDispatch();
  const [allSentReceivedStatus, setAllSentReceivedStatus] = useState("all");
  const [collabStatusFilter, setCollabStatusFilter] = useState("all");
  const dateToday = new Date();
  const [selectedDate, setSelectedDate] = useState(dateToday.getDate() + "/" + dateToday.getMonth() + "/" + dateToday.getFullYear());

  const dateToCollabRequestMap = {}
  collabRequests['sent']['all'].forEach(collabRequest => {
    const currCollabDate = new Date(collabRequest.collabDate);
    const collabDate = currCollabDate.getDate() + "/" + currCollabDate.getMonth() + "/" + currCollabDate.getFullYear();
    if (!(collabDate in dateToCollabRequestMap)) {
      dateToCollabRequestMap[collabDate] = [];
    }
    dateToCollabRequestMap[collabDate].push(collabRequest);
  });

  collabRequests['received']['all'].forEach(collabRequest => {
    const currCollabDate = new Date(collabRequest.collabDate);
    const collabDate = currCollabDate.getDate() + "/" + currCollabDate.getMonth() + "/" + currCollabDate.getFullYear();
    if (!(collabDate in dateToCollabRequestMap)) {
      dateToCollabRequestMap[collabDate] = [];
    }
    dateToCollabRequestMap[collabDate].push(collabRequest);
  });

  const getCollabRequestCards = () => {
    let requestsToShow = [];
    // if (allSentReceivedStatus === "all") {
    //   if (collabStatusFilter === "all") {
    //     requestsToShow = collabRequests["sent"]["all"].concat(collabRequests["received"]["all"]);
    //   } else {
    //     requestsToShow = collabRequests["sent"][collabStatusFilter].concat(collabRequests["received"][collabStatusFilter]);
    //   }
    // }
    // else {
    //   requestsToShow = collabRequests[allSentReceivedStatus][collabStatusFilter];
    // }
    requestsToShow = dateToCollabRequestMap[selectedDate] ?? [];
    const htmlElement: JSX.Element[] = [];
    requestsToShow.forEach((request: CollabRequestData, index: number) => {
      htmlElement.push(
        <div>
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
          <CollabCalender events={dateToCollabRequestMap} onSelectDate={(date: string) => {setSelectedDate(date)}} />
          {/* <Select
            className="collabRequestTab__filter collabRequestTab__antFilter"
            defaultValue="all"
            onChange={(value) => {
              setAllSentReceivedStatus(value);
            }}
          >
            <Option value="all">All</Option>
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
          </Select> */}
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
