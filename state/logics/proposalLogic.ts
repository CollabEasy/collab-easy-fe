import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as proposalApi from "../../api/proposal";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/proposalActionTypes";
import * as notifActions from "../action/notificationAction";

export const addProposalLogic = createLogic<
    AppState,
    FSACreatorPayload<typeof actions.addProposal>,
    any,
    LogicDeps
>({
    type: [actionTypes.ADD_PROPOSAL],
    async process({ action, api }, dispatch, done) {
        try {
            dispatch(actions.addProposalRequest())
            const { data } = action.payload;
            const proposalData = await proposalApi.addProposalApi(data);
            dispatch(actions.addProposalSuccess(proposalData));
            dispatch(notifActions.showNotification(true, 'The proposal has been successfully submitted for review 🥳'));
        } catch (error) {
            const error_response = error.response.data;
            dispatch(notifActions.showNotification(false, error_response['err_str']));
        } finally {
            done();
        }
    },
});

export const fetchAllProposalsLogic = createLogic<
    AppState,
    FSACreatorPayload<typeof actions.getAllProposals>,
    any,
    LogicDeps
>({
    type: [actionTypes.FETCH_ALL_PROPOSALS],
    async process({ api }, dispatch, done) {
        try {
            dispatch(actions.getAllCategoriesRequest())
            const proposalsData = await proposalApi.getAllProposals();
            dispatch(actions.getAllProposalsSuccess(proposalsData));
        } catch (error) {
        } finally {
            done();
        }
    },
});


// export const fetchProposalByIdLogic = createLogic<
//     AppState,
//     FSACreatorPayload<typeof actions.fetchProposalById>,
//     any,
//     LogicDeps
// >({
//     type: [actionTypes.FETCH_PROPOSAL_BY_ID],
//     async process({ action, api }, dispatch, done) {
//         const { id } = action.payload;
//         try {
//             dispatch(actions.fetchProposalByIdRequest());
//             const result = await proposalApi.getProposalByIdAPI(id);
//             dispatch(actions.fetchProposalByIdSuccess(result));
//         } catch (error) {
//             dispatch(actions.fetchProposalByIdFalilure(error));
//         } finally {
//             done();
//         }
//     },
// });

// export const fetchProposalByArtistSlugLogic = createLogic<
//     AppState,
//     FSACreatorPayload<typeof actions.fetchProposalByArtistSlug>,
//     any,
//     LogicDeps
// >({
//     type: [actionTypes.FETCH_PROPOSAL_BY_ARTIST_SLUG],
//     async process({ action, api }, dispatch, done) {
//         const { slug } = action.payload;
//         try {
//             dispatch(actions.fetchProposalByArtistSlugRequest());
//             const result = await proposalApi.getArtistsByCategorySlugAPI(slug);
//             dispatch(actions.fetchProposalByArtistSlugSuccess(result));
//         } catch (error) {
//             dispatch(actions.fetchProposalByArtistSlugFalilure(error));
//         } finally {
//             done();
//         }
//     },
// });

