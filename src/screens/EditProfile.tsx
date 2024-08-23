import { Medium, MediumS, SemiBold } from '@/fonts'
import { userStore } from '@/zustand/userStore'
import { PaintBrush01SolidIcon } from '@assets/icons/icons'
import BackHeader from '@components/BackHeader'
import { FullGradientButton } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import Screen from '@components/Screen'
import type { NavProp } from '@utils/types'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

export default function EditProfile({navigation}: NavProp) {
  const user = userStore((state) => state.user)
  return (
    <>
      <View className='bg-primary'>
        <BackHeader navigation={navigation} title='Profile' />
      </View>
      <Screen className='flex-1 bg-primary px-5'>
        <View className='flex-row items-center' style={{gap: 20}}>
          <View className='flex-row'>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg',
              }}
              className='h-20 w-20 rounded-full bg-white'
            />
          </View>
          <View>
            <SemiBold className='text-xl'>Hi there {user?.data?.fname}</SemiBold>
            <View className='mt-2 flex-row items-center' style={{gap: 10}}>
              <PaintBrush01SolidIcon className='text-white/80' height={18} width={18} />
              <Medium className='text-base text-white/80'>Edit Profile</Medium>
            </View>
          </View>
        </View>
        <View className='mt-7' style={{gap: 15}}>
          <InputComponent label='First Name' value={user?.data?.fname} />
          <InputComponent label='Last Name' value={user?.data?.lname} />
          <InputComponent label='Email' value={user?.data?.email} />
          <InputComponent label='Phone Number' value={user?.data?.mobileNumber} />
        </View>
        <FullGradientButton title='Save' className='mt-10' onPress={() => {}} />
        <View className='h-10' />
        <PaddingBottom />
      </Screen>
    </>
  )
}

function InputComponent({label, value, onChangeText, placeholder, secureTextEntry}: any) {
  return (
    <View className='rounded-2xl border border-border bg-g1 p-4 py-2 pb-1'>
      <Medium className='text-border'>{label}</Medium>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={MediumS}
        className='py-1 text-base text-white/80'
      />
    </View>
  )
}
