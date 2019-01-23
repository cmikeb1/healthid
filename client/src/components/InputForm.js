import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";
import React, {Component} from "react";

class InputForm extends Component {

  render() {
    const {classes, viewOnly, fullName, bloodType, birthDate, isDonor, handleInputChange} = this.props;

    return (
        <React.Fragment>
          <FormControl className={classes.formControl} fullWidth required disabled={true}>
            <TextField
                id="fullName"
                name="fullName"
                label="Full name"
                required
                disabled={viewOnly}
                onChange={handleInputChange}
                value={fullName}
            />
          </FormControl>
          <br/>
          <br/>
          <FormControl className={classes.formControl} fullWidth required disabled={viewOnly}>
            <InputLabel htmlFor="blood-type">Blood type</InputLabel>
            <Select
                value={bloodType}
                onChange={handleInputChange}
                inputProps={{
                  name: 'bloodType',
                  id: 'blood-type',
                }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Aplus"}>A+</MenuItem>
              <MenuItem value={"Oplus"}>O+</MenuItem>
              <MenuItem value={"Bplus"}>B+</MenuItem>
              <MenuItem value={"ABplus"}>AB+</MenuItem>
              <MenuItem value={"Aneg"}>A-</MenuItem>
              <MenuItem value={"Oneg"}>O-</MenuItem>
              <MenuItem value={"Bneg"}>B-</MenuItem>
              <MenuItem value={"ABneg"}>AB-</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <br/>
          <FormControl className={classes.formControl} fullWidth required disabled={viewOnly}>
            <TextField
                id="birthdate"
                label="Date of Birth"
                type="date"
                name="birthDate"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={viewOnly}
                onChange={handleInputChange}
                value={birthDate}
            />
          </FormControl>
          <br/>
          <br/>
          <FormGroup row>
            <FormControlLabel
                control={
                  <Checkbox
                      name="isDonor"
                      checked={isDonor}
                      onChange={handleInputChange}
                      value="isDonor"
                      color="primary"
                      disabled={viewOnly}
                  />
                }
                label="Organ donor?"
            />
          </FormGroup>
        </React.Fragment>
    );
  }
}

InputForm.propTypes = {
  classes: PropTypes.object.isRequired,
  viewOnly: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func,
  fullName: PropTypes.string,
  bloodType: PropTypes.string,
  isDonor: PropTypes.bool,
  birthDate: PropTypes.string
};

export default InputForm;










