import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
import BasketScreen from "../screens/BasketScreen";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="w-full z-50 absolute bottom-10">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#00ccbb] rounded-lg p-4 items-center space-x-1"
      >
        <View className="flex-row">
          <View className="rounded-md bg-[#01a296] ">
            <Text className="text-white font-extrabold text-lg py-1 px-2 ">
              {items.length}
            </Text>
          </View>
          <Text className="flex-1 text-lg text-white font-extrabold items text-center">
            View Basket
          </Text>
          <Text className="text-lg text-white font-extrabold">
            <Currency quantity={basketTotal} currency="GBP" />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
