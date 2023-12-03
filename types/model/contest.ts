export interface ContestEntry {
    slug: string; 
    title: string;
    description: string;
    startDate: number;
    endDate: number;
}

export interface ContestSubmission {
    imageUrl: string;
    description: string;
}

export interface ContestSubmissionVote {
    id: number;
    slug: string;
}