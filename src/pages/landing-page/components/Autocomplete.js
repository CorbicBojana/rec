import React, { Fragment, useState } from "react";

function Autocomplete(props) {
  const { onChange, onKeyDown, suggestionsListComponent } = props;
  return (
    <Fragment>
      <input type="text" onChange={onChange} onKeyDown={onKeyDown} />
      {suggestionsListComponent}
    </Fragment>
  );
}

export default Autocomplete;
