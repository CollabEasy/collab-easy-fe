import { Tabs, Input, Button, Comment } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card, Tag } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Link from "next/link";
import Image from 'next/image';
import headerImage from '../public/images/contest.svg';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    return { user, isLoggedIn, loginModalDetails }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const AllContestPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
}: Props) => {
    const { toContestPage } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();

    const getAllContests = () => {
        const resultArtists: JSX.Element[] = [];
        resultArtists.push(
            <div className="row p-2 bg-white rounded contest-card">
                <Card
                    title="12 May 2023"
                    style={{ height: '100%' }}
                    extra={
                        <>
                            <Tag color="green">Accepting submission</Tag>
                            <a href={routeToHref(toContestPage("123"))}>Submit</a>
                        </>
                    }

                >
                    The theme for contest is Health Day
                </Card>
            </div>
        )
        for (var i = 0; i < 10; i++) {
            resultArtists.push(
                <div className="row p-2 bg-white rounded contest-card">
                    <Card
                        title="12 Jan 2023"
                        style={{ height: '100%' }}
                        extra={
                            <>
                                <Tag color="red">Not accepting submission</Tag>
                                <a href={routeToHref(toContestPage("123"))}>Details</a>
                            </>
                        }
                    >
                        The theme for contest was save planet
                    </Card>
                </div>
            )
        }
        return resultArtists;
    };


    return (
        <>
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }
            <div className="allContestPage_listingPagecontainer">
                <div className="allContestPage__listingPageCoverContainer">
                    <div className="row ">
                        <div className="col-sm-8" style={{ backgroundColor: "#F8F5E7" }}>
                            <div className="allContestPage_desktopCoverTextContainer">
                                <h1 className="common-h1-style">
                                    Artists, unite! Enter our competition and let the world see your talent.
                                </h1>
                                <h3 className="common-h3-style">
                                    Join our competition and let your creativity be the judge.
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
                <div className="col-md-12 listingContainer">
                    {getAllContests()}
                </div>
            </div>
        </>
    );
};

export default connector(AllContestPage);
