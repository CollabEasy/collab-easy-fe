import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { RightCircleFilled } from "@ant-design/icons";
import { Form, Switch, Modal, Button, Select, message } from "antd";
import Image from "next/image";
import landingPageImg from "public/images/profile.png";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import * as actions from "../../state/action";
import NewUser from "./newUser";
import RefferalCodeModal from "./RefferalCodeModal";
import { useRouter } from "next/router";
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

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const NewUserModal = ({ user }: Props) => {
  const [visible, setVisible] = useState(true);
  const windowWidth = 1000;
  const [modal, setModal] = useState(0);

  const router = useRouter();

  function handleNextModal() {
    if (modal === 1) {
      setVisible(false);
    }
    setModal(modal + 1);
  }

  function setVisibility(visible: boolean) {
    setVisible(visible);
  }

  return (
    <>
      {modal === 1 && <RefferalCodeModal handleNext={handleNextModal} />}
    </>
  );
};

export default connector(NewUserModal);
