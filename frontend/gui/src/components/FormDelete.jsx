import { Button, Form } from 'antd';
import * as actions from '../store/actions/auth'
import axios from 'axios';

const FormDelete = (props) => {
    const token = actions.getToken()
    if (!token) return
    const handleFormSubmit = (event, artircleId) => {
        return axios.delete(`http://127.0.0.1:8000/api/v1/postdelete/${artircleId}`,
            {
                headers: {
                    Authorization: 'Token ' + token
                }
            })
            .then(response => console.log(response))
            .then(resp => props.getPosts())
    };
    return (
        <Form onSubmitCapture={(event) => handleFormSubmit(event, props.artircleId)}>
            <Form.Item  >
                <Button htmlType='submit' type="primary" danger>Delete</Button>
            </Form.Item>
        </Form >
    )
}

export default FormDelete;