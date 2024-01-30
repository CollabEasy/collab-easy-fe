

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

export function getArtistSkills(skills=[]){
    const maxSkillsToShow = 2;
  
    return (
      <div className="artist-skills-container">
        {skills.slice(0, maxSkillsToShow).map((skill, idx) => (
          <div className="skill-cnt" key={idx}>
            <span className="skill-name">{skill}</span>
          </div>
        ))}
  
        {skills.length > maxSkillsToShow && (
          <div className="skill-cnt more-skill">
            <span className="skill-name">+{skills.length - maxSkillsToShow}</span>
          </div>
        )}
      </div>
    );
  };