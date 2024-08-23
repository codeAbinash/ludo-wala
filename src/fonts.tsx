import React from 'react'
import {Text, type TextProps} from 'react-native'

export const RegularS = {
  fontFamily: 'Gellix-Regular',
}
export const MediumS = {
  fontFamily: 'Gellix-Medium',
}
export const SemiBoldS = {
  fontFamily: 'Gellix-SemiBold',
}
export const BoldS = {
  fontFamily: 'Gellix-Bold',
}
export const LightS = {
  fontFamily: 'Gellix-Light',
}
export const BangersS = {
  fontFamily: 'Bangers-Regular',
}

export function Medium({children, style, ...props}: TextProps) {
  return (
    <Text style={[MediumS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Regular({children, style, ...props}: TextProps) {
  return (
    <Text style={[RegularS, style]} {...props}>
      {children}
    </Text>
  )
}

export function SemiBold({children, style, ...props}: TextProps) {
  return (
    <Text style={[SemiBoldS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Bold({children, style, ...props}: TextProps) {
  return (
    <Text style={[BoldS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Light({children, style, ...props}: TextProps) {
  return (
    <Text style={[LightS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Bangers({children, style, ...props}: TextProps) {
  return (
    <Text style={[BangersS, style]} {...props}>
      {children}
    </Text>
  )
}
