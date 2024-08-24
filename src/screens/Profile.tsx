import {SemiBold} from '@/fonts'
import {
  Clock01SolidIcon,
  Door01SolidIcon,
  InformationCircleSolidIcon,
  LicenseSolidIcon,
  Notification03SolidIcon,
  SecurityCheckSolidIcon,
  SentSolidIcon,
  StarSolidIcon,
  UserSolidIcon,
} from '@assets/icons/icons'
import Gradient from '@components/Gradient'
import {PaddingTop} from '@components/SafePadding'
import Screen from '@components/Screen'
import SmallProfile from '@components/SmallProfile'
import Colors from '@utils/colors'
import {secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import React from 'react'
import {Alert, TouchableOpacity, View} from 'react-native'
import type {TouchableOpacityProps} from 'react-native-gesture-handler'

const ic = {
  height: 20,
  width: 20,
  color: Colors.b1,
}

export default function Profile({navigation}: NavProp) {
  return (
    <Screen>
      <PaddingTop />
      <View className='px-4'>
        <SmallProfile navigation={navigation} />
      </View>
      <View className='mt-7 h-full px-5'>
        <Gradient className='rounded-2xl border border-border p-5'>
          <Option Icon={<UserSolidIcon {...ic} />} text='My Account' onPress={() => navigation.navigate('EditProfile')} />
          <Option Icon={<Clock01SolidIcon {...ic} />} text='Transaction History' />
          <Option Icon={<Notification03SolidIcon {...ic} />} text='Notification' />
          <Option Icon={<SecurityCheckSolidIcon {...ic} />} text='Privacy Policy' />
          <Option Icon={<LicenseSolidIcon {...ic} />} text='Terms and Condition' />
          <Option Icon={<InformationCircleSolidIcon {...ic} />} text='About Us' />
          <Option Icon={<StarSolidIcon {...ic} />} text='Rate us' />
          <Option Icon={<SentSolidIcon {...ic} />} text='Share with others' />
          <Option
            Icon={<Door01SolidIcon {...ic} />}
            text='Logout'
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Logout',
                  onPress: () => {
                    secureLs.clearAll()
                    navigation.reset({index: 0, routes: [{name: 'Splash'}]})
                  },
                },
              ])
            }}
          />
        </Gradient>
      </View>
    </Screen>
  )
}

type OptionProps = TouchableOpacityProps & {Icon?: React.ReactNode; text?: string}
function Option({Icon, text, ...props}: OptionProps) {
  return (
    <TouchableOpacity className='flex-row items-center py-3.5' style={{gap: 15}} {...props}>
      {Icon}
      <SemiBold className='text-lg text-b1'>{text}</SemiBold>
    </TouchableOpacity>
  )
}
