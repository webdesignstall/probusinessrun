import React from 'react';

export default class Addresses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayOfvalue: ['', '']
        }

        this.renderAddressFields = this.renderAddressFields.bind(this);
        this.addMore = this.addMore.bind(this);
        // this.inputChangeHandler = this.inputChangeHandler.bind(this)
    }

    inputChangeHandler(i) {
        let arrayOfvalue = [...this.state.arrayOfvalue];
        arrayOfvalue[i] = event.target.value;
        this.setState({ arrayOfvalue });
    }

    renderAddressFields() {
        return (
            this.state.arrayOfvalue.map((el, i) =>
                <div key={i} className="input-field valideyn col s12 m6 l6">
                    <i className="material-icons isare">location_on</i>
                    <input key={i} className="addresses" type="text" placeholder="" value={this.state.arrayOfvalue[i]} onChange={this.inputChangeHandler.bind(this, i)} />
                    <label className="active" htmlFor="movingFrom">{'Address #' + (i + 1)}</label>
                </div>
            )
        )
    }
    // add functionality to the multi address 
    addMore() {
        this.setState(prevState => ({
            arrayOfvalue: [...prevState.arrayOfvalue, '']
        }));
    }

    render() {
        return (
            <div>
                <div>
                    Addresses
                    <div className="addMoreAddress cardBorder" onClick={this.addMore}>
                        <span>Add More</span>
                        <i className="ikonka material-icons">
                            add_circle
                        </i>
                    </div>
                </div>
                <hr />
                {this.renderAddressFields()}
            </div>
        );
    }
}
