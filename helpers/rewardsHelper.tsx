export function GetRewardsEarningSummary(refferalCode: string) {
  // Earn points by refferal
  var summary = [
    `Share code $refferalCode$ with your friends to earn 100 points for successful refferal.`,
    "Earn 50 points for completing your profile.",
  ];

  // Earn points by montly contest
  // summary += "- Earn 50 points for each successful submission in our monthly contest. \n";

  // Earn points by successful collab
  // summary += "- Earn 50 points for successfully completing a collab request. \n";

  // Earn points by completing profile

  return summary;
}

export function GetRewardsRedeemSummary() {
  // Earn points by refferal
  var summary = "- 100 points are worth $1 \n";

  // Earn points by montly contest
  // summary += "- Earn 50 points for each successful submission in our monthly contest. \n";

  // Earn points by successful collab
  // summary += "- Earn 50 points for successfully completing a collab request. \n";

  // Earn points by completing profile
  summary += "- Earn 50 points for completing your profile. \n";

  return summary;
}

export function GetDateString(time: number) {
  let myDate = new Date(time);
  let dateStr = myDate.getFullYear() + "-";
  if (myDate.getMonth() + 1 < 10) {
    dateStr += "0" + (myDate.getMonth() + 1) + "-";
  } else {
    dateStr += myDate.getMonth() + 1 + "-";
  }

  if (myDate.getDate() < 10) {
    dateStr += "0" + myDate.getDate();
  } else {
    dateStr += myDate.getDate();
  }

  return dateStr;
}

export function GetPointsByCategory(rewardsActivity, category) {
  let points = 0;
  let data = rewardsActivity.length != 0 ? rewardsActivity[0].data : [];
  data.forEach((element) => {
    if (element["action"] === category) {
      points += element["points"];
    }
  });
  return points;
}
