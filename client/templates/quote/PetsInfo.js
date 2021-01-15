import React, { useState, useEffect } from 'react';
import { Session } from 'meteor/session';

function PetsInfo() {
    let [pets, setPets] = useState();

    let setPetfn = () => {
        setPets(!pets);
    };

    useEffect(() => {
        setPets(!!Session.get('job_').pets);
    }, []);

    useEffect(() => {
        let job = Session.get('job_');
        job.pets ? (job.pets = false) : (job.pets = true);

        Session.set('job_', job);
    }, [pets]);

    return (
        <>
            <button
                className={pets ? 'waves-effect waves-light btn red' : 'waves-effect waves-light btn grey'}
                onClick={setPetfn}
                style={{ height: '28px', lineHeight: '30px' }}
            >
                Pets
            </button>
        </>
    );
}

export default PetsInfo;
