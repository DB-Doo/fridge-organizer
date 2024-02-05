// mockDatabase.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultItems } from './defaultItems';

const STORAGE_KEY = "@fridgeOrganizerItems";
let items = [];

export const loadItems = async () => {
  try {
    const itemsString = await AsyncStorage.getItem(STORAGE_KEY);
    if (itemsString === null) {
      // No items are in AsyncStorage, initializing with default items
      items = defaultItems;
      await saveItems(); // Save the default items to AsyncStorage
    } else {
      items = JSON.parse(itemsString);
    }
  } catch (error) {
    // Handle errors here
  }
  return items;
};

export const saveItems = async () => {
  try {
    const itemsString = JSON.stringify(items);
    await AsyncStorage.setItem(STORAGE_KEY, itemsString);
  } catch (error) {
    // Handle errors here
  }
};

// ... (rest of your addItem, updateItem, and deleteItem functions, make sure to call saveItems after each modification)

let currentId = 4;

export const addItem = async (item) => {
  const newItem = { ...item, id: String(currentId++) };
  items.push(newItem);
  await saveItems();
};

export const updateItem = async (id, updatedItem) => {
  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    items[itemIndex] = { ...items[itemIndex], ...updatedItem };
    await saveItems();
  }
};

export const deleteItem = async (id) => {
  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    items.splice(itemIndex, 1);
    await saveItems();
  }
};
export const getItems = () => items;
