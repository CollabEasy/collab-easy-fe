import { Form, Button, Input, Select, Switch, Tooltip, message } from "antd";
import {
    InfoCircleOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { SOCIAL_PLATFORMS } from "constants/constants";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import { ProspectusEntry } from "types/model";
import { UserSocialProspectus } from "types/model/user";

const mapStateToProps = (state: AppState) => ({
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    onCancel: () => void;
    isViewMode: boolean
    interestedArtists: any[]
} & ConnectedProps<typeof connector>;

const ProposalInterestedArtistModal = ({
    onCancel,
    isViewMode,
    interestedArtists,
}: Props) => {
    const [showModal, setViewModal] = useState(isViewMode);

    const hideProspectusEntryModal = (isUpdatingSocialProspectus) => {
        setViewModal(isUpdatingSocialProspectus);
    }
    
    console.log(interestedArtists);
    return (
        <Modal
            closable
            onCancel={onCancel}
            visible={showModal}
            footer={null}
        >
        </Modal>
    );
};

export default connector(ProposalInterestedArtistModal);
