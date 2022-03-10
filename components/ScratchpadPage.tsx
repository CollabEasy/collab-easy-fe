/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate';
import { Button } from "antd";
import { useEffect } from "react";
import Loader from "./loader";
import * as action from "state/action/scratchpadAction";
  
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
    console.log("val : ", value);
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
    return {isFetchingScratchpad, isUpdatingScratchpad, loggedInUserScratchpad}
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
        console.log("Rabbal is saving ", serialize(blogText));
        updateArtistScratchpad(serialize(blogText));
        setViewMode(true);
    }
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState(
        loggedInUserScratchpad.content.length !== 0 ? deserialize(loggedInUserScratchpad.content) :
            [
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                },
            ]
    )

    const setWritingMode = () => {
        setViewMode(false);
    }

    return (
        <div>
            {isFetchingScratchpad ? (
                <Loader />
            ) : (
                <div>
                    {isViewMode ? (
                        <div>
                            <p>{loggedInUserScratchpad.content}</p>
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
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default connector(ScratchpadPage);
