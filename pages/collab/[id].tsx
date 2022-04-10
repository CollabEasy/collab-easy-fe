import React from "react";
import { Tabs } from "antd";
import { Card } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";


// https://ant.design/components/card/
const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  return { user }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const CollabPage = ({
  user,
  }: Props) => {
  const router = useRouter();
  const { id: collabId } = router.query;

  return (
    <>
      <h1 className="text-center">{`Collab ID is : ${collabId}`}</h1>
    </>
  );
};

export default connector(CollabPage);
