import React, { useState, useRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import router, { useRouter } from "next/router";
import Image from "next/image";
import { AppState } from "state";
import { Dispatch } from "redux";
import * as actions from "state/action/contestAction";
import { connect, ConnectedProps } from "react-redux";
import { getBase64, dataURLtoFile, getFileType } from "helpers/helper";
import {
    CameraOutlined,
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Upload, message, Modal, Button } from "antd";
import "cropperjs/dist/cropper.css";
import { User } from "types/model";
import { ContestEntry } from "types/model/contest";
import { updateProfilePicture } from "api/artist-user";
import UploadModal from "./modal/sampleUploadModal";
import Loader from "./loader";

const mapStateToProps = (state: AppState) => ({
    user: state.user,
    isLoggedIn: state.user.isLoggedIn,
    contest: state.contest,
    submissions: state.contestSubmission,
    userModel: state.user,
    isFetchingArtistSubmission: state.contestSubmission.isFetchingArtistSubmission,
    isUploading: state.contestSubmission.isUploading,
    isUploaded: state.contestSubmission.isUploaded,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

    fetchArtistSubmission: (constestSlug: string) =>
        dispatch(actions.fetchArtistSubmission(constestSlug)),

    uploadContestArtwork: (formData: FormData, contest: string) => dispatch(actions.addContestArtwork(formData, contest)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ContestArtworkSubmission = ({
    user,
    isLoggedIn,
    contest,
    submissions,
    userModel,
    isUploading,
    isUploaded,
    isFetchingArtistSubmission,
    fetchArtistSubmission,
    uploadContestArtwork,
}: Props) => {

    const router = useRouter();
    const { id: contestSlug } = router.query;
    const [editable, setEditable] = useState(true);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [uploadFile, setUploadFile] = useState(null);
    const [fileType, setFileType] = useState("");
    const cropperRef = useRef<ReactCropperElement>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showUploadingLoader, setShowUploadingLoader] = useState(false);

    const resetState = () => {
        setImageUrl("");
        setUploadFile(null);
        setCaption("");
        setShowUploadModal(false);
    };

    useEffect(() => {
        fetchArtistSubmission(contestSlug as string);
    }, []);

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            setLoading(false);
            getBase64(info.file.originFileObj).then((imageUrl: string) =>
                setImageUrl(imageUrl)
            );
            setUploadFile(info.file.originFileObj);
            setFileType(info.file.originFileObj.type);
            setShowUploadModal(true);
        }
        if (info.file.status === "error") {
            // Get this url from response in real world.
            setLoading(false);
            message.error("Error in uploading file");
        }
    };

    const handleSave = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setUploadFile(
                dataURLtoFile(
                    cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
                    "wondor-cropped" + uploadFile.name
                )
            );
            const canvas = cropperRef.current?.cropper.getCroppedCanvas();
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("filename", blob, "cropped.jpg");
                updateProfilePicture(formData);
            });
        }
    };

    const uploadButton = (
        <div
            className={`artistProfile_profilePicEditButton${showUploadingLoader ? "Uploading" : ""
                }`}
        >
            {showUploadingLoader ? (
                <LoadingOutlined style={{ marginTop: "26px" }} />
            ) : (
                <CameraOutlined style={{ marginTop: "26px" }} />
            )}
            <div style={{ marginTop: "8px" }}>
                {showUploadingLoader ? "Updating" : "Update"}
            </div>
        </div>
    );

    const prismicLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };

    const onClickUpload = () => {
        const formData = new FormData();

        formData.append("filename", uploadFile);
        formData.append("description", caption);
        formData.append("filetype", getFileType(fileType));
        uploadContestArtwork(formData, contestSlug as string);
    }

    const GetArtistSubmissionUrl = (artistSubmission) => {
        if (artistSubmission.length > 0 && artistSubmission[0].data.length > 0) {
            let submissionDetails = artistSubmission[0].data[0]
            return submissionDetails["artworkUrl"];
        }
        return "";
    }

    const GetArtistSubmissionDescription = (artistSubmission) => {
        if (artistSubmission.length > 0 && artistSubmission[0].data.length > 0) {
            let submissionDetails = artistSubmission[0].data[0]
            return submissionDetails["description"];
        }
        return "";
    }

    return (
        <>
            {isFetchingArtistSubmission ? (
                <Loader />
            ) : (
                <>
                    {showUploadModal && (
                        <UploadModal
                            user={user.user}
                            fileType={fileType}
                            caption={caption}
                            editable={editable}
                            file={uploadFile}
                            imageUrl={imageUrl}
                            isUploading={isUploading}
                            isUploaded={isUploaded}
                            onCancel={resetState}
                            onClickUpload={onClickUpload}
                            onChangeCaption={(caption: string) => {
                                setCaption(caption);
                            }}
                        />
                    )}
                    {GetArtistSubmissionUrl(submissions.artistSubmission).length === 0 &&
                        <>
                            <p className="common-p-style" style={{ textAlign: "center" }}>
                                You can submit only one art piece to this contest.
                                Make sure this is your best and final work.
                            </p>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                showUploadList={false}
                                accept="image/png, image/jpeg"
                                onChange={handleChange}
                            >
                                {uploadButton}
                            </Upload>
                        </>
                    }
                    {GetArtistSubmissionUrl(submissions.artistSubmission).length > 0 &&
                        <>
                            <p className="common-p-style" style={{ textAlign: "center" }}>
                                Thanks for submitting your work. It is now live for voting!
                            </p>
                            <Image
                                className={`artistProfile_profileImage${showUploadingLoader ? "Uploading" : ""
                                    }`}
                                loader={prismicLoader}
                                src={GetArtistSubmissionUrl(submissions.artistSubmission)}
                                alt="profile picture"
                                height={350}
                                width={350}
                                priority
                            />
                            <>
                                <p className="common-p-style" >
                                    {GetArtistSubmissionDescription(submissions.artistSubmission)}
                                </p>
                            </>
                        </>
                    }
                </>
            )}
        </>
    )
};

export default connector(ContestArtworkSubmission);
