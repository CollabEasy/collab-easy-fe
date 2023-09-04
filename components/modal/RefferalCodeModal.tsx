import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Modal, Button, Select, Input } from "antd";
import Image from "next/image";
import landingPageImg from "public/images/profile.png";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import * as actions from "../../state/action";
import { RefferalCode } from "types/model/refferalCode";

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
  postArtistArt: (data: any) => dispatch(actions.updateArtistArt(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const RefferalCodeModal = ({
  user,
  setNewUser,
  postArtistArt,
}: Props) => {
  const emptyRefferalCode: RefferalCode = {
    code: "",
  };
  const windowWidth = 1000;

  const [visible, setVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [refferalCode, setRefferalCode] = useState<RefferalCode>(emptyRefferalCode);

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (user?.first_name) {
      let name = `${user?.first_name} ${user?.last_name}`;
      setUserName(name);
    }
  }, [user]);


  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = () => {
    let dataToSend = {
      code: refferalCode.code
    };

    postArtistArt(dataToSend);
    setVisible(false);
  };

  const onSkip = () => {
    setVisible(false);
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <>
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={null}
        width={windowWidth > 680 ? 750 : 500}
        bodyStyle={{ padding: 0 }}
      >
        <div className="container">
          <div className="left-image">
            <Image src={landingPageImg} alt="Profile left" layout="fill" />
          </div>
          <div className="profile-form">
            <div className="profile-title">
              <h1 className="common-h1-style">Have a Refferal code?</h1>
              <h1>{userName}</h1>
            </div>
            <p className="common-p-style">
              If you were reffered by another artist, please enter their refferal code
              and earn bonus points.
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
    </>
  );
};

export default connector(RefferalCodeModal);
