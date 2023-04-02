import React from "react";
import Image from "next/image";
import { AppState } from "state";
import { Dispatch } from "redux";
import * as actions from "state/action/analyticsAction";
import { connect, ConnectedProps } from "react-redux";
import { CameraOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserAnalytics: (startDate: string, endDate: string) =>
    dispatch(actions.fetchUserAnalytics(startDate, endDate)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProfilePicture = ({ user }: Props) => {
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  if (user === undefined) {
    return null;
  }
  const loading = false;

  const uploadButton = (
    <div style = {{textAlign: "center", position: "absolute", right: "-8px", top: "2px" }}>
      {loading ? <LoadingOutlined /> : <CameraOutlined />}
      <div style={{ marginTop: 8 }}>Update</div>
    </div>
  );
  console.log("USER : ", user);
  return (
    <div className="artistProfile__profileDpContainer">
      <Image
        className="artistProfile_profileImage"
        loader={prismicLoader}
        src={user?.profile_pic_url}
        alt="profile picture"
        height={150}
        width={150}
        priority
      />
      <Upload
        name="avatar"
        className="artistProfile_profilePicEditButton"
        listType="picture"
        showUploadList={false}
        beforeUpload={() => {}}
        onChange={() => {}}
      >
        {/* <CameraOutlined
          className="artistProfile_profilePicEditButton"
          style={{ color: "#000000", strokeWidth: "30", stroke: "black" }}
        /> */}
        {uploadButton}
      </Upload>
    </div>
  );
};

export default connector(ProfilePicture);
