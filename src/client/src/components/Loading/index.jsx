import Spinner from "react-spinner-material";
import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div style={{ alignContent: "center" }}>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
        />
      </div>
    );
  }
}

export default Loading;
