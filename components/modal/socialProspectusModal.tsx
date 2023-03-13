import { Form, Button, Input, Select, Switch, Tooltip } from "antd";
import {
    InfoCircleOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { SOCIAL_PLATFORMS } from "config/constants";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import {ProspectusEntry} from "types/model";
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
    isViewMode: boolean
    prospectusEntryDetails: ProspectusEntry
} & ConnectedProps<typeof connector>;

const ArtistSocialProspectusModal = ({
    onCancel,
    isViewMode,
    prospectusEntryDetails,
    isUpdatingSocialProspectus,
    updateArtistSocialProspectus,
}: Props) => {
    const [showModal, setViewModal] = useState(isViewMode);
    const getSocialPlatformId = (name) => {
        for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
            if (SOCIAL_PLATFORMS[i].name === name) {
                return SOCIAL_PLATFORMS[i].id;
            }
        }
        return 1;
    };

    const userSocialProspectusDetails: UserSocialProspectus = {
        socialPlaformName: prospectusEntryDetails.name,
        handle: prospectusEntryDetails.handle,
        description: prospectusEntryDetails.description,
        upForCollab: prospectusEntryDetails.upForCollab,
    };

    const [prospectusData, setProspectusData] = useState<UserSocialProspectus>(userSocialProspectusDetails);

    const saveSocialProspectusEntry = () => {
        let obj = {
            "handle": prospectusData.handle,
            "description": prospectusData.description,
            "social_platform_id": getSocialPlatformId(prospectusData.socialPlaformName),
            "up_for_collab": prospectusData.upForCollab == "true" ? "true" : "false",
        }
        updateArtistSocialProspectus(obj);
    };

    const hideProspectusEntryModal = (isUpdatingSocialProspectus) => {
        setViewModal(isUpdatingSocialProspectus);
    }
    //console.log("isViewMode ", isViewMode, "isUpdatingSocialProspectus ", isUpdatingSocialProspectus, "showModal ", showModal);
    return (
        <Modal
            closable
            onCancel={onCancel}
            className="sendSocialProspectus__modal"
            visible={showModal}
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
                            //disabled={prospectusData.social_platform_name != ""}
                            value={prospectusData.socialPlaformName}
                            onChange={(e) => {
                                setProspectusData((prevState) => ({
                                    ...prevState,
                                    socialPlaformName: e,
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
                    <Form.Item 
                        label="Handle" 
                        tooltip={{ 
                            title: 'Do not write entire URL, write only your handle. You handle is "myhandle" in www.instagram.com/myhandle', 
                            icon: <InfoCircleOutlined /> 
                        }}
                    >
                        <Input
                            value={prospectusData.handle}
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
                            value={prospectusData.description}
                            onChange={(e) => {
                                setProspectusData((prevState) => ({
                                    ...prevState,
                                    description: e.target.value,
                                }));
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                      label="Collaborate with others"
                      valuePropName="checked"
                    >
                      <Switch
                        onChange={(e) => {
                            setProspectusData((prevState) => ({
                                ...prevState,
                                upForCollab: e ?  "true": "false",
                            }));
                        }}
                        checked={prospectusData.upForCollab == "true"}
                        checkedChildren="active"
                        unCheckedChildren="inactive"
                      />
                    </Form.Item>

                    <Form.Item>
                        <div className="settings__basicProfileSubmitContainer">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isUpdatingSocialProspectus}
                                onClick={() => {
                                    hideProspectusEntryModal(isUpdatingSocialProspectus)
                                }}
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
