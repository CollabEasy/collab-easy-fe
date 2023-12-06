import React from "react";
import { useStateWithCallback } from "use-state-with-callback";
import { Input, Button, Comment, Card, Tag, Modal, Breadcrumb } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { Dispatch } from "redux";
import {
  CollabRequestData,
  ProposalData,
  SendCollabRequest,
} from "types/model";
import { useEffect, useState } from "react";
import * as action from "../../../state/action";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import { ConvertTimestampToDate } from "helpers/collabCardHelper";
import Layout from "@/components/layout";
import Loader from "@/components/loader";
import CreateProposalModal from "@/components/modal/createProposalModal";
import ProposalInterestedArtistModal from "@/components/modal/proposalInterestedArtist";
import {
  GetDateString,
  GetProposalTags,
  InterestStatus,
} from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";
import ProposalCard from "@/components/ProposalCard";
import CollabPage from "@/components/collabPage";
import collabPage from "@/components/collabPage";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const isFetchingUser = state.user.isFetchingUser;
  const loginModalDetails = state.home.loginModalDetails;

  const proposal = state.proposal;
  const proposalInterest = state.proposalInterest;

  const showCreateOrEditProposalModal =
    state.proposal.showCreateOrUpdateProposalModal;
  const showProposalInterestedArtistModal =
    state.proposalInterest.showProposalInterestedArtistModal;
  // const proposalComments = state.proposalComments;
  const isfetchingProposal = state.proposal.isfetchingProposal;
  const isfetchingProposalInterest =
    state.proposalInterest.isFetchingProposalsInterests;
  const otherUser = state.user.basicUser;
  const isFetchingBasicUser = state.user.isFetchingBasicUser;
  const collabWithUser = state.collab.userCollabs;
  // const isAddingProposalComment = state.proposalComments.isAddingProposalComment;
  return {
    user,
    otherUser,
    isFetchingUser,
    isLoggedIn,
    collabWithUser,
    loginModalDetails,
    proposal,
    proposalInterest,
    isfetchingProposal,
    isFetchingBasicUser,
    isfetchingProposalInterest,
    showCreateOrEditProposalModal,
    showProposalInterestedArtistModal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProposalByIdAction: (id: string) => dispatch(action.fetchProposalById(id)),
  updateProposal: (proposalId: string, data: any) =>
    dispatch(action.updateProposal(proposalId, data)),

  addProposalInterest: (proposalId: string, data: any) =>
    dispatch(action.addProposalInterest(proposalId, data)),
  getProposalsInterests: (proposalId: string) =>
    dispatch(action.getProposalsInterests(proposalId)),
  // fetchProposalCommentById: (proposalId: string) => dispatch(action.fetchProposalCommentByProposalId(proposalId)),
  // addProposalComment: (data: any) => dispatch(action.addProposalComment(data)),

  setShowCreateOrUpdateProposalModal: (show: boolean) =>
    dispatch(action.setShowCreateOrUpdateProposalModal(show)),
  setShowProposalInterestedArtistModal: (show: boolean) =>
    dispatch(action.setShowProposalInterestedArtistModal(show)),
  fetchBasicUser: (slug: string) => dispatch(action.fetchBasicUser(slug)),
  fetchCollabsWithUser: (slug: string) =>
    dispatch(action.fetchCollabsWithUser(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalPage = ({
  user,
  isLoggedIn,
  loginModalDetails,
  isfetchingProposal,
  isfetchingProposalInterest,
  proposal,
  otherUser,
  isFetchingUser,
  collabWithUser,
  proposalInterest,
  isFetchingBasicUser,
  showCreateOrEditProposalModal,
  showProposalInterestedArtistModal,
  // isAddingProposalComment,
  fetchCollabsWithUser,
  fetchBasicUser,
  getProposalByIdAction,
  getProposalsInterests,
  updateProposal,
  addProposalInterest,
  setShowCreateOrUpdateProposalModal,
  setShowProposalInterestedArtistModal,
}: // fetchProposalCommentById,
// addProposalComment,
Props) => {
  const { toDiscover, toAllProposalsPage, toArtistProfile } =
    useRoutesContext();

  const { confirm } = Modal;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  //   const [proposalData, setProposalData] = useState(proposal.proposal.length != 0 ? proposal.proposal[0].data : []);
  //   const [interestedArtists, setInterestedArtists] = useState(proposalInterest.proposalInterests.length != 0 ? proposalInterest.proposalInterests[0].data : []);
  const [showProfileModal, setShowProfileModal] = useState(false);

  //   const [proposalStatus, setProposalStatus] = useState(proposal.proposal.length != 0 ? proposal.proposal[0].data.proposalStatus : "false");
  const [windowWidth, setWindowWidth] = useState(-1);
  const [showCollabPage, setShowCollabPage] = useState(false);
  const [interestAcceptData, setInterestAcceptData] =
    useState<SendCollabRequest>();

  const proposalData =
    proposal.proposal.length != 0 ? proposal.proposal[0].data : [];
  const interestedArtists =
    proposalInterest.proposalInterests.length != 0
      ? proposalInterest.proposalInterests[0].data
      : [];
  const proposalStatus =
    proposal.proposal.length != 0
      ? proposalData.proposal.proposalStatus
      : "false";

  const router = useRouter();
  const { title, proposalId } = router.query;

  useEffect(() => {
    getProposalByIdAction(proposalId as string);
    getProposalsInterests(proposalId as string);
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setShowCollabPage(false);
        setInterestAcceptData(undefined);
      }
    });
  }, []);

  useEffect(() => {
    if (showCollabPage && interestAcceptData !== undefined) {
      openNav();
    } else {
      closeNav();
    }
  }, [interestAcceptData, showCollabPage]);

  const confirmCloseProposal = (proposalData) => {
    confirm({
      title: "Are you sure you want to close this proposal?",
      onOk() {
        let obj = {
          proposal_title: proposalData.title,
          proposal_description: proposalData.description,
          category_ids: Object.keys(proposalData.categories),
          collab_type: proposalData.collabType,
          proposal_status: "CLOSED",
        };
        updateProposal(proposalData.proposalId, obj);
      },
      onCancel() {
        // Do nothing
      },
    });
  };

  function openNav() {
    document.getElementById("collabPage").style.width = "90%";
    document.getElementById("main").style.marginLeft = "400px";
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    if (document.getElementById("collabPage") !== null) {
      document.getElementById("collabPage").style.width = "0";
    }
    if (document.getElementById("main") !== null) {
      document.getElementById("main").style.marginLeft = "0";
    }
  }

  const confirmShowInterest = (proposalData) => {
    confirm({
      title: "We are glad to know that you are intersted",
      content: "Please click OK to confirm!",
      onOk() {
        let obj = {
          // for now we have harcoded, in future, we can ask artist
          // to type in custom message.
          message: "I'm interested",
        };
        addProposalInterest(proposalData.proposalId, obj);
      },
      onCancel() {
        // Do nothing
      },
    });
  };

  const getProposalCard = () => {
    // let interests =
    //   proposalInterest.proposalInterests.length != 0
    //     ? proposalInterest.proposalInterests[0].data
    //     : [];
    // if (proposal.proposal.length === 0) {
    //   return <></>;
    // }
    // let data = proposal.proposal.length != 0 ? proposal.proposal[0].data : [];
    // const status = data.proposal.proposalStatus;
    return (
      <ProposalCard
        isLoggedIn={isLoggedIn}
        proposalData={proposalData}
        interests={interestedArtists}
        onClickEdit={(proposal: any) => {
          //   setProposalData(proposal);
          setShowCreateOrUpdateProposalModal(true);
        }}
        onClickMarkClosed={(proposal: any) => {
          // setProposalData(proposal);
          confirmCloseProposal(proposal);
        }}
        onClickShowInterestedArtist={(proposal: any) => {
          // setProposalStatus(status);
          // setProposalData(proposal);
          // setInterestedArtists(interests);
          setShowProposalInterestedArtistModal(true);
        }}
      />
    );
  };

  const getBreadcrum = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toAllProposalsPage().href}>Collab Proposals</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  // if (isFetchingUser) {
  //   return <Loader />
  // }

  return (
    <Layout
      title={(title as string).replace(/-/g, " ")}
      name={"description"}
      content={
        "Check out this interesting proposals for collaboration. Show interest and unlock the opportunity for working on a masterpiece with a fellow artist!"
      }
    >
      <div
        onClick={() => {
          if (document.getElementById("collabPage") !== null) {
            setShowCollabPage(false);
            setInterestAcceptData(undefined);
          }
        }}
      >
        <div id="main">
          {loginModalDetails.openModal && !user.new_user && <LoginModal />}
          {showProfileModal && <NewUserModal />}
          <div className="allProposalsPage_listingPagecontainer">
            {isfetchingProposal || isfetchingProposalInterest ? (
              <Loader />
            ) : (
              <>
                {windowWidth > 500 && <>{getBreadcrum()}</>}
                {getProposalCard()}
              </>
            )}
            {showProposalInterestedArtistModal && (
              <ProposalInterestedArtistModal
                proposalStatus={proposalStatus}
                proposalId={proposalId as string}
                interestedArtists={interestedArtists}
                onAccept={(record: any) => {
                  const acceptData: SendCollabRequest = {
                    receiverId: record.artistId,
                    requestData: {
                      message: proposalData?.proposal.title,
                      collabTheme: proposalData?.proposal.description,
                    },
                    collabDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  };

                  setShowCollabPage(true);
                  setInterestAcceptData(acceptData);
                  fetchBasicUser(record.slug);
                  fetchCollabsWithUser(record.slug);
                }}
              />
            )}
          </div>

          {showCreateOrEditProposalModal && (
            <CreateProposalModal
              onCancel={() => {
                setShowCreateOrUpdateProposalModal(false);
              }}
              isViewMode={true}
              isEditMode={true}
              proposalDetails={proposalData.proposal}
            />
          )}
        </div>
      </div>
      {interestAcceptData !== undefined && (
        <div id="collabPage" className="proposalHome_sidebar">
          {interestAcceptData === undefined ||
          isFetchingBasicUser ||
          collabWithUser.isFetchingCollabsWithUser ? (
            <Loader />
          ) : (
            <CollabPage
              bigScreenWidth={1332}
              showBackButton
              onClickBackButton={() => {
                closeNav();
                setShowCollabPage(false);
              }}
              proposalId={proposalId as string}
              collabTitle={interestAcceptData.requestData.message}
              collabTheme={interestAcceptData.requestData.collabTheme}
              otherUser={otherUser}
              isFetchingOtherUser={isFetchingBasicUser}
              isFetchingPastCollabs={collabWithUser.isFetchingCollabsWithUser}
              pastCollabs={collabWithUser.collabs}
              onCollabRequestSend={(id: string) => {
                setShowCollabPage(false);
                getProposalsInterests(proposalId as string);
              }}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default connector(ProposalPage);
