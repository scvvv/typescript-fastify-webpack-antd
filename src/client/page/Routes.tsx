/***
 * szh 2018/3/8 routes
 */

import _ from 'lodash/fp'

export interface IRoute {
    path: string
    name: string
    icon: string
    leaf: IRoute[]
}

export class Routes {
    main = '/main';
    sys = '/sys'
}

export const rt: Routes = _.toPlainObject(new Routes());


export const RouterConfig: IRoute[] = [
    {
        path: rt.main,
        name: '首页',
        icon: 'shop',
        leaf: []
    }, {
        path: rt.sys,
        name: '配置',
        icon: 'shop',
        leaf: []
    }
];



