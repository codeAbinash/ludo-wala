import Colors from '@utils/colors'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import LinearGradient, {type LinearGradientProps} from 'react-native-linear-gradient'
import Svg, {Defs, RadialGradient, Rect, Stop} from 'react-native-svg'
import type {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils'

type CustomLinearGradientProps = Omit<LinearGradientProps, 'colors'> & {
  colors?: Array<string>
}
export default function Gradient({children, ...props}: CustomLinearGradientProps) {
  const col = props.colors || [Colors.g1, Colors.g2]
  return (
    <LinearGradient
      // start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}}
      {...props}
      colors={col}>
      {children}
    </LinearGradient>
  )
}

type RadialProps = ViewProps & {
  Col?: string[]
}
export function Radial({children, Col, ...props}: RadialProps) {
  return (
    <View style={{flex: 1}} {...props}>
      <Svg height='100%' width='100%' style={StyleSheet.absoluteFillObject}>
        <Defs>
          <RadialGradient id='grad' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
            <Stop offset='0' stopColor={Col ? Col[0] : Colors.g2} />
            <Stop offset='1' stopColor={Col ? Col[1] : Colors.g1} />
          </RadialGradient>
        </Defs>
        <Rect width='100%' height='100%' fill='url(#grad)' />
      </Svg>
      {children}
    </View>
  )
}
