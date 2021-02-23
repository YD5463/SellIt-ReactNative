import React from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

function AppModal({
  MainComponent,
  animationType = "slide",
  visible,
  setVisible,
}) {
  return (
    <Modal visible={visible} animationType={animationType} transparent={true}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPressOut={() => setVisible(false)}
      >
        <TouchableWithoutFeedback>
          <MainComponent />
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

export default AppModal;
