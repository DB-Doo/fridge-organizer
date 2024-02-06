import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Platform } from "react-native";
import { getItemById, updateItem } from "../db/mockDatabase";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

const EditItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemExpirationDate, setItemExpirationDate] = useState(new Date()); // Use Date object for expiration date

  useEffect(() => {
    const fetchItemDetails = async () => {
      const item = await getItemById(itemId);
      if (item) {
        setItemName(item.name);
        setItemQuantity(item.quantity.toString());
        setItemExpirationDate(new Date(item.expirationDate)); // Convert string date to Date object
      }
    };
    fetchItemDetails();
  }, [itemId]);

  const handleSave = async () => {
    await updateItem(itemId, {
      name: itemName,
      quantity: parseInt(itemQuantity, 10),
      expirationDate: itemExpirationDate.toISOString(), // Convert Date object to string
    });
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || itemExpirationDate;
    setItemExpirationDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text>Edit Item</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Item Name"
      />
      <TextInput
        style={styles.input}
        value={itemQuantity}
        onChangeText={setItemQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
      />
      <DateTimePicker
        value={itemExpirationDate}
        mode="date"
        display="default"
        onChange={onChangeDate}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

export default EditItemScreen;