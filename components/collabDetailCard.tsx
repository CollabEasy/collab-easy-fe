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
import { ShowChatButton, ChatButtonText, ConvertTimestampToDate, GetCollabHeading, GetCollabAdditionalDetails, GetScheduledDate } from "helpers/collabCardHelper";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isAcceptingRequest: state.collab.isAcceptingRequest,
  isRejectingRequest: state.collab.isRejectingRequest,
  isCancellingRequest: state.collab.isCancellingRequest,
  isCompletingRequest: state.collab.isCompletingRequest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptCollabRequest: (id: string) =>
    dispatch(actions.acceptCollabRequestAction(id)),
  rejectCollabRequest: (id: string) =>
    dispatch(actions.rejectCollabRequestAction(id)),
  cancelCollabRequest: (id: string) =>
    dispatch(actions.cancelCollabRequestAction(id)),
  completeCollabRequest: (id: string) => dispatch(actions.completeCollabRequestAction(id)),
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
  isCompletingRequest,
  acceptCollabRequest,
  rejectCollabRequest,
  cancelCollabRequest,
  completeCollabRequest,
}: Props) => {
  const router = useRouter();
  const collabStatusComponentForSender = () => {
    let icon = <Tag style={{width: "80px", marginBottom: '10px' }} color="green">Completed</Tag>;
    if (collabDetails.status === "ACTIVE") {
      icon = <Tag style={{width: "55px", marginBottom: '10px' }} color="blue">Active</Tag>;
    } else if (collabDetails.status === "PENDING") {
      icon = <Tag style={{width: "65px", marginBottom: '10px' }} color="yellow">Pending</Tag>;
    } else if (collabDetails.status === "REJECTED") {
      icon = <Tag style={{width: "80px", marginBottom: '10px' }} color="red">Rejected</Tag>;
    } else if (collabDetails.status === "EXPIRED") {
      icon = <Tag style={{width: "65px", marginBottom: '10px' }} color="grey">Expired</Tag>;
    }

    return (
      <div className="collabDetailCard__statusContainer">
        {icon}
        {collabDetails.status === "PENDING" && (
          <Button
            block
            type="primary"
            loading={isCancellingRequest}
            className="common-medium-btn"
            style={{ color: "white", border: "yellow", backgroundColor: "#F8CF61", whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              cancelCollabRequest(collabDetails.id);
            }}
          >Cancel</Button>
        )}
      </div>
    );
  };

  const collabStatusComponentForReceiver = () => {
    if (collabDetails.status !== "PENDING")
      return collabStatusComponentForSender();

    return (

      <>
        <Tag style={{width: "60px", marginBottom: '10px' }} color="orange">Pending</Tag>
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
            {(
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
            <b className="f-16 mb4 common-text-style"> {GetCollabHeading(user.artist_id, collabDetails)}</b><br></br>
            <p style={{ paddingTop: '3px' }} className="text-justify break-word common-p-style">
              {GetCollabAdditionalDetails(user.artist_id, collabDetails)}
            </p>
            <p style={{ paddingTop: '3px' }} className="text-justify break-word common-p-style">
              {GetScheduledDate(collabDetails.status)} {ConvertTimestampToDate(collabDetails.collabDate).toLocaleDateString("en-US")}.
            </p>
          </div>
          <div className="align-items-center align-content-center col-md-3 border-left mt-1">
            <div className="d-flex flex-column mt-4">
              {user.artist_id === collabDetails.senderId
                ? collabStatusComponentForSender()
                : collabStatusComponentForReceiver()}
            </div>
            <>
              {ShowChatButton(window.location.href, collabDetails.id, collabDetails.status)  &&
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    router.push(`/collab/${collabDetails.id}`);
                  }}
                  style={{ color: "white", border: "green", backgroundColor: "#9FBFF9", whiteSpace: "normal", height: 'auto', marginBottom: '10px', marginTop: '10px' }}
                  className="common-medium-btn"
                >
                  {ChatButtonText(collabDetails.status)}
                </Button>
              }
              {collabDetails.status === "ACTIVE" &&
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    completeCollabRequest(collabDetails.id);
                  }}
                  style={{ color: "white", border: "green", backgroundColor: "#91D296", whiteSpace: "normal", height: 'auto', marginBottom: '10px', marginTop: '10px' }}
                  disabled={isRejectingRequest}
                  loading={isAcceptingRequest}
                  className="common-medium-btn"
                >
                  Mark Completed
                </Button>
              }
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(CollabDetailCard);
