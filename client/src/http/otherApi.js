import {$autoHost, $host} from "./index";

export const fetchData = async (instance, token) => {
    const {data} = await $host.get('api/other/ReceiveNotifications', {params: {instance, token
        }})
    return data
}