import Title from '../../components/title';
import Image from 'next/image';
import avatar from '../../public/images/avatar.png'
import React, { useEffect } from 'react';
import { Table, Pagination, Space } from 'antd';
import { Button, Card, Avatar } from 'antd';

// https://ant.design/components/card/
const { Meta } = Card;

// https://ant.design/components/table/
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    theme: "independence day",
    description: 'collage',
  },
  {
    key: '2',
    name: 'John',
    theme: "Black Friday",
    description: 'lets make a movie',
  },
];

const columns = [
  {
    title: 'Sender Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Theme',
    dataIndex: 'theme',
    key: 'theme',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Accept </a>
        <a>Reject</a>
      </Space>
    ),
  },
];


/**
 * @description On Click tab active the window
 * @param actionName contain the string from which button click
 */
const toggleTab = (actionName) => {
  let i;
  let tabContent;
  let tabLinks;
  tabContent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  document.getElementById(actionName).style.display = "block";
  document.getElementById(`${actionName}_1`).classList.add('active');
};

const ArtistProfile = () => {
  return (
    <>
      <Title title="Artist Profile" />
      <div className="artist-profile-page container">
        <div className="absolute-div">
          <div className="col-xl-5 col-md-5 col-sm-5">
            <div className="wrapper">
              <div className="grouped">
                <input className="input" placeholder="Theme" type="text" />
              </div>
              <div className="grouped">
                <textarea placeholder="Note" name="w3review" rows={4} cols={32}></textarea>
              </div>
              <div className="grouped">
                <button className="btn btn-success" type="button">Send Collab Request</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="avtr">
              <Image src={avatar} alt="Landing page" className="rounded mx-auto d-block" />
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="_artist">
              <span className="f-20">Rahul Gupta</span>
              <span className="f-12">painter, Singer</span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="_connect">
              <span className="">
                <a>Follow</a>
              </span>
              <span className="">
                <a>Message</a>
              </span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12 _tab-p">
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div className="tab">
                <button id="about_1" className="tablinks active about" onClick={() => toggleTab('about')}>About</button>
                <button id="sample_1" className="tablinks sample" onClick={() => toggleTab('sample')}>My sample work</button>
                <button id="collab_1" className="tablinks collab" onClick={() => toggleTab('collab')}>Collab Requests</button>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div id="about" className="tabcontent" style={{ display: 'block' }}>
                <p className="f-w-b">Description</p>
                <p>My name is rahul gupta and i like to paint, sing, write etc and etc. How about you are doing and let me do what i need to do so fuck off.</p>
                <p className="f-w-b">My SKills</p>
                <p>Painter, Singer, Song Writing </p>
              </div>

              <div id="sample" className="tabcontent">
                <p className="f-w-b">Sample</p>
                <p>Sample 1</p>
              </div>
              <div id="collab" className="tabcontent">
                <h4 className="f-w-b">Pending Request</h4>
                <Table dataSource={dataSource} columns={columns} />
                <h4 className="f-w-b">Scheduled Request</h4>
                <Table dataSource={dataSource} columns={columns} />
                <h4 className="f-w-b">Completed Request</h4>
                <Table dataSource={dataSource} columns={columns} />
                <h4 className="f-w-b">Rejected Request</h4>
                
                <Card
                // we can put this card in loop here.
                  style={{ width: 300 }}
                  cover={
                    <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
                  }
                  actions={[
                    <Button type="primary">Accept</Button>,
                    <Button type="primary">Reject</Button>,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Independence Day"
                    description="Let's make a vide on it."
                  />
                </Card>
                <Pagination defaultCurrent={1} total={50}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistProfile;