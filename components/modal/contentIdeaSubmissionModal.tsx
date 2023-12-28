import { Form, Button, Input, Select, Switch, Tooltip, DatePicker } from "antd";
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

const mapStateToProps = (state: AppState) => ({
    isUpdatingContest: state.contest?.isUpdatingContest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    sendEmail: (content: string) => dispatch(action.sendEmailToSlug(
        "rahul-gupta-1",
        "Request for adding a new theme.",
        content
      )
    ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    isViewMode
    onCancel: () => void;
} & ConnectedProps<typeof connector>;

const ContentIdeaSubmissionModal = ({
    onCancel,
    isViewMode,
    sendEmail,
}: Props) => {
    const currentDate = moment(new Date());
    const [showModal, setViewModal] = useState(isViewMode);
    const newContestEntry = {
        title: "",
        description: "",
        endDate: contestEntry.endDate,
    };

    const [newContestData, setNewContestData] = useState<ContestEntry>(newContestEntry);


    const saveContestEntry = () => {
        sendEmail("obj");
    };

    const hideContentSubmissionEntryModal = () => {
        setViewModal(false);
    }

    return (
        <Modal
            closable
            onCancel={onCancel}
            visible={showModal}
            footer={null}
        >
            <div>
                <h2 className="f-20 text-center">Enter the details.</h2>
                <Form
                    layout="horizontal"
                    onFinish={saveContestEntry}
                >
                    <Form.Item label="Title">
                        <Input.TextArea
                            value={newContestData.title}
                            maxLength={100}
                            showCount
                            onChange={(e) => {
                                setNewContestData((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            value={newContestData.description}
                            maxLength={1000}
                            showCount
                            onChange={(e) => {
                                setNewContestData((prevState) => ({
                                    ...prevState,
                                    description: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Start date">
                        <DatePicker
                            clearIcon={null}
                            disabledDate={(d) => d.isSameOrBefore(currentDate)}
                            format="DD/MM/YYYY"
                            value={moment(
                                newContestData.startDate
                                    ? newContestData.startDate
                                    : tomorrow
                            )}
                            onChange={(e) => {
                                setNewContestData((prevState) => ({
                                    ...prevState,
                                    startDate: e.toDate(),
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="settings__basicProfileSubmitContainer">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isUpdatingContest}
                                onClick={() => {
                                    hideContentSubmissionEntryModal(isUpdatingContest)
                                }}
                            >
                                {isUpdatingContest ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default connector(ContentIdeaSubmissionModal);
