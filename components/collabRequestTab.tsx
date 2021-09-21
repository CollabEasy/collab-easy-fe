import React, { SyntheticEvent, useEffect, useState } from "react";
import { Pagination, Space, Button, Card, Avatar } from 'antd';
import Meta from "antd/lib/card/Meta";
import { CollabRequestData } from "types/model";
import { AppState } from "state";
import { acceptCollabRequestAction, getCollabRequestsAction, rejectCollabRequestAction } from "state/action";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";

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
              title={req.request_data.collabTheme}
              description={req.request_data.message} />
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
    }, [])

    return (
      <div id="collab" className="tabcontent">
        <CollabRequests requests={pendingRequests} requestStatus={'Pending'} />
        <CollabRequests requests={activeRequests} requestStatus={'Scheduled'} />
        <CollabRequests requests={completedRequest} requestStatus={'Completed'} />
        <CollabRequests requests={rejectedRequest} requestStatus={'Rejected'} />
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