import React, { useEffect, useState } from "react";
import { Pagination, Button, Card, Avatar, Select, Table } from "antd";
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
import { CollabRequestStatus } from "constants/constants";
import CollabDetailCard from "./collabDetailCard";
import Loader from "./loader";
import { useRoutesContext } from "./routeContext";
import router from "next/router";
import CollabCalender from "./collabCalender";
import Layout from "@/components/layout";
import $ from "jquery";
import Link from "next/link";
import { GetCollabHeading } from "helpers/collabCardHelper";

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
  const dateTodayStr =
    dateToday.getFullYear() +
    "/" +
    (dateToday.getMonth() + 1) +
    "/" +
    dateToday.getDate();

  const [selectedDate, setSelectedDate] = useState(dateTodayStr);

  const dateToCollabRequestMap = {};
  collabRequests["sent"]["all"].forEach((collabRequest) => {
    const currCollabDate = new Date(collabRequest.collabDate);
    const collabDate =
      currCollabDate.getFullYear() +
      "/" +
      (currCollabDate.getMonth() + 1) +
      "/" +
      currCollabDate.getDate();
    if (!(collabDate in dateToCollabRequestMap)) {
      dateToCollabRequestMap[collabDate] = [];
    }
    dateToCollabRequestMap[collabDate].push(collabRequest);
  });

  collabRequests["received"]["all"].forEach((collabRequest) => {
    const currCollabDate = new Date(collabRequest.collabDate);
    const collabDate =
      currCollabDate.getFullYear() +
      "/" +
      (currCollabDate.getMonth() + 1) +
      "/" +
      currCollabDate.getDate();
    if (!(collabDate in dateToCollabRequestMap)) {
      dateToCollabRequestMap[collabDate] = [];
    }
    dateToCollabRequestMap[collabDate].push(collabRequest);
  });


  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "key",
      dataIndex: "key",
      // eslint-disable-next-line react/display-name
      render: (_text: any, collab: any) => (
        <>
          <Button >
            <Link
              href={toCollabPage(collab.id).as}
              passHref
            >
              Details
            </Link>
          </Button>
        </>
      ),
    },
  ];

  const deviceColumns = [
    {
      // eslint-disable-next-line react/display-name
      render: (collab, key, index) => {
        return (
          <div>
            <span>
              <p>{collab.title}</p>
            </span>
            <span>
              <p>{collab.status}</p>
            </span>
            <Button >
              <Link
                href={toCollabPage(collab.id).as}
                passHref
              >
                Details
              </Link>
            </Button>
          </div>
        )
      }
    }
  ];

  const scrollSmoothlyToID = (id) => {
    var element = document.getElementById(id);
    element.scrollIntoView();
  };

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
    if (requestsToShow.length > 0) {
      let updatedData = [];
      requestsToShow.forEach((request) => {
        let formattedCollabDetails = {
          title: GetCollabHeading(user.artist_id, request),
          status: request.status,
          id: request.id,
        }
        updatedData.push(formattedCollabDetails);
      })
      return (
        <Table
          columns={window.innerWidth < 500 ? deviceColumns : columns}
          dataSource={updatedData}
        />
      );
    }

    const dateKeys = Object.keys(dateToCollabRequestMap);
    dateKeys.sort();
    const noCollabMessage = (
      <div style={{ padding: "32px 16px" }}>
        <p className="common-h1-style h4">
          No collab requests for selected date? It&apos;s never too late! Reach out to your
          favorite artist and collaborate now!{" "}
        </p>
        <p className="common-h1-style h5">
          {" "}
          Search for art categories or artist names in the search bar and start
          collaborating.
        </p>
      </div>
    );

    if (dateKeys.length === 0) {
      return noCollabMessage;
    }
    const lastDate = dateKeys[dateKeys.length - 1];
    if (lastDate < dateTodayStr) {
      return noCollabMessage;
    }

    var nextDate = null;
    for (var i = 0; i < dateKeys.length; i++) {
      const datekey = dateKeys[i];
      if (datekey > dateTodayStr) {
        nextDate = datekey;
        break;
      }
    }

    const nextDateDate = new Date(nextDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    const message = `You do not have any collab requests for selected date. Your upcoming collabs or requests are on ${nextDateDate.toUTCString()}.`;
    return (
      <div style={{ padding: "32px 16px" }}>
        <p className="common-h1-style h5">{message}</p>
        <p className="common-h1-style h6">
          Meanwhile, search for more art categories and artist names in the
          search bar and start collaborating.
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="collabRequestTab__container">
        <div id="collab_calender" className="collabRequestTab__filterContainer">
          <CollabCalender
            events={dateToCollabRequestMap}
            onSelectDate={(date: string) => {
              setSelectedDate(date);
              scrollSmoothlyToID("collab_cards");
            }}
          />
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
        <div
          id="collab_cards"
          className="collabRequestTab__collabListContainer"
        >
          {getCollabRequestCards()}
        </div>
      )}
    </>
  );
};

export default connector(CollabRequestTab);
