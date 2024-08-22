import {PaddingBottom} from '@components/SafePadding'
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import HomeScreen from './HomeScreen'

import {Home03Icon, UserAdd02Icon, UserIcon, Wallet01Icon} from '@assets/icons/icons'
import Gradient from '@components/Gradient'
import Refer from './Refer'

function HomeIcon(props: {focused: boolean; color: string; size: number}) {
  return <Home03Icon {...props} height={props.size} width={props.size} className={props.focused ? 'text-b1' : 'text-white opacity-80'} />
}
function ReferIcon(props: {focused: boolean; color: string; size: number}) {
  return <UserAdd02Icon {...props} height={props.size} width={props.size} className={props.focused ? 'text-b1' : 'text-white opacity-80'} />
}
function WalletIcon(props: {focused: boolean; color: string; size: number}) {
  return <Wallet01Icon {...props} height={props.size} width={props.size} className={props.focused ? 'text-b1' : 'text-white opacity-80'} />
}
function UserIconN(props: {focused: boolean; color: string; size: number}) {
  return <UserIcon {...props} height={props.size} width={props.size} className={props.focused ? 'text-b1' : 'text-white opacity-80'} />
}

// function GameZoneIcon(props: {focused: boolean; color: string; size: number}) {
//   return props.focused ? (
//     <GameZoneIconSvg {...props} height={props.size} width={props.size} />
//   ) : (
//     <GameZoneIconSvgOutline {...props} height={props.size} width={props.size} />
//   )
// }

// function ProfileIcon(props: { focused: boolean; color: string; size: number }) {
//   return props.focused ? (
//     <ProfileIconSvg {...props} height={props.size} width={props.size} />
//   ) : (
//     <ProfileIconSvgOutline {...props} height={props.size} width={props.size} />
//   )
// }

// function WalletIcon(props: {focused: boolean; color: string; size: number}) {
//   return props.focused ? (
//     <WalletIconSvg {...props} height={props.size} width={props.size} />
//   ) : (
//     <WalletIconSvgOutline {...props} height={props.size} width={props.size} />
//   )
// }

// function ReferIcon(props: {focused: boolean; color: string; size: number}) {
//   return props.focused ? (
//     <ReferIconSvg {...props} height={props.size} width={props.size} />
//   ) : (
//     <ReferIconSvgOutline {...props} height={props.size} width={props.size} />
//   )
// }

const Tab = createBottomTabNavigator()

function BottomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View className='bg-primary px-5 pb-2'>
      <Gradient style={{flexDirection: 'row', paddingHorizontal: 10}} className='rounded-full border border-border'>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key]
          // const label =
          //   options.tabBarLabel !== undefined
          //     ? options.tabBarLabel
          //     : options.title !== undefined
          //       ? options.title
          //       : route.name
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            <>
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.6}
                accessibilityRole='button'
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className='flex items-center justify-center p-1'
                style={{flex: 1, paddingTop: 17, paddingBottom: 20}}>
                {options.tabBarIcon && options.tabBarIcon({focused: isFocused, color: 'black', size: 24})}
                {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label as ReactNode}</Text> */}
                <View className={`mt-1 h-1 w-1 rounded-full ${isFocused ? 'bg-b1' : 'bg-transparent'}`} />
              </TouchableOpacity>
            </>
          )
        })}
      </Gradient>
      <PaddingBottom />
    </View>
  )
}

const Home = () => {
  return (
    <>
      <Tab.Navigator tabBar={BottomTabBar}>
        <Tab.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            tabBarLabel: 'HomeScreen',
            headerShown: false,
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name='Refer'
          component={Refer}
          options={{
            tabBarLabel: 'Refer',
            headerShown: false,
            tabBarIcon: ReferIcon,
          }}
        />
        <Tab.Screen
          name='Wallet'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Wallet',
            headerShown: false,
            tabBarIcon: WalletIcon,
          }}
        />
        <Tab.Screen
          name='User'
          component={UserIcon}
          options={{
            tabBarLabel: 'User',
            headerShown: false,
            tabBarIcon: UserIconN,
          }}
        />
        {/* <Tab.Screen
          name='Refer'
          component={Refer}
          options={{
            tabBarLabel: 'Refer',
            headerShown: false,
            tabBarIcon: ReferIcon,
          }}
        />
        <Tab.Screen
          name='GameZone'
          component={GameZone}
          options={{
            tabBarLabel: 'GameZone',
            headerShown: false,
            tabBarIcon: GameZoneIcon,
          }}
        /> */}
      </Tab.Navigator>
    </>
  )
}

// function WrappedEditProfile({ navigation }: { navigation: StackNav }) {
//   return (
//     <EditProfile
//       navigation={navigation}
//       route={{
//         key: 'EditProfile',
//         name: 'EditProfile',
//         params: {
//           isMigration: false,
//           isShowHeader: false,
//         },
//       }}
//     />
//   )
// }

export default Home
