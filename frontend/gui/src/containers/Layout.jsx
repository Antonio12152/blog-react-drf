import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'
import { NavLink } from 'react-router-dom';
const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const CustomLayout = (props) => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >

                        <Breadcrumb.Item><NavLink to='/'>Home</NavLink></Breadcrumb.Item>
                        {
                            props.isAuthenticated ?
                                <Breadcrumb.Item><NavLink to='/' onClick={props.onAuth}>Logout</NavLink></Breadcrumb.Item>
                                :
                                <Breadcrumb.Item><NavLink to='/login/'>Login</NavLink></Breadcrumb.Item>
                        }
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }} 
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.authLogout())
    }
}
export default connect(null, mapDispatchToProps)(CustomLayout);