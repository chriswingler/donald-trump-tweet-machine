import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

import Markov from "libmarkov";
import megaTweet from "./tweets";

const fakeTrumpTweetGenerator = new Markov(megaTweet);

class Tweeter extends React.Component {
  constructor(props) {
    super(props);

    this.handleTweet = this.handleTweet.bind(this);
    this.handleActiveTweeting = this.handleActiveTweeting.bind(this);
  }

  state = {
    activelyTweeting: true,
    tweet:
      "Media is working overtime not to mention the infiltration of people, and they told me later, ‘oh by the Democrats!"
  };

  handleTweet() {
    if (!this.state.activelyTweeting) {
      return;
    }

    let tweet = fakeTrumpTweetGenerator.generateSentence();

    if (tweet.includes("&amp")) {
      tweet = fakeTrumpTweetGenerator.generateSentence();
    }

    this.setState({
      tweet
    });
  }

  handleActiveTweeting() {
    this.setState({
      activelyTweeting: !this.state.activelyTweeting
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.handleTweet();
    }, 5000);
  }

  render() {
    return (
      <div id="quote-box">
        {this.state.tweet}
        <TweetToggle
          anim={this.state.activelyTweeting}
          handleActiveTweeting={this.handleActiveTweeting}
        />
        <Trump anim={this.state.activelyTweeting} />
      </div>
    );
  }
}

const Trump = props => {
  let className = "";
  let className2 = "";

  if (props.anim) {
    className = " animated infinite bounce";
    className2 = " animated infinite shake";
  }

  return (
    <div id="torso">
      <div id="hair" className={className} />

      <div id="left-eye-brow" class="eye-brows" />
      <div id="right-eye-brow" class="eye-brows" />

      <div id="left-eye" class="eyes" />
      <div id="right-eye" class="eyes" />

      <div id="mouth" />

      <div id="undershirt">
        <div id="suit-left" />
        <div id="suit-right" />

        <div id="suit-middle" />
      </div>

      <div id="phone" className={className2}>
        <div id="hand-left" />
        <div id="hand-right" />

        <div id="phone-middle" />
      </div>
    </div>
  );
};

const Header = () => (
  <div id="top">
    <h1 id="heading">
      Donald Trump<br />Tweet Machine
    </h1>
  </div>
);

const TweetToggle = props => {
  let className = "";

  const togglePos = { left: "75%" };

  if (!props.anim) {
    className = "animOff";
    togglePos.left = 0;
  } else {
    className = "animOn";
    togglePos.left = "75%";
  }

  return (
    <div id="tweet-auto-toggle-container">
      <h2 id="auto-tweet-label">Auto Tweet</h2>
      <button id="tweet-auto-toggle" onClick={props.handleActiveTweeting}>
        <div id="circle" style={togglePos} />
      </button>
    </div>
  );
};

function App() {
  return (
    <div>
      <div id="mobile-message">
        Please View on Mobile Device<br /> - <br />Or Resize Browser Window
      </div>
      <Header />
      <Tweeter />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
