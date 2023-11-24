import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Select, Input } from "antd";
import Image from "next/image";
import landingPageImg from "public/images/profile.png";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import * as actions from "../../state/action";
import { RefferalCode } from "types/model/rewards";
import { User } from "types/model";

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

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setNewUser: (newUser: boolean) => dispatch(actions.setNewUser(newUser)),
  verifyRefferalCode: (refferalCode: string) =>
    dispatch(actions.verifyRefferalCode(refferalCode)),
  skipRefferalCode: () => dispatch(actions.skipRefferalCode()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  visible: boolean;
  handleNext: () => void;
} & ConnectedProps<typeof connector>;


const RefferalCodeModal = ({ 
  user, 
  visible,
  handleNext, 
  verifyRefferalCode,
  skipRefferalCode,
}: Props) => {
  const emptyRefferalCode: RefferalCode = {
    code: "",
  };

  const windowWidth = 1000;

  const [userName, setUserName] = useState("");
  const [refferalCode, setRefferalCode] =
    useState<RefferalCode>(emptyRefferalCode);

  useEffect(() => {
    if (user && user.is_referral_done) {
      handleNext();
    }
  }, []);

  useEffect(() => {
    if (user?.first_name) {
      let name = `${user?.first_name} ${user?.last_name}`;
      setUserName(name);
    }
  }, [user]);

  const onFinish = () => {
    verifyRefferalCode(refferalCode.code);
    // setVisibility(false);
    handleNext();
  };

  const onSkip = () => {
    skipRefferalCode();
    // setVisibility(false);
    handleNext();
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      closable={false}
      footer={null}
      width={windowWidth > 680 ? 900 : 450}
      bodyStyle={{ padding: 0 }}
      //bodyStyle={{ height: "500px", padding: "0px" }}
    >
      <div className="container">
        <div className="left-image">
          <Image src={landingPageImg} alt="Profile left" layout="fill" />
        </div>
        <div className="profile-form">
          <div className="profile-title">
            <h1 className="common-h1-style">Have a Refferal code?</h1>
          </div>
          <p className="common-p-style">
            <b>{userName}</b>, if you were reffered by another artist, please enter their refferal
            code and earn bonus points.
          </p>
          <Form
            {...layout}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item>
              <Input
                placeholder="Enter refferal code"
                onChange={(e) => {
                  setRefferalCode((prevState) => ({
                    ...prevState,
                    code: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button htmlType="button" onClick={onSkip}>
                Skip
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default connector(RefferalCodeModal);
