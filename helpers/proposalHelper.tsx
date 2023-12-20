import { Tag } from "antd";
import { TAGS_COLORS } from "./helper";

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
            <Tag style={{ marginTop: "8px" }} color={TAGS_COLORS[index]}>{proposal.categories[key]}</Tag>
        )
        index++;
    }
    let status = proposal.proposalStatus;
    if (status === "ACTIVE") {
        tags.push(
            <Tag style={{ marginTop: "8px" }} color="green">Active</Tag>
        );
    } else {
        tags.push(
            <Tag style={{ marginTop: "8px" }} color="grey">Closed</Tag>
        );
    }
    let type = proposal.collabType
    if (type === "VIRTUAL") {
        tags.push(
            <Tag style={{ marginTop: "8px" }} color="orange">Virtual</Tag>
        );
    } else if (type === "INPERSON") {
        tags.push(
            <Tag style={{ marginTop: "8px" }} color="orange">In-Person</Tag>
        )
    } else {
        tags.push(
            <Tag style={{ marginTop: "8px" }} color="orange">Can be virtual or in-person</Tag>
        );
    }
    return tags;
};

export function InterestStatus(interests: any[], userId: string) {
    let interestStatus = {
        "shown_interest": false,
        "accepeted": false,
        "rejected": false,
    }
    interests.forEach((interest) => {
        if (interest.userId === userId) {
            interestStatus["shown_interest"] = true
            if (interest.accepeted) {
                interestStatus["accepeted"] = true
            }
            if (interest.rejected) {
                interestStatus["rejected"] = true
            }
        }
    });
    return interestStatus;
};


const getMatchingIds = (list1, list2) => {
    // Extract names from both lists
    const namesList1 = list1.map(item => item.name);
    const namesList2 = list2.map(item => item.artName); // Assuming 'artName' is the property in list2
  
    // Find common names
    const commonNames = namesList1.filter(name => namesList2.includes(name));
  
    // Get corresponding ids
    const matchingIds = list2
      .filter(item => commonNames.includes(item.artName))
      .map(item => item.id);
  
    return matchingIds;
};

export function GetUserMightLikecategoriesIds(mightLikeCategories, publishedCategories) {
    let mightLikeCategoriesIds = []
    mightLikeCategoriesIds = getMatchingIds(mightLikeCategories, publishedCategories);
    return mightLikeCategoriesIds;
}