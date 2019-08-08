import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Button } from "react-native-paper";

export default class FeedbackTeacher extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 10 }} />
        <ScrollView>
          <View style={styles.ratingContainer}>
            <Text style={styles.lessonRatingTopText}>Lesson Rating</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#CED0CE",
                width: "80%",
                alignSelf: "center"
              }}
            />
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
              showRating
              defaultRating={this.props.rating}
              onFinishRating={this.props.ratingUpdate}
            />
          </View>
          <View style={{ paddingVertical: 10 }} />
          <View style={styles.commentContainer}>
            <Text style={styles.CommentTopText}>Comment to student(s)</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#CED0CE",
                width: "100%",
                alignSelf: "center"
              }}
            />
            <TextInput
              onChangeText={this.props.updateCommentToLearnerText}
              style={styles.CommentTextArea}
              underlineColorAndroid="transparent"
              placeholder="please enter your comment"
              placeholderTextColor="grey"
              value={this.props.commentToLearner}
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <View style={{ paddingVertical: 10 }} />
          <View style={styles.commentContainer}>
            <Text style={styles.CommentTopText}>Comment to school</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#CED0CE",
                width: "100%",
                alignSelf: "center"
              }}
            />
            <TextInput
              onChangeText={this.props.updateCommentToSchoolText}
              style={styles.CommentTextArea}
              underlineColorAndroid="transparent"
              placeholder="please enter your comment"
              placeholderTextColor="grey"
              value={this.props.commentToSchool}
              numberOfLines={10}
              multiline={true}
            />
          </View>
        </ScrollView>
        <View style={{ paddingVertical: 10 }} />
        <View style={styles.ButtonsContainer}>
          <Button
            mode="contained"
            style={{ alignSelf: "center" }}
            color="green"
            width="90%"
            onPress={this.props.Confirm}
          >
            Confirm
          </Button>
          <View style={{ paddingVertical: 5 }} />
          <Button
            mode="contained"
            style={{ alignSelf: "center" }}
            width="90%"
            color="red"
            onPress={this.props.resetAll}
          >
            Reset
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  ratingContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#CED0CE"
  },
  lessonRatingTopText: {
    fontWeight: "bold",
    fontSize: 23,
    alignSelf: "center",
    paddingVertical: 10
  },
  commentContainer: {
    flex: 1,
    borderColor: "#CED0CE",
    borderWidth: 2,
    padding: 5
  },
  CommentTextArea: {
    height: 150,
    paddingTop: 10,
    justifyContent: "flex-start"
  },
  CommentTopText: {
    fontWeight: "bold",
    fontSize: 23,
    alignSelf: "center",
    paddingVertical: 10
  },
  ButtonsContainer: {
    paddingBottom: 10
  }
});
