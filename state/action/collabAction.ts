import { CollabRequest } from '../../types/model/' 

export const SEND_COLLAB_REQUEST = 'COLLAB/SEND_COLLAB_REQUEST'
export const REJECT_COLLAB_REQUEST = 'COLLAB/REJECT_REQUEST'
export const ACCEPT_COLLAB_REQUEST = 'COLLAB/ACCEPT_REQUEST'

export const sendCollabRequestAction = (collab: CollabRequest) => ({
  type: SEND_COLLAB_REQUEST,
  payload: {
    collab
  },
});

export const acceptCollabRequestAction = (id: number) => ({
  type: ACCEPT_COLLAB_REQUEST,
  payload: {
    id
  }
})

export const rejectCollabRequestAction = (id: number) => ({
  type: REJECT_COLLAB_REQUEST,
  payload: {
    id,
  },
});
