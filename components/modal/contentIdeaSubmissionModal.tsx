import { Form, Button, Input, Select, Switch, Tooltip, DatePicker, message } from "antd";
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
import { NewInspoTheme } from "types/model/newInspoTheme";
import { CreateNewInspoThemeEmailContent } from "helpers/inspirationHubHelper";

const { Option } = Select;

const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.user.isLoggedIn,
    isUpdatingContest: state.contest?.isUpdatingContest,
    publishedCategories: state.category.publishedCategories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllCategories: () => dispatch(action.getAllCategories()),
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
    isLoggedIn,
    publishedCategories,
    getAllCategories,
    sendEmail,
}: Props) => {

    const newInspoTheme: NewInspoTheme = {
        title: "",
        description: "",
        categories: [],
        full_name: "",
        email: ""
    };

    const [showModal, setViewModal] = useState(isViewMode);
    const [newInspoThemeData, setNewInspoTheme] = useState<NewInspoTheme>(newInspoTheme);

    useEffect(() => {
        if (publishedCategories.length === 0) {
            getAllCategories();
        }
    }, []);

    const saveNewInspoThemeEntry = () => {
        let emailContent = CreateNewInspoThemeEmailContent(newInspoThemeData);
        console.log(emailContent);
        sendEmail(emailContent);
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
                    layout="vertical"
                    onFinish={saveNewInspoThemeEntry}
                >
                    <Form.Item label="Title">
                        <Input.TextArea
                            value={newInspoThemeData.title}
                            placeholder="Enter your theme, idea, or topic"
                            maxLength={100}
                            showCount
                            onChange={(e) => {
                                setNewInspoTheme((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            value={newInspoThemeData.description}
                            placeholder="Tell us a little more about this idea, theme of yours. We will share it on our website and make it accessible to other artists."
                            maxLength={1000}
                            showCount
                            onChange={(e) => {
                                setNewInspoTheme((prevState) => ({
                                    ...prevState,
                                    description: e.target.value,
                                }));
                            }}
                        />
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
                                    setNewInspoTheme((prevState) => ({
                                        ...prevState,
                                        categories: value,
                                    }));
                                }
                            }}
                            optionLabelProp="label"
                            value={newInspoThemeData.categories}
                            defaultValue={newInspoThemeData.categories}
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
                    {!isLoggedIn && (
                        <>
                            <Form.Item label="Full Name">
                                <Input.TextArea
                                    value={newInspoThemeData.full_name}
                                    placeholder="Enter your full name"
                                    showCount
                                    onChange={(e) => {
                                        setNewInspoTheme((prevState) => ({
                                            ...prevState,
                                            full_name: e.target.value,
                                        }));
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input.TextArea
                                    value={newInspoThemeData.email}
                                    placeholder="Enter your email so that we can let you know this theme is added to our collection"
                                    showCount
                                    onChange={(e) => {
                                        setNewInspoTheme((prevState) => ({
                                            ...prevState,
                                            email: e.target.value,
                                        }));
                                    }}
                                />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item>
                        <div className="settings__basicProfileSubmitContainer">
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                    hideContentSubmissionEntryModal()
                                }}
                            >
                                Send
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default connector(ContentIdeaSubmissionModal);
