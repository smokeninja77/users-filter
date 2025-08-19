import { View, StyleSheet } from "react-native";
import React from "react";

type ScreenWrapperProps = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return (
    <View style={styles.mainWrapper}>
      <View>{children}</View>
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flex: 1,
  },
});
