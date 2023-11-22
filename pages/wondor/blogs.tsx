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
    const { toContactUs, toDiscover } = useRoutesContext();

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
                blog["value"].map((assesment) => (
                    <div className="col my-3">
                        <div className="card border-hover-primary">
                            <div className="card-body">
                                <h6 className="font-weight-bold mb-3">{assesment.title}</h6>
                                <p className="text-muted mb-0">{assesment["meta-description"]}</p>
                            </div>
                        </div>
                    </div>
                ))
            )
        });
        return blogs;
    }

    return (
        < Layout

            title={"How to use Wondor?"}
            name={"description"}
            content={"Find singers, photograhers etc to collaborate. Create account, send collab request, manage collaboration requests. Find ideas and themes for your work. Win money from winning art contests. Earn rewards by reffering your friends."}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            <div className="footer_tutorialContainer">
                <GenericBreadcrumb
                    page={"Tutorial"}
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
                                                    You are just 4 steps away from your next collaboration 🤗
                                                </h3>
                                                <p className="common-p-style">
                                                    Are you ready to take your skills to the next level and collaborate with others on exciting projects? Then it&apos;s time to create your profile and join a community of like-minded individuals!
                                                </p>
                                            </div>
                                            <div className="pageBanner-button">
                                                <Button type="primary" className="common-btn-dimension">
                                                    <Link
                                                        href={routeToHref(toDiscover())}
                                                        passHref
                                                    >Let&apos;s collaborate</Link>
                                                </Button>
                                                <Button className="common-btn-dimension">
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

            <div className="container bootstrap snippets bootdey">
                <div className="row">
                    <h2 className="text-muted">Welcome to our blog</h2>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="panel blog-container">
                            <div className="panel-body">
                                <div className="image-wrapper">
                                    <a className="image-wrapper image-zoom cboxElement" href="#">
                                        <div className="image-overlay"></div>
                                    </a>
                                </div>

                                <h4>Bootstrap 3.0</h4>
                                <small className="text-muted">By <a href="#"><strong> John Doe</strong></a> |  Post on Jan 8, 2013  | 58 comments</small>

                                <p className="m-top-sm m-bottom-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros nibh, viverra a dui a, gravida varius velit. Nunc vel tempor nisi. Aenean id pellentesque mi, non placerat mi. Integer luctus accumsan tellus. Vivamus quis elit sit amet nibh lacinia suscipit eu quis purus. Vivamus tristique est non ipsum dapibus lacinia sed nec metus.
                                </p>
                                <a href="single_post.html"><i className="fa fa-angle-double-right"></i> Continue reading</a>
                                <span className="post-like text-muted tooltip-test" data-toggle="tooltip" data-original-title="I like this post!">
                                    <i className="fa fa-heart"></i> <span className="like-count">25</span>
                                </span>
                            </div>
                        </div>
                        <div className="panel blog-container">
                            <div className="panel-body">
                                <div className="image-wrapper">
                                    <a className="image-wrapper image-zoom cboxElement" href="#">

                                        <div className="image-overlay"></div>
                                    </a>
                                </div>

                                <h4>Bootstrap 3.0</h4>
                                <small className="text-muted">By <a href="#"><strong> John Doe</strong></a> |  Post on Jan 8, 2013  | 58 comments</small>

                                <p className="m-top-sm m-bottom-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros nibh, viverra a dui a, gravida varius velit. Nunc vel tempor nisi. Aenean id pellentesque mi, non placerat mi. Integer luctus accumsan tellus. Vivamus quis elit sit amet nibh lacinia suscipit eu quis purus. Vivamus tristique est non ipsum dapibus lacinia sed nec metus.
                                </p>
                                <a href="single_post.html"><i className="fa fa-angle-double-right"></i> Continue reading</a>
                                <span className="post-like text-muted tooltip-test" data-toggle="tooltip" data-original-title="I like this post!">
                                    <i className="fa fa-heart"></i> <span className="like-count">25</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h4 className="headline text-muted">
                            POPULAR POST
                            <span className="line"></span>
                        </h4>
                        <div className="media popular-post">
                            <a className="pull-left" href="#">
                            </a>
                            <div className="media-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                        <div className="media popular-post">
                            <a className="pull-left" href="#">
                            </a>
                            <div className="media-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                        <div className="media popular-post">
                            <a className="pull-left" href="#">
                            </a>
                            <div className="media-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                        <div className="media popular-post">
                            <a className="pull-left" href="#">

                            </a>
                            <div className="media-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                        <div className="media popular-post">
                            <a className="pull-left" href="#">
                            </a>
                            <div className="media-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default connector(AllBlogs);