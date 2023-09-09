export function GetRewardsEarningSummary(refferalCode: string) {
    // Earn points by refferal
    var summary = "- Share code " + refferalCode + " with your friends to earn 150 points for successful refferal.\n";

    // Earn points by montly contest
    summary += "- Earn 100 points for each successful submission in our monthly contest. \n";

    // Earn points by successful collab
    summary += "- Earn 100 points for successfully completing a collab request. \n";

    return summary
 }