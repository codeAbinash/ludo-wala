import {Medium, SemiBold} from '@/fonts'
import Images from '@assets/images/images'
import {FullGradientButton} from '@components/Button'
import {GradientYellow} from '@components/Gradient'
import Wrap from '@components/Screen'
import type {NavProp} from '@utils/types'
import {getPP} from '@utils/utils'
import React from 'react'
import {Image, View} from 'react-native'

export default function Win({navigation}: NavProp) {
  return (
    <Wrap>
      <View className='flex-1 items-center justify-center p-6' style={{gap: 20}}>
        <View>
          <Image className='mx-auto' source={Images.win} style={{height: 200, width: 200}} />
          <SemiBold className='text-center text-2xl text-b1'>You have win the game!</SemiBold>
        </View>
        <View className='w-full' style={{gap: 10}}>
          <Titlebar />
          <Row isGradient score={25} prize={17} />
          <Row score={35} prize={35} />
          <Row score={9} prize={4} />
          <Row score={7} prize={3} />
        </View>
        <View className='mt-10 w-full px-4'>
          <FullGradientButton
            title='Go To Home'
            onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}
          />
        </View>
      </View>
    </Wrap>
  )
}

function Titlebar() {
  return (
    <View className='w-full flex-row justify-between'>
      <View className='flex-row items-center justify-center'></View>
      <View className='flex-row items-center justify-center pr-3' style={{gap: 20}}>
        <Medium className='text-white'>Score</Medium>
        <Medium className='text-white'>Prize</Medium>
      </View>
    </View>
  )
}

function Row({isGradient, score, prize}: {isGradient?: boolean; score: number; prize: number}) {
  const Wrapper = isGradient ? GradientYellow : View
  return (
    <Wrapper className='w-full flex-row justify-between rounded-2xl border border-b1 p-2'>
      <View className='flex-row items-center justify-center' style={{gap: 12}}>
        <Image
          source={{
            uri: getPP('Abinash', 'Karmakar'),
          }}
          style={{height: 40, width: 40}}
        />
        <SemiBold className={`text-base ${isGradient ? 'text-black' : 'text-b1'}`}>Abinash Karmakar</SemiBold>
      </View>
      <View className='flex-row items-center justify-center pr-3' style={{gap: 20}}>
        <Medium className={`text-base ${isGradient ? 'text-black' : 'text-b1'}`}>{score}</Medium>
        <Medium className={`text-base ${isGradient ? 'text-black' : 'text-b1'}`}>₹ {prize}</Medium>
      </View>
    </Wrapper>
  )
}
