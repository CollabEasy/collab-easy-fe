import Image from "next/image";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Card, Upload, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CollabRequestTab from "components/collabRequestTab";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSample } from "types/model";
import Title from "./title";

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  samples: UserSample[];
} & ConnectedProps<typeof connector>;

const SamplePage = ({ user, samples }: Props) => {
  const router = useRouter();
  const [showCollabModal, setShowCollabModal] = useState(false);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        showUploadList={false}
        // onPreview={this.handlePreview}
        // onChange={this.handleChange}
      >
        {samples.length >= 9 ? null : samples}
      </Upload>

      {samples.length === 0 && (
        <h2 className="text-center">🥺 Such emptiness 🥺.</h2>
      )}
    </>
  );
};

export default connector(SamplePage);
