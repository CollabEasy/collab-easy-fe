/* eslint-disable @next/next/no-img-element */
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { CollabRequestData } from "types/model";
import { Button, Tooltip, Tag } from "antd";
import * as actions from "./../state/action";
import { acceptCollabRequest, rejectCollabRequest } from "api/collab";
import { useRouter } from "next/router";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isAcceptingRequest: state.collab.isAcceptingRequest,
  isRejectingRequest: state.collab.isRejectingRequest,
  isCancellingRequest: state.collab.isCancellingRequest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptCollabRequest: (id: string) =>
    dispatch(actions.acceptCollabRequestAction(id)),
  rejectCollabRequest: (id: string) =>
    dispatch(actions.rejectCollabRequestAction(id)),
  cancelCollabRequest: (id: string) =>
    dispatch(actions.cancelCollabRequestAction(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  showUser: boolean;
  collabDetails: CollabRequestData;
} & ConnectedProps<typeof connector>;

const CollabDetailCard = ({
  user,
  collabDetails,
  showUser,
  isAcceptingRequest,
  isRejectingRequest,
  isCancellingRequest,
  acceptCollabRequest,
  rejectCollabRequest,
  cancelCollabRequest,
}: Props) => {
  const router = useRouter();
  const collabStatusComponentForSender = () => {
    let icon = <Tag color="green">Completed</Tag>;
    if (collabDetails.status === "ACTIVE") {
      icon = <Tag color="blue">Active</Tag>;
    } else if (collabDetails.status === "PENDING") {
      icon = <Tag color="yellow">Pending</Tag>;
    } else if (collabDetails.status === "REJECTED") {
      icon = <Tag color="red">Rejected</Tag>;
    } else if (collabDetails.status === "EXPIRED") {
      icon = <Tag color="grey">Expired</Tag>;
    }

    return (
      <div className="collabDetailCard__statusContainer">
        {icon}
        {collabDetails.status === "PENDING" && (
          <Tooltip title="Cancel Request">
            <Button
              type="primary"
              icon={<CloseCircleOutlined twoToneColor={"#ADA7A7"} />}
              loading={isCancellingRequest}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                cancelCollabRequest(collabDetails.id);
              }}
            ></Button>
          </Tooltip>
        )}
      </div>
    );
  };

  const convertTimestampToDate = (timestamp) => {
    const d = new Date(timestamp);
    return d;
  }

  const collabStatusComponentForReceiver = () => {
    if (collabDetails.status !== "PENDING")
      return collabStatusComponentForSender();

    return (
      <div className="collabDetailCard__buttonContainer">
        <Button
          onClick={() => {
            acceptCollabRequest(collabDetails.id);
          }}
          style={{ color: "white", backgroundColor: "green" }}
          disabled={isRejectingRequest}
          loading={isAcceptingRequest}
          className="collabDetailCard__acceptButton"
        >
          Accept
        </Button>
        <Button
          onClick={() => {
            rejectCollabRequest(collabDetails.id);
          }}
          style={{ color: "white", backgroundColor: "red" }}
          disabled={isAcceptingRequest}
          loading={isRejectingRequest}
          className="collabDetailCard__rejectButton"
        >
          Reject
        </Button>
      </div>
    );
  };

  return (
    <>
      <div
        className={ 
          collabDetails.status !== "COMPLETED" &&
            collabDetails.status !== "EXPIRED"
            ? "collabDetailCard__container"
            : "collabDetailCard__containerDisabled"
        }
      >
        {showUser && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              router.push(
                "/artist/profile/" +
                (collabDetails.senderId === user.artist_id
                  ? collabDetails.receiverSlug
                  : collabDetails.senderSlug)
              );
            }}
            className="collabDetailCard__imageNameContainer"
          >
            <img
              className="collabDetailCard__userImage"
              src={(collabDetails.senderId === user.artist_id
                ? collabDetails.receiverProfilePicUrl
                : collabDetails.senderProfilePicUrl)}
              alt=""
            />
            <p className="common-p-style" >{collabDetails.senderId === user.artist_id
                ? collabDetails.receiverName
                : collabDetails.senderName}</p>
          </div>
        )}
        <div className="collabDetailCard__collabRequestTextContainer">
          <h1 className="collabDetailCard__messageHeading">Theme</h1>
          <p className="collabDetailCard__messageThemeText">
            {collabDetails.requestData.message}
          </p>
          <h1 className="collabDetailCard__messageHeading">Date</h1>
          <p className="collabDetailCard__messageThemeText">
            {convertTimestampToDate(collabDetails.collabDate).toLocaleDateString("en-US")}
          </p>
          <h1 className="collabDetailCard__messageHeading">Description</h1>
          <p className="collabDetailCard__messageThemeText">
            {collabDetails.requestData.collabTheme}
          </p>
        </div>
        {user.artist_id === collabDetails.senderId
          ? collabStatusComponentForSender()
          : collabStatusComponentForReceiver()}
      </div>
    </>
  );
};

export default connector(CollabDetailCard);
