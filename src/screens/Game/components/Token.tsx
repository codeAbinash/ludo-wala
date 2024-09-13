import {playSound} from '@/helpers/SoundUtility'
import Images from '@assets/images/images'
import {W} from '@utils/dimensions'
import {delay, getNextTurn} from '@utils/utils'
import React, {useEffect, useMemo, useRef} from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import Anim, {useAnimatedStyle, Easing, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'
import {StarSpots, startingPoints, turningPoints, victoryStart} from '../plotData'
import type {Num} from '../zustand/gameStore'
import gameStore from '../zustand/gameStore'
import type {PlayerState} from '../zustand/initialState'
import Animated from 'react-native-reanimated'
import {useMutation} from '@tanstack/react-query'
import {move_token_tournament} from '@query/api'

type TokenProps = {
  token: PlayerState
}

const TokenIcons = [Images.G0, Images.G1, Images.G2, Images.G3]

function canTheTokenMove(token: PlayerState, diceNo: Num) {
  return token.travelCount + diceNo <= 57
}

const Token = React.memo<TokenProps>(({token}) => {
  const {id, player} = token
  // const rotation = useRef(new Animated.Value(0)).current
  const chancePlayer = gameStore((state) => state.chancePlayer)
  const currentPositions = gameStore((state) => state.currentPositions)
  const diceNo = gameStore((state) => state.diceNumber)
  const tokenSelection = gameStore((state) => state.tokenSelection)
  const setTokenSelection = gameStore((state) => state.enableTokenSelection)
  const setCurrentPositions = gameStore((state) => state.updateCurrentPositions)
  const setChancePlayer = gameStore((state) => state.setChancePlayer)
  const points = gameStore((state) => state.points)
  const isForwardable = token.travelCount + diceNo < 57 && player === chancePlayer && tokenSelection === player

  const rotation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    }
  })

  const {mutate} = useMutation({
    mutationKey: ['tokenMove', token.id],
    mutationFn: () => move_token_tournament(token.id),
    onSuccess: (data) => {
      // console.log(data)
    },
  })

  // Example to start infinite rotation
  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, {duration: 2000, easing: Easing.linear}), -1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const animatedStyle = useAnimatedStyle({})

  // useEffect(() => {
  //   const rotateAnimation = Animated.loop(
  //     Animated.timing(rotation, {
  //       toValue: 1,
  //       duration: 1000,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     }),
  //   )
  //   rotateAnimation.start()
  //   return () => rotateAnimation.stop()
  // }, [rotation])

  // const rotateInterpolate = useMemo(
  //   () =>
  //     rotation.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: ['0deg', '360deg'],
  //     }),
  //   [rotation],
  // )

  async function handelPress() {
    setTokenSelection(-1) // Disable token selection

    if (!isForwardable) return

    const turningPoint = turningPoints[player]

    mutate()
    for (let i = 0; i < diceNo; i++) {
      playSound('token_move')
      token.pos += 1
      token.travelCount += 1
      if (token.pos === turningPoint) token.pos = victoryStart[player]!
      if (token.pos === 53) token.pos = 1
      setCurrentPositions([...currentPositions])
      await delay(__DEV__ ? 0 : 150)
    }

    // Check for victory
    if (token.travelCount === 56) {
      playSound('home_win')
      // Remove the token from the board
      currentPositions.splice(
        currentPositions.findIndex((t) => t.id === token.id),
        1,
      )
      setCurrentPositions([...currentPositions])
      setChancePlayer(player)
    }

    // Check if the token is on another token and not in star or starting point
    // Get all tokens that are on the same position
    const tokensOnThisPosition = currentPositions.filter(
      (t) => t.pos === token.pos && t.id !== token.id && token.player !== t.player,
    )

    const isInStar = StarSpots.includes(token.pos)
    const isInStarting = startingPoints.includes(token.pos)

    if (isInStar || isInStarting) playSound('safe_spot')

    const isAllowedToKill = !(isInStar || isInStarting || tokensOnThisPosition.length > 1)

    // If there is any token on this position then kill that token
    if (isAllowedToKill) {
      for (const t of tokensOnThisPosition) {
        const travelCount = t.travelCount
        console.log(travelCount)
        playSound('collide')
        for (let i = 0; i < travelCount; i++) {
          t.pos -= 1
          t.travelCount -= 1
          if (t.pos === 0) t.pos = 52
          setCurrentPositions([...currentPositions])
          await delay(0)
        }
        console.log('Token killed')
      }
      // Set the chance to the player who killed the token
      setChancePlayer(player)
    }

    // Update the points

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
              <Animated.View style={[styles.dashedCircle, animatedStyle]}>
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
        <Image
          source={TokenIcon}
          style={[
            {
              width: W * 0.06,
              position: 'absolute',
              height: W * 0.075,
              zIndex: 100,
              transform: [{translateY: -W * 0.02}],
            },
            // isForwardable && animatedStyle,
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
