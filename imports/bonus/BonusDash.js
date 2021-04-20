import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import BonusSettings from '../../common/bonusData';
import WorkData from '../../common/collections_2';
import { Session } from 'meteor/session';

export default class BonusDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            totalJobs: 0,
            jobs: [],
            jobsCalculated: [],
            employeeBonusInfo: {},
            employeeBonusInfoKey: []
        };

        this.renderBonusList = this.renderBonusList.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.setState({
                options: [],
                totalJobs: 0,
                jobs: [],
                jobsCalculated: [],
                employeeBonusInfo: {},
                employeeBonusInfoKey: []
            });
            Meteor.subscribe('bonusData');
            let dateForSettings = `${new Date().getMonth()}/01/${new Date().getFullYear()}`;
            let data = BonusSettings.find({
                date: dateForSettings
            }).fetch();
            let date_ = new Date();
            let ay = date_.getMonth();
            let yearOfDate_ = date_.getFullYear();
            if (Session.get('lastMont')) {
                ay--;

                if (ay < 0) {
                    yearOfDate_--;
                    ay = 11;
                }
            }
            let newDate = new Date(ay + 1 + '/01/' + yearOfDate_);

            Meteor.subscribe('calendar', newDate);

            let totalJobs = WorkData.find({}, { limit: 30 }).fetch();

            totalJobs.sort((a, b) => {
                let dateA = new Date(a.wonDate).getTime();
                let dateB = new Date(b.wonDate).getTime();

                return dateA - dateB;
            });

            let jobsCalculated = data[0] && data[0].options ? totalJobs.slice(data[0].options[0].bonus) : [];

            data.length > 0
                ? this.setState(
                      {
                          _id: data[0]._id,
                          options: data[0].options,
                          jobs: totalJobs,
                          totalJobs: totalJobs.length,
                          jobsCalculated
                      },
                      () => {
                          this.state.jobsCalculated.map(job => {
                              this.setState(prevState => {
                                  let employeeBonusInfo = prevState.employeeBonusInfo;
                                  if (Array.isArray(employeeBonusInfo[job.takenBy])) {
                                      let bonusAmount = 0;

                                      this.state.options.map(option => {
                                          option.value === job.movingSize ? (bonusAmount = option.bonus) : null;
                                      });
                                      employeeBonusInfo[job.takenBy].push({
                                          [job.jobNumber]: bonusAmount
                                      });
                                  } else {
                                      let bonusAmount = 0;

                                      this.state.options.map(option => {
                                          option.value === job.movingSize ? (bonusAmount = option.bonus) : null;
                                      });

                                      employeeBonusInfo[job.takenBy] = [{ [job.jobNumber]: bonusAmount }];
                                  }

                                  return {
                                      employeeBonusInfo
                                  };
                              });
                          });
                      }
                  )
                : null;
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderBonusesForEmployee(keys, employeeBonusInfo) {
        return keys.map((key, index) => {
            return (
                <React.Fragment key={'jobNumberBonus' + index}>
                    <div className="col s12 m6 l6">#{key}</div>
                    <div className="col s12 m6 l6 right-align">${employeeBonusInfo[index][key]}</div>
                </React.Fragment>
            );
        });
    }

    renderBonusList() {
        let employeesId = Object.keys(this.state.employeeBonusInfo);
        let { employeeBonusInfo } = this.state;

        return employeesId.map((_id, index) => {
            let takenBy = Meteor.users.findOne({ _id });
            let total = 0;
            let keys = [];

            employeesId.length > 0 &&
                employeeBonusInfo[_id].map((jobNumberBonus, index) => {
                    keys.push(Object.keys(jobNumberBonus));

                    total += jobNumberBonus[keys[index]];
                });

            return (
                <div key={'employeebonuslist' + index} className="row">
                    <div className="col s12 m4 l4 employeeBonusMain">
                        <div className="row">
                            <div className="col s12 m6 l6">
                                {(takenBy && takenBy.profile && takenBy.profile.firstName) || ''}{' '}
                                {(takenBy && takenBy.profile && takenBy.profile.lastName) || ''}
                            </div>
                            <div className="col s12 m6 l6 right-align">Total: ${total}</div>
                        </div>
                        <div className="row">{this.renderBonusesForEmployee(keys, employeeBonusInfo[_id])}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        let { totalJobs } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col">Job Limit: {this.state.options[0] ? this.state.options[0].bonus : 0}</div>
                    <div
                        className={
                            this.state.options[0] && totalJobs > this.state.options[0].bonus ? 'col more_than' : 'col less_than'
                        }
                    >
                        Job Total this month: {this.state.totalJobs || 0}
                    </div>
                </div>
                <div className="row">
                    {this.state.options[0] && totalJobs > this.state.options[0].bonus ? this.renderBonusList() : ''}
                </div>
            </div>
        );
    }
}
