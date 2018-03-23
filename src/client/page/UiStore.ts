import {observable, action} from "mobx";

class UIStore {
    @observable
    public collapsed: boolean = false;
    @observable
    public selectedKeys: string = '';
    @observable
    public openKeys: string = '';

    @action
    public setCollapsed(value) {
        this.collapsed = value;
    }

    @action
    public setSelectedKeys(value) {
        this.selectedKeys = value;
    }

    @action
    public setOpenKeys(value) {
        this.openKeys = value;
    }
}

export const uiStore = new UIStore();
