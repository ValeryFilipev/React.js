import React from "react";

import classes from "./index.css";

const backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

export default backdrop;
