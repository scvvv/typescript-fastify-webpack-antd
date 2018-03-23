import { AxiosHttp } from "util/AxiosHttp"

export class FirstApi {

    getFirstApi = (params = {}) => {
        return AxiosHttp({
            method: 'get',
            url: '/main',
        })
    };
}
