import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

import InputForm from './InputForm';

class Manage extends Component {

  state = {
    fullName: "",
    bloodType: "",
    isDonor: false,
    birthDate: ""
  };

  handleInputChange = (event) => {

    if (event.target.name === "fullName") {
      this.setState({fullName: event.target.value});
    } else if(event.target.name === "bloodType") {
      this.setState({bloodType: event.target.value});
    } else if(event.target.name === "birthDate") {
      this.setState({birthDate: event.target.value});
    } else if(event.target.name === "isDonor") {
      this.setState({isDonor: event.target.checked});
    }
  };

  handleCreateHealthIdButtonClick = () => {
    console.log("click!");
  };

  render() {
    const {classes} = this.props;

    return (
        <React.Fragment>
          <InputForm classes={classes} viewOnly={false} handleInputChange={this.handleInputChange}
                     fullName={this.state.fullName} bloodType={this.state.bloodType} isDonor={this.state.isDonor}
                     birthDate={this.state.birthDate}/>
          <Button variant="contained" color="primary" className={classes.button} fullWidth
                  onClick={this.handleCreateHealthIdButtonClick}>
            Create HealthID
          </Button>
        </React.Fragment>
    );
  }
}

Manage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Manage;