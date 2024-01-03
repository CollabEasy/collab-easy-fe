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
import { GetCategoryMetadata } from "helpers/categoryHelper";
import { GetCategoryArtistTitle } from "helpers/categoryHelper";
import Layout from "@/components/layout";
import { CATEGORY_METADATA } from "constants/category";

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
        categoryMetadata["similar-categories"].forEach((category) => {
            similarCategoriesHtml.push(
                <li className="cursor-pointer" style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>
                    <a key="wiki" href={routeToHref(toCategoryWikiPage(category["slug"] as string, GetCategoryMetadata(category["slug"])["wiki-data"]["url"] as string))} >Learn about  {category["name"]}</a>
                </li>
            )
        })
        return similarCategoriesHtml;
    }

    const getSimilarCategoriesArtist = () => {
        const similarCategoriesHtml: JSX.Element[] = [];
        categoryMetadata["similar-categories"].forEach((category) => {
            similarCategoriesHtml.push(
                <li className="cursor-pointer" style={{ textDecoration: "underline", display: "inline-block", marginRight: "15px" }}>
                    <a href={toCategoryArtistList(category["slug"], GetCategoryArtistTitle(category["slug"])).as} >Find artists for {category["name"]}</a>
                </li>
            )
        })

        return similarCategoriesHtml;
    }

    const howAndWhyWikiHelper = (data) => {
        const howAndWhyWiki: JSX.Element[] = [];
        data.forEach(element => {
            howAndWhyWiki.push(
                <>
                    <h6 className="common-h5-style">{element["heading"]}</h6>
                    <p className="common-p-style">{element["paragraph"]}</p>
                </>
            )
        });
        return howAndWhyWiki
    }
    const getHowAndWhyWikiSection = () => {
        return (
            <>
                {("article" in categoryMetadata["wiki-data"]) ? (
                    <div className="col-12">
                        <div className="categoryDetailPage_tabContainer">
                            <b className="common-text-style">
                                <h5>How {categoryMetadata["artist-title"]} collaborate?</h5>
                            </b>
                            <div className="divider mb-4"> </div>
                            {howAndWhyWikiHelper(categoryMetadata["wiki-data"]["article"]["how"])}
                        </div>
                        <div className="categoryDetailPage_tabContainer">
                            <b className="common-text-style">
                                <h5>Why {categoryMetadata["artist-title"]} should collaborate?</h5>
                            </b>
                            <div className="divider mb-4"> </div>
                            {howAndWhyWikiHelper(categoryMetadata["wiki-data"]["article"]["why"])}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
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
            title={categoryMetadata["wiki-data"]["meta-title"]} name={"description"} content={categoryMetadata["wiki-data"]["meta-content"]}
        >
            <>
                <div className="categoryDetailPage_container">
                    {windowWidth > 500 &&
                        <>
                            {getBreadcrum(categoryMetadata["name"] as string)}
                        </>
                    }
                    <div className="responsive-two-column-grid">
                        <div style={{ margin: "4px", borderRadius: "5px", background: categoryMetadata["background-color"] }}>
                            <Image
                                alt="Image Alt"
                                src={categoryMetadata["image"]}
                                layout="responsive"
                                objectFit="contain" // Scale your image down to fit into the container
                            />
                        </div>
                        <div className="categoryDetailPage_tabContainer">
                            <b className="common-text-style">
                                <h1>{categoryMetadata["name"]}</h1>
                            </b>
                            <div className="divider mb-4"> </div>
                            <p className="common-p-style">
                                {categoryMetadata["wiki-data"]["paragraph"]}
                                {categoryMetadata["wiki-data"]["source"].length !== 0 && (
                                    <Link href={categoryMetadata["wiki-data"]["source"]} passHref> source</Link>
                                )}
                            </p>
                            <Button
                                type="primary"
                            >
                                <Link href={toCategoryArtistList(categoryMetadata["slug"], GetCategoryArtistTitle(categoryMetadata["slug"])).as} passHref>Find artists</Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        {getHowAndWhyWikiSection()}
                    </div>
                    <div className="categoryDetailPage_similarCategories">
                        <h6 className="common-h6-style">
                            Similar categories like {categoryMetadata["name"]}
                        </h6>
                        <ul>
                            {getSimilarCategoriesArtist()}
                        </ul>
                        <ul>
                            {getSimilarCategoriesWiki()}
                        </ul>
                    </div>
                </div>
            </>
        </Layout>
    );
};


export async function getStaticPaths() {
    // Get the paths we want to pre-render
    const paths = CATEGORY_METADATA.map((category) => ({
        params: { slug: category.slug, title: category["wiki-data"]["url"] },
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const categoryMetadata = GetCategoryMetadata(params.slug);

    // Pass post data to the page via props
    return { props: { categoryMetadata, slug: params.slug, metaTitle: params.title } }
}

export default connector(CategoryPage);
