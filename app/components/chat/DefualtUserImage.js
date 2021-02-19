import React from "react";
import Icon from "./../Icon";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";

function DefualtUserImage({ size = 50 }) {
  return (
    <Icon
      name="user"
      iconColor={colors.white}
      IconComponent={FontAwesome}
      backgroundColor={colors.contactBackground}
      size={size}
    />
  );
}

export default DefualtUserImage;
