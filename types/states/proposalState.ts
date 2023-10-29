import { ProposalData } from "types/model";

export interface ProposalState {
    proposals: any[];
    proposalCount: number;
    isAddingProposal: boolean;
    isfetchingProposal: boolean;
    isFetchingAllProposals: boolean;
}
