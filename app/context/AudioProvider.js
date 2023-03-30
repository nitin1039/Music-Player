import React, { useState, useEffect, createContext } from "react";
import { Text, View, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { DataProvider } from "recyclerlistview";

export const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  const permissionAlert = () => {
    Alert.alert(
      "Permission Required",
      "This app needs to read audio files!",
      [
        {
          text: "I am ready",
          onPress: () => getPermission(),
        },
        {
          text: "cancle",
          onPress: () => permissionAlert(),
        },
      ]
    );
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    setDataProvider(
      dataProvider.cloneWithRows([...audioFiles, ...media.assets])
    );
    setAudioFiles([...audioFiles, ...media.assets]);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    }
    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        permissionAlert();
      }
      if (status === "granted") {
        getAudioFiles();
      }
      if (status === "denied" && !canAskAgain) {
        setPermissionError(true);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (permissionError) {
    return (
      <View style={{ flex: 1, justifyContent: "centre", alignItems: "center" }}>
        <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
          It looks like you haven't accepted the permission.
        </Text>
      </View>
    );
  }

  return (
    <AudioContext.Provider value={{ audioFiles, dataProvider }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
