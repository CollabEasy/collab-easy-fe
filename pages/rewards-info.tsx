import { Tabs, Input } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card, Tag } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Image from 'next/image';
import headerImage from '../public/images/contest.svg';
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetContestStatus } from "helpers/contest";
import Layout from "@/components/layout";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const contests = state.contest;
    const isFetchingContest = state.contest.isFetchingContest;
    return { user, isLoggedIn, artistListData, loginModalDetails, contests, isFetchingContest }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllContests: () =>
        dispatch(actions.fetchAllContests()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const RewardsInfoPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    isFetchingContest,
    fetchAllContests,
}: Props) => {
    const { toDiscover } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [user, artistListData]);

    return (
        <Layout
            title={"Rewards for You | Wondor"}
            name={"description"}
            content={"Lean how to earn reward points and redeem them for real money. Join Wondor now to start earning."}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            <>
                <div className="allContestPage_listingPagecontainer">
                    <div className="allContestPage__listingPageCoverContainer">
                        <div className="row ">
                            <div className="col-sm-8" style={{ backgroundColor: "#F8F5E7" }}>
                                <div className="allContestPage_desktopCoverTextContainer">
                                    <h1 className="common-h1-style">
                                        Artists, unite! Enter our contest and let the world see your talent 😎
                                    </h1>
                                    <h3 className="common-h3-style">
                                        Join our contest and let your creativity be the judge!
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-4" style={{ backgroundColor: "#F8F5E7" }}>
                                <Image
                                    alt="Image Alt"
                                    className="discoverArtists_desktopCoverImageContainer"
                                    src={headerImage}
                                    layout="responsive"
                                    objectFit="contain" // Scale your image down to fit into the container
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default connector(RewardsInfoPage);
