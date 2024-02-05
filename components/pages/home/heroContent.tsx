/* eslint-disable react/jsx-key */

import router, { useRouter } from "next/router";
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "components/routeContext";
import { updateLoginData } from "state/action";
import React, { useEffect, useState } from "react";
import { LoginModalDetails, User } from "types/model";
import { AppState } from "types/states";
import { openLoginModalAction } from "state/action";
import * as actions from "state/action";


const mapStateToProps = (state: AppState) => ({
    loginModalDetails: state.home.loginModalDetails,
    user: state.user.user,
    artistListData: state.home.artistListDetails,
    isLoggedIn: state.user.isLoggedIn,
    showCreateOrEditProposalModal: state.proposal.showCreateOrUpdateProposalModal
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateLoggedInData: (loginDetails: any) =>
        dispatch(updateLoginData(loginDetails)),
    openLoginModalAction: () => dispatch(openLoginModalAction()),
    setCurrentPathName: (path: string) => dispatch(actions.setCurrentPathName(path)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    loginModalDetails: LoginModalDetails;
    user: User;
} & ConnectedProps<typeof connector>;

const HeroContent = ({
    isLoggedIn,
    setCurrentPathName,

}) => {
    const router = useRouter();
    const {
        toTutorial,
        toAllContestPage,
        toMySearchPage,
        toGetInspired,
    } = useRoutesContext();

    const openLoginModal = () => {
        setCurrentPathName(router.asPath);
        router.push("/login");
    };

    return (
        <div className='homepage_heroContent'>
            <div className="intro">
                <h1 className="common-h1-style intro__title">
                    Reach Your Creative Hieghts
                </h1>
                <p className="common-p-style intro__subtitle">
                    Wondor is a global community of artists dedicated to creative excellence. Built by artists, for artists.
                </p>

                <button className="hero-content-button" style={{ backgroundColor: "black", color: "white" }} onClick={openLoginModal}>
                    Join for Free
                </button>
                <img className="intro__illustration" src="https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/NmyT5rVjFkaG-uB6S-uXug/Stepping_up.svg" alt="" />
            </div>

            <div className="slide-right">
                <div className="grow">
                    <h2 className="common-h2-style section__title grow__title">Grow Together</h2>
                    <p className="common-p-style">
                        Forge meaningful connections on our community platform by collaborating with fellow artists. Propose and explore creative ideas, because together, you create better
                        <br></br>
                        <Link href={routeToHref(toMySearchPage())} passHref>
                            Discover Collaborations &rarr;
                        </Link>
                    </p>
                </div>
            </div>

            <div className="arrow-1"></div>

            <div className="slide-left">
                <div className="feedback">
                    <h2 className="common-h2-style section__title feedback__title">
                        Get quality feedback
                    </h2>
                    <p className="common-p-style">
                        We are here for you. Participate in the weekly live events, get the tools and resources you need, and find friendships with people that have the same goal as you.
                        <br></br>
                        <Link href={routeToHref(toAllContestPage())} passHref>
                            Art Challenges &rarr;
                        </Link>
                    </p>
                </div>
            </div>

            <div className="arrow-2"></div>

            <div className="slide-right">
                <div className="learning">
                    <h2 className="common-h2-style section__title learning__title">
                        Start Creating immediately
                    </h2>
                    <p className="common-p-style">
                        Jumpstart your creativity effortlessly with us. Whether you're facing a creative block or low on energy, we deliver a constant stream of fresh ideas right to your inbox, giving you the inspiration you need to get started in no time.
                        <br></br>
                        <Link href={routeToHref(toGetInspired("all"))} passHref>
                            Inspiration Hub &rarr;
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroContent;