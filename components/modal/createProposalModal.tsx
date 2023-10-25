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
import { COLLABTYPES } from "constants/constants";

const mapStateToProps = (state: AppState) => ({
    publishedCategories: state.category.publishedCategories,
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllCategories: () => dispatch(action.getAllCategories()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    onCancel: () => void;
    isViewMode: boolean
    proposalDetails: ProposalData
} & ConnectedProps<typeof connector>;

const CreateProposalModal = ({
    isViewMode,
    proposalDetails,
    isUpdatingSocialProspectus,
    publishedCategories,
    onCancel,
    getAllCategories,
}: Props) => {
    const { Option } = Select;
    const [showModal, setViewModal] = useState(isViewMode);

    const newProposalData: ProposalData = {
        artistId: proposalDetails.artistId,
        title: proposalDetails.title,
        description: proposalDetails.description,
    };

    const [proposalData, setProposalData] = useState<ProposalData>(newProposalData);

    useEffect(() => {
        if (publishedCategories.length === 0) {
            getAllCategories();
        }
    }, []);

    const saveProposal = () => {
        let obj = {
            "title": proposalData.title,
            "theme": proposalData.description,
            "skills": proposalData.skills,
            "collab_type": proposalData.collab_type,
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
                    <Form.Item label="Collab Type">
                        <Select
                            value={proposalData.collab_type}
                            onChange={(e) => {
                                setProposalData((prevState) => ({
                                    ...prevState,
                                    collab_type: e,
                                }));
                            }}
                        >
                            {COLLABTYPES.map((collab_type) => (
                                <Select.Option key={collab_type} value={collab_type}>
                                    {collab_type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Art styles"
                        rules={[
                            {
                                validator(_, value) {
                                    if (value === undefined) {
                                        return Promise.reject();
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Select atleast one art style"
                            onChange={(value) => {
                                if (value?.length > 3) {
                                    value.pop();
                                    message.error("You can select maximum 3 art styles");
                                } else {
                                    setProposalData((prevState) => ({
                                        ...prevState,
                                        skills: value,
                                    }));
                                }
                            }}
                            optionLabelProp="label"
                            value={proposalData.skills}
                            defaultValue={proposalData.skills}
                        >
                            {publishedCategories.length > 0 &&
                                publishedCategories.map((category, index) => (
                                    <Option
                                        value={category.artName}
                                        label={category.artName}
                                        key={category.artName}
                                    >
                                        <div className="demo-option-label-item">{category.artName}</div>
                                    </Option>
                                ))}
                        </Select>
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
