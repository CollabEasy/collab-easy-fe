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
    const loggedInUserScratchpad = state.scratchpad;
    return {loggedInUserScratchpad}
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchScratchpadByArtistId: () =>
      dispatch(action.fetchScratchpadByArtistId()),
  });

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
} & ConnectedProps<typeof connector>;

const ScratchpadPage = ({
    fetchScratchpadByArtistId
}: Props) => {

    useEffect(() => {
        fetchScratchpadByArtistId();
    }, [fetchScratchpadByArtistId]);

      
    const [isViewMode, setViewMode] = useState(true);
    // set blogText to what is saved in database. if nothing, set it to null.
    const [blogText, setBlogText] = useState(null);
    const saveBlog = () => {
        console.log("Rabbal is saving ", blogText);
        // Here instead of saving to local storage, we have to send it to backend.
        localStorage.setItem('content', serialize(blogText));
        
        // After saving the blog. We have to get back to viewing mode but for some reason setViewMode(true) is not working :(
        // setViewMode(true);
    }

    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState(
        // Here instead of reading from local storage, we have to get it from backend.
        localStorage.getItem('content') !== null ? deserialize(localStorage.getItem('content')) :
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
            {isViewMode ? (
                <div>
                    <p>This is a placeholder text. We have to replace it with text obtained from backend.</p>
                    <div className="scratchpad__buttonContainer">
                        <Button type="primary" onClick={setWritingMode}>Edit</Button>
                    </div>
                </div>
            ) : (
                <div className="scratchpad_container">
                    <div className="scratchpad_editorContainer">
                        <Slate
                            editor={editor}
                            value={value}
                            onChange={value => {
                                setBlogText(value)
                            }}
                        >
                            <Editable />
                        </Slate>
                    </div>
                    <div className="scratchpad__buttonContainer">
                        <Button type="primary" onClick={saveBlog}>
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default connector(ScratchpadPage);
