import React from "react";
import { View, Animated } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

function ResizableImage({ uri, style }) {
  const scale = new Animated.Value(1);
  const onZoomEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: true, //for performence
  });
  const onZoomStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <PinchGestureHandler
      onGestureEvent={onZoomEvent}
      onHandlerStateChange={onZoomStateChange}
    >
      <Animated.Image
        resizeMode={"contain"}
        source={{
          uri: uri,
        }}
        style={[
          style,
          {
            transform: [{ perspective: 200 }, { scale: scale }],
          },
        ]}
      />
    </PinchGestureHandler>
  );
}

export default ResizableImage;
