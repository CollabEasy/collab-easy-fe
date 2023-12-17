import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import "antd/dist/antd.css";
import { COUNTRIES } from "constants/constants";
import {
  GetCountryByName,
  GetCountryCodeFromName,
} from "helpers/artistSettingPageHelper";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { User } from "types/model";
import { AppState } from "types/states";
import * as actions from "../../state/action";
import ProfilePicture from "../profilePicture";

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
  updateArtistProfile: (user: any) =>
    dispatch(actions.updateArtistProfile(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  handleNext: () => void;
} & ConnectedProps<typeof connector>;

const NewUser = ({
  user,
  publishedCategories,
  handleNext,
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
    if (user && user.basic_info_complete) {
      handleNext();
      return;
    }
    if (user !== undefined) {
      setUserDataCached(user);
    }
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
  }, [user.basic_info_complete, user.first_name, user.country]);

  // useEffect(() => {
  //   if (publishedCategories.length === 0) getAllCategories();
  // }, [publishedCategories.length, getAllCategories]);

  function handleChange(value) {
    setSelectedCategories(value);
  }

  function AboveEighteen(dob) {
    return moment().diff(dob, "years") >= 18;
  }

  const [form] = Form.useForm();
  const currentDate = moment(new Date());

  const getErrorMessage = () => {
    if (userDataCached.country === null || userDataCached.country === "") {
      return "Country cannot be blank";
    }

    if (userDataCached.bio === null || userDataCached.bio === "") {
      return "Bio cannot be blank";
    }

    if (userDataCached.first_name === "" || userDataCached.last_name === "") {
      return "First or Last name cannot be blank";
    }

    if (!AboveEighteen(userDataCached.date_of_birth)) {
      return "You must be above 18 to use Wondor.";
    }
    return "";
  };

  if (user === undefined || user.artist_id === undefined) {
    return <></>
  }

  console.log("user : ", userDataCached);

  return (
    <>
      <div className="newUser__textContainer">
        <h3 className="common-h1-style">Welcome aboard, {user.first_name}</h3>
        <p className="common-p-style">
          To get you started with Wondor, let’s gather some information about
          you first.
        </p>
      </div>
      <div className="container padding20">
        <ProfilePicture isSelf={true} userProfileOpened={user} />
      </div>
      <div className="mt32 newUser_imageFormContainer">
        <Form
          {...layout}
          form={form}
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            ["first name"]: user.first_name,
            ["last name"]: user.last_name,
            ["date of birth"]: moment(user.date_of_birth
              ? user.date_of_birth
              : currentDate),
            ["bio"]: user ? user.bio : "",
            ["email"]: user ? user.email : "",
            ["country"]: user ? user.country : "",
          }}
        >
          <Row gutter={16}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"first name"}
                label="First Name"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please enter First Name" }]}
              >
                <Input
                  value={userDataCached ? userDataCached.first_name : ""}
                  onChange={(e) => {
                    setUserDataCached((prevState) => ({
                      ...prevState,
                      first_name: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name="last name"
                label="Last Name"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input
                  value={userDataCached ? userDataCached.last_name : ""}
                  onChange={(e) => {
                    setUserDataCached((prevState) => ({
                      ...prevState,
                      last_name: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col sm={12} xs={24}>
              <Form.Item label="DoB" name="date of birth">
                <DatePicker
                  clearIcon={null}
                  disabledDate={(d) =>
                    !d ||
                    d.isAfter(currentDate) ||
                    currentDate >= moment().endOf("day")
                  }
                  format="DD/MM/YYYY"
                  value={moment(
                    userDataCached.date_of_birth
                      ? userDataCached.date_of_birth
                      : currentDate
                  )}
                  onChange={(e) => {
                    if (!AboveEighteen(e)) {
                      message.error("You must be above 18 to use Wondor.art!");
                    } else {
                      setUserDataCached((prevState) => ({
                        ...prevState,
                        date_of_birth: e.toDate(),
                      }));
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item label="Email" name="email">
                <Input
                  disabled
                  value={userDataCached ? userDataCached.email : ""}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col sm={8} xs={24}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: "Please enter country" }]}
              >
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
            </Col>
            <Col sm={7} xs={24}>
              <Form.Item label="State" style={{}}>
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
            </Col>
            <Col sm={8} xs={24}>
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
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="bio"
                label="Bio"
                rules={[{ required: true, message: "Please enter Bio" }]}
              >
                <Input.TextArea
                  value={userDataCached ? userDataCached.bio : ""}
                  maxLength={300}
                  showCount
                  onChange={(e) => {
                    setUserDataCached((prevState) => ({
                      ...prevState,
                      bio: e.target.value,
                    }));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                const error_message = getErrorMessage();
                if (error_message === "") {
                  updateArtistProfile(userDataCached);
                  handleNext();
                } else {
                  message.error(error_message);
                }
              }}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
        {/* <Form.Item
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
              <Form.Item noStyle={true}>
                <div className="submit-container">
                  <p className="submit-text common-p-style">
                    Let’s collaborate
                  </p>
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
            </Form> */}
      </div>
    </>
  );
};

export default connector(NewUser);
