import React, { Component } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";

export default class MemberData extends Component {
  render() {
    return (
      <Grid item xs={12} md={6}>
        <Paper className="paper">
          <Typography variant="title">
            {this.props.member.ChiName} {this.props.member.EngName}
          </Typography>
          {this.props.member.Email.map(email => (
            <Typography variant="caption">{email}</Typography>
          ))}
          <Typography variant="subheading">
            會員編號：
            {this.props.member.MemberID}
          </Typography>
          <Typography variant="subheading">
            性別：
            {this.props.member.Sex === "M" ? "男" : this.props.member.Sex === "F" ? "女" : "你還⋯還沒填"}
          </Typography>
          <Typography variant="subheading">
            學校：
            {this.props.member.School}
          </Typography>
          <Typography variant="subheading">
            畢業年：
            {this.props.member.GradYear === 0 ? "N/A" : this.props.member.GradYear}
          </Typography>
        </Paper>
      </Grid>
    );
  }
}
