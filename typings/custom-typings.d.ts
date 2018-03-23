declare const GLOBAL: {
    imgPath: string;
    uploadPath: string;
    apiPath: string;
};

declare const WeixinJSBridge;

// declare const module: any;
//
// declare const require: any;
//
// declare let process: {
//     env: {
//         NODE_ENV: string
//     }
// };

declare const BMap: any;
declare const BMapLib: any;
declare const BMAP_ANCHOR_TOP_LEFT: string;
declare const BMAP_ANCHOR_BOTTOM_RIGHT: string;

declare module "lodash/fp" {
    import _ = require("lodash");
    export = _;
}

declare const System: any;

declare module "*.json" {
    const value: any;
    export const version: string;
    export default value;
}
