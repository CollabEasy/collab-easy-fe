export interface ContestEntry {
    slug: string; 
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    winnerArtistId: string;
    categories: string;
}

export interface ContestSubmission {
    imageUrl: string;
    description: string;
}

export interface ContestSubmissionVote {
    id: number;
    slug: string;
}