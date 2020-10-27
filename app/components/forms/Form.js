import React from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...otherProps
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      {...otherProps}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
