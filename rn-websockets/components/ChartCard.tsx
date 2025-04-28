import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

type Props = {
  data: lineDataItem[];
  title: string;
  suffix?: string;
};

export default function ChartCard({ data, title, suffix = "mm" }: Props) {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 32; // Account for padding

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.horizontalDivider} />
      <View style={styles.chartWrapper}>
        <LineChart
          areaChart
          curved
          data={data}
          color1="#ef8228"
          hideDataPoints1
          startFillColor1="#ef8228"
          startOpacity={0.8}
          endOpacity={0.0}
          adjustToWidth
          width={chartWidth}
          hideRules
          yAxisColor="#85858588"
          xAxisColor="#85858588"
          yAxisTextStyle={{ color: "#85858588" }}
          yAxisLabelWidth={60}
          yAxisLabelSuffix={` ${suffix}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: "#313435",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  chartWrapper: {
    width: "100%",
    overflow: "hidden",
  },
  horizontalDivider: {
    backgroundColor: "#85858588",
    height: 1,
  },
  title: {
    fontSize: 18,
    color: "#858585",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
});
