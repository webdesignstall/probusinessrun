import React, { useState, useEffect } from 'react';
import { Session } from 'meteor/session';

function StairsFee() {
    let [stairsFee, setStairsFee] = useState(0);

    useEffect(() => {
        let job = Session.get('job_');
        setStairsFee(job.stairsFee || 0);
    }, []);

    useEffect(() => {
        let job = Session.get('job_');
        job.stairsFee = stairsFee;

        Session.set('job_', job);
    }, [stairsFee]);

    let onChangeHandler = e => {
        setStairsFee(e.target.value);
    };

    return (
        <div className="input-field">
            <label htmlFor="stairsfee" className="active">
                Stairs Fee
            </label>
            <input
                className="xx"
                type="number"
                placeholder="0"
                onChange={e => onChangeHandler(e)}
                id="stairsfee"
                value={stairsFee > 0 ? stairsFee : ''}
            />
        </div>
    );
}

export default StairsFee;
