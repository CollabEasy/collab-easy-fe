export interface SendCollabRequest {
  receiverId: string;
  requestData: {
    message: string;
    collabTheme: string;
  };
  collabDate: Date;
}

export interface SearchCollab {
  collabRequestId?: number
  status?: string
  senderId?: string
  receiverId?: string
}

export interface CollabRequestData {
  id: number
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