import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { Dimensions } from "react-native";
import AudioListItem from "../components/AudioListItem";
import OptionModal from "../components/OptionModal";

const AudioList = () => {
  const { dataProvider } = useContext(AudioContext);

  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({ });

  const layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  const rowRenderer = (type, item) => {
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onOptionPress={() => {
          setCurrentItem(item);
          setOptionModalVisible(true);
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
      />
      <OptionModal
        onPlayPress={() => {
          console.log("Playing audio");
        }}
        onPlayListPress={() => console.log("adding to the playlist")}
        currentItem={currentItem}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible}
      />
    </View>
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
