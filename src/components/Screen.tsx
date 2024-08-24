import React from 'react'
import {type ScrollViewProps} from 'react-native'
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer'
import {PaddingBottom, PaddingTop} from './SafePadding'

export default function Screen({children, ...props}: ScrollViewProps) {
  return (
    <KeyboardAvoidingContainer className='bg-primary' contentContainerStyle={{flex: 1}} {...props}>
      {children}
    </KeyboardAvoidingContainer>
  )
}
