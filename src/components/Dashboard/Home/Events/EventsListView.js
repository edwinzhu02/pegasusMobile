import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

class EventsListView extends Component {
  data = [
    {
      id: 1,
      title:
        "If you use Expo, you don't need to install vector icons. But if you have a babel.config.js or .babelrc file, make sure that it includes babel-preset-expo.",
      content:
        "enabled: If true, parallax effects are enabled. Defaults to true. shiftDistanceX: Defaults to 2.0. shiftDistanceY: Defaults to 2.0. tiltAngle: Defaults to 0.05. magnificatio",
      url:
        "https://images.unsplash.com/photo-1556910109-a14b4226abff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "t2",
      content: "c2",
      url:
        "https://images.unsplash.com/photo-1562101806-6a5f9ec69f41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "t3",
      content: "c3",
      url:
        "https://images.unsplash.com/photo-1565129212334-74fc23500996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "t4",
      content: "c4",
      url:
        "https://images.unsplash.com/photo-1565192167286-5d4298f23aed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "t5",
      content: "c5",
      url:
        "https://images.unsplash.com/photo-1565190968244-b8ddbac25cb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      title: "t6",
      content: "c6",
      url:
        "https://images.unsplash.com/photo-1565177495392-19ada2fe611d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
  ];

  itemHeight = 95;

  onPress = el => {
    console.log("aaa");
    this.props.navigation.navigate("EventDetail", { data: el });
  };

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.data.map(el => (
          <TouchableOpacity
            key={el.id}
            onPress={() => this.onPress(el)}
            activeOpacity={1}
          >
            <View style={{ flexDirection: "row", height: this.itemHeight }}>
              <Image
                source={{ uri: el.url }}
                style={{
                  width: this.itemHeight * 0.85 * 1.618,
                  height: this.itemHeight * 0.85,
                  marginTop: (this.itemHeight * 0.15) / 2
                }}
              />
              <Text
                style={{
                  flex: 1,
                  flexWrap: "wrap",
                  color: "#222",
                  fontSize: 20,
                  marginHorizontal: 10,
                  marginTop: (this.itemHeight * 0.15) / 2
                }}
                numberOfLines={3}
              >
                {el.title}
              </Text>
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default EventsListView;
