import {Medium, SemiBold} from '@/fonts'
import {CheckmarkCircle02SolidIcon, UnavailableSolidIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Wrap from '@components/Screen'
import {useIsFocused} from '@react-navigation/native'
import {Canvas, Path, Skia} from '@shopify/react-native-skia'
import Colors, {Blue, Green, Red, Yellow} from '@utils/colors'
import {W} from '@utils/dimensions'
import {delay, random3, randomNumber} from '@utils/utils'
import LottieView from 'lottie-react-native'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import HomeBox from './components/Home'
import {MidBox, w} from './components/MidBox'
import {HorizontalBoxes, VerticalBoxes} from './components/Path'
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from './plotData'
import gameStore from './zustand/gameStore'
import type {PlayerState} from './zustand/initialState'
const d1 = require('@animations/d1.lottie')
const d2 = require('@animations/d2.lottie')
const d3 = require('@animations/d3.lottie')
const d4 = require('@animations/d4.lottie')
const d5 = require('@animations/d5.lottie')
const d6 = require('@animations/d6.lottie')
const dices = [d1, d2, d3, d4, d5, d6]

export default function Game() {
  const game = gameStore((state) => state.game)
  const p1 = game.player1
  const p2 = game.player2
  const p3 = game.player3
  const p4 = game.player4
  const isDiceTouch = game.touchDisabled
  const winner = game.winner
  const diceNo = game.diceNo
  const player = game.chancePlayer
  const playerPiece = player === 1 ? p1 : player === 2 ? p2 : player === 3 ? p3 : p4

  const isFocused = useIsFocused()

  return (
    <Wrap Col={['#215962', '#0b1e22']}>
      <PaddingTop />
      <View className='flex-1 items-center justify-between'>
        <FirstPrice />
        <View>
          <TopPart />
          <Board turn={player} />
          <BottomPart />
        </View>
        <View className='pb-3'>{/* <Medium className='text-center text-white/70'>{getColor(player)}'s turn</Medium> */}</View>
      </View>
      <PaddingBottom />
    </Wrap>
  )
}

function FirstPrice() {
  return (
    <View>
      <View className='mt-2 flex-row'>
        <View className='mx-auto flex-row items-center justify-between rounded-xl bg-white px-3 py-1 pl-1.5' style={{columnGap: 10}}>
          <Image source={Images.trophy} style={{width: 40, height: 40}} />
          <View>
            <SemiBold className='text-blue-600'>1st Prize</SemiBold>
            <SemiBold className='text-base text-blue-600'>₹1 Crore</SemiBold>
          </View>
        </View>
      </View>
    </View>
  )
}

function TopPart() {
  const p1 = gameStore((state) => state.game.player1)
  const p2 = gameStore((state) => state.game.player2)
  return (
    <View className='w-full justify-between'>
      <View className='flex-row justify-between'>
        <User name='Abinash' life={2} player={1} data={p1} />
        <User name='Sudipto' life={random3()} reversed active player={2} data={p2} />
      </View>
    </View>
  )
}

type UserProps = {
  banned?: boolean
  name: string
  reversed?: boolean
  bottom?: boolean
  life: number
  active?: boolean
  rolling?: boolean
  isRolled?: boolean
  player: number
  data: PlayerState[]
}
function User({banned, name, data, life, active, reversed, bottom, player}: UserProps) {
  const [diceRolling, setDiceRolling] = useState(false)
  const currentPlayerChange = gameStore((state) => state.game.chancePlayer)
  const isRolled = gameStore((state) => state.game.isDiceRolled)
  const setIsDiceRolled = gameStore((state) => state.setIsDiceRolled)
  const setDiceNo = gameStore((state) => state.setDiceNo)
  const diceNo = gameStore((state) => state.game.diceNo)
  const enablePileSelection = gameStore((state) => state.enablePileSelection)

  const path = Skia.Path.Make()
  path.addCircle(W / 2, W / 2, r)
  const percent = useSharedValue(0)
  const redLife = 3 - life
  useEffect(() => {
    percent.value = withTiming(percentAge, {duration: 2000})
    // percent.value = withTiming(100, {duration: 2000})
  }, [percent])

  async function handlePress() {
    const newDiceNo = randomNumber()
    console.log(newDiceNo)
    setDiceRolling(true)
    await delay(500)
    setDiceRolling(false)
    setIsDiceRolled(true)
    setDiceNo(newDiceNo)

    const isAnyPieceOnBoard = data.findIndex((d) => d.pos !== 57 && d.pos !== 0)
    const isAnyPieceLocked = data.findIndex((d) => d.pos === 0)

    if (isAnyPieceOnBoard === -1) {
      if (newDiceNo === 6) {
        enablePileSelection(player)
      }
    }
  }

  return (
    <View className={`flex-row ${reversed ? 'flex-row-reverse' : 'flex'} ${banned ? 'opacity-40' : ''} w-1/2 items-center p-5`} style={{gap: 10}}>
      <View style={{gap: 5}} className={`w-10/12 ${bottom ? 'flex-col-reverse' : ''}`}>
        <View className='flex-row' style={{gap: 5}}>
          {banned ? (
            <UnavailableSolidIcon width={20} height={20} color='red' />
          ) : (
            <CheckmarkCircle02SolidIcon width={20} height={20} color={Colors.greenDefault} />
          )}
          <View>
            <Medium className='rounded-full bg-white px-3 pb-1 pt-0.5 text-blue-700'>{name}</Medium>
          </View>
        </View>
        <View className={'w-full'}>
          <View className={`w-full flex-row justify-between rounded-full bg-white/30 ${reversed ? 'flex-row-reverse' : 'items-end'}`}>
            <TouchableOpacity
              className='h-12 w-12 items-center justify-center rounded-xl bg-white'
              disabled={isRolled}
              onPress={handlePress}
              activeOpacity={0.7}>
              {!diceRolling && currentPlayerChange === player && <Dice diceNo={diceNo - 1} />}
              {currentPlayerChange === player && diceRolling ? <DiceRolling /> : null}
            </TouchableOpacity>
            <View className='relative h-12 w-12 items-center justify-center rounded-full'>
              {active && (
                <View style={{position: 'absolute', zIndex: 50}}>
                  <Canvas style={{height: W, width: W, transform: [{rotate: '90deg'}]}}>
                    <Path
                      path={path}
                      strokeWidth={strokeW}
                      color={bgColor}
                      style={'stroke'}
                      strokeJoin={'round'}
                      strokeCap={'round'}
                      start={0}
                      end={1}
                    />
                    <Path
                      path={path}
                      strokeWidth={strokeW}
                      color={'white'}
                      style={'stroke'}
                      strokeJoin={'round'}
                      strokeCap={'round'}
                      start={0}
                      end={percent}
                    />
                  </Canvas>
                </View>
              )}
              <Image
                source={{uri: `https://avatar.iran.liara.run/username?username=${name}`}}
                style={{width: 48, height: 48}}
                className='rounded-full'
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{gap: 5}}>
        <Dots n={redLife} />
      </View>
    </View>
  )
}

