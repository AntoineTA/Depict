import React, { Component } from "react";
import { View, Text, PanResponder, Animated, StyleSheet } from "react-native";

interface SwipeableButtonProps {
  color?: string;
  text?: string;
  text_unlocked?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SwipeableButtonState {
  unlocked: boolean;
}

export default class SwipeableButton extends Component<
  SwipeableButtonProps,
  SwipeableButtonState
> {
  private pan = new Animated.ValueXY();
  private containerWidth: number = 0;

  constructor(props: SwipeableButtonProps) {
    super(props);
    this.state = {
      unlocked: false,
    };
  }

  componentDidMount() {
    this.pan.x.addListener((value) => {
      if (value.value >= this.containerWidth * 0.9) {
        this.handleSuccess();
      } else if (value.value === 0) {
        this.handleFailure();
      }
    });
  }

  componentWillUnmount() {
    this.pan.x.removeAllListeners();
  }

  handleSuccess = () => {
    this.setState({ unlocked: true }, () => {
      Animated.timing(this.pan, {
        toValue: { x: this.containerWidth, y: 0 },
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        if (this.props.onSuccess) this.props.onSuccess();
      });
    });
  };

  handleFailure = () => {
    Animated.timing(this.pan, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (this.props.onFailure) this.props.onFailure();
    });
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !this.state.unlocked,
    onPanResponderGrant: () => {
      this.pan.setOffset({ x: 0, y: 0 });
      this.pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: this.pan.x,
        },
      ],
      { useNativeDriver: false },
    ),
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
      if (this.pan.x._value < this.containerWidth * 0.9) {
        this.handleFailure();
      }
    },
  });

  getText = () => {
    return this.state.unlocked
      ? this.props.text_unlocked || "UNLOCKED"
      : this.props.text || "SLIDE";
  };

  reset = () => {
    this.setState({ unlocked: false }, () => {
      this.pan.setValue({ x: 0, y: 0 });
    });
  };

  render() {
    const { color = "#2196F3" } = this.props;

    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          this.containerWidth = event.nativeEvent.layout.width - 50;
        }}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.slider,
            {
              transform: [{ translateX: this.pan.x }],
              backgroundColor: color,
            },
          ]}
        >
          <Text style={styles.sliderText}>{this.getText()}</Text>
          <View style={[styles.sliderCircle, { backgroundColor: color }]} />
        </Animated.View>
        <Text style={styles.text}>{this.getText()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#ddd",
    borderRadius: 25,
    justifyContent: "center",
  },
  slider: {
    position: "absolute",
    left: 0,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderText: {
    color: "white",
    fontWeight: "bold",
  },
  sliderCircle: {
    position: "absolute",
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
});
