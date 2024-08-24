import {Bold, Medium, Regular} from '@/fonts'
import {DbFillIcon, LikeFillIcon, TrophyFillIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import BackHeader from '@components/BackHeader'
import {FullGradientButton} from '@components/Button'
import Gradient from '@components/Gradient'
import Screen from '@components/Screen'
import {getTournamentList_f} from '@query/api'
import {useQuery} from '@tanstack/react-query'
import Colors from '@utils/colors'
import type {NavProp} from '@utils/types'
import React, {useEffect} from 'react'
import {Image, View} from 'react-native'
import type {SvgProps} from 'react-native-svg'

export default function Tournament({navigation}: NavProp) {
  const {data} = useQuery({
    queryKey: ['tournamentList'],
    queryFn: getTournamentList_f,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <View className='bg-primary'>
        <BackHeader title='Tournament Mode' navigation={navigation} />
      </View>
      <Screen>
        <View className='px-5 pb-10' style={{gap: 20}}>
          <Gradient className='flex-row justify-between rounded-3xl border border-border p-5'>
            <View>
              <Bold className='text-3xl text-b1'>Ludo{'\n'}Tournament</Bold>
              <Regular className='mt-1 text-lg text-b1'>Play with real players</Regular>
            </View>
            <Image source={Images.trophy} className='h-24 w-24' />
          </Gradient>
          <Card firstPrice='₹51 L' entryPrize='₹ 49' progress={87} buttonText='Upcoming' />
          <Card firstPrice='₹1 CR' entryPrize='₹ 99' progress={34} buttonText='Live' />
          <Card firstPrice='₹2 CR' entryPrize='₹ 199' progress={54} buttonText='Leaderboard' />
        </View>
      </Screen>
    </>
  )
}

interface CardProps {
  firstPrice: string
  entryPrize: string
  progress: number
  buttonText: string
}

function Card({firstPrice, entryPrize, progress, buttonText}: CardProps) {
  return (
    <Gradient className='flex-row justify-between overflow-hidden rounded-3xl border border-border'>
      <View className='bg-white py-5' style={{gap: 15}}>
        <Option text='First Price' Icon={DbFillIcon} value={firstPrice} />
        <Option text='Entry Prize' Icon={TrophyFillIcon} value={entryPrize} />
        <Option text='ASSURED WINNERS' Icon={LikeFillIcon} value={'100%'} />
      </View>
      <View className='flex-grow justify-between px-3 py-4'>
        <View className='mt-5'>
          <Medium className='text-xs text-white/80'>TOURNAMENT ENTRIES</Medium>
          <View className='mt-1.5 overflow-hidden rounded-full bg-white'>
            <Gradient style={{width: `${progress}%`}} className='h-2.5 rounded-full' colors={[Colors.b1, Colors.b2]} />
          </View>
          <Medium className='mt-1.5 text-xs text-white/80'>1,00,000 of 10,00,000 filled</Medium>
        </View>
        <View>
          <FullGradientButton className='rounded-full' title={buttonText} />
        </View>
      </View>
    </Gradient>
  )
}

interface OptionProps {
  text?: string
  Icon: React.FC<SvgProps>
  value?: string | number
}

function Option({text, Icon, value}: OptionProps) {
  return (
    <View className='flex-row px-4' style={{gap: 15}}>
      <View className='rounded-full bg-gray-100 p-2'>
        <Icon height={20} width={20} />
      </View>
      <View style={{gap: 2}}>
        <Medium className='uppercase text-black/70' style={{fontSize: 10}}>
          {text}
        </Medium>
        <Bold className='text-xl text-black'>{value}</Bold>
      </View>
    </View>
  )
}
