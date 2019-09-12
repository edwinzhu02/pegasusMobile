import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Button } from "react-native-paper";

export default class FeedbackLearner extends Component {
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
              isDisabled={this.props.disabled}
            />
          </View>
          <View style={{ paddingVertical: 10 }} />
          <View style={styles.commentContainer}>
            <Text style={styles.CommentTopText}>Comment to teacher</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#CED0CE",
                width: "100%",
                alignSelf: "center"
              }}
            />
            <TextInput
              onChangeText={this.props.updateCommentToTeacherText}
              style={styles.CommentTextArea}
              underlineColorAndroid="transparent"
              placeholder="please enter your comment"
              placeholderTextColor="grey"
              value={this.props.commentToTeacher}
              numberOfLines={10}
              multiline={true}
              editable={!this.props.disabled}
            />
          </View>
          <View style={{ paddingVertical: 10 }} />
        </ScrollView>
        <View style={{ paddingVertical: 10 }} />
        <View style={styles.ButtonsContainer}>
          <Button
            mode="contained"
            style={{ alignSelf: "center" }}
            color="green"
            width="90%"
            onPress={this.props.Confirm}
            disabled={this.props.disabled}
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
            disabled={this.props.disabled}
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
