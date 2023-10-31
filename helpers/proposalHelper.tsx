import { Tag } from "antd";
import { CATEGORY_COLORS } from "./profilePageHelper";

export function GetDateString(time: number) {
    let myDate = new Date(time);
    let dateStr = myDate.getFullYear() + "-";
    if (myDate.getMonth() + 1 < 10) {
        dateStr += "0" + (myDate.getMonth() + 1) + "-";
    } else {
        dateStr += (myDate.getMonth() + 1) + "-";
    }

    if (myDate.getDate() < 10) {
        dateStr += "0" + myDate.getDate();
    } else {
        dateStr += myDate.getDate();
    }

    return dateStr
}

export function GetProposalTags(proposal: any) {
    const tags: JSX.Element[] = [];
    let index = 0;
    for (const key in proposal.categories) {
        tags.push(
            <Tag style={{marginTop: "8px"}} color={CATEGORY_COLORS[index]}>{proposal.categories[key]}</Tag>
        )
        index++;
    }
    let status = proposal.proposalStatus;
    if (status === "ACTIVE") {
        tags.push(
            <Tag style={{marginTop: "8px"}} color="green">Active</Tag>
        );
    } else {
        tags.push(
            <Tag style={{marginTop: "8px"}} color="grey">Closed</Tag>
        );
    }
    let type = proposal.collabType
    if (type === "VIRTUAL") {
        tags.push(
            <Tag style={{marginTop: "8px"}} color="orange">Virtual</Tag>
        );
    } else if (type === "INPERSON") {
        tags.push(
            <Tag style={{marginTop: "8px"}} color="orange">In-Person</Tag>
        )
    } else {
        tags.push(
            <Tag style={{marginTop: "8px"}} color="orange">Can be virtual or in-person</Tag>
        );
    }
    return tags;
};

export function HasShownInterest(interests: any[], userId: string) {
    let hasShownInterest = false
    interests.forEach((interest) => {
        if (interest.userId === userId) {
            hasShownInterest = true;
        }
    });
    return hasShownInterest;
};