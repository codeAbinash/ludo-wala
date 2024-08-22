import {Medium, SemiBold} from '@/fonts'
import Colors from '@utils/colors'
import React from 'react'
import {TouchableOpacity, View, type TouchableOpacityProps} from 'react-native'
import Gradient from './Gradient'
import LottieView from 'lottie-react-native'

export function Button() {
  return (
    <View className='bg-red-500'>
      <Medium>Hello World</Medium>
    </View>
  )
}

type GradientButtonProps = TouchableOpacityProps & {
  title?: string
}
export function GradientButton({title, children, onPress, ...props}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Gradient className={'w-full items-center justify-center rounded-full border border-bb p-3 px-4'} colors={[Colors.b1, Colors.b2]} {...props}>
        {title && <SemiBold className='px-10 text-lg text-black'>{title}</SemiBold>}
        {children}
      </Gradient>
    </TouchableOpacity>
  )
}

export function LoadingButton() {
  return (
    <Gradient className={'w-full items-center justify-center rounded-full border border-bb'} colors={[Colors.b1, Colors.b2]}>
      <LottieView source={require('@assets/animations/loader.json')} autoPlay loop style={{width: 150, height: 47}} />
    </Gradient>
  )
}
