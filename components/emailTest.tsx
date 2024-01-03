import { Button, Card, Form, Input, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import Menu, { Item as MenuItem } from "rc-menu";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as actions from "state/action/emailAction";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => ({
  user_id: state.user.user.artist_id,
  emailEnums: state.analytics.emails.emailEnumDetails,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendEmailToOneUser: (subject: string, content: string, fromAdmin: boolean) =>
    dispatch(actions.sendEmailToOneUser(subject, content, fromAdmin)),
  sendEmailToAll: (subject: string, content: string, fromAdmin: boolean) =>
    dispatch(actions.sendEmailToAllUsers(subject, content, fromAdmin)),
  fetchAllEmailEnumDetails: () => dispatch(actions.fetchAllEmailEnumDetails()),
  sendEmailToGroup: (
    enumGroup: string,
    subject: string,
    content: string,
    fromAdmin: boolean
  ) =>
    dispatch(actions.sendEmailToGroup(enumGroup, subject, content, fromAdmin)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;
const EmailTest = ({
  user_id,
  emailEnums,
  sendEmailToOneUser,
  fetchAllEmailEnumDetails,
  sendEmailToAll,
  sendEmailToGroup,
}: Props) => {
  const [form] = Form.useForm();
  const [subject, setSubject] = useState("");
  const html = `<!DOCTYPE html> 
        <html> 
            <head> 
                <title>THIS IS TEST CONTENT</title> 
            </head> 
            <body> 
                <h1>This is a Heading</h1> 
                <p>This is a paragraph. </p> 
            </body> 
        </html>`;

  const [content, setContent] = useState(html);
  const [selectedEmailOption, setSelectedEmailOption] = useState(null);
  var date = new Date(0); // The 0 there is the key, which sets the date to the epoch

  useEffect(() => {
    fetchAllEmailEnumDetails();
  }, [fetchAllEmailEnumDetails]);

  const enumStringsMapWithTime = {};
  const emailEnumStrings: string[] = ["Send to myself", "Send to all users"];

  if (emailEnums !== undefined) {
    emailEnums.forEach((emailEnumObj) => {
      enumStringsMapWithTime[emailEnumObj.emailEnum] = emailEnumObj.lastSent;
      emailEnumStrings.push(emailEnumObj.emailEnum);
    });
  }

  const menuItems = [];
  let keyLabel = 1;
  emailEnumStrings.forEach((emailEnumString) => {
    menuItems.push(
      <MenuItem
        onClick={() => {
          setSelectedEmailOption(emailEnumString);
        }}
        key={keyLabel}
      >
        {emailEnumString}
      </MenuItem>
    );
    keyLabel++;
  });

  const menu = <Menu style={{ width: 140 }}>{menuItems}</Menu>;
  const buttonDisabled =
    selectedEmailOption !== "INCOMPLETE_PROFILE" &&
    (subject.length < 5 || content.length < 10);
  return (
    <Form form={form} name="control-hooks" style={{ maxWidth: 600 }}>
      <Form.Item name="Subject" label="Subject" rules={[{ required: true }]}>
        <Input
          disabled={selectedEmailOption === "INCOMPLETE_PROFILE"}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          defaultValue={subject}
        />
      </Form.Item>

      <Form.Item name="Content" label="Content" rules={[{ required: true }]}>
        <TextArea
          disabled={selectedEmailOption === "INCOMPLETE_PROFILE"}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          defaultValue={content}
          rows={20}
        />
      </Form.Item>

      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Dropdown trigger={["click"]} overlay={menu} animation="slide-up">
          <button style={{ width: "300px", padding: "5px 10px" }}>
            {selectedEmailOption ? selectedEmailOption : "Email Options ↓ "}
          </button>
        </Dropdown>

        <Tooltip
          title={
            buttonDisabled
              ? "Subject or content doesn't meet the length requirements."
              : ""
          }
        >
          <Button
            disabled={buttonDisabled}
            style={{ backgroundColor: "#6afcf3" }}
            onClick={() => {
              if (selectedEmailOption === "Send to myself") {
                sendEmailToOneUser(subject, content, true);
              } else if (selectedEmailOption === "Send to all users") {
                sendEmailToAll(subject, content, true);
              } else {
                sendEmailToGroup(selectedEmailOption, subject, content, true);
              }
            }}
          >
            Send Email
          </Button>
        </Tooltip>
      </div>
      {selectedEmailOption !== "Send to all users" &&
        selectedEmailOption !== "Send to myself" &&
        selectedEmailOption !== null && (
          <p>
            Last Sent :{" "}
            {enumStringsMapWithTime[selectedEmailOption]
              ? new Date(enumStringsMapWithTime[selectedEmailOption]).toString()
              : "Never"}
          </p>
        )}
      {selectedEmailOption === "Send to all users" && (
        <p style={{ color: "red" }}>
          You are about to send an email to all users. Please be careful and
          check the content again.
        </p>
      )}
    </Form>
  );
};

export default connector(EmailTest);
