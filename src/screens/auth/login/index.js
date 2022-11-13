import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,

  Alert,
  FlatList,
  Share,
} from "react-native";
import React, { useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { Button } from "~components";
import { height, width } from "~utills/Dimension";
import styles from "./styles";
import { setAppLoader } from "~redux/slices/config";
import { useDispatch } from "react-redux";
import ReactNativeModal from "react-native-modal";
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import ScreenNames from "~routes/routes";
export default function LoginScreen({navigation}) {
  const devices = useCameraDevices("wide-angle-camera");
  const camera = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [modal, setmodal] = useState(false);
  const[timer,showTimer]=useState(false)
  const[box,showBox]=useState(false)
  const[count,setcount]=useState(10)
  const [isrecording, setisrecording] = useState(false);
  const [flash, setflash] = useState("off");
  const [toggle, settoggle] = useState(false);
  const [zoom, setzoom] = useState(0);
  const [photos, setphotos] = useState([]);
  const device = toggle ? devices.front : devices.back;
  
  React.useEffect(() => {
    getPermission();
  }, []);
  const getPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
  };
  let i=10;
  const takePhoto = async () => {
    if(timer){
        let interval = setInterval(async() => {
           i--;
          setcount(i)
           if(i===0)
        {
          clearInterval(interval)
          const photo = await camera.current.takePhoto({
            flash: flash,
          });
          setImage(photo?.path);
          setmodal(true);
          showTimer(false)

        }
        }, 1000);
       
    }
    else{
    const photo = await camera.current.takePhoto({
      flash: flash,
    });
    setImage(photo?.path);
    setmodal(true);
  }
  };
  const savePhoto = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      CameraRoll.save(image);
      setmodal(false);
    } else {
      const status = await PermissionsAndroid.request(permission);
      if (status == "granted") {
        CameraRoll.save(image);
        setmodal(false);
      } else {
        Alert.alert("Permission denied");
      }
    }
  };
  const takeVideo = () => {
    camera.current.startRecording({
      flash: flash,
      onRecordingFinished: (video) => {
        CameraRoll.save(video?.path);
      },
      onRecordingError: (error) => {
        Alert.alert("Video stopped");
      },
    });
  };
  const getPhotos = async () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: "Photos",
    })
      .then((r) => {
        setphotos(r.edges);
      })
      .catch((err) => {
        //Error Loading Images
      });
  };
  const renderPhotos = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        style={styles.imageBorder}
      >
        <Image
          style={styles.image}
          source={{ uri: item.node.image.uri }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };
  if (device == null) return <ActivityIndicator size={10} color="red" />;
  return (
    <>
      <View style={{ flex: 1 }}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          video={true}
          isActive={true}
          enableZoomGesture
          photo={true}
          zoom={zoom}
        />
        {box ? (
          <View
            style={{
              height: height(15),
              width: width(40),
              backgroundColor: "silver",
              borderRadius: width(3),
              position: "absolute",
              justifyContent: "space-between",
              right: width(7),
              bottom: height(14),
              zIndex: 1000000000,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                showTimer(!timer);
                showBox(false);
              }}
              style={{
                height: height(7.5),
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: width(5),
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/Tumer_fill.png")}
                resizeMode="contain"
              />
              <Text
                style={{ color: "#000", marginLeft: width(2), fontSize: 14 }}
              >
                Self Timer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              navigation.navigate(ScreenNames.HOME)
               showBox(false);
            }}
              style={{
                height: height(7.5),
                width: "100%",
                flexDirection: "row",
                alignItems: "flex-start",
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: width(5),
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/Setting_line.png")}
                resizeMode="contain"
              />
              <Text
                style={{ color: "#000", marginLeft: width(2), fontSize: 14 }}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {isrecording && (
          <View
            style={{
              position: "absolute",
              top: height(5),
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/images/video.png")}
                resizeMode="contain"
                style={{ tintColor: "red" }}
              />
              <Text
                style={{ color: "red", fontSize: 17, marginLeft: width(3) }}
              >
                Recording
              </Text>
            </View>
          </View>
        )}
        {timer && (
          <View
            style={{
              position: "absolute",
              top: height(5),
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/images/Tumer_fill.png")}
                resizeMode="contain"
                style={{ tintColor: "red" }}
              />
              <Text
                style={{ color: "red", fontSize: 17, marginLeft: width(3) }}
              >
                {count} Seconds
              </Text>
            </View>
          </View>
        )}

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
          <TouchableOpacity
            disabled={timer && isrecording}
            onPress={() => {
              settoggle(!toggle);
            }}
            style={styles.rotate}
          >
            <Image
              source={require("../../../assets/images/circle_right_alt.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={timer && isrecording}
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
            disabled={timer}
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
            disabled={timer}
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
          <TouchableOpacity
            disabled={timer && isrecording}
            onPress={() => {
              getPhotos();
              setmodal(true);
            }}
            style={styles.gallery}
          >
            <Image
              source={require("../../../assets/images/picture.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={timer}
            onPress={async () => {
              if (isrecording) {
                setisrecording(false);
                await camera.current.stopRecording();
              } else {
                setisrecording(true);
                takeVideo();
              }
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
            <TouchableOpacity
              disabled={timer && isrecording}
              onPress={() => {
                showBox(!box);
              }}
              style={styles.more}
            >
              <Image
                source={require("../../../assets/images/More.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <ReactNativeModal
        animationInTiming={300}
        animationOutTiming={200}
        animationIn={"lightSpeedIn"}
        animationOut={"lightSpeedOut"}
        isVisible={modal}
        onBackButtonPress={() => {
          setphotos([]);
          setmodal(false);
          savePhoto;
        }}
        onBackdropPress={() => {
          setmodal(false);
        }}
        backdropOpacity={0.4}
        coverScreen
        style={{ backgroundColor: "white" }}
      >
        {photos?.length > 0 ? (
          <View style={styles.container}>
            <FlatList
              data={photos}
              renderItem={renderPhotos}
              numColumns={4}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Image
              source={{ uri: `file://+${image}` }}
              resizeMode="cover"
              style={{ height: height(100), width: width(100), zIndex: 1 }}
            />
            <View
              style={{
                height: height(10),
                position: "absolute",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: width(14),
                alignItems: "center",
                zIndex: 100000,
                width: width(100),
                backgroundColor: "#00000020",
                bottom: 0,
              }}
            >
              <TouchableOpacity
                onPress={savePhoto}
                style={[styles.more, { marginTop: height(0.4) }]}
              >
                <Image
                  source={require("../../../assets/images/Code.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmodal(false);
                }}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../../assets/images/Folder.png")}
                  resizeMode="contain"
                />
                <Text
                  style={{ fontSize: 15, color: "white", marginLeft: width(1) }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message: "Camera App",
                    });
                    if (result.action === Share.sharedAction) {
                      if (result.activityType) {
                        // shared with activity type of result.activityType
                      } else {
                        // shared
                      }
                    } else if (result.action === Share.dismissedAction) {
                      // dismissed
                    }
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../../assets/images/Copy.png")}
                  resizeMode="contain"
                />
                <Text
                  style={{ fontSize: 15, color: "white", marginLeft: width(1) }}
                >
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ReactNativeModal>
    </>
  );
}
