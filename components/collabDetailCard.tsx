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
          <Button
            type="primary"
            loading={isCancellingRequest}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              cancelCollabRequest(collabDetails.id);
            }}
          >Cancel Request</Button>
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

      <>
        {/* <Tag style={{width: "65px", marginBottom: '10px' }}color="orange">Pending</Tag> */}

        <Button
          block
          type="primary"
          onClick={() => {
            acceptCollabRequest(collabDetails.id);
          }}
          style={{ color: "white", border: "green", backgroundColor: "#91D296", whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
          disabled={isRejectingRequest}
          loading={isAcceptingRequest}
          className="common-medium-btn"
        >
          Accept
        </Button>

        <Button
          block
          type="primary"
          onClick={() => {
            rejectCollabRequest(collabDetails.id);
          }}
          style={{ color: "white", border: "red", backgroundColor: "#ED6572", whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
          disabled={isAcceptingRequest}
          loading={isRejectingRequest}
          className="common-medium-btn"
        >
          Reject
        </Button>
      </>
    )
  }
  return (
    <>
      <div className="collabDetailCard__container">
        <div className="row p-2 bg-white border rounded collab-card">
          <div className="col-md-3 mt-1 social-profile-picture">
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
                  className="card-img-top"
                  src={(collabDetails.senderId === user.artist_id
                    ? collabDetails.receiverProfilePicUrl
                    : collabDetails.senderProfilePicUrl)}
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="col-md-6 mt-1 collabDetailCard__textContainer">
            <h5 className="common-h5-style">{collabDetails.senderId === user.artist_id
              ? collabDetails.receiverName
              : collabDetails.senderName}</h5>
            <p className="common-p-style">{collabDetails.requestData.collabTheme}</p>
            <p className="text-justify para mb-0  break-word common-p-style">{collabDetails.requestData.message}</p>
            <p className="common-p-style common-p-style">{convertTimestampToDate(collabDetails.collabDate).toLocaleDateString("en-US")}</p>

          </div>
          <div className="align-items-center align-content-center col-md-3 border-left mt-1">
            <div className="d-flex flex-column mt-4">
              {user.artist_id === collabDetails.senderId
                ? collabStatusComponentForSender()
                : collabStatusComponentForReceiver()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(CollabDetailCard);
