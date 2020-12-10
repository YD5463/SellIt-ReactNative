import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} {...otherProps} />;
}

export default SubmitButton;
