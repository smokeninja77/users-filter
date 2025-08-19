import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Button, View, Pressable } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Dropdown } from "react-native-element-dropdown";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

type MyBottomSheetProps = {
  onChange?: (index: number) => void;
  closeBottomSheet: () => void;
  cities: any;
  companies: any;
  filtersList?: (selectedCity, selectedCompany) => void;
};

const MyBottomSheet = forwardRef<BottomSheetModalMethods, MyBottomSheetProps>(
  ({ onChange, closeBottomSheet, cities, companies, filtersList }, ref) => {
    const { bottom } = useSafeAreaInsets();
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    const cityOptions = useMemo(
      () =>
        cities?.map((c) => ({
          label: c,
          value: c,
        })) || [],
      [cities],
    );

    const companyOptions = useMemo(
      () =>
        companies?.map((c) => ({
          label: c,
          value: c,
        })) || [],
      [companies],
    );

    const resetHandler = () => {
      setSelectedCity("");
      setSelectedCompany("");
      // filtersList?.("", "");
    };

    const doneHandler = () => {
      filtersList?.(selectedCity, selectedCompany);
    };

    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />}
        backgroundStyle={{ backgroundColor: Colors.primary }}
      >
        <BottomSheetView style={[styles.sheetView, { paddingBottom: bottom + 15 }]}>
          <TouchableOpacity onPress={closeBottomSheet} style={styles.closeModal}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 25 } as TextStyle}>Filter</Text>
            <Text style={{ fontSize: 16, marginBottom: 15 }}>City</Text>
            <Dropdown
              style={[styles.dropdown, { marginBottom: 30 }]}
              data={cityOptions}
              labelField="label"
              valueField="value"
              placeholder="Select a city"
              value={selectedCity}
              onChange={(item) => setSelectedCity(item.value)}
              placeholderStyle={{ color: "#838383" }}
            />
            <Text style={{ fontSize: 16, marginBottom: 15 }}>Company</Text>
            <Dropdown
              style={[styles.dropdown]}
              data={companyOptions}
              labelField="label"
              valueField="value"
              placeholder="Select a company"
              value={selectedCompany}
              placeholderStyle={{ color: "#838383" }}
              onChange={(item) => setSelectedCompany(item.value)}
            />
          </View>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  opacity: !selectedCity && !selectedCompany ? 0.2 : 1,
                },
              ]}
              disabled={!selectedCity && !selectedCompany}
              onPress={resetHandler}
            >
              <Text style={[styles.actionText, { color: "#000" }]}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#000" }]} onPress={doneHandler}>
              <Text style={styles.actionText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default MyBottomSheet;

const styles = StyleSheet.create({
  sheetView: {
    flex: 1,
    minHeight: 500,
    paddingTop: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  closeModal: {
    position: "absolute",
    right: 30,
    top: 15,
    zIndex: 1,
  },
  actionWrapper: {
    flexDirection: "row",
    gap: 15,
    marginTop: 60,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
