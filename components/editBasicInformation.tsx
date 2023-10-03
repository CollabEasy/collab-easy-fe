import React, { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select, message } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import moment from "moment";
import { Dispatch } from "redux";
import ProfilePicture from "./profilePicture";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
    updateArtistProfile,
} from "state/action";
import { COUNTRIES, GENDERS } from "constants/constants";
import { User } from "types/model";

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user.user,
        isUpdatingProfile: state.user.isUpdatingProfile,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateArtistProfile: (user: any) => dispatch(updateArtistProfile(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    userLocationData: any
} & ConnectedProps<typeof connector>;

const EditBasicInformation = ({
    user,
    isUpdatingProfile,
    updateArtistProfile,
    userLocationData
    }: Props) => {

    const [userDataCached, setUserDataCached] = useState<User>(user);

    useEffect(() => {
        setUserDataCached({
            ...user,
            city: userLocationData.city
        })
    }, [userLocationData.city])

    const [componentSize, setComponentSize] = useState<SizeType | "default">(
        "default"
    );

    const currentDate = moment(new Date());

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const submitForm = () => {
        updateArtistProfile(userDataCached);
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    function AboveEighteen(dob) {
        return moment().diff(dob, 'years') >= 18;
    }

    return (
        <>
            <Form
                className="settings__basicProfileForm"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize as SizeType}
                onFinish={submitForm}
            >
                <Form.Item label="Profile picture">
                    <ProfilePicture isSelf={true} userProfileOpened={user} />
                </Form.Item>
                <Form.Item label="First name">
                    <Input
                        value={userDataCached ? userDataCached.first_name : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                first_name: e.target.value,
                            }));
                        }}
                    />
                </Form.Item>
                <Form.Item label="Last name">
                    <Input
                        value={userDataCached ? userDataCached.last_name : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                last_name: e.target.value,
                            }));
                        }}
                    />
                </Form.Item>
                <Form.Item label="Email">
                    <Input
                        value={userDataCached ? userDataCached.email : ""}
                        disabled={true}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                            }));
                        }}
                    />
                </Form.Item>
                <Form.Item label="Date of birth">
                    <DatePicker
                        clearIcon={null}
                        disabledDate={(d) =>
                            !d ||
                            d.isAfter(currentDate) ||
                            currentDate >= moment().endOf("day")
                        }
                        format="DD/MM/YYYY"
                        value={moment(
                            userDataCached.date_of_birth
                                ? userDataCached.date_of_birth
                                : currentDate
                        )}
                        onChange={(e) => {
                            if (!AboveEighteen(e)) {
                                message.error("You must be above 18 to use Wondor.art!");
                            } else {
                                setUserDataCached((prevState) => ({
                                    ...prevState,
                                    date_of_birth: e.toDate(),
                                }));
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item label="Gender">
                    <Select
                        value={userDataCached ? userDataCached.gender : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                gender: e,
                            }));
                        }}
                    >
                        {GENDERS.map((gen) => (
                            <Select.Option key={gen} value={gen}>
                                {gen}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Country">
                    <Select
                        showSearch
                        value={userDataCached ? userDataCached.country : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                country: e,
                            }));
                        }}
                    >
                        {COUNTRIES.map((country) => (
                            <Select.Option key={country.Iso2} value={country.Name}>
                                {country.Unicode} {country.Name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="City">
                    <Input
                        value={userDataCached ? userDataCached.city : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                city: e.target.value,
                            }));
                        }}
                    />
                </Form.Item>
                <Form.Item label="Bio">
                    <Input.TextArea
                        value={userDataCached ? userDataCached.bio : ""}
                        maxLength={300}
                        showCount
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                bio: e.target.value,
                            }));
                        }}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <div className="settings__basicProfileSubmitContainer">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={submitForm}
                            loading={isUpdatingProfile}
                        >
                            {isUpdatingProfile ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default connector(EditBasicInformation);
