import React, { useEffect, useState } from "react";
import { Button, Form, Select, Switch, message } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
    getAllCategories,
    fetchArtistSkills,
    fetchArtistPreferences,
    updateArtistArt,
    updateArtistPreference,
    setShowCategoryModal,
} from "state/action";
import { User } from "types/model";
import { CategoryEntry } from "types/states/category";
import CategoryModal from "./modal/categoryModal";

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user.user,
        preferences: state.user.preferences,
        publishedCategories: state.category.publishedCategories,
        isUpdatingPrefs: state.user.isUpdatingPrefs,
        isUpdatingProfile: state.user.isUpdatingProfile,
        showCategoryModal: state.category.showCategoryModal,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories()),

    fetchArtistPreferences: () => dispatch(fetchArtistPreferences()),

    fetchArtistSkills: () => dispatch(fetchArtistSkills("")),

    updateArtistPreference: (key: string, value: any) =>
        dispatch(updateArtistPreference(key, value)),

    setShowCategoryModal: (show: boolean) =>
        dispatch(setShowCategoryModal(show)),

    updateArtistSkills: (data: any) => dispatch(updateArtistArt(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const EditPreferences = ({
    user,
    preferences,
    publishedCategories,
    isUpdatingPrefs,
    isUpdatingProfile,
    showCategoryModal,
    getAllCategories,
    fetchArtistSkills,
    fetchArtistPreferences,
    updateArtistPreference,
    setShowCategoryModal,
    updateArtistSkills,
}: Props) => {

    const emptyNewCategoryDetails: CategoryEntry = {
        slug: "",
        artName: "",
        description: "",
        id: 0,
        approved: false
    };

    const { Option } = Select;

    useEffect(() => {
        if (publishedCategories.length === 0) {
            getAllCategories();
        }
        fetchArtistPreferences();
        fetchArtistSkills();
    }, []);

    useEffect(() => {
        if (
            preferences["upForCollaboration"] === "true" ||
            preferences["upForCollaboration"] === true
        )
            setUpForCollaboration(true);

        setSelectedCategories(user.skills);
    }, [preferences, user]);

    const [upForCollaboration, setUpForCollaboration] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [componentSize, setComponentSize] = useState<SizeType | "default">(
        "default"
    );

    const [newCategoryDetails, setNewCategoryDetails] = useState(
        emptyNewCategoryDetails

    );

    const ShowNewCategoryModal = () => {
        setNewCategoryDetails(emptyNewCategoryDetails);
        setShowCategoryModal(true);
    };

    const HideCatgeoryEntryModal = () => {
        setShowCategoryModal(false);
    };

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const saveArtistSkills = () => {
        if (selectedCategories.length === 0) {
            message.error("You need to select atleast one art style.");
        } else {
            updateArtistSkills({ artNames: selectedCategories });
        }
    };

    const [isViewMode, setViewMode] = useState(false);

    function handleChange(value: string[]) {
        if (value.length <= 5) {
            setSelectedCategories(value);
        }
    }

    return (
        <>
            <div>
                <Form
                    className="settings__basicProfileForm"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                >
                    <Form.Item
                        label="Available to collab"
                        valuePropName="checked"
                    >
                        <Switch
                            onChange={() => {
                                updateArtistPreference(
                                    "upForCollaboration",
                                    !upForCollaboration
                                );
                                setUpForCollaboration(!upForCollaboration);
                            }}
                            loading={isUpdatingPrefs === "upForCollaboration"}
                            checked={upForCollaboration}
                            checkedChildren="active"
                            unCheckedChildren="inactive"
                        />
                    </Form.Item>

                    <Form.Item
                        // name="art"
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
                                if (value?.length > 5) {
                                    value.pop();
                                    message.error("You can select maximum 5 art styles");
                                } else {
                                    handleChange(value);
                                }
                            }}
                            optionLabelProp="label"
                            value={selectedCategories}
                            defaultValue={user.skills}
                        >
                            {publishedCategories.length > 0 &&
                                publishedCategories.map((category, index) => (
                                    <Option
                                        value={category.artName}
                                        label={category.artName}
                                        key={category.artName}
                                    >
                                        <div className="demo-option-label-item">
                                            {category.artName}
                                        </div>
                                    </Option>
                                ))}
                        </Select>
                        <div style={{ height: 'auto', marginTop: '20px' }}>
                            Unable to see the art category in the list? Click <a href="#" onClick={ShowNewCategoryModal}>here</a> to add a category.
                            After a thorough review, we will include it.
                        </div>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <div className="settings__basicProfileSubmitContainer">
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={saveArtistSkills}
                                loading={isUpdatingProfile}
                            >
                                {isUpdatingProfile ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div>
                {showCategoryModal && (
                    <CategoryModal
                        onCancel={() => {
                            HideCatgeoryEntryModal();
                        }}
                        isViewMode={true}
                        categoryEntry={newCategoryDetails}
                    />
                )}
            </div>
        </>
    );
};

export default connector(EditPreferences);
