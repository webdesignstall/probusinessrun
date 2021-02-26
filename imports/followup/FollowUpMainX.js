import React, { Component } from 'react';
import MainContext, { MainProvider } from './Context';
import FollowUpMain from './FollowUpMain';

export default class FollowUpMainX extends Component {
    render() {
        return (
            <MainProvider>
                <FollowUpMain />
            </MainProvider>
        );
    }
}
