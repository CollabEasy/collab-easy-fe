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

type Props = {} & ConnectedProps<typeof connector>;

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
                <h1 className="intro__title">
                    Reach Your Creativity Goals, Step by Step
                </h1>
                <p className="common-p-style intro__subtitle">
                    Wondor is a global community of artists dedicated to creative excellence. Built by artists, for artists.
                </p>

                <button className="hero-content-button" style={{ backgroundColor: "black", color: "white" }} onClick={openLoginModal}>
                    Join for Free
                </button>
                {/* eslint-disable @next/next/no-img-element */}
                <img className="intro__illustration" src="https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/NmyT5rVjFkaG-uB6S-uXug/Stepping_up.svg" alt="" />
            </div>

            <div className="curved-div upper">
                <svg viewBox="0 0 1440 319">
                    <path fill="#CBE6EF" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="curved-div">
                <h1>
                    Artistic growth made easy
                </h1>
                <p className="common-p-style">
                    At Wondor, we prioritize your creativity. Let your magic shine while we handle details. Explore collaborations, join contests, and stay inspired with weekly art ideas. We&apos;re here to empower your craft and support your journey.
                </p>
                <svg viewBox="0 0 1440 319">
                    <path fill="#fff" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="heropage-background">
                <div className="slide-right">
                    <div className="grow">
                        <h2 className="common-h2-style section__title grow__title">
                            Grow Together
                            <div className="homepage-heading-line"></div>
                        </h2>
                        <p className="common-p-style">
                            Forge meaningful connections on our community platform by collaborating with fellow artists who have the same goal as you. Propose and explore creative collaboration ideas, because together, you create better.
                            <br></br>
                            <Link href={routeToHref(toMySearchPage())} passHref>
                                Discover Collaborations &rarr;
                            </Link>
                        </p>
                    </div>
                </div>

                {/* <div className="arrow-1"></div> */}

                <div className="slide-left">
                    <div className="feedback">
                        <h2 className="common-h2-style section__title feedback__title">
                            Showcase Your Skills
                            <div className="homepage-heading-line"></div>
                        </h2>
                        <p className="common-p-style">
                            We are here for you. Participate in our monthy challenges to compete, and win! Join for a chance to showcase your talent, learn from peers, and claim exclusive prizes.
                            <br></br>

                            <Link href={routeToHref(toAllContestPage())} passHref>
                                Art Challenges &rarr;
                            </Link>
                        </p>
                    </div>
                </div>

                {/* <div className="arrow-2"></div> */}

                <div className="slide-right">
                    <div className="learning">
                        <h2 className="common-h2-style section__title learning__title">
                            Start Creating immediately
                            <div className="homepage-heading-line"></div>
                        </h2>
                        <p className="common-p-style">
                            Jumpstart your creativity effortlessly with us. Whether you&apos;re facing a creative block or low on energy, we deliver a constant stream of fresh ideas right to your inbox, giving you the inspiration you need to get started in no time.
                            <br></br>
                            <Link href={routeToHref(toGetInspired("all"))} passHref>
                                Inspiration Hub &rarr;
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContent;