import React, {Component} from 'react';
import Today from './Today'
import Tomorrow from "./Tomorrow";
import AfterTomorrow from "./AfterTomorrow";
import './css/Week.css'

class Week extends Component {
    render() {
        return (
            <div className={'week'} style={{width: "100%"}}>
                <Today />
                <Tomorrow />
                <AfterTomorrow />

            </div>
        );
    }
}

export default Week;