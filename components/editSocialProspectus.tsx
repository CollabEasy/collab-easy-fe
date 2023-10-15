import React, { useEffect, useState } from "react";
import { Button, Form, Select, Switch, Table, message } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import {
    fetchArtistSocialProspectus,
    updateArtistSocialProspectus,
    setShowSocialProspectusModal,
    deleteArtistSocialProspectus,
} from "state/action";
import { ProspectusEntry, User } from "types/model";
import ArtistSocialProspectusModal from "@/components/modal/socialProspectusModal";
import { GetSocialPlatformName } from "helpers/socialProspectusHelper";
import { GetSocialPlatformId } from "helpers/artistSettingPageHelper";

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user.user,
        socialProspectus: state.socialProspectus,

        isFetchingSocialProspectus: state.socialProspectus?.isFetchingProspectus,
        isDeletingProspectus: state.socialProspectus?.isDeletingProspectus,
        hasDeletedProspectus: state.socialProspectus?.hasDeletedProspectus,

        showSocialProspectusModal: state.socialProspectus?.showSocialProspectusModal,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchArtistSocialProspectus: (slug: string) =>
        dispatch(fetchArtistSocialProspectus(slug)),
    updateArtistSocialProspectus: (data: any[]) =>
        dispatch(updateArtistSocialProspectus(data)),
    setShowSocialProspectusModal: (show: boolean) =>
        dispatch(setShowSocialProspectusModal(show)),
    deleteArtistSocialProspectus: (data: number) =>
        dispatch(deleteArtistSocialProspectus(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const EditSocialProspectus = ({
    user,
    socialProspectus,
    isFetchingSocialProspectus,
    showSocialProspectusModal,
    fetchArtistSocialProspectus,
    updateArtistSocialProspectus,
    setShowSocialProspectusModal,
    deleteArtistSocialProspectus,
}: Props) => {

    const emptyProspectusEntryDetails: ProspectusEntry = {
        name: "",
        handle: "",
        description: "",
        upForCollab: "",
    };

    const [userSocialProspectus, setUserSocialProspectus] = useState([]);
    const [prospectusEntryRequestDetails, setProspectusEntryDetails] = useState(
        emptyProspectusEntryDetails
    );

    useEffect(() => {
        fetchArtistSocialProspectus(user.slug);
    }, []);

    useEffect(() => {
        setUserSocialProspectus(socialProspectus.socialProspectus);
    }, [socialProspectus]);

    const ShowProspectusEntryModal = () => {
        setProspectusEntryDetails(emptyProspectusEntryDetails);
        setShowSocialProspectusModal(true);
    };

    const updateUserProspectus = (entry: React.SetStateAction<ProspectusEntry>) => {
        setProspectusEntryDetails(entry);
        setShowSocialProspectusModal(true);
    };
    const deleteUserProspectus = (entry: { name: any; }) => {
        deleteArtistSocialProspectus(GetSocialPlatformId(entry.name));
    };

    const HideProspectusEntryModal = () => {
        setShowSocialProspectusModal(false);
    };

    const [isViewMode, setViewMode] = useState(false);

    const columns = [
        { title: "Platform", dataIndex: "name", key: "name" },
        { title: "Handle", dataIndex: "handle", key: "handle" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Up for collab", dataIndex: "upForCollab", key: "upForCollab" },
        {
            title: "Action",
            key: "key",
            dataIndex: "key",
            // eslint-disable-next-line react/display-name
            render: (_text: any, record: any) => (
                <>
                    <Button type="primary" onClick={() => updateUserProspectus(record)}>
                        Update
                    </Button>
                    <Button onClick={() => deleteUserProspectus(record)}>Delete</Button>
                </>
            ),
        },
    ];

    const deviceColumns = [
        {
            render: (record, key, index) => {
                const platform = record.name;
                const handle = record.handle;
                const description = record.description;
                const upForCollab = record.upForCollab;
                return (
                    <div>
                        <span>
                            <p><b>Platform:</b> {platform}</p>
                        </span>
                        <span>
                            <p><b>Handle:</b> {handle}</p>
                        </span>
                        <span>
                            <p><b>Description:</b> {description}</p>
                        </span>
                        <span>
                            <p><b>Up for collab:</b> {upForCollab? "Yes" : "No"}</p>
                        </span>
                        <Button type="primary" onClick={() => updateUserProspectus(record)}>
                            Update
                        </Button>
                        <Button onClick={() => deleteUserProspectus(record)}>Delete</Button>
                    </div>
                )
            }
        }
    ];

    const getCurrentSocialProspectus = () => {
        let data =
            userSocialProspectus.length != 0 ? userSocialProspectus[0].data : [];
        let updatedData = [];
        data.forEach((element: { socialPlatformId: any; handle: any; description: any; upForCollab: any; }) => {
            let obj = {
                name: GetSocialPlatformName(element.socialPlatformId),
                handle: element.handle,
                description: element.description,
                upForCollab: element.upForCollab,
            };
            updatedData.push(obj);
        });
        return <Table columns={ window.innerWidth < 500 ? deviceColumns : columns} dataSource={updatedData} />;
    };

    return (
        <>
            <div>
                <div>
                    {!isFetchingSocialProspectus && (
                        <div>{getCurrentSocialProspectus()}</div>
                    )}
                </div>
                <div className="socialProspectus__buttonContainer">
                    <Button type="primary" onClick={ShowProspectusEntryModal}>
                        Add
                    </Button>
                </div>
            </div>
            <div>
                {showSocialProspectusModal && (
                    <ArtistSocialProspectusModal
                        onCancel={() => {
                            HideProspectusEntryModal();
                        }}
                        isViewMode={true}
                        prospectusEntryDetails={prospectusEntryRequestDetails}
                    />
                )}
            </div>
        </>
    );
};

export default connector(EditSocialProspectus);
