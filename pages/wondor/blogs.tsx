import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import { Card } from 'antd';
import Image from 'next/image';
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
import pageBannerImage from 'public/images/mobile-landing.svg';
import { BLOGS } from "constants/blogs";

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


const AllBlogs = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { toContactUs, toDiscover, toBlogPage } = useRoutesContext();

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
    }, [user])

    useEffect(() => {
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [artistListData]);

    const getBlogs = () => {
        const blogs: JSX.Element[] = [];
        /* eslint-disable react/jsx-key */
        BLOGS.forEach((blog, index) => {
            blogs.push(
                /* eslint-disable react/jsx-key */
                <div className="panel blog-container">
                    <div className="panel-body">
                        <h4>{blog.title}</h4>
                        <p className="m-top-sm m-bottom-sm">
                            {blog["paragraph"]}
                        </p>
                        <a
                            href={toBlogPage(blog["url"]).as}
                        >
                            Continue reading
                        </a>
                    </div>
                </div>
            )
        });
        return blogs;
    }

    // https://bootdey.com/snippets/view/blog-page#html
    return (
        < Layout

            title={"The Wondor Blog | Delve into Wondor's Inspiring Blog Posts"}
            name={"description"}
            content={"Explore the transformative power of collaboration in art, discover practical tips for managing collaborations, and delve into inspiring stories of successful collaborative projects on Wondor's blog."}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            <div className="footer_blogsContainer">
                <GenericBreadcrumb
                    page={"All Blogs"}
                />
                <div className="row">
                    <div style={{ width: "100%" }}>
                        <div className="row d-flex justify-content-center pageBanner-cover">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-center">
                                            <Image
                                                src={pageBannerImage}
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
                                                    Unleash your creative potential and discover the magic of collaboration through Wondor&pos;s insightful blog 🤗
                                                </h3>
                                                <p className="common-p-style">
                                                    Read Wondor&pos;s blog and embark on your creative collaboration journey!
                                                </p>
                                            </div>
                                            <div className="pageBanner-button-group">
                                                <Button type="primary" className="common-btn-dimension pageBanner-button">
                                                    <Link
                                                        href={routeToHref(toDiscover())}
                                                        passHref
                                                    >Let&apos;s collaborate</Link>
                                                </Button>
                                                <Button className="common-btn-dimension pageBanner-button">
                                                    <Link
                                                        href={routeToHref(toContactUs())}
                                                        passHref
                                                    >Ask Question</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container all-blogs-container">
                <div className="row">
                    <div className="col-md-8">
                        {getBlogs()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default connector(AllBlogs);