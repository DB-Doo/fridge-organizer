// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { loadItems, getItems, deleteItem } from "../db/mockDatabase";

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await loadItems(); // Load items from mock database
        setItems(getItems() || []); // Get items using getItems and set to state
      };

      fetchData();
    }, [])
  );

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    // Clone the items array to trigger a state update and force a re-render
    setItems([...getItems()]);
  };

  const renderRightActions = (progress, dragX, item) => {
    return (
      <TouchableOpacity
        onPress={() => handleDeleteItem(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item)
        }
        onSwipeableOpen={() => {
          if (item.swipeDirection === "right") {
            handleDeleteItem(item.id); // Trigger deletion when swipe action is fully opened
          }
        }}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>{`Quantity: ${item.quantity}, Expires on: ${item.expirationDate}`}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Styles for the HomeScreen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 18,
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
