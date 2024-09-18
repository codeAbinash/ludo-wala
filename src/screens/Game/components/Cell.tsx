import {ArrowIcon, StarIcon} from '@assets/icons/icons'
import React, {useEffect, useMemo, useRef} from 'react'
import {type StyleProp, type ViewProps, View} from 'react-native'
import {ArrowSpot, SafeSpots, StarSpots, startingPoints} from '../plotData'
import gameStore from '../zustand/gameStore'
import type {PlayerState} from '../zustand/initialState'
import positionsStore from '../zustand/positionsStore'
import {w} from './MidBox'
import Token from './Token'

type CellProps = {
  i: number
  cell: number
  color: string
} & ViewProps

const starProps = {
  width: w * 0.05,
  height: w * 0.05,
  color: 'white',
  transform: [{rotate: '20deg'}],
  style: [{marginHorizontal: 'auto', marginVertical: 'auto'}] as StyleProp<ViewProps>,
}

function Cell({cell, i, color, ...props}: CellProps) {
  const isSafe = SafeSpots.includes(cell)
  const isStar = StarSpots.includes(cell)
  const isStarting = startingPoints.includes(cell)
  const isArrow = ArrowSpot.includes(cell)
  const {chancePlayer, tokenSelection} = gameStore((state) => ({
    chancePlayer: state.chancePlayer,
    tokenSelection: state.tokenSelection,
  }))

  const currentPositions = positionsStore((state) => state.currentPositions)

  const arrowStyle = useMemo(() => getRotatedArrowStyle(cell), [cell])
  const picesAtThisCell = useMemo(() => currentPositions.filter((p) => p.pos === cell), [currentPositions, cell])
  const zIndex = useRef(100)

  useEffect(() => {
    zIndex.current = 100
  }, [chancePlayer, picesAtThisCell])

  return (
    <View key={cell} className='flex-1 items-center justify-center' style={{padding: 1.5}} {...props}>
      <View
        className='relative h-full w-full flex-1 items-center justify-center'
        style={{borderRadius: 5, backgroundColor: isStar ? '#ffffff55' : isSafe ? color : 'white'}}>
        {isStar && (
          <View className='absolute'>
            <StarIcon {...starProps} />
          </View>
        )}
        {isStarting && (
          <View className='absolute'>
            {/* <View className='relative flex-1 items-center justify-center'> */}
            <StarIcon {...starProps} />
            {/* </View> */}
          </View>
        )}
        {isArrow && (
          // <View className='absolute flex-1 items-center justify-center'>
          <View className='absolute'>
            <ArrowIcon width={w * 0.04} height={w * 0.04} color={color} style={arrowStyle} />
          </View>
        )}
        {picesAtThisCell.map((p, index) => (
          <TokenContainer
            key={p.id}
            p={p}
            picesAtThisCell={picesAtThisCell}
            zIndex={zIndex}
            tokenSelection={tokenSelection}
            index={index}
          />
        ))}
        {/* <Medium
          className='text-center text-xs'
          style={[
            {
              zIndex: 10000,
              color: isSafe ? 'white' : color,
            },
          ]}>
          {cell}
        </Medium> */}
      </View>
    </View>
  )
}

type TokenContainerProps = {
  picesAtThisCell: PlayerState[]
  zIndex: React.MutableRefObject<number>
  tokenSelection: number
  index: number
  p: PlayerState
}

const TokenContainer = React.memo(({picesAtThisCell, zIndex, tokenSelection, index, p}: TokenContainerProps) => {
  const n = picesAtThisCell.length

  let translateX = 0
  let translateY = 0

  if (n > 1) {
    const angle = (index / n) * 2 * Math.PI
    const radius = w * 0.02
    translateX = radius * Math.cos(angle)
    translateY = radius * Math.sin(angle)
  }

  zIndex.current -= 1

  return (
    <View
      className='absolute items-center justify-center'
      key={p.id}
      style={{
        transform: [{scale: n > 1 ? 0.8 : 1}, {translateX}, {translateY}],
        zIndex: p.player === tokenSelection ? 10000 : zIndex.current,
      }}>
      <Token token={p} />
    </View>
  )
})

function getRotatedArrowStyle(i: number) {
  if (i === 38) return {transform: [{rotate: '90deg'}]}
  else if (i === 25) return {transform: [{rotate: '0deg'}]}
  else if (i === 51) return {transform: [{rotate: '180deg'}]}
  else return {transform: [{rotate: '-90deg'}]}
}

export default React.memo(Cell)
