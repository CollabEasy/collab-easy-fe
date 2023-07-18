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
    const [showProfileModal, setShowProfileModal]   = useState(false);
    const [categoryMetadata, setCategoryMetadata] = useState(GetListingHeaderData(slug));

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
                <div className="categoryDetailPage_container">
                    <div className="responsive-two-column-grid">
                        <div style={{margin: "4px", borderRadius: "5px", background: categoryMetadata["background_color"]}}>
                            <Image
                                alt="Image Alt"
                                src={categoryMetadata["image"]}
                                layout="responsive"
                                objectFit="contain" // Scale your image down to fit into the container
                            />
                        </div>
                        <div className="categoryDetailPage_tabContainer">
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
                                <b>Theme:</b>
                            </p>
                            <h2 className="common-h2-style">Rules and Regulations:</h2>
                            <b className="common-text-style">Are you ready? Let your imagination soar and join the ultimate art showdown!</b>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default connector(CategoryPage);
