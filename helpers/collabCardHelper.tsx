// File for declaraing helper methods for anything related to collab card.

import { CollabRequestData } from "types/model/collab";

export function ConvertTimestampToDate(timestamp) {
    const d = new Date(timestamp);
    return d;
}

export function ShowChatButton(url, collabId, collabStatus) {
    // return at once if not collab conversation page.
    if (url.includes("/collab/" + collabId)) {
        return false;
    }
    if (collabStatus === "ACTIVE" || collabStatus === "COMPLETED") {
        return true;
    }
    return false;
}

export function ChatButtonText(collabStatus) {
    if (collabStatus === "PENDING") {
        return "";
    } else if (collabStatus === "ACTIVE") {
        return "Add comment";
    } else {
        return "Read comments";
    }
}

export function GetCollabHeading(loggedInUserId: string, collabDetails: CollabRequestData) {
    var heading = "";
    if (collabDetails.senderId === loggedInUserId) {
        // Logged in user looking at "sent" request
        heading += "Hey " + collabDetails.senderName + ", ";
        if (collabDetails.status === "PENDING") {
            heading += "you have sent a collaboration request to " + collabDetails.receiverName;
            heading += ". The theme is '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status === "ACTIVE") {
            heading += "you have an active collaboration request with " + collabDetails.receiverName;
            heading += ". The theme is '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status == "COMPLETED") {
            heading += "you have completed a collaboration request from " + collabDetails.receiverName;
            heading += ". The theme was '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status === "REJECTED") {
            heading += "you have a rejected collaboration request from " + collabDetails.receiverName;
            heading += ". The theme was '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status === "EXPIRED") {
            heading += " The collaboration request with " + collabDetails.receiverName + " has expired";
            heading += ". The theme was '" + collabDetails.requestData.collabTheme + "'.";
        }
    } else {
        // Logged in user looking at "recieved" request
        heading += "Hey " + collabDetails.receiverName + ", ";

        if (collabDetails.status === "PENDING") {
            heading += "you have recieved a collaboration request from " + collabDetails.senderName;
            heading += ". The theme is '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status === "ACTIVE") {
            heading += "you have an active collaboration request with " + collabDetails.senderName;
            heading += ". The theme is '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status == "COMPLETED") {
            heading += "you have completed a collaboration request from " + collabDetails.senderName;
            heading += ". The theme was '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status === "REJECTED") {
            heading += "you have rejected a collaboration request from " + collabDetails.senderName;
            heading += ". The theme was '" + collabDetails.requestData.collabTheme + "'.";
        } else if (collabDetails.status === "EXPIRED") {
            heading += " the collaboration request from " + collabDetails.senderName + " has expired";
            heading += ". The theme was '" + collabDetails.requestData.collabTheme + "'.";
        }


    }
    return heading;
}

export function GetCollabAdditionalDetails(loggedInUserId: string, collabDetails: CollabRequestData) {
    var additionalDetails = "";

    if (collabDetails.senderId === loggedInUserId) {
        // Logged in user looking at "sent" request
        additionalDetails += "The additional details provided by you "
        if (collabDetails.requestData.message.length === 0) {
            return "No additional details provided by you."
        }

        if (collabDetails.status === "PENDING") {
            additionalDetails += "is '" + collabDetails.requestData.message + "'."
        } else if (collabDetails.status === "ACTIVE") {
            additionalDetails += "is '" + collabDetails.requestData.message + "'."
        } else if (collabDetails.status == "COMPLETED") {
            additionalDetails += "was '" + collabDetails.requestData.message + "'."
        } else if (collabDetails.status === "REJECTED") {
            additionalDetails += "was '" + collabDetails.requestData.message + "'."
        } else if (collabDetails.status === "EXPIRED") {
            additionalDetails += "was '" + collabDetails.requestData.message + "'."
        }
    } else {
        // Logged in user looking at "recieved" request
        additionalDetails += "The additional details provided by " + collabDetails.senderName;

        if (collabDetails.requestData?.message.length === 0) {
            return "No additional details provided by" + collabDetails.senderName + ".";
        }

        if (collabDetails.status === "PENDING") {
            additionalDetails += " is '" + collabDetails.requestData.message + "'.";
        } else if (collabDetails.status === "ACTIVE") {
            additionalDetails += " is '" + collabDetails.requestData.message + "'.";
        } else if (collabDetails.status == "COMPLETED") {
            additionalDetails += " was '" + collabDetails.requestData.message + "'.";
        } else if (collabDetails.status === "REJECTED") {
            additionalDetails += " was '" + collabDetails.requestData.message + "'.";
        } else if (collabDetails.status === "EXPIRED") {
            additionalDetails += " was '" + collabDetails.requestData.message + "'.";
        }
    }
    return additionalDetails;
}

export function GetScheduledDate(status: string) {
    var scheduledDate = "";
    if (status === "PENDING") {
        scheduledDate += "Tentative completion date is ";
    } else if (status === "ACTIVE") {
        scheduledDate += "Tentative completion date is ";
    } else if (status == "COMPLETED") {
        scheduledDate += "Tentative completion date was ";
    } else if (status === "REJECTED") {
        scheduledDate += "Tentative completion date was ";
    } else if (status === "EXPIRED") {
        scheduledDate += "Tentative completion date was ";
    }

    return scheduledDate;
}

export function ShowEditCollabDetailIcon(collabData, loggedInUserId, status) {
    if (status !== "PENDING" && status !== "ACTIVE") {
        return false;
    }
    if (status === "PENDING" && collabData.senderId === loggedInUserId) {
        return true;
    }
    if (status === "ACTIVE") {
        return true;
    }
    return false;
}