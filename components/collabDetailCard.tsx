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
import { Button, Tooltip } from "antd";
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
    let icon: JSX.Element = (
      <CheckCircleOutlined style={{ color: "#ADA7A7", fontSize: "48px" }} />
    );
    let text: JSX.Element = (
      <p
        className="mb0 text-center"
        style={{ color: "#ADA7A7", fontSize: "18px" }}
      >
        Completed
      </p>
    );

    if (collabDetails.status === "ACTIVE") {
      icon = <CheckOutlined style={{ color: "#81B622", fontSize: "48px" }} />;
      text = (
        <p
          className="mb0 text-center"
          style={{ color: "#81B622", fontSize: "18px" }}
        >
          Active
        </p>
      );
    } else if (collabDetails.status === "PENDING") {
      icon = (
        <ClockCircleOutlined style={{ color: "#FF8300", fontSize: "48px" }} />
      );
      text = (
        <p
          className="mb0 text-center"
          style={{ color: "#FF8300", fontSize: "18px" }}
        >
          Pending
        </p>
      );
    } else if (collabDetails.status === "REJECTED") {
      icon = (
        <CloseCircleOutlined style={{ color: "#FF5C4D", fontSize: "48px" }} />
      );
      text = (
        <p
          className="mb0 text-center"
          style={{ color: "#FF5C4D", fontSize: "18px" }}
        >
          Rejected
        </p>
      );
    } else if (collabDetails.status === "EXPIRED") {
      icon = (
        <ExclamationCircleOutlined
          style={{ color: "#ADA7A7", fontSize: "48px" }}
        />
      );
      text = (
        <p
          className="mb0 text-center"
          style={{ color: "#ADA7A7", fontSize: "18px" }}
        >
          Expired
        </p>
      );
    }

    return (
      <div className="collabDetailCard__statusContainer">
        {icon}
        {text}
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

  const collabStatusComponentForReceiver = () => {
    if (collabDetails.status !== "PENDING")
      return collabStatusComponentForSender();

    return (
      <div className="collabDetailCard__buttonContainer">
        <Button
          onClick={() => {
            acceptCollabRequest(collabDetails.id);
          }}
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
            <Button
              className="collabDetailCard__artistNameLink"
              type="link"
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
            >
              {collabDetails.senderId === user.artist_id
                ? collabDetails.receiverName
                : collabDetails.senderName}
            </Button>
          </div>
        )}
        <div className="collabDetailCard__collabRequestTextContainer">
          <h1 className="collabDetailCard__messageHeading">Theme</h1>
          <p className="collabDetailCard__messageThemeText">
            {collabDetails.requestData.message}
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
