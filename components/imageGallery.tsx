import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import { GridData, UserSample } from "types/model";
import SampleUploadModal from "./modal/sampleUploadModal";
import {
    PlusOutlined,
    LoadingOutlined,
    UploadOutlined,
  } from "@ant-design/icons";
import * as action from "../state/action";
import { Artwork } from "types/model/artwork";
import SampleTile from "./sampleTile";
import { message, Upload } from "antd";
import { allowedFileTypes, getBase64 } from "helpers/helper";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isFetchingUser: state.user.isFetchingUser,
  notification: state.notification,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearUploadSampleState: () => dispatch(action.clearUploadSampleState()),
  clearDeleteSampleState: () => dispatch(action.clearDeleteSampleState()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isSelf: boolean;
  images: Artwork[];
  isUploading: boolean;
  isUploaded: boolean;
  onClickUpload: (formData: FormData) => void;
  onClickDelete: (artwork: UserSample) => void;
} & ConnectedProps<typeof connector>;

const ImageGallery = ({
  user,
  isSelf,
  isFetchingUser,
  notification,
  images,
  isUploading,
  isUploaded,
  onClickUpload,
  onClickDelete,
  clearUploadSampleState,
  clearDeleteSampleState,
}: Props) => {
  const [caption, setCaption] = useState("");
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUploadingLoader, setShowUploadingLoader] = useState(false);
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

    images.forEach((image, index) => {
      sampleTiles.push(
        <SampleTile
          user={user}
          isSelf={isSelf}
          sample={image.artworkData}
          onClick={() => {
            clearUploadSampleState();
            setFileType(image.fileType);
            setImageUrl(image.artworkData.originalUrl);
            setCaption(image.artworkData.caption);
            setEditable(false);
            setShowUploadModal(true);
          }}
          onClickDelete={() => {
            clearDeleteSampleState();
            onClickDelete(image.artworkData);
          }}
        />
      );
    });

    if (isSelf) {
      sampleTiles.push(
        <div>
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {images.length >= 6 ? null : uploadButton}
          </Upload>
        </div>
      );
    }

    return sampleTiles;
  };

  return (
    <div>
    {showUploadModal && (
      <SampleUploadModal
        user={user}
        file={file}
        fileType={fileType}
        editable={editable}
        imageUrl={imageUrl}
        caption={caption}
        isUploading={isUploading}
        isUploaded={isUploaded}
        onChangeCaption={() => {}}
        onClickUpload={() => {}}
        onCancel={() => {}}
      />
    )}
    {getSamples()}
    </div>
  );
};

export default connector(ImageGallery);
