import { ProposalData } from "types/model";

export interface ProposalState {
    proposal: any[]
    proposals: any[];
    proposalCount: number;
    isAddingProposal: boolean;
    isfetchingProposal: boolean;
    isFetchingAllProposals: boolean;
}
