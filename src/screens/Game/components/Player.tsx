import {Medium} from '@/fonts'
import {playSound} from '@/helpers/SoundUtility'
import Animations from '@assets/animations/animations'
import {CheckmarkCircle02SolidIcon, UnavailableSolidIcon} from '@assets/icons/icons'
import {roll_dice_tournament} from '@query/api'
import {Canvas, Path, Skia} from '@shopify/react-native-skia'
import {useMutation} from '@tanstack/react-query'
import Colors, {Red} from '@utils/colors'
import LottieView from 'lottie-react-native'
import React, {useEffect, useMemo} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import gameStore, {type Num} from '../zustand/gameStore'
import type {PlayerState} from '../zustand/initialState'
import Dice, {DiceRolling} from './Dice'

type PlayerProps = {
  banned?: boolean
  name: string
  reversed?: boolean
  bottom?: boolean
  life: number
  active?: boolean
  rolling?: boolean
  isRolled?: boolean
  player: Num
  data: PlayerState[]
}

const r = 22
const strokeW = 3
const bgColor = Colors.greenDefault
const percentAge = 0.5

export default function Player({banned, name, life, active, reversed, bottom, player}: PlayerProps) {
  const currentPlayerChance = gameStore((state) => state.chancePlayer)
  const diceNo = gameStore((state) => state.diceNumber)
  const isDiceTouchDisabled = gameStore((state) => state.isTouchDisabled)
  const setDiceRolling = gameStore((state) => state.setIsDiceRolling)
  const isDiceRolling = gameStore((state) => state.isDiceRolling)
  const myId = gameStore((state) => state.myId)
  const players = gameStore((state) => state.playersData)
  const currentPlayer = players ? players[player] : null
  const setDiceNo = gameStore((state) => state.setDiceNumber)

  const rollDiceMutation = useMutation({
    mutationKey: ['rollDice'],
    mutationFn: roll_dice_tournament,
    onSuccess: (data) => {
      playSound('dice_roll')
      console.log('Dice Roll Request Success')
      console.log(data)
      setDiceNo(data.diceValue)
      setDiceRolling(false)
    },
  })

  const path = Skia.Path.Make()
  path.addCircle(50 / 2, 50 / 2, r)
  const percent = useSharedValue(0)
  const redLife = 3 - life

  useEffect(() => {
    if (!isDiceRolling) {
      percent.value = 0
      percent.value = withTiming(1, {duration: 30000})
    }
  }, [currentPlayerChance, percent, isDiceRolling])
  // }, [isDiceRolling, percent, currentPlayerChance])

  function press() {
    setDiceRolling(true)
    rollDiceMutation.mutate({playerId: player})
  }

  return (
    <View className={`w-1/2 ${bottom ? 'flex-col-reverse' : 'flex-col'} `}>
      {
        <View
          className={`w-full px-3 ${reversed ? 'items-end' : 'items-start'} ${
            currentPlayerChance === player && !isDiceTouchDisabled ? 'opacity-100' : 'opacity-0'
          } `}>
          <LottieView
            source={Animations.downArrow}
            autoPlay
            loop
            cacheComposition
            hardwareAccelerationAndroid
            style={{width: 60, height: 60, transform: [{rotate: bottom ? '180deg' : '0deg'}]}}
          />
        </View>
      }
      <View
        className={`flex-row ${reversed ? 'flex-row-reverse' : 'flex'} ${banned ? 'opacity-40' : ''} ${
          !currentPlayer ? 'opacity-0' : ''
        } w-full items-center px-5 py-3 ${bottom ? 'pb-0' : 'pt-0'} `}
        style={{gap: 10}}>
        <View style={{gap: 5}} className={`w-10/12 ${bottom ? 'flex-col-reverse' : ''}`}>
          <View className={`flex-row ${!reversed ? 'flex-row-reverse' : ''}`} style={{gap: 5}}>
            {banned ? (
              <UnavailableSolidIcon width={20} height={20} color='red' />
            ) : (
              <CheckmarkCircle02SolidIcon width={20} height={20} color={Colors.greenDefault} />
            )}
            <View>
              <Medium className='rounded-full bg-white px-3 pb-1 pt-0.5 text-blue-700'>{currentPlayer?.fname}</Medium>
            </View>
          </View>
          <View className={'w-full'}>
            <View
              className={`w-full flex-row justify-between rounded-full bg-white/30 ${
                reversed ? 'flex-row-reverse' : 'items-end'
              }`}>
              <TouchableOpacity
                className='h-12 w-12 items-center justify-center rounded-xl'
                onPress={press}
                activeOpacity={0.7}
                disabled={isDiceRolling || isDiceTouchDisabled || currentPlayerChance !== player || myId !== player}>
                {!isDiceRolling && currentPlayerChance === player && <Dice diceNo={diceNo - 1} />}
                {currentPlayerChance === player && isDiceRolling ? <DiceRolling /> : null}
              </TouchableOpacity>
              <View className='relative h-12 w-12 items-center justify-center rounded-full'>
                {currentPlayerChance === player && (
                  <View style={{position: 'absolute', zIndex: 500}}>
                    <Canvas
                      style={{
                        height: 50,
                        width: 50,
                        transform: [{rotate: '90deg'}],
                      }}>
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
                        color={Colors.red['500']}
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
                  source={{uri: `https://avatar.iran.liara.run/username?username=${currentPlayer?.fname}`}}
                  style={{width: 48, height: 48}}
                  className='rounded-full'
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{gap: 5}}>
          <Dots n={redLife} player={player} />
        </View>
      </View>
    </View>
  )
}

function Dots({n, player}: {n: number; player: Num}) {
  const dots = useMemo(() => Array.from({length: n}, (_, i) => i), [n])
  const redDots = useMemo(() => Array.from({length: 3 - n}, (_, i) => i), [n])
  return (
    <View style={{gap: 5}} className='opacity-0'>
      {dots.map((_, i) => (
        <View key={i} style={{height: 10, width: 10, backgroundColor: Red[0], borderRadius: 5}} />
        // <FavouriteSolidIcon key={i} width={13} height={13} className='text-gray-500' />
      ))}
      {redDots.map((_, i) => (
        <View key={i} style={{height: 10, width: 10, backgroundColor: Colors.greenDefault, borderRadius: 5}} />
        // <FavouriteSolidIcon key={i} width={13} height={13} color={GRADS[player]![0]} />
      ))}
    </View>
  )
}
