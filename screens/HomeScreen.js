// HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { loadItems, getItems, deleteItem } from "../db/mockDatabase";

const HomeScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await loadItems();
        setItems(getItems() || []);
      };
      fetchData();
    }, [])
  );

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setItems([...getItems()]);
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 0], // Adjust this based on the combined width of your buttons
    });
  
    return (
      <Animated.View style={{ flexDirection: 'row', transform: [{ translateX: trans }] }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditItem', { itemId: item.id })}
          style={[styles.actionButton, { backgroundColor: 'blue' }]}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteItem(item.id)}
          style={[styles.actionButton, { backgroundColor: 'red' }]}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
      friction={2} // Adjust the friction to control the swipe sensitivity
      rightThreshold={40} // Adjust this to control how far the user must swipe to fully reveal the delete button
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{`Quantity: ${item.quantity}, Expires on: ${item.expirationDate}`}</Text>
      </View>
    </Swipeable>
  );

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
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

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
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100, // Define the width of your action buttons here
    height: "100%",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;