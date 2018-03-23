import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'
import LazyLoad from './LazyLoad'
import { Layout } from 'antd'
import { SideBar } from './layout/sider'
import { HeaderCustom } from './layout/header'

const { Content } = Layout;

@observer
export default class App extends Component<any, any> {

    render() {
        return (
            <Router>
                <Switch>
                    <Layout>
                        <SideBar />
                        <Layout>
                            <HeaderCustom />
                            <Content style={{ margin: '0 16px' }}>
                                <Route
                                    exact={true}
                                    path='/main'
                                    render={props => <LazyLoad {...props} component={import('./main')}/>}
                                />
                                <Route
                                    exact={true}
                                    path='/sys'
                                    render={props => <LazyLoad {...props} component={import('./sys')}/>}
                                />
                            </Content>
                        </Layout>
                    </Layout>
                </Switch>
            </Router>
        )
    }
}

