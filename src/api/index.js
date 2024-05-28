import {request} from "@/services/api";


export const getVolumes = ({params={},url='/'}) => {
    const result = request.get(url, {params});
    return result.then((response) => response.data);
};
export const getMostOrdered = ({params={},url='/'}) => {
    const result = request.get(url, {params});
    return result.then((response) => response.data);
};

export const getGroups = ({params={},url='/'}) => {
    const result = request.get(url, {params});
    return result.then((response) => response.data);
};
export const getCategories = ({params={},url='/'}) => {
    const result = request.get(url, {params});
    return result.then((response) => response.data);
};
