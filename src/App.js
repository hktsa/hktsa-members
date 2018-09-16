import React, { Component } from "react";
import firebase from "firebase";
import firebase_config from "./credential/key";
import { Grid, Button, Typography, FormControl, Input, InputLabel, Avatar, Paper } from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import MemberData from "./components/member_data_display";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonText: "get data", email: "", name: "", msg: "請輸入姓名及email來看會員編號唷" };
    this.database = firebase.initializeApp(firebase_config).database();
  }

  onSearchChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSearchClick = e => {
    e.preventDefault();
    this.setState({ member: null });
    this.database
      .ref("/members")
      .orderByChild("ChiName")
      .equalTo(this.state.name)
      .once("value")
      .then(data => {
        let searching = data.val();
        if (searching === null) this.setState({ msg: "請再確認你的姓名及email有沒有打錯，或聯絡留港莊員" });
        else {
          searching = searching[Object.keys(searching)[0]];
          var flag = true;
          searching.Email.forEach(email => {
            if (this.state.email === email) {
              this.setState({ msg: "你的會員編號是 " + searching.MemberID + "，請確認以下資料有無需要更改的地方！" });
              this.setState({ member: searching });
              flag = false;
            }
          });
          if (flag) {
            this.setState({ msg: "請再確認你的姓名及email有沒有打錯，或聯絡留港莊員" });
            console.log(searching);
          } else {
          }
        }
      });
  };

  render() {
    return (
      <Grid container alignItems="center" justify="center" spacing={24} direction="column">
        <Grid item xs={12} md={6}>
          <Paper className="paper">
            <Avatar className="avatar">
              <LockIcon />
            </Avatar>
            <Typography variant="display1">留港臺灣學生會會員資料確認</Typography>

            <form className="form">
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">中文全名</InputLabel>
                <Input id="name" name="name" autoFocus onChange={this.onSearchChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" onChange={this.onSearchChange} />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="secondary"
                className="submit"
                onClick={this.onSearchClick}>
                Submit
              </Button>
            </form>
            <Typography variant="body1">{this.state.msg}</Typography>
          </Paper>
        </Grid>

        {this.state.member ? <MemberData member={this.state.member} /> : null}
      </Grid>
    );
  }
}

export default App;
