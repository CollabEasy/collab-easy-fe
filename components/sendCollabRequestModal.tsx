import { Button, DatePicker, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "./../state/action";
import { CollabRequestData, SendCollabRequest } from "types/model";
import { acceptCollabRequest, rejectCollabRequest } from "api/collab";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isSendingRequest: state.collab.isSendingRequest,
  isAcceptingRequest: state.collab.isAcceptingRequest,
  isRejectingRequest: state.collab.isRejectingRequest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendCollabRequestAction: (data: SendCollabRequest) =>
    dispatch(action.sendCollabRequestAction(data)),
  updateCollabRequest: (data: CollabRequestData) => dispatch(action.updateCollabRequest(data)),
  acceptCollabRequest: (requestId: string) => dispatch(action.acceptCollabRequestAction(requestId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  onCancel: () => void;
  otherUser: string;
  collabDetails: CollabRequestData;
} & ConnectedProps<typeof connector>;

const SendCollabRequestModal = ({
  user,
  otherUser,
  collabDetails,
  isSendingRequest,
  isAcceptingRequest,
  isRejectingRequest,
  onCancel,
  updateCollabRequest,
  sendCollabRequestAction,
}: Props) => {
  const currentDate = moment(new Date());
  const isNewCollab = collabDetails.id === "";
  const [collabDataCached, setCollabDataCached] =
    useState<CollabRequestData>(collabDetails);
  const [editable, setEditable] = useState(
    isNewCollab
    || (user.artist_id === collabDetails.senderId && collabDetails.status === "PENDING" ));

  const sendCollabRequest = () => {
    if (isNewCollab) {
      const data: SendCollabRequest = {
        receiverId: otherUser,
        requestData: {
          message: collabDataCached.requestData.message,
          collabTheme: collabDataCached.requestData.collabTheme,
        },
        collabDate: collabDataCached.collabDate,
      };
      sendCollabRequestAction(data);
    } else {
      updateCollabRequest(collabDataCached);
    }
  };

  return (
    <Modal
      closable
      onCancel={onCancel}
      className="sendCollabRequestModal__modal"
      visible={true}
      footer={null}
    >
      <div className="sendCollabRequestModal__container">
        <h2 className="f-20 text-center">Collab Request</h2>
        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">Add a note.</p>
          <Input.TextArea
            disabled={!editable}
            showCount
            maxLength={255}
            value={collabDataCached.requestData?.message}
            onChange={(e) => {
              setCollabDataCached((prevState) => ({
                ...prevState,
                requestData: {
                  ...prevState.requestData,
                  message: e.target.value,
                },
              }));
            }}
          />
        </div>

        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">Add a theme.</p>
          <Input.TextArea
            disabled={!editable}
            showCount
            maxLength={255}
            value={collabDataCached.requestData?.collabTheme}
            onChange={(e) => {
              setCollabDataCached((prevState) => ({
                ...prevState,
                requestData: {
                  ...prevState.requestData,
                  collabTheme: e.target.value,
                },
              }));
            }}
          />
        </div>

        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">When do you want to connect?</p>
          <DatePicker
            disabled={!editable}
            clearIcon={null}
            disabledDate={(d) => d.isSameOrBefore(currentDate)}
            format="DD/MM/YYYY"
            value={moment(
              collabDataCached.collabDate
                ? collabDataCached.collabDate
                : currentDate
            )}
            onChange={(e) => {
              setCollabDataCached((prevState) => ({
                ...prevState,
                collabDate: e.toDate(),
              }));
            }}
          />
        </div>
        {editable ? (
          <Button
            size="large"
            className="sendCollabRequestModal__button"
            loading={isSendingRequest}
            type="primary"
            onClick={sendCollabRequest}
          >
            Send
          </Button>
        ) : (
          <div className="sendCollabRequestModal__acceptRejectContainer">
            <Button
              size="large"
              className="collabDetailCard__acceptButton"
              disabled={isRejectingRequest}
              loading={isAcceptingRequest}
              onClick={() => {
                acceptCollabRequest(collabDetails.id)
              }}
            >
              Accept
            </Button>

            <Button
              size="large"
              className="collabDetailCard__rejectButton"
              disabled={isAcceptingRequest}
              loading={isRejectingRequest}
              onClick={() => {
                rejectCollabRequest(collabDetails.id)
              }}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default connector(SendCollabRequestModal);
