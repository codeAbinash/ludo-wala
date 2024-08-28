import {Medium, SemiBold} from '@/fonts'
import {CheckmarkCircle02SolidIcon, D1, D2, D3, D4, D5, D6, UnavailableSolidIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Screen from '@components/Screen'
import {useIsFocused} from '@react-navigation/native'
import {Canvas, Path, Skia} from '@shopify/react-native-skia'
import Colors, {Blue, Green, Red, Yellow} from '@utils/colors'
import {W} from '@utils/dimensions'
import {random3, randomNumber} from '@utils/utils'
import LottieView from 'lottie-react-native'
import React, {useEffect, useMemo} from 'react'
import {Image, View} from 'react-native'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import HomeBox from './components/Home'
import {MidBox, w} from './components/MidBox'
import {HorizontalBoxes, VerticalBoxes} from './components/Path'
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from './plotData'
import gameStore from './zustand/gameStore'
import Animations from '@assets/animations/animations'

const dices = [Animations.d1, Animations.d2, Animations.d3, Animations.d4, Animations.d5, Animations.d6]

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
    <Screen Col={['#215962', '#0b1e22']}>
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
    </Screen>
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
  return (
    <View className='w-full justify-between'>
      <View className='flex-row justify-between'>
        <User name='Abinash' diceNo={randomNumber()} life={2} rolling />
        <User name='Sudipto' life={random3()} reversed active diceNo={3} />
      </View>
    </View>
  )
}

type UserProps = {
  banned?: boolean
  name: string
  reversed?: boolean
  bottom?: boolean
  diceNo: number
  life: number
  active?: boolean
  rolling?: boolean
}
function User({banned, name, rolling, life, active, reversed, bottom, diceNo}: UserProps) {
  const path = Skia.Path.Make()
  path.addCircle(W / 2, W / 2, r)
  const percent = useSharedValue(0)
  const redLife = 3 - life
  useEffect(() => {
    percent.value = withTiming(percentAge, {duration: 2000})
    // percent.value = withTiming(100, {duration: 2000})
  }, [percent])

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
            <View className='h-12 w-12 items-center justify-center rounded-xl'>
              <LottieView source={dices[diceNo]} autoPlay loop={false} style={{height: 90, width: 90}} hardwareAccelerationAndroid cacheComposition />
            </View>
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
  return (
    <View className=''>
      <View className='flex-row justify-between'>
        <User life={0} name='Sujal' bottom diceNo={1} banned />
        <User name='Raju' life={3} reversed bottom diceNo={0} />
      </View>
    </View>
  )
}

function Board({turn}: {turn: number}) {
  return (
    <View style={{height: w, width: w}} className='mx-auto flex-row flex-wrap justify-between'>
      <HomeBox Col={Green} style={{borderTopLeftRadius: 40}} turn={turn} no={1} />
      <VerticalBoxes cells={Plot2Data} color={Yellow[1]} />
      <HomeBox Col={Yellow} style={{borderTopRightRadius: 40}} turn={turn} no={2} />
      <HorizontalBoxes cells={Plot1Data} color={Green[1]} />
      <MidBox />
      <HorizontalBoxes cells={Plot3Data} color={Blue[1]} />
      <HomeBox Col={Red} style={{borderBottomLeftRadius: 40}} turn={turn} no={3} />
      <VerticalBoxes cells={Plot4Data} color={Red[1]} />
      <HomeBox Col={Blue} style={{borderBottomRightRadius: 40}} turn={turn} no={4} />
    </View>
  )
}

function getDiceIcon(n: number) {
  switch (n) {
    case 1:
      return D1
    case 2:
      return D2
    case 3:
      return D3
    case 4:
      return D4
    case 5:
      return D5
    case 6:
      return D6
  }
  return D1
}

// const Dice = React.memo(({n}: {n: number}) => {
//   const Icon = getDiceIcon(n)
//   return <Icon width={48} height={48} />
// })

function Dice({n}: {n: number}) {
  const DiceIcon = getDiceIcon(n)
  return <DiceIcon width={48} height={48} />
}
