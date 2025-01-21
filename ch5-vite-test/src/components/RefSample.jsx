import React, { Component } from 'react';

class RefSample extends Component {
    input = React.createRef();

    handleFocus = () => {
        this.input.current.focus();
    };

    render() {
        return (
            <div>
                <input ref={this.input} />
                <button onClick={this.handleFocus}>Focus Input</button>
            </div>
        );
    }
}

export default RefSample;