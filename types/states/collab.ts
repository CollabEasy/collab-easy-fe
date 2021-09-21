import { CollabRequestData } from "types/model";

export interface CollabRequestState {
  active: CollabRequestData[]
  pending: CollabRequestData[]
  rejected: CollabRequestData[]
  completed: CollabRequestData[]
}