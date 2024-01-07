import { Button, Collapse, Select, Switch, Table, Tabs } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { routeToHref } from "config/routes";
import { GetCollabHeading } from "helpers/collabCardHelper";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import {
  CollabRequestData,
  SearchCollab,
  SendCollabRequest,
} from "types/model";
import * as action from "./../state/action";
import CollabLinkClipBoard from "./asset/collabLinkClipBoard";
import CollabCalender from "./collabCalender";
import CollabDetailCard from "./collabDetailCard";
import Loader from "./loader";
import { useRoutesContext } from "./routeContext";

const { Option } = Select;

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isFetchingCollabDetails: state.collab.isFetchingCollabDetails,
  datewiseCollab: state.collab.dateWiseCollabs,
  collab: state.collab,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendCollabRequestAction: (data: SendCollabRequest) =>
    dispatch(action.sendCollabRequestAction(data)),
  fetchCollabsDateWise: (fetchAllCollabs: boolean) =>
    dispatch(action.fetchCollabsDateWise(fetchAllCollabs)),
  getCollabRequestsAction: (data: SearchCollab) =>
    dispatch(action.getCollabRequestsAction(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

export const CollabRequestTab = ({
  user,
  collab,
  datewiseCollab,
  isFetchingCollabDetails,
  fetchCollabsDateWise,
  getCollabRequestsAction,
  sendCollabRequestAction,
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
    proposalId: undefined,
  };

  const textRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const { toCollabPage } = useRoutesContext();
  const dispatch = useDispatch();
  const [allSentReceivedStatus, setAllSentReceivedStatus] = useState("all");
  const [collabStatusFilter, setCollabStatusFilter] = useState("all");
  const [activeKey, setActiveKey] = useState("1");
  const [fetchAllCollabs, setFetchAllCollabs] = useState(false);
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const [hasPendingCollab, setHasPendingCollab] = useState(false);
  const dateToday = new Date();
  const dateTodayStr =
    dateToday.getFullYear() +
    "/" +
    (dateToday.getMonth() + 1) +
    "/" +
    dateToday.getDate();

  const [selectedDate, setSelectedDate] = useState(dateTodayStr);
  const { TabPane } = Tabs;
  const collabRequests = collab.collabDetails;

  useEffect(() => {
    if (activeKey === "2") {
      fetchCollabsDateWise(fetchAllCollabs);
    } else {
      getCollabRequestsAction({});
    }
  }, [activeKey, fetchAllCollabs]);

  useEffect(() => {
    if (
      collab.collabDetails.sent.pending.length > 0 ||
      collab.collabDetails.sent.active.length > 0
    ) {
      setCollabRequestDetails(collab.collabDetails.sent.pending[0]);
      setHasPendingCollab(true);
    } else if (
      collab.collabDetails.received.pending.length > 0 ||
      collab.collabDetails.received.active.length > 0
    ) {
      setHasPendingCollab(true);
      setCollabRequestDetails(collab.collabDetails.received.active[0]);
    } else {
      setHasPendingCollab(false);
      setCollabRequestDetails(emptyCollabDetails);
    }
  }, []);

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
          <Button>
            <Link href={toCollabPage(collab.id).as} passHref>
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
            <Button>
              <Link href={toCollabPage(collab.id).as} passHref>
                Details
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  const scrollSmoothlyToID = (id) => {
    var element = document.getElementById(id);
    element.scrollIntoView();
  };

  const getCollabRequestCards = (
    requestsToShow?: any[],
    paginate?: boolean
  ) => {
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
    if (requestsToShow === undefined || requestsToShow.length === 0) {
      requestsToShow = dateToCollabRequestMap[selectedDate] ?? [];
    }

    if (paginate === undefined) {
      paginate = true;
    } else {
      paginate = false;
    }
    if (requestsToShow.length > 0) {
      let updatedData = [];
      requestsToShow.forEach((request) => {
        let formattedCollabDetails = {
          title: GetCollabHeading(user.artist_id, request),
          status: request.status,
          id: request.id,
        };
        updatedData.push(formattedCollabDetails);
      });
      return paginate ? (
        <Table
          columns={window.innerWidth < 500 ? deviceColumns : columns}
          dataSource={updatedData}
        />
      ) : (
        <Table
          pagination={false}
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
          No collab requests for selected date? It&apos;s never too late! Reach
          out to your favorite artist and collaborate now!{" "}
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

    const nextDateDate = new Date(
      nextDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
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

  const { Panel } = Collapse;

  const getCollabCards = (data: CollabRequestData[]) => {
    const result = [];
    data.forEach((element) => {
      result.push(
        <a
          href={routeToHref(toCollabPage(element.id))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CollabDetailCard showUser={true} collabDetails={element} />
        </a>
      );
    });
    return result;
  };

  const getCollabTimeline = () => {
    const timelineItems = [];

    for (let dateString in datewiseCollab) {
      timelineItems.push(
        <Panel header={dateString} key={""}>
          {getCollabCards(datewiseCollab[dateString])}
        </Panel>
      );
    }
    return (
      <Collapse ghost accordion>
        {timelineItems}
      </Collapse>
    );
  };

  if (
    (user && Object.keys(user).length === 0) ||
    collab.isFetchingCollabDetails
  ) {
    return <Loader />;
  }

  const handleCopyClick = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="collabRequestTab__container">
        <CollabLinkClipBoard slug={user.slug} />

        <Tabs
          centered
          activeKey={activeKey}
          onChange={(activeKey: string) => {
            setActiveKey(activeKey);
          }}
        >
          <TabPane tab="Calender View" key="1">
            <div
              id="collab_calender padding20"
              className="collabRequestTab__filterContainer"
            >
              <CollabCalender
                events={dateToCollabRequestMap}
                onSelectDate={(date: string) => {
                  setSelectedDate(date);
                  scrollSmoothlyToID("collab_cards");
                }}
              />
            </div>
            {activeKey === "1" && isFetchingCollabDetails ? (
              <Loader />
            ) : (
              <div
                id="collab_cards"
                className="collabRequestTab__collabListContainer"
              >
                {getCollabRequestCards()}
              </div>
            )}
          </TabPane>
          <TabPane tab="List View" key="2">
            <div className="flex-row">
              <Checkbox
                checked={!fetchAllCollabs}
                onChange={() => {
                  setFetchAllCollabs(!fetchAllCollabs);
                }}
              >
              Show Active 
              </Checkbox>
            </div>
            <div className="padding20">{getCollabTimeline()}</div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default connector(CollabRequestTab);