function DiceRolling() {
  const animationRef = useRef<LottieView>(null)
  useEffect(() => animationRef.current?.play(5, 15), [])
  return (
    <LottieView source={dices[4]} autoPlay loop style={{height: 90, width: 90}} hardwareAccelerationAndroid cacheComposition ref={animationRef} />
  )
}

function Dice({diceNo}: {diceNo: number}) {
  const animationRef = useRef<LottieView>(null)
  useEffect(() => animationRef.current?.play(15, 30), [])

  return (
    <LottieView
      source={dices[diceNo]}
      autoPlay
      loop={false}
      style={{height: 90, width: 90}}
      hardwareAccelerationAndroid
      cacheComposition
      ref={animationRef}
    />
  )
}

function Dots({n}: {n: number}) {
  const dots = useMemo(() => Array.from({length: n}, (_, i) => i), [n])
  const redDots = useMemo(() => Array.from({length: 3 - n}, (_, i) => i), [n])
  return (
    <View style={{gap: 5}}>
      {dots.map((_, i) => (
        <View key={i} style={{height: 10, width: 10, backgroundColor: 'red', borderRadius: 5}} />
      ))}
      {redDots.map((_, i) => (
        <View key={i} style={{height: 10, width: 10, backgroundColor: Colors.greenDefault, borderRadius: 5}} />
      ))}
    </View>
  )
}

const r = 22
const strokeW = 3
const bgColor = Colors.greenDefault
const percentAge = 0.5

function BottomPart() {
  const p3 = gameStore((state) => state.game.player1)
  const p4 = gameStore((state) => state.game.player2)
  return (
    <View className=''>
      <View className='flex-row justify-between'>
        <User life={0} name='Sujal' bottom banned player={3} data={p3} />
        <User name='Raju' life={3} reversed bottom player={4} data={p4} />
      </View>
    </View>
  )
}

function Board({turn}: {turn: number}) {
  return (
    <View style={{height: w, width: w}} className='mx-auto flex-row flex-wrap justify-between'>
      <HomeBox Col={Green} style={{borderTopLeftRadius: 40}} no={1} />
      <VerticalBoxes cells={Plot2Data} color={Yellow[1]} />
      <HomeBox Col={Yellow} style={{borderTopRightRadius: 40}} no={2} />
      <HorizontalBoxes cells={Plot1Data} color={Green[1]} />
      <MidBox />
      <HorizontalBoxes cells={Plot3Data} color={Blue[1]} />
      <HomeBox Col={Red} style={{borderBottomLeftRadius: 40}} no={3} />
      <VerticalBoxes cells={Plot4Data} color={Red[1]} />
      <HomeBox Col={Blue} style={{borderBottomRightRadius: 40}} no={4} />
    </View>
  )
}
