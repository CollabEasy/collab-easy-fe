
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