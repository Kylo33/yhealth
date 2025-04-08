import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from "react-native-svg";
import { Image, ImageSource } from "expo-image";

type Props = {
  imageSource: ImageSource;
};

export default function Hero({ imageSource }: Props) {
  return (
    <View style={styles.hero}>
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#ef8228" stopOpacity="1" />
            <Stop offset="100%" stopColor="#1e2021" stopOpacity=".3" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <Svg
        viewBox="0 0 400 100"
        height="100"
        width="100%"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <Path
          d="M0,30 C70,30 100,70 200,80 C300,70 330,30 400,30 V100 H0 Z"
          fill="#1e2021"
        />
      </Svg>
      <Image
        source={imageSource}
        style={{
          flex: 1,
          padding: 64,
          position: "absolute",
          inset: 0,
          aspectRatio: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    position: "relative",
    height: 300,
    width: "100%",
  },
});
