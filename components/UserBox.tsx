import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

const UserBox = ({ person }: any) => {
  const fields = [
    { label: "Name", value: person?.name },
    { label: "Email", value: person?.email },
    { label: "City", value: person?.address?.city },
    { label: "Company", value: person?.company?.name },
    { label: "Phone", value: person?.phone },
    { label: "Website", value: person?.website },
  ];

  return (
    <View style={styles.userWrapper}>
      <View>
        <Image
          source={require("@/assets/images/empty_user_icon.png")}
          style={{ width: 80, height: 80, marginBottom: 10 }}
        />
      </View>
      <View style={{ width: "100%" } as ViewStyle}>
        <>
          {fields.map((field, index) => {
            return (
              <View key={`${field.label}_index`} style={{ alignItems: "center", width: "100%" } as ViewStyle}>
                <>{index > 0 && <Text style={{ fontSize: 12, marginBottom: 5 }}>{field.label}</Text>}</>
                <Text style={[styles.textItem, field.value === person.name && styles.textName]}>{field.value}</Text>
              </View>
            );
          })}
        </>
      </View>
    </View>
  );
};

export default UserBox;

const styles = StyleSheet.create({
  userWrapper: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    margin: 6,
    padding: 12,
    paddingVertical: 30,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  textItem: {
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 14,
  },
  textName: {
    fontWeight: 500,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 16,
  },
});
