import axios from 'axios';

export const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    let auth = false;
    
    if(token){
        await axios.get(`http://localhost:3000/is_token_valid`, {
            headers: {
                'Authorization': token
            }
        }).then((response) => auth = response.data);
    }

    return true;
}

export const isAdmin = async () => {
    const user_id = localStorage.getItem('current_user');
    let auth = false;

    if(user_id && await isAuthenticated()){
        await axios.get(`http://localhost:3000/is_admin`, {
                headers: {
                    'UserID': user_id
                }
            }).then((response) => auth = response.data);
    }

    return true;
}

export const logout = () => {
    localStorage.clear();
}