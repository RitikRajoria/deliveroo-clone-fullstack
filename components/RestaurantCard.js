import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StarIcon, LocationMarkerIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import sanityClient, { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genreId,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const [categoryName, setcategoryName] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    sanityClient
      .fetch(
        `
          *[_type=="category" && _id == $genreId][0]
        `,
        { genreId },
      )
      .then((data) => {
        setcategoryName(data?.name);
      });
  }, []);

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow-sm"
      onPress={() => {
        navigation.navigate("Restaurant", {
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
        });
      }}
    >
      <Image
        className="h-36 w-64 rounded-sm"
        source={{
          uri: urlFor(imgUrl).url(),
        }}
      />
      <View className="px-3 pb-4 ">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className=" text-green-500">{rating}</Text> . {categoryName}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-gray-500 text-xs w-48">{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
