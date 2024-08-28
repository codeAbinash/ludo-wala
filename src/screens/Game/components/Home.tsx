import {Radial} from '@components/Gradient'
import React, {useEffect} from 'react'
import {type ViewProps, View} from 'react-native'
import {w} from './MidBox'
import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated'

type HomeProps = {
  Col?: string[]
  turn?: number
  no?: number
} & ViewProps
function HomeBox({Col, style, turn, no, ...props}: HomeProps) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = turn === no ? withRepeat(withTiming(0.5, {duration: 500}), -1, true) : 1
  }, [turn, no, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      className='aspect-square justify-center overflow-hidden'
      {...props}
      style={[
        {
          width: w * 0.4,
          height: w * 0.4,
          transform: [{scale: 0.965}],
          borderRadius: 20,
        },
        style,
        animatedStyle,
      ]}>
      <Radial className='flex aspect-square h-full w-full items-center justify-center' Col={Col}>
        <View className='h-1/2 w-1/2 rounded-full bg-white' />
      </Radial>
    </Animated.View>
  )
}

export default React.memo(HomeBox)
