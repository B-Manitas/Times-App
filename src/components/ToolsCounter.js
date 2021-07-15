// Import Librairies
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// Import Customs Components.
import ButtonCTA from "./ButtonCTA";
import ButtonMenu from "./ButtonMenu";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";
import { LOGO } from "../utils/ConstantImages";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const ToolsCounter = () => {
  const [counter, setCounter] = useState(0);
  const [val, setVal] = useState("");
  const [isExceeded, setIsExceeded] = useState(false);

  return (
    <View style={styles.ctn_main}>
      <View style={{ flexDirection: "row" }}>
        <ButtonMenu
          disabled={true}
          is_active={true}
          flex={1 / 2}
          src_img={LOGO.calculator}
          text={"Counter"}
        />
        <TextInput
          style={styles.input}
          editable={false}
          defaultValue={getCounterTxt()}
        />
      </View>

      <View style={styles.ctn_btn}>
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"1"} onPress={() => setVal((t) => t + 1)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"2"} onPress={() => setVal((t) => t + 2)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"3"} onPress={() => setVal((t) => t + 3)} />
      </View>
      <View style={styles.ctn_btn}>
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"4"} onPress={() => setVal((t) => t + 4)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"5"} onPress={() => setVal((t) => t + 5)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"6"} onPress={() => setVal((t) => t + 6)} />
      </View>
      <View style={styles.ctn_btn}>
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"7"} onPress={() => setVal((t) => t + 7)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"8"} onPress={() => setVal((t) => t + 8)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"9"} onPress={() => setVal((t) => t + 9)} />
      </View>
      <View style={styles.ctn_btn}>
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"Clean"} onPress={reset} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"0"} onPress={() => setVal((t) => t * 10)} />
        <ButtonCTA borderColor={COLORS_APP.outline_third} text={"+"} onPress={add} />
      </View>
    </View>
  );

  function getCounterTxt() {
    if (!isExceeded) {
      if (counter === 0 && val === "") return "0";
      if (counter === 0) return String(val);
      else if (val === "") return ` + ${counter} =`;
      else return `${val} + ${counter} =`;
    } else return "ヽ(❍ᨎ❍)ﾉ";
  }

  function add() {
    setCounter(counter + Number(val));
    setVal("");

    if (counter > 10 ** 10) setIsExceeded(true);
  }

  function reset() {
    setCounter(0);
    setVal("");
    setIsExceeded(false);
  }
};

export default ToolsCounter;

const styles = StyleSheet.create({
  ctn_main: {
    flex: 1,
  },

  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS_APP.background_secs,
    borderBottomWidth: 2,
    padding: 5,
    marginRight: 2,
    color: COLORS_APP.font_main,
    fontFamily: FONT_FAMILY.main,
    textAlign: "right",
    fontSize: 22,
  },

  ctn_btn: {
    flexDirection: "row",
  },

  btn: {
    flex: 1,
    borderColor: COLORS_APP.background_secs,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
});
