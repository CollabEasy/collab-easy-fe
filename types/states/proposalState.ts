import { ProposalData } from "types/model";

export interface ProposalState {
    proposals: ProposalData[];
    proposalCount: number;
    isAddingProposal: boolean;
    isfetchingProposal: boolean;
    isFetchingAllProposals: boolean;
}
