/* eslint-disable @next/next/no-img-element */
import React, { useCallback, ReactElement, useEffect, useState } from "react";
import { AppState, State } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User } from "types/model";
import * as action from "../state/action";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from "moment";
import { InputNumber, message, Tabs } from "antd";
import { Button } from "antd";
import {
    openLoginModalAction,
    updateArtistProfile,
    updateArtistPreference,
} from "state/action";
import { useRoutesContext } from "components/routeContext";

// Better alternative : https://docs.slatejs.org/walkthroughs/01-installing-slate
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

    const [testMessage, setTestMessage] = useState(null)
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    function fetchTestMessage() {
        setTestMessage("This is the blog");
    }

    useEffect(() => {
        fetchTestMessage()
    }, [])

    function clearEditor() {
        console.log("Clearing Editor")
        setEditorState(EditorState.createEmpty())
        convertContentToHTML();
    }

    function saveBlog() {
        console.log("Saving")
        console.log(editorState.getCurrentContent());
    }

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div>
            <div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
                <div className="scratchpad__buttonContainer">
                    <Button
                        type="primary"
                        htmlType="submit"
                    //   onClick={}
                    //   loading={}
                    > Save
                    </Button>
                    <Button htmlType="button"
                    //onClick={}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <div className="preview">
                <h2 className="f-20 ">Preview</h2>
                <div className="preview-text" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
            </div>
        </div>
    )
};

export default connector(ScratchpadPage);
