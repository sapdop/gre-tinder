import React, { PureComponent } from "react";
import cardImage from "../images/GREassets_Card.png";
import buttonLeftImg from "../images/buttonLeft.png";
import buttonRightImg from "../images/buttonRight.png";
import Animate from "react-move/Animate";
import { easeExpOut } from "d3-ease";
import { withGesture } from "react-with-gesture";

var bgColors = {
  Default: "#81b71a",
  Blue: "#00B1E1",
  Cyan: "#37BC9B",
  Green: "#8CC152",
  Red: "#E9573F",
  Yellow: "#F6BB42"
};

var words = [
  "abate",
  "chicanery",
  "disseminate",
  "gainsay",
  "latent",
  "aberrant",
  "coagulate",
  "dissolution",
  "garrulous",
  "laud"
];

var meanings = [
  "become less in amount or intensity",
  "the use of tricks to deceive someone",
  "cause to become widely known",
  "take exception to",
  "potentially existing but not presently evident or realized",
  "markedly different from an accepted norm",
  "change from a liquid to a thickened or solid state",
  "separation into component parts",
  "full of trivial conversation",
  "praise, glorify, or honor"
];

/* set the background color of the page */
document.body.style = "background: " + bgColors.Green;

/* image styling */

class Card extends PureComponent {
  state = {
    word: words[this.getRandomInt(0, 10)],
    meaning: meanings[this.getRandomInt(0, 10)],
    direction: "none"
  };

  divisionStyles = {
    position: "absolute",
    top: "25%",
    left: window.innerWidth / 3.2
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
  /*Small 2-line description of the word which may/may not be correct.*/

  moveLeft = () => {
    this.setState({ direction: "Left" });
  };

  moveRight = () => {
    this.setState({ direction: "Right" });
  };

  randomizeWord = () => {
    this.setState({
      word: words[this.getRandomInt(0, 10)],
      meaning: meanings[this.getRandomInt(0, 10)],
      direction: "none"
    });
    console.log("randomized");
  };

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  render() {
    return (
      <div>
        <Animate
          start={() => ({
            x: 0
          })}
          update={() => ({
            x:
              this.state.direction === "none"
                ? window.innerWidth / 2
                : [this.state.direction === "Left" ? -1000 : 1000],
            timing: { duration: 750, ease: easeExpOut }
          })}
        >
          {state => {
            const { x } = state;

            return (
              <div style={this.divisionStyles}>
                <div
                  style={{
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
                    <p style={this.descriptionTextStyles}>
                      {this.state.meaning}
                    </p>
                  </view>
                </div>
              </div>
            );
          }}
        </Animate>
        <div>
          {" "}
          <button
            className="btn btn-secondary btn-sm"
            onClick={this.randomizeWord}
          >
            randomize
          </button>
          <button onClick={this.moveLeft} style={this.buttonStyle}>
            <img style={this.buttonImageStyle} src={buttonLeftImg} />{" "}
          </button>
          <button
            style={{
              backgroundColor: "Transparent",
              border: 0,
              position: "absolute",
              top: "80%",
              left: "85%"
            }}
            onClick={this.moveRight}
          >
            <img style={this.buttonImageStyle} src={buttonRightImg} />{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default Card;
