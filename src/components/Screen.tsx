import React from 'react'
import { type ScrollViewProps } from 'react-native'
import { Radial } from './Gradient'
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer'

export default function Screen({children, ...props}: ScrollViewProps) {
  return (
    <KeyboardAvoidingContainer className='bg-primary' contentContainerStyle={{flex: 1}} {...props}>
      <Radial>{children}</Radial>
    </KeyboardAvoidingContainer>
  )
}
