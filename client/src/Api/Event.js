import { axiosRequest, getRequest } from "./AxiosRequest";

export const getAllEvents = async () => {
    const res = await getRequest("events");
    return res;
}
export const getMyEvents = async () => {
    const res = await getRequest("events/myEvents");
    return res;
}
export const CreateEvent = async (data) => {
    const res = await axiosRequest("POST", "events", {
        name: data.get("name"),
        description: data.get("description"),
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        fees: data.get("fees"),
        location: data.get("location"),
        image: data.get("image")
    });
    return res;
}

export const EventDetails = async (id) => {
    return await getRequest(`events/${id}`);
}

export const EnrollEvent = async (id) => {
    return await getRequest(`events/${id}/enroll`);
}

export const DeleteEvent = async (id) => {
    return await getRequest(`events/${id}`);
}