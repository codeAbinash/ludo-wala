import {SemiBold} from '@/fonts'
import {Radial} from '@components/Gradient'
import {GRADS} from '@utils/colors'
import React, {useEffect, useMemo} from 'react'
import {type ViewProps, View} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated'
import gameStore, {type Num} from '../zustand/gameStore'
import {w} from './MidBox'

type HomeProps = {no: Num} & ViewProps
function HomeBox({style, no, ...props}: HomeProps) {
  const opacity = useSharedValue(1)
  const currentPlayerChance = gameStore((state) => state.chancePlayer)
  const currentPositions = gameStore((state) => state.currentPositions)
  const playersData = gameStore((state) => state.playersData)
  const currentPlayer = playersData ? playersData[no] : null
  const steps = useMemo(() => {
    if (!currentPlayer) return 0
    const playerTokens = currentPositions.filter((p) => p.player === no)
    // const winned = playerTokens.filter((p) => p.travelCount === 56)
    // const totalWinned = 4 - playerTokens.length + winned.length
    // return playerTokens.reduce((acc, token) => acc + token.travelCount, 0) + totalWinned * (100 + 57)
    let total = 0
    for (const token of playerTokens) {
      total += token.travelCount
    }
    return total
  }, [currentPlayer, currentPositions, no])

  useEffect(() => {
    opacity.value = currentPlayerChance === no ? withRepeat(withTiming(0.5, {duration: 500}), -1, true) : 1
  }, [no, opacity, currentPlayerChance])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      className='aspect-square justify-center overflow-hidden'
      {...props}
      style={[
        {
          width: w * 0.4,
          height: w * 0.4,
          transform: [{scale: 0.965}],
          borderRadius: 20,
        },
        style,
        animatedStyle,
      ]}>
      <Radial className='flex aspect-square h-full w-full items-center justify-center' Col={GRADS[no]}>
        <View className='h-3/5 w-3/5 items-center justify-center rounded-full bg-white p-3'>
          {/* <Plot pieceNo={0} player={no} color='red' />
          <Plot pieceNo={1} player={no} color='blue' />
          <Plot pieceNo={2} player={no} color='green' />
          <Plot pieceNo={3} player={no} color='yellow' /> */}
          <SemiBold className='text-lg text-black/70'>{steps}</SemiBold>
          <SemiBold className='text-lg text-black/70'>Steps</SemiBold>
        </View>
      </Radial>
    </Animated.View>
  )
}

export default React.memo(HomeBox)
