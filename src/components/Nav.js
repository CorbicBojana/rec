import React from "react";
import Link from "@material-ui/core/Link";

import logo from "../cook.svg";

const style = {
  width: "100px",
  height: "100px",
  margin: "30px"
};

function Nav() {
  return (
    <Link component="button" variant="body2">
      <img src={logo} alt="logo" style={style} />
    </Link>
  );
}

export default Nav;
