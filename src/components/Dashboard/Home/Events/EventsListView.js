import React, { Component } from "react";
import { View, Image } from "react-native";
import { List, Divider } from "react-native-paper";
import EventDetail from "./EventDetail";

class EventsListView extends Component {
  data = [
    {
      id: 1,
      title: "t1",
      content: "c1",
      url:
        "https://images.unsplash.com/photo-1565205199212-ee2cc0397a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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

  onPress = el => {
    this.props.navigation.navigate("EventDetail", { data: el });
  };

  render() {
    return (
      <List.Section title="news">
        {this.data.map(el => (
          <View key={el.id}>
            <List.Item
              title={el.title}
              left={() => (
                <Image
                  source={{ uri: el.url }}
                  style={{ width: 100, height: 60 }}
                />
              )}
              description={el.content}
              descriptionEllipsizeMode="tail"
              onPress={() => this.onPress(el)}
            />
            <Divider />
          </View>
        ))}
      </List.Section>
    );
  }
}

export default EventsListView;
