/* eslint-disable @next/next/no-img-element */
import avatar from "../public/images/avatar.png";
import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Tabs } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSample } from "types/model";
import * as action from "../state/action";
import UploadModal from "./modal/sampleUploadModal";

const { Meta } = Card;

const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
  isSelf: boolean;
  sample: UserSample;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onClickDelete: () => void;
} & ConnectedProps<typeof connector>;

const SampleTile = ({
  user,
  isSelf,
  sample,
  onClick,
  onClickDelete,
}: Props) => {
  const router = useRouter();
  

 
  return (
    <div className="sampleTile__imageTileContainer">
          <img
            onClick={onClick}
            className="sampleTile__imageTile"
            src={sample.thumbnailUrl}
            alt=""
          />
          {isSelf && (
            <div className="sampleTile__deleteButtonContainer">
              <Button 
                className="sampleTile__deleteButton" 
                icon={<DeleteOutlined />} 
                onClick={onClickDelete}
              />
            </div>
          )}
        </div>
  );
};

export default connector(SampleTile);
