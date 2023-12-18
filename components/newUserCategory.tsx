import { RightCircleFilled } from "@ant-design/icons";
import { Button, Form, message, Select } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { User } from "types/model";
import { AppState } from "types/states";
import * as actions from "../state/action";
import EditSocialProspectus from "./editSocialProspectus";
import Loader from "./loader";
// import SubmitImg from 'public/images/submit.png';
// https://www.npmjs.com/package/country-state-city

const layout = {
  labelCol: {
    span: 20,
  },
  wrapperCol: {
    span: 20,
  },
};
/* eslint-disable no-template-curly-in-string */

/* const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    }; */

const { Option } = Select;

const mapStateToProps = (state: AppState) => {
  return {
    publishedCategories: state.category.publishedCategories,
    user: state.user.user,
    isFetchingUser: state.user.isFetchingUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setNewUser: (newUser: boolean) => dispatch(actions.setNewUser(newUser)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  postArtistArt: (data: any) => dispatch(actions.updateArtistArt(data)),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(actions.updateArtistPreference(key, value)),
  updateArtistProfile: (user: any) =>
    dispatch(actions.updateArtistProfile(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  handleNext: () => void;
} & ConnectedProps<typeof connector>;

const NewUserCategory = ({
  user,
  isFetchingUser,
  publishedCategories,
  handleNext,
  postArtistArt,
  getAllCategories,
  updateArtistPreference,
}: Props) => {
  const [selectedCategories, setSelectedCategories] = useState("");
  const windowWidth = 1000;

  useEffect(() => {
    if (user && !user.new_user) {
      handleNext();
      return;
    }
    if (publishedCategories.length === 0) {
      getAllCategories();
    }
  }, []);

  function handleChange(value) {
    setSelectedCategories(value);
  }

  const handleSubmit = () => {
    if (selectedCategories.length === 0) {
      message.error("You need to select atleast one art style.");
      return;
    }
    let dataToSend = {
      initial: user.new_user,
      artNames: selectedCategories,
    };

    postArtistArt(dataToSend);
    updateArtistPreference("upForCollaboration", true);
    handleNext();
  };

  const [form] = Form.useForm();
  const currentDate = moment(new Date());

  const getErrorMessage = () => {
    if (selectedCategories.length === 0) {
      return "Selected art categories cannot be blank";
    }
    return "";
  };

  if (user === undefined || user.artist_id === undefined || isFetchingUser) {
    return <Loader />
  }

  return (
    <div className="padding20">
      <div className="newUser__textContainer">
        <h1 className="common-h1-style">You are almost there,{" "} {user.first_name} </h1>
        <p className="common-p-style">
          Add just a little more details about you so that we can recommend most suitable collaborators to you.
        </p>
      </div>
      <div className="mt32 newUser_imageFormContainer">
        <p className="common-p-style">Add the skills which describes you the best. Whether you excel in visual arts, music production, writing, or any other creative discipline, 
        showcasing your key skills will give fellow artists a clearer understanding of your unique talents</p>
        <Form
          {...layout}
          form={form}
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="art"
            label="Skills"
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
              className="common-text-style"
              placeholder="select atleast one art style"
              onChange={(value) => {
                if (value?.length > 5) {
                  value.pop();
                  message.error("You can select maximum 5 art styles");
                } else {
                  handleChange(value);
                }
              }}
              optionLabelProp="label"
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
          </Form.Item>
          <p className="mt32 common-p-style">
            To enhance your presence on Wondor and spark interest among fellow artists, add your social accounts which have your work samples - be it instagram, youtube, spotify, or any other website. 
            Let your work speak for itself and ignite the excitement for potential collaborations.
          </p>
          <div className="newUser__basicProfileCard">
            <EditSocialProspectus />
          </div>
          <Form.Item>
            <div className="mt32">
              <Button
                type="primary"
                onClick={() => {
                  const err_msg = getErrorMessage();
                  if (err_msg === "") {
                    handleSubmit();
                  } else {
                    message.error(err_msg);
                  }
                }}
              >
                {"Let's collaborate"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connector(NewUserCategory);
