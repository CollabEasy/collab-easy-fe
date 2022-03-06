/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, useEffect, useState } from "react";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { User } from "types/model";
import * as action from "../state/action";

const mapStateToProps = (state: AppState) => {
  const isDeleting = state.sample.isDeleting;
  const isDeleted = state.sample.isDeleted;

  return { isDeleting, isDeleted }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  user: User;
} & ConnectedProps<typeof connector>;

const ScratchpadPage = ({
  user,
}: Props) => {
  const router = useRouter();
  const resetState = () => {};

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <>
     
    </>
  );
};

export default connector(ScratchpadPage);
