import Modal from "antd/lib/modal/Modal";
import { Table, Button } from "antd";
import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import { useRoutesContext } from "components/routeContext";

const mapStateToProps = (state: AppState) => ({
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
    showProposalInterestedArtistModal: state.proposalInterest.showProposalInterestedArtistModal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setShowProposalInterestedArtistModal: (show: boolean) => dispatch(action.setShowProposalInterestedArtistModal(show)),
    acceptProposalInterest: (proposalId: string, data: any) => dispatch(action.acceptProposalInterest(proposalId, data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    proposalId: string
    interestedArtists: any[]
} & ConnectedProps<typeof connector>;

const ProposalInterestedArtistModal = ({
    proposalId,
    interestedArtists,
    acceptProposalInterest,
    setShowProposalInterestedArtistModal,
}: Props) => {
    const { toArtistProfile } = useRoutesContext();
    const [showModal, setViewModal] = useState(true);


    const acceptInterestedArtist = (entry: any) => {
        let data = {
            "user": entry.artistId,
        }
        acceptProposalInterest(proposalId, data);
    };
    const rejectInterestedArtist = (entry: any) => {
        console.log("reject proposal");
    };

    const columns = [
        {
            title: "Artist",
            key: "artist",
            dataIndex: "artist",
            // eslint-disable-next-line react/display-name
            render: (text: string, record: any) => (
                <a
                    href={toArtistProfile(record.slug).as} target="_blank" rel="noreferrer"
                >
                    {record.artist}
                </a>
            )
        },
        { title: "Message", dataIndex: "message", key: "message" },
        {
            title: "Action",
            key: "key",
            dataIndex: "key",
            // eslint-disable-next-line react/display-name
            render: (_text: any, record: any) => (
                <>
                    {record.accepted ? (
                        <>
                            No action required, you have already accepted
                        </>
                    ) : (
                        <>
                            <Button type="primary" onClick={() => acceptInterestedArtist(record)}>
                                Accept
                            </Button>
                            <Button onClick={() => rejectInterestedArtist(record)}>Reject</Button>
                        </>
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
                            <p><b>Artist: </b>
                                <a href={toArtistProfile(record.slug).as} target="_blank" rel="noreferrer">
                                    {artist}
                                </a>
                            </p>
                        </span>
                        <span>
                            <p><b>Message: </b> {message}</p>
                        </span>
                        {record.accepted ? (
                            <>No action required, you have already accepted</>
                        ) : (
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => acceptInterestedArtist(record)}
                                >
                                    Accept
                                </Button>
                                <Button onClick={() => rejectInterestedArtist(record)}>Reject</Button>
                            </>
                        )}
                    </div>
                )
            }
        }
    ];

    const getInterestedArtists = () => {
        let updatedData = [];
        interestedArtists.forEach((element) => {
            let obj = {
                artistId: element.userId,
                artist: element.askedByFirstName + " " + element.askedByLastName,
                slug: element.askedBySlug,
                accepted: element.accepted,
                message: element.message.length === 0 ? "I'm interested" : element.message,
            };
            updatedData.push(obj);
        });
        return <Table columns={window.innerWidth < 500 ? deviceColumns : columns} dataSource={updatedData} />;
    };

    const handleCancel = () => {
        setShowProposalInterestedArtistModal(false);
        setViewModal(false);
    };

    return (
        <Modal
            closable
            onCancel={handleCancel}
            visible={showModal}
            footer={null}
            width={window.innerWidth < 500 ? "500px" : "800px"}
        >
            {getInterestedArtists()}
        </Modal>
    );
};

export default connector(ProposalInterestedArtistModal);
