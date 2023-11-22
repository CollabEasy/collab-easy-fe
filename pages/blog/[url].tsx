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
import { BLOGS } from "constants/blogs";
import { GetBlogMetadata } from "helpers/blogHelper";

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    return { user, artistListData, loginModalDetails }
};

const connector = connect(mapStateToProps, null);

type Props = {} & ConnectedProps<typeof connector>;

const BlogPage = ({
    user,
    loginModalDetails,
    artistListData,
    blogMetadata,
    url,
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
            title={blogMetadata["title"]} name={"description"} content={blogMetadata["meta-content"]}
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
                <div className="categoryDetailPage_container">
                    {windowWidth > 500 &&
                        <>
                            {getBreadcrum(blogMetadata["title"] as string)}
                        </>
                    }
                    <div className="responsive-two-column-grid">
                        <div className="categoryDetailPage_tabContainer">
                            <b className="common-text-style">
                                <h1>{blogMetadata["title"]}</h1>
                            </b>
                            <div className="divider mb-4"> </div>
                            <p className="common-p-style">
                                {blogMetadata["paragraph"]}
                            </p>

                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};


export async function getStaticPaths() {
    // Get the paths we want to pre-render
    const paths = BLOGS.map((blog) => ({
        params: { url: blog.url },
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const blogMetadata = GetBlogMetadata(params.url);

    // Pass post data to the page via props
    return { props: { blogMetadata, url: params.url } }
}

export default connector(BlogPage);
