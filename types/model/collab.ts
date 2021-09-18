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
  sender_id: string
  receiver_id: string
  collab_date: Date
  request_data: {
    message: string
    collabTheme: string
  },
  status: string
  created_at: Date
  updated_at: Date
}