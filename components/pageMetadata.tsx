import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Head from "next/head";

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(null, mapDispatchToProps);

type Props = {
    title: string;
    name: string;
    content: string;
} & ConnectedProps<typeof connector>;

const PageMetadata = ({
    title,
    name,
    content,
}: Props) => {
    return <>
        <Head>
            <title>{title}</title>
            <meta name={name} content={content} />
        </Head>
    </>
};

export default connector(PageMetadata);
