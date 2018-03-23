import { observable, action } from 'mobx';
import _ from 'lodash';
import { message } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

export interface Sorter {
    order: string;
    field: string;
}

export class UiStore {
    @observable public _SpiLoading: boolean = false; // 页面加载loading
    @observable public _RefreshLoading: boolean = false; // 刷新按钮loading
    @observable
    public pagination: PaginationProps = {
        showQuickJumper: true,
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`,
    };

    @action
    public searchCallback(res) {
        if (res.success) {
            const data = res.result;
            const pagination = this.pagination;
            this.pagination = _.assign(pagination, {
                total: data.total,
                pageSize: data.pageSize,
                current: data.pageNumber,
            });
        } else {
            message.error(res.message, 3);
        }

        this._SpiLoading = false;
        this._RefreshLoading = false;
    }

    @action
    public changeState(params) {
        this._RefreshLoading = params;
    }
}
