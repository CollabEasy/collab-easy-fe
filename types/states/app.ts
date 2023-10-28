import { HomeState, UserState } from ".";
import { CollabRequestState } from "./collab";
import { ArtistCategoriesState } from "./artistCategories";
import { UserSampleState } from "./sample";
import { CategoryState } from "./category";
import { ScratchpadState } from "./scratchpad";
import { SocialProspectusState } from "./socialProspectus";
import { CollabConversationState } from "./collabConversation";
import { AnalyticsState } from "./analyticsState";
import { NotificationState } from "./notificationState";
import { ContestState, ContestSubmissionState, ContestSubmissionVoteState } from "./contestState";
import { RewardsActivityState } from "./rewardsState";
import { ProposalState } from "./proposalState";

export interface AppState {
  isFetchingAllProposals: any;
  home: HomeState;
  user: UserState;
  collab: CollabRequestState;
  sample: UserSampleState;
  category: CategoryState;
  scratchpad: ScratchpadState;
  socialProspectus: SocialProspectusState;
  collabConversation: CollabConversationState;
  analytics: AnalyticsState;
  notification: NotificationState,
  contest: ContestState,
  contestSubmission: ContestSubmissionState,
  contestSubmissionVote: ContestSubmissionVoteState,
  rewardsActivity: RewardsActivityState,
  proposal: ProposalState,
}