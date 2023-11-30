import { Tag } from "antd";

export function GetCollabRequest(collabData) {
    if (collabData["collabDetails"]["sent"]["all"].length > 0) {
        return collabData["collabDetails"]["sent"]["all"][0];
    } else if (collabData["collabDetails"]["received"]["all"].length > 0) {
        return collabData["collabDetails"]["received"]["all"][0];
    }
    return {};
}


export function GetCollaboratorInfoFromCollab(collabData) {
    let final_collab = GetCollabRequest(collabData);
    const collaborator_details = new Map();
    collaborator_details.set(final_collab["receiverId"], final_collab["receiverName"]);
    collaborator_details.set(final_collab["senderId"], final_collab["senderName"]);
    return collaborator_details;
}

export function DoHideNewCommentBox(status) {
    if (status === "PENDING" || status == "REJECTED" || status == "EXPIRED" || status == "COMPLETED") {
        return false;
    }
    return true;
}


export const getCollabCardTag = (status) => {
    if (status === "ACTIVE") {
      return <Tag style={{ width: "55px", marginBottom: '10px' }} color="blue">Active</Tag>;
    } else if (status === "PENDING") {
      return <Tag style={{ width: "65px", marginBottom: '10px' }} color="yellow">Pending</Tag>;
    } else if (status === "REJECTED") {
      return <Tag style={{ width: "80px", marginBottom: '10px' }} color="red">Rejected</Tag>;
    } else if (status === "EXPIRED") {
      return <Tag style={{ width: "65px", marginBottom: '10px' }} color="grey">Expired</Tag>;
    } else {
      return <Tag style={{ width: "80px", marginBottom: '10px' }} color="green">Completed</Tag>;
    }
  }