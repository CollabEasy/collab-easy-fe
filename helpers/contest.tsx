
export function GetDateString(time: number) {
    let myDate = new Date(time);
    let dateStr = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
    return dateStr
}

export function GetContestStatus(now: number, start: number, end: number) {
    return "Ongoing";
    if (now < start) {
        return "Upcoming";
    } else if (now >= start && now <= end) {
        return "Ongoing";
    } else {
        return "Past";
    }
}