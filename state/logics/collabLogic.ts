import { createLogic } from 'redux-logic'
import { LogicDeps } from 'state'
import { acceptCollabRequestAction, ACCEPT_COLLAB_REQUEST, rejectCollabRequestAction, REJECT_COLLAB_REQUEST, sendCollabRequestAction, SEND_COLLAB_REQUEST, setUserDataAction } from 'state/action'
import { AppState } from 'types/states'
import { FSACreatorPayload } from 'types/states/FSACreator'

export const sendCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof sendCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [SEND_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { collab: collabRequest } = action.payload
    console.log(getState(), 'printing state')
    console.log('sending collab request data', collabRequest)
    try {
      const request = await api.collabApi.sendCollabRequest(collabRequest)
      console.log('sending collab request', request)
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const acceptCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof acceptCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [ACCEPT_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id: requestId } = action.payload
    console.log(getState(), 'printing state')
    console.log('accepting collab request data', requestId)
    try {
      const request = await api.collabApi.acceptCollabRequest(String(requestId))
      console.log('accepting collab request done', request)
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const rejectCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof rejectCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [REJECT_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id: requestId } = action.payload
    console.log(getState(), 'printing state')
    console.log('rejecting collab request data', requestId)
    try {
      const request = await api.collabApi.rejectCollabRequest(String(requestId))
      console.log('rejecting collab request done', request)
    } catch (error) {
    } finally {
      done()
    }
  },
})