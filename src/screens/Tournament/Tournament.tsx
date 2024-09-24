import {Bold, Medium, Regular} from '@/fonts'
import Animations from '@assets/animations/animations'
import {DbFillIcon, LikeFillIcon, TrophyFillIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import BackHeader from '@components/BackHeader'
import {FullGradientButton} from '@components/Button'
import Gradient, {Radial} from '@components/Gradient'
import {PaddingBottom} from '@components/SafePadding'
import {getTournamentList_f, type TournamentData} from '@query/api'
import {useNavigation} from '@react-navigation/native'
import {useQuery} from '@tanstack/react-query'
import Colors from '@utils/colors'
import type {NavProp, StackNav} from '@utils/types'
import {print} from '@utils/utils'
import LottieView from 'lottie-react-native'
import React, {useEffect} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import type {SvgProps} from 'react-native-svg'

export default function Tournament({navigation}: NavProp) {
  const {data} = useQuery({
    queryKey: ['tournamentList'],
    queryFn: getTournamentList_f,
  })

  useEffect(() => {
    print(data)
  }, [data])

  return (
    <View>
      <BackHeader title='Tournament Mode' navigation={navigation} />
      <View className='px-5 pb-10' style={{gap: 20}}>
        {!data?.data && (
          <View className='h-80 w-full items-center justify-center'>
            <LottieView
              hardwareAccelerationAndroid
              cacheComposition
              source={Animations.diceLoading}
              autoPlay
              loop
              style={{width: 30, height: 30, opacity: 0.7}}
            />
          </View>
        )}
        <FlatList
          ListHeaderComponent={
            <Gradient className='flex-row justify-between rounded-3xl border border-border p-5'>
              <View>
                <Bold className='text-3xl text-b1'>Ludo{'\n'}Tournament</Bold>
                <Regular className='mt-1 text-lg text-b1'>Play with real players</Regular>
              </View>
              <Image source={Images.trophy} className='h-24 w-24' />
            </Gradient>
          }
          data={data?.data || []}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{gap: 15, paddingBottom: 200}}
          renderItem={({item}) => (
            <Card
              firstPrice={item['1stPrize'] || ''}
              entryPrize={item.entryFee || 0}
              buttonText={item.userJoined ? 'Joined' : 'Join'}
              maxPlayers={item.maxPlayers}
              joinedUsers={item.participants_count}
              data={item}
              onPress={() => navigation.navigate('TournamentDetails', item)}
            />
          )}
          ListFooterComponent={
            <View>
              <PaddingBottom />
            </View>
          }></FlatList>
        {/*
        {data?.data.map((item, index: number) => (
          <Card
            firstPrice={item['1stPrize'] || ''}
            entryPrize={item.entryFee || 0}
            buttonText={item.userJoined ? 'Joined' : 'Join'}
            key={index}
            maxPlayers={item.maxPlayers}
            joinedUsers={item.participants_count}
            data={item}
            onPress={() => navigation.navigate('TournamentDetails', item)}
          />
        ))} */}
      </View>
    </View>
  )
}

interface CardProps {
  firstPrice: string
  entryPrize: number
  buttonText: string
  maxPlayers: number
  joinedUsers: number
  data: TournamentData
  onPress: () => void
}

function Card({firstPrice, entryPrize, buttonText, maxPlayers, joinedUsers, data}: CardProps) {
  const navigation = useNavigation<StackNav>()
  const width = (joinedUsers / maxPlayers) * 100
  return (
    <TouchableOpacity onPress={() => navigation.navigate('TournamentDetails', data)} activeOpacity={0.7}>
      <Radial className='flex-row justify-between overflow-hidden rounded-3xl border border-border'>
        <View className='w-1/2 bg-white py-5' style={{gap: 15}}>
          <Option
            text='First Price'
            Icon={DbFillIcon}
            value={firstPrice.split(' ')[0] + ' ' + firstPrice.split(' ')[1]}
          />
          <Option text='Entry Prize' Icon={TrophyFillIcon} value={'₹ ' + entryPrize} />
          <Option text='ASSURED WINNERS' Icon={LikeFillIcon} value={'100%'} />
        </View>
        <View className='flex-grow justify-between px-3 py-4'>
          <View className='mt-5'>
            <Medium className='text-xs text-white/80'>TOURNAMENT ENTRIES</Medium>
            <View className='mt-1.5 overflow-hidden rounded-full bg-white'>
              <Gradient style={{width: `${width}%`}} className='h-2.5 rounded-full' colors={[Colors.b1, Colors.b2]} />
            </View>
            <Medium className='mt-1.5 text-xs text-white/80'>
              {joinedUsers || 0} of {maxPlayers} filled
            </Medium>
          </View>
          <View>
            <FullGradientButton
              className='rounded-full'
              title={buttonText}
              onPress={() => navigation.navigate('TournamentDetails', data)}
            />
          </View>
        </View>
      </Radial>
    </TouchableOpacity>
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
        <Medium className='uppercase text-black/70' style={{fontSize: 10}} numberOfLines={1}>
          {text}
        </Medium>
        <Bold className='text-xl text-black' numberOfLines={1} style={{flexShrink: 1, fontSize: 16}}>
          {value}
        </Bold>
      </View>
    </View>
  )
}
