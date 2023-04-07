import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import Image from "next/image";
import { AppState } from "state";
import { Dispatch } from "redux";
import * as actions from "state/action/userAction";
import { connect, ConnectedProps } from "react-redux";
import { getBase64, dataURLtoFile } from "helpers/helper";
import {
  CameraOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Upload, message, Modal } from "antd";
import "cropperjs/dist/cropper.css";

const mapStateToProps = (state: AppState) => ({
  userModel: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProfilePicture: (formData: FormData) =>
    dispatch(actions.updateProfilePicture(formData)),
    showProfilePictureUpdateModal: (show: boolean) => dispatch(actions.showProfilePictureUpdateModal(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProfilePicture = ({ userModel, updateProfilePicture, showProfilePictureUpdateModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const user = userModel.user;
  const showUploadModal = userModel.showProfilePictureUpdateModal;
  const isUploading = userModel.isUpdatingProfilePic;

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      getBase64(info.file.originFileObj).then((imageUrl: string) =>
        setImageUrl(imageUrl)
      );
      setUploadFile(info.file.originFileObj);
      showProfilePictureUpdateModal(true);
    }
    if (info.file.status === "error") {
      // Get this url from response in real world.
      setLoading(false);
      message.error("Error in uploading file");
    }
  };

  const handleSave = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setUploadFile(dataURLtoFile(cropperRef.current?.cropper.getCroppedCanvas().toDataURL(), 'wondor-cropped' + uploadFile.name));
      const canvas = cropperRef.current?.cropper.getCroppedCanvas();
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('filename', blob, 'cropped.jpg');
        updateProfilePicture(formData);
      });
    }
  };

  const uploadButton = (
    <div
      className={`artistProfile_profilePicEditButton${isUploading ? 'Uploading' : ''}`}
    >
      {isUploading ? <LoadingOutlined style={{ marginTop: '26px' }} /> : <CameraOutlined style={{ marginTop: '26px' }} />}
      <div style={{ marginTop: '8px' }}>{isUploading ? "Updating" : "Update"}</div>
    </div>
  );

  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className="artistProfile__profileDpContainer">
      <Image
        className={`artistProfile_profileImage${isUploading ? 'Uploading' : ''}`}
        loader={prismicLoader}
        src={user?.profile_pic_url}
        alt="profile picture"
        height={150}
        width={150}
        priority
      />
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        accept="image/png, image/jpeg"
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      {uploadFile && showUploadModal && (
        <Modal
          closable
          onCancel={() => {
            showProfilePictureUpdateModal(false);
          }}
          className="profilePicture_cropperModal"
          visible={true}
          footer={null}
        >
          <div className="profilePicture__cropperModalContainer">
            <h4>Update Profile Picture</h4>
            <Cropper
              src={imageUrl}
              guides={true}
              background={false}
              responsive={true}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1 / 1}
              ref={cropperRef}
            />
            <button
              className="profilePicture__cropperModalSaveButton"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default connector(ProfilePicture);
