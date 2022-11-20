import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import { SvgXml } from "react-native-svg";

import { Button, ScreenWrapper } from "~components";


import { height, width } from "~utills/Dimension";
import styles from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Home({ navigation, route }) {

  const [image, setimage] = useState(1);
  const [value, setValue] = useState(false);
  const [video, setvideo] = useState(0.2);
  useEffect(()=>{
    setSettings()
  },[navigation])
  const setSettings=async()=>{
      let imageres = JSON.parse(await AsyncStorage.getItem("ImageRes"));
      let videores = JSON.parse(await AsyncStorage.getItem("VideoRes"));
      let preview = JSON.parse(await AsyncStorage.getItem("Preview"));
      setimage(imageres)
      setvideo(videores)
      setValue(preview)


  }
  return (
    <ScreenWrapper
      footerUnScrollable={() => {
        return (
          <View
            style={{
              width: width(100),
              height: height(11),
              backgroundColor: "#BFBFBF",
              alignItems: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: width(18),
                width: width(18),
                borderRadius: width(20),
                position: "absolute",
                left: -width(9),
                elevation: 20,
                borderWidth: 1,
                borderColor: "#00000020",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: width(2),
              }}
            >
              <SvgXml
                xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7474 3.66436C17.1143 3.25158 17.0771 2.61951 16.6644 2.25259C16.2516 1.88567 15.6195 1.92285 15.2526 2.33564L16.7474 3.66436ZM8.59055 11.3356L7.84314 10.6713L7.84314 10.6713L8.59055 11.3356ZM8.59055 12.6644L7.84314 13.3287H7.84314L8.59055 12.6644ZM15.2526 21.6644C15.6195 22.0771 16.2516 22.1143 16.6644 21.7474C17.0771 21.3805 17.1143 20.7484 16.7474 20.3356L15.2526 21.6644ZM15.2526 2.33564L7.84314 10.6713L9.33795 12L16.7474 3.66436L15.2526 2.33564ZM7.84314 13.3287L15.2526 21.6644L16.7474 20.3356L9.33795 12L7.84314 13.3287ZM7.84314 10.6713C7.16956 11.429 7.16956 12.571 7.84314 13.3287L9.33796 12L7.84314 10.6713Z" fill="black"/>
</svg>
`}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    >
      <View style={styles.mainViewContainer}>
        <Text
          style={{
            fontSize: 25,
            color: "#000",
            marginTop: -height(35),
            fontWeight: "300",
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: width(4.5),
            marginTop: height(3),
            fontSize: 14,
            color: "#000",
          }}
        >
          Image Resolution
        </Text>
        <View
          style={{
            width: width(90),
            height: height(7),
            borderRadius: 20,
            borderWidth: 0.7,
            marginTop: height(2),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              setimage(0.2);
              await AsyncStorage.setItem("ImageRes", JSON.stringify(0.2));
            }}
            style={{
              width: width(29.9),
              height: height(6.8),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: image == 0.2 ? "#BFBFBF" : null,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>0.2 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setimage(1);
              await AsyncStorage.setItem("ImageRes", JSON.stringify(1));
            }}
            style={{
              width: width(30),
              borderRightWidth: 0.7,
              borderLeftWidth: 0.7,
              height: height(6.8),
              borderWidth: 0.3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: image == 1 ? "#BFBFBF" : null,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>1 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setimage(4);
              await AsyncStorage.setItem("ImageRes", JSON.stringify(4));
            }}
            style={{
              width: width(29.9),
              height: height(6.8),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: image == 4 ? "#BFBFBF" : null,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>4 MP</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: width(4.5),
            marginTop: height(5),
            fontSize: 14,
            color: "#000",
          }}
        >
          Video Resolution
        </Text>
        <View
          style={{
            width: width(90),
            height: height(7),
            borderRadius: 20,
            borderWidth: 0.7,
            marginTop: height(2),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              setvideo(0.04);
              await AsyncStorage.setItem("VideoRes", JSON.stringify(0.04));
            }}
            style={{
              width: width(29.9),
              height: height(6.8),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: video == 0.04 ? "#BFBFBF" : null,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>0.04 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setvideo(0.2);
              await AsyncStorage.setItem("VideoRes", JSON.stringify(0.2));
            }}
            style={{
              width: width(30),
              height: height(6.8),
              borderRightWidth: 0.7,
              borderLeftWidth: 0.7,
              borderWidth: 0.3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: video == 0.2 ? "#BFBFBF" : null,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>0.2 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setvideo(1);
              await AsyncStorage.setItem("VideoRes", JSON.stringify(1));
            }}
            style={{
              width: width(29.9),
              height: height(6.8),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: video == 1 ? "#BFBFBF" : null,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>1 MP</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: height(5),
            width: width(100),
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: width(4),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="3" stroke="black" stroke-width="2"/>
<path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="black" stroke-width="2"/>
</svg>
`}
            />
            <Text style={{ fontSize: 17, color: "#000", marginLeft: width(3) }}>
              Preview
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={async () => {
              setValue(!value);
              if(value)
              {
              await AsyncStorage.setItem("Preview", JSON.stringify(false));
            }
            else{
                   await AsyncStorage.setItem("Preview", JSON.stringify(true));
            }
            }}
            style={{
              height: height(4.4),
              width: width(12),
              borderRadius: width(4),
              backgroundColor: !value ? "#BFBFBF" : "#222222",
              paddingLeft: width(0.9),
              paddingRight: width(0.9),
              alignItems: !value ? "flex-start" : "flex-end",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: width(4.8),
                width: width(4.8),
                borderRadius: width(7),
                backgroundColor: "#fff",
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
