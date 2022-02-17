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
import * as action from "../state/action";
import UploadModal from "./UploadModal";
import SampleTile from "./sampleTile";
import ConfirmationModal from "./confirmationModal";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const isDeleting = state.sample.isDeleting;
  const isDeleted = state.sample.isDeleted;

  return { isDeleting, isDeleted }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearUploadSampleState: () => dispatch(action.clearUploadSampleState()),
  clearDeleteSampleState: () => dispatch(action.clearDeleteSampleState()),
  deleteSample: (sample: UserSample) => dispatch(action.deleteSample(sample)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  isSelf: boolean;
  samples: UserSample[];
} & ConnectedProps<typeof connector>;

const SamplePage = ({
  user,
  isSelf,
  samples,
  isDeleting,
  isDeleted,
  deleteSample,
  clearUploadSampleState,
  clearDeleteSampleState,
}: Props) => {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState(undefined);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
    let isValidFile = false;
    isAllowed.forEach((allowedFileTypes, index) => {
      if (file.type.includes(allowedFileTypes)) {
        isValidFile = true;
      }
    });
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

    if (isSelf) {
      sampleTiles.push(
        <div className="sampleTile__imageTileContainer">
          <Upload
            name="avatar"
            listType="picture-card"
            className="sampleTile__imageTile"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {samples.length >= 9 ? null : uploadButton}
          </Upload>
        </div>
      );
    }

    samples.forEach((sample, index) => {
      sampleTiles.push(
        <SampleTile 
          user={user}
          isSelf={isSelf}
          sample={sample}
          onClick={() => {
            console.log("is on clik");
            clearUploadSampleState();
            setFileType(sample.fileType);
            setImageUrl(sample.originalUrl);
            setCaption(sample.caption);
            setEditable(false);
            setShowUploadModal(true);
          }}
          onClickDelete={() => {
            clearDeleteSampleState();
            setSelectedSample(sample);
            setShowConfirmationModal(true);
          }}
        />
      );
    });
    return sampleTiles;
  };

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
        {showConfirmationModal && (
          <ConfirmationModal
            buttonLoading={isDeleting}
            show={!isDeleted}
            user={user}
            headerText={"Delete Sample"}
            confirmationText="Are you sure you want to delete the sample file?"
            actionButtonText="Yes, delete"
            onAction={() => {
              deleteSample(selectedSample);
              setSelectedSample(undefined);
            }}
            onCancel={() => {
              setShowConfirmationModal(false);
            }}

          />
        )}
        <div className="samplePage__grid">{getSamples()}</div>
      </div>
    </>
  );
};

export default connector(SamplePage);
