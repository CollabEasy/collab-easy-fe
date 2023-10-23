import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Result } from "antd";
import Layout from "../layout";

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(null, mapDispatchToProps);

type Props = {
  error
} & ConnectedProps<typeof connector>;

export const NotAuthorised = (
  error,
) => {

  let message = error.error.length !== 0 ? error.error : "Create a new account or log in to your existing account to get the most from wondor!";

  return (
    <Layout
      title={"Join Wondor now!"}
      name={"description"}
      content="Create a new account or log in to your existing account to get the most from wondor!"
    >
      <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "25%", marginBottom: "15%" }}>
        <div className="discoverArtists__listingPageCoverContainer common-text-style">
          <Result
            title={message}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NotAuthorised;
