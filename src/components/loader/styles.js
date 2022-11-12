import { StyleSheet } from 'react-native';
import AppColors from '~utills/AppColors';
import { height, width } from '~utills/Dimension';
const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.white,
        width: width(100),
        paddingVertical: height(3),
        height:height(100),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    text: {
        color: AppColors.black,
        fontSize: width(3.2),
        marginLeft: width(2),
        fontWeight: 'bold'
    }
  
});
export default styles;
