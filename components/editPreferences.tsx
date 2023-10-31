import React, { useEffect, useRef, useState } from "react";

import { Button, Form, Select, Switch, message } from "antd";

import { AppState } from "state";

import { connect, ConnectedProps } from "react-redux";

import { Dispatch } from "redux";

import { SizeType } from "antd/lib/config-provider/SizeContext";

import {
  getAllCategories,
  fetchArtistPreferences,
  updateArtistArt,
  updateArtistPreference,
  setShowCategoryModal,
} from "state/action";

import { User } from "types/model";

import { CategoryEntry } from "types/states/category";

import CategoryModal from "./modal/categoryModal";

import CategorySelector from "./categorySelector";
import Layout from "./layout";

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    preferences: state.user.preferences,
    publishedCategories: state.category.publishedCategories,
    isUpdatingPrefs: state.user.isUpdatingPrefs,
    isUpdatingProfile: state.user.isUpdatingProfile,
    showCategoryModal: state.category.showCategoryModal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllCategories: () => dispatch(getAllCategories()),
  fetchArtistPreferences: () => dispatch(fetchArtistPreferences()),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(updateArtistPreference(key, value)),
  setShowCategoryModal: (show: boolean) => dispatch(setShowCategoryModal(show)),
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

  fetchArtistPreferences,

  updateArtistPreference,

  setShowCategoryModal,
}: Props) => {
  const emptyNewCategoryDetails: CategoryEntry = {
    slug: "",

    artName: "",

    description: "",

    id: 0,

    approved: false,
  };

  const [saveArtistTrigger, setSaveArtistTrigger] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    if (publishedCategories.length === 0) {
      getAllCategories();
    }

    fetchArtistPreferences();
  }, []);

  useEffect(() => {
    if (
      preferences["upForCollaboration"] === "true" ||
      preferences["upForCollaboration"] === true
    )
      setUpForCollaboration(true);
  }, [preferences, user]);

  const [upForCollaboration, setUpForCollaboration] = useState(false);

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

  const [isViewMode, setViewMode] = useState(false);

  return (
    <>
      <div>
        <Form
          className="settings__basicProfileForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
        >
          <Form.Item label="Available to collab" valuePropName="checked">
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

          <Form.Item>
            <CategorySelector
              saveArtistTrigger={saveArtistTrigger}
              setSaveArtistTrigger={setSaveArtistTrigger}
            />

            <div style={{ height: "auto", marginTop: "20px" }}>
              Unable to see the art category in the list? Click{" "}
              <a href="#" onClick={ShowNewCategoryModal}>
                here
              </a>{" "}
              to add a category. After a thorough review, we will include it.
            </div>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <div className="settings__basicProfileSubmitContainer">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setSaveArtistTrigger(true);
                  //   setSaveArtistTrigger(false);
                }}
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
