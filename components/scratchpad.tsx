/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { useMemo } from 'react'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { createEditor } from 'slate';
import { Button } from "antd";
import { useEffect } from "react";
import Loader from "./loader";
import * as action from "state/action/scratchpadAction";
import { Form, Input, Typography } from 'antd';
import TextEditor from "components/scratchpadTextEditor";

const { Item } = Form;
const { TextArea } = Input;
const { Title } = Typography;

const serialize = value => {
    let finalString = "";
    for (var i = 0; i < value.length; i++) {
        finalString = finalString + value[i]['children'][0]['text'];
        if (i !== value.length - 1) {
            finalString += "\n";
        }
    }
    return finalString;
}

const deserialize = value => {
    let finalData = []
    let blogData = value.split("\n");
    for (var i = 0; i < blogData.length; i++) {
        var object = {
            type: 'paragraph',
            children: [{ text: blogData[i] }]
        }
        finalData.push(object);
    }
    return finalData;
}

const mapStateToProps = (state: AppState) => {
    const isFetchingScratchpad = state.scratchpad.isFetchingScratchpad;
    const isUpdatingScratchpad = state.scratchpad.isUpdatingScratchpad;
    const loggedInUserScratchpad = state.scratchpad.scratchpad;
    return { isFetchingScratchpad, isUpdatingScratchpad, loggedInUserScratchpad }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchScratchpadByArtistId: () =>
        dispatch(action.fetchScratchpadByArtistId()),
    updateArtistScratchpad: (data: string) => dispatch(action.updateArtistScratchpad(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
} & ConnectedProps<typeof connector>;

const ScratchpadPage = ({
    isFetchingScratchpad,
    isUpdatingScratchpad,
    loggedInUserScratchpad,
    fetchScratchpadByArtistId,
    updateArtistScratchpad,
}: Props) => {
    useEffect(() => {
        fetchScratchpadByArtistId();
    }, []);


    const [isViewMode, setViewMode] = useState(true);
    // set blogText to what is saved in database. if nothing, set it to null.
    const [blogText, setBlogText] = useState(null);
    const saveBlog = () => {
        if (blogText != null) {
            isUpdatingScratchpad = false;
            updateArtistScratchpad(blogText);
        }
        setViewMode(true);
    }
    const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
    const [value, setValue] = useState(
        loggedInUserScratchpad.content.length !== 0 ? deserialize(loggedInUserScratchpad.content) :
            [
                {
                    type: 'paragraph',
                    children: [{ text: 'Write what is on your mind !' }],
                },
            ]
    )

    const setWritingMode = () => {
        setViewMode(false);
    }

    const doNotSaveBlog = () => {
        setViewMode(true);
    }

    const getBlogFormattedContent = (content) => {
        let sentences = content.split("\n");
        const formattedContent: JSX.Element[] = [];
        sentences.forEach(senetence => {
            formattedContent.push(
                <div>
                    <p>{senetence}</p>
                </div>
            )
        });
        return formattedContent;
    }

    const [form] = Form.useForm();
    interface IPostCreate {
        body: string;
    }

    const onSubmit = (values: IPostCreate) => {
        // logic to submit form to server
        console.log(values.body);
        setBlogText(values.body);
        saveBlog();
        // form.resetFields();
    };

    console.log(loggedInUserScratchpad);

    return (
        <div>
            {isFetchingScratchpad ? (
                <Loader />
            ) : (
                <>
                    <Form layout="vertical" form={form} onFinish={onSubmit}>
                        <Item
                            name="body"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter body of post',
                                },
                            ]}
                        >
                            {/* @ts-ignore */}
                            <TextEditor value={loggedInUserScratchpad.content} />
                        </Item>

                        <Item>
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Item>
                    </Form>
                </>
            )}
        </div>
    )
};

export default connector(ScratchpadPage);
