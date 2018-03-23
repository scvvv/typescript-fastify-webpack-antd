import * as Bluebird from 'bluebird'
import axios, { AxiosRequestConfig } from "axios"


export function AxiosHttp(AxiosConfig: AxiosRequestConfig = {}) {
    return new Bluebird((resolve: any, reject: any) => {
        axios(AxiosConfig).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    })
}
