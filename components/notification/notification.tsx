import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../state/action";
import { BellOutlined } from "@ant-design/icons";
import { connect, ConnectedProps } from "react-redux";
import { ToastContainer, ToastOptions } from "react-toastify";
import { Button, Dropdown, Menu, Space } from "antd";
import type { MenuProps } from "antd";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideToast: () => dispatch(actions.hideToast()),
});

const connector = connect(null, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const Notification = ({}: Props) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Item 1</Menu.Item>
      <Menu.Item key="2">Item 2</Menu.Item>
      <Menu.Item key="3">Item 3</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );
  return (
    <div className="notification-icon">
      <Dropdown overlay={userMenu}>
        <div className="notification-inner">
          <BellOutlined className="user-icon" />
        </div>
      </Dropdown>
    </div>
  );
};

export default connector(Notification);
