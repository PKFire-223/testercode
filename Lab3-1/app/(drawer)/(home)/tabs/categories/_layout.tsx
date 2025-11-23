// 23521276 Bùi Trương Nhật Quang
import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CatA from "./cat-a";
import CatB from "./cat-b";
import CatC from "./cat-c";

const TopTabs = createMaterialTopTabNavigator();

export default function CategoriesTopTabs() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="CatA" component={CatA} options={{ title: "Category A" }} />
      <TopTabs.Screen name="CatB" component={CatB} options={{ title: "Category B" }} />
      <TopTabs.Screen name="CatC" component={CatC} options={{ title: "Category C" }} />
    </TopTabs.Navigator>
  );
}
