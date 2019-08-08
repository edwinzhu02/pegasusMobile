import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";

export default class Feedback extends Component {
  static navigationOptions = {
    title: "Feedback"
  };

  state = {
    lessons: [
      { lessonId: 1, startTime: "2019-06-27", isRate: "unrate" },
      { lessonId: 1, startTime: "2019-06-28", isRate: "unrate" },
      { lessonId: 1, startTime: "2019-06-29", isRate: "unrate" },
      { lessonId: 1, startTime: "2019-06-30", isRate: "unrate" }
    ]
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.lessons.length > 0 ? (
          <FlatList
            data={this.state.lessons}
            renderItem={({ item }) => (
              <ListItem
                rightIcon={{ name: "chevron-right" }}
                title={`${item.startTime}`}
                subtitle={`${item.isRate}`}
                onPress={() => this.props.navigation.navigate("FeedbackRating")}
              />
            )}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No Data</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
