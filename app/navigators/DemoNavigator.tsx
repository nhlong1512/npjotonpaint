/* eslint-disable @typescript-eslint/no-unused-vars */
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import PaintScreen from "app/screens/PaintScreen"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  Paint: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon icon="menu2Icon" color={focused ? colors.main : colors.main2} size={30} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: 'Mua sắm',
          tabBarIcon: ({ focused }) => (
            <Icon icon="cartIcon" color={focused ?colors.main : colors.main2} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Paint"
        component={PaintScreen}
        options={{
          tabBarLabel: 'Công cụ',
          tabBarIcon: ({ focused }) => (
            <View style={$paintView}>
              <Icon icon="paintIcon" color={focused ? colors.main : 'white'} size={40} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: 'Tìm đại lý',
          tabBarIcon: ({ focused }) => (
            <Icon icon="shopIcon" color={focused ?colors.main : colors.main2} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ focused }) => (
            <Icon icon="accountIcon" color={focused ?colors.main : colors.main2} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $paintView: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.main2,
  padding:20,
  marginBottom:50,
  borderRadius: 50,
  width: 60,
  height: 60,
}
const $paintIcon: ViewStyle = {
  // backgroundColor: colors.main2,
  // padding:20,
  // marginBottom:40,
  // borderRadius: 50,
  // width: 60,
  // height: 60,
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
