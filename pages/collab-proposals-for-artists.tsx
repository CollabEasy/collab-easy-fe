import { Tabs, Input, Button } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import Image from "next/image";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetDateString } from "helpers/contest";
import Layout from "@/components/layout";
import detailsImage from "../public/images/proposal.svg";
import GenericBreadcrumb from "@/components/asset/genericBreadcrumb";
import CreateProposalModal from "@/components/modal/createProposalModal";
import { ProposalData } from "types/model/proposal";
import { GetProposalTags } from "helpers/proposalHelper";
import GenericActionBanner from "@/components/asset/genericActionBanner";
import FloatingButton from "@/components/asset/addFloatButton";
import { GetUserMightLikeCategories } from "helpers/searchPageHelper";
import Link from "next/link";
import { useLocation, useParams } from 'react-router-dom';
import { GetCategoryMetadata } from "helpers/categoryHelper";
import HeroSection from "@/components/asset/pageHeroSection";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const publishedCategories = state.category.publishedCategories;
    const proposal = state.proposal;
    const isFetchingAllProposals = state.proposal.isFetchingAllProposals;
    const showCreateOrEditProposalModal = state.proposal.showCreateOrUpdateProposalModal;
    return { user, publishedCategories, isLoggedIn, artistListData, loginModalDetails, proposal, isFetchingAllProposals, showCreateOrEditProposalModal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllCategories: () => dispatch(actions.getAllCategories()),
    fetchAllProposals: (categories: number[]) =>
        dispatch(actions.getAllProposals(categories)),
    setShowCreateOrUpdateProposalModal: (show: boolean) => dispatch(actions.setShowCreateOrUpdateProposalModal(show)),

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalsPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    proposal,
    publishedCategories,
    showCreateOrEditProposalModal,
    isFetchingAllProposals,
    fetchAllProposals,
    getAllCategories,
    setShowCreateOrUpdateProposalModal,
}: Props) => {

    const emptyProposalData: ProposalData = {
        title: "",
        description: "",
        artistId: "",
        status: "",
        proposalId: "",
        collabType: "",
        categories: [],
    };

    const { toArtistProfile, toProposalPage, toAllProposalsPage } = useRoutesContext();
    const [allProposals, setAllProposals] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [proposalData, setProposalData] = useState(emptyProposalData);
    const [windowWidth, setWindowWidth] = useState(-1);

    const router = useRouter();

    const { category } = router.query;

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        if (category === "all") {
            fetchAllProposals([]);
        } else {
            let selectedCategoryId = -1;
            publishedCategories.forEach((publishedCategory) => {
                if (publishedCategory["slug"] === category) {
                    selectedCategoryId = publishedCategory["id"];
                }
            })
            fetchAllProposals([selectedCategoryId]);
        }
    }, [category]);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
        setAllProposals(proposal.proposals);
        setWindowWidth(window.innerWidth);
    }, [artistListData, proposal.proposals]);

    const getSimilarCategories = () => {
        const similarCategoriesHtml: JSX.Element[] = [];
        if (category === "all") {
            publishedCategories.forEach((category) => {
                similarCategoriesHtml.push(
                    <div className="similar-catgeory-chip" style={{ paddingLeft: "2px", paddingTop: "15px" }}>
                        <Button>
                            <Link
                                href={toAllProposalsPage(category["slug"]).as}
                                passHref
                            >
                                {category["artName"]}
                            </Link>
                        </Button>
                    </div>
                );
            });
        } else {
            similarCategoriesHtml.push(
                <div className="similar-catgeory-chip" style={{ paddingLeft: "2px", paddingTop: "15px" }}>
                    <Button>
                        <Link
                            href={toAllProposalsPage("all").as}
                            passHref
                        >
                            All Proposals
                        </Link>
                    </Button>
                </div>
            );
            GetCategoryMetadata(category)["similar-categories"].forEach((category) => {
                similarCategoriesHtml.push(
                    <div className="similar-catgeory-chip" style={{ paddingLeft: "2px", paddingTop: "15px" }}>
                        <Button>
                            <Link
                                href={toAllProposalsPage(category["slug"]).as}
                                passHref
                            >
                                {category["name"]}
                            </Link>
                        </Button>
                    </div>
                );
            });
        }
        return similarCategoriesHtml;
    };

    // https://bootsnipp.com/snippets/5MqgR
    const getAllProposals = (allProposals) => {
        if (allProposals.length === 0 || allProposals[0].data.length === 0) {
            return (
                <div className="d-flex flex-column align-items-center text-center">
                    <Image
                        src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/dZg9sz3b3Uy6KzTwn0moUA/Page_not_found.svg"}
                        height={350}
                        width={350}
                        priority
                    />
                    <span>Apologies, the collaboration stage in this category is craving
                        your spotlight. Be the star by adding your own dazzling proposal!
                    </span>
                </div>
            )
        }
        const resultArtists: JSX.Element[] = [];
        let data = allProposals.length != 0 ? allProposals[0].data : [];
        data.sort((a, b) => b.proposal.createdAt - a.proposal.createdAt);
        data.forEach(proposal => {
            resultArtists.push(
                <a href={toProposalPage(proposal.proposal.proposalId, proposal.proposal.title.trim().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase()).as} target="_blank" rel="noreferrer">
                    <div className="ui-block">
                        <article className="hentry post">
                            <div className="m-link">

                                <h5 className="common-h4-style">{proposal.proposal.title}</h5>
                            </div>
                            <div className="post__author author inline-items">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={proposal.creatorProfilePicUrl} alt="author" />
                                <div className="author-date">
                                    <a className="post__author-name fn" href={toArtistProfile(proposal.creatorSlug).as} target="_blank" rel="noreferrer">
                                        {proposal.creatorFirstName} {proposal.creatorLastName}
                                    </a>
                                    <p className="common-p-style">
                                        Created at  {GetDateString(proposal.proposal.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <p className="common-p-style">
                                {proposal.proposal.description}
                            </p>
                            <div className="post-additional-info inline-items">
                                <p>
                                    {GetProposalTags(proposal.proposal)}
                                </p>
                            </div>
                        </article>
                    </div>
                </a>
            )
        });
        return resultArtists;
    };

    return (
        <Layout
            title={"Popular collaboration proposals for artists | Wondor"}
            name={"description"}
            content={"Check out all of the interesting proposals for collaboration by artists around the world. Express interest and unlock the opportunity for working on a masterpiece with a fellow artist. Join now!"}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            {isFetchingAllProposals ? (
                <Loader />
            ) : (
                <>
                    <div className="allProposalsPage_listingPagecontainer">
                        {windowWidth > 500 &&
                            <GenericBreadcrumb
                                page={"Collab Proposals"}
                            />
                        }
                        <HeroSection
                            heading={"Artists, Your Next Collaboration Opportunity is Here 😎"}
                            paragaraph={"Express interest in these amazing proposals by fellow artists and start your collaboration today!"}
                        />
                        <div className="row-fluid">
                            <div className="col-lg-12 col-md-10 ">
                                <div className="similar-categories-container">
                                    {getSimilarCategories()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 listingContainer">
                            {getAllProposals(allProposals)}
                            <div
                                onClick={() => {
                                    setShowCreateOrUpdateProposalModal(true);
                                }}
                            >
                                <FloatingButton />
                            </div>
                        </div>
                        <div className="row">
                            <GenericActionBanner />
                        </div>
                    </div>
                </>
            )}
            {showCreateOrEditProposalModal && (
                <CreateProposalModal
                    onCancel={() => {
                        setShowCreateOrUpdateProposalModal(false);
                    }}
                    isViewMode={true}
                    isEditMode={false}
                    proposalDetails={proposalData}
                />
            )}
        </Layout>
    );
};

export default connector(ProposalsPage);
