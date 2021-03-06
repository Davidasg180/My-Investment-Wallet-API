import React, { useState, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import AccountsGroupsServices from "../services/accountsGroupsServices";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: `40%`,
  },
}));

export default props => {
  const classes = useStyles();

  const [accountsGroups, setAccountsGroups] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState('');

  const accountsGroupsServices = new AccountsGroupsServices();
  useEffect(() => {
    accountsGroupsServices.find().then(result => setAccountsGroups(result));
  }, []);

  useEffect(() => {
    props.onChange(
      account,
      currency
    );
    // eslint-disable-next-line
  }, [account, currency]);

  useEffect(() => {
    if(account) accountsGroupsServices.find(account).then(result => setAccounts(result['account']));
    // eslint-disable-next-line
  }, [account]);

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl} >
        <InputLabel htmlFor="origin-account">Account</InputLabel>
        <Select
          value={account}
          onChange={e => setAccount(e.target.value)}
          className={classes.select}
        >
          {
            accountsGroups.map(({ id, name }) => {
              return (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} >
        <InputLabel>Currency</InputLabel>
        <Select
          value={currency}
          onChange={e => { setCurrency(e.target.value) }}
          className={classes.select}
        >
          {
            accounts.map(({ id, name }) => {
              return (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>

    </form >

  );
}