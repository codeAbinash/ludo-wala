import {MediumS} from '@/fonts'
import React from 'react'
import {type TextInputProps, TextInput} from 'react-native'

type InputProps = TextInputProps & {
  placeholder: string
}

export default function Input({style, ...props}: InputProps) {
  return (
    <TextInput
      className='w-full rounded-2xl bg-primary p-3.5 px-5 text-base text-white'
      placeholderTextColor={'#ffffff99'}
      style={[MediumS, style]}
      {...props}
    />
  )
}
