import React from "react";

function PageTitle({title, fontSize, marginBottom}) {
  return (
    <div style={{ fontSize: fontSize, marginBottom: marginBottom }}>{title}</div>
  );
}

export default PageTitle;