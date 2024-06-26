import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      categoryName,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        categoryName,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={"#00ccbb"}></ArrowLeftIcon>
          </TouchableOpacity>
          <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className="flex-row items-center space-x-1">
                  <StarIcon opacity={0.5} size={22} color="green" />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> .{" "}
                    {categoryName}
                  </Text>
                </View>

                <View className="flex-row items-center space-x-1">
                  <MapPinIcon color="gray" size={22} opacity={0.4} />
                  <Text className="text-gray-500 text-xs w-48">{address}</Text>
                </View>
              </View>

              <Text className="text-gray-500 mt-2 pb-4">
                {short_description}
              </Text>
              <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-t border-gray-300">
                <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                <Text className="pl-2 flex-1 text-md font-bold">
                  Have a food allergy?{" "}
                </Text>
                <ChevronRightIcon color={"#00ccbb"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="pb-40">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {/* Dishrows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
