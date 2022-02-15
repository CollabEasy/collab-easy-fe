/* eslint-disable @next/next/no-img-element */
import avatar from "../public/images/avatar.png";
import React, { ReactElement, useEffect, useState } from "react";
import { Card, Upload, Modal, Tabs, message } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import CollabRequestTab from "components/collabRequestTab";
import { AppState } from "state";
import { allowedFileTypes } from "helpers/helper";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSample } from "types/model";
import * as action from '../state/action';
import UploadModal from "./UploadModal";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearUploadSampleState: () => dispatch(action.clearUploadSampleState()), 
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  samples: UserSample[];
} & ConnectedProps<typeof connector>;

const SamplePage = ({ user, samples, clearUploadSampleState }: Props) => {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true); 
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const resetState = () => {
    setImageUrl("");
    setUploadFile(null);
    setShowUploadModal(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function beforeUpload(file) {
    const isAllowed = allowedFileTypes();
    const isValidFile = isAllowed.includes(file.type);
    if (!isValidFile) {
      message.error("Invalid File type!");
    }
    const isValidSize = file.size / 1024 / 1024 <= 100;
    if (!isValidSize) {
      message.error("File must be smaller than 100 MB");
    }
    return isValidFile || isValidSize;
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      setCaption("");
      setEditable(true);
      clearUploadSampleState();
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      getBase64(info.file.originFileObj).then((imageUrl: string) =>
        setImageUrl(imageUrl)
      );
      
      setUploadFile(info.file.originFileObj);
      setFileType(info.file.originFileObj.type);
      setShowUploadModal(true);
    }
    if (info.file.status === "error") {
      // Get this url from response in real world.
      setLoading(false);
      message.error("Error in uploading file");
    }
  };

  const getSamples = () => {
    const sampleTiles: JSX.Element[] = [];

    sampleTiles.push(
      <div className="samplePage__imageTileContainer">
        <Upload
          name="avatar"
          listType="picture-card"
          className="samplePage__imageTile"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {samples.length >= 9 ? null : uploadButton}
        </Upload>
      </div>
    );
    samples.forEach((sample, index) => {
      console.log("sampe : ", sample.thumbnailUrl);
      sampleTiles.push(
        <div className="samplePage__imageTileContainer">
          <img
            onClick={(e) => {
              setFileType(sample.fileType);
              setImageUrl(sample.originalUrl);
              setCaption(sample.caption);
              setEditable(false);
              setShowUploadModal(true);
            }}
            className="samplePage__imageTile"
            src={sample.thumbnailUrl}
            alt=""
          />
        </div>
      );
    });
    console.log("tile : ", sampleTiles);
    return sampleTiles;
  };

  console.log("samples : ", samples);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {samples.length === 0 && (
          <h2 className="text-center">🥺 Such emptiness 🥺</h2>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showUploadModal && (
          <UploadModal
            user={user}
            fileType={fileType}
            caption={caption}
            editable={editable}
            file={uploadFile}
            imageUrl={imageUrl}
            onCancel={resetState}
          />
        )}
        <div className="samplePage__grid">
          {getSamples()}
        </div>
      </div>
    </>
  );
};

export default connector(SamplePage);
