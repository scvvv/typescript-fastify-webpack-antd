import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
import * as style from './SiderStyle.pcss'
import {observer} from "mobx-react"
import _ from 'lodash/fp';
import {uiStore} from 'page/UiStore'
import {RouterConfig, IRoute} from 'page/Routes'

const Sider = Layout.Sider;
const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

@observer
export class SideBar extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    public MenuClick = e => {
        uiStore.setSelectedKeys(e.key);
    };

    public openMenu = v => {
        uiStore.setOpenKeys(v[v.length - 1]);
    };

    public render() {
        return (
            <Sider
                trigger={null}
                collapsible={true}
                collapsed={uiStore.collapsed}
                breakpoint={`md`}
                width={150}
            >
                <div className={style.logo}>
                    <Link to="/"><h1>XAPM</h1></Link>
                </div>
                <Menu
                    onClick={this.MenuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[uiStore.selectedKeys]}
                    onOpenChange={this.openMenu}
                    openKeys={[uiStore.openKeys]}
                >
                    {
                        RouterConfig.map((route: IRoute) => {
                            if (_.isEmpty(route.leaf)) {
                                return (
                                    <Item key={route.path}>
                                        <Link to={route.path}>
                                            {route.icon ? <Icon type={route.icon}/> : null}
                                            <span className="nav-text">{route.name}</span>
                                        </Link>
                                    </Item>
                                )
                            } else {
                                return (
                                    <SubMenu
                                        key={route.path}
                                        title={<span>
                                           {route.icon ? <Icon type={route.icon}/> : null}
                                            <span className="nav-text">{route.name}</span></span>}>
                                        {route.leaf ? route.leaf.map((routeItem: IRoute) => {
                                            return <Item key={routeItem.path}><Link
                                                to={routeItem.path}>{routeItem.name}</Link></Item>
                                        }) : null
                                        }
                                    </SubMenu>
                                )
                            }
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

