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
import GenericPageBanner from "@/components/genericPageBanner";
import { Collapse } from "antd";
import {
    generalFaqContent, 
    contestFaqContent, 
    collaborationFaqContent, 
    collaborationProposalFaqContent,
    inspirationHubFaqContent,
    securityAndAbuseFaqContent
} from "../../constants/faqs";

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


const FAQs = ({
    isLoggedIn,
    updateLoggedInData,
    loginModalDetails,
    user,
    artistListData,
    generalFaqContent,
    contestFaqContent,
    collaborationFaqContent,
    collaborationProposalFaqContent,
    inspirationHubFaqContent,
    securityAndAbuseFaqContent,
}) => {

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
                                                    <h5 className="common-h5-style f-19 mt-2 mb-2">General Questions</h5>
                                                    <div className="divider mb-2"> </div>
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
                                                    <h5 className="common-h5-style f-19 mt-2 mb-2">Art Contests</h5>
                                                    <div className="divider mb-2"> </div>
                                                </div>
                                                <div>
                                                    {getfaqCard(contestFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 grid-margin grid-margin-md-0">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="common-h5-style f-19 mt-2 mb-2">Inspiration Hub</h5>
                                                    <div className="divider mb-2"> </div>
                                                </div>
                                                <div>
                                                    {getfaqCard(inspirationHubFaqContent)}
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
                                                    <h5 className="common-h5-style f-19 mt-2 mb-2">Collaboration Requests</h5>
                                                    <div className="divider mb-2"> </div>
                                                </div>
                                                <div>
                                                    {getfaqCard(collaborationFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="common-h5-style f-19 mt-2 mb-2">Collaboration Proposals</h5>
                                                    <div className="divider mb-2"> </div>
                                                </div>
                                                <div>
                                                    {getfaqCard(collaborationProposalFaqContent)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 grid-margin grid-margin-md-0">
                                        <div className="faqCard">
                                            <div className="faq-block faqCard-body">
                                                <div className="container-fluid py-2">
                                                    <h5 className="common-h5-style f-19 mt-2 mb-2">Security and Abuse</h5>
                                                    <div className="divider mb-2"> </div>
                                                </div>
                                                <div>
                                                    {getfaqCard(securityAndAbuseFaqContent)}
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



export async function getStaticProps({ params }) {

    // Pass post data to the page via props
    return { props: { 
        generalFaqContent, 
        contestFaqContent, 
        collaborationFaqContent, 
        collaborationProposalFaqContent,
        inspirationHubFaqContent,
        securityAndAbuseFaqContent
     } }
}

export default connector(FAQs);