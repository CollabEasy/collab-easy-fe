import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import { Card } from 'antd';
import Image from 'next/image';
import LoginModal from './modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { openLoginModalAction, updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from './modal/newUserModal';
import notFoundImage from '../public/images/not-found.svg';
import { useRouter } from "next/router";

const mapStateToProps = (state: AppState) => ({
    loginModalDetails: state.home.loginModalDetails,
    user: state.user.user,
    artistListData: state.home.artistListDetails,
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openLoginModalAction: () => dispatch(openLoginModalAction()),
    updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    loginModalDetails: LoginModalDetails,
    user: any,
    artistListData: any
} & ConnectedProps<typeof connector>;


const GenericActionBanner = ({
    isLoggedIn,
    updateLoggedInData,
    openLoginModalAction,
    loginModalDetails,
    user,
    artistListData
}: Props) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { toContactUs, toFAQ } = useRoutesContext();

    const router = useRouter();
    const openLogin = () => {
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
                <div className="row d-flex justify-content-center actionBanner-cover">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                                <div style={{ padding: "10px" }}>
                                    <Image
                                        src={notFoundImage}
                                        height={200}
                                        width={200}
                                        alt="Checkout Wondor.art FAQs section or reach out to let the team help you."
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6 col-sm-12">
                                <div className="actionBanner-cnt">
                                    <div className="actionBanner-text text-center">
                                        <h3 className="common-h3-style">
                                            Got a question? Do not worry!
                                        </h3>
                                        <p className="common-p-style">
                                            Checkout our FAQs section or reach out to us and let us know how we can help you.
                                        </p>
                                    </div>
                                    <div className="actionBanner-button-group">
                                        <Button
                                            type="primary"
                                            className="common-btn-dimension actionBanner-button"
                                        >
                                            <Link
                                                href={routeToHref(toFAQ())}
                                                passHref
                                            >FAQs
                                            </Link>
                                        </Button>
                                        <Button
                                            className="common-btn-dimension actionBanner-button"
                                            onClick={openLogin}
                                        >
                                            Join Now
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

export default connector(GenericActionBanner);