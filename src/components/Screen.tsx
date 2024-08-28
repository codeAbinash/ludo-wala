import React from 'react'
import {type ScrollViewProps} from 'react-native'
import {Radial} from './Gradient'
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer'
import Colors from '@utils/colors'

type ScreenProps = ScrollViewProps & {
  Col?: string[]
}

export default function Screen({children, Col, ...props}: ScreenProps) {
  return (
    <KeyboardAvoidingContainer contentContainerStyle={{flex: 1}} {...props}>
      <Radial Col={Col || [Colors.g2, Colors.g1]}>{children}</Radial>
    </KeyboardAvoidingContainer>
  )
}
