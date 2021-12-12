import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Vibration,
} from "react-native";

import RoundedButton from "./components/RoundedButton";

const minutesToMilis = (min) => {
  return min * 60 * 1000;
};

const formatTime = (time) => {
  if (time < 10) {
    return "0" + time;
  } else return time;
};

export default function App() {
  const [milis, setMilis] = useState(minutesToMilis(20));
  const [isPaused, setIsPaused] = useState(true);

  const min = Math.floor(milis / 1000 / 60) % 60;
  const sec = Math.floor(milis / 1000) % 60;

  const vibrate = () => {
    Vibration.vibrate(400);
  };

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(countDown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  const buttonOnPress = (time) => {
    setIsPaused(true);
    setMilis(minutesToMilis(time));
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>
          {formatTime(min)}:{formatTime(sec)}
        </Text>
      </View>
      <View style={{ marginBottom: 10, width: "30%" }}>
        <Button
          title="start"
          color="green"
          onPress={() => {
            setIsPaused(false);
          }}
        />
      </View>
      <View style={{ marginBottom: 10, width: "30%" }}>
        <Button
          title="pause"
          color="red"
          onPress={() => {
            setIsPaused(true);
          }}
        />
      </View>
      <View style={{ width: "30%" }}>
        <Button
          title="Set to 1"
          onPress={() => {
            setIsPaused(true);
            setMilis(minutesToMilis(0.1));
          }}
        />
      </View>

      <View style={styles.timingContainer}>
        <RoundedButton time={5} clickButton={buttonOnPress} />
        <RoundedButton time={10} clickButton={buttonOnPress} />
        <RoundedButton time={15} clickButton={buttonOnPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    borderWidth: 5,
    padding: 20,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  timer: {
    fontSize: 80,
    fontWeight: "bold",
  },
  timingContainer: {
    flexDirection: "row",
    margin: 10,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "center",
  },
});
