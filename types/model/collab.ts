export interface CollabRequest {
  receiverId: string;
  requestData: {
    message: string;
    collabTheme: string;
  };
  collabDate: Date;
}
