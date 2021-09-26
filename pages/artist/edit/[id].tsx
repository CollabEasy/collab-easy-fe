import { User } from 'types/model';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { fetchUserDataAction, openLoginModalAction } from "state/action";


const { TabPane } = Tabs;

type SizeType = Parameters<typeof Form>[0]['size'];

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Option } = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
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
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    return (
        <div className="edit-profile" style={{ padding: 200 }}>
            <h1>Edit Profile User</h1>
            <>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="Basic Information" key="1">
                        <>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                initialValues={{ size: componentSize }}
                                onValuesChange={onFormLayoutChange}
                                size={componentSize as SizeType}
                            >
                                <Form.Item label="First Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Last Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label="Age">
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item label="Date of birth">
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item label="Gender">
                                    <Select>
                                        <Select.Option value="male">Male</Select.Option>
                                        <Select.Option value="female">Female</Select.Option>
                                        <Select.Option value="none">Don`@apos`t want to disclose</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Country">
                                    <Select>
                                        <Select.Option value="Usa">USA</Select.Option>
                                        <Select.Option value="India">India</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Time zone">
                                    <Select>
                                        <Select.Option value="Usa">CST</Select.Option>
                                        <Select.Option value="India">IST</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Bio">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Up for collab" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Button htmlType="button" >
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

                            </Form>
                        </>

                    </TabPane>
                </Tabs>
            </>
        </div>
    );
}

export default EditProfile;