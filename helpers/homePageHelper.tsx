export function getPopularCategoryImage(category: string) {
    if (category === "dancing") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/eoRpjgHYYEqr0co87nwCDQ/disco_ball.svg";
    }
    else if (category === "singing") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/M5PSbrMWSU63OF34y-Dfyg/microphone.svg";
    }
    else if (category === "photography") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/C58hR0F-tkm9ZpPfkFkPUw/camera.svg";
    }
    else if (category === "writing") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/OEju2Qj12EC6OPDH0FfgAw/pencil.svg";
    }
    else if (category === "illustration") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/LtNSPsj3SkKpUYCG7NfRQg/tablet_front_view.svg";
    }
    else if (category === "musician") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/-sc9WCeBikKhhXnjAe5ePA/piano_side_view.svg";
    }
    else if (category === "journaling") {
        return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/tMlgnq4rsk-7qQLI6GtH4w/open_book.svg";
    }
    return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/HdM_z7rZXE-ZNeWoyJgHIA/palette.svg";
}

export function getPopularProposalCategory(category: []) {
    const skills: JSX.Element[] = [];
    category.forEach((skill: string) => {
        skills.push(
            <span className="badge bg-soft-secondary mt-1">{skill}</span>
        );
    });
    return skills;
};
