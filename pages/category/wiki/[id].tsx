import { Button } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import Image from 'next/image';
import detailsImage from '../../../public/images/contestDetails.svg';
import { useRoutesContext } from "components/routeContext";
import { GetListingHeaderData } from "helpers/listingPageHelper";
import { GetCategoryWikiData } from "helpers/categoryHelper";

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    return { user, artistListData, loginModalDetails }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const CategoryPage = ({
    user,
    loginModalDetails,
    artistListData,
}: Props) => {
    const router = useRouter();
    const { id: slug } = router.query;
    const { toArtist } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [categoryMetadata, setCategoryMetadata] = useState(GetListingHeaderData(slug));
    const [categoryWikidata, setCategoryWikiData] = useState(GetCategoryWikiData(slug));

    useEffect(() => { }, []);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [user, artistListData])

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
            <>
                {"name" in categoryWikidata ? (
                    <div className="categoryDetailPage_container">
                        <div className="responsive-two-column-grid">
                            <div style={{ margin: "4px", borderRadius: "5px", background: categoryMetadata["background_color"] }}>
                                <Image
                                    alt="Image Alt"
                                    src={categoryMetadata["image"]}
                                    layout="responsive"
                                    objectFit="contain" // Scale your image down to fit into the container
                                />
                            </div>
                            <div className="categoryDetailPage_tabContainer">
                                <b className="common-text-style">
                                    <h1>{categoryWikidata["name"]}</h1>
                                </b>
                                <p className="common-p-style">
                                    {categoryWikidata["paragraph"]}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="categoryDetailPage_container">
                        <h5 style={{ textAlign: "center" }} className="common-h5-text">We are working on adding wiki for the selected category. In meantime, explore others!</h5>
                    </div>
                )}
            </>
        </>
    );
};

export default connector(CategoryPage);
