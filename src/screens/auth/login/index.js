import { View, Text, StyleSheet, ActivityIndicator,Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { Button } from "~components";
import { height, width } from "~utills/Dimension";
import styles from "./styles";

export default function LoginScreen() {
  const devices = useCameraDevices("wide-angle-camera");
  const camera = useRef(null);
  const[isrecording,setisrecording]=useState(false)
  const[flash,setflash]=useState("off")
  const[zoom,setzoom]=useState(0)
  const device = devices.back;
  console.log(device)
  
  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({
      flash: flash,
    });
   
  };

  if (device == null) return <ActivityIndicator size={10} color="red" />;
  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        zoom={zoom}
      />
      {isrecording&&
      <View style={{ position: "absolute", top: height(5) ,alignSelf:'center'}}>
        <View style={{flexDirection:"row",alignItems:'center'}}>
          <Image
            source={require("../../../assets/images/video.png")}
            resizeMode="contain"
            style={{tintColor:'red'}}
          />
          <Text style={{color:'red',fontSize:17,marginLeft:width(3)}}>Recording</Text>
        </View>
      </View>}
      <View
        style={{
          position: "absolute",
          zIndex: 100000,
          bottom: height(2),
          alignSelf: "center",
          height: width(46),
          width: width(46),
          borderRadius: width(50),
          backgroundColor: "#FFFFFF10",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.rotate}>
          <Image
            source={require("../../../assets/images/circle_right_alt.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (flash == "off") {
              setflash("on");
            } else if (flash == "on") {
              setflash("auto");
            } else {
              setflash("off");
            }
          }}
          style={styles.flash}
        >
          {flash == "off" ? (
            <Image
              source={require("../../../assets/images/Flash_off.png")}
              resizeMode="contain"
              style={styles.flash2}
            />
          ) : flash == "on" ? (
            <Image
              source={require("../../../assets/images/lightning_fill.png")}
              resizeMode="contain"
              style={styles.flash2}
            />
          ) : (
            <Image
              source={require("../../../assets/images/Flash_auto.png")}
              resizeMode="contain"
              style={styles.flash2}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setzoom(zoom + 1.5);
          }}
          style={styles.zoomin}
        >
          <Image
            source={require("../../../assets/images/Search.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (zoom != 0) setzoom(zoom - 1.5);
          }}
          style={styles.zoomout}
        >
          <Image
            source={require("../../../assets/images/Search-2.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Button
          onPress={takePhoto}
          containerStyle={{
            height: width(20),
            width: width(20),
            backgroundColor: "white",
            borderRadius: width(20),
          }}
        />
      </View>
      <View
        style={{
          height: height(10),
          position: "absolute",
          zIndex: 0,
          width: width(100),
          backgroundColor: "#00000020",
          bottom: 0,
        }}
      >
        <TouchableOpacity style={styles.gallery}>
          <Image
            source={require("../../../assets/images/picture.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setisrecording(!isrecording);
          }}
          style={styles.video}
        >
          {isrecording ? (
            <Image
              source={require("../../../assets/images/Stop.png")}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../assets/images/video.png")}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: width(18),
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,

            borderColor: "silver",
            width: width(18),
            borderRadius: width(20),
            position: "absolute",
            top: height(0.2),
            right: -width(9),
            elevation: 20,
          }}
        >
          <TouchableOpacity style={styles.more}>
            <Image
              source={require("../../../assets/images/More.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}
