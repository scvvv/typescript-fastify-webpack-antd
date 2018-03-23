import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {uiStore} from "page/UiStore";
import {Icon, Layout, Avatar, Menu, Dropdown} from 'antd'
import * as style from './HeaderStyle.pcss';

const {Header} = Layout;
const redirectUrl = process.env.REDIRECT_URL;

@observer
export class HeaderCustom extends Component<any, any> {

    public onClick = () => {
        uiStore.setCollapsed(!uiStore.collapsed);
    };
    public state = {
        visible: false,
    };
    public handleMenuClick = (e) => {
        if (e.key === '1') {
            this.setState({visible: false});
            window.location.href = redirectUrl + 'login.html#/';
            sessionStorage.clear();
        }
    };
    public handleVisibleChange = (flag) => {
        this.setState({visible: flag});
    };

    public render() {
        const inMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" style={{width: 100, padding: 10, textAlign: 'center'}}>退出登录</Menu.Item>
            </Menu>
        );

        const outMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" style={{width: 100, padding: 10, textAlign: 'center'}}>登录</Menu.Item>
            </Menu>
        );
        return (
            <Header style={{background: '#fff', padding: 0}} className="custom-theme">
                <Icon
                    className="trigger custom-trigger"
                    type={uiStore.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.onClick}
                />
                {
                    sessionStorage.getItem('LoginType') === 'LoginIn' ?
                        <div className={style.right}>
                            <Dropdown overlay={inMenu}
                                      onVisibleChange={this.handleVisibleChange}
                                      visible={this.state.visible}
                            >
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            </Dropdown>
                        </div> :
                        <div className={style.right}>
                            <Dropdown overlay={outMenu}
                                      onVisibleChange={this.handleVisibleChange}
                                      visible={this.state.visible}
                            >
                                <Avatar icon="user" />
                            </Dropdown>
                        </div>
                }
            </Header>
        )
    }
}
