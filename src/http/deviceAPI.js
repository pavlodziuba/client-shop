import {$authHost, $host} from "./index";
import { getUserName} from "./userAPI";
import jwt_decode from "jwt-decode";


//------------------------------------------------------------------------All action with types
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
//------------------------------------------------------------------------All action with brands
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}
export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete('api/brand/'+ id)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}
//------------------------------------------------------------------------All action with devices

// Create new device in DB
export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}
// Find all devices in DB
export const fetchAllDevices = async () => {
 const {data} = await $host.get('api/device')
 return data
}
// Find all devices with filters in DB
export const fetchDevices = async (price,typeId, brandId, page, limit= 5) => {
       if((price?.min) == undefined){ return }
       price = [price.min,price.max] 
    const {data} = await $host.get('api/device', {params: {
            price,typeId, brandId, page, limit
        }})
    return data
}
// Find one device in DB
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
// Delete device from DB
export const deleteDevice = async (id) => {
    const {data} = await $authHost.delete('api/device/'+ id)
    return data
}
// Update device from DB
export const updateDevice = async (device,id) => {
    const {data} = await $authHost.put('api/device/' + id, device)
    return data
}
// Update device from DB
export const setRatingForDevice = async (id,newRating) => {
    const raitng = Math.floor(newRating)
    const {data} = await $authHost.put('api/device'+ '/' + id + '/' + raitng)
    return data
}
//------------------------------------------------------------------------Fetch info for devices
export const fetchInfo = async () => {
    const {data} = await $authHost.get('api/deviceinfo')
    return data
}
//------------------------------------------------------------------------All action with basket

// Find all devices in basket 
export const fetchBasketDevices = async (userId) => {
    const {data} = await $authHost.get('api/basketdevices')
    return data.filter(value => value.basketId == userId)
}
// Add new device to basket
export const addBasketDevice = async (basket) => {
    const {data} = await $authHost.post('api/basketdevices/', basket)
    return data
}
// Add new device to basket
export const remBasketDevice = async (basket,num) => {
    basket.num = num
    const {data} = await $authHost.put('api/basketdevices/', basket)
    return data
}
// Remove device from basket
export const deleteBasketDevice = async (id) => {
    const {data} = await $authHost.delete('api/basketdevices/'+ id)
    return data
}


export const createSeenBasketDevices = async (userId,deviceIdArr) => {
    const {data} = await $authHost.put('api/basketseendevices',{
        deviceIdArr: deviceIdArr,basketId:userId
    })
    return data
}
 
export const fetchSeenBasketDevices = async (userId) => {
    const {data} = await $authHost.get('api/basketseendevices/'+ userId)
    return data
}


//------------------------------------------------------------------------All action with rating

export const createRating = async (userId,deviceId,message,rate,name) => {
    const {data} = await $authHost.post('api/rating',{
        userId:userId,deviceId:deviceId,message:message,rate:rate,name:name
    })
    fetchRating().then(allRating => {
        const filteredRatings = allRating.filter(rating => rating.deviceId === deviceId);
        let allRate = 0;
        let countRate = 0;
        filteredRatings.forEach(rating => {
            allRate += rating.rate; 
            countRate += 1;         
        });
        const newRate = countRate === 0 ? 0 : allRate / countRate;

        setRatingForDevice(deviceId, newRate);
    })
    return data
}
export const editRating = async (userId,deviceId,message,rate) => {
    const {data} = await $authHost.put('api/rating',{
        userId:userId,deviceId:deviceId,message:message,rate:rate
    })
    fetchRating().then(allRating => {
        const filteredRatings = allRating.filter(rating => rating.deviceId === deviceId);
        let allRate = 0;
        let countRate = 0;
        filteredRatings.forEach(rating => {
            allRate += rating.rate; 
            countRate += 1;         
        });
        const newRate = countRate === 0 ? 0 : allRate / countRate;

        setRatingForDevice(deviceId, newRate);
    })
    return data
}
export const deleteRating = async (deviceId,userId) => {
    const {data} = await $authHost.delete('api/rating/'+deviceId+'/'+userId)
    fetchRating().then(allRating => {
        const filteredRatings = allRating.filter(rating => rating.deviceId === deviceId);
        let allRate = 0;
        let countRate = 0;
        filteredRatings.forEach(rating => {
            allRate += rating.rate; 
            countRate += 1;         
        });
        const newRate = countRate === 0 ? 0 : allRate / countRate;

        setRatingForDevice(deviceId, newRate);
    })
    return data
}
export const fetchRating = async () => {
    const {data} = await $authHost.get('api/rating',)
    return data
}