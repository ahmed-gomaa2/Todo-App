import React, {Component} from 'react';
import Today from './Today'
import Tomorrow from "./Tomorrow";
import AfterTomorrow from "./AfterTomorrow";

class Week extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Today />
                <Tomorrow />
                <AfterTomorrow />

            </div>
        );
    }
}

export default Week;