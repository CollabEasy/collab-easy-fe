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
import headerImage from '../public/images/popularCategories/artist.svg';
import * as actions from "state/action";
import Loader from "@/components/loader";



const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const categories = state.category.categories;
    const isFetchingCategories = state.category.isFetchingCategories;

    return { user, isLoggedIn, loginModalDetails, artistListData, categories, isFetchingCategories }
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

    const getAllContests = (allCategories) => {
        let data = allCategories.length != 0 ? allCategories : [];
        data.sort((a, b) => b.artName - a.artName);
        return data;
    };


    console.log(isFetchingCategories);
    console.log(categories);
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
                                <div className="col-sm-8" style={{ backgroundColor: "#ECCFD6" }}>
                                    <div className="allContestPage_desktopCoverTextContainer">
                                        <h1 className="common-h1-style">
                                            List of categories which are available on Wondor 😎
                                        </h1>
                                        <h3 className="common-h3-style">
                                            Find artists who are available and send them request to collaborate with you now!
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-4" style={{ backgroundColor: "#ECCFD6" }}>
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
                                bordered
                                itemLayout="horizontal"
                                dataSource={getAllContests(categories)}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<a href={toArtist().href + item.slug}>{item.artName}</a>}
                                            description={item.description}
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
