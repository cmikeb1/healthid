import React, {Component} from "react";
import PropTypes from "prop-types";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputForm from "./InputForm";

class Lookup extends Component {

  state = {
    fullName: "",
    bloodType: "",
    isDonor: false,
    birthDate: "",
    healthIdFound: false
  };

  handleLookupButtonClick = () => {
    this.setState({
      healthIdFound: true,
      fullName: "Some Name",
      bloodType: "Aplus",
      isDonor: true,
      birthDate: "1985-01-01"
    });
    console.log("Look it up!");
  };

  render() {
    const {classes} = this.props;

    return (
        <React.Fragment>
          <FormControl className={classes.formControl} fullWidth required>
            <TextField
                id="healthIdAddress"
                name="healthIdAddress"
                label="HealthID Address"
                required
            />
          </FormControl>
          <Button variant="contained" color="primary" className={classes.button} fullWidth
                  onClick={this.handleLookupButtonClick}>
            Lookup HealthID
          </Button>
          <br/>
          <br/>
          <div>
            {this.state.healthIdFound &&
            <InputForm classes={classes} viewOnly={true} birthDate={this.state.birthDate} fullName={this.state.fullName}
                       isDonor={this.state.isDonor} bloodType={this.state.bloodType} />}
          </div>
        </React.Fragment>
    );
  }
}

Lookup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Lookup;