import React from "react";
import { SendOutlined } from "@ant-design/icons";

type Props = {
  collabStatus: string;
  fromArtistName: string;
  onClick: () => void;
};

const CollabNotification = ({ collabStatus, fromArtistName }: Props) => {
  let msg = "";
  if (collabStatus === "received") {
    msg = `You have received a new collab request from <B>${fromArtistName}</B>`;
  }
  return (
    <div className="notification-card-container">
      <div className="notification-card">
        <div className="notification-icon-card">
          <div className="notification-inner">
            <SendOutlined className="user-icon" />
          </div>
        </div>
        <div
          className="notification-text"
          dangerouslySetInnerHTML={{ __html: msg }}
        ></div>
      </div>
    </div>
  );
};

export default CollabNotification;
