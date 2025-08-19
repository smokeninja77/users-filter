import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { SlidersHorizontal } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import MyBottomSheet from "@/components/MyBottomSheet";
import { useFetchUsers } from "@/hooks/fetchUsers";
import UserBox from "@/components/UserBox";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UsersScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const { data, isLoading, isError } = useFetchUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    if (isError) {
      Alert.alert("Error", "Something wrong!");
    }
  }, [isError]);

  const cities = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((user) => user?.address?.city))];
  }, [data]);

  const companies = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((user) => user?.company?.name))];
  }, [data]);

  const filteredUsers = useMemo(() => {
    console.log("data", data);
    if (!data) return [];

    return data.filter((user) => {
      const searchName = searchQuery.trim() === "" || user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const searchCity = selectedCity.trim() === "" || user.address.city === selectedCity;
      const searCompany = selectedCompany.trim() === "" || user.company.name === selectedCompany;

      return searchName && searchCity && searCompany;
    });
  }, [data, searchQuery, selectedCity, selectedCompany]);

  const bottomSheetRef = useRef<any>(null);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  return (
    <ScreenWrapper>
      <View style={{ flexDirection: "row", gap: 15, marginBottom: 30 } as ViewStyle}>
        <View style={{ flex: 1 }}>
          <EvilIcons style={styles.searchIcon} name="search" size={24} color="black" />
          <TextInput
            style={styles.inputText}
            placeholder={"Search..."}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <>
            {searchQuery && (
              <TouchableOpacity style={styles.delete} onPress={() => setSearchQuery("")}>
                <MaterialIcons name="delete" size={20} color="black" />
              </TouchableOpacity>
            )}
          </>
        </View>
        <TouchableOpacity
          onPress={() => {
            openBottomSheet();
            Keyboard.dismiss();
          }}
          style={[styles.filterBtn, { backgroundColor: selectedCity || selectedCompany ? "#000" : "#fff" }]}
        >
          <SlidersHorizontal size={20} color={selectedCity || selectedCompany ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers ?? []}
        keyExtractor={(item, index) => index.toString()}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={isTablet ? ({ justifyContent: "space-between" } as ViewStyle) : undefined}
        renderItem={({ item }) => <UserBox person={item} />}
        ListEmptyComponent={isLoading ? <ActivityIndicator size="100" color="#000" /> : <Text>No users found.</Text>}
        contentContainerStyle={{ paddingBottom: bottom + 120, paddingHorizontal: 0 }}
      />

      <MyBottomSheet
        ref={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        cities={cities}
        companies={companies}
        filtersList={(city, company) => {
          setSelectedCity(city);
          setSelectedCompany(company);
          closeBottomSheet();
        }}
      />
    </ScreenWrapper>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  searchIcon: {
    position: "absolute",
    left: 8,
    top: 11,
    zIndex: 1,
  },
  delete: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  inputText: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    paddingLeft: 40,
  },
  filterBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
