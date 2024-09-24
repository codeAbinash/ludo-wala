import {Medium, SemiBold} from '@/fonts'
import Images from '@assets/images/images'
import {FullGradientButton} from '@components/Button'
import {GradientYellow} from '@components/Gradient'
import Wrap from '@components/Screen'
import type {RouteProp} from '@react-navigation/native'
import type {StackNav} from '@utils/types'
import {getPP} from '@utils/utils'
import React, {useMemo} from 'react'
import {Image, View} from 'react-native'
import type {WinnerBoardElement} from './Game'
import gameStore from './zustand/gameStore'

type ParamList = {
  Win: WinParamList
}

export type WinParamList = {
  winnerData: WinnerBoardElement
}

export default function Win({navigation, route}: {navigation: StackNav; route: RouteProp<ParamList, 'Win'>}) {
  const players = gameStore((state) => state.playersData)
  const currentPlayer = gameStore((state) => state.myId)
  const currentPlayerId = players[currentPlayer]?.userId
  const userId = route.params.winnerData.userId
  const {winnerData} = route.params
  const clearToDefault = gameStore((state) => state.clearToDefault)

  const eliminatedPlayers = useMemo(
    () => winnerData?.eliminatedPlayers?.slice(0, 3).sort((a, b) => Number(b.totalSteps) - Number(a.totalSteps)),
    [winnerData.eliminatedPlayers],
  )
  return (
    <Wrap>
      <View className='flex-1 items-center justify-center p-6' style={{gap: 20}}>
        <View>
          <Image className='mx-auto' source={Images.win} style={{height: 200, width: 200}} />
          <SemiBold className='text-center text-2xl text-b1'>
            {currentPlayerId === userId ? 'You have win this game' : 'Better Luck Next Time!'}
          </SemiBold>
        </View>
        <View className='w-full' style={{gap: 10}}>
          <Titlebar />
          <Row isGradient score={winnerData.totalSteps} prize={'0'} name={winnerData.fname} />
          {eliminatedPlayers?.map((player, index) => {
            return <Row key={index} score={player?.totalSteps} prize={'0'} name={player?.fname} />
          })}
        </View>
        <View className='mt-10 w-full px-4'>
          <FullGradientButton
            title='Go To Home'
            onPress={() => {
              navigation.reset({index: 0, routes: [{name: 'Home'}]})
              clearToDefault()
            }}
          />
        </View>
      </View>
    </Wrap>
  )
}

function Titlebar() {
  return (
    <View className='w-full flex-row justify-between'>
      <View className='flex-row items-center justify-center'></View>
      <View className='flex-row items-center justify-center pr-3' style={{gap: 20}}>
        <Medium className='text-white'>Score</Medium>
        {/* <Medium className='text-white'>Prize</Medium> */}
      </View>
    </View>
  )
}

function Row({isGradient, score, name, prize}: {isGradient?: boolean; score: string; prize: string; name: string}) {
  const Wrapper = isGradient ? GradientYellow : View
  return (
    <Wrapper className='w-full flex-row justify-between rounded-2xl border border-b1 p-2'>
      <View className='flex-row items-center justify-center' style={{gap: 12}}>
        <Image
          source={{
            uri: getPP('Abinash', 'Karmakar'),
          }}
          style={{height: 40, width: 40}}
        />
        <SemiBold className={`text-base ${isGradient ? 'text-black' : 'text-b1'}`}>{name}</SemiBold>
      </View>
      <View className='flex-row items-center justify-center pr-3' style={{gap: 20}}>
        <Medium className={`text-base ${isGradient ? 'text-black' : 'text-b1'}`}>{score}</Medium>
        {/* <Medium className={`text-base ${isGradient ? 'text-black' : 'text-b1'}`}>₹ {prize}</Medium> */}
      </View>
    </Wrapper>
  )
}
