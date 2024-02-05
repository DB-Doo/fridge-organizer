// AddItemScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"; // Import Keyboard and TouchableWithoutFeedback
import { addItem } from "../db/mockDatabase";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddItemScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date()); // Use Date object
  const [category, setCategory] = useState("");

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setExpirationDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (name && quantity && expirationDate && category) {
      // Format expirationDate to a string or desired format before sending to your database
      const formattedDate = expirationDate.toISOString().split("T")[0]; // Example of formatting to YYYY-MM-DD
      await addItem({
        name,
        quantity,
        expirationDate: formattedDate,
        category,
      });
      navigation.goBack();
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
        />

        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
          placeholder="Enter quantity"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Expiration Date:</Text>
        {/* DateTimePicker always visible */}
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />

        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />

        <Button title="Add Item" onPress={handleSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default AddItemScreen;
