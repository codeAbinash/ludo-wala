import {Bangers, SemiBold} from '@/fonts'
import {userStore} from '@/zustand/userStore'
import {ArrowLeft01SolidIcon, ArrowRight01SolidIcon, ChampionIcon, ChessPawnIcon, PieChartIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {FullGradientButton, GradientButton} from '@components/Button'
import Gradient from '@components/Gradient'
import {PaddingTop} from '@components/SafePadding'
import SmallProfile from '@components/SmallProfile'
import {get_user_f} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import type colors from '@utils/colors'
import Colors from '@utils/colors'
import {W} from '@utils/dimensions'
import type {NavProp} from '@utils/types'
import React, {useDebugValue, useEffect} from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import Animated, {useAnimatedStyle, useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated'
import BannerImage from '@icons/bannerImage.svg'

type GameType = 'Classic' | 'Quick' | 'Challenge' | 'Tournament'

function getCurrentUserIndex(game: GameType) {
  'worklet'
  switch (game) {
    case 'Classic':
      return 2
    case 'Quick':
      return 3
    case 'Challenge':
      return 1
    case 'Tournament':
      return 0
  }
}

function indexToGame(index: number): GameType {
  'worklet'
  switch (index) {
    case 0:
      return 'Tournament'
    case 1:
      return 'Challenge'
    case 2:
      return 'Classic'
    case 3:
      return 'Quick'
  }
  return 'Tournament'
}

function incrementOption(option: number) {
  'worklet'
  return indexToGame((option + 1) % 4)
}

function decrementOption(option: number) {
  'worklet'
  const num = option === 0 ? 3 : option - 1
  return indexToGame(num)
}

function GameMode({
  game,
  option,
  setCurrentOption,
  disabled,
}: {
  game: GameType
  option: number
  setCurrentOption: (option: GameType) => void
  disabled?: boolean
}) {
  return (
    <View className='w-screen flex-row items-center justify-center'>
      <TouchableOpacity className='px-3 py-16' onPress={() => setCurrentOption(decrementOption(option))}>
        <Gradient className='h-8 w-8 items-center justify-center rounded-full border border-bb px-0' colors={[Colors.b1, Colors.b1]}>
          <ArrowLeft01SolidIcon height={25} width={25} className='text-black' />
        </Gradient>
      </TouchableOpacity>
      <Gradient
        className='flex-1 items-center rounded-2xl pb-7'
        style={{
          paddingTop: 120,
        }}>
        <Image
          source={Images.default}
          style={{
            width: '80%',
            height: 250,
            position: 'absolute',
            marginTop: -140,
          }}
          resizeMode='cover'
          className='rounded-lg'
        />
        <Bangers className={`text-4xl ${disabled ? 'text-gray-400' : 'text-b1'}`} style={styles.fontOutline}>
          {game} Mode
        </Bangers>
        {disabled ? (
          <FullGradientButton className='mt-12 rounded-full border-transparent px-10 opacity-50' title='Coming Soon' activeOpacity={1} />
        ) : (
          <FullGradientButton className='mt-12 rounded-full px-10' title='Play Now' />
        )}
      </Gradient>
      <TouchableOpacity className='px-3 py-16' onPress={() => setCurrentOption(incrementOption(option))}>
        <Gradient className='h-8 w-8 items-center justify-center rounded-full border border-bb px-0' colors={[Colors.b1, Colors.b1]}>
          <ArrowRight01SolidIcon height={25} width={25} className='text-black' />
        </Gradient>
      </TouchableOpacity>
    </View>
  )
}

export default function HomeScreen({navigation}: NavProp) {
  const setUser = userStore((state) => state.setUser)
  const [currentOption, setCurrentOption] = React.useState<GameType>('Tournament')

  const curr = useSharedValue(0)

  useDerivedValue(() => {
    curr.value = withTiming(getCurrentUserIndex(currentOption))
  }, [currentOption])

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: curr.value * -W}],
    }
  })

  const {mutate} = useMutation({
    mutationKey: ['user'],
    mutationFn: get_user_f,
    onSuccess: setUser,
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <View className='flex-1 bg-primary'>
      <PaddingTop />
      <View className='px-4'>
        <SmallProfile navigation={navigation} />
      </View>
      <View className='flex-1 justify-center'>
        <Animated.View className='flex-row pt-16' style={animStyle}>
          <GameMode setCurrentOption={setCurrentOption} option={0} game='Tournament' />
          <GameMode disabled setCurrentOption={setCurrentOption} option={1} game='Challenge' />
          <GameMode disabled setCurrentOption={setCurrentOption} option={2} game='Classic' />
          <GameMode disabled setCurrentOption={setCurrentOption} option={3} game='Quick' />
        </Animated.View>
      </View>
      <View className='pb-7'>
        <View className='flex-row items-center justify-center' style={{gap: 15}}>
          <RoundButton
            active={currentOption === 'Tournament'}
            onPress={() => setCurrentOption('Tournament')}
            icon={<ChampionIcon height={25} width={25} className={currentOption === 'Tournament' ? 'text-b1' : 'text-border'} />}
          />
          <RoundButton
            active={currentOption === 'Challenge'}
            onPress={() => setCurrentOption('Challenge')}
            icon={
              <SemiBold
                className={`text-lg ${currentOption === 'Challenge' ? 'text-b1' : 'text-border'} text-center`}
                style={{height: 25, width: 25}}>
                VS
              </SemiBold>
            }
          />
          <RoundButton
            active={currentOption === 'Classic'}
            onPress={() => setCurrentOption('Classic')}
            icon={<ChessPawnIcon height={25} width={25} className={currentOption === 'Classic' ? 'text-b1' : 'text-border'} />}
          />
          <RoundButton
            active={currentOption === 'Quick'}
            onPress={() => setCurrentOption('Quick')}
            icon={<PieChartIcon height={25} width={25} className={currentOption === 'Quick' ? 'text-b1' : 'text-border'} />}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fontOutline: {
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
})

function RoundButton({icon, onPress, active}: {icon: React.ReactNode; onPress?: () => void; active?: boolean}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`aspect-square items-center justify-center rounded-full border p-3.5 ${active ? 'border-b1' : 'border-border'}`}>
      {icon}
    </TouchableOpacity>
  )
}
