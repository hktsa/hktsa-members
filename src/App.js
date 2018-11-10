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
      msg: "請輸入姓名及email來看會員編號唷",
      notMember: false,
      notEmail: false
    };
    this.database = firebase.initializeApp(firebase_config).database();
  }

  onSearchChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSearchClick = e => {
    e.preventDefault();
    this.setState({ member: null, notMember: false, msg: "", notEmail: false });
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
                    "您好！您所輸入的信箱與您登記的不相同，請確認是否有輸入錯誤。",
                  notEmail: true
                });
              }
            });
        } else {
          // 名字錯
          this.setState({
            msg:
              this.state.name +
              "您好！不好意思，您可能尚未登記成為會員，或是輸入資料有誤。",
            notMember: true
          });
        }
      });
  };

  render() {
    return (
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item xs={12} md={8}>
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
                {this.state.notMember ? (
                  <Typography variant="body1" align="center">
                    立即成為會員請<a href="google.com">點此填寫資料</a>
                  </Typography>
                ) : null}
                {this.state.notEmail ? (
                  <Typography variant="body1" align="center">
                    忘記登記之信箱請
                    <a href="https://www.facebook.com/roc.hktsa/">點此詢問</a>
                  </Typography>
                ) : null}
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
