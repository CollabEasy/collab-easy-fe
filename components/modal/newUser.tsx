import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { RightCircleFilled } from "@ant-design/icons";
import { Form, Switch, Modal, Button, Select, message, Input } from "antd";
import Image from "next/image";
import landingPageImg from "public/images/profile.png";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import * as actions from "../../state/action";
import { User } from "types/model";
import { COUNTRIES } from "constants/constants";
import { GetCountryByName, GetCountryCodeFromName } from "helpers/artistSettingPageHelper";
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  setNewUser: (newUser: boolean) => dispatch(actions.setNewUser(newUser)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  postArtistArt: (data: any) => dispatch(actions.updateArtistArt(data)),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(actions.updateArtistPreference(key, value)),
  updateArtistProfile: (user: any) => dispatch(actions.updateArtistProfile(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  visible: boolean;
  handleNext: () => void;
} & ConnectedProps<typeof connector>;

const NewUser = ({
  user,
  visible,
  publishedCategories,
  handleNext,
  setNewUser,
  postArtistArt,
  getAllCategories,
  updateArtistPreference,
  updateArtistProfile,
}: Props) => {
  const [userDataCached, setUserDataCached] = useState<User>(user);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [collaborationCheck, setCollaborationCheck] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCountryCode, setUserCountryCode] = useState<string>("");
  const [userStateCode, setUserStateCode] = useState<string>("");
  const [showUserCity, setShowCity] = useState<boolean>(false);
  const windowWidth = 1000;

  useEffect(() => {
    if (user && !user.new_user) {
      // setVisibility(false);
      handleNext();
    }
  }, [user]);

  const onFinish = (values: any) => {
    alert(JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  const getModalWidth = (): number => {
    const width = window.innerWidth;
    if (width < 680) return 450;
    return 900;
  };

  useEffect(() => {
    if (publishedCategories.length === 0) getAllCategories();
  }, [publishedCategories.length, getAllCategories]);

  useEffect(() => {
    if (user?.first_name) {
      let name = `${user?.first_name}`;
      setUserName(name);
    }
    if (user?.country) {
      let country = GetCountryByName(user.country);
      setUserCountryCode(country["Iso2"]);
      // if (user?.state) {
      //   let states = State.getStatesOfCountry(userCountryCode);
      //   states.forEach((state) => {
      //     if (state["name"] === user.state) {
      //       setUserStateCode(state["isoCode"]);
      //     }
      //   });
      // }
    }
  }, [user]);

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
    updateArtistPreference("upForCollaboration", collaborationCheck);
    setNewUser(false);
    updateArtistProfile(userDataCached);
    handleNext();
  };

  const onChange = (val) => {
    setCollaborationCheck(val);
  };

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      closable={false}
      footer={null}
      width={windowWidth > 680 ? 1100 : 450}
      bodyStyle={{ padding: 0 }}
    >
      <div className="container">
        <div className="left-image">
          <Image src={landingPageImg} alt="Profile left" layout="fill" />
        </div>
        <div className="profile-form">
          <div className="profile-title">
            <h3 className="common-h3-style">Welcome aboard, {userName}</h3>
          </div>
          <p className="common-p-style">
            You are just one step away from collaborating with fellow artists.
            Let’s gather some information about you first.
          </p>
          <Form
            {...layout}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
          >
            <Form.Item label="Country">
              <Select
                showSearch
                value={userDataCached ? userDataCached.country : ""}
                onChange={(e) => {
                  setUserDataCached((prevState) => ({
                    ...prevState,
                    country: e,
                  }));
                  setUserCountryCode(GetCountryCodeFromName(e));
                  setShowCity(false);
                }}
              >
                {COUNTRIES.map((country) => (
                  <Select.Option key={country.Iso2} value={country.Name}>
                    {country.Unicode} {country.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="State">
                <Input
                    value={userDataCached ? userDataCached.state : ""}
                    onChange={(e) => {
                        setUserDataCached((prevState) => ({
                            ...prevState,
                            state: e.target.value,
                        }));
                    }}
                />
            </Form.Item>
            <Form.Item label="City">
                <Input
                    value={userDataCached ? userDataCached.city : ""}
                    onChange={(e) => {
                        setUserDataCached((prevState) => ({
                            ...prevState,
                            city: e.target.value,
                        }));
                    }}
                />
            </Form.Item>
            {/* <Form.Item label="State">
              <Select
                showSearch
                value={userDataCached ? userDataCached.state : ""}
                onChange={(e) => {
                  setUserDataCached((prevState) => ({
                    ...prevState,
                    state: State.getStateByCodeAndCountry(e, userCountryCode).name,
                  }));
                  setUserStateCode(e);
                  if (City.getCitiesOfState(userCountryCode, e).length !== 0) {
                    setShowCity(true);
                  }
                }}
              >
                {State.getStatesOfCountry(userCountryCode).map((state) => (
                  <Select.Option key={state.name} value={state.isoCode}>
                    {state.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {showUserCity && <Form.Item label="City">
              <Select
                showSearch
                value={userDataCached ? userDataCached.city : ""}
                onChange={(e) => {
                  setUserDataCached((prevState) => ({
                    ...prevState,
                    city: e,
                  }));
                }}
              >
                {City.getCitiesOfState(userCountryCode, userStateCode).map((city) => (
                  <Select.Option key={city.name} value={city.name}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            } */}
            <Form.Item
              name="art"
              label="Art Styles"
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
            <Form.Item name="collab" label="You up for collabaration">
              <Switch onChange={onChange} checked={collaborationCheck} />
            </Form.Item>
            <Form.Item noStyle={true}>
              <div className="submit-container">
                <p className="submit-text common-p-style">Let’s collaborate</p>
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
  );
};

export default connector(NewUser);
