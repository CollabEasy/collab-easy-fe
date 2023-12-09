import { CollabRequestData, CollabResponse } from "types/model";

export interface CollabRequestState {
  collabDetails: CollabResponse;
  showCollabModal: { show: boolean; id: string };
  isSendingRequest: boolean;
  isAcceptingRequest: boolean;
  isRejectingRequest: boolean;
  isCancellingRequest: boolean;
  isCompletingRequest: boolean;
  isFetchingCollabDetails: boolean;
  userCollabs: {collabs: CollabResponse[], user_id: string, isFetchingCollabsWithUser: boolean},
  dateWiseCollabs: Record<string, CollabRequestData[]>
}
