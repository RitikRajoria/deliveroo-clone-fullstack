import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRows = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=="featured" && _id == $id] 
    {
      ...,
      restaurants[]->
      {
        ...,dishes[]->
        {
          type->{
            name
          }
        }
      }
    }[0]
    `,
        { id },
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);

  return (
    <View>
      <View className="mt-4 justify-between items-center flex-row px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs px-4 text-gray-500">{description}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            id={restaurant._id}
            key={restaurant._id}
            address={restaurant.address}
            dishes={restaurant.dishes}
            imgUrl={restaurant.image}
            genreId={restaurant?.type._ref}
            lat={restaurant.lat}
            long={restaurant.long}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            title={restaurant.name}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRows;
