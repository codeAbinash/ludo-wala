import React from 'react'
import {type ScrollViewProps} from 'react-native'
import {Radial} from './Gradient'
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer'

type ScreenProps = ScrollViewProps & {
  Col?: string[]
}

export default function Screen({children, Col, ...props}: ScreenProps) {
  return (
    <KeyboardAvoidingContainer className='bg-primary' contentContainerStyle={{flex: 1}} {...props}>
      <Radial Col={Col}>{children}</Radial>
    </KeyboardAvoidingContainer>
  )
}
