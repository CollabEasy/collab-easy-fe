import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { RightCircleFilled } from "@ant-design/icons";
import { Form, Switch, Modal, Button, Select } from "antd";
import Image from "next/image";
import landingPageImg from "public/images/profile.png";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import * as actions from "../state/action";
// import SubmitImg from 'public/images/submit.png';

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
    artistCategories: state.artist.artistCategories,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArtistCategories: () => dispatch(actions.fetchArtistCategoriesData()),
  postArtistArt: (data: any) => dispatch(actions.updateArtistArt(data)),
  updateArtistPreference: (key: string, value: any) => dispatch(actions.updateArtistPreference(key, value)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const NewUserModal = ({
  user,
  artistCategories,
  postArtistArt,
  getArtistCategories,
  updateArtistPreference,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [collaborationCheck, setCollaborationCheck] = useState(false);
  const [userName, setUserName] = useState("");
  const windowWidth = 1000;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(true);
  };

  const onFinish = (values: any) => {
    alert(JSON.stringify(values));
    handleCancel();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getModalWidth = (): number => {
    const width = window.innerWidth;
    if (width < 680) return 450;
    return 900;
  };

  useEffect(() => {
    getArtistCategories();
  }, [getArtistCategories]);

  useEffect(() => {
    if (artistCategories.status === "success") {
      setCategoriesArr(artistCategories.data);
    }
  }, [artistCategories]);

  useEffect(() => {
    if (user?.first_name) {
      let name = `${user?.first_name} ${user?.last_name}`;
      setUserName(name);
    }
  }, [user]);

  function handleChange(value) {
    setSelectedCategories(value);
  }

  const handleSubmit = () => {
    let dataToSend = {
      initial: user.new_user,
      artNames: selectedCategories,
    };

    postArtistArt(dataToSend);
    updateArtistPreference("upForCollaboration", collaborationCheck);
  };

  const onChange = (val) => {
    setCollaborationCheck(val);
  };

  return (
    <>
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
        width={windowWidth > 680 ? 900 : 450}
        bodyStyle={{ padding: 0 }}
      >
        <div className="container">
          <div className="left-image">
            <Image src={landingPageImg} alt="Profile left" layout="fill" />
          </div>
          <div className="profile-form">
            <div className="profile-title">
              <h1>Welcome aborad,</h1>
              <h1>{userName}</h1>
            </div>
            <p>
              You are just one step away from collaborating with the artists on
              your next greatest work. Let’s gather some information about you
              first.
            </p>
            <Form
              {...layout}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item
                name="art"
                label="Your art style includes"
                rules={[
                  {
                    validator(_, value) {
                      if (value === undefined) {
                        return Promise.reject();
                      }
                      if (value.length > 3) {
                        return Promise.reject(
                          "You can select maximum 3 art styles"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select atleast one art style"
                  onChange={handleChange}
                  optionLabelProp="label"
                >
                  {categoriesArr.length > 0 &&
                    categoriesArr.map((category, index) => (
                      <Option value={category} label={category} key={index}>
                        <div className="demo-option-label-item">{category}</div>
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name="collab" label="You up for collabaration">
                <Switch onChange={onChange} checked={collaborationCheck} />
              </Form.Item>
              <Form.Item noStyle={true}>
                <div className="submit-container">
                  <p className="submit-text">Let’s collaborate</p>
                  <Button
                    type="text"
                    onClick={handleSubmit}
                    shape="circle"
                    icon={
                      <RightCircleFilled
                        style={{ color: "black", fontSize: 30 }}
                      />
                    }
                  ></Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connector(NewUserModal);
