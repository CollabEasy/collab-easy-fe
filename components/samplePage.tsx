/* eslint-disable @next/next/no-img-element */
import avatar from "../public/images/avatar.png";
import React, { ReactElement, useEffect, useState } from "react";
import { Card, Upload, Modal, Tabs, message, Button } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import CollabRequestTab from "components/collabRequestTab";
import State, { AppState } from "state";
import { allowedFileTypes, getBase64, getFileType } from "helpers/helper";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSample } from "types/model";
import * as action from "../state/action";
import UploadModal from "./modal/sampleUploadModal";
import SampleTile from "./sampleTile";
import ConfirmationModal from "./modal/confirmationModal";
import Loader from "./loader";
import Layout from "./layout";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const samples = state.sample.samples;
  const isDeleting = state.sample.isDeleting;
  const isDeleted = state.sample.isDeleted;
  const isUploading = state.sample.isUploading;
  const isUploaded = state.sample.isUploaded;
  return { samples, isDeleting, isDeleted, isUploading, isUploaded }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSamples: (slug: string) =>
    dispatch(action.fetchArtistSamples(slug)),
  clearUploadSampleState: () => dispatch(action.clearUploadSampleState()),
  clearDeleteSampleState: () => dispatch(action.clearDeleteSampleState()),
  deleteSample: (sample: UserSample) => dispatch(action.deleteSample(sample)),
  uploadSample: (formData: FormData) => dispatch(action.uploadSample(formData)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  isSelf: boolean;
  showLoader: boolean;
  editSamplesfromPortal: boolean;
} & ConnectedProps<typeof connector>;

const SamplePage = ({
  user,
  isSelf,
  samples,
  isDeleting,
  isDeleted,
  isUploading,
  isUploaded,
  showLoader,
  editSamplesfromPortal,
  fetchArtistSamples,
  deleteSample,
  uploadSample,
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
  const [hasUploadError, setHasUploadError] = useState(false);

  const resetState = () => {
    setImageUrl("");
    setUploadFile(null);
    setShowUploadModal(false);
  };

  useEffect(() => {
    fetchArtistSamples(user.slug);
  }, [fetchArtistSamples]);

  const { toArtistPortal } = useRoutesContext();

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
    return isValidFile && isValidSize;
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
      return;
    }
  };

  const getSamples = () => {
    const sampleTiles: JSX.Element[] = [];

    samples.forEach((sample, index) => {
      sampleTiles.push(
        <div className="tileCard">
          <SampleTile
            user={user}
            isSelf={isSelf}
            sample={sample}
            onClick={() => {
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
          <div className="tileContainer">
            <p className="caption">{sample.caption}</p>
          </div>
        </div>
      );
    });

    return sampleTiles;
  };

  const onClickUpload = () => {
    const formData = new FormData();
    formData.append("filename", uploadFile);
    formData.append("caption", caption);
    formData.append("filetype", getFileType(fileType));

    uploadSample(formData);
  };

  if (showLoader) return <Loader />;


  const getLayout = () => {
    return (
      <div className="samplePage__container">
        {showUploadModal && (
          <UploadModal
            user={user}
            fileType={fileType}
            caption={caption}
            editable={editable}
            file={uploadFile}
            imageUrl={imageUrl}
            isUploading={isUploading}
            isUploaded={isUploaded}
            onCancel={resetState}
            onClickUpload={onClickUpload}
            onChangeCaption={(caption: string) => {
              setCaption(caption);
            }}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            gap: "12px"
          }}
        >
          {isSelf && (<Upload
            name="avatar"
            listType="picture-card"
            style={{ textAlign: "center" }}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {samples.length >= 6 ? null : uploadButton}
          </Upload>)}

          <div className="grid">{getSamples()}</div>
        </div>
      </div>
    );
  }
  return (
    <>
      {getLayout()}
    </>
  );
};

export default connector(SamplePage);
