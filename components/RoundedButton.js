import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const RoundedButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 80,
        borderWidth: 4,
        borderRadius: 40,
        marginRight: 10,
      }}
      onPress={props.clickButton.bind(this, props.time)}
    >
      <Text style={{ fontWeight: "bold", fontSize: 35 }}>{props.time}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({});
