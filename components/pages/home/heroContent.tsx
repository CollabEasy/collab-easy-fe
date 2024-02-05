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
        toMySearchPage,
    } = useRoutesContext();

    const openLoginModal = () => {
        setCurrentPathName(router.asPath);
        router.push("/login");
    };

    return (
        <div className='homepage_heroContent'>
            <section className="intro">
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
            </section>

            <section id="how-it-works" className="grow">
                <h2 className="common-h2-style section__title grow__title">Grow Together</h2>
                <p className="common-p-style">
                    Start a meaningful conversation in our community platform, ask questions when you’re stuck and get help from a
                    real person. Get answers fast, no matter your question.
                </p>
            </section>
            <div className="arrow-1"></div>
            <section className="get-feedback">
                <h2 className="section__title get-feedback__title">
                    Get quality feedback
                </h2>
                <p>
                    We are here for you. Participate in the weekly live events, get the tools and resources you need, and find
                    friendships with people that have the same goal as you.
                </p>
                <svg width="519" height="366" viewBox="0 0 519 366" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">

                </svg>
            </section>
            <div className="arrow-2"></div>
            <section className="learning">
                <h2 className="section__title learning__title">
                    Start learning immediately
                </h2>
                <p>
                    It takes no time to start learning with us, This means, once you sign up for an account, you can start
                    learning immediately and get access to our community.
                </p>
                <svg width="598" height="323" viewBox="0 0 598 323" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">

                </svg>
            </section>
            <div id="get-started" className="get-started">
                <ul>
                    <li>
                        <svg width="80" height="56" viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

                        </svg>
                        <p><strong className="counter community-members">1.2</strong><strong>K+</strong></p>
                        <p>Community Members</p>
                    </li>
                    <li>
                        <svg width="56" height="65" viewBox="0 0 56 65" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

                        </svg>
                        <p><strong className="counter number-of-pages">1.9</strong><strong>K+</strong></p>
                        <p>Pages with content for you to learn</p>
                    </li>
                </ul>
            </div>
            <section className="start-learning">
                <h2 className="section__title">
                    Ready To Start Learning English?
                </h2>
                <a href="#" className="button">Get Started</a>
                <div className="video-learning">
                    <video muted id="video" className="video" poster="https://res.cloudinary.com/alexandracaulea/image/upload/v1583497256/video-poster_lkwsdg.jpg">
                        <source src="https://res.cloudinary.com/alexandracaulea/video/upload/v1583497287/video-learning_vpohou.mp4" type="video/mp4" />
                    </video>
                    <div className="video-controls">
                        <div className="progress">
                            <div className="progress-fill"></div>
                        </div>
                        <button className="video-button toggle" title="Play">►</button>
                        <button data-skip="-5" className="video-button" aria-label="Skip backward 5 seconds">« 5s</button>
                        <button data-skip="5" className="video-button" aria-label="Skip forward 5 seconds">5s »</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroContent;