import React, { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select, message } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import moment from "moment";
import { Dispatch } from "redux";
import ProfilePicture from "./profilePicture";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { updateArtistProfile } from "state/action";
import { GENDERS } from "constants/constants";
import { User } from "types/model";

import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    isUpdatingProfile: state.user.isUpdatingProfile,
  };
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
  const [showUserCity, setShowCity] = useState<boolean>(false);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState(userDataCached.country || '');
  const [selectedState, setSelectedState] = useState(userDataCached.state || '');
  const [selectedCity, setSelectedCity] = useState(userDataCached.city || '');


  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const currentDate = moment(new Date());

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const submitForm = () => {
    if (userDataCached.country.length === 0) {
      message.error(
        "Please submit the country, state and city (optional) you are based in."
      );
      return;
    }

    if (userDataCached.country &&
      userDataCached.state.length === 0 && stateList.length !== 0) {
      message.error("Please submit the state along with the country you are based in.");
      return;
    }

    // if ( userDataCached.country && userDataCached.state && userDataCached.city.length === 0 &&
    //     cityList.length !== 0) {
    //     message.error("Please submit the city along with the state and country you are based in.");
    //     return;
    // }

    updateArtistProfile(userDataCached);
  };

  useEffect(() => {
    if (user?.country) {
      setSelectedCountry(user.country);
      countriesList.forEach((country) => {
        if (country.name === user.country) {
          setCountryid(country.id);
          GetState(country.id).then((result) => {
            setStateList(result);
          });
        }
      })
      if (user?.state) {
        setSelectedState(user.state);
        stateList.forEach((state) => {
          if (state.name === user.state) {
            setStateid(state.id);
          }
        })
        GetCity(countryid, stateid).then((result) => {
          setCityList(result);
        });
      }
      if (user?.city) {
        setSelectedCity(user.city);
      }
    }
  }, [user]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  function AboveEighteen(dob) {
    return moment().diff(dob, "years") >= 18;
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
        <Form.Item>
          <div className="artistProfile__profileCoverContainer">
            <div className="profileCoverContainer">
              <div className="graph"></div>
            </div>

            <ProfilePicture isSelf={true} userProfileOpened={user} />
          </div>
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
              let currCountry = countriesList[countryid]
              countriesList.forEach((country) => {
                if (country.name === e) {
                  currCountry = country;
                }
              })

              setUserDataCached((prevState) => ({
                ...prevState,
                country: currCountry.name,
                state: "",
                city: "",
              }));
              setSelectedCountry(currCountry.name);
              setCountryid(currCountry.id);
              GetState(currCountry.id).then((result) => {
                setStateList(result);
              });
            }}
          >
            {countriesList.map((item, index) => (
              <Select.Option key={index} value={item.name}>
                {item.emoji} {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="State">
          <Select
            showSearch
            value={userDataCached ? userDataCached.state : ""}
            onChange={(e) => {

              let currState = stateList[stateid]
              stateList.forEach((state) => {
                if (state.name === e) {
                  currState = state;
                }
              })
              setUserDataCached((prevState) => ({
                ...prevState,
                state: currState.name,
                city: "",
              }));
              setSelectedState(currState.name);
              GetCity(countryid, currState.id).then((result) => {
                setCityList(result);
              });
              if (cityList.length !== 0) {
                setShowCity(true);
              }
            }}
          >
            {stateList.map((item, index) => (
              <Select.Option key={index} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {showUserCity &&
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
