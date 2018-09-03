import React from "react";
import ReactDOM from "react-dom";
import { withGesture } from "react-with-gesture";
import { Spring, animated } from "react-spring";
import "./styles.css";
import cardImage from "../images/GREassets_Card.png";
import buttonLeftImg from "../images/buttonLeft.png";
import buttonRightImg from "../images/buttonRight.png";

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

document.body.style = "background: " + bgColors.Green;

//@withGesture // https://github.com/drcmda/react-with-gesture
const SliderComponent = withGesture(
  class Slider extends React.Component {
    state = {
      word: words[this.getRandomInt(0, 10)],
      meaning: meanings[this.getRandomInt(0, 10)],
      score: 0,
      isNotMoving: true,
      leftWallOpacity: 0,
      rightWallOpacity: 0
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
      top: "15%",
      left: "5%",
      fontSize: 38,
      fontWeight: "bold",
      flex: 1,
      flexGrow: 1,
      flexWrap: "wrap",
      flexDirection: "column"
    };

    descriptionTextStyles = {
      position: "absolute",
      top: "50%",
      left: "5%",
      color: "#4c4c4c",
      fontSize: 20,
      fontWeight: "bold",
      flex: 1,
      flexGrow: 1,
      flexWrap: "wrap",
      flexDirection: "column",
      backgroundImage: { cardImage }
    };

    scoreHeaderTextStyles = {
      position: "absolute",
      top: "15%",
      left: "45%",
      fontSize: 38,
      fontWeight: "bold",
      flex: 1,
      flexGrow: 1,
      flexWrap: "wrap",
      flexDirection: "column",
      color: "#4c4c4c"
    };

    randomizeWord = () => {
      var wordIndex = this.getRandomInt(0, words.length - 1);
      // do a little coin flip to decide wether to put the correct meaning or a different one
      var coinFlip = this.getRandomInt(0, 2);
      console.log("coin flip :" + coinFlip);
      if (coinFlip == 0) {
        // put a random meaning
        this.setState({
          word: words[wordIndex],
          meaning: meanings[this.getRandomInt(0, 10)],
          direction: "none"
        });
      } else {
        // put the accurate meaning , this way , getting an accurate combination is more possible
        this.setState({
          word: words[wordIndex],
          meaning: meanings[wordIndex],
          direction: "none"
        });
      }

      //console.log("randomized");
    };

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    checkMeaning = () => {
      return words.indexOf(this.state.word) ===
        meanings.indexOf(this.state.meaning)
        ? true
        : false;
    };

    OnCardSwipe = direction => {
      if (this.state.isNotMoving === true) {
        if (direction === "Left") {
          this.setState({
            isNotMoving: false,
            leftWallOpacity: 0.5,
            direction: "Left"
          });
        } else {
          this.setState({
            isNotMoving: false,
            rightWallOpacity: 0.5,
            direction: "Right"
          });
        }
      }
    };

    OnCardSwipeEnd = direction => {
      if (direction === "Left") {
        if (this.checkMeaning() === false) {
          this.setState({ score: this.state.score + 1 });
          //this.randomizeWord();
        } else {
          this.setState({ score: this.state.score - 1 });
          //this.randomizeWord();
        }
      } else {
        if (this.checkMeaning() === true) {
          this.setState({ score: this.state.score + 1 });
          //this.randomizeWord();
        } else {
          this.setState({ score: this.state.score - 1 });
          //this.randomizeWord();
        }
      }
    };

    render() {
      const { xDelta, down, children } = this.props;
      return (
        <div>
          <div>
            <p style={this.scoreHeaderTextStyles}>score: {this.state.score}</p>
            <div
              className="RightWall"
              style={{ opacity: this.state.rightWallOpacity }}
            />
            <div
              className="LeftWall"
              style={{ opacity: this.state.leftWallOpacity }}
            />
          </div>
          <gesture>
            <Spring
              native
              to={{ x: down ? xDelta : 0 }}
              immediate={name => down && name === "x"}
            >
              {({ x }) => (
                <div
                  className="item"
                  style={{
                    backgroundColor: xDelta < 0 ? "#ff7979" : "#badc58"
                  }}
                >
                  <animated.div
                    className="bubble"
                    style={{
                      transform: x
                        .interpolate({
                          map: Math.abs,
                          range: [50, 300],
                          output: [0.5, 1],
                          extrapolate: "clamp"
                        })
                        .interpolate(x => `scale(${x})`),
                      justifySelf: xDelta < 0 ? "end" : "start"
                    }}
                  />
                  <animated.div
                    className="fg"
                    style={{
                      transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
                    }}
                  >
                    <div>
                      <p style={this.headerStyles}>{this.state.word} </p>
                      <p style={this.descriptionTextStyles}>
                        {this.state.meaning}
                      </p>
                    </div>
                    {down && Math.abs(xDelta) > 250
                      ? xDelta < 0
                        ? this.OnCardSwipe("Left") // swipe left keyword - cancel
                        : this.OnCardSwipe("Right") // swipe right keyword - accept
                      : children}
                    {down && Math.abs(xDelta) > 250
                      ? ""
                      : this.state.isNotMoving === false
                        ? (this.OnCardSwipeEnd(this.state.direction),
                          this.setState({
                            isNotMoving: true,
                            leftWallOpacity: 0,
                            rightWallOpacity: 0
                          }),
                          this.randomizeWord())
                        : ""}
                  </animated.div>
                </div>
              )}
            </Spring>
          </gesture>
        </div>
      );
    }
  }
);
export default SliderComponent;
