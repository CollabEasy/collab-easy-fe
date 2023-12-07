/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { AppState } from "state";
import { EditOutlined } from "@ant-design/icons";
import {
  GetDateString,
  GetProposalTags,
  InterestStatus,
} from "helpers/proposalHelper";
import { useRoutesContext } from "./routeContext";
import { Button } from "antd";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isLoggedIn: boolean;
  proposalData: any;
  interests: any;
  onClickEdit: (proposal: any) => void;
  onClickMarkClosed: (proposal: any) => void;
  onClickShowInterestedArtist: (proposal: any) => void;
  confirmShowInterest: (proposal: any) => void;
} & ConnectedProps<typeof connector>;

const ProposalCard = ({
  user,
  isLoggedIn,
  proposalData,
  interests,
  onClickEdit,
  onClickMarkClosed,
  onClickShowInterestedArtist,
  confirmShowInterest
}: Props) => {
  const { toDiscover, toAllProposalsPage, toArtistProfile } =
    useRoutesContext();
  let interestStatus = InterestStatus(interests, user.artist_id);

  const getSameUserButtonGroup = (): JSX.Element => {
    return (
      <div className="twoButtonsSpacing">
        <Button
          type="primary"
          onClick={() => {
            onClickShowInterestedArtist(proposalData.proposal);
          }}
        >
          Interested Artists
        </Button>
        <Button
          disabled={proposalData.proposal.proposalStatus === "CLOSED"}
          onClick={() => {
            onClickMarkClosed(proposalData.proposal);
          }}
        >
          {proposalData.proposal.proposalStatus === "CLOSED"
            ? "Closed Proposal"
            : "Mark Closed"}
        </Button>
      </div>
    );
  };

  const getOtherUserButtonGroup = (): JSX.Element => {
    return (
      <>
        {!isLoggedIn && (
          <div className="login-message">
            <p>Please, login to show interest</p>
          </div>
        )}
        {interestStatus["shown_interest"] ? (
          <p className="common-text-style">
            You have shown interest{" "}
            {interestStatus["accepeted"]
              ? "and it got accepted too 🥳"
              : interestStatus["rejected"]
              ? "but unfortunately it got rejected 😢"
              : "😎"}
          </p>
        ) : (
          <Button
            disabled={
              proposalData.proposal.proposalStatus === "CLOSED" || !isLoggedIn
            }
            onClick={confirmShowInterest}
          >
            Show Interest
          </Button>
        )}
      </>
    );
  };

  const getBanner = () => {
    if (user.artist_id === proposalData.proposal.createdBy)
      return <div className=""></div>;
    return (
      <>
        {proposalData.proposal.proposalStatus === "ACTIVE" ? (
          <div
            style={{
              backgroundColor: "#E2F0CB",
              paddingBottom: ".5px",
              paddingTop: "1%",
              textAlign: "center",
            }}
          >
            <p>
              This proposal is active 🎉. Show interest now and take the first
              step towards a powerful collab!
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#EDC5CD",

              paddingBottom: ".5px",

              paddingTop: "1%",

              textAlign: "center",
            }}
          >
            <p>
              Looks like this is a closed proposal. But you can still reach out
              to the creator for a collab!
            </p>
          </div>
        )}{" "}
      </>
    );
  };

  const getOtherArtistButtonGroup = () => {};

  return (
    <div className="ui-block">
      {getBanner()}
      <article className="hentry post">
        <div
          className="m-link"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <span>
            <h5 className="common-h4-style">{proposalData.proposal.title}</h5>
          </span>
          {user.artist_id === proposalData.proposal.createdBy &&
            proposalData.proposal.proposalStatus !== "CLOSED" && (
              <span style={{ marginLeft: "20px" }}>
                <EditOutlined
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    onClickEdit(proposalData.proposal);
                  }}
                />
              </span>
            )}
        </div>
        <div className="post__author author vcard inline-items">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={proposalData.creatorProfilePicUrl} alt="author" />
          <div className="author-date">
            <a
              className="post__author-name fn"
              href={toArtistProfile(proposalData.creatorSlug).as}
              target="_blank"
              rel="noreferrer"
            >
              {proposalData.creatorFirstName} {proposalData.creatorLastName}
            </a>
            <p className="common-p-style">
              Created at {GetDateString(proposalData.proposal.createdAt)}
            </p>
          </div>
        </div>
        <p className="common-p-style">{proposalData.proposal.description}</p>
        <p>{GetProposalTags(proposalData.proposal)}</p>
        <div
          className="post-additional-info inline-items"
          style={{ padding: "20px 0 0" }}
        >
          <p>
            {user.artist_id === proposalData.proposal.createdBy
              ? getSameUserButtonGroup()
              : getOtherUserButtonGroup()}
          </p>
        </div>
      </article>
    </div>
  );
};

export default connector(ProposalCard);
