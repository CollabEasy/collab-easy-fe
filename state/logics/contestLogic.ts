import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as contestApi from "../../api/contest";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/contestActionTypes";
import * as notifActions from "../action/notificationAction";

export const fetchContestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchContest>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_CONTEST],
  async process({ action, api }, dispatch, done) {
    try {
      const slug = action.payload.slug;
      dispatch(actions.fetchContestRequest());
      const result = await contestApi.fetchContestApi(slug);
      dispatch(actions.fetchContestSuccess(result));
    } catch (error) {

    } finally {
      done();
    }
  },
});

export const fetchAllContestsLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchAllContests>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ALL_CONTESTS],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchAllContestsRequest());
      const result = await contestApi.fetchAllContestsApi();
      dispatch(actions.fetchAllContestsSuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});

export const addContestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.addContest>,
  any,
  LogicDeps
>({
  type: [actionTypes.ADD_CONTEST],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.addContestRequest());
      const { data } = action.payload;
      const result = await api.contestApi.addContestApi(data);
      dispatch(notifActions.showNotification(true, 'Your contest added successfully 🥳'));
      dispatch(actions.addContestSuccess(data));
      dispatch(actions.setShowContestModal(false));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
    } finally {
      done();
    }
  },
});

export const updateContestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateContest>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPDATE_CONTEST],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.updateContestRequest());
      const { data } = action.payload;
      const result = await api.contestApi.updateContestApi(data);
      dispatch(notifActions.showNotification(true, 'Changes to your contest saved successfully 🥳'));
      dispatch(actions.updateContestSuccess(data));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const fetchArtistSubmissionLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistSubmission>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ARTIST_SUBMISSION],
  async process({ action, api }, dispatch, done) {
    try {
      const slug = action.payload.slug;
      dispatch(actions.fetchArtistSubmissionRequest());
      const result = await contestApi.fetchArtistSubmissionApi(slug);
      dispatch(actions.fetchArtistSubmissionSuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});

export const fetchContestSubmissionsLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchContestSubmissions>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_CONTEST_SUBMISSIONS],
  async process({ action, api }, dispatch, done) {
    try {
      const slug = action.payload.slug;
      dispatch(actions.fetchContestSubmissionsRequest());
      const result = await contestApi.fetchContestSubmissionsApi(slug);
      dispatch(actions.fetchContestSubmissionsSuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});

export const upvoteContestSubmissionLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.upvoteContestSubmission>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPVOTE_CONTEST_SUBMISSION],
  async process({ action, api }, dispatch, done) {
    try {
      const data = action.payload.data;
      dispatch(actions.upvoteContestSubmissionRequest());
      const result = await contestApi.updateContestSubmissionApi(data);
      dispatch(actions.upvoteContestSubmissionSuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});