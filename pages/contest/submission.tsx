/* eslint-disable @next/next/no-img-element */
import { Breadcrumb } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { routeToHref } from "config/routes";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import * as action from "../../state/action";
import Loader from "@/components/loader";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import Layout from "@/components/layout";
import Confetti from "@/components/asset/confettiAnimation";

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;

    const allSubmissions = state.contestSubmission.allSubmissions;
    const isFetchingSubmissions = state.contestSubmission.isFetchingSubmissions;

    return {
        user,
        isLoggedIn,
        artistListData,
        loginModalDetails,
        allSubmissions,
        isFetchingSubmissions
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchContestSubmissions: (slug: string) =>
        dispatch(action.fetchContestSubmissions(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ContestPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    allSubmissions,
    isFetchingSubmissions,
    artistListData,
    fetchContestSubmissions
}: Props) => {

    const router = useRouter();
    const { contest: contest, artist: artist } = router.query;
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(-1);
    const { toDiscover, toAllContestPage, toContestPage, toArtistProfile, toContestSubmissionPage } = useRoutesContext();

    useEffect(() => {
        fetchContestSubmissions(contest as string);
    }, [contest, artist]);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
        setWindowWidth(window.innerWidth);
    }, [user, artistListData]);

    const getBreadcrum = (contestSlug: string) => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href={toDiscover().href}>Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href={toContestPage(contestSlug, "details").as}>{contestSlug}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    submission
                </Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    const getSubmissionComponent = () => {
        if (allSubmissions.length === 0) {
            return <></>
        }

        let selectedSubmission = {};
        if (allSubmissions.length !== 0) {
            allSubmissions[0].data.forEach((submission) => {
                if (submission.slug === artist) {
                    selectedSubmission = submission
                }
            });
        }
        return (
            <div className="genericPageLayout_container">
                {windowWidth > 500 && (
                    <>{getBreadcrum(selectedSubmission["submission"].contestSlug)}</>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', overflow: 'auto', maxWidth: '100%' }}>
                        <img src={selectedSubmission["submission"].artworkUrl} alt="Submitted Image" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <div>
                            <Link
                                href={routeToHref(toArtistProfile(selectedSubmission["slug"]))}
                            >
                                <h3 className="common-h3-style cursor-pointer text-decoration-underline">{selectedSubmission["firstName"]}{" "}{selectedSubmission["lastName"]} </h3>
                            </Link>
                            <p className="common-p-style">{selectedSubmission["submission"].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Layout
            title={"Enter now and win exclusize prizes on Wondor"}
            name={"description"}
            content={
                "Calling all artists to join our monthy contest. The theme is Enter now, showcase your creativity and win exciting prizes."
            }
        >
            <>
                {loginModalDetails.openModal && !user.new_user && <LoginModal />}
                {showProfileModal && <NewUserModal />}

                {
                    isFetchingSubmissions ?
                        (
                            <Loader />
                        ) : (
                            <>
                                <Confetti />
                                {getSubmissionComponent()}
                            </>
                        )}
            </>
        </Layout>
    );
};

export default connector(ContestPage);
