import { List } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Link from "next/link";
import Image from 'next/image';
import headerImage from '../public/images/contest.svg';
import * as actions from "state/action";
import Loader from "@/components/loader";



const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const categories = state.category.categories;
    const isFetchingCategories = state.category.isFetchingCategories;

    return { user, isLoggedIn, loginModalDetails, artistListData, categories, isFetchingCategories}
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllCategories: () => dispatch(actions.getAllCategories()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const AllCategoryPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    categories,
    isFetchingCategories,
    getAllCategories,
}: Props) => {
    const { toArtist } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [allCategories, setAllCategory] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getAllCategories();
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
        setAllCategory(categories);
    }, [user, artistListData, categories]);

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    const getAllContests = (allCategories) => {
        const resultArtists: JSX.Element[] = [];
        const now = new Date();
        let data = allCategories.length != 0 ? allCategories[0].data : [];
        data.sort((a, b) => b.startDate - a.startDate);
        // data.forEach(contest => {
        //     let status = GetContestStatus(now.getTime(), contest.startDate, contest.endDate);
        //     resultArtists.push(
        //         <div className="row p-2 bg-white rounded contest-card">
        //             <Card
        //                 title={contest.title}
        //                 style={{ height: '100%' }}
        //                 extra={
        //                     <>
        //                         {status === "Ongoing" && (
        //                             <Tag color="green">{status}</Tag>
        //                         )}
        //                         {status === "Upcoming" && (
        //                             <Tag color="yellow">{status}</Tag>
        //                         )}
        //                         {status === "Past" && (
        //                             <Tag color="grey">{status}</Tag>
        //                         )}
        //                         {status === "Ongoing" ? (
        //                             <a href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Enter</a>
        //                         ) : (
        //                             <a href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Check details</a>
        //                         )}
        //                     </>
        //                 }
        //             >
        //                 <div>
        //                     {contest.description}
        //                 </div>
        //             </Card>
        //         </div>
        //     )
        // });
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
            {isFetchingCategories ? (
                <Loader />
            ) : (
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
                        <div className="col-md-12 listingContainer">
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default connector(AllCategoryPage);
