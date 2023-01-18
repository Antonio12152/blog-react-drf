import axios from 'axios';
import { useState, useEffect } from 'react';
import CustomForm from '../components/Form';
const FormHOC = (props) => {
    const [state, setState] = useState({
        cats: [],
        catSelected: {}
    })
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/cats/')
            .then(resp => setState({
                cats: resp.data,
                catSelected: resp.data[0]
            }))
    }, [])
    if (state.cats.length) {
        return (
            <CustomForm {...props} state={state} />
        )
    }
}
export default FormHOC;