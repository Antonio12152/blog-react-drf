import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import * as actions from '../store/actions/auth'
import { useState } from 'react';

const { TextArea } = Input;
const CustomForm = (props) => {
    const [titleValue, setTitleValue] = useState('')
    const changeTitleValue = (e) => {
        setTitleValue(e.target.value)
    }
    const [contentValue, setContentValue] = useState('')
    const changeContentValue = (e) => {
        setContentValue(e.target.value)
    }
    const [state, setState] = useState({
        catSelectedId: props.state.catSelected.id
    })
    const token = actions.getToken()
    if (!token) {
        return <div>Register or login!</div>
    }
    const handleChange = (value) => {
        setState({
            catSelectedId: value
        })
    };
    const handleFormSubmit = (event, requestType, artircleId) => {
        const title = event.target.elements.title.value
        const content = event.target.elements.content.value
        switch (requestType) {
            case 'post':
                return axios.post(`http://127.0.0.1:8000/api/v1/postlists/`, {
                    title,
                    content,
                    cat: state.catSelectedId,
                },
                    {
                        headers: {
                            Authorization: 'Token ' + token
                        }
                    })
                    .then(response => console.log(response))
                    .then(() => props.getPosts())
                    .then(() => setTitleValue(''))
                    .then(() => setContentValue(''))
            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/v1/postlists/${artircleId}/`, {
                    title,
                    content,
                    cat: state.catSelectedId,
                },
                    {
                        headers: {
                            Authorization: 'Token ' + token
                        }
                    })
                    .then(response => console.log(response))
                    .then(resp => props.getPost())
                    .then(() => setTitleValue(''))
                    .then(() => setContentValue(''))
        }
    }
    return (
        <Form onSubmitCapture={(event) => handleFormSubmit(event, props.requestType, props.artircleId)}>
            <Form.Item label="title">
                <Input placeholder="put a title here" name='title' onChange={changeTitleValue} value={titleValue} required />
            </Form.Item>
            <Form.Item label="content">
                <TextArea rows={4} placeholder="enter some content" name='content' onChange={changeContentValue} value={contentValue} />
            </Form.Item>
            <Form.Item label="category">
                <Select name='cat'
                    defaultValue={props.state.catSelected.name}
                    onChange={handleChange}
                    options={props.state.cats.map(cat => ({
                        value: cat.id,
                        label: cat.name
                    }))}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
};
export default CustomForm;