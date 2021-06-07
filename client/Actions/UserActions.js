//import IndexQuery from '../ApiQuery/IndexQuery'
import Axios from 'axios';
import { USER_CREATE_REQ, USER_CREATE_SUCCESS, USER_CREATE_FAILURE, USER_HOLD_MAIL, 
    USER_HOLD_PASSWORD_MAIL, USER_FIND_REQ, USER_FIND_SUCCESS, USER_FIND_FAIL }  from '../Constants/UserConstants'
//import Axios from 'axios';

//const user = IndexQuery.UserQuery

const createUser = (data) => async (dispatch) => {
    dispatch({ type: USER_CREATE_REQ })
    try {
        const create = new FormData()
        data.user_email && create.append('user_email', data.user_email)
        data.user_password && create.append('user_password', data.user_password)
        data.user_name && create.append('user_name', data.user_name)
        data.user_birthdate && create.append('user_birthdate', data.user_birthdate)
        data.user_avatar && create.append('user_avatar', data.user_avatar)
        create.append('user_type', 'USER')
        const result = await Axios.post('/api/users/create', create)
        dispatch({ type: USER_CREATE_SUCCESS, payload: result.data })
        //console.log(result)
        return result

    } catch (err) {
        dispatch({ type: USER_CREATE_FAILURE, payload: err.response.data })
        return err.response
    }
}

const holdMail = (data) => (dispatch) => {
    dispatch({ type: USER_HOLD_MAIL, payload: data })
}

const holdPasswordMail = (data) => (dispatch) => {
    dispatch({ type: USER_HOLD_PASSWORD_MAIL, payload: data})
}

/* const findUserById = (id) => (dispatch) => {
    dispatch({ type: USER_FIND_REQ })
    try {
        const result = await axios.get()
    }
    catch (err) {

    }
} */

export default {
    createUser,
    holdMail,
    holdPasswordMail
}