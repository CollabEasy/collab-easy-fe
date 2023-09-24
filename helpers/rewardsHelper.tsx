export function GetRewardsEarningSummary(refferalCode: string) {
  // Earn points by refferal
  var summary =
    "- Share code " +
    refferalCode +
    " with your friends to earn 100 points for successful refferal.\n";

  // Earn points by montly contest
  // summary += "- Earn 50 points for each successful submission in our monthly contest. \n";

  // Earn points by successful collab
  // summary += "- Earn 50 points for successfully completing a collab request. \n";

  // Earn points by completing profile
  summary += "- Earn 50 points for completing your profile. \n";

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

export function GetRewardTableMessage(actionType: string, details: any) {
  if (actionType === "REFERRAL_USER") {
    return ConstructReferralMessage(details);
  }
}

export function ConstructReferralMessage(element: any) {
  const details = JSON.parse(element["details"]);
  let desc = null;
  if (
    "referred_by" in details &&
    details["referred_by_slug"] === "wondor-wondor-1"
  ) {
    desc = "You used Wondor signup code.";
  } else {
    const text =
      "referred_by" in details ? "You were referred by " : "You referred ";
    const linkText =
      "referred_by" in details
        ? details["referred_by_name"]
        : details["referred_to_name"];
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const link =
      origin +
      "/artist/profile/" +
      ("referred_by" in details
        ? details["referred_by_slug"]
        : details["referred_to_slug"]);
    desc = buildLink({
      text: text,
      linkText: linkText,
      link: link,
    });
  }
  return desc;
}

const buildLink = (obj: { text: string; link: string; linkText: string }) => {
  console.log("obj : ", obj);
  return (
    <p>
      {obj.text}
      <a href={obj.link}>{obj.linkText}</a>
    </p>
  );
};
