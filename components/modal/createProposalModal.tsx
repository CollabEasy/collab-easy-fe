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
import LoginModal from "./loginModal";
import NewUserModal from "./newUserModal";
import NotAuthorised from "../error/notAuthorised";

const mapStateToProps = (state: AppState) => ({
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
    loginModalDetails: state.home.loginModalDetails,
    artistListData: state.home.artistListDetails,
    publishedCategories: state.category.publishedCategories,
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllCategories: () => dispatch(action.getAllCategories()),
    createProposal: (data: any) => dispatch(action.addProposal(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    onCancel: () => void;
    isViewMode: boolean
    proposalDetails: ProposalData
} & ConnectedProps<typeof connector>;

const CreateProposalModal = ({
    user,
    isLoggedIn,
    isViewMode,
    loginModalDetails,
    artistListData,
    proposalDetails,
    isUpdatingSocialProspectus,
    publishedCategories,
    onCancel,
    getAllCategories,
    createProposal,
}: Props) => {
    const { Option } = Select;
    const [showModal, setViewModal] = useState(isViewMode);

    const newProposalData: ProposalData = {
        artistId: proposalDetails.artistId,
        title: proposalDetails.title,
        description: proposalDetails.description,
        skills: proposalDetails.skills,
        status: proposalDetails.status,
    };

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [proposalData, setProposalData] = useState<ProposalData>(newProposalData);

    useEffect(() => {
        if (publishedCategories.length === 0) {
            getAllCategories();
        }
    }, []);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [user, artistListData]);

    const saveProposal = () => {
        let obj = {
            "proposal_title": proposalData.title,
            "proposal_description": proposalData.description,
            "category_ids": proposalData.skills,
            "collab_type": proposalData.collabType,
            "proposal_status": "ACTIVE"
        }
        createProposal(obj);
    };

    const hideProspectusEntryModal = (isUpdatingSocialProspectus) => {
        setViewModal(isUpdatingSocialProspectus);
    }

    return (
        <>
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }
            <Modal
                closable
                onCancel={onCancel}
                className="sendSocialProspectus__modal"
                visible={showModal}
                footer={null}
            >
                {!isLoggedIn ? (
                    <NotAuthorised
                        error={"Please login to create proposal."}
                    />
                ) : (
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
                                <Input.TextArea
                                    maxLength={250}
                                    showCount
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
                                    value={proposalData ? proposalData.collabType : "VIRTUAL"}
                                    onChange={(e) => {
                                        setProposalData((prevState) => ({
                                            ...prevState,
                                            collabType: e,
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
                                                value={category.id}
                                                label={category.artName}
                                                key={category.id}
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
                )}
            </Modal>
        </>
    );
};

export default connector(CreateProposalModal);
