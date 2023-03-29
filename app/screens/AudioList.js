import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AudioContext } from "../context/AudioProvider";

const AudioList = () => {
  const { audioFiles } = useContext(AudioContext);

  return (
    <ScrollView>
      {audioFiles.map((item) => (
        <Text style={{ padding: 10, borderBottomColor: 'gray', borderBottomWidth: .5 }} key={item.id}>{item.filename}</Text>
      ))}
    </ScrollView>
  );
};

export default AudioList;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
