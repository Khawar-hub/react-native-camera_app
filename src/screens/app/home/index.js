import React, { useState } from "react";
import { View, Text, TouchableOpacity,Image, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, ScreenWrapper } from "~components";
import { setAppLoader } from "~redux/slices/config";
import { selectUserMeta, setIsLoggedIn, setUserMeta } from "~redux/slices/user";
import { height, width } from "~utills/Dimension";
import styles from "./styles";
export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserMeta);
  const[image,setimage]=useState(1)
  const[value,setValue]=useState(false)
   const [video, setvideo] = useState(0.2);
  return (
    <ScreenWrapper footerUnScrollable={() => {}}>
      <View style={styles.mainViewContainer}>
        <Text style={{ fontSize: 25, color: "#000", marginTop: height(20) }}>
          Settings
        </Text>
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: width(4.5),
            marginTop: height(3),
          }}
        >
          Image Resolution
        </Text>
        <View
          style={{
            width: width(90),
            height: height(5),
            borderRadius: 20,
            borderWidth: 1,
            marginTop: height(2),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => setimage(0.2)}
            style={{
              width: width(30),
              height: height(5),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: image == 0.2 ? "gray" : null,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>0.2 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setimage(1)}
            style={{
              width: width(30),
              height: height(4.7),
              borderWidth: 0.3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: image == 1 ? "gray" : null,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>1 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setimage(4)}
            style={{
              width: width(30),
              height: height(5),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: image == 4 ? "gray" : null,
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
            marginTop: height(3),
          }}
        >
          Video Resolution
        </Text>
        <View
          style={{
            width: width(90),
            height: height(5),
            borderRadius: 20,
            borderWidth: 1,
            marginTop: height(2),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => setvideo(0.04)}
            style={{
              width: width(30),
              height: height(5),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: video == 0.04 ? "gray" : null,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>0.04 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setvideo(0.2)}
            style={{
              width: width(30),
              height: height(4.7),
              borderWidth: 0.3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: video == 0.2 ? "gray" : null,
            }}
          >
            <Text style={{ fontSize: 18, color: "#000" }}>0.2 MP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setvideo(1)}
            style={{
              width: width(30),
              height: height(5),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: video == 1 ? "gray" : null,
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
            <Image source={require("../../../assets/images/View.png")} />
            <Text style={{ fontSize: 17, color: "#000", marginLeft: width(3) }}>
              Preview
            </Text>
          </View>
          <Switch
            onChange={() => {
              setValue(!value);
            }}
            value={value}
          />
        </View>
        <TouchableOpacity activeOpacity={1} onPress={()=>{
          navigation.goBack()
        }}>
          <Image
            source={require("../../../assets/images/Bottom.png")}
            resizeMode="cover"
            style={{ width: width(100), marginTop: height(34) }}
          />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
