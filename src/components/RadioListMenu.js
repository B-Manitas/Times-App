// Import Librairies
import React from "react";
import { StyleSheet, View } from "react-native";

// Import Customs Components.
import ButtonMenu from "./ButtonMenu";

const RadioListMenu = ({ items, key_atv, onPress }) => {
  return (
    <View style={styles.ctn}>
      {items.map((item) => (
        <ButtonMenu
          key={item.key}
          text={item.text}
          src_img={item.src_img}
          id={item.key}
          is_active={item.key == key_atv}
          onPress={(k)=>onPress(k)}
        />
      ))}
    </View>
  );
};

export default RadioListMenu;


const styles = StyleSheet.create({
  ctn:{
    flexDirection: "row",
  }
})
