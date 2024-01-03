import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Button, Select, Input, message } from "antd";
import Image from "next/image";
import landingPageImg from "public/images/profile.png";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import * as actions from "../../state/action";
import { RefferalCode } from "types/model/rewards";
import { User } from "types/model";
import { useRouter } from "next/router";
import * as rewardsAPI from "api/rewards";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
  handleNext: () => void;
} & ConnectedProps<typeof connector>;

const RefferalCodeModal = ({
  user,
  handleNext,
  verifyRefferalCode,
  skipRefferalCode,
}: Props) => {
  const router = useRouter();
  const { code } = router.query;

  const refCode = code === undefined ? "" : code.toString();
  const initReferalCode: RefferalCode = { code: refCode };

  const windowWidth = 1000;

  const [userName, setUserName] = useState("");
  const [refferalCode, setRefferalCode] =
    useState<RefferalCode>(initReferalCode);

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

  const verifyRefferalCodeFromAPI = async (data: any) => {
    try {
      /* Type 'any' is of type Array<object> but getting some error */
      const result = await rewardsAPI.verifyRefferalCode(refferalCode.code);
      return result;
    } catch (err) {
      return {
        data: [],
        error: true,
        loading: false,
        errorMessage: err.response.data.err_str,
      };
    }
  };

  const onFinish = async () => {
    if (refferalCode.code === "") {
      message.error("Enter a refferal code or skip to continue.");
      return;
    }
    const verifyResults = await verifyRefferalCodeFromAPI(refferalCode.code);
    if (
      verifyResults["error"] === undefined ||
      verifyResults["error"] === false
    ) {
      message.success("Referral reward points added successfully.");
      handleNext();
    } else {
      message.error(
        verifyResults["errorMessage"] +
          ". Please enter correct code or Skip to continue. For more information contact admin@wondor.art",
        6
      );
    }
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
    <div className="referralPage__container">
      <div className="left-image">
        <Image src={landingPageImg} alt="Profile left" layout="fill" />
      </div>
      <div className="profile-form">
        <div className="profile-title">
          <h1 className="common-h1-style">Have a Referral code?</h1>
        </div>
        <p className="common-p-style">
          <b>Hi {user.first_name}</b>, if you were referred by another artist,
          please enter their referral code and earn bonus points. Use{" "}
          <b>WONDOR-ART</b> if you do not have one to still earn bonus points.
        </p>
        <Form
          {...layout}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item>
            <Input
              placeholder="Enter referral code"
              value={refferalCode.code}
              onChange={(e) => {
                setRefferalCode((prevState) => ({
                  ...prevState,
                  code: e.target.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div className="twoButtonsSpacing">
              <Button htmlType="button" onClick={onSkip}>
                Skip
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connector(RefferalCodeModal);
