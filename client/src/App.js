import React, {Component} from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from './components/TabContainer';
import {withStyles} from '@material-ui/core/styles';
import withRoot from './withRoot';
import Manage from "./components/Manage";
import Lookup from "./components/Lookup";

import HealthIdContract from "./contracts/HealthId.json";
import getWeb3 from "./utils/getWeb3";


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: 0,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

class App extends Component {

  state = {
    web3: null,
    accounts: null,
    contract: null,
    currentTab: 0,
    existingHealthId: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthIdContract.networks[networkId];
      const instance = new web3.eth.Contract(
          HealthIdContract.abi,
          deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({web3, accounts, contract: instance}, this.runApp);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runApp = async () => {
    await this.updateExistingHealthId()
  };

  updateExistingHealthId = async () => {
    const {accounts, contract} = this.state;

    // Stores a given value, 5 by default.
    const existingHealthId = await contract.methods.accounts(accounts[0]).call({from: accounts[0]});

    if (existingHealthId && existingHealthId.owner !== EMPTY_ADDRESS) {
      this.setState({existingHealthId: existingHealthId});
    }
  };

  handleTabChange = (event, value) => {
    this.setState({currentTab: value});
  };

  render() {
    const {classes, theme} = this.props;
    const {accounts, contract, existingHealthId} = this.state;


    // if (!this.state.web3) {
    if (false) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div className={classes.root}>
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                HealthID
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <AppBar position="static" color="default">
                <Tabs
                    value={this.state.currentTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                  <Tab label="Manage your HealthID"/>
                  <Tab label="Lookup a HealthID"/>
                </Tabs>
              </AppBar>
              <br/>
              <Typography align={"center"} variant="caption" color="inherit" noWrap>
                YOU ARE
              </Typography>
              <Typography align={"center"} variant="body1" color="inherit" noWrap>
                {accounts && accounts[0]}
              </Typography>
              {this.state.currentTab === 0 &&
              <TabContainer dir={theme.direction}><Manage classes={classes} existingHealthId={existingHealthId}
                                                          contract={contract} accounts={accounts}
                                                          updateExistinghealthid={this.updateExistingHealthId}/></TabContainer>}
              {this.state.currentTab === 1 &&
              <TabContainer dir={theme.direction}><Lookup classes={classes} contract={contract} accounts={accounts}/></TabContainer>}
            </Paper>
          </main>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles, {withTheme: true})(App));
