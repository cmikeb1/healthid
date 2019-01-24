import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputForm from './InputForm';


class Manage extends Component {

  state = {
    fullName: "",
    bloodType: "",
    isDonor: false,
    birthDate: "",
    readyToSubmit: false,
    processing: false
  };

  componentDidMount() {
    if (this.props.existingHealthId) {
      this.handleExistingHealthId();
    }
  }

  componentDidUpdate(prevProps) {
    // check if we have an existing healthId
    if (prevProps.existingHealthId === null && this.props.existingHealthId) {
      this.handleExistingHealthId();
    }
  }

  handleExistingHealthId() {
    let birthDay = this.props.existingHealthId.birthDay;
    birthDay = birthDay.length === 1 ? "0" + birthDay : birthDay;
    let birthMonth = this.props.existingHealthId.birthMonth;
    birthMonth = birthMonth.length === 1 ? "0" + birthMonth : birthMonth;

    const birthDateString = this.props.existingHealthId.birthYear + "-" + birthDay + "-" + birthMonth;
    this.setState({
      fullName: this.props.existingHealthId.name,
      bloodType: this.props.existingHealthId.bloodType,
      isDonor: this.props.existingHealthId.organDonor,
      birthDate: birthDateString
    });
  }

  handleInputChange = (event) => {

    // update the state with new input
    if (event.target.name === "fullName") {
      this.setState({fullName: event.target.value}, this.validate);
    } else if (event.target.name === "bloodType") {
      this.setState({bloodType: event.target.value}, this.validate);
    } else if (event.target.name === "birthDate") {
      this.setState({birthDate: event.target.value}, this.validate);
    } else if (event.target.name === "isDonor") {
      this.setState({isDonor: event.target.checked}, this.validate);
    }
  };

  validate = () => {
    // check if we're ready to submit to the blockchain
    if (!this.state.fullName && this.state.name.length === 0) {
      this.setState({readyToSubmit: false});
      return;
    }

    if (!this.state.bloodType && this.state.bloodType.length === 0) {
      this.setState({readyToSubmit: false});
      return;
    }

    if (!this.state.birthDate && this.state.birthDate.length === 0) {
      this.setState({readyToSubmit: false});
      return;
    }

    this.setState({readyToSubmit: true});
  };

  handleCreateHealthIdButtonClick = () => {
    this.setState({processing: true});

    const {fullName, bloodType, birthDate, isDonor} = this.state;
    const {contract, accounts} = this.props;

    let birthDateParts = birthDate.split("-");
    const birthYear = birthDateParts[0];
    const birthMonth = birthDateParts[1];
    const birthDay = birthDateParts[2];

    const baseThis = this;

    if (this.props.existingHealthId) {
      contract.methods.updateAccount(fullName, bloodType, isDonor, birthYear, birthMonth, birthDay).send({from: accounts[0]})
          .on('transactionHash', function (hash) {
            console.log("transactionHash");
            console.log(hash);
          })
          .on('confirmation', function (confirmationNumber, receipt) {
            console.log("confirmation");
            console.log(confirmationNumber);
            console.log(receipt);
          })
          .on('receipt', function (receipt) {
            console.log("receipt");
            console.log(receipt);
            baseThis.setState({processing: false});
          })
          .on('error', function (error) {
            console.log("error");
            console.log(error);
            baseThis.setState({processing: false});
          });
    } else {
      contract.methods.newAccount(fullName, bloodType, isDonor, birthYear, birthMonth, birthDay).send({from: accounts[0]})
          .on('transactionHash', function (hash) {
            console.log("transactionHash");
            console.log(hash);
          })
          .on('confirmation', function (confirmationNumber, receipt) {
            console.log("confirmation");
            console.log(confirmationNumber);
            console.log(receipt);
          })
          .on('receipt', function (receipt) {
            console.log("receipt");
            console.log(receipt);
            baseThis.setState({processing: false});
          })
          .on('error', function (error) {
            console.log("error");
            console.log(error);
            baseThis.setState({processing: false});
          });
    }
  };

  render() {
    const {classes, existingHealthId, contract, accounts} = this.props;

    return (
        <React.Fragment>
          {existingHealthId &&
          <React.Fragment>
            <Typography variant="h5" color="inherit" noWrap>
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" color="inherit" noWrap>
              Use the form below to manage your HealthID.
            </Typography>
          </React.Fragment>
          }
          {!existingHealthId &&
          <React.Fragment>
            <Typography variant="h5" color="inherit" noWrap>
              Welcome to Your HealthID
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Use the form below to submit your essential health data to the blockchain.
            </Typography>
          </React.Fragment>
          }
          <br/>
          <InputForm classes={classes} viewOnly={this.state.processing} handleInputChange={this.handleInputChange}
                     fullName={this.state.fullName} bloodType={this.state.bloodType} isDonor={this.state.isDonor}
                     birthDate={this.state.birthDate}/>
          <Button variant="contained" color="primary" className={classes.button} fullWidth
                  onClick={this.handleCreateHealthIdButtonClick}
                  disabled={!this.state.readyToSubmit || this.state.processing}>
            {this.props.existingHealthId ? "Update HealthID" : "Create HealthID"}
          </Button>
        </React.Fragment>
    );
  }
}

Manage.propTypes = {
  classes: PropTypes.object.isRequired,
  existingHealthId: PropTypes.object,
  contract: PropTypes.object,
  accounts: PropTypes.array,
  updateExistingHealthId: PropTypes.func
};

export default Manage;