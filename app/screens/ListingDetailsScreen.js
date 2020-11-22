import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import MapView from "react-native-maps";

import messages from "../api/messages";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";

import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import useApi from "./../hooks/useApi";
import * as Yup from "yup";
import { Notifications } from "expo";
import ActivityIndicator from "../components/ActivityIndicator";
import user from "../api/user";
import notificationChannel from "../utility/notificationChannel";
import ImageListScroll from "./../components/ImageListScroll";
import routes from "../navigation/routes";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label("Contatct Message"),
});

function ListingDetailsScreen({ route, navigation }) {
  const { colors } = useTheme();
  const listing = route.params;
  const messageApi = useApi(messages.sendListingMessage);
  const getSallerApi = useApi(user.getSaller);

  useEffect(() => {
    getSallerApi.request(listing.userId);
    notificationChannel.init();
  }, []);
  const sendMessage = async ({ message }) => {
    Keyboard.dismiss();
    messageApi.request({
      message,
      listingId: listing.id,
    });
    Notifications.presentLocalNotificationAsync({
      title: "Message Sent",
      body: "the message sent to the seller keap track to see the response...",
      android: {
        channelId: "success_action",
        color: colors.secondary,
      },
    });
  };
  const onShare = async () => {
    // let redirectUrl = Linking.makeUrl("listings/listingsDetails/", listing);
    try {
      const result = await Share.share({
        message: `I am sharing with you listing called ${listing.title} in just ${listing.price}$`,
        title: listing.title,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <ActivityIndicator visible={messageApi.loading || getSallerApi.loading} />
      {!getSallerApi.loading && (
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          <ScrollView>
            <ImageListScroll
              images={listing.images}
              onDoubleTap={(image) =>
                navigation.navigate(routes.LISTING_IMAGE, {
                  imageUri: image.url,
                })
              }
            />

            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{listing.title}</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.price, { color: colors.secondary }]}>
                    ${listing.price}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={onShare}>
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={27}
                      color={colors.medium}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.userContainer}>
                <ListItem
                  image={
                    getSallerApi.data.profile_image
                      ? getSallerApi.data.profile_image.url
                      : null
                  }
                  title={getSallerApi.data.name}
                  subTitle={`${getSallerApi.data.listings} Listing`}
                  onPress={() =>
                    Linking.openURL(`tel:${getSallerApi.data.phone_number}`)
                  }
                  iconName="phone"
                  padding={0}
                />
              </View>
            </View>
            <Form
              initialValues={{ message: "" }}
              onSubmit={sendMessage}
              validationSchema={validationSchema}
            >
              <FormField placeholder="Message..." name="message" />
              <SubmitButton title="CONTACT SELLER" />
              <ErrorMessage
                error="Error sending the message..."
                visible={messageApi.error}
              />
            </Form>
            {listing.location && (
              <MapView
                style={styles.map}
                initialRegion={{
                  ...listing.location,
                  latitudeDelta: 0.3,
                  longitudeDelta: 0.3,
                }}
              >
                <MapView.Marker
                  coordinate={listing.location}
                  title="Saler Location"
                  description={"See if the location is'nt too far..."}
                />
              </MapView>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
  map: {
    height: 200,
    width: "100%",
    marginTop: 20,
    marginBottom: 15,
  },
});

export default ListingDetailsScreen;
