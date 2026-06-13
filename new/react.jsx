import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MealCard = ({ name, price, vendor }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.vendor}>{vendor}</Text>
        <Text style={styles.price}>${price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to CampusBite Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowOpacity: 0.1,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 15, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold" },
  price: { color: "#ea580c", fontWeight: "bold", marginTop: 4 },
  button: {
    backgroundColor: "#ea580c",
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

export default MealCard;
