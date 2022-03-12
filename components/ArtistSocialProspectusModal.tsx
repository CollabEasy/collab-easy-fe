import { Form, Button, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { SOCIAL_PLATFORMS } from "config/constants";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "./../state/action";
import { UserSocialProspectus } from "types/model/user";

const mapStateToProps = (state: AppState) => ({
    isUpdatingSocialProspectus: state.socialProspectus?.isUpdatingProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateArtistSocialProspectus: (data: any) => dispatch(action.updateArtistSocialProspectus(data)),
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
    const [prospectusData, setProspectusData] = useState<UserSocialProspectus>();

    const getSocialPlatformId = (name) => {
        for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
            if (SOCIAL_PLATFORMS[i].name === name) {
                return SOCIAL_PLATFORMS[i].id;
            }
        }
        return 1;
    };

    const saveSocialProspectusEntry = () => {
        let obj = {
            "handle": prospectusData.handle,
            "description": prospectusData.description,
            "social_platform_id": getSocialPlatformId(prospectusData.social_platform_name),
        }
        updateArtistSocialProspectus(obj);
    };

    return (
        <Modal
            closable
            onCancel={onCancel}
            className="sendSocialProspectus__modal"
            visible={true}
            footer={null}
        >
            <div className="sendSocialProspectus__container">
                <h2 className="f-20 text-center">Enter the details.</h2>
                <Form
                    className="settings__basicProfileForm"
                    layout="horizontal"
                    onFinish={saveSocialProspectusEntry}
                >
                    <Form.Item label="Platform">
                        <Select
                            onChange={(e) => {
                                console.log("selected platform ", e);
                                setProspectusData((prevState) => ({
                                    ...prevState,
                                    social_platform_name: e,
                                }));
                            }}
                        >
                            {SOCIAL_PLATFORMS.map((gen) => (
                                <Select.Option key={gen.name} value={gen.name}>
                                    {gen.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Handle">
                        <Input
                            onChange={(e) => {
                                setProspectusData((prevState) => ({
                                    ...prevState,
                                    handle: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea
                            onChange={(e) => {
                                setProspectusData((prevState) => ({
                                    ...prevState,
                                    description: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="settings__basicProfileSubmitContainer">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isUpdatingSocialProspectus}
                            >
                                {isUpdatingSocialProspectus ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default connector(ArtistSocialProspectusModal);
