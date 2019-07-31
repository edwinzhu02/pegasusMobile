import { StyleSheet } from "react-native";
import { RkConfig } from "react-native-ui-kitten";
export default StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    justifyContent: "space-around",
    flex: 1
  },
  title: {
    fontSize: 42,
    textAlign: "center"
  },
  inputLabel: {
    paddingBottom: 15
  },
  inputContainer: {
    marginTop: 40
  },
  input: {
    fontSize: 20,
    color: RkConfig.colors.primary
  }
});
