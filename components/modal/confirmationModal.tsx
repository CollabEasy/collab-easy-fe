/* eslint-disable @next/next/no-img-element */
import avatar from "../public/images/avatar.png";
import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Tabs, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSample } from "types/model";
import * as action from "../../state/action";
import UploadModal from "./sampleUploadModal";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  show: boolean;
  user: User;
  headerText: string;
  buttonLoading: boolean,
  confirmationText: string;
  actionButtonText: string;
  onAction: () => void;
  onCancel: () => void;
} & ConnectedProps<typeof connector>;

const ConfirmationModal = ({
  show,
  user,
  buttonLoading,
  headerText,
  confirmationText,
  actionButtonText,
  onAction,
  onCancel,
}: Props) => {
  const router = useRouter();
  return (
    <Modal
      className="confirmationModal__modal"
      visible={show}
      centered
      destroyOnClose={true}
      onCancel={onCancel}
      footer={null}
      bodyStyle={{ padding: 0 }}
    >
      <div className="confirmationModal__container">
        <h2 className="text-center f-20">{headerText}</h2>
        <p>{confirmationText}</p>
        <div className="confirmationModal__buttonContainer">
          <Button
            type="primary"
            loading={buttonLoading}
            className="confirmationModal__actionButton"
            onClick={onAction}
          >
              {actionButtonText}
          </Button>
          <Button
            className="confirmationModal__cancelButton"
            onClick={onCancel}
          >
              Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default connector(ConfirmationModal);
