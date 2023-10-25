import { Form, Button, Input, Select, Switch, Tooltip, message } from "antd";
import {
    InfoCircleOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import { ProposalData } from "types/model/proposal";

const mapStateToProps = (state: AppState) => ({
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    onCancel: () => void;
    isViewMode: boolean
    proposalDetails: ProposalData
} & ConnectedProps<typeof connector>;

const CreateProposalModal = ({
    onCancel,
    isViewMode,
    proposalDetails,
    isUpdatingSocialProspectus,
}: Props) => {
    const [showModal, setViewModal] = useState(isViewMode);

    const newProposalData: ProposalData = {
        artistId: proposalDetails.artistId,
        title: proposalDetails.title,
        description: proposalDetails.description,
    };

    const [proposalData, setProposalData] = useState<ProposalData>(newProposalData);

    const saveProposal = () => {
        let obj = {
            "title": proposalData.title,
            "theme": proposalData.description,
        }
        console.log(obj);
    };

    const hideProspectusEntryModal = (isUpdatingSocialProspectus) => {
        setViewModal(isUpdatingSocialProspectus);
    }

    return (
        <Modal
            closable
            onCancel={onCancel}
            className="sendSocialProspectus__modal"
            visible={showModal}
            footer={null}
        >
            <div className="sendSocialProspectus__container">
                <h2 className="f-20 text-center">Create Proposal.</h2>
                <Form
                    className="settings__basicProfileForm"
                    layout="horizontal"
                    onFinish={saveProposal}
                >
                    <Form.Item
                        label="Title"
                        rules={[{
                            required: true,
                            type: "string"
                        }]}
                    >
                        <Input
                            value={proposalData.title}
                            onChange={(e) => {
                                setProposalData((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            value={proposalData.description}
                            maxLength={1000}
                            showCount
                            onChange={(e) => {
                                setProposalData((prevState) => ({
                                    ...prevState,
                                    description: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="settings__basicProfileSubmitContainer">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isUpdatingSocialProspectus}
                                onClick={() => {
                                    hideProspectusEntryModal(isUpdatingSocialProspectus)
                                }}
                            >
                                {isUpdatingSocialProspectus ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default connector(CreateProposalModal);
