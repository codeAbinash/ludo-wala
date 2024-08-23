import {Bold, Medium, SemiBold} from '@/fonts'
import Colors from '@utils/colors'
import LottieView from 'lottie-react-native'
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
  title?: string
  colors?: string[]
}
export function GradientButton({title, children, onPress, ...props}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={props.activeOpacity ?? 0.7}>
      <Gradient className={'w-full items-center justify-center rounded-2xl border border-bb p-2.5 px-4'} colors={[Colors.b1, Colors.b2]} {...props}>
        {title && <SemiBold className='text-black'>{title}</SemiBold>}
        {children}
      </Gradient>
    </TouchableOpacity>
  )
}

export function FullGradientButton({title, children, onPress, colors, ...props}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={props.activeOpacity ?? 0.7}>
      <Gradient
        className={'w-full items-center justify-center rounded-2xl border border-bb p-3 px-4'}
        colors={colors || [Colors.b1, Colors.b2]}
        {...props}>
        {title && <Bold className='text-base text-black'>{title}</Bold>}
        {children}
      </Gradient>
    </TouchableOpacity>
  )
}

export function OutlineButton({title, children, onPress, ...props}: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={props.activeOpacity ?? 0.7}>
      <View className='w-full items-center justify-center rounded-2xl border border-b1 p-2' {...props}>
        {title && <SemiBold className='text-b1'>{title}</SemiBold>}
        {children}
      </View>
    </TouchableOpacity>
  )
}

type LoadingButtonProps = TouchableOpacityProps
export function LoadingButton({...props}: LoadingButtonProps) {
  return (
    <Gradient className={'w-full items-center justify-center rounded-full border border-bb'} colors={[Colors.b1, Colors.b2]} {...props}>
      <LottieView source={require('@assets/animations/loader.json')} autoPlay loop style={{width: 140, height: 45}} />
    </Gradient>
  )
}
