import React, { Component } from "react";
import firebase from "firebase";
import firebase_config from "./credential/key";
import {
  Grid,
  Button,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Paper
} from "@material-ui/core";
import MemberData from "./components/member_data_display";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      member: null,
      msg: "請輸入姓名及email來看會員編號唷"
    };
    this.database = firebase.initializeApp(firebase_config).database();
  }

  onSearchChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSearchClick = e => {
    e.preventDefault();
    this.setState({ member: null });
    this.database
      .ref("members")
      .child(this.state.name)
      .child("ChiName")
      .once("value")
      .then(data => {
        if (data.val()) {
          this.database
            .ref("members")
            .child(this.state.name)
            .child("Email")
            .once("value")
            .then(data => {
              if (data.val() === this.state.email) {
                // 名字與email都對
                this.setState({
                  msg: this.state.name + "您好！"
                });
                this.database
                  .ref("members")
                  .child(this.state.name)
                  .once("value")
                  .then(data => this.setState({ member: data.val() }));
              } else {
                // 名字對email錯
                this.setState({
                  msg:
                    this.state.name +
                    "您好！不好意思，您有在此登錄為會員，但因您的email不符合，故我們無法給您看您的資料，請確認您輸入的email是正確的，謝謝！"
                });
              }
            });
        } else {
          // 名字錯
          this.setState({
            msg:
              "不好意思，您似乎沒有在我們這裡登錄為會員，請再次確認您的姓名有無打錯（或曾改名改姓）"
          });
        }
      });
  };

  render() {
    return (
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item xs={12} md={6}>
          <Paper className="paper">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="display1" align="center">
                  留港臺灣學生會會員資料確認
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form className="form">
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">中文全名</InputLabel>
                    <Input
                      id="name"
                      name="name"
                      autoFocus
                      onChange={this.onSearchChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                      id="email"
                      name="email"
                      onChange={this.onSearchChange}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="secondary"
                    className="submit"
                    onClick={this.onSearchClick}
                  >
                    Submit
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  {this.state.msg}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {this.state.member ? (
          <MemberData member={this.state.member} database={this.database} />
        ) : null}
      </Grid>
    );
  }
}

export default App;
