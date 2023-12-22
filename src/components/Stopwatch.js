import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({});

const Stopwatch = React.createClass({
  getInitialState: function () {
    return {secondsElapsed: 0};
  },
  getMilliseconds: function () {
    return ('0' + this.state.secondsElapsed * 100).slice(-2);
  },
  getSeconds: function () {
    return ('0' + parseInt(this.state.secondsElapsed % 60)).slice(-2);
  },
  getMinutes: function () {
    return ('0' + Math.floor(this.state.secondsElapsed / 60)).slice(-2);
  },
  startTimer: function () {
    var runningTime = this;
    this.incrementer = setInterval(function () {
      runningTime.setState({
        secondsElapsed: runningTime.state.secondsElapsed + 0.01,
      });
    }, 10);
  },
  resetTimer: function () {
    this.setState({
      secondsElapsed: 0,
    });
  },
  stopTimer: function () {
    clearInterval(this.incrementer);
  },
  render: function () {
    return (
      <View>
        <h1>
          {this.getMinutes()}:{this.getSeconds()}:{this.getMilliseconds()}
        </h1>
        <TouchableOpacity onPress={() => this.stopTimer()}>
          <Text>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.startTimer()}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.resetTimer()}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  },
});
export default Stopwatch;
