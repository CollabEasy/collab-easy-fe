import Image from "next/image";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Card, Upload, Modal, Tabs, Button } from "antd";
import {
  UploadOutlined,
} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import CollabRequestTab from "components/collabRequestTab";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSocialProspectus } from "types/model";
import Title from "./title";

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => { };

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isSelf: boolean;
  user: User;
  socialProspectus: UserSocialProspectus[];
} & ConnectedProps<typeof connector>;

const SamplePage = ({ user, isSelf, socialProspectus }: Props) => {
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {socialProspectus.length === 0 && (
          <h2 className="text-center">🥺 Let everyone know 🥺.</h2>
        )}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {socialProspectus.length === 0 && isSelf && (
          <Button
            shape="round"
            //size="large"
            type="primary"
          >Add more profiles.
          </Button>
        )}
      </div>
    </>
  );
};

export default connector(SamplePage);
