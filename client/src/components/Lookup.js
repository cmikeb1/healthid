import React, {Component} from "react";
import PropTypes from "prop-types";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputForm from "./InputForm";
import Typography from '@material-ui/core/Typography';

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

class Lookup extends Component {

  state = {
    fullName: "",
    bloodType: "",
    isDonor: false,
    birthDate: "",
    healthIdFound: false,
    lookupAddress: "",
    nope: false
  };

  handleLookupButtonClick = async () => {

    const {contract, accounts} = this.props;

    try {
      const foundHealthId = await contract.methods.accounts(this.state.lookupAddress).call({from: accounts[0]});

      if (foundHealthId && foundHealthId.owner !== EMPTY_ADDRESS) {

        let birthDay = foundHealthId.birthDay;
        birthDay = birthDay.length === 1 ? "0" + birthDay : birthDay;
        let birthMonth = foundHealthId.birthMonth;
        birthMonth = birthMonth.length === 1 ? "0" + birthMonth : birthMonth;

        const birthDateString = foundHealthId.birthYear + "-" + birthDay + "-" + birthMonth;

        this.setState({
          healthIdFound: true,
          fullName: foundHealthId.name,
          bloodType: foundHealthId.bloodType,
          isDonor: foundHealthId.organDonor,
          birthDate: birthDateString,
          nope: false
        });
      } else {
        this.setState({nope: true, healthIdFound: false, bloodType: "", isDonor: false, birthDate: ""});
      }
    } catch (error) {
      this.setState({nope: true, healthIdFound: false, bloodType: "", isDonor: false, birthDate: ""});
    }
  };

  handleLookupAddressUpdate = (event) => {
    this.setState({lookupAddress: event.target.value, nope: false});
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
                onChange={this.handleLookupAddressUpdate}
                required
                value={this.state.lookupAddress}
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
            <React.Fragment>
              <Typography align={"center"} variant="subtitle1" color="inherit" noWrap>
                Found a HealthID
              </Typography>
              <InputForm classes={classes} viewOnly={true} birthDate={this.state.birthDate}
                         fullName={this.state.fullName}
                         isDonor={this.state.isDonor} bloodType={this.state.bloodType}/>
            </React.Fragment>
            }
            {this.state.nope &&
            <Typography align={"center"} variant="subtitle1" color="inherit" noWrap>
              Couldn't find HealthID for address: {this.state.lookupAddress}
            </Typography>
            }
          </div>
        </React.Fragment>
    );
  }
}

Lookup.propTypes = {
  classes: PropTypes.object.isRequired,
  contract: PropTypes.object,
  accounts: PropTypes.array
};

export default Lookup;