/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { useMemo } from 'react'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { createEditor } from 'slate';
import { Button, Tooltip } from "antd";
import {

    InfoCircleOutlined,

} from "@ant-design/icons";
import { useEffect } from "react";
import Loader from "./loader";
import * as action from "state/action/scratchpadAction";
import Layout from "@/components/layout";

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
            updateArtistScratchpad(serialize(blogText));
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


    return (
        <Layout
            title={"Scratchpad | Wondor"}
            name={"description"}
            content={"Write down your new ideas - polished or unpolished on the scratchpad before your forget it. Collaborate with artists around the world and improve your reach. Join Wondor now! "}
        >
            <div>
                {isFetchingScratchpad ? (
                    <Loader />
                ) : (
                    <div>
                        {isViewMode ? (
                            <div>
                                <div>
                                    {loggedInUserScratchpad.content.length == 0 ? (
                                        <div>
                                            <p>Write what is on your mind !</p>
                                            <Tooltip
                                                placement="topLeft"
                                                title="Please, do not write any personal information."
                                            >
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>{getBlogFormattedContent(loggedInUserScratchpad.content)}</p>
                                        </div>
                                    )}

                                </div>
                                <div className="scratchpad__buttonContainer">
                                    <Button type="primary" onClick={setWritingMode}>Edit</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="scratchpad_container">
                                <div className="scratchpad_editorContainer">
                                    <Slate
                                        editor={editor}
                                        value={deserialize(loggedInUserScratchpad.content)}
                                        onChange={value => {
                                            setBlogText(value)
                                        }}
                                    >
                                        <Editable />
                                    </Slate>
                                </div>
                                <div className="scratchpad__buttonContainer">
                                    <Button loading={isUpdatingScratchpad} type="primary" onClick={saveBlog}>
                                        Save
                                    </Button>
                                    <Button type="primary" onClick={doNotSaveBlog}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    )
};

export default connector(ScratchpadPage);
