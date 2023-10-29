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

export function GetUserSkillsTags(categories: any[]) {
    const skills: JSX.Element[] = [];
    if (categories.length === 0) {
        return skills;
    }
    let index = 0;
    for (const key in categories) {
        skills.push(
            <Tag color={CATEGORY_COLORS[index]}>{categories[key]}</Tag>
        )
        index++;
    }
    return skills;
};