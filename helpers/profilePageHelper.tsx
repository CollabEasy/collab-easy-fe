import { User } from "types/model/user";


export function GetUserSkills(user: User, all: boolean) {
    if (!user.skills) {
        return "";
    }
    var skills = "";
    user.skills.forEach((skill: string, index: number) => {
        if (!all && index >= 2) {
            return skills;
        }
        if (index > 0) {
            skills = skills + ", ";
        }
        skills = skills + skill;
    });
    return skills;
};


export function ShowIncompleteProfileBanner(user: User) {
    if (!user.bio || user.bio.length === 0) {
        return true;
    } else if (!user.skills || user.skills.length === 0) {
        return true;
    } else {
        return false;
    }
}