import React, { PureComponent } from "react";
import Animate from "react-move/Animate";
import { easeExpOut } from "d3-ease";
import cardImage from "../images/GREassets_Card.png";
import buttonLeftImg from "../images/buttonLeft.png";
import buttonRightImg from "../images/buttonRight.png";

const trackStyles = {
  borderRadius: 4,
  backgroundColor: "rgb(240, 240, 232)",
  position: "relative",
  margin: "5px 3px 10px",
  width: 250,
  height: 50
};

class Example extends PureComponent {
  state = {
    open: false
  };

  divisionStyles = {
    position: "absolute",
    top: "25%",
    left: this.state.left
  };

  imageStyles = {
    height: 321,
    width: 522,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center"
  };

  headerStyles = {
    position: "absolute",
    top: "8%",
    left: "5%",
    fontSize: 40,
    fontWeight: "bold",
    flex: 1,
    flexGrow: 1,
    flexWrap: "wrap",
    flexDirection: "column"
  };

  descriptionTextStyles = {
    position: "absolute",
    top: "55%",
    left: "5%",
    color: "#4c4c4c",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
    flexGrow: 1,
    flexWrap: "wrap",
    flexDirection: "column"
  };

  buttonImageStyle = {
    height: 100,
    width: 100
  };

  buttonStyle = {
    backgroundColor: "Transparent",
    border: 0,
    position: "absolute",
    top: "80%",
    left: "5%"
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Toggle</button>
        <Animate
          start={() => ({
            x: 0
          })}
          update={() => ({
            x: [this.state.open ? 200 : 0],
            timing: { duration: 750, ease: easeExpOut }
          })}
        >
          {state => {
            const { x } = state;

            return (
              <div style={trackStyles}>
                <div
                  style={{
                    position: "absolute",
                    WebkitTransform: `translate3d(${x}px, 0, 0)`,
                    transform: `translate3d(${x}px, 0, 0)`
                  }}
                >
                  <img
                    className="img-responsive"
                    style={this.imageStyles}
                    src={cardImage}
                    alt=""
                  />
                  <view
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <h1 style={this.headerStyles}>
                      {this.state.word}
                      :(type)
                    </h1>
                    <p1 style={this.descriptionTextStyles}>
                      {this.state.meaning}
                    </p1>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={this.randomizeWord}
                    >
                      randomize
                    </button>
                  </view>
                </div>
              </div>
            );
          }}
        </Animate>
      </div>
    );
  }
}

export default Example;
