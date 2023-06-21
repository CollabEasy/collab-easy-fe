import Image from "next/image";
import {
  CloseOutlined,
  CheckOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Card, Tabs, Button, Form, Input } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User, UserSocialProspectus } from "types/model";
import * as actions from "state/action";
import { SOCIAL_PLATFORMS } from "config/constants";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Loader from "./loader";
import { encryptContent } from "helpers/helper";
import { GetSocialMediaUrl, IsPersonalWebsite, GetSocialPlatformName, GetSocialPlatformImage, GetSocialPlatformBaseUrl } from '../helpers/socialProspectusHelper';
import TextArea from "antd/lib/input/TextArea";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => ({
 user_id: state.user.user.artist_id
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendEmailToOneUser: (subject: string, content: string, fromAdmin: boolean) => dispatch(actions.sendEmailToOneUser(subject, content, fromAdmin)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
} & ConnectedProps<typeof connector>;

const EmailTest = ({
    user_id,
  sendEmailToOneUser,
}: Props) => {
  
    const [form] = Form.useForm();
    const [subject, setSubject] = useState("Subject");
    const html = 
    `<!DOCTYPE html> 
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
  
    return (
      <Form
        form={form}
        name="control-hooks"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="Subject" label="Subject" rules={[{ required: true }]}>
          <Input onChange={(e) => {setSubject(e.target.value)}} defaultValue={subject}/>
        </Form.Item>

        <Form.Item name="Content" label="Content" rules={[{ required: true }]}>
            <TextArea onChange={(e) => {setContent(e.target.value)}} defaultValue={content} rows={20} />
        </Form.Item>
    
        <Button onClick={() => {
            sendEmailToOneUser(subject, encryptContent(content), true);
        }}>
            Send Email
        </Button>
      </Form>
    );
  };

export default connector(EmailTest);
