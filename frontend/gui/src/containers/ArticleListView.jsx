import { useEffect } from "react";
import { useState } from "react";
import Article from "../components/Article";
import * as actions from '../store/actions/auth'
import axios from "axios"
import FormHOC from "./FormHOC";
const ArticleList = (props) => {
    const [state, setState] = useState({
        articles: []
    })
    const getPosts = () => {
        axios.get('http://127.0.0.1:8000/api/v1/postlists/')
            .then(resp => setState({
                articles: resp.data
            }))
    }
    useEffect(() => getPosts(), [])
    return (
        <div>
            <h2>Create an Article</h2>
            <FormHOC requestType='post' getPosts={getPosts} />
            <Article data={state.articles} getPosts={getPosts} />
        </div>
    )
}
export default ArticleList;