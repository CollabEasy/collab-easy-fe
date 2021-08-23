import React from 'react';
import 'antd/dist/antd.css';
import { RightCircleFilled } from '@ant-design/icons';
import { Form, Switch, Modal, Button, Select } from 'antd';
import Image from 'next/image';
import landingPageImg from '../public/images/profile.png';
// import SubmitImg from '../public/images/submit.png';

const layout = {
    labelCol: {
      span: 20,
    },
    wrapperCol: {
      span: 20,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  /* const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }; */

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class ProfileModal extends React.Component {
  state = {
    loading: false,
    visible: true,
    windowWidth: 1000,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onFinish = (values: any) => {
    console.log('Success:', values);
    alert(JSON.stringify(values));
    this.handleCancel();
  };
  
  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  getModalWidth = (): number => {
      const width = window.innerWidth;
      console.log(width);
      if (width < 680) return 450;
      return 900;
  }
  
  componentDidMount() {
    
    this.setState({ windowWidth: window.innerWidth });
  }
  render() {
    const { visible, loading, windowWidth } = this.state;
    return (
      <>
        <Modal
          visible={visible}
          destroyOnClose={true}
          onCancel={this.handleCancel}
          footer={null}
          width={ windowWidth > 680 ? 900:450}
          bodyStyle={{padding:0}}
        >
          <div className="container">
            <div className="left-image">
                <Image 
                    src={landingPageImg} 
                    alt="Profile left"
                    layout="fill"
                />
            </div>
            <div className="profile-form">
                <div className="profile-title">
                    <h1>Welcome aborad,</h1>
                    <h1>Abhishek Arora</h1>
                </div>
                <p>
                    You are just one step away from collaborating with the artists on your next greatest work. Let’s gather some information about you first.
                </p>
                <Form 
                    {...layout} 
                    layout="vertical" 
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    requiredMark={false}
                >
                    <Form.Item 
                        name="art" 
                        label="Your art style includes"
                        rules={[
                            {
                                validator(_, value) {
                                    if(value === undefined) {
                                        return Promise.reject();
                                    }
                                    if(value.length > 3) {
                                        return Promise.reject('You can select maximum 3 art styles');
                                    }
                                    return Promise.resolve();
                                  },
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="select atleast one art style"
                            onChange={handleChange}
                            optionLabelProp="label"
                        >
                            <Option value="dancing" label="Dancing">
                            <div className="demo-option-label-item">
                                Dancing
                            </div>
                            </Option>
                            <Option value="painting" label="Painting">
                            <div className="demo-option-label-item">
                                Painting
                            </div>
                            </Option>
                            <Option value="doodling" label="Doodling">
                            <div className="demo-option-label-item">
                                Doodling
                            </div>
                            </Option>
                            <Option value="singing" label="Singing">
                            <div className="demo-option-label-item">
                                Singing
                            </div>
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="collab" label="You up for collabaration">
                        <Switch defaultChecked/>
                    </Form.Item>
                    <Form.Item noStyle={true}>
                        <div className="submit-container">
                            <p className="submit-text">Let’s collaborate</p>
                            <Button 
                                type="text" 
                                htmlType="submit" 
                                shape="circle"
                                icon={
                                    <RightCircleFilled 
                                        style={{color:'black', fontSize:30}}
                                    />
                                }
                            >
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ProfileModal;