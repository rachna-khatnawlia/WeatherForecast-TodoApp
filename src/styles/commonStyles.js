import { StyleSheet } from "react-native";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "./responsiveSize";
import colors from "./colors";

export default StyleSheet.create({
  rowSpaceBtw:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  rowSpaceBtwAlCen:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  rowAlignCen:{
    flexDirection:'row',
    alignItems:'center'
  },
});

