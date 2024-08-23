import Images from '@assets/images/images'
import {GradientButton, LoadingButton} from '@components/Button'
import Gradient from '@components/Gradient'
import Input from '@components/Input'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import {PaddingTop} from '@components/SafePadding'
import {updateProfile_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, Image, View} from 'react-native'

export default function EnterName({navigation}: NavProp) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [referCode, setReferCode] = React.useState('')

  const {mutate, isPending} = useMutation({
    mutationFn: () => updateProfile_f({fname: firstName, lname: lastName, referCode}),
    onSuccess: (data) => {
      console.log(data)
      if (!data.status) return Alert.alert('Error', data.message || 'Error occurred')
      navigation.replace('Home')
    },
  })

  function update() {
    if (!(firstName && lastName)) {
      return Alert.alert('Error', 'First name and last name are required')
    }

    if (referCode.length !== 9 && referCode.length !== 0) {
      return Alert.alert('Error', 'Refer code must be 9 characters long')
    }

    mutate()
  }

  return (
    <KeyboardAvoidingContainer className='bg-primary'>
      <View className='h-screen flex-1 items-center justify-center px-5'>
        <PaddingTop />
        <Gradient
          className='w-full items-center justify-center rounded-2xl border border-border px-5 py-10 pt-7'
          style={{gap: 30}}
          colors={[Colors.g1, Colors.g2]}>
          <Image source={Images.logo} className='h-24 w-24' />
          <View style={{gap: 15}} className='w-full'>
            <Input placeholder='First Name' value={firstName} onChangeText={setFirstName} />
            <Input placeholder='Last Name' value={lastName} onChangeText={setLastName} />
            <Input placeholder='Refer Code' value={referCode} onChangeText={setReferCode} maxLength={9} />
          </View>
          <View>{isPending ? <LoadingButton /> : <GradientButton title='Next' onPress={update} />}</View>
        </Gradient>
      </View>
    </KeyboardAvoidingContainer>
  )
}
