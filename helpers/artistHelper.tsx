

export function GetUserSkills(skills: string[]) {
    const skillsHtml: JSX.Element[] = [];
    if (skills.length > 0) {
        skills.forEach((skill: string, index: number) => {
            skillsHtml.push(
                <>
                    <span className="common-text-style">{skill}</span>
                    {index == skills.length - 1 ? (<></>) : (<span className="dot"></span>)}
                </>
            )
        })
    }
    return skillsHtml;
}