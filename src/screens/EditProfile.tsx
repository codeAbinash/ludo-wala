import {Medium, SemiBold, SemiBoldS} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {PaintBrush01SolidIcon} from '@assets/icons/icons'
import BackHeader from '@components/BackHeader'
import {FullGradientButton, LoadingButton} from '@components/Button'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import {PaddingBottom} from '@components/SafePadding'
import Screen from '@components/Screen'
import {get_user_f, updateProfile_f, type UpdateProfileInput} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import type {NavProp} from '@utils/types'
import React, {useEffect, useRef} from 'react'
import {Image, TextInput, ToastAndroid, TouchableOpacity, View, type TextInputProps} from 'react-native'

export default function EditProfile({navigation}: NavProp) {
  const user = userStore((state) => state.user)
  const setUser = userStore((state) => state.setUser)

  const [isEdit, setIsEdit] = React.useState(false)
  const [fname, setFname] = React.useState(user?.data?.fname || '')
  const [lname, setLname] = React.useState(user?.data?.lname || '')
  const [email, setEmail] = React.useState(user?.data?.email || '')

  const fnameInputRef = useRef<TextInput>(null)

  const {mutate, isPending, data} = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: () => {
      const d: UpdateProfileInput = {fname, lname}
      if (email) d.email = email
      return updateProfile_f(d)
    },
    onSuccess: (d) => {
      if (!d.status) return ToastAndroid.show(d.message, ToastAndroid.SHORT)
    },
  })

  const userMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: get_user_f,
    onSuccess: setUser,
  })

  function handleSave() {
    mutate()
  }

  // If update profile is done then fetch the user data again
  // and navigate back to the previous screen
  useEffect(() => {
    if (data) userMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  function handleEditProfile() {
    setIsEdit(true)
    setTimeout(() => {
      fnameInputRef.current?.focus()
    }, 100)
  }

  useEffect(() => {
    console.log(userMutation.data)
    if (userMutation.data) {
      setUser(userMutation.data)
      navigation.goBack()
    }
  }, [userMutation.data, navigation, setUser])

  return (
    <Screen>
      <View className='flex-1 bg-primary px-5'>
        <View>
          <BackHeader navigation={navigation} title='Profile' />
        </View>
        <KeyboardAvoidingContainer>
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
              <SemiBold className='text-xl text-white'>Hi there {user?.data?.fname}</SemiBold>
              <TouchableOpacity className='flex-row items-center pt-2' style={{gap: 8}} onPress={handleEditProfile}>
                <PaintBrush01SolidIcon className='text-white/80' height={16} width={18} />
                <SemiBold className='text-base text-white/80'>Edit Profile</SemiBold>
              </TouchableOpacity>
            </View>
          </View>
          <View className='mt-7' style={{gap: 15}}>
            <InputComponent
              ref={fnameInputRef}
              label='First Name'
              value={fname}
              placeholder='Enter your first name'
              editable={isEdit}
              onChangeText={(text) => setFname(text)}
            />
            <InputComponent
              label='Last Name'
              value={lname}
              placeholder='Enter your last name'
              onChangeText={(text) => setLname(text)}
              editable={isEdit}
            />
            <InputComponent
              label='Email'
              value={email}
              keyboardType='email-address'
              placeholder='Enter your email'
              onChangeText={(text) => setEmail(text)}
              editable={isEdit}
            />
            <InputComponent
              label='Mobile'
              value={user?.data?.mobileNumber}
              placeholder='Enter your phone number'
              editable={false}
              keyboardType='phone-pad'
              onPress={() => {
                ToastAndroid.show('Mobile number cannot be changed', ToastAndroid.SHORT)
              }}
            />
          </View>
          {isEdit &&
            (isPending || userMutation.isPending ? (
              <LoadingButton className='mt-10 rounded-2xl opacity-70' disabled />
            ) : (
              <FullGradientButton title='Save' className='mt-10' onPress={handleSave} />
            ))}
          <View className='h-10' />
          <PaddingBottom />
        </KeyboardAvoidingContainer>
      </View>
    </Screen>
  )
}

type InputComponentProps = TextInputProps & {
  label: string
}
const InputComponent = React.forwardRef<TextInput, InputComponentProps>(
  ({label, value, onChangeText, placeholder, secureTextEntry, ...props}, ref) => {
    return (
      <View className='rounded-2xl border border-border bg-g1 p-4 py-2 pb-1'>
        <Medium className='text-xs text-border'>{label}</Medium>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={SemiBoldS}
          className='py-1 text-base text-white/80'
          placeholderTextColor={'#ffffff80'}
          {...props}
        />
      </View>
    )
  },
)
