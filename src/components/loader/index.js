import React from 'react';
import {ActivityIndicator, Text, View,Image} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import { selectLoader } from '~redux/slices/config';
import AppColors from '~utills/AppColors';
import { height, width } from '~utills/Dimension';
import styles from './styles';
export default function Loader({uri}) {
  const appLoader = useSelector(selectLoader);
  return (
    <Modal
      animationInTiming={300}
      animationOutTiming={200}
      animationIn={'lightSpeedIn'}
      animationOut={'lightSpeedOut'}
      isVisible={appLoader}
      backdropOpacity={0.4}>
      <View style={styles.container}>
        <Image source={{uri:uri}} resizeMode="cover" style={{height:height(100),width:width(100)}} />
      </View>
    </Modal>
  );
}
