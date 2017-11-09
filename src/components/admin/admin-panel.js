import React, { Component } from 'react';
import { connect } from 'react-redux';
import Statistics from './statistics';
import StatsTable from './stats-table';
import styles from './admin-panel.css';
// import { fetchStatistics } from '../../actions/statistics-actions';
// import { Image, Button, ControlLabel } from 'react-bootstrap/lib';
// import { browserHistory } from 'react-router';

class AdminPanel extends Component {

  render() {
    const data = {
      users: [
        {
          userId: "0001",
          email: 'test@gmail.com',
          date_registered: '22/10/2017',
          feedback: 'Easy to use'
        },
        {
          userId: "0002",
          email: 'test22@gmail.com',
          date_registered: '22/09/2017',
          feedback: 'Terrible :('
        }
      ]
    };

    const landmarkData = [JSON.stringify({"portrait_id":"-AEaOcNiNdy-Bg","EB_FLAT_SHAPED":null,"EB_ANGLED":"1","EB_ROUNDED":"0.5","EYE_MONOLID_ALMOND":null,"EYE_DEEP_SET":"0.5","EYE_DOWNTURNED":"1","EYE_HOODED":null,"NOSE_AQUILINE":"0.8","NOSE_FLAT":null,"NOSE_ROMAN_HOOKED":"1","NOSE_SNUB":null,"not_applicable":"0","gender":"male","mustache":null,"beard":null,"features_completed":"1","date_completed":"2017-11-08 12:09:50"},{"portrait_id":"-AFEwq5ypw9Dzg","EB_FLAT_SHAPED":"1","EB_ANGLED":null,"EB_ROUNDED":null,"EYE_MONOLID_ALMOND":"0.3","EYE_DEEP_SET":"1","EYE_DOWNTURNED":"0.5","EYE_HOODED":null,"NOSE_AQUILINE":"1","NOSE_FLAT":null,"NOSE_ROMAN_HOOKED":"0.8","NOSE_SNUB":null,"not_applicable":"0","gender":"male","mustache":"0.5","beard":null,"features_completed":"1","date_completed":"2017-11-01 20:29:19"},{"portrait_id":"0wE5Q-cZA_kmTg","EB_FLAT_SHAPED":null,"EB_ANGLED":"0.5","EB_ROUNDED":"1","EYE_MONOLID_ALMOND":"1","EYE_DEEP_SET":"0.3","EYE_DOWNTURNED":null,"EYE_HOODED":"0.5","NOSE_AQUILINE":null,"NOSE_FLAT":"0.4","NOSE_ROMAN_HOOKED":null,"NOSE_SNUB":"1","not_applicable":"0","gender":"male","mustache":"0.5","beard":"0.5","features_completed":"1","date_completed":"2017-11-03 19:31:12"},{"portrait_id":"1AFSaozgcaepFw","EB_FLAT_SHAPED":"1","EB_ANGLED":null,"EB_ROUNDED":null,"EYE_MONOLID_ALMOND":"0.3","EYE_DEEP_SET":"1","EYE_DOWNTURNED":"0.5","EYE_HOODED":null,"NOSE_AQUILINE":"0.8","NOSE_FLAT":null,"NOSE_ROMAN_HOOKED":"1","NOSE_SNUB":null,"not_applicable":"0","gender":"male","mustache":"0.5","beard":"0.5","features_completed":"1","date_completed":"2017-11-01 21:17:15"},{"portrait_id":"1AGyWZOD_dLlcQ","EB_FLAT_SHAPED":null,"EB_ANGLED":"1","EB_ROUNDED":"0.5","EYE_MONOLID_ALMOND":null,"EYE_DEEP_SET":"0.5","EYE_DOWNTURNED":"1","EYE_HOODED":null,"NOSE_AQUILINE":null,"NOSE_FLAT":"1","NOSE_ROMAN_HOOKED":null,"NOSE_SNUB":"0.3","not_applicable":"0","gender":"male","mustache":null,"beard":null,"features_completed":"1","date_completed":"2017-11-01 22:29:34"},{"portrait_id":"1QHdsu3t2HA4uQ","EB_FLAT_SHAPED":null,"EB_ANGLED":"1","EB_ROUNDED":"0.5","EYE_MONOLID_ALMOND":"1","EYE_DEEP_SET":"0.3","EYE_DOWNTURNED":null,"EYE_HOODED":"0.5","NOSE_AQUILINE":null,"NOSE_FLAT":"1","NOSE_ROMAN_HOOKED":null,"NOSE_SNUB":"0.3","not_applicable":"0","gender":"male","mustache":"0.5","beard":null,"features_completed":"1","date_completed":"2017-11-01 21:29:52"},{"portrait_id":"2AEb5-UkNNV6mQ","EB_FLAT_SHAPED":null,"EB_ANGLED":"1","EB_ROUNDED":"0.5","EYE_MONOLID_ALMOND":"0.3","EYE_DEEP_SET":"1","EYE_DOWNTURNED":"0.5","EYE_HOODED":null,"NOSE_AQUILINE":null,"NOSE_FLAT":"1","NOSE_ROMAN_HOOKED":null,"NOSE_SNUB":"0.3","not_applicable":"0","gender":"male","mustache":null,"beard":null,"features_completed":"1","date_completed":"2017-11-01 22:52:44"})];

    return (
      <div className={styles.container}>
        <Statistics/>
        <div className={styles.tablesContainer}>
          <StatsTable type="user" data={data} />
          <StatsTable type="landmark" data={landmarkData} />
        </div>
      </div>
    )
  }

}

export default connect()(AdminPanel);
