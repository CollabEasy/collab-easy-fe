import React, { useState, useRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import router, { useRouter } from "next/router";
import Image from "next/image";
import { AppState } from "state";
import { Dispatch } from "redux";
import * as actions from "state/action/contestAction";
import { connect, ConnectedProps } from "react-redux";
import { getBase64, dataURLtoFile } from "helpers/helper";
import {
  CameraOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Upload, message, Modal, Button } from "antd";
import "cropperjs/dist/cropper.css";
import { User } from "types/model";
import { ContestEntry } from "types/model/contest";
import { updateProfilePicture } from "api/artist-user";
import { showProfilePictureUpdateModal } from "state/action";

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  contest: state.contest,
  submissions: state.contestSubmission,
  userModel: state.user,
  isFetchingSubmission: state.contestSubmission.isFetchingSubmission,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

  fetchArtistSubmission: (constestSlug: string) =>
    dispatch(actions.fetchArtistSubmission(constestSlug)),

  // updateProfilePicture: (formData: FormData) =>
  //   dispatch(actions.updateProfilePicture(formData)),
  // showProfilePictureUpdateModal: (show: boolean) =>
  //   dispatch(actions.showProfilePictureUpdateModal(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const UploadContestArtwork = ({
  user,
  contest,
  submissions,
  userModel,
  isFetchingSubmission,
  fetchArtistSubmission,
  // updateProfilePicture,
  // showProfilePictureUpdateModal,
}: Props) => {

  const router = useRouter();
  const { id: contestSlug } = router.query;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const showUploadModal = userModel.showProfilePictureUpdateModal;
  const [showUploadingLoader, setShowUploadingLoader] = useState(false);
  const isUploading = userModel.isUpdatingProfilePic;

  useEffect(() => {
    fetchArtistSubmission(contestSlug as string);
  }, []);

  useEffect(() => {
    if (isUploading === showUploadingLoader) {
      return;
    }
    if (!isUploading && showUploadingLoader) {
      setTimeout(() => {
        setShowUploadingLoader(isUploading);
      }, 2000);
    } else {
      setShowUploadingLoader(isUploading);
    }

  }, [isUploading, showUploadingLoader]);

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
      setUploadFile(
        dataURLtoFile(
          cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
          "wondor-cropped" + uploadFile.name
        )
      );
      const canvas = cropperRef.current?.cropper.getCroppedCanvas();
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("filename", blob, "cropped.jpg");
        updateProfilePicture(formData);
      });
    }
  };

  const uploadButton = (
    <div
      className={`artistProfile_profilePicEditButton${showUploadingLoader ? "Uploading" : ""
        }`}
    >
      {showUploadingLoader ? (
        <LoadingOutlined style={{ marginTop: "26px" }} />
      ) : (
        <CameraOutlined style={{ marginTop: "26px" }} />
      )}
      <div style={{ marginTop: "8px" }}>
        {showUploadingLoader ? "Updating" : "Update"}
      </div>
    </div>
  );

  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        accept="image/png, image/jpeg"
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Image
        className={`artistProfile_profileImage${showUploadingLoader ? "Uploading" : ""
          }`}
        loader={prismicLoader}
        src={user?.user.profile_pic_url}
        alt="profile picture"
        height={150}
        width={150}
        priority
      />
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
              aspectRatio={1 / 1}
              ref={cropperRef}
            />
            <Button
              type="primary"
              className="common-medium-btn"
              style={{ height: 'auto', marginTop: '10px' }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default connector(UploadContestArtwork);
