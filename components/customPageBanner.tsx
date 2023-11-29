import { Button, ImageProps } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Image from 'next/image';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import React, { useEffect, useState } from 'react';

const mapStateToProps = (state: AppState) => ({
    loginModalDetails: state.home.loginModalDetails,
    user: state.user.user,
    artistListData: state.home.artistListDetails,
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    heading: string
    paragraph: string
    bannerImg: StaticImageData
    imageAlt: string
    backgroundColor: string
} & ConnectedProps<typeof connector>;


const CustomPageBanner = ({
    heading,
    paragraph,
    bannerImg,
    imageAlt,
    backgroundColor,
}: Props) => {

    // https://bootdey.com/snippets/view/blog-page#html
    return (
        <>
        <div className="custom-page-banner-container">
            <div className="row ">
                <div className="col-sm-8" style={{ backgroundColor: backgroundColor }}>
                    <div className="custom-page-banner-text">
                        <h1 className="common-h1-style">
                            {heading}
                        </h1>
                        <h3 className="common-h3-style">
                            {paragraph}
                        </h3>
                    </div>
                </div>
                <div className="col-sm-4" style={{ backgroundColor: backgroundColor }}>
                    <Image
                        alt={imageAlt}
                        src={bannerImg}
                        layout="responsive"
                        objectFit="contain" // Scale your image down to fit into the container
                    />
                </div>
            </div>
            </div>
        </>
    )
}

export default connector(CustomPageBanner);