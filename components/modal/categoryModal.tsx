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
import { CategoryEntry } from "types/states/category";
import { IsAdmin } from "helpers/helper";

const mapStateToProps = (state: AppState) => ({
    user: state.user,
    isUpdatingCategory: state.category.isUpdatingCategory,
    showCategoryModal: state.category.showCategoryModal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCategory: (data: any) => dispatch(action.addCategory(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    onCancel: () => void;
    isViewMode: boolean
    categoryEntry: CategoryEntry
} & ConnectedProps<typeof connector>;

const CategoryModal = ({
    user,
    isViewMode,
    categoryEntry,
    isUpdatingCategory,
    showCategoryModal,
    onCancel,
    addCategory,
}: Props) => {
    const [showModal, setViewModal] = useState(isViewMode);

    const newCategoryEntry: CategoryEntry = {
        id: categoryEntry.id,
        slug: categoryEntry.slug,
        artName: categoryEntry.artName,
        description: categoryEntry.description,
        approved: categoryEntry.approved,
    };

    const [newCategoryData, setNewCategoryData] = useState<CategoryEntry>(newCategoryEntry);

    const saveNewCategory = () => {
        let obj = {
            "id": 0,
            "art_name": newCategoryData.artName,
            "slug":  newCategoryData.artName.toLowerCase().replace(/ /g,"_"),
            "description": newCategoryData.description,
            "approved": IsAdmin(user.user.email),
        }
        addCategory(obj);
    };

    const hideCategoryEntryModal = () => {
        setViewModal(false);
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
                    onFinish={saveNewCategory}
                >
                    <Form.Item label="Name">
                        <Input.TextArea
                            value={newCategoryData.artName}
                            maxLength={100}
                            showCount
                            onChange={(e) => {
                                setNewCategoryData((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            value={newCategoryData.description}
                            maxLength={100}
                            showCount
                            onChange={(e) => {
                                setNewCategoryData((prevState) => ({
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
                                loading={isUpdatingCategory}
                                onClick={() => {
                                    hideCategoryEntryModal()
                                }}
                            >
                                {isUpdatingCategory ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default connector(CategoryModal);
