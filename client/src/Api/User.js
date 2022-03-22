import { axiosRequest } from "./AxiosRequest";

export const UserRegister = async (data) => {
    const res = await axiosRequest("POST", "user/register", {
        "email": data
    });
    return res;
}

export const UserVerify = async (data) => {
    const res = await axiosRequest("POST", "user/register/verify", data);
    return res;
}

export const UserCreate = async (data) => {
    const res = await axiosRequest("POST", "user/register/create", data);
    return res;
}

export const UserLogin = async (data) => {
    const res = await axiosRequest("POST", "user/login", data);
    return res;
}

