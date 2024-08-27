import {SemiBold} from '@/fonts'
import {ArrowIcon, StarIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import {Radial} from '@components/Gradient'
import {PaddingTop} from '@components/SafePadding'
import Screen from '@components/Screen'
import {Blue, Green, Red, Yellow} from '@utils/colors'
import React, {useMemo} from 'react'
import {Image, View} from 'react-native'
import type {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils'
import {MidBox, w} from './components/MidBox'
import {ArrowSpot, Plot1Data, Plot2Data, Plot3Data, Plot4Data, SafeSpots, StarSpots, startingPoints} from './plotData'

export default function Game() {
  return (
    <Screen Col={['#215962', '#0b1e22']}>
      <View className='flex-1 items-center justify-center'>
        <TopPart />
        <Board />
        <BottomPart />
      </View>
    </Screen>
  )
}

function TopPart() {
  return (
    <View className='flex-1'>
      <PaddingTop />
      <View className='mt-2'>
        <View className='flex-row items-center justify-between rounded-xl bg-white px-3 py-1 pl-1.5' style={{columnGap: 10}}>
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

function BottomPart() {
  return <View className='flex-1'></View>
}

function Board() {
  return (
    <View
      style={{
        height: w,
        width: w,
      }}
      className='flex-row flex-wrap justify-between'>
      <Home
        Col={Green}
        style={{
          borderTopLeftRadius: 40,
        }}
      />
      <VerticalBoxes cells={Plot2Data} color={Yellow[1]} />
      <Home
        Col={Yellow}
        style={{
          borderTopRightRadius: 40,
        }}
      />
      <HorizontalBoxes cells={Plot1Data} color={Green[1]} />
      <MidBox />
      <HorizontalBoxes cells={Plot3Data} color={Blue[1]} />
      <Home
        Col={Red}
        style={{
          borderBottomLeftRadius: 40,
        }}
      />
      <VerticalBoxes cells={Plot4Data} color={Red[1]} />
      <Home
        Col={Blue}
        style={{
          borderBottomRightRadius: 40,
        }}
      />
    </View>
  )
}

type HomeProps = {
  Col?: string[]
} & ViewProps
function Home({Col, style, ...props}: HomeProps) {
  return (
    <View
      className='aspect-square justify-center overflow-hidden'
      {...props}
      style={[
        {
          width: w * 0.4,
          height: w * 0.4,
          transform: [{scale: 0.95}],
          borderRadius: 20,
        },
        style,
      ]}>
      <Radial className='flex aspect-square h-full w-full items-center justify-center' Col={Col}>
        <View className='h-1/2 w-1/2 rounded-full bg-white' />
      </Radial>
    </View>
  )
}

type VerticalBoxesProps = {
  cells: number[]
  color: string
} & ViewProps

function VerticalBoxes({cells, color, ...props}: VerticalBoxesProps) {
  const groupedCells = useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 3) {
      groups.push(cells.slice(i, i + 3))
    }
    console.log({groups})
    return groups
  }, [cells])
  return (
    <View className='rounded-xl' style={{width: w * 0.2, height: w * 0.4}} {...props}>
      {groupedCells.map((cell, j) => (
        <View key={j} className='flex-1 flex-row items-center justify-center'>
          {cell.map((c, i) => (
            <Cell key={i} cell={c} i={i} color={color} />
          ))}
        </View>
      ))}
    </View>
  )
}

function HorizontalBoxes({cells, color, ...props}: VerticalBoxesProps) {
  const groupedCells = useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 6) {
      groups.push(cells.slice(i, i + 6))
    }
    console.log({groups})
    return groups
  }, [cells])
  return (
    <View className='rounded-xl' style={{width: w * 0.4, height: w * 0.2}} {...props}>
      {groupedCells.map((cell, j) => (
        <View key={j} className='flex-1 flex-row items-center justify-center'>
          {cell.map((c, i) => (
            <Cell key={i} cell={c} i={i} color={color} />
          ))}
        </View>
      ))}
    </View>
  )
}

type CellProps = {
  cell: number
  color: string
  i: number
} & ViewProps

function Cell({cell, id, color, ...props}: CellProps) {
  const isSafe = useMemo(() => SafeSpots.includes(cell), [cell])
  const isStar = useMemo(() => StarSpots.includes(cell), [cell])
  const isStarting = useMemo(() => startingPoints.includes(cell), [cell])
  const isArrow = useMemo(() => ArrowSpot.includes(cell), [cell])

  return (
    <View key={cell} className='flex-1 items-center justify-center' style={{padding: 1.5}}>
      <View
        className='h-full w-full flex-1 items-center justify-center'
        style={{borderRadius: 5, backgroundColor: isStar ? '#ffffff55' : isSafe ? color : 'white'}}>
        {isStar && <StarIcon width={w * 0.04} height={w * 0.04} color={'white'} transform={[{rotate: '20deg'}]} />}
        {isStarting && <StarIcon width={w * 0.04} height={w * 0.04} color={'white'} transform={[{rotate: '20deg'}]} />}
        {isArrow && <ArrowIcon width={w * 0.04} height={w * 0.04} color={color} style={getRotatedArrowStyle(cell)} />}
        {/* <Medium
          className='text-xs'
          style={[
            {
              color: isSafe ? 'white' : color,
            },
            StyleSheet.absoluteFillObject,
          ]}>
          {cell}
        </Medium> */}
      </View>
    </View>
  )
}

function getRotatedArrowStyle(i: number) {
  if (i === 38) return {transform: [{rotate: '90deg'}]}
  else if (i === 25) return {transform: [{rotate: '0deg'}]}
  else if (i === 51) return {transform: [{rotate: '180deg'}]}
  else return {transform: [{rotate: '-90deg'}]}
}
