import {$authHost, $host} from "./index";

export const createCompare = async (userId,deviceId,typeId) => {
    const {data} = await $authHost.post('api/compare',{
        userId:userId,deviceId:deviceId,typeId:typeId
    })
    return data
}
export const deleteCompare = async (id) => {
    const {data} = await $authHost.delete('api/compare/'+ id)
    return data
}
export const fetchCompare = async () => {
    const {data} = await $host.get('api/compare')
    return data
}