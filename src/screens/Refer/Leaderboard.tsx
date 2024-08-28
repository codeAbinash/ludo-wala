import {Bold, SemiBold} from '@/fonts'
import Animations from '@assets/animations/animations'
import {InformationCircleIcon, StarLocalIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import BackHeader from '@components/BackHeader'
import {PaddingBottom} from '@components/SafePadding'
import Wrap from '@components/Screen'
import {leaderboard_f, type Player} from '@query/api'
import {useQuery} from '@tanstack/react-query'
import type {NavProp} from '@utils/types'
import LottieView from 'lottie-react-native'
import React, {useEffect, useMemo} from 'react'
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native'
import {Row, RowCard} from './components'
import {nFormatter} from '@utils/utils'
export default function Leaderboard({navigation}: NavProp) {
  const {data, isLoading} = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => leaderboard_f(),
  })

  const sortedData = useMemo(() => {
    if (!data) return []
    return data.data.sort((a: any, b: any) => b.rank - a.rank)
  }, [data])

  const firstThree = useMemo(() => sortedData.slice(0, 3), [sortedData])

  const rest = useMemo(() => sortedData.slice(3), [sortedData])

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2))
  }, [data])

  return (
    <Wrap>
      <BackHeader title='Leaderboard' navigation={navigation} />
      {isLoading ? (
        <View className='h-screen items-center justify-center pb-20 opacity-70'>
          <LottieView source={Animations.diceLoading} autoPlay loop style={{height: 40, width: 40}} />
        </View>
      ) : (
        <ScrollView>
          <View className='px-5'>
            <TopUi data={firstThree} />
          </View>
          <View className='mt-10 px-5 pb-10'>
            <Row
              left={<SemiBold className='text-base text-white/50'>Players</SemiBold>}
              mid={
                <View className='flex-row items-center justify-center'>
                  <SemiBold className='text-base text-white/50'>Deposit</SemiBold>
                  <TouchableOpacity
                    className='p-1'
                    onPress={() =>
                      Alert.alert('Deposit', 'This is the amount of money that the referred users of the players have deposited to their account.')
                    }>
                    <InformationCircleIcon height={15} width={15} className='text-white/70' />
                  </TouchableOpacity>
                </View>
              }
              right={<SemiBold className='pr-2 text-right text-white/50'>Rank</SemiBold>}
            />
            {rest.map((player, index) => (
              <RowCard key={index} pp={player.profilePic} rank={index + 3} deposit={nFormatter(+player.total_deposit)} name={player.fname} />
            ))}
          </View>
        </ScrollView>
      )}
      <PaddingBottom />
    </Wrap>
  )
}

function Star({count}: {count: number}) {
  return (
    <View className='relative flex-row items-center justify-center'>
      <StarLocalIcon height={25} width={25} />
      <Bold className='absolute text-base text-black'>{count}</Bold>
    </View>
  )
}

function SideImage({name, pp, rank}: {name: string; pp: string; rank: number}) {
  return (
    <View className='items-center justify-center' style={{gap: 5}}>
      <Image
        source={{uri: pp}}
        className='mx-auto rounded-full'
        style={{
          height: 55,
          width: 55,
        }}
      />
      <Star count={rank} />
      <SemiBold className='text-base text-white/50'>{name}</SemiBold>
    </View>
  )
}

function TopUi({data}: {data: Player[]}) {
  return (
    <View>
      <View className='mx-auto w-4/5 flex-row items-end justify-between'>
        <SideImage name={data[1].fname} pp={data[1].profilePic} rank={2} />
        <View className='mb-5 items-center justify-center' style={{gap: 5}}>
          <Image source={Images.crown} className='-mb-2 h-10 w-10' />
          <Image source={{uri: data[0].profilePic}} style={{height: 65, width: 65}} className='rounded-full' />
          <Star count={1} />
          <SemiBold className='text-lg text-white/50'>{data[0].fname}</SemiBold>
        </View>
        <SideImage name={data[2].fname} pp={data[2].profilePic} rank={3} />
      </View>
    </View>
  )
}
