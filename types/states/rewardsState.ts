import { RewardPoints } from "types/model/rewards";

export interface RewardsActivityState {
    isVerifyingRefferalCode: boolean;
    isFetchingRewardsActivity: boolean;
    isFetchingRewards: boolean;
    isSkippingRefferalCode: boolean;
    rewardsActivity?: any[];
    rewardPoints: RewardPoints;
}
