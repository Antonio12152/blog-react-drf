import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Card } from "antd";
import * as actions from '../store/actions/auth'
import FormHOC from "./FormHOC";

const ArticleDetail = (props) => {
    const [state, setState] = useState({
        artircle: {}
    })
    const artircleId = useParams().id
    const getPost = () => {
        const token = actions.getToken()
        if (!token) return 
        axios.get(`http://127.0.0.1:8000/api/v1/postlists/${artircleId}`,
            {
                headers: {
                    Authorization: 'Token ' + token
                }
            })
            .then(resp => setState({
                artircle: resp.data
            }))
    }
    useEffect(() => getPost(), [])
    return (
        <div>
            <Card title={state.artircle.title}>
                <p>{state.artircle.content}</p>
                <p>{state.artircle.time_update}</p>
            </Card>
            <h2>Update this post</h2>
            <FormHOC artircleId={artircleId} requestType='put' {...props} getPost={getPost} />
        </div>
    )
}
export default ArticleDetail;