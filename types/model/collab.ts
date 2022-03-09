export interface SendCollabRequest {
  receiverId: string;
  requestData: {
    message: string;
    collabTheme: string;
  };
  collabDate: Date;
}

export interface SearchCollab {
  collabRequestId?: string
  status?: string
  otherUserId?: string
}

export interface CollabResponse {
  sent: {
    active: CollabRequestData[];
    pending: CollabRequestData[];
    completed: CollabRequestData[];
    rejected: CollabRequestData[];
  },
  received: {
    active: CollabRequestData[];
    pending: CollabRequestData[];
    completed: CollabRequestData[];
    rejected: CollabRequestData[];
  }
}
export interface CollabRequestData {
  id: string
  senderId: string
  receiverId: string
  collabDate: Date
  requestData: {
    message: string
    collabTheme: string
  },
  status: string
  createdAt: Date
  updatedAt: Date
}