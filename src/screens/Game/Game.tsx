import {Medium, SemiBold} from '@/fonts'
import Images from '@assets/images/images'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Wrap from '@components/Screen'
import {GRADS} from '@utils/colors'
import React, {useEffect} from 'react'
import {Image, View} from 'react-native'
import HomeBox from './components/Home'
import {MidBox, w} from './components/MidBox'
import {HorizontalBoxes, VerticalBoxes} from './components/Path'
import Player from './components/Player'
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from './plotData'
import gameStore from './zustand/gameStore'
import {playSound} from '@/helpers/SoundUtility'

export default function Game() {
  const p1 = gameStore((state) => state.player0)
  const p2 = gameStore((state) => state.player1)
  const p3 = gameStore((state) => state.player2)
  const p4 = gameStore((state) => state.player3)
  const isDiceTouch = gameStore((state) => state.isTouchDisabled)
  const winner = gameStore((state) => state.winner)
  const diceNo = gameStore((state) => state.diceNumber)
  const chance = gameStore((state) => state.chancePlayer)
  const playerPiece = chance === 1 ? p1 : chance === 2 ? p2 : chance === 3 ? p3 : p4

  return (
    <Wrap Col={['#215962', '#0b1e22']}>
      <PaddingTop />
      <View className='flex-1 items-center justify-between'>
        <FirstPrice />
        <View>
          <TopPart />
          <Board turn={chance} />
          <BottomPart />
        </View>
        <View className='pb-3'>
          {/* <Medium className='text-center text-white/70'>{getColor(player)}'s turn</Medium> */}
        </View>
      </View>
      <PaddingBottom />
    </Wrap>
  )
}

function FirstPrice() {
  return (
    <View className='w-full flex-row justify-between px-3'>
      <View style={{flex: 0.5}}></View>
      <View className='mt-2 flex-1 flex-row'>
        <View
          className='mx-auto flex-row items-center justify-between rounded-xl bg-white px-3 py-1 pl-1.5'
          style={{columnGap: 10}}>
          <Image source={Images.trophy} style={{width: 40, height: 40}} />
          <View>
            <SemiBold className='text-blue-600'>1st Prize</SemiBold>
            <SemiBold className='text-base text-blue-600'>₹1 Crore</SemiBold>
          </View>
        </View>
      </View>
      <View style={{flex: 0.5}} className='flex-row justify-end'>
        <Medium>Menu</Medium>
      </View>
    </View>
  )
}

function TopPart() {
  const p1 = gameStore((state) => state.player0)
  const p2 = gameStore((state) => state.player1)
  return (
    <View className='w-full justify-between'>
      <View className='flex-row justify-between'>
        <Player name='Abinash' life={2} player={0} data={p1} />
        <Player name='Sudipto' life={3} reversed player={1} data={p2} />
      </View>
    </View>
  )
}

function BottomPart() {
  const p3 = gameStore((state) => state.player2)
  const p4 = gameStore((state) => state.player3)
  return (
    <View className=''>
      <View className='flex-row justify-between'>
        <Player life={2} name='Sujal' bottom player={3} data={p4} />
        <Player name='Raju' life={2} reversed bottom player={2} data={p3} />
      </View>
    </View>
  )
}

function Board({turn}: {turn: number}) {
  return (
    <View style={{height: w, width: w}} className='mx-auto flex-row flex-wrap justify-between'>
      <HomeBox style={{borderTopLeftRadius: 40}} no={0} />
      <VerticalBoxes cells={Plot2Data} color={GRADS[1]![1]!} />
      <HomeBox style={{borderTopRightRadius: 40}} no={1} />
      <HorizontalBoxes cells={Plot1Data} color={GRADS[0]![1]!} />
      <MidBox />
      <HorizontalBoxes cells={Plot3Data} color={GRADS[2]![1]!} />
      <HomeBox style={{borderBottomLeftRadius: 40}} no={3} />
      <VerticalBoxes cells={Plot4Data} color={GRADS[3]![1]!} />
      <HomeBox style={{borderBottomRightRadius: 40}} no={2} />
    </View>
  )
}
