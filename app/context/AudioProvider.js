import React, { useState, useEffect, createContext } from "react";
import { Text, View, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();

const AudioProvider = (props) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => getPermission(),
      },
      {
        text: "cancle",
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const getAudioFlies = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    setAudioFiles(media.assets);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      //we want to get all the audio files
      getAudioFlies();
    }
    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        //we are going to display alert that user must allow this permission to work this app
        permissionAlert();
      }
      if (status === "granted") {
        //we want to get all the media files
        getAudioFlies();
      }
      if (status === "denied" && !canAskAgain) {
        //we are going to display an error to the user
        setPermissionError(true);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (permissionError)
    return (
      <View style={{ flex: 1, justifyContent: "centre", alignItems: "center" }}>
        <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
          It looks like you haven't accept the permission.
        </Text>
      </View>
    );
  return (
    <AudioContext.Provider value={{ audioFiles }}>
      {props.children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
