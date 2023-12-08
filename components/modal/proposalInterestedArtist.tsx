import Modal from "antd/lib/modal/Modal";
import { Table, Button } from "antd";
import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

const mapStateToProps = (state: AppState) => ({
  isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
  showProposalInterestedArtistModal:
    state.proposalInterest.showProposalInterestedArtistModal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setShowProposalInterestedArtistModal: (show: boolean) =>
    dispatch(action.setShowProposalInterestedArtistModal(show)),
  acceptProposalInterest: (proposalId: string, data: any) =>
    dispatch(action.acceptProposalInterest(proposalId, data)),
  rejectProposalInterest: (proposalId: string, data: any) =>
    dispatch(action.rejectProposalInterest(proposalId, data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  proposalStatus: string;
  proposalId: string;
  interestedArtists: any[];
  onAccept: (record: any) => void;
} & ConnectedProps<typeof connector>;

const ProposalInterestedArtistModal = ({
  proposalStatus,
  proposalId,
  interestedArtists,
  onAccept,
  acceptProposalInterest,
  rejectProposalInterest,
  setShowProposalInterestedArtistModal,
}: Props) => {
  const { toArtistProfile, toCollabPage } = useRoutesContext();
  const [showModal, setViewModal] = useState(true);

  const acceptInterestedArtist = (proposal: any) => {
    let data = {
      user: proposal.artistId,
    };
    acceptProposalInterest(proposalId, data);
  };
  const rejectInterestedArtist = (proposal: any) => {
    let data = {
      user: proposal.artistId,
    };
    rejectProposalInterest(proposalId, data);
  };

  const columns = [
    {
      title: "Artist",
      key: "artist",
      dataIndex: "artist",
      // eslint-disable-next-line react/display-name
      render: (text: string, record: any) => (
        <a
          href={toArtistProfile(record.slug).as}
          target="_blank"
          rel="noreferrer"
        >
          {record.artist}
        </a>
      ),
    },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Action",
      key: "key",
      dataIndex: "key",
      // eslint-disable-next-line react/display-name
      render: (_text: any, record: any) => (
        <>
          {record.accepted && (
            <>No action required, you have already accepted</>
          )}
          {record.rejected && (
            <>No action required, you have already rejected</>
          )}
          {!record.accepted && !record.rejected && (
            <>
              {proposalStatus === "CLOSED" && (
                <p style={{ color: "red" }}>
                  No action allowed on a closed proposal
                </p>
              )}
              <div className="twoButtonsSpacing">
                <Button
                  type="primary"
                  disabled={proposalStatus !== "ACTIVE"}
                  onClick={() => onAccept(record)}
                >
                  Accept
                </Button>
                <Button
                  disabled={proposalStatus !== "ACTIVE"}
                  onClick={() => rejectInterestedArtist(record)}
                >
                  Reject
                </Button>
              </div>
            </>
          )}
          {record.accepted && (record.collabId !== undefined || record.collabId !== null) && (
            <Button type="primary">
              <a href={routeToHref(toCollabPage(record.collabId))}>
                See collab request
              </a>
            </Button>
          )}
        </>
      ),
    },
  ];

  const deviceColumns = [
    {
      // eslint-disable-next-line react/display-name
      render: (record, key, index) => {
        const artist = record.artist;
        const message = record.message;
        return (
          <div>
            <span>
              <p>
                <b>Artist: </b>
                <a
                  href={toArtistProfile(record.slug).as}
                  target="_blank"
                  rel="noreferrer"
                >
                  {artist}
                </a>
              </p>
            </span>
            <span>
              <p>
                <b>Message: </b> {message}
              </p>
            </span>
            {record.accepted && (
              <>No action required, you have already accepted</>
            )}
            {record.rejected && (
              <>No action required, you have already rejected</>
            )}
            {!record.accepted && !record.rejected && (
              <div>
                {proposalStatus === "CLOSED" && (
                  <p style={{ color: "red" }}>
                    No action allowed on a closed proposal
                  </p>
                )}
                <div className="twoButtonsSpacing">
                  <Button type="primary" onClick={() => onAccept(record)}>
                    Accept
                  </Button>
                  <Button onClick={() => rejectInterestedArtist(record)}>
                    Reject
                  </Button>
                </div>
              </div>
            )}
            {record.accepted && (record.collabId !== undefined || record.collabId !== null) && (
              <Button type="primary">
                <a href={routeToHref(toCollabPage(record.collabId))}>
                  See collab request
                </a>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const getInterestedArtists = () => {
    let updatedData = [];
    interestedArtists.forEach((element) => {
      let obj = {
        artistId: element.userId,
        artist: element.askedByFirstName + " " + element.askedByLastName,
        slug: element.askedBySlug,
        accepted: element.accepted,
        rejected: element.rejected,
        message:
          element.message.length === 0 ? "I'm interested" : element.message,
        collabId: element.collabId,
      };
      updatedData.push(obj);
    });
    return (
      <Table
        columns={window.innerWidth < 500 ? deviceColumns : columns}
        dataSource={updatedData}
      />
    );
  };

  const handleCancel = () => {
    setShowProposalInterestedArtistModal(false);
    setViewModal(false);
  };

  return (
    <div
      className="ui-block"
      // width={window.innerWidth < 500 ? "500px" : "800px"}
    >
      {getInterestedArtists()}
    </div>
  );
};

export default connector(ProposalInterestedArtistModal);
