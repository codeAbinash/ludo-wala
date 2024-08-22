import {Bold, Medium, SemiBold} from '@/fonts'
import {ArrowUpDownIcon, Copy01Icon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {GradientButton, OutlineButton} from '@components/Button'
import Gradient from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Clipboard from '@react-native-clipboard/clipboard'
import React from 'react'
import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native'

export default function Refer() {
  return (
    <View className='flex-1 bg-g1'>
      <PaddingTop />
      <View className='flex-1 px-4'>
        <View className='flex-row justify-between pt-2'>
          <View>
            <Image source={Images.logo} className='h-14 w-14' />
          </View>
          <View className='flex-row items-center justify-between' style={{gap: 15}}>
            <GradientButton activeOpacity={1} className='rounded-full px-7'>
              <Bold className='text-base'>₹ 100</Bold>
            </GradientButton>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg',
              }}
              className='h-12 w-12 rounded-full bg-white'
            />
          </View>
        </View>
        <Gradient className='mt-5 flex-1 rounded-2xl border border-border p-5'>
          <Medium className='text-center text-lg text-white opacity-70'>Refer your friends and earn cash prizes!</Medium>
          <Image source={Images.refer} className='mx-auto h-60 w-60' />
          <SemiBold className='mt-7 text-center text-xl text-b1 underline underline-offset-1'>Referral Rank</SemiBold>
          <SemiBold className='mt-7 text-center text-4xl text-white'>Get 2%</SemiBold>
          <SemiBold className='mt-2 text-center text-lg text-white opacity-70'>of your referral’s every deposit</SemiBold>
          <SemiBold className='mt-7 text-center text-xl text-white'>Referral code</SemiBold>
          <View className='flex-row items-center justify-center'>
            <TouchableOpacity
              onPress={() => {
                // Copy
                Clipboard.setString('3C9PX788')
                ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
              }}
              activeOpacity={0.7}
              style={{
                borderWidth: 1,
                borderColor: '#ffffff88',
                borderStyle: 'dashed',
              }}
              className='mt-5 flex-row items-center rounded-full py-3 pl-8 pr-6'>
              <Medium className='text-center text-base text-b1'>3C9PX788</Medium>
              <Copy01Icon className='ml-3 text-white opacity-80' height={18} width={18} />
            </TouchableOpacity>
          </View>
          <View className='mt-7 flex-row' style={{gap: 15}}>
            <OutlineButton className='rounded-full p-4'>
              <ArrowUpDownIcon className='text-b1' height={18} width={18} />
            </OutlineButton>
            <View className='flex-1'>
              <OutlineButton title='Leaderboard' className='p-4' />
            </View>
            <View className='flex-1'>
              <GradientButton className='p-4' title='Invite' />
            </View>
          </View>
        </Gradient>
        <PaddingBottom />
      </View>
    </View>
  )
}
