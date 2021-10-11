import { User } from 'types/model';
import { InputNumber, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Switch,
} from 'antd';
import { openLoginModalAction, updateArtistProfileAction } from "state/action";
import { useRouter } from 'next/router'
import { COUNTRIES, GENDERS, TIME_ZONES } from 'config/constants';
import { connect, useDispatch } from 'react-redux';
import { getArtistData } from 'api/artist-user';
import { AppState } from 'state';

const { TabPane } = Tabs;

type SizeType = Parameters<typeof Form>[0]['size'];

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select defaultValue={"🇺🇸United States"} style={{ width: 150 }}>
            {COUNTRIES.map(country => (
                <Select.Option key={country.Iso2} value={country.Dial}>{country.Unicode} {country.Name}</Select.Option>
            ))}
        </Select>
    </Form.Item>
);

const openLoginModal = () => {
    openLoginModalAction()
};

interface ProfilePageProps {
    userData: User
}
const EditProfile: React.FC<ProfilePageProps> = ({ userData }) => {
  ///  let userData: User;

    // useEffect(() => {
    //     async function fetchData() {
    //         userData = await getArtistData();
    //         console.log(userData, 'user')
    //         setFirstName(userData.firstName)
    //         setLastName(userData.lastName)
    //         setBio(userData.bio)
    //         setEmail(userData.email)
    //         setPhoneNumber(userData.phoneNumber)
    //         setAge(userData.age)
    //         setGender(userData.gender)
    //         setCountry(userData.country)
    //         setTimeZone(userData.timezone)
    //     }
    //     fetchData();
    //   }, []);

    console.log(userData)
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const [firstName, setFirstName] = useState<string>(userData.firstName)
    const [lastName, setLastName] = useState<string>(userData.lastName)
    const [bio, setBio] = useState<string>(userData.bio)
    const [email, setEmail] = useState<string>(userData.email)
    const [phoneNumber, setPhoneNumber] = useState<number>(userData.phoneNumber)
    const [age, setAge] = useState<number>(userData.age)
    const [gender, setGender] = useState<string>(userData.gender)
    const [country, setCountry] = useState<string>(userData.country)
    const [timezone, setTimeZone] = useState<string>(userData.timezone)
    //  const [dob, setDOB] = useState(userData.dob ? userData.dob ? new Date())

    const dispatch = useDispatch()
    const onCountryCodeChange = (e) => {
        console.log(e)
    }

    const onDOBChange = (date) => {
        //  setDOB(date)
    }

    const resetData = () => {
        setFirstName(userData.firstName)
        setLastName(userData.lastName)
        setBio(userData.bio)
        setEmail(userData.email)
        setPhoneNumber(userData.phoneNumber)
        setAge(userData.age)
        setGender(userData.gender)
        setCountry(userData.country)
        setTimeZone(userData.timezone)
        //  setDOB(userData.)
    }

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
    const router = useRouter();
    const tab: string = router.query?.tab ? '3' : '1';
    const [activeTabKey, setActiveTabKey] = useState(tab);
    const onTabClick = (e) => setActiveTabKey(e);

    const submitForm = () => {
        console.log('form submit')
        const user: User = {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            email: email,
            phoneNumber: phoneNumber,
            age: age,
            gender: gender,
            country: country,
            timezone: timezone
        }
        dispatch(updateArtistProfileAction(user))
    }

    return (
        <div className="edit-profile" style={{ padding: 200 }}>
            <h1>Edit Profile</h1>
            <>
                <Tabs tabPosition={'left'}  activeKey={activeTabKey} onTabClick={onTabClick}>
                    <TabPane tab="Basic Information" key="1">
                        <>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                initialValues={{ size: componentSize }}
                                onValuesChange={onFormLayoutChange}
                                size={componentSize as SizeType}
                                onFinish={submitForm}
                            >
                                <Form.Item label="First Name">
                                    <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Last Name">
                                    <Input value={lastName} onChange={e => setLastName(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value as unknown as number)} />
                                </Form.Item>
                                <Form.Item label="Age">
                                    <InputNumber value={age} onChange={e => setAge(e)} />
                                </Form.Item>
                                <Form.Item label="Date of birth">
                                    <DatePicker onChange={onDOBChange} />
                                </Form.Item>
                                <Form.Item label="Gender">
                                    <Select defaultValue={gender} onChange={e => setGender(e)}>
                                        {GENDERS.map(gen => (
                                            <Select.Option key={gen} value={gen}>{gen}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Country">
                                    <Select defaultValue={country} onChange={e => setCountry(e)}>
                                        {COUNTRIES.map(country => (
                                            <Select.Option key={country.Iso2} value={country.Name}>{country.Unicode} {country.Name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Time zone">
                                    <Select defaultValue={timezone} onChange={e => setTimeZone(e)}>
                                        {
                                            TIME_ZONES.map(zone => (
                                                <Select.Option key={zone.abbr} value={zone.abbr}>{zone.value}</Select.Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Bio">
                                    <Input value={bio} onChange={e => setBio(e.target.value)} />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                    <Button htmlType="button" onClick={resetData}>
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    </TabPane>
                    <TabPane tab="Samples" key="2">
                        <Button id="image-upload" type="primary" onClick={openLoginModal}>Upload a sample</Button>
                    </TabPane>
                    <TabPane tab="Settings" key="3">
                        <>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                initialValues={{ size: componentSize }}
                                onValuesChange={onFormLayoutChange}
                                size={componentSize as SizeType}
                            >
                                <Form.Item label="Send notification email" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                                <Form.Item label="Up for collab" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </Form>
                        </>

                    </TabPane>
                </Tabs>
            </>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    console.log(state)
    return {
        userData: state.user.user
    }
}

// To Do: - need to fetch data using below function, need to fix the issue of localstorage object not available at server side
// export const getServerSideProps = async () => {
//     const user = await getArtistData()
//     return {
//         props: {
//             userData: user
//         } as ProfilePageProps,
//     }
// }


export default connect(mapStateToProps, null)(EditProfile);