import { CollabRequestData } from "types/model/collab";
import { User } from "types/model/user";
import { Tag } from 'antd';
import { TAGS_COLORS } from "./helper";

export function GetUserSkillsTags(skillsList: string[], all: boolean) {
    const skills: JSX.Element[] = [];
    if (!skillsList) {
        return skills;
    }
    skillsList.forEach((skill: string, index: number) => {
        skills.push(
            <Tag key={index} style={{ marginRight: "2px", marginBottom: "2px", display: "inline-block" }} color={TAGS_COLORS[index]}>
                {skill}
            </Tag>
        );
    });
    return skills;
};

export function GetUserSkills(user: User, all: boolean) {
    if (!user.skills) {
        return "";
    }
    var skills = "";
    user.skills.forEach((skill: string, index: number) => {
        if (!all && index >= 2) {
            return skills;
        }
        if (index > 0) {
            skills = skills + ", ";
        }
        skills = skills + skill;
    });
    return skills;
};

export function ShowIncompleteProfileBanner(user: User) {
    return !user.profile_complete;
}
export function GetCollabDataForUser(collabs, senderUserId, recieverUserId) {
    const emptyCollabDetails: CollabRequestData = {
        id: "",
        senderId: "",
        receiverId: "",
        collabDate: undefined,
        requestData: {
            message: "",
            collabTheme: ""
        },
        status: "",
        createdAt: undefined,
        updatedAt: undefined,
        proposalId: undefined,
    };

    for (var i = 0; i < collabs.length; i++) {
        if (collabs[i].senderId === senderUserId && collabs[i].receiverId === recieverUserId) {
            return collabs[i];
        }
    }
    return emptyCollabDetails;
}

export function GetPendingCollabRequest(collabData, loggedInUserId: string, profileUserId: string) {
    const emptyCollabDetails: CollabRequestData = {
        id: "",
        senderId: "",
        receiverId: "",
        collabDate: undefined,
        requestData: {
            message: "",
            collabTheme: ""
        },
        status: "",
        createdAt: undefined,
        updatedAt: undefined,
        proposalId: undefined,
    };
    if (!collabData || !collabData.collabDetails) {
        return emptyCollabDetails;
    }
    if (collabData.collabDetails.sent.pending.length > 0) {
        return GetCollabDataForUser(collabData.collabDetails.sent.pending, loggedInUserId, profileUserId);
    } else if (collabData.collabDetails.sent.active.length > 0) {
        return GetCollabDataForUser(collabData.collabDetails.sent.active, loggedInUserId, profileUserId);
    } else if (collabData.collabDetails.received.pending.length > 0) {
        return GetCollabDataForUser(collabData.collabDetails.received.pending, profileUserId, loggedInUserId);
    } else if (collabData.collabDetails.received.active.length > 0) {
        return GetCollabDataForUser(collabData.collabDetails.received.active, profileUserId, loggedInUserId);
    } else {
        return emptyCollabDetails;
    }
}