import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import moment from "moment";
import { Agenda } from "react-native-calendars";
import Modal from "react-native-modal";
import "../../../../util/global_config";
import AsyncStorage from "@react-native-community/async-storage";
import { Divider } from "react-native-elements";

export default class Schedule extends Component {
  static navigationOptions = {
    title: "Schedule"
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      TodayDate: moment(new Date()).format("YYYY-MM-DD"),
      IsModalVisible: false,
      info: {
        time: null,
        student: null
      }
    };
  }

  componentDidMount = async () => {
    this.setState(
      {
        userId: await AsyncStorage.getItem("userid"),
        userPosition: await AsyncStorage.getItem("userPosition")
      },
      () => {
        this.fetchData(this.state.userId, this.state.TodayDate);
      }
    );
  };

  fetchData(userId, date) {
    fetch(
      global.constants.basic_url +
        "Lesson/GetMobileLessonsForTeacherbyDate/" +
        userId +
        "/" +
        date
    )
      .then(res => res.json())
      .then(result => {
        this.setState({ items: result.Data, isFetchFinished: true }, () => {
          this.setDataForEmptyDate();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  setDataForEmptyDate() {
    let emptyDateObj = {};
    let items = this.state.items;
    const dateArr = Object.keys(items).sort();
    const startYear = +dateArr[0].split("-")[0];
    const endYear = +dateArr[dateArr.length - 1].split("-")[0];
    const startMonth = +dateArr[0].split("-")[1];
    const endMonth = +dateArr[dateArr.length - 1].split("-")[1];
    for (let i = startMonth; i <= endMonth; i++) {
      let daysInMonth = 0;
      if (
        i === 1 ||
        i === 3 ||
        i === 5 ||
        i === 7 ||
        i === 8 ||
        i === 10 ||
        i === 12
      ) {
        daysInMonth = 31;
      } else if (i === 2) {
        daysInMonth = 28;
      } else {
        daysInMonth = 30;
      }
      let days = [];
      dateArr.map(el => {
        if (i === +el.split("-")[1]) {
          days.push(+el.split("-")[2]);
        }
      });
      for (let j = 1; j <= daysInMonth; j++) {
        if (!days.includes(j)) {
          let tempStr = "";
          if (endMonth >= startMonth) {
            tempStr =
              startYear +
              "-" +
              (i < 10 ? "0" + i : i) +
              "-" +
              (j < 10 ? "0" + j : j);
          } else {
            tempStr =
              endYear +
              "-" +
              (i < 10 ? "0" + i : i) +
              "-" +
              (j < 10 ? "0" + j : j);
          }
          emptyDateObj[tempStr] = [];
        }
      }
    }
    this.setState({ items: Object.assign(items, emptyDateObj) });
  }

  eventClick = info => {
    this.setState({
      info: {
        time: info.time,
        student: info.learner || info.learners
      },
      IsModalVisible: true
    });
  };

  renderItem = item => {
    console.log(item);
    return (
      <View>
        <TouchableOpacity onPress={() => this.eventClick(item.info)}>
          <View style={[styles.item, { height: item.height }]}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {item.info.time}
            </Text>
            <Text style={{ fontSize: 16 }}>{item.name.trim()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  renderEmptyData = () => {
    return (
      <Text style={{ textAlign: "center", marginTop: 150, fontSize: 24 }}>
        You don't have course today
      </Text>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.state.IsModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalMainView}>
              <Text style={styles.modalTitle}>Information</Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED0CE",
                  width: "90%",
                  alignSelf: "center"
                }}
              />
              <ScrollView>
                <View style={{ paddingTop: 10 }}>
                  <View style={styles.contentRowView}>
                    <Text style={styles.contentTitle}>Time</Text>
                    <Text style={styles.contentRow}>
                      {this.state.info.time}
                    </Text>
                  </View>
                  <View style={styles.contentRowView}>
                    <Text style={styles.contentTitle}>Student</Text>
                    {this.state.info.student &&
                      this.state.info.student.map(el => (
                        <Text key={el.LearnerId} style={styles.contentRow}>
                          {el.FirstName + " " + el.LastName}
                        </Text>
                      ))}
                  </View>
                </View>
              </ScrollView>
              <View style={styles.modalButtonContainer}>
                <Button
                  title="Close"
                  onPress={() => this.setState({ IsModalVisible: false })}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* 加上min和max date */}
        <Agenda
          items={this.state.items}
          minDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
          maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
          selected={this.state.TodayDate}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={() => {
            return <Divider style={styles.emptyDate} />;
          }}
          renderEmptyData={
            this.state.isFetchFinished ? this.renderEmptyData : null
          }
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayChange={day => {
            console.log(day);
          }}
          theme={{
            "stylesheet.agenda.main": {
              knobContainer: {
                flex: 1,
                position: "absolute",
                left: 0,
                right: 0,
                height: 16,
                bottom: 0,
                alignItems: "center"
              }
            }
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 20,
    marginTop: 38
  },
  emptyDate: {
    height: 2,
    backgroundColor: "#dfdfdf",
    marginRight: 20,
    marginTop: 50
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 25,
    marginBottom: 16,
    paddingVertical: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  modalMainView: {
    margin: 10,
    backgroundColor: "white",
    height: 300,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  contentRow: {
    marginTop: 10,
    fontSize: 15,
    alignSelf: "center"
  },
  contentTitle: {
    fontSize: 20,
    alignSelf: "center"
  },
  contentRowView: {
    paddingBottom: 10
  },
  closeModalButton: {
    paddingTop: 30
  },
  modalButtonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 10
  }
});
