import React, { Component } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";

export default class MemberData extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.member;
  }

  componentDidMount = () => {
    if (
      this.props.member.EngName === "" ||
      this.props.member.Phone === "" ||
      this.props.member.School === "" ||
      this.props.member.GradYear === 0 ||
      this.props.member.GradYear === "" ||
      this.props.member.Sex === ""
    ) {
      this.setState({ complete: false });
    } else {
      this.setState({ complete: true });
      this.props.database
        .ref("company")
        .once("value")
        .then(data => {
          this.setState({
            companyName: data.val().name,
            companyCode: data.val().key
          });
        });
    }
    if (this.props.member.EngName === "") {
      this.setState({ EngName: "你還沒填英文名字唷" });
    }
    if (this.props.member.Phone === "") {
      this.setState({ Phone: "你還沒填手機唷" });
    }
    if (this.props.member.School === "") {
      this.setState({ School: "你還沒填學校唷" });
    }
    if (this.props.member.GradYear === 0 || this.state.GradYear === "") {
      this.setState({ GradYear: "你還沒填畢業年唷" });
    }
    if (this.props.member.Sex === "") {
      this.setState({ Sex: "你還沒填性別唷" });
    }
    this.setState({
      Sex:
        this.props.member.Sex === "M"
          ? "男"
          : this.props.member.Sex === "F"
          ? "女"
          : this.state.Sex === "你還沒填性別唷" || ""
          ? this.props.member.Sex
          : "其他"
    });
  };

  render() {
    return (
      <Grid item xs={12} md={8}>
        <Paper className="paper main">
          <Grid container direction="row" alignItems="center" spacing={8}>
            <Grid item xs={6}>
              <Typography variant="display2" align="right">
                {this.state.ChiName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">{this.state.EngName}</Typography>
              <Typography variant="caption">{this.state.Email}</Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                手機：
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{this.state.Phone}</Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                會員編號：
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                {this.state.complete
                  ? this.state.MemberID
                  : "請您到下面連結補齊資料拜託"}
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                性別：
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{this.state.Sex}</Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                學校：
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{this.state.School}</Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                畢業年：
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{this.state.GradYear}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {this.state.complete ? (
          <Paper className="paper">
            <Typography variant="title" align="center">
              資料齊全！
              <hr />
            </Typography>
            <Typography variant="body1">
              {this.state.ChiName}
              您好！謝謝您完成資料驗證作業，協助留港臺灣學生會建立完整的會員名冊。
              以下是本次機票優惠活動辦法：
              <br />
              中華航空公司香港分公司提供兩個套優惠方案給留港臺灣學生會會員：
              <br />
              <br />
              1. 專屬企業帳號
              <blockquote>
                ＊為維護會員權利，請不要將這份帳號密碼外洩＊
                <br />
                至中華航空公司官方網站登入該組帳號密碼訂購機票，可享有機票優惠，時段及目的地無限制。優惠以中華航空公司香港分公司公告為主。
                <br />
                （首頁＞訂位購票＞企業會員購票）
                <br />
                注意：優惠僅限於香港出發之航班。
              </blockquote>
              2. 學生機票優惠
              <blockquote>
                即學生機票，
                <a href="https://www.china-airlines.com/tw/zh">詳請見此</a>
              </blockquote>
              感謝中華航空公司香港分公司提供優惠，中華航空公司香港分公司保有更改權利
            </Typography>
            {this.state.GradYear > 2017 ? (
              <div>
                <hr />
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  以下是您的留港機票優惠帳號密碼，此組帳密僅供留港會員使用，請小心收著別被人看到啦！
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                      {this.state.companyName ? "帳號：" : "loading..."}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {this.state.companyName ? this.state.companyName : null}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                      {this.state.companyCode ? "密碼：" : "loading..."}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {this.state.companyCode ? this.state.companyCode : null}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            ) : null}
          </Paper>
        ) : (
          <Paper className="paper">
            <Typography variant="title" align="center">
              資料未完成
            </Typography>
            <hr />
            <Typography variant="body1" style={{ textAlign: "center" }}>
              {this.state.ChiName}您好！
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              您的會員資料登錄不完全，請至
              <a href="https://goo.gl/forms/O0XUdM1jQWcj5JMT2">表單</a>
              填寫資料，以享有會員專屬優惠。
            </Typography>
          </Paper>
        )}
      </Grid>
    );
  }
}
