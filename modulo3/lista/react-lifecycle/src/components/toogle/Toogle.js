import React, { Component } from 'react'

export default class Toogle extends Component {
    handleChange = (event) => {
        const { onToggle } = this.props;

        const isChecked = event.target.checked;
        onToggle(isChecked);
    }
    render() {
        const { enable, description } = this.props;
        return (
            <div className="switch">
                <label>
                    {description}
                    <input
                        type="checkbox"
                        checked={enable}
                        onChange={this.handleChange} />
                    <span className="lever" />
                </label>
            </div>
        )
    }
}
