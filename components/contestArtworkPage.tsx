import React, { useState, useRef, useEffect } from "react";
import { AppState } from "state";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import "cropperjs/dist/cropper.css";
import ContestArtworkSubmission from "./contestArtworkSubmission";
import NotAuthorised from "./error/notAuthorised";

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const UploadContestArtwork = ({
  isLoggedIn,
}: Props) => {

  useEffect(() => {
  }, []);


  return (
    <>
      {!isLoggedIn ? (
        <NotAuthorised
          error={"We are happy to see that you have decided to participate in this contest. Please login to submit!"}
        />
      ) : (
        <ContestArtworkSubmission />
      )}
    </>
  )
};

export default connector(UploadContestArtwork);
