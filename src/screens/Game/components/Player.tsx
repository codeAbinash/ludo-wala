import {Medium} from '@/fonts'
import {playSound} from '@/helpers/SoundUtility'
import {CheckmarkCircle02SolidIcon, FavouriteSolidIcon, UnavailableSolidIcon} from '@assets/icons/icons'
import {useIsFocused} from '@react-navigation/native'
import {Skia} from '@shopify/react-native-skia'
import Colors, {GRADS} from '@utils/colors'
import {W} from '@utils/dimensions'
import {delay, getNextTurn, print, randomNumber} from '@utils/utils'
import React, {useEffect, useMemo, useState} from 'react'
import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import gameStore, {type Num} from '../zustand/gameStore'
import type {PlayerState} from '../zustand/initialState'
import Dice, {DiceRolling} from './Dice'
import {isMovePossible} from '../utils'

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
  const [diceRolling, setDiceRolling] = useState(false)
  const currentPlayerChange = gameStore((state) => state.chancePlayer)
  const isRolled = gameStore((state) => state.isDiceRolled)
  const setIsDiceRolled = gameStore((state) => state.setIsDiceRolled)
  const setDiceNo = gameStore((state) => state.setDiceNumber)
  const diceNo = gameStore((state) => state.diceNumber)
  const enableTokenSelection = gameStore((state) => state.enableTokenSelection)
  const setDiceTouchDisabled = gameStore((state) => state.setIsTouchDisabled)
  const isDiceTouchDisabled = gameStore((state) => state.isTouchDisabled)
  const setTurn = gameStore((state) => state.setChancePlayer)
  const turn = gameStore((state) => state.chancePlayer)
  const enableCellSelection = gameStore((state) => state.enableCellSelection)
  const setChancePlayer = gameStore((state) => state.setChancePlayer)
  const currentPositions = gameStore((state) => state.currentPositions)

  const isFocused = useIsFocused()

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
    setDiceRolling(true)
    setDiceTouchDisabled(true)
    playSound('dice_roll')
    await delay(300)
    setDiceRolling(false)
    setDiceNo(newDiceNo)
    // await delay(1000)

    const isAnyTokenAlive = currentPositions.findIndex((t) => t.pos !== 57 && t.player === player) !== -1
    // const isAnyTokenLocked = currentPositions.findIndex((t) => t.pos === 0)

    // If there is not any token alive then change the turn
    if (!isAnyTokenAlive) return setChancePlayer(getNextTurn(turn))

    const canMove = isMovePossible(currentPositions, newDiceNo, player)

    // If it can move then move the token

    if (canMove) {
      // Logic to move the dice
      /**
       * -------------------
       * -------------------
       * -------------------
       * -------------------
       */
      ToastAndroid.show('Token can move', ToastAndroid.SHORT)
      enableTokenSelection(player)
      // Enable Token selection and return
      return
    } else {
      // If it can't move then change the turn
      setChancePlayer(getNextTurn(turn))
      setDiceTouchDisabled(false)
    }

    // if dice is 6 then try again

    // if (newDiceNo === 6) {
    //   // The current chance is the same.
    //   // enable
    //   ToastAndroid.show('Dice is 6', ToastAndroid.SHORT)
    //   setDiceTouchDisabled(false)
    //   return
    // } else {
    //   setChancePlayer(getNextTurn(turn))
    // }
    // setDiceTouchDisabled(false)
  }

  return (
    <View
      className={`flex-row ${reversed ? 'flex-row-reverse' : 'flex'} ${
        banned ? 'opacity-40' : ''
      } w-1/2 items-center p-5`}
      style={{gap: 10}}>
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
          <View
            className={`w-full flex-row justify-between rounded-full bg-white/30 ${
              reversed ? 'flex-row-reverse' : 'items-end'
            }`}>
            <TouchableOpacity
              className='h-12 w-12 items-center justify-center rounded-xl'
              onPress={handlePress}
              activeOpacity={0.7}
              disabled={isDiceTouchDisabled || currentPlayerChange !== player}>
              {!diceRolling && currentPlayerChange === player && <Dice diceNo={diceNo - 1} />}
              {currentPlayerChange === player && diceRolling ? <DiceRolling /> : null}
            </TouchableOpacity>
            <View className='relative h-12 w-12 items-center justify-center rounded-full'>
              {/* {active && (
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
              )} */}
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
        <Dots n={redLife} player={player} />
      </View>
    </View>
  )
}

function Dots({n, player}: {n: number; player: Num}) {
  const dots = useMemo(() => Array.from({length: n}, (_, i) => i), [n])
  const redDots = useMemo(() => Array.from({length: 3 - n}, (_, i) => i), [n])
  return (
    <View style={{gap: 5}}>
      {dots.map((_, i) => (
        // <View key={i} style={{height: 10, width: 10, backgroundColor: 'red', borderRadius: 5}} />
        <FavouriteSolidIcon key={i} width={13} height={13} className='text-gray-500' />
      ))}
      {redDots.map((_, i) => (
        // <View key={i} style={{height: 10, width: 10, backgroundColor: Colors.greenDefault, borderRadius: 5}} />
        <FavouriteSolidIcon key={i} width={13} height={13} color={GRADS[player][0]} />
      ))}
    </View>
  )
}
