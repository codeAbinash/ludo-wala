import LottieView from 'lottie-react-native'
import React, {useRef, useEffect} from 'react'

const d1 = require('@animations/d1.lottie')
const d2 = require('@animations/d2.lottie')
const d3 = require('@animations/d3.lottie')
const d4 = require('@animations/d4.lottie')
const d5 = require('@animations/d5.lottie')
const d6 = require('@animations/d6.lottie')
const dices = [d1, d2, d3, d4, d5, d6]

export default function Dice({diceNo}: {diceNo: number}) {
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

export function DiceRolling() {
  const animationRef = useRef<LottieView>(null)
  useEffect(() => animationRef.current?.play(5, 15), [])
  return (
    <LottieView source={dices[4]} autoPlay loop style={{height: 90, width: 90}} hardwareAccelerationAndroid cacheComposition ref={animationRef} />
  )
}
