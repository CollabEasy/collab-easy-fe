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
import detailsImage from '../../public/images/contestDetails.svg';
import { FireOutlined } from '@ant-design/icons';

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
        for (var i = 0; i < 10; i++) {
            resultArtists.push(
                <div className='contestDetailPage_sampleTile'>
                    <Card
                        style={{ height: '100%' }}
                        cover={<Image src={sampleImage} alt="cards" />}
                        actions={[
                            <FireOutlined key="upvote" />,
                        ]}
                    >
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

            <div className="contestDetailPage_container">
                <Tabs type="card" centered>
                    <TabPane tab="Contest details" key="1">

                        <div className="responsive-two-column-grid">
                            <div>
                                <Image
                                    alt="Image Alt"
                                    src={detailsImage}
                                    layout="responsive"
                                    objectFit="contain" // Scale your image down to fit into the container
                                />
                            </div>
                            <div className="contestDetailPage_tabContainer">
                                <b className="common-text-style">
                                    Unleash your inner artist on Wonder - the platform for collaborative culture among artists. 
                                    Connect and express yourself with fellow art enthusiasts, and participate 
                                    in our monthly contests for inspiration to create something new and exciting. 
                                    Join us and discover the power of art to bring people together.
                                </b>
                                <br></br><br></br>

                                <h2 className="common-h1-style">
                                    Contest Details
                                </h2>
                                <p className="common-p-style">
                                    <b>Theme:</b> Little description of the contest
                                </p>
                                <p className="common-p-style">
                                    <b>Duration:</b> 1 week
                                </p>
                                <p className="common-p-style">
                                    <b>Start date:</b> 12-01-2023
                                </p>
                                <p className="common-p-style">
                                    <b>End date:</b> 12-01-2023
                                </p>

                                <h2 className="common-h2-style">Rules and Regulations:</h2>
                                <ul className="common-text-style">
                                    <li>Any artist with a valid account on Wondor is eligible to participate.</li>
                                    <li>Your work should be inspired from the theme of the contest.</li>
                                    <li>Submit an image of your artwork. You can submit only one piece for the contest.</li>
                                    <li>You work will be judged by other artists on the platform. Final decision will include things like creativity, technique, adherence to the theme, and overall impact.</li>
                                    <li>You will be disqualified from the contest for plagiarism, offensive content, or failure to adhere to the rules and guidelines</li>
                                    <li> You can also send in your queries in an email to wondor4creators@gmail.com, during the contest.</li>
                                </ul>

                                <h2 className="common-h2-style">Prize</h2>
                                <p className="common-p-style">We believe anyone who participates is a winner. However, we will give an 
                                    amazon gift card to 3 artists whose work is most upvoted.</p>
                                <p className="common-p-style">
                                    <b>1st winner:</b> USD 20
                                </p>
                                <p className="common-p-style">
                                    <b>2nd winner</b> USD 15
                                </p>
                                <p className="common-p-style">
                                    <b>3rd winner</b> USD 10
                                </p>

                                <b className="common-text-style">Are you ready? Let your imagination soar and join the ultimate art showdown!"</b>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Submit your work" key="2">
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
                    <TabPane tab="Leaderboard" key="3">
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
        </>
    );
};

export default connector(ContestPage);
