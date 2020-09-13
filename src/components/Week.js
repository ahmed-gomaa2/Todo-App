import React, {Component} from 'react';
import Today from './Today'
import Tomorrow from "./Tomorrow";

class Week extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Today />
                <Tomorrow />
            </div>
        );
    }
}

export default Week;