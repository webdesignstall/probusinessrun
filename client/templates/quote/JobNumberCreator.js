import { Session } from 'meteor/session';
import WorkData from '../../../common/collections_2';

export default function jobNumberCreator() {
    let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
    jobNumber = jobNumber.toString();
    let howManyZero = 6 - jobNumber.length;
    if (howManyZero > 0) {
        for (let i = 0; i < howManyZero; i++) {
            jobNumber = '0' + jobNumber;
        }
    }
    let result = WorkData.find({ jobNumber }).fetch();
    result && result.length > 0 ? this.jobNumber_() : null;
    let job = Session.get('job_');
    job.jobNumber = jobNumber;
    Session.set('job_', job);
    return jobNumber;
}
