/* eslint-disable @next/next/no-img-element */
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import { Card, Upload, Modal, Tabs, message, Button, Input } from "antd";
import {
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSample } from "types/model";
import * as actions from "../state/action";
import image from "next/image";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const isUploading = state.sample.isUploading;
  const isUploaded = state.sample.isUploaded;
  return { isUploading, isUploaded };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  uploadSample: (formData: FormData) => dispatch(actions.uploadSample(formData)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  file: File;
  fileType: string,
  editable: boolean;
  imageUrl: string;
  caption: string;
  onCancel: () => void;
} & ConnectedProps<typeof connector>;

const UploadModal = ({
  user,
  file,
  fileType,
  imageUrl,
  caption,
  editable,
  isUploading,
  isUploaded,
  onCancel,
  uploadSample,
}: Props) => {
  const router = useRouter();
  const [fileCaption, setFileCaption] = useState(caption);

  const getFileType = () => {
    if (fileType.includes("image")) return "image";
    if (fileType.includes("video")) return "video";
    if (fileType.includes("audio")) return "audio";
    return fileType;
  };
  
  const onClickUpload = () => {
    const formData = new FormData();
    formData.append("filename", file);
    formData.append("caption", fileCaption);
    formData.append("filetype", getFileType());

    uploadSample(formData);
  };

  return (
    <>
      <Modal
        className="uploadModal__modal"
        visible={!isUploaded}
        centered
        destroyOnClose={true}
        onCancel={onCancel}
        footer={null}
        // width={windowWidth > 680 ? 900 : 450}
        bodyStyle={{ padding: 0 }}
      >
        <div className="uploadModal__container">
          <h2 className="text-center f-20">
            {editable ? "Upload Image" : "My Work"}
          </h2>
          <div className="uploadModal__imageFrame">
            {fileType.includes("image") && (
              <img className="uploadModal__image" src={imageUrl} alt="" />
            )}
            {fileType.includes("video") && (
              <div className="uploadModal__video">
                <Player
                  className="uploadModal__player"
                  src={file ? URL.createObjectURL(file) : imageUrl}
                />
              </div>
            )}
          </div>
          <div className="uploadModal__captionContainer">
            <p className="uploadModal__captionText">Caption</p>
            <Input.TextArea
              bordered
              showCount
              disabled={!editable}
              size="middle"
              maxLength={255}
              value={fileCaption}
              onChange={(e) => {
                setFileCaption(e.target.value);
              }}
            />
          </div>
          {editable && (
            <Button
              loading={isUploading}
              type="primary"
              className="uploadModal__uploadButton"
              onClick={onClickUpload}
            >
              Upload
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default connector(UploadModal);
