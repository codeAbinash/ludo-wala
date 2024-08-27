import {SemiBold} from '@/fonts'
import Images from '@assets/images/images'
import {Radial} from '@components/Gradient'
import {PaddingTop} from '@components/SafePadding'
import Screen from '@components/Screen'
import {Blue, Green, Red, Yellow} from '@utils/colors'
import React from 'react'
import {Image, View, type StyleProp, type ViewStyle} from 'react-native'
import type {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils'
import {MidBox, w} from './components/MidBox'

export default function Game() {
  return (
    <Screen Col={['#215962', '#0b1e22']}>
      <View className='flex-1 items-center justify-center'>
        <TopPart />
        <Board />
        <BottomPart />
      </View>
    </Screen>
  )
}

function TopPart() {
  return (
    <View className='flex-1'>
      <PaddingTop />
      <View className='mt-2'>
        <View className='flex-row items-center justify-between rounded-xl bg-white px-3 py-1 pl-1.5' style={{columnGap: 10}}>
          <Image source={Images.trophy} style={{width: 40, height: 40}} />
          <View>
            <SemiBold className='text-blue-600'>1st Prize</SemiBold>
            <SemiBold className='text-base text-blue-600'>₹1 Crore</SemiBold>
          </View>
        </View>
      </View>
    </View>
  )
}

function BottomPart() {
  return <View className='flex-1'></View>
}

function Board() {
  return (
    <View
      style={{
        height: w,
        width: w,
        borderRadius: 40,
      }}
      className='flex-row flex-wrap justify-between overflow-hidden'>
      <Home Col={Blue} />
      <VerticalBoxes />
      <Home Col={Red} />
      <HorizontalBoxes />
      <MidBox />
      <HorizontalBoxes />
      <Home Col={Yellow} />
      <VerticalBoxes />
      <Home Col={Green} />
    </View>
  )
}

function getPaddingStyle(n: number): StyleProp<ViewStyle> {
  if (n === 1)
    return {
      paddingRight: 1,
      paddingBottom: 1,
    }
  else if (n === 2)
    return {
      paddingLeft: 1,
      paddingBottom: 1,
    }
  else if (n === 3)
    return {
      paddingRight: 1,
      paddingTop: 1,
    }
  else if (n === 4)
    return {
      paddingLeft: 1,
      paddingTop: 1,
    }
}

type HomeProps = {
  Col?: string[]
} & ViewProps
function Home({Col, ...props}: HomeProps) {
  return (
    <View
      className='aspect-square justify-center overflow-hidden rounded-3xl'
      {...props}
      style={{
        width: w * 0.38,
        height: w * 0.38,
      }}>
      <Radial className='flex aspect-square h-full w-full items-center justify-center' Col={Col}>
        <View className='h-1/2 w-1/2 rounded-full bg-white' />
      </Radial>
    </View>
  )
}

function VerticalBoxes({...props}: ViewProps) {
  return (
    <View
      className='rounded-xl bg-white'
      style={{
        width: w * 0.24 - 8,
        height: w * 0.4 - 8,
      }}
      {...props}
    />
  )
}

function HorizontalBoxes({...props}: ViewProps) {
  return (
    <View
      className='w-2/5 rounded-xl bg-white'
      {...props}
      style={{
        height: w * 0.24 - 8,
        width: w * 0.4 - 8,
        marginTop: 4,
        marginBottom: 4,
      }}
    />
  )
}
