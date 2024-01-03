import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Image from 'next/image';
import LoginModal from '../modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { openLoginModalAction, setCurrentPathName, updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../modal/newUserModal';
import pageBannerImage from '../public/images/mobile-landing.svg';
import router from "next/router";

const mapStateToProps = (state: AppState) => ({
    loginModalDetails: state.home.loginModalDetails,
    user: state.user.user,
    artistListData: state.home.artistListDetails,
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openLoginModalAction: () => dispatch(openLoginModalAction()),
    updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
    setCurrentPathName: (path: string) => dispatch(setCurrentPathName(path)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    loginModalDetails: LoginModalDetails,
    user: any,
    artistListData: any
    heading: string
    paragraph: string
} & ConnectedProps<typeof connector>;


const GenericPageBanner = ({
    isLoggedIn,
    updateLoggedInData,
    openLoginModalAction,
    loginModalDetails,
    user,
    heading,
    paragraph,
    setCurrentPathName,
    artistListData
}: Props) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { toContactUs } = useRoutesContext();

    const openLoginModal = () => {
        setCurrentPathName(router.asPath);
        router.push("/login");
    };

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
    }, [user])

    useEffect(() => {
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [artistListData]);

    // https://bootdey.com/snippets/view/blog-page#html
    return (
        <>

            <div style={{ width: "100%" }}>
                <div className="row d-flex justify-content-center pageBanner-cover">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                                    <Image
                                        src="https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/KVSqk1x-kEuZo9pMZLBaGw/Group.svg"
                                        height={386}
                                        width={500}
                                        unoptimized={true}
                                        alt="4 steps to start using wondor for your next collaboration"
                                        priority
                                    />
                            </div>
                            <div className="col-lg-8 col-md-6 col-sm-12">
                                <div className="pageBanner-cnt">
                                    <div className="pageBanner-text text-center">
                                        <h3 className="common-h3-style">
                                            {heading}
                                        </h3>
                                        <p className="common-p-style">
                                            {paragraph}
                                        </p>
                                    </div>
                                    <div className="pageBanner-button-group twoButtonsSpacing">
                                        <Button
                                            type="primary"
                                            className="common-btn-dimension pageBanner-button"
                                            onClick={openLoginModal}
                                        >
                                            Join Now
                                        </Button>
                                        <Button className="common-btn-dimension pageBanner-button">
                                            <Link
                                                href={routeToHref(toContactUs())}
                                                passHref
                                            >Ask Question</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connector(GenericPageBanner);