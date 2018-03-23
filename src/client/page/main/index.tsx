import React, {Component} from 'react'
import {observer} from 'mobx-react'
import * as style from './mainStyle.pcss'
import {FirstApi} from 'api/first'

const api = new FirstApi();


@observer
export default class Main extends Component<any, any> {

    constructor(props) {
        super(props);
        api.getFirstApi().then(result => {
            console.log(result, 'szh')
        });
    }

    render() {
        return (
            <div className={style.main}>
                <div>222</div>
                <div>333</div>
                <div>555</div>
                <div>888</div>
                <img src={require('./resource/pic_arrow.png')}/>
            </div>
        )
    }
}


