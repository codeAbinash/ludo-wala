import {Medium, SemiBold} from '@/fonts'
import Colors from '@utils/colors'
import React from 'react'
import {TouchableOpacity, View, type TouchableOpacityProps} from 'react-native'
import Gradient from './Gradient'

export function Button() {
  return (
    <View className='bg-red-500'>
      <Medium>Hello World</Medium>
    </View>
  )
}

type GradientButtonProps = TouchableOpacityProps & {
  title: string
  color: string
}
export function GradientButton({title, onPress, color, ...props}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Gradient
        {...props}
        className={`bg-${color} w-full items-center justify-center rounded-full border border-bb p-3 px-4`}
        colors={[Colors.b1, Colors.b2]}>
        <SemiBold className='px-10 text-lg text-black'>{title}</SemiBold>
      </Gradient>
    </TouchableOpacity>
  )
}
