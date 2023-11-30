import { CONTEST_METADATA } from "constants/contest";
import { TAGS_COLORS } from "./helper";
import { Tag } from "antd";

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

export function GetContestStatus(now: number, start: number, end: number) {
    var nowDateStr = GetDateString(now);
    var startDateStr = GetDateString(start);
    var endDateStr = GetDateString(end);

    if (nowDateStr < startDateStr) {
        return "Upcoming";
    } else if (nowDateStr >= startDateStr && nowDateStr <= endDateStr) {
        return "Ongoing";
    } else {
        return "Past";
    }
}

export function GetContestEligibleCategoriesTags(categories) {
    const tags: JSX.Element[] = [];
    let index = 0;
    for (let i = 0; i < categories.length; i++) {
        tags.push(
            <Tag style={{ marginTop: "8px" }} color={TAGS_COLORS[index]}>{categories[i]}</Tag>
        )
        index++;
    }
    return tags;
}

export function GetContestMetadata(contestSlug: string) {
    let genericMetadata = {
        "slug": contestSlug,
        "prize": 20,
        "category": []
    }
    CONTEST_METADATA.forEach(contest => {
        if (contest["slug"] === contestSlug) {
            genericMetadata = contest;
        }
    });

    return genericMetadata;
}

export function getContestCountdownHeading(status: string) {
    if (status === "Upcoming") {
        return "Contest Starts In:";
    } else if (status === "Ongoing") {
        return "Contest Ends In:"
    } else {
        return "Contest Ended:"
    }
}