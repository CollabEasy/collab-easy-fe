import { RewardPoints } from "types/model/rewards";

export interface RewardsActivityState {
    isVerifyingRefferalCode: boolean;
    isFetchingRewardsActivity: boolean;
    isFetchingRewardsPoints: boolean;
    isSkippingRefferalCode: boolean;
    rewardsActivity?: any[];
    rewardPoints: RewardPoints;
}
