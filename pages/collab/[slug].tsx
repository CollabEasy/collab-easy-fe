import React from "react";
import { Tabs, Input, Button, Comment } from "antd";
import Image from "next/image";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import { CloseOutlined, CheckOutlined, StarFilled } from "@ant-design/icons";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import * as action from "../../state/action";
import * as artistApi from "api/artist-user";
import { useEffect, useState } from "react";
import CollabDetailCard from "../../components/collabDetailCard";
import Loader from "../../components/loader";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { GetUserSkills } from "helpers/artistHelper";
import { ConvertTimestampToDate } from 'helpers/collabCardHelper';
import { GetCollabRequest, GetCollaboratorInfoFromCollab, DoHideNewCommentBox } from 'helpers/collabPageHelper';
import Layout from "@/components/layout";
import { GetPendingCollabRequest } from "helpers/profilePageHelper";
import Link from "next/link";
import SendCollabRequestModal from "@/components/modal/sendCollabRequestModal";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const collab = state.collab;
    const isFetchingCollabs = state.collab.isFetchingCollabDetails;
    const showCollabModal = state.collab.showCollabModal;
    return { user, collab, isLoggedIn, loginModalDetails, isFetchingCollabs, showCollabModal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCollabRequestsAction: (data: SearchCollab) => dispatch(action.getCollabRequestsAction(data)),
    setShowCollabModalState: (show: boolean, id: string) => dispatch(action.setShowCollabModalState(show, id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const SendCollabRequestPage = ({
    user,
    collab,
    isLoggedIn,
    loginModalDetails,
    isFetchingCollabs,
    showCollabModal,
    getCollabRequestsAction,
    setShowCollabModalState,
}: Props) => {
    const emptyCollabDetails: CollabRequestData = {
        id: "",
        senderId: "",
        receiverId: "",
        collabDate: undefined,
        requestData: {
            message: "",
            collabTheme: ""
        },
        status: "",
        createdAt: undefined,
        updatedAt: undefined
    };

    const [isSelf, setIsSelf] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [userIdForCollab, saveUserIdForCollab] = useState("");
    const [hasPendingCollab, setHasPendingCollab] = useState(false);
    const [collabDetails, setCollabRequestDetails] = useState<CollabRequestData>(emptyCollabDetails);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [otherUser, setOtherUser] = useState<User>({});
    const [upForCollab, setCollaborationStatus] = useState(true);

    const router = useRouter();

    useEffect(() => {
        async function fetchOtherUser() {
            let res = await artistApi.fetchUserByHandle(slug.toString());
            if (res.data !== undefined) {
                setOtherUser(res.data);
                setCollaborationStatus(
                    res.data.up_for_collab === "true" ? true : false
                );
            }
        }

        const { slug: slug } = router.query;
        if (user.slug === slug) {
            setIsSelf(true);
            setHasPendingCollab(false);
            setCollabRequestDetails(emptyCollabDetails);
        } else {
            setShowLoader(true);
            setIsSelf(false);
            fetchOtherUser();
            getCollabRequestsAction({
                otherUserId: otherUser.artist_id,
            });
        }
        setShowLoader(false);
    }, [router.query, user.slug]);

    useEffect(() => {
        setHasPendingCollab(false);
        setCollabRequestDetails(emptyCollabDetails);
        if (!isFetchingCollabs && !isSelf) {
            // you are checking someone else page therefore fetch collab status.
            var filteredCollab = GetPendingCollabRequest(
                collab,
                user.artist_id,
                otherUser.artist_id,
            );

            if (filteredCollab.id !== "") {
                // empty collab receieved.
                setCollabRequestDetails(filteredCollab);
                setHasPendingCollab(true);
            }
        }
    }, [collab, user.artist_id]);

    if (
        showLoader ||
        (isSelf && Object.keys(user).length === 1) ||
        (!isSelf && (!otherUser || Object.keys(otherUser).length === 0))
    ) {
        return <Loader />;
    }

    const setUserIdForCollab = (userId) => {
        saveUserIdForCollab(userId);
    }

    // data from prismic.io returns the image src as an absolute url, so no need to set up the full url on loader....
    const prismicLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <Layout
            title={
                "Send collab request to " +
                (isSelf ? user.last_name : otherUser.last_name) +
                " | Wondor"
            }
            name={"description"}
            content={
                "Work with " +
                (isSelf ? user.first_name : otherUser.first_name) +
                " " +
                (isSelf ? user.last_name : otherUser.last_name) +
                ". Send them a collaboration request | Wondor"
            }
        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )}
            {isFetchingCollabs ? (
                <Loader />
            ) : (
                <>
                    <div>
                        <div>
                            <div className="fluid requestPageContainer">
                                <div className="col-md-12 requestContainer">
                                    <div className="row p-2 bg-white border rounded artits-card">
                                        <div className="col-md-3 mt-1 artist-profile-picture">
                                            <Image
                                                loader={prismicLoader}
                                                src={otherUser?.profile_pic_url}
                                                alt="cards"
                                                className="img-fluid img-responsive rounded"
                                                height={150}
                                                width={150}
                                            />
                                        </div>

                                        <div className="col-md-6 mt-1 common-text-style">
                                            <h5 className="common-h5-style">{otherUser.first_name} {otherUser?.last_name}</h5>
                                            <div className="mt-1 mb-1 spec-1">
                                                {GetUserSkills(otherUser.skills)}
                                            </div>
                                        </div>
                                        <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                                            <div className="mt-1 mb-1 spec-1">
                                                {otherUser.up_for_collab == "false" ? (
                                                    <span className="common-text-style"><CloseOutlined style={{ color: 'red', margin: '5px' }} />Not available to collab! </span>
                                                ) : (
                                                    <span className="common-text-style"><CheckOutlined style={{ color: 'green', margin: '5px' }} />Available to collab! </span>
                                                )}
                                            </div>
                                            <div className="d-flex flex-column mt-4">
                                                {!isLoggedIn && (
                                                    <div className="login-message">
                                                        <p>Please, login to send a collab request</p>
                                                    </div>
                                                )}
                                                {hasPendingCollab && (
                                                    <>
                                                        {collabDetails.status === "PENDING" ? (
                                                            <span className="common-text-style">
                                                                <StarFilled style={{ color: "orange", margin: "5px" }} />
                                                                You have a pending collab request.
                                                            </span>
                                                        ) : (
                                                            <span className="common-text-style">
                                                                <StarFilled style={{ color: "orange", margin: "5px" }} />
                                                                You have an active collab request.
                                                            </span>
                                                        )}
                                                        <Button
                                                            block
                                                            className="common-medium-btn"
                                                            type="primary"
                                                            style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
                                                            onClick={() => {
                                                                router.push(`/collab/details/${collabDetails.id}`);
                                                            }}
                                                        >
                                                            Go to details
                                                        </Button>
                                                    </>
                                                )}
                                                {!isSelf && !hasPendingCollab && (
                                                    <Button
                                                        block
                                                        className="common-medium-btn"
                                                        type="primary"
                                                        disabled={otherUser.up_for_collab == "false" || !isLoggedIn || hasPendingCollab}
                                                        style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
                                                        onClick={() => {
                                                            setShowCollabModalState(true, '');
                                                            setUserIdForCollab(otherUser.artist_id);
                                                        }}
                                                    >
                                                        Send collab request
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showCollabModal.show && (
                <div className="padding20">
                <SendCollabRequestModal
                    edit
                    otherUser={userIdForCollab}
                    collabDetails={collabDetails}
                    onCollabRequestSend={() => {
                        
                    }}
                />
                </div>
            )}
        </Layout>
    );
};

export default connector(SendCollabRequestPage);
