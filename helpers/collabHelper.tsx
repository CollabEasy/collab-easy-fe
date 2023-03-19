// File for declaraing helper methods for anything related to collab.

import { CollabRequestData } from "types/model/collab";

export function convertTimestampToDate(timestamp) {
    const d = new Date(timestamp);
    return d;
}

export function getCollabCardHeading(loggedInUserId: string, collabDetails: CollabRequestData) {
    console.log("you are here 1");
    var heading = "";
    if (collabDetails.senderId === loggedInUserId) {
        // Logged in user looking at outgoing request
        heading += "Hey " + collabDetails.senderName + ", you";
        if (collabDetails.status == "COMPLETED") {
            heading += " have complete a collaboration request with " + collabDetails.receiverName;
        } else if (collabDetails.status === "ACTIVE") {
            heading += " have an active collaboration request with " + collabDetails.receiverName;
        } else if (collabDetails.status === "PENDING") {
            heading += " have a pending collaboration request with " + collabDetails.receiverName;
        } else if (collabDetails.status === "REJECTED") {
            heading += " have a rejected collaboration request with "+ collabDetails.receiverName;
        } else if (collabDetails.status === "EXPIRED") {
            heading += " have an expired collaboration request with "+ collabDetails.receiverName;
        }
        heading += " on theme: " + collabDetails.requestData.collabTheme;
    } else {
        // Logged in user looking at incoming request
        console.log("you are here 2");

    }
    console.log(heading);
    return heading;
}