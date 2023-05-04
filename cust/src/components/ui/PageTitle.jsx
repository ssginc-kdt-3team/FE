import React from "react";

function PageTitle({title, fontSize, marginBottom}) {
  return (
    <div style={{ fontSize: fontSize, fontWeight: '500', marginBottom: marginBottom }}>{title}</div>
  );
}

export default PageTitle;