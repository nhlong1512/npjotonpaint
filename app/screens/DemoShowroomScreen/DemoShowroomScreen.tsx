/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, RouteProp, useRoute } from "@react-navigation/native"
import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  LayoutRectangle,
  Modal,
  Platform,
  SectionList,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

interface Option {
  label: string
  value: string
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

    const [showDropdown1, setShowDropdown1] = useState(false)
    const [appLayout1, setAppLayout1] = useState<LayoutRectangle>()
    const handleAppLayout1 = (event: LayoutRectangle) => {
      setAppLayout1(event)
    }
    const handleAppPress1 = () => {
      setShowDropdown1(true)
      console.log("App pressed", showDropdown1)
    }
    const handleOptionSelect1 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown1(false)
    }

    const [showDropdown5, setShowDropdown5] = useState(false)
    const [appLayout5, setAppLayout5] = useState<LayoutRectangle>()
    const handleAppLayout5 = (event: LayoutRectangle) => {
      setAppLayout5(event)
    }
    const handleAppPress5 = () => {
      setShowDropdown5(true)
      console.log("App pressed", showDropdown5)
    }
    const handleOptionSelect5 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown5(false)
    }

    const [showDropdown9, setShowDropdown9] = useState(false)
    const [appLayout9, setAppLayout9] = useState<LayoutRectangle>()
    const handleAppLayout9 = (event: LayoutRectangle) => {
      setAppLayout9(event)
    }
    const handleAppPress9 = () => {
      setShowDropdown9(true)
      console.log("App pressed", showDropdown9)
    }
    const handleOptionSelect9 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown9(false)
    }

    const [showDropdown13, setShowDropdown13] = useState(false)
    const [appLayout13, setAppLayout13] = useState<LayoutRectangle>()
    const handleAppLayout13 = (event: LayoutRectangle) => {
      setAppLayout13(event)
    }
    const handleAppPress13 = () => {
      setShowDropdown13(true)
      console.log("App pressed", showDropdown13)
    }
    const handleOptionSelect13 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown13(false)
    }

    const [showDropdown2, setShowDropdown2] = useState(false)
    const [appLayout2, setAppLayout2] = useState<LayoutRectangle | null>(null)
    const handleAppLayout2 = (event: LayoutRectangle) => {
      setAppLayout2(event)
    }
    const handleAppPress2 = () => {
      setShowDropdown2(true)
      console.log("App pressed", showDropdown2)
    }
    const handleOptionSelect2 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown2(false)
    }

    const [showDropdown6, setShowDropdown6] = useState(false)
    const [appLayout6, setAppLayout6] = useState<LayoutRectangle | null>(null)
    const handleAppLayout6 = (event: LayoutRectangle) => {
      setAppLayout6(event)
    }
    const handleAppPress6 = () => {
      setShowDropdown6(true)
      console.log("App pressed", showDropdown6)
    }
    const handleOptionSelect6 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown6(false)
    }

    const [showDropdown10, setShowDropdown10] = useState(false)
    const [appLayout10, setAppLayout10] = useState<LayoutRectangle | null>(null)
    const handleAppLayout10 = (event: LayoutRectangle) => {
      setAppLayout10(event)
    }
    const handleAppPress10 = () => {
      setShowDropdown10(true)
      console.log("App pressed", showDropdown10)
    }
    const handleOptionSelect10 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown10(false)
    }

    const [showDropdown14, setShowDropdown14] = useState(false)
    const [appLayout14, setAppLayout14] = useState<LayoutRectangle | null>(null)
    const handleAppLayout14 = (event: LayoutRectangle) => {
      setAppLayout14(event)
    }
    const handleAppPress14 = () => {
      setShowDropdown14(true)
      console.log("App pressed", showDropdown14)
    }
    const handleOptionSelect14 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown14(false)
    }

    const [showDropdown3, setShowDropdown3] = useState(false)
    const [appLayout3, setAppLayout3] = useState<LayoutRectangle | null>(null)
    const handleAppLayout3 = (event: LayoutRectangle) => {
      setAppLayout3(event)
    }
    const handleAppPress3 = () => {
      setShowDropdown3(true)
      console.log("App pressed", showDropdown3)
    }
    const handleOptionSelect3 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown3(false)
    }

    const [showDropdown7, setShowDropdown7] = useState(false)
    const [appLayout7, setAppLayout7] = useState<LayoutRectangle | null>(null)
    const handleAppLayout7 = (event: LayoutRectangle) => {
      setAppLayout7(event)
    }
    const handleAppPress7 = () => {
      setShowDropdown7(true)
      console.log("App pressed", showDropdown7)
    }
    const handleOptionSelect7 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown7(false)
    }

    const [showDropdown11, setShowDropdown11] = useState(false)
    const [appLayout11, setAppLayout11] = useState<LayoutRectangle | null>(null)
    const handleAppLayout11 = (event: LayoutRectangle) => {
      setAppLayout11(event)
    }
    const handleAppPress11 = () => {
      setShowDropdown11(true)
      console.log("App pressed", showDropdown11)
    }
    const handleOptionSelect11 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown11(false)
    }

    const [showDropdown15, setShowDropdown15] = useState(false)
    const [appLayout15, setAppLayout15] = useState<LayoutRectangle | null>(null)
    const handleAppLayout15 = (event: LayoutRectangle) => {
      setAppLayout15(event)
    }
    const handleAppPress15 = () => {
      setShowDropdown15(true)
      console.log("App pressed", showDropdown15)
    }
    const handleOptionSelect15 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown15(false)
    }

    const [showDropdown4, setShowDropdown4] = useState(false)
    const [appLayout4, setAppLayout4] = useState<LayoutRectangle | null>(null)
    const handleAppLayout4 = (event: LayoutRectangle) => {
      setAppLayout4(event)
    }
    const handleAppPress4 = () => {
      setShowDropdown4(true)
      console.log("App pressed", showDropdown4)
    }
    const handleOptionSelect4 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown4(false)
    }

    const [showDropdown8, setShowDropdown8] = useState(false)
    const [appLayout8, setAppLayout8] = useState<LayoutRectangle | null>(null)
    const handleAppLayout8 = (event: LayoutRectangle) => {
      setAppLayout8(event)
    }
    const handleAppPress8 = () => {
      setShowDropdown8(true)
      console.log("App pressed", showDropdown8)
    }
    const handleOptionSelect8 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown8(false)
    }

    const [showDropdown12, setShowDropdown12] = useState(false)
    const [appLayout12, setAppLayout12] = useState<LayoutRectangle | null>(null)
    const handleAppLayout12 = (event: LayoutRectangle) => {
      setAppLayout12(event)
    }
    const handleAppPress12 = () => {
      setShowDropdown12(true)
      console.log("App pressed", showDropdown12)
    }
    const handleOptionSelect12 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown12(false)
    }

    const [showDropdown16, setShowDropdown16] = useState(false)
    const [appLayout16, setAppLayout16] = useState<LayoutRectangle | null>(null)
    const handleAppLayout16 = (event: LayoutRectangle) => {
      setAppLayout16(event)
    }
    const handleAppPress16 = () => {
      setShowDropdown16(true)
      console.log("App pressed", showDropdown16)
    }
    const handleOptionSelect16 = (option: Option) => {
      console.log("Selected option:", option.value)
      setShowDropdown16(false)
    }

    const options: Option[] = [
      { label: "Remove App", value: "delete" },
      { label: "Upgrade", value: "update" },
      { label: "Detail", value: "detail" },
    ]

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
          <View style={$phoneView}>
            <Icon icon="phoneIcon" color="white" size={36} />
          </View>

          <TouchableOpacity style={$listItems}>
            <View style={$rowItems}>
              <TouchableWithoutFeedback onPress={handleAppPress1}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout1(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="homeIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Trang chủ</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown1} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout1 ? appLayout1.y + appLayout1.height : 0,
                    left: appLayout1 ? appLayout1.width * 1.15 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown1(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect1(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress2}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout2(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="calculatorIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Tính toán sơn</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown2} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout2 ? appLayout2.y + appLayout2.height : 0,
                    left: appLayout2 ? appLayout2.width + appLayout2.x : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown2(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect2(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress3}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout3(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="folderIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Danh mục màu</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown3} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout3 ? appLayout3.y + appLayout3.height * 0.9 : 0,
                    left: appLayout3 ? appLayout3.width : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown3(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect3(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress4}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout4(event.nativeEvent.layout)}
                >
                  <View style={$itemActive}>
                    <Icon icon="threedIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Phối màu 3D</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown4} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout4 ? appLayout4.y + appLayout4.height : 0,
                    left: appLayout4 ? appLayout4.x - appLayout4.width*1.7 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown4(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect4(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={$rowItems}>
              <TouchableWithoutFeedback onPress={handleAppPress5}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout5(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="homeIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Tìm nhanh màu yêu thích</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown5} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout5 ? appLayout5.y + appLayout5.height * 2.2 : 0,
                    left: appLayout5 ? appLayout5.width*1.15 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown5(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect5(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress6}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout6(event.nativeEvent.layout)}
                >
                  <View style={$itemActive}>
                    <Icon icon="calculatorIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Kiểm tra mã SP</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown6} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout6 ? appLayout6.y + appLayout6.height * 2.2 : 0,
                    left: appLayout6 ? appLayout6.width + appLayout6.x : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown6(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect6(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress7}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout7(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="folderIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Mua hàng Online</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown7} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout7 ? appLayout7.y + appLayout7.height * 1.9 : 0,
                    left: appLayout7 ? appLayout7.width : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown7(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect7(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress8}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout8(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="threedIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Về JotonPaint</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown8} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout8 ? appLayout8.y + appLayout8.height * 2.2 : 0,
                    left: appLayout8 ? appLayout8.x - appLayout8.width*1.7 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown8(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect8(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={$rowItems}>
              <TouchableWithoutFeedback onPress={handleAppPress9}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout9(event.nativeEvent.layout)}
                >
                  <View style={$itemActive}>
                    <Icon icon="homeIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Tìm đại lý</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown9} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout9 ? appLayout9.y + appLayout9.height * 3.4 : 0,
                    left: appLayout9 ? appLayout9.width * 1.15 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown1(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect9(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress10}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout10(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="calculatorIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Dịch vụ</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown10} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout10 ? appLayout10.y + appLayout10.height * 3.4 : 0,
                    left: appLayout10 ? appLayout10.width + appLayout10.x : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown10(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect10(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress11}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout11(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="folderIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Thẻ thành viên</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown11} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout11 ? appLayout11.y + appLayout11.height * 2.9 : 0,
                    left: appLayout11 ? appLayout11.width : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown11(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect11(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress12}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout12(event.nativeEvent.layout)}
                >
                  <View style={$itemActive}>
                    <Icon icon="threedIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Tài khoản</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown12} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout12 ? appLayout12.y + appLayout12.height * 3.4 : 0,
                    left: appLayout12 ? appLayout12.x - appLayout12.width*1.7 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown12(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect12(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={$rowItems}>
              <TouchableWithoutFeedback onPress={handleAppPress13}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout13(event.nativeEvent.layout)}
                >
                  <View style={$itemActive}>
                    <Icon icon="homeIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Đổi quà</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown13} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout13 ? appLayout13.height * 4.6 : 0,
                    left: appLayout13 ? appLayout13.width * 1.15 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown13(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect13(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress14}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout14(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="calculatorIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Tìm khuyến mãi</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown14} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout14 ? appLayout14.y + appLayout14.height * 4.6 : 0,
                    left: appLayout14 ? appLayout14.width + appLayout14.x : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown14(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect14(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress15}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout15(event.nativeEvent.layout)}
                >
                  <View style={$itemActive}>
                    <Icon icon="folderIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Quét mã tích điểm</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown15} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout15 ? appLayout15.y + appLayout15.height * 4.0 : 0,
                    left: appLayout15 ? appLayout15.width : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown15(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect15(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>

              <TouchableWithoutFeedback onPress={handleAppPress16}>
                <View
                  style={$itemWrap}
                  onLayout={(event) => handleAppLayout16(event.nativeEvent.layout)}
                >
                  <View style={$item}>
                    <Icon icon="threedIcon" size={40} />
                  </View>
                  <Text style={$itemText}>Sản phẩm</Text>
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={showDropdown16} transparent>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: appLayout16 ? appLayout16.y + appLayout16.height * 4.6 : 0,
                    left: appLayout16 ? appLayout16.x - appLayout16.width*1.7 : 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 10,
                  }}
                  onPress={() => setShowDropdown16(false)}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleOptionSelect16(option)}
                    >
                      <Text style={{ color: "white" }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              </Modal>
            </View>
            
          </TouchableOpacity>
        </Screen>
      </DrawerLayout>
    )
  }

const $listItems: ViewStyle = {
  flex: 1,
}

const $phoneView: ViewStyle = {
  position: "absolute",
  bottom: 20,
  right: 10,
  padding: 10,
  borderRadius: 50,
  backgroundColor: "#4527c0",
  zIndex: 2,
}

const $rowItems: ViewStyle = {
  flexDirection: "row",
  gap: 20,
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingHorizontal: spacing.sm,
}

const $itemWrap: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 4,
}

const $item: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#fff",
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 10,
  justifyContent: "center",
  width: "100%",
  paddingTop: 15,
  paddingBottom: 15,
}

const $itemActive: ViewStyle = {
  backgroundColor: "#fef19a",
  alignItems: "center",
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 10,
  justifyContent: "center",
  width: "100%",
  paddingTop: 15,
  paddingBottom: 15,
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
