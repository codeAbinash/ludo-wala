import {Medium, SemiBold} from '@/fonts'
import {
  Clock01SolidIcon,
  Door01SolidIcon,
  InformationCircleSolidIcon,
  LicenseSolidIcon,
  Logout02SolidIcon,
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
import {TouchableOpacity, View} from 'react-native'

const props = {
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
      <View className='mt-7 h-full justify-center px-5'>
        <Gradient className='rounded-2xl border border-border p-5'>
          <Option Icon={<UserSolidIcon {...props} />} text='My Account' />
          <Option Icon={<Clock01SolidIcon {...props} />} text='Transaction History' />
          <Option Icon={<Notification03SolidIcon {...props} />} text='Notification' />
          <Option Icon={<SecurityCheckSolidIcon {...props} />} text='Privacy Policy' />
          <Option Icon={<LicenseSolidIcon {...props} />} text='Terms and Condition' />
          <Option Icon={<InformationCircleSolidIcon {...props} />} text='About Us' />
          <Option Icon={<StarSolidIcon {...props} />} text='Rate us' />
          <Option Icon={<SentSolidIcon {...props} />} text='Share with others' />
          <Option Icon={<Door01SolidIcon {...props} />} text='Logout' />
        </Gradient>
      </View>
    </Screen>
  )
}

function Option({Icon, text}: {Icon?: React.ReactNode; text?: string}) {
  return (
    <TouchableOpacity className='flex-row items-center py-3.5' style={{gap: 15}}>
      {Icon}
      <SemiBold className='text-xl text-b1'>{text}</SemiBold>
    </TouchableOpacity>
  )
}
