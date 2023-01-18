import React from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Singup = props => {
    let navigate = useNavigate()
    const handleFormSubmit = (event) => {
        const username = event.target.username.value
        const email = event.target.email.value
        const password = event.target.password.value
        props.onAuth(username, email, password)
        navigate('/')
    }
    return (
        <Form name="singup" onSubmitCapture={(event) => handleFormSubmit(event)}>
            <Form.Item label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input name="username" placeholder="put here username" />
            </Form.Item>
            <Form.Item label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input name="email" placeholder="put here email" />
            </Form.Item>
            <Form.Item label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password name="password" placeholder="put here password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Sing up</Button>
            </Form.Item>
        </Form>
    );
};
const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password) => dispatch(actions.authSingUp(username, email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Singup);