import Images from '@assets/images/images'
import {W} from '@utils/dimensions'
import React, {useEffect, useMemo, useRef} from 'react'
import {Animated, Easing, StyleSheet, TouchableOpacity, View} from 'react-native'
import Anim, {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'
import type {Num} from '../zustand/gameStore'
import gameStore from '../zustand/gameStore'
import {isMovePossible} from '../utils'
import {delay, getNextTurn} from '@utils/utils'
import {playSound} from '@/helpers/SoundUtility'
import {StarLocalIcon} from '@assets/icons/icons'
import {StarSpots, startingPoints} from '../plotData'

type TokenProps = {
  player: Num
  id: string
}

const TokenIcons = [Images.G0, Images.G1, Images.G2, Images.G3]

const Token = React.memo<TokenProps>(({player, id}) => {
  const rotation = useRef(new Animated.Value(0)).current
  const chancePlayer = gameStore((state) => state.chancePlayer)
  const currentPositions = gameStore((state) => state.currentPositions)
  const diceNo = gameStore((state) => state.diceNumber)
  const opacity = useSharedValue(1)
  const tokenSelection = gameStore((state) => state.tokenSelection)
  const setTokenSelection = gameStore((state) => state.enableTokenSelection)
  const setCurrentPositions = gameStore((state) => state.updateCurrentPositions)
  const setChancePlayer = gameStore((state) => state.setChancePlayer)

  useEffect(() => {
    opacity.value = chancePlayer === player ? withRepeat(withTiming(0.5, {duration: 500}), -1, true) : 1
  }, [chancePlayer, opacity, player])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const isForwardable =
    isMovePossible(currentPositions, diceNo, player) && tokenSelection === player && player === chancePlayer

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )
    rotateAnimation.start()

    return () => rotateAnimation.stop()
  }, [rotation])

  const rotateInterpolate = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [rotation],
  )

  async function handelPress() {
    if (!isForwardable) return

    setTokenSelection(-1) // Disable token selection

    const index = currentPositions.findIndex((t) => t.id === id)
    const token = currentPositions[index]

    for (let i = 0; i < diceNo; i++) {
      token.pos += 1
      token.travelCount += 1
      setCurrentPositions([...currentPositions])
      await delay(0)
      playSound('token_move')
    }

    // Check if the token is on another token and not in star or starting point
    // Get all tokens that are on the same position
    const tokensOnThisPosition = currentPositions.filter(
      (t) => t.pos === token.pos && t.id !== token.id && token.player !== t.player,
    )

    const isInStar = StarSpots.includes(token.pos)
    const isInStarting = startingPoints.includes(token.pos)

    if (isInStar || isInStarting) {
      playSound('safe_spot')
    }

    const isAllowedToKill = !(isInStar || isInStarting)

    // If there is any token on this position then kill that token
    if (isAllowedToKill) {
      for (const t of tokensOnThisPosition) {
        const travelCount = t.travelCount
        console.log(travelCount)
        playSound('collide')
        for (let i = 0; i < travelCount; i++) {
          t.pos -= 1
          t.travelCount -= 1
          setCurrentPositions([...currentPositions])
          await delay(0)
        }
        console.log('Token killed')
      }
    }

    // If the dice is not 6 then change the turn
    if (diceNo !== 6) {
      setChancePlayer(getNextTurn(chancePlayer))
    } else {
      setChancePlayer(chancePlayer)
    }
  }

  const TokenIcon = TokenIcons[player]

  return (
    <TouchableOpacity onPress={handelPress} disabled={!isForwardable}>
      <Anim.View className='absolute items-center justify-center'>
        {isForwardable && player === chancePlayer && (
          <View style={styles.hollowCircle}>
            <View style={styles.dashedCircleContainer}>
              <Animated.View style={[styles.dashedCircle, {transform: [{rotate: rotateInterpolate}]}]}>
                <Svg height='18' width='18'>
                  <Circle
                    cx='9'
                    cy='9'
                    r='8'
                    stroke='white'
                    strokeWidth='2'
                    strokeDasharray='4 4'
                    strokeDashoffset='0'
                    fill='transparent'
                  />
                </Svg>
              </Animated.View>
            </View>
          </View>
        )}
        {/* <TokenIcon
        // width={W * 0.07}
        // height={W * 0.07}
        style={{
          position: 'absolute',
          zIndex: 100,
          transform: [{translateY: -W * 0.02}],
          height: W * 0.06,
          width: W * 0.06,
        }}
      /> */}
        <Anim.Image
          source={TokenIcon}
          style={[
            {
              width: W * 0.06,
              position: 'absolute',
              height: W * 0.075,
              zIndex: 100,
              transform: [{translateY: -W * 0.02}],
            },
            isForwardable && animatedStyle,
          ]}
        />
      </Anim.View>
    </TouchableOpacity>
  )
})

export default Token

const styles = StyleSheet.create({
  hollowCircle: {
    width: 15,
    height: 15,
    position: 'absolute',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedCircleContainer: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
  },
  dashedCircle: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
