import React, { useEffect } from "react";
import { Pagination, Button, Card, Avatar } from 'antd';
import Meta from "antd/lib/card/Meta";
import { CollabRequestData } from "types/model";
import { AppState } from "state";
import { acceptCollabRequestAction, getCollabRequestsAction, rejectCollabRequestAction } from "state/action";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import { CollabRequestStatus } from "config/constants";

const CollabRequests: React.FC<{
  requests?: CollabRequestData[],
  requestStatus: string
}> = ({
  requests,
  requestStatus
}) => {
  const dispatch = useDispatch()
  const onAccept = (requestId: number) => {
    dispatch(acceptCollabRequestAction(requestId))
  }
  const onReject = (requestId: number) => {
    dispatch(rejectCollabRequestAction(requestId))
  }
  return (
    <>
      <h4 className="f-w-b">{requestStatus} Request</h4>
      {requests.map((req) => (
        <>
          <Card
            style={{ width: 200 }}
            actions={[
              <Button key={`${req.id}-pending-accept`} type="primary" onClick={() => onAccept(req.id)}>Accept</Button>,
              <Button key={`${req.id}-pending-reject`} type="primary"onClick={() => onReject(req.id)}>Reject</Button>,
            ]}>
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={req.requestData.collabTheme}
              description={req.requestData.message} />
          </Card>
        </>
      ))}
      <Pagination defaultCurrent={1} total={50} />
    </>
  )
  }

const CollabRequestsTab: React.FC<{
  getCollabRequests: (status: string) => void
  pendingRequests: CollabRequestData[]
  activeRequests: CollabRequestData[]
  completedRequest: CollabRequestData[]
  rejectedRequest: CollabRequestData[]
}> = ({
  getCollabRequests,
  pendingRequests,
  activeRequests,
  completedRequest,
  rejectedRequest
}) => {

    useEffect(() => {
      getCollabRequests('Pending')
      getCollabRequests('Completed')
      getCollabRequests('Rejected')
      getCollabRequests('Active')
    }, [getCollabRequests])

    return (
      <div id="collab" className="tabcontent">
        <CollabRequests requests={pendingRequests} requestStatus={CollabRequestStatus.ACTIVE} />
        <CollabRequests requests={activeRequests} requestStatus={CollabRequestStatus.SCHEDULED} />
        <CollabRequests requests={completedRequest} requestStatus={CollabRequestStatus.COMPLETED} />
        <CollabRequests requests={rejectedRequest} requestStatus={CollabRequestStatus.REJECTED} />
      </div>
    )
  }

const mapStateToProps = (state: AppState) => ({
  pendingRequests: state.collab.pending,
  activeRequests: state.collab.active,
  completedRequest: state.collab.completed,
  rejectedRequest: state.collab.rejected
})

const mapDisPatchToProps = (dispatch: Dispatch) => ({
  getCollabRequests: (status: string) => dispatch(getCollabRequestsAction({ status: status }))
})

export default connect(mapStateToProps, mapDisPatchToProps)(CollabRequestsTab)