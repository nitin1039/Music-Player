import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
  } from "react-native";
  import React from "react";
  import { StatusBar } from "expo-status-bar";
  import Color from "../misc/color";
  
  const OptionModal = ({
    visible,
    currentItem,
    onClose,
    onPlayPress,
    onPlayListPress,
  }) => {
    const { filename } = currentItem;
    return (
      <>
        <StatusBar hidden />
        <Modal animationType="slide" transparent visible={visible}>
          <View style={Styles.modal}>
            <Text style={Styles.title} numberOfLines={1}>
              {filename}
            </Text>
            <View style={Styles.optionContainer}>
              <TouchableWithoutFeedback onPress={onPlayPress}>
                <Text style={Styles.option}>Play</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onPlayListPress}>
                <Text style={Styles.option}>Add to Playlist</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={Styles.modalBg} />
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  };
  
  export default OptionModal;
  const Styles = StyleSheet.create({
    modal: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: Color.APP_BG,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      zIndex: 1000,
    },
    optionContainer: {
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      padding: 20,
      paddingBottom: 0,
      color: Color.FONT_MEDIUM,
    },
    option: {
      fontSize: 16,
      fontWeight: "bold",
      color: Color.FONT,
      paddingVertical: 10,
      letterSpacing: 1,
    },
    modalBg: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: Color.MODAL_BG,
    },
  });
  