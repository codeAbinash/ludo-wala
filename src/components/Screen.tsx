import Colors from '@utils/colors'
import React from 'react'
import {type ScrollViewProps} from 'react-native'
import {Radial} from './Gradient'
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer'

type WrapProps = ScrollViewProps & {
  Col?: string[]
}

export default function Wrap({children, Col, ...props}: WrapProps) {
  return (
    <KeyboardAvoidingContainer contentContainerStyle={{flex: 1}} {...props}>
      <Radial Col={Col || [Colors.g2, Colors.g1]}>{children}</Radial>
    </KeyboardAvoidingContainer>
  )
}
