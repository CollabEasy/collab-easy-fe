import { ProposalData } from "types/model";

export interface ProposalState {
    proposal: any[]
    proposals: any[];
    userProposals: any[];
    proposalCount: number;
    isAddingProposal: boolean;
    isfetchingProposal: boolean;
    isFetchingAllProposals: boolean;
    isfetchingUserProposals: boolean;
    showCreateOrUpdateProposalModal: boolean;
}
