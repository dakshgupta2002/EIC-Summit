import Axios from 'axios';

const UserLogin = async (data) => {
    const res = await  Axios.post('http://localhost:3333/user/login', data)
    console.log(res.json())
}

export default UserLogin;