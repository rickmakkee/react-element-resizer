import React from 'react';
import ElementResizer, {ScaleMode} from '../src/ElementResizer';

class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '500px',
                height: '500px',
                transform: 'translate(-50%, -50%)'
            }}>
                <ElementResizer scaleMode={ScaleMode.COVER} elementWidth={1920} elementHeight={1080} overflowVisible>
                    <img src="https://placeimg.com/1920/1080/nature" alt=""/>
                </ElementResizer>

                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    border: '3px solid red'
                }}/>
            </div>
        )
    }
}

export default Example;