import { Button, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "./../state/action";

const mapStateToProps = (state: AppState) => ({
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateArtistSocialProspectus: (data: any[]) => dispatch(action.updateArtistSocialProspectus(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);


type Props = {
    onCancel: () => void;
} & ConnectedProps<typeof connector>;

const ArtistSocialProspectusModal = ({
    onCancel,
    isUpdatingSocialProspectus,
    updateArtistSocialProspectus,
}: Props) => {

    const saveSocialProspectusEntry = (values) => {
        console.log("Yes I'm in save modal");
        updateArtistSocialProspectus(values["social-prospectus"]);
    };

    return (
        <Modal
            closable
            onCancel={onCancel}
            className="sendCollabRequestModal__modal"
            visible={true}
            footer={null}
        >
            <div className="sendCollabRequestModal__container">
                <h2 className="f-20 text-center">Social Prospectus</h2>
                <div className="sendCollabRequestModal__textAreaContainer">
                    <p className="mb0">Choose the social platform</p>
                </div>
                <div className="sendCollabRequestModal__textAreaContainer">
                    <p className="mb0">Add your handle</p>
                    <Input.TextArea
                        maxLength={255}
                    />
                </div>

                <div className="sendCollabRequestModal__textAreaContainer">
                    <p className="mb0">Add a description</p>
                    <Input.TextArea
                        maxLength={255}
                    />
                </div>
                <Button
                    size="large"
                    className="sendCollabRequestModal__button"
                    type="primary"
                    onClick={saveSocialProspectusEntry}
                >
                    Save
                </Button>

                <div className="sendCollabRequestModal__acceptRejectContainer">
                    <Button
                        size="large"
                        className="collabDetailCard__acceptButton"
                        onClick={saveSocialProspectusEntry}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default connector(ArtistSocialProspectusModal);
