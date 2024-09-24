import {Medium, SemiBold} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {
  BubbleChatSolidIcon,
  Clock01SolidIcon,
  CodeSquareSolidIcon,
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
import Wrap from '@components/Screen'
import SmallProfile from '@components/SmallProfile'
import Colors from '@utils/colors'
import {aboutLink, conductLink, contactLink, privacyLink, rateLink, termsLink} from '@utils/constants'
import {secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import {open, refer} from '@utils/utils'
import React, {useMemo} from 'react'
import {Alert, ToastAndroid, TouchableOpacity, View} from 'react-native'
import {ScrollView, type TouchableOpacityProps} from 'react-native-gesture-handler'
import Clipboard from '@react-native-clipboard/clipboard'

const ic = {
  height: 20,
  width: 20,
  color: Colors.b1,
}

export default function Profile({navigation}: NavProp) {
  const user = userStore((state) => state.user)
  const token = useMemo(() => secureLs.getString('token'), [])
  return (
    <Wrap>
      <PaddingTop />
      <View className='px-4'>
        <SmallProfile navigation={navigation} />
      </View>
      <ScrollView className='mt-7 h-full px-5' contentContainerStyle={{paddingBottom: 15}}>
        <Gradient className='rounded-2xl border border-border p-5'>
          <Option
            Icon={<UserSolidIcon {...ic} />}
            text='My Account'
            onPress={() => navigation.navigate('EditProfile')}
          />
          <Option Icon={<Clock01SolidIcon {...ic} />} text='Transaction History' />
          <Option Icon={<Notification03SolidIcon {...ic} />} text='Notification' />
          <Option Icon={<SecurityCheckSolidIcon {...ic} />} text='Privacy Policy' onPress={() => open(privacyLink)} />
          <Option Icon={<LicenseSolidIcon {...ic} />} text='Terms and Condition' onPress={() => open(termsLink)} />
          <Option Icon={<InformationCircleSolidIcon {...ic} />} text='About Us' onPress={() => open(aboutLink)} />
          <Option Icon={<CodeSquareSolidIcon {...ic} />} text='Code of Conduct' onPress={() => open(conductLink)} />
          <Option Icon={<StarSolidIcon {...ic} />} text='Rate us' onPress={() => open(rateLink)} />
          <Option Icon={<BubbleChatSolidIcon {...ic} />} text='24/7 Support' onPress={() => open(contactLink)} />
          <Option Icon={<SentSolidIcon {...ic} />} text='Share with others' onPress={() => refer(user)} />
          {/* <Option Icon={<SentSolidIcon {...ic} />} text='Game' onPress={() => navigation.navigate('Game')} /> */}

          {__DEV__ && (
            <Option
              Icon={<SentSolidIcon {...ic} />}
              text='Win'
              onPress={() =>
                navigation.navigate('Win', {
                  winnerData: {
                    userId: 478,
                    playerId: 0,
                    fname: 'Abinash',
                    totalSteps: '11',
                    eliminatedPlayers: [
                      {
                        userId: 480,
                        fname: 'Sudipto',
                        playerId: 1,
                        totalSteps: '2',
                      },
                      {
                        userId: 478,
                        fname: 'Sudipto',
                        playerId: 0,
                        totalSteps: '11',
                      },
                    ],
                  },
                })
              }
            />
          )}
          <Option
            Icon={<Door01SolidIcon {...ic} />}
            text='Logout'
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Logout',
                  onPress: () => navigation.navigate('Logout'),
                },
              ])
            }}
          />
        </Gradient>
        {__DEV__ && (
          <View className='mt-3 p-2'>
            <Medium
              className='text-xs'
              onPress={() => {
                Clipboard.setString(token || '')
                ToastAndroid.show('Token copied to clipboard', ToastAndroid.SHORT)
              }}>
              {token}
            </Medium>
          </View>
        )}
      </ScrollView>
    </Wrap>
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
