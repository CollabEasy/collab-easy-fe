export interface ContestEntry {
    slug: string; 
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface ContestSubmissionVote {
    id: number;
    slug: string;
}