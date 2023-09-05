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
    categories: state.category.categories,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setNewUser: (newUser: boolean) => dispatch(actions.setNewUser(newUser)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  postArtistArt: (data: any) => dispatch(actions.updateArtistArt(data)),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(actions.updateArtistPreference(key, value)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const NewUserModal = ({
  user,
  categories,
  setNewUser,
  postArtistArt,
  getAllCategories,
  updateArtistPreference,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [collaborationCheck, setCollaborationCheck] = useState(false);
  const [userName, setUserName] = useState("");
  const windowWidth = 1000;
  const [modal, setModal] = useState(0);

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
    // console.log("Failed:", errorInfo);
  };

  const getModalWidth = (): number => {
    const width = window.innerWidth;
    if (width < 680) return 450;
    return 900;
  };

  useEffect(() => {
    if (categories.length === 0) getAllCategories();
  }, [categories.length, getAllCategories]);

  useEffect(() => {
    if (user?.first_name) {
      let name = `${user?.first_name} ${user?.last_name}`;
      setUserName(name);
    }
  }, [user]);

  function handleNextModal() {
    if (modal === 1) {
      setVisible(false);
    }
    setModal(modal + 1);
  }

  const handleSubmit = () => {
    if (selectedCategories.length === 0) {
      message.error("You need to select atleast one art style.")
      return;
    }
    let dataToSend = {
      initial: user.new_user,
      artNames: selectedCategories,
    };

    postArtistArt(dataToSend);
    updateArtistPreference("upForCollaboration", collaborationCheck);
    setNewUser(false);
    setVisible(false);
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
        {modal === 0 && (<NewUser handleNext={handleNextModal}/>)}
        {modal === 1 && (<RefferalCodeModal handleNext={handleNextModal}/>)}
      </Modal>
    </>
  );
};

export default connector(NewUserModal);
