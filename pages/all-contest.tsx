import { Tabs, Input, Button, Comment } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card, Tag } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    return { user, isLoggedIn, loginModalDetails }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const AllContestPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
}: Props) => {
    const { toContestPage } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();

    const getAllContests = () => {
        const resultArtists: JSX.Element[] = [];
        resultArtists.push(
            <div className='allContestPage_listContainer'>
                <Card
                    title="12 May 2023"
                    style={{ height: '100%' }}
                    extra={<a href="#">Submit your work</a>}
                >
                    <Tag color="green">current</Tag>
                    The theme for contest is Health Day
                </Card>
            </div>
        )
        for (var i = 0; i < 10; i++) {
            resultArtists.push(
                <div className='allContestPage_listContainer'>
                    <Card
                        title="12 Jan 2023"
                        style={{ height: '100%' }}
                        extra={<a href={routeToHref(toContestPage("123"))}>Check details</a>}
                    >
                        <Tag color="red">past</Tag>
                        The theme for contest was save planet
                    </Card>
                </div>
            )
        }
        return resultArtists;
    };


    return (
        <>
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }
            <div className="contestDetailPage_container">
                {getAllContests()}
            </div>
        </>
    );
};

export default connector(AllContestPage);
