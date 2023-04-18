export interface ContestState {
    isFetchingContest: boolean;
    isUpdatingContest: boolean;
    contest?: any[];
    allContest: number;
    showContestModal: boolean,
 }

 export interface ContestSubmissionState {
    isFetchingSubmissions: boolean;
    isFetchingArtistSubmission: boolean;
    allSubmissions?: any[];
    artistSubmission?: any[];
 }