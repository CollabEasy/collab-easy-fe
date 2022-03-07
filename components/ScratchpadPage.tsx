/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import { Dispatch } from "redux";
import { User } from "types/model";
import { useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate';
import { Button } from "antd";

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
    return {}
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    user: User;
} & ConnectedProps<typeof connector>;

const ScratchpadPage = ({
    user,
}: Props) => {
    const [isViewMode, setViewMode] = useState(true);
    const [blogText, setBlogText] = useState(null);
    const saveBlog = () => {
        console.log("Rabbal is saving ", blogText);
        // Here instead of saving to local storage, we have to send it to backend.
        localStorage.setItem('content', serialize(blogText));
        setViewMode(true);
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
                    <p>{serialize(blogText)}</p>
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
