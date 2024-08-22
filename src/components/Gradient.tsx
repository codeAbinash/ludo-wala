import Colors from '@utils/colors'
import React from 'react'
import LinearGradient, {type LinearGradientProps} from 'react-native-linear-gradient'

type CustomLinearGradientProps = Omit<LinearGradientProps, 'colors'> & {
  colors?: Array<string>
}
export default function Gradient({children, ...props}: CustomLinearGradientProps) {
  const col = props.colors || [Colors.g1, Colors.b2]
  return (
    <LinearGradient
      // start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}}
      {...props}
      colors={col}>
      {children}
    </LinearGradient>
  )
}
