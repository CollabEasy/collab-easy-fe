import { Tabs, Input, Button, Comment } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import SamplePage from "@/components/samplePage";
import { Card } from 'antd';
import Image from 'next/image';
import sampleImage from '../../public/images/mobile-landing.svg';

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

const ContestPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
}: Props) => {

    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();
    const { id: contestId } = router.query;


    const getSubmissions = () => {
        const resultArtists: JSX.Element[] = [];
        for (var i = 0; i < 10; i++ ){ 
            resultArtists.push(
                <div className='contestDetailPage_sampleTile'>
                    <Card style={{ height: '100%' }} cover={<Image src={sampleImage} alt="cards" />}>
                    <Meta className="common-text-style" title={<span style={{ whiteSpace: 'initial' }}>Searching for an idea? We got you covered 🥳 </span>} />
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
            {!isLoggedIn ? (
                <>
                    <NotAuthorised />
                </>
            ) : (
                <div className="contestDetailPage_container">
                    <Tabs type="card" centered>
                        <TabPane tab="Submit your work" key="1">
                            <div className="contestDetailPage_tabContainer">
                                <p>
                                    You can submit only one art piece to this contest. 
                                    Make sure this is your best and final work.
                                </p>
                                <SamplePage
                                    isSelf
                                    samples={[]}
                                    user={user}
                                    showLoader={false}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Leaderboard" key="2">
                            <div className="contestDetailPage_tabContainer">
                                <p>
                                    200 artists have submitted their work, dont miss out and submit your work now!
                                </p>
                                <div className="contestDetailPage_submissionTabContainer">
                                    {getSubmissions()}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            )}
        </>
    );
};

export default connector(ContestPage);
