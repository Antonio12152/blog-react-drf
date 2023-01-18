import React from 'react';
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth'
import Spinner from './Spinner';
const Login = props => {
    let navigate = useNavigate()
    const handleFormSubmit = event => {
        const username = event.target.username.value
        const password = event.target.password.value
        props.onAuth(username, password)
        navigate('/')
    }
    let errorMessage = null
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    return (
        <div>
            {errorMessage}
            {
                props.loading ?
                    <Spinner />
                    :
                    <Form name="login" onSubmitCapture={(event) => handleFormSubmit(event)}>
                        <Form.Item label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input name="username" placeholder="put here username" />
                        </Form.Item>
                        <Form.Item label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password name="password" placeholder="put here password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button> or <NavLink to='/singup/'>SingUp</NavLink>
                        </Form.Item>
                    </Form>
            }
        </div>
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);