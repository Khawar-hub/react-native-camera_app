import { StyleSheet } from 'react-native';
import { height, width } from '~utills/Dimension';
import AppColors from '../../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: AppColors.black,
    fontWeight: "bold",
    fontSize: width(4),
    marginBottom: height(2),
  },
  rotate: {
    position: "absolute",
    left: width(3),
  },
  flash: {
    position: "absolute",
    right: width(3),
    height: height(7),
    width: width(7),
  },
  flash2: {
    height: height(7),
    width: width(7),
  },
  zoomin: {
    position: "absolute",
    top: width(3),
  },
  zoomout: {
    position: "absolute",
    bottom: width(3),
  },
  gallery: {
    position: "absolute",
    top: height(3.4),
    left: width(5),
  },
  video: {
    position: "absolute",
    top: height(3.4),
    right: width(16),
  },
  more: {
    position: "absolute",
    top: height(2.8),
    left: width(2),
  },
  container: {
    backgroundColor: AppColors.white,
    width: width(100),
    paddingVertical: height(3),
    height: height(100),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  imageBorder: {
    margin: 1,
    borderWidth: 0.1,
  },
  image: {
    width: width(25),
    height: width(25),
  },
});
export default styles;
