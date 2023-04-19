export interface ContestState {
    isFetchingContest: boolean;
    isUpdatingContest: boolean;
    contest?: any[];
    contestCount: number;
    showContestModal: boolean,
 }

 export interface ContestSubmissionState {
    isFetchingSubmissions: boolean;
    isFetchingArtistSubmission: boolean;
    isFetchingSubmissionVotes: boolean;
    allSubmissions?: any[];
    artistSubmission?: any[];
    artistSubmissionVotes?: any[];
 }