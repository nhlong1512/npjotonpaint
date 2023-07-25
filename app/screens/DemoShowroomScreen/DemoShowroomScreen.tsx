/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, RouteProp, useRoute } from "@react-navigation/native"
import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  SectionList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { Icon, ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { DemoTabParamList, DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()

  return (
    <View>
      <Link to={`/showroom/${sectionSlug}`} style={$menuContainer}>
        <Text preset="bold">{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link key={`section${sectionIndex}-${u}`} to={`/showroom/${sectionSlug}/${itemSlug}`}>
            <Text>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => {
  return (
    <View>
      <Text onPress={() => handleScroll(sectionIndex)} preset="bold" style={$menuContainer}>
        {item.name}
      </Text>
      {item.useCases.map((u, index) => (
        <ListItem
          key={`section${sectionIndex}-${u}`}
          onPress={() => handleScroll(sectionIndex, index + 1)}
          text={u}
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />
      ))}
    </View>
  )
}

const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    const [open, setOpen] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const drawerRef = useRef<DrawerLayout>()
    const listRef = useRef<SectionList>()
    const menuRef = useRef<FlatList>()
    const progress = useSharedValue(0)
    const route = useRoute<RouteProp<DemoTabParamList, "DemoShowroom">>()
    const params = route.params

    // handle Web links
    React.useEffect(() => {
      if (route.params) {
        const demoValues = Object.values(Demos)
        const findSectionIndex = demoValues.findIndex(
          (x) => x.name.toLowerCase() === params.queryIndex,
        )
        let findItemIndex = 0
        if (params.itemIndex) {
          try {
            findItemIndex =
              demoValues[findSectionIndex].data.findIndex(
                (u) => slugify(u.props.name) === params.itemIndex,
              ) + 1
          } catch (err) {
            console.error(err)
          }
        }
        handleScroll(findSectionIndex, findItemIndex)
      }
    }, [route])

    const toggleDrawer = () => {
      if (!open) {
        setOpen(true)
        drawerRef.current?.openDrawer({ speed: 2 })
      } else {
        setOpen(false)
        drawerRef.current?.closeDrawer({ speed: 2 })
      }
    }

    const handleScroll = (sectionIndex: number, itemIndex = 0) => {
      listRef.current.scrollToLocation({
        animated: true,
        itemIndex,
        sectionIndex,
      })
      toggleDrawer()
    }

    const scrollToIndexFailed = (info: {
      index: number
      highestMeasuredFrameIndex: number
      averageItemLength: number
    }) => {
      listRef.current?.getScrollResponder()?.scrollToEnd()
      timeout.current = setTimeout(
        () =>
          listRef.current?.scrollToLocation({
            animated: true,
            itemIndex: info.index,
            sectionIndex: 0,
          }),
        50,
      )
    }

    useEffect(() => {
      return () => timeout.current && clearTimeout(timeout.current)
    }, [])

    const $drawerInsets = useSafeAreaInsetsStyle(["top"])

    return (
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={Platform.select({ default: 326, web: Dimensions.get("window").width * 0.3 })}
        drawerType={"slide"}
        drawerPosition={isRTL ? "right" : "left"}
        overlayColor={open ? colors.palette.overlay20 : "transparent"}
        onDrawerSlide={(drawerProgress) => {
          progress.value = open ? 1 - drawerProgress : drawerProgress
        }}
        onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
          if (newState === "Settling") {
            progress.value = withTiming(drawerWillShow ? 1 : 0, {
              duration: 250,
            })
            setOpen(drawerWillShow)
          }
        }}
        renderNavigationView={() => (
          <View style={[$drawer, $drawerInsets]}>
            <View style={$logoContainer}>
              <Image source={logo} style={$logoImage} />
            </View>

            <FlatList<{ name: string; useCases: string[] }>
              ref={menuRef}
              contentContainerStyle={$flatListContentContainer}
              data={Object.values(Demos).map((d) => ({
                name: d.name,
                useCases: d.data.map((u) => u.props.name),
              }))}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index: sectionIndex }) => (
                <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
              )}
            />
          </View>
        )}
      >
        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
          <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />

          <View style={$heading}>
            <Text preset="subheading" text="Menu" />
          </View>

          <View style={$listItems}>
            <View style={$rowItems}>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="homeIcon" size={40} />
                </View>
                <Text style={$itemText}>Trang chủ</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="calculatorIcon" size={40} />
                </View>
                <Text style={$itemText}>Tính toán sơn</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="folderIcon" size={40} />
                </View>
                <Text style={$itemText}>Danh mục màu</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="threedIcon" size={40} />
                </View>
                <Text style={$itemText}>Phối màu 3D</Text>
              </View>
            </View>
            <View style={$rowItems}>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="homeIcon" size={40} />
                </View>
                <Text style={$itemText}>Tìm nhanh màu yêu thích</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="calculatorIcon" size={40} />
                </View>
                <Text style={$itemText}>Kiểm tra mã SP</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="folderIcon" size={40} />
                </View>
                <Text style={$itemText}>Mua hàng online</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="threedIcon" size={40} />
                </View>
                <Text style={$itemText}>Về JotonPoint</Text>
              </View>
            </View>
            <View style={$rowItems}>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="homeIcon" size={40} />
                </View>
                <Text style={$itemText}>Tìm đại lý</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="calculatorIcon" size={40} />
                </View>
                <Text style={$itemText}>Dịch vụ</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="folderIcon" size={40} />
                </View>
                <Text style={$itemText}>Thẻ thành viên</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="threedIcon" size={40} />
                </View>
                <Text style={$itemText}>Tài khoản</Text>
              </View>
            </View>
            <View style={$rowItems}>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="homeIcon" size={40} />
                </View>
                <Text style={$itemText}>Đổi quà</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="calculatorIcon" size={40} />
                </View>
                <Text style={$itemText}>Tìm khuyến mãi</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="folderIcon" size={40} />
                </View>
                <Text style={$itemText}>Quét mã tích điểm</Text>
              </View>
              <View style={$itemWrap}>
                <View style={$item}>
                  <Icon icon="threedIcon" size={40} />
                </View>
                <Text style={$itemText}>Sản phẩm</Text>
              </View>
            </View>
          </View>
        </Screen>
      </DrawerLayout>
    )
  }

const $listItems: ViewStyle = {
  flex: 1,
}

const $rowItems: ViewStyle = {
  flexDirection: "row",
  gap: 10,
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingHorizontal: spacing.sm,
}

const $itemWrap: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.lg,
}

const $item: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#fff",
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 10,
  justifyContent: "center",
  width: "100%",
  paddingTop: 20,
  paddingBottom: 20,
}

const $itemText: TextStyle = {
  textAlign: "center",
  fontSize: 10,
  lineHeight: 12,
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.xl,
  paddingHorizontal: spacing.sm,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.md,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.xxl,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.xxl,
}

// @demo remove-file
