import React, {Component} from 'react';
import {connect} from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import Main from './main';
import Header from './header';

class UserMatch extends Component {

  componentDidMount() {
    document.getElementById('root').firstChild.style.textAlign = 'center';
  }

  render() {
    const headerOptions = {
      title: 'Describe yourself',
      subtitle: 'Order each landmark from the most applicable to you to the least'
    };

    return (
      <MuiThemeProvider styles={{textAlign: 'center'}}>
        <div>
          <Header {...headerOptions}/>
          <Main/>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default connect()(UserMatch);
