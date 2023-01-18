import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import FormDelete from './FormDelete';
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const Article = (props) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 10,
    }}
    dataSource={props.data}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
          title={<NavLink to={`/${item.id}`}>{item.title}</NavLink>}
          description={item.description}
        />
        {item.content}
        <br />
        {item.time_update.slice(0, 10)}
        <FormDelete artircleId={item.id} {...props}/>
      </List.Item>
    )}
  />
);
export default Article;