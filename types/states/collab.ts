import { CollabRequestData, CollabResponse } from "types/model";

export interface CollabRequestState {
  collabDetails: CollabResponse;
  showCollabModal: boolean;
  isSendingRequest: boolean;
  isFetchingCollabDetails: boolean;
}