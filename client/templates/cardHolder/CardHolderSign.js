import React from 'react';

let CardHolderSign = () => (
    <div className="col s12 m6 l6 offset-m3 offset-l3">
        <p>Cardholder – Please Sign and Date</p>
        <div className="input-field col s12 m6 l6">
            <input placeholder="print name" id="cardholder_name" type="text" className="validate" />
            <label htmlFor="cardholder_name" className="active">
                Name <span className="red_star">*</span>
            </label>
        </div>
        <div className="input-field col s12 m6 l6">
            <input placeholder="print date" id="cardholder_date" type="text" className="validate" />
            <label htmlFor="cardholder_date" className="active">
                Date <span className="red_star">*</span>
            </label>
        </div>
    </div>
);

export default CardHolderSign;
