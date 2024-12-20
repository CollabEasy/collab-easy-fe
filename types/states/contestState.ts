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
   allSubmissions?: any[];
   artistSubmission?: any[];
   isUploading: boolean,
   isUploaded: boolean,
}

export interface ContestSubmissionVoteState {
   isFetchingSubmissionVotes: boolean;
   artistSubmissionVotes?: any[];
   artistSubmissionVotesId?: any[];
}