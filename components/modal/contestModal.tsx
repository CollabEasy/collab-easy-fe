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
import { ContestEntry } from "types/model/contest";

const mapStateToProps = (state: AppState) => ({
    isUpdatingContest: state.contest?.isUpdatingContest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addContest: (data: any) => dispatch(action.addContest(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    onCancel: () => void;
    isViewMode: boolean
    contestEntry: ContestEntry
} & ConnectedProps<typeof connector>;

const ContestModal = ({
    onCancel,
    isViewMode,
    contestEntry,
    isUpdatingContest,
    addContest,
}: Props) => {
    const currentDate = moment(new Date());
    const tomorrow = currentDate.clone().add(1, "days");
    const weekLater = currentDate.clone().add(7, "days");
    const [showModal, setViewModal] = useState(isViewMode);

    const newContestEntry: ContestEntry = {
        slug: contestEntry.slug,
        title: contestEntry.title,
        description: contestEntry.description,
        startDate: contestEntry.startDate,
        endDate: contestEntry.endDate,
    };

    const [newContestData, setNewContestData] = useState<ContestEntry>(newContestEntry);

    const saveContestEntry = () => {
        let obj = {
            "contestSlug": newContestData.slug,
            "title": newContestData.title,
            "description": newContestData.description,
            "startDate": newContestData.startDate,
            "endDate": newContestData.endDate,
        }
        addContest(obj);
    };

    const hideContestEntryModal = (isUpdatingContest) => {
        setViewModal(isUpdatingContest);
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
                <h2 className="f-20 text-center">Enter the details.</h2>
                <Form
                    className="settings__basicProfileForm"
                    layout="horizontal"
                    onFinish={saveContestEntry}
                >
                    <Form.Item label="Slug"
                        tooltip={{
                            title: "NOTE: make sure the slug is a single word (ie. no space)",
                            icon: <InfoCircleOutlined />
                        }}
                    >
                        <Input
                            value={newContestData.slug}
                            onChange={(e) => {
                                setNewContestData((prevState) => ({
                                    ...prevState,
                                    slug: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
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
                    <Form.Item label="End date">
                        <DatePicker
                            clearIcon={null}
                            disabledDate={(d) => d.isSameOrBefore(currentDate)}
                            format="DD/MM/YYYY"
                            value={moment(
                                newContestData.startDate
                                    ? newContestData.endDate
                                    : weekLater
                            )}
                            onChange={(e) => {
                                setNewContestData((prevState) => ({
                                    ...prevState,
                                    endDate: e.toDate(),
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
                                    hideContestEntryModal(isUpdatingContest)
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

export default connector(ContestModal);
