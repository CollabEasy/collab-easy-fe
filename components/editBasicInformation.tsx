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
import { Country, State, City } from 'country-state-city';
import { COUNTRIES, GENDERS } from "constants/constants";
import { User } from "types/model";
import { GetCountryByName, GetCountryCodeFromName } from "helpers/artistSettingPageHelper";
import Layout from "./layout";

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

type Props = {} & ConnectedProps<typeof connector>;

const EditBasicInformation = ({
    user,
    isUpdatingProfile,
    updateArtistProfile,
}: Props) => {

    const [userDataCached, setUserDataCached] = useState<User>(user);
    const [userCountryCode, setUserCountryCode] = useState<string>("");
    const [userStateCode, setUserStateCode] = useState<string>("");
    const [showUserCity, setShowCity] = useState<boolean>(false);
    const [componentSize, setComponentSize] = useState<SizeType | "default">(
        "default"
    );

    const currentDate = moment(new Date());

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    const submitForm = () => {
        if (userDataCached.country.length === 0) {
            message.error("Please submit the country you are based in.");
            return;
        }

        if (userCountryCode &&
            userDataCached.country &&
            userDataCached.state.length === 0 &&
            State.getStatesOfCountry(userCountryCode).length !== 0) {
            message.error("Please submit the state along with the country you are based in.");
            return;
        }

        if (userCountryCode &&
            userStateCode &&
            userDataCached.city.length === 0 &&
            City.getCitiesOfState(userCountryCode, userStateCode).length !== 0) {
            message.error("Please submit the city along with the state and country you are based in.");
            return;
        }

        updateArtistProfile(userDataCached);

    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    useEffect(() => {
        if (user?.country) {
            let country = GetCountryByName(user.country);
            setUserCountryCode(country["Iso2"]);
            if (user?.state) {
                let states = State.getStatesOfCountry(userCountryCode);
                states.forEach((state) => {
                    if (state["name"] === user.state) {
                        setUserStateCode(state["isoCode"]);
                    }
                });
            }
            if (user?.city) {
                setShowCity(true);
            }
        }
    }, [user]);

    function AboveEighteen(dob) {
        return moment().diff(dob, 'years') >= 18;
    }

    return (
        <>
            <Form
                className="settings__basicProfileForm"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
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
                                state: "",
                                city: "",
                            }));
                            setUserCountryCode(GetCountryCodeFromName(e));
                            setShowCity(false);
                        }}
                    >
                        {COUNTRIES.map((country) => (
                            <Select.Option key={country.Iso2} value={country.Name}>
                                {country.Unicode} {country.Name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="State">
                    <Select
                        showSearch
                        value={userDataCached ? userDataCached.state : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                state: State.getStateByCodeAndCountry(e, userCountryCode).name,
                                city: "",
                            }));
                            setUserStateCode(e);
                            if (City.getCitiesOfState(userCountryCode, e).length !== 0) {
                                setShowCity(true);
                            }
                        }}
                    >
                        {State.getStatesOfCountry(userCountryCode).map((state) => (
                            <Select.Option key={state.name} value={state.isoCode}>
                                {state.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {showUserCity && <Form.Item label="City">
                    <Select
                        showSearch
                        value={userDataCached ? userDataCached.city : ""}
                        onChange={(e) => {
                            setUserDataCached((prevState) => ({
                                ...prevState,
                                city: e,
                            }));
                        }}
                    >
                        {City.getCitiesOfState(userCountryCode, userStateCode).map((city) => (
                            <Select.Option key={city.name} value={city.name}>
                                {city.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                }
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
