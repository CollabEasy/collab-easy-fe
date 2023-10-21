import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Breadcrumb, Result } from "antd";
import { useRoutesContext } from "./routeContext";

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(null, mapDispatchToProps);

type Props = {
    page: string
} & ConnectedProps<typeof connector>;

const GenericBreadcrumb = ({
    page
}: Props) => {

    const [windowWidth, setWindowWidth] = useState(-1);
    const { toDiscover } = useRoutesContext();

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    return (
        <>
            {windowWidth > 500 ? (
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href={toDiscover().href}>Home</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {page}
                    </Breadcrumb.Item>
                </Breadcrumb>
            ) : (<></>)}
        </>
    );
};

export default GenericBreadcrumb;
