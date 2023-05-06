import React from "react";

function PageTitle({title, fontSize, marginTop, marginBottom}) {
  return (
    <div style={{ 
      fontSize: fontSize, 
      fontWeight: '500', 
      marginTop: marginTop,
      marginBottom: marginBottom 
    }}>
      {title}
    </div>
  );
}

export default PageTitle;