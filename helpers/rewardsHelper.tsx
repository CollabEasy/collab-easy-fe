export function GetRewardsEarningSummary(refferalCode: string) {
    // Earn points by refferal
    var summary = "- Share code " + refferalCode + " with your friends to earn 150 points for successful refferal.\n";

    // Earn points by montly contest
    summary += "- Earn 50 points for each successful submission in our monthly contest. \n";

    // Earn points by successful collab
    summary += "- Earn 50 points for successfully completing a collab request. \n";

    return summary
}

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

export function GetPointsByCategory(rewardsActivity, category) {
    let points = 0;
    let data = rewardsActivity.length != 0 ? rewardsActivity[0].data : [];
    data.forEach(element => {
        if (element["action"] === category) {
            points += element["points"];
        }
    });
    return points;
};