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
    const { toDiscover, toAllBlogs } = useRoutesContext();
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

    const getBreadcrum = (title: string) => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href={toDiscover().href}>Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href={toAllBlogs().href}>All Blogs</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {title}
                </Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    //https://bootdey.com/snippets/view/blog-detail-page#html
    const getContent = () => {
        const blogPostContent: JSX.Element[] = [];
        blogMetadata["content"].forEach((section) => {
            blogPostContent.push(
                <>
                    <h5 className="common-h5-style">{section["heading"]}</h5>
                    <p className="common-p-style">{section["paragraph"]}</p>
                </>
            );
        })
        return blogPostContent;
    }

    const getBlogPost = () => {
        return (
            <div className="blog-single ">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-lg-8 m-15px-tb">
                            <article className="article">
                                <div className="article-content">
                                    <p className="common-p-style">
                                        {blogMetadata["paragraph"]}
                                    </p>
                                </div>
                                <div className="article-content">
                                    {getContent()}
                                </div>
                                <div className="article-content">
                                    {blogMetadata["conclusion"]}
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
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

                    <div className="row">
                        <div style={{ width: "100%" }}>
                            <div className="row d-flex justify-content-center pageBanner-cover">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="text-center">
                                                <Image
                                                    src={blogMetadata["image"]}
                                                    layout="responsive"
                                                    alt="you are"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="pageBanner-cnt">
                                                <div className="pageBanner-text text-center">
                                                    <h3 className="common-h3-style">
                                                        {blogMetadata["title"]}
                                                    </h3>
                                                    <p className="common-p-style">
                                                        {blogMetadata["meta-description"]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {getBlogPost()}
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
