import React, { Component } from "react";
import FeedbackTeacher from "./FeedbackTeacher/FeedbackTeacher";
import FeedbackLearner from "./FeedbackLearner/FeedbackLearner";
import { HeaderBackButton } from "react-navigation";
import "../../../../../util/global_config";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { ConfirmChange } from "../../../../../redux/actions/CommentConfirmAction";
class FeedbackRating extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Feedback Rating",
    headerLeft: (
      <HeaderBackButton
        onPress={() => {
          if (Number(navigation.getParam("isRate")) != 1) {
            Alert.alert("Warning", "Are you sure to go back?", [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("Feedback");
                }
              },
              {
                text: "Cancel"
              }
            ]);
          } else {
            navigation.navigate("Feedback");
          }
        }}
      />
    )
  });

  state = {
    rating: 3,
    commentToLearner: "",
    commentToSchool: "",
    commentToTeacher: "",
    role: null
  };

  ratingUpdate = rating => {
    this.setState({
      rating: rating
    });
  };

  ResetHandler = () => {
    this.setState({
      commentToLearner: "",
      commentToSchool: "",
      commentToTeacher: "",
      rating: 3
    });
  };

  ConfirmHandler = () => {
    const { navigation } = this.props;
    if (this.state.role == "teacher") {
      if (
        this.state.commentToSchool.length <= 20 ||
        this.state.commentToLearner <= 20
      ) {
        Alert.alert("Complete the form", "You must comment at least 20 words");
        return;
      }
      fetch(global.constants.basic_url + "rating/TeacherFeedback", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          UserId: navigation.getParam("userId"),
          LessonId: navigation.getParam("LessonId"),
          RateStar: this.state.rating,
          CommentToLearner: this.state.commentToLearner,
          CommentToSchool: this.state.commentToSchool
        })
      })
        .then(res => res.json())
        .then(result => {
          if (result.IsSuccess == false) {
            throw new Error(result.ErrorMessage);
          }
          Alert.alert("Success", result.Data, [
            {
              text: "OK",
              onPress: () => {
                this.props.navigation.navigate("Feedback");
                this.changeConfirm();
              }
            }
          ]);
        })
        .catch(err => {
          Alert.alert("Error", err.toString());
        });
    } else {
      if (this.state.commentToTeacher.length <= 20) {
        Alert.alert("Complete the form", "You must comment at least 20 words");
        return;
      }
      fetch(global.constants.basic_url + "rating/LearnerFeedback", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          UserId: navigation.getParam("userId"),
          LessonId: navigation.getParam("LessonId"),
          RateStar: this.state.rating,
          commentToTeacher: this.state.commentToTeacher
        })
      })
        .then(res => res.json())
        .then(result => {
          if (result.IsSuccess == false) {
            throw new Error(result.ErrorMessage);
          }
          Alert.alert("Success", result.Data, [
            {
              text: "OK",
              onPress: () => {
                this.props.navigation.navigate("Feedback");
                this.changeConfirm();
              }
            }
          ]);
        })
        .catch(err => {
          Alert.alert("Error", err.toString());
        });
    }
  };

  componentWillMount = () => {
    const { navigation } = this.props;
    const role = navigation.getParam("role");
    const isRate = navigation.getParam("isRate");
    const lessonId = navigation.getParam("LessonId");
    const userId = navigation.getParam("userId");
    this.setState(
      {
        role: role
      },
      () => {
        if (Number(isRate) == 1) {
          if (role == "teacher") {
            fetch(
              global.constants.basic_url +
                "rating/TeacherGetOneRatingHistoryById/" +
                lessonId +
                "/" +
                userId
            )
              .then(res => res.json())
              .then(result => {
                if (result.IsSuccess == false) {
                  throw new Error(result.ErrorMessage);
                }
                this.setState({
                  commentToLearner: result.Data.ToLearner.Comment,
                  commentToSchool: result.Data.ToSchool.Comment,
                  rating: Number(result.Data.ToLearner.RateStar)
                });
              })
              .catch(err => {
                Alert.alert("Error", err.toString());
              });
          } else {
            fetch(
              global.constants.basic_url +
                "rating/LearnerGetOneRatingHistoryById/" +
                lessonId +
                "/" +
                userId
            )
              .then(res => res.json())
              .then(result => {
                if (result.IsSuccess == false) {
                  throw new Error(result.ErrorMessage);
                }
                this.setState({
                  commentToTeacher: result.Data.Comment,
                  rating: Number(result.Data.RateStar)
                });
              })
              .catch(err => {
                Alert.alert("Error", err.toString());
              });
          }
        }
      }
    );
  };

  changeConfirm = () => {
    this.props.changeConfirm();
  };

  render() {
    const { navigation } = this.props;
    if (this.state.role == "teacher") {
      return (
        <FeedbackTeacher
          ratingUpdate={this.ratingUpdate.bind(this)}
          resetAll={() => this.ResetHandler()}
          Confirm={() => this.ConfirmHandler()}
          rating={this.state.rating}
          commentToLearner={this.state.commentToLearner}
          commentToSchool={this.state.commentToSchool}
          updateCommentToLearnerText={text =>
            this.setState({ commentToLearner: text })
          }
          updateCommentToSchoolText={text =>
            this.setState({ commentToSchool: text })
          }
          disabled={Number(navigation.getParam("isRate")) == 1}
        />
      );
    } else {
      return (
        <FeedbackLearner
          rating={this.state.rating}
          ratingUpdate={this.ratingUpdate.bind(this)}
          updateCommentToTeacherText={text =>
            this.setState({ commentToTeacher: text })
          }
          commentToTeacher={this.state.commentToTeacher}
          Confirm={() => this.ConfirmHandler()}
          resetAll={() => this.ResetHandler()}
          disabled={Number(navigation.getParam("isRate")) == 1}
        />
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeConfirm: () => {
      dispatch(ConfirmChange());
    }
  };
};

const mapStateToProps = state => ({
  IsConfirm: state.CommentConfirm
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackRating);
