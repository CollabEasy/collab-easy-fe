import { Badge, BadgeProps, Calendar, Form, message, Select } from "antd";
import { ConnectedProps, connect } from "react-redux";
import { Dispatch } from "redux";
import type { Dayjs } from "dayjs";
import { AppState } from "state";
import * as action from "../state/action";
import { Ref, useEffect } from "react";
import { useState } from "react";

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const publishedCategories = state.category.publishedCategories;
  const isUpdatingProfile = state.user.isUpdatingProfile;
  return { user, publishedCategories, isUpdatingProfile };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllCategories: () => dispatch(action.getAllCategories()),
  fetchArtistSkills: () => dispatch(action.fetchArtistSkills("")),
  updateArtistSkills: (data: any) => dispatch(action.updateArtistArt(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    saveArtistTrigger: boolean,
    setSaveArtistTrigger: (value: boolean) => void;
    setIsUpdating?: (value: boolean) => void;
} & ConnectedProps<typeof connector>;

const CategorySelector = ({
  saveArtistTrigger,
  user,
  publishedCategories,
  isUpdatingProfile,
  getAllCategories,
  fetchArtistSkills,
  updateArtistSkills,
  setSaveArtistTrigger,
  setIsUpdating,
}: Props) => {
  const { Option } = Select;
  const [selectedCategoriesCached, setSelectedCategoriesCached] = useState(user.skills);
  
  if (setIsUpdating !== undefined) {
      setIsUpdating(isUpdatingProfile);
  }

  useEffect(() => {
    if (!user?.skills || user?.skills.length === 0) {
        fetchArtistSkills();
    }
    
    if (publishedCategories.length === 0) {
      getAllCategories();
    }
  }, []);

  useEffect(() => {
    setSelectedCategoriesCached(user.skills);
  }, [user]);

  useEffect(() => {
    if (saveArtistTrigger) {
      saveArtistSkills();
      if (!isUpdatingProfile) {
          setSaveArtistTrigger(false);
      }
    }
  }, [saveArtistTrigger])

  function handleChange(value: string[]) {
    if (value.length <= 5) {
      setSelectedCategoriesCached(value);
    }
  }

  const saveArtistSkills = () => {
    if (selectedCategoriesCached.length === 0) {
      message.error("You need to select atleast one art style.");
    } else {
      updateArtistSkills({ artNames: selectedCategoriesCached });
    }
  };

  return (
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
        value={selectedCategoriesCached}
        defaultValue={selectedCategoriesCached}
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
  );
};
export default connector(CategorySelector);
