import { Breadcrumb, Button } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { routeToHref } from "config/routes";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import Image from 'next/image';
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { GetListingHeaderData } from "helpers/listingPageHelper";
import { GetCategoryArtistTitle, GetCategoryWikiData } from "helpers/categoryHelper";
import Layout from "@/components/layout";
import { SIMILAR_CATEGORIES } from "constants/category";
import { CATEGORY_WIKI } from "constants/category";

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    return { user, artistListData, loginModalDetails }
};

const connector = connect(mapStateToProps, null);

type Props = {} & ConnectedProps<typeof connector>;

const CategoryPage = ({
    user,
    loginModalDetails,
    artistListData,
    categoryMetadata,
    categoryWikidata,
    slug,
    metaTitle,
}) => {
    const { toDiscover, toAllCategoryPage, toCategoryArtistList, toCategoryWikiPage } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(-1);

    useEffect(() => {
        if (user && user.new_user) {
            setShowProfileModal(true);
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
        setWindowWidth(window.innerWidth);
    }, [user, artistListData])

    const getSimilarCategoriesWiki = () => {
        const similarCategoriesHtml: JSX.Element[] = [];
        SIMILAR_CATEGORIES.forEach((element) => {
            if (element["slugs"].indexOf(slug.toString()) > -1) {
                element["similar-categories"].forEach((category) => {
                    if (category["slug"] != slug) {
                        similarCategoriesHtml.push(
                            <li className="cursor-pointer" style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>
                                <a key="wiki" href={routeToHref(toCategoryWikiPage(category["slug"] as string, category["meta-slug"] as string))} >Learn about  {category["name"]}</a>
                            </li>
                        )
                    }
                })
            }
        })

        return similarCategoriesHtml;
    }

    const getSimilarCategoriesArtist = () => {
        const similarCategoriesHtml: JSX.Element[] = [];
        SIMILAR_CATEGORIES.forEach((element) => {
            if (element["slugs"].indexOf(slug.toString()) > -1) {
                element["similar-categories"].forEach((category) => {
                    if (category["slug"] != slug) {
                        similarCategoriesHtml.push(
                            <li className="cursor-pointer" style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>
                                <a href={toCategoryArtistList(category["slug"], GetCategoryArtistTitle(category["slug"])).as} >Find artists  {category["name"]}</a>
                            </li>
                        )
                    }
                })
            }
        })

        return similarCategoriesHtml;
    }

    const getBreadcrum = (category: string) => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href={toDiscover().href}>Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href={toAllCategoryPage().href}>Categories</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Learn about {category}
                </Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    return (
        <Layout
            title={categoryWikidata["meta-title"]} name={"description"} content={categoryWikidata["meta-content"]}
        >

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
                        {windowWidth > 500 &&
                            <>
                                {getBreadcrum(categoryWikidata["name"] as string)}
                            </>
                        }
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
                                <div className="divider mb-4"> </div>
                                <p className="common-p-style">
                                    {categoryWikidata["paragraph"]}
                                    {categoryWikidata["source"].length !== 0 && (
                                        <Link href={categoryWikidata["source"]} passHref> source</Link>
                                    )}
                                </p>
                                <Button
                                    type="primary"
                                >
                                    <Link href={toCategoryArtistList(categoryWikidata["slug"], GetCategoryArtistTitle(categoryWikidata["slug"])).as} passHref>Find artists</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="categoryDetailPage_similarCategories">
                            <h6 className="common-h6-style">
                                Similar categories like {categoryWikidata["name"]}
                            </h6>
                            <ul>
                                {getSimilarCategoriesArtist()}
                            </ul>
                            <ul>
                                {getSimilarCategoriesWiki()}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="categoryDetailPage_container">
                        <h5 style={{ textAlign: "center" }} className="common-h5-text">We are working on adding wiki for the selected category. In meantime, explore others!</h5>
                    </div>
                )}
            </>
        </Layout>
    );
};


export async function getStaticPaths() {
    // Get the paths we want to pre-render
    const paths = CATEGORY_WIKI.map((category) => ({
        params: { slug: category.slug, title: category["meta-slug"] },
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const categoryMetadata = GetListingHeaderData(params.slug);
    const categoryWikidata = GetCategoryWikiData(params.slug);

    // Pass post data to the page via props
    return { props: { categoryMetadata, categoryWikidata, slug: params.slug, metaTitle: params.title } }
}

export default connector(CategoryPage);
