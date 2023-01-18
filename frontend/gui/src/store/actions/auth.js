import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = () => ({ type: actionTypes.AUTH_START })
export const authSuccess = token => ({ type: actionTypes.AUTH_SUCCESS, token })
export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error })
export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationData')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}
export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`http://127.0.0.1:8000/auth/token/login/`, {
            username,
            password
        })
            .then(resp => {
                const token = resp.data.auth_token
                const expirationData = new Date()
                localStorage.setItem('token', token)
                localStorage.setItem('expirationData', expirationData)
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(error => dispatch(authFail(error)))
    }
}
export const authSingUp = (username, email, password) => {
    return dispatch => {
        dispatch(authStart())
        return axios.post(`http://127.0.0.1:8000/api/v1/auth/users/`, {
            username,
            email,
            password,
        })
            .then(resp => {
                const token = resp.data.key
                const expirationData = new Date()
                localStorage.setItem('token', token)
                localStorage.setItem('expirationData', expirationData)
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(error => dispatch(authFail(error)))
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(authLogout())
        } else {
            const expirationData = new Date(localStorage.getItem('expirationData'))
            if (expirationData <= new Date()) {
                dispatch(authLogout())
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationData.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
export const getToken = () => {
    return localStorage.getItem('token')
}