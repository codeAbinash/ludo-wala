import {View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Image} from 'react-native'
import React, {useEffect, useMemo, useRef} from 'react'
import Svg, {Circle} from 'react-native-svg'
import {W} from '@utils/dimensions'
import type {Num} from '../zustand/gameStore'
import {COLS} from '@utils/colors'
import {G1Icon, G2Icon, G3Icon, G4Icon} from '@assets/icons/icons'
import {w} from './MidBox'
import Images from '@assets/images/images'

type PileProps = {
  player: Num
}

// const PileIcons = [G1Icon, G2Icon, G3Icon, G4Icon]
const PileIcons = [Images.G1, Images.G2, Images.G3, Images.G4]

export default function Pile({player}: PileProps) {
  const isCellEnabled = true
  const isPileEnabled = true
  const isForwardable = () => true
  const rotation = useRef(new Animated.Value(0)).current

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

  const PileIcon = PileIcons[player]

  return (
    <View className='absolute items-center justify-center'>
      {/* <View style={styles.hollowCircle}>
        {(isCell ? isCellEnabled && isForwardable() : isPileEnabled) && (
          <View style={styles.dashedCircleContainer}>
            <Animated.View style={[styles.dashedCircle, {transform: [{rotate: rotateInterpolate}]}]}>
              <Svg height='18' width='18'>
                <Circle cx='9' cy='9' r='8' stroke='white' strokeWidth='2' strokeDasharray='4 4' strokeDashoffset='0' fill='transparent' />
              </Svg>
            </Animated.View>
          </View>
        )}
      </View> */}
      {/* <PileIcon
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
        source={PileIcon}
        style={{
          width: W * 0.06,
          position: 'absolute',
          height: W * 0.075,
          zIndex: 100,
          transform: [{translateY: -W * 0.02}],
        }}
      />
    </View>
  )
}

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
