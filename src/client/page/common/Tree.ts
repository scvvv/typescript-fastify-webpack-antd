import * as _ from "lodash";

export interface TreeNode {
    parent?: any;
    label?: string;
    key?: any;
    value?: any;
    name?: any;
    id?: any;
    children?: TreeNode[]
}

/**
 * 将平级结构的数组转换成tree树状数据结构
 * @param nodes
 * @returns {Array}
 */
export function getTreeNode(nodes: TreeNode[]) {
    const gc = function (parent) {
        let temp;
        return _.map(nodes, function (item: TreeNode) {
            if (item.parent === parent) {
                const obj: TreeNode = {
                    label: item.name,
                    key: item.id,
                    value: item.id
                };

                temp = gc(item.id);

                if (!!temp && temp.length > 0) {
                    obj.children = temp;
                }

                return obj;
            }
        })
    }

    return gc(0);
}

/**
 * tree的数据结构缓存(通过版本号控制是否需要再次请求)
 */
// export const loadArea = function () {
//     const key = "AreaTreeData";
//     const dataString = localStorage.getItem(key);
//     let areaData: any[] = [];
//
//     let data = {
//         version: '',
//         areaList: []
//     }
//
//     if (dataString) {
//         data = JSON.parse(dataString);
//     }
//
//     // return areaTreeController.loadTree({version:data.version}).then((res)=>{
//     //     if(!!res && !!res.areaList && res.areaList.length > 0){
//     //         localStorage.setItem(key, JSON.stringify(res));
//     //         areaData = res.areaList;
//     //     } else {
//     //         areaData = data.areaList;
//     //     }
//     //
//     //     return areaData;
//     // })
// }

/**
 * 根据叶子节点和整棵树寻找树节点(叶子节点所包含的子父级节点)
 * @param {Array} areaIds 叶子结点id
 * @param {Array} treeData 平级树状结构
 * @returns {string[]}
 */
export function formatAreaTreeData(areaIds = [], treeData = []) {

    const areaIdsMap = _.map(areaIds, function (item) {
        return _.find(treeData, function (area: any) {
            return area.id === item;
        })
    });

    return _.filter(treeData, function (item: any) {
        const treePathArray = item.treePath.split(',');
        return _.some(areaIdsMap, function (area) {
            return _.difference(treePathArray, area.treePath.split(',')).length === 0;
        })
    });
}

