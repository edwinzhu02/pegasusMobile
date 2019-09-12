import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import AsyncStorage from "@react-native-community/async-storage";

class SessionList extends Component {
  static navigationOptions = {
    title: "Session"
  };
  constructor(props) {
    super(props);
    this.state = {
      components: []
    };
  }

  componentWillMount = async () => {
    const components = await AsyncStorage.getItem("SessionComponents");
    this.setState({ components: JSON.parse(components) });
  };

  render() {
    const items = this.state.components;
    const width = Dimensions.get("window").width / 3;
    return (
      <FlatGrid
        itemDimension={width}
        items={items}
        style={styles.gridView}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(item.component)}
            >
              <View
                style={[styles.itemContainer, { backgroundColor: item.code }]}
              >
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }
}
export default SessionList;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
