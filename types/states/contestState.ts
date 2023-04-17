export interface ContestState {
    isFetchingContest: boolean;
    isUpdatingContest: boolean;
    contest?: any[];
    allContest: number;
    showContestModal: boolean,
 }

 export interface ContestSubmissionState {
    isFetchingSubmission: boolean;
    submission?: any[];
 }