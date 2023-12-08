import Image from "next/image";
import { Button, Collapse } from "antd";
import Link from "next/link";
import contactUsImage from "public/images/contactUs.svg";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

import LoginModal from '../../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../../components/modal/newUserModal';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import GenericActionBanner from "@/components/genericActionBanner";
import GenericPageBanner from "@/components/genericPageBanner";

const { Panel } = Collapse;

const mapStateToProps = (state: AppState) => ({
    loginModalDetails: state.home.loginModalDetails,
    user: state.user.user,
    artistListData: state.home.artistListDetails,
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    loginModalDetails: LoginModalDetails,
    user: any,
    artistListData: any
} & ConnectedProps<typeof connector>;


const FAQs = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData, generalFaqContent, contestFaqContent }) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { toContactUs, toDiscover } = useRoutesContext();
    const [windowWidth, setWindowWidth] = useState(-1);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        setWindowWidth(window.innerWidth);
    }, [user])

    useEffect(() => {
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [artistListData]);

    const getfaqCard = (faqContent) => {
        return (
            <div className="row">
                <div style={{ width: "100%" }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12" >
                            <Collapse ghost accordion>
                                {faqContent.map((question, index) => (
                                    <Panel header={question.question} key={index}>
                                        <p className="common-p-style">{question.answer}</p>
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Layout
            title={"FAQs | Wondor"}
            name={"description"}
            content={"We are happy to help you with any concern you may have or suggestions you would like to share. Here are some of the commanly asked questions. Contact us for any other question you may have."}
        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            <div className="genericPageLayout_container">
                {windowWidth > 500 &&
                    <GenericBreadcrumb
                        page={"Frquently Asked Questions"}
                    />
                }
                <div className="faq-section-container">
                    <GenericPageBanner
                        heading="How can we help you today?"
                        paragraph="Welcome to  Wondor's help center. If any of your questions is not answered here, please contact us without any hesitation."
                    />

                    <div className="container" style={{ paddingTop: "4%" }}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 grid-margin">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="mb-0">General Questions</h5>
                                                </div>
                                                <div>
                                                    {getfaqCard(generalFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 grid-margin grid-margin-md-0">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="mb-0">Art Contests</h5>
                                                </div>
                                                <div>
                                                    {getfaqCard(contestFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row">
                                    <div className="col-12 grid-margin">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="mb-0">Section 2</h5>
                                                </div>
                                                <div>
                                                    {getfaqCard(generalFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="mb-0">Section 4</h5>
                                                </div>
                                                <div>
                                                    {getfaqCard(generalFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const generalFaqContent = [
    {
        question: "What is Wondor.art?",
        answer: "Wondor.art is a platform that connects artists with other artists who are available for collaboration, provides a space for artists to create collaboration proposals, participate in monthly contests, and find inspiration for their work. Wether you are painter, singer, musician, writer etc, Wondor serves for all of your artsy needs."
    },
    {
        question: "Why should I use Wondor.art?",
        answer: "Wondor is a one-stop destination for all of your artsy needs. There are many benefits to using Wondor, including seemless process for discovering artists up for collaboration to managing collaboration requests. If you are stuck in creativity block, you can use Inspiration Hub where latest trending themes, ideas are shared on weekly basis. You can pariticpate in our monthly art challenges to showcase your skill and win exclusive prizes. There are offering and you can learn about them as you start exploring Wondor's wonderful world."
    },
    {
        question: "How can I find artists to collaborate with?",
        answer: "You can simply use our search feature to find artists by their name or listed for a specific collab catgeory that you are interested in. Browse through the list and send collab requests using the easy-to-use collab tool."
    },
    {
        question: "What types of projects are suitable for collaboration?",
        answer: "Any artist with a set of skills can collaborate with other. Visual arts, music, literature, multimedia, design, cross-disciplinary, community art, performance, educational, and social impact projects are suitable for collaboration, fostering creativity across diverse creative fields."
    },
    {
        question: "How can I create a collaboration proposal?",
        answer: "To create a collaboration proposal, artists can simply fill out a form on the Wondor.art website. The form will ask artists to provide information about their project, such as the title, a brief description, the skills required etc. Interested artists can then show interest. Once you have enough interest, you can start collaboration with interested artists within seconds."
    },
    {
        question: "How can I participate in monthly contests?",
        answer: "To participate in monthly contests, artists can simply submit their work to the Wondor.art website. The deadline for submitting entries will be posted on the website."
    },
    {
        question: "What is the Inspiration Hub?",
        answer: "The Inspiration Hub is a collection of resources that is designed to help artists find inspiration for their work. Here, we post latest content creation ideas to help artists move past their creativity block and start their next creative project."
    },
    {
        question: "What is Wondor's loyalty program?",
        answer: "The loyalty program is a program that rewards artists for helping to build the Wondor.art community. Artists can earn points by participating in contests, creating collaboration proposals, and referring other artists to the platform. Points can be redeemed for prizes, such as gift faqCards and discounts on Wondor.art services."
    },
    {
        question: "How much does Wondor.art cost?",
        answer: "Wondor.art is a free platform to use. There are no fees to create a profile, submit proposals, or participate in contests."
    },
    {
        question: "Who can use Wondor.art?",
        answer: "Wondor.art is open to all artists, content creators, regardless of their experience level."
    },
    {
        question: "How can I get started using Wondor.art?",
        answer: "To get started using Wondor.art, simply create a profile on the website. Once you have a profile, you can start connecting with other artists, creating collaboration proposals, and participating in contests."
    },
    {
        question: "Does Wondor.art have a mobile app?",
        answer: "No, Wondor.art does not have a mobile app. However, our website is mobile-responsive, which means you can easily access all collaboration tools on your smartphone or tablet."
    }
]


const contestFaqContent = [
    {
        question: "Who can participate in the contest?",
        answer: "Anyone with a Wondor account can participate in our contests."
    },
    {
        question: "Are there any entry fees for the contest?",
        answer: "No, there are no entry fees for our contests."
    },
    {
        question: "What are the eligibility criteria for entering the contest?",
        answer: "Eligibility criteria vary for each contest. Some are open to all artists, while others may require specific skills. You can find detailed criteria in the contest description."
    },
    {
        question: "How are winners selected?",
        answer: "Winners are chosen by the contest host, primarily based on the quality, creativity, and originality of submissions. Adherence to the theme is crucial, and submissions not aligned with the theme will be rejected."
    },
    {
        question: "What are the prizes for the contest?",
        answer: "Prizes are determined by the host and may vary. Winners receive a gift card, and all participants receive 50 Wondor rewards points."
    },
    {
        question: "Is there a limit to the number of entries per participant?",
        answer: "Yes, each participant can submit only one entry."
    },
    {
        question: "Can I edit or withdraw my submission after it's been entered?",
        answer: "No, you cannot edit or withdraw your submission once it's been entered. Submissions are opened for voting by other participants upon submission."
    },
    {
        question: "How does the voting system work in contests?",
        answer: "Contests are open to all, and Wondor users and participants can vote for submissions to show their support for fellow participants."
    },
    {
        question: "Are winners decided solely based on votes?",
        answer: "No, votes are tokens of appreciation and not the sole deciding factor in choosing the winner."
    },
];


export async function getStaticProps({ params }) {

    // Pass post data to the page via props
    return { props: { generalFaqContent, contestFaqContent } }
}

export default connector(FAQs);