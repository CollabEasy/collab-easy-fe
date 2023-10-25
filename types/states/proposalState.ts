import { ProposalData } from "types/model";

export interface ProposalState {
    isFetchingAllProposals: boolean;
    proposals: ProposalData[];
    isAddingProposal: boolean;
}
