import {ArrowIcon, StarIcon} from '@assets/icons/icons'
import React, {useEffect, useMemo, useRef} from 'react'
import {type StyleProp, type ViewProps, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ArrowSpot, SafeSpots, StarSpots, startingPoints} from '../plotData'
import gameStore from '../zustand/gameStore'
import {w} from './MidBox'
import Pile from './Pile'
import {Medium} from '@/fonts'

type CellProps = {
  i: number
  cell: number
  color: string
} & ViewProps

const styles = StyleSheet.create({
  starStyle: {},
})

const starProps = {
  width: w * 0.05,
  height: w * 0.05,
  color: 'white',
  transform: [{rotate: '20deg'}],
  style: [{marginHorizontal: 'auto', marginVertical: 'auto'}] as StyleProp<ViewProps>,
}

function Cell({cell, i, color, ...props}: CellProps) {
  const id = i
  const isSafe = useMemo(() => SafeSpots.includes(cell), [cell])
  const isStar = useMemo(() => StarSpots.includes(cell), [cell])
  const isStarting = useMemo(() => startingPoints.includes(cell), [cell])
  const isArrow = useMemo(() => ArrowSpot.includes(cell), [cell])

  const chancePlayer = gameStore((state) => state.chancePlayer)

  const currentPositions = gameStore((state) => state.currentPositions)

  const picesAtThisCell = useMemo(() => currentPositions.filter((p) => p.pos === cell), [currentPositions, cell])
  const zIndex = useRef(100)

  useEffect(() => {
    // Reset the value of zIndex to 100 if the player is not the current player
    zIndex.current = 100
  }, [chancePlayer, picesAtThisCell])

  // useEffect(() => {
  //   console.log(picesAtThisCell)
  // }, [picesAtThisCell])

  return (
    <TouchableOpacity key={cell} className='flex-1 items-center justify-center' style={{padding: 1.5}}>
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
            <View className='relative flex-1 items-center justify-center'>
              <StarIcon {...starProps} />
            </View>
          </View>
        )}
        {isArrow && (
          <View className='absolute flex-1 items-center justify-center'>
            <ArrowIcon width={w * 0.04} height={w * 0.04} color={color} style={getRotatedArrowStyle(cell)} />
          </View>
        )}
        {picesAtThisCell.map((p, index) => {
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
                transform: [
                  {
                    scale: n > 1 ? 0.8 : 1,
                  },
                  {translateX},
                  {translateY},
                ],
                zIndex: p.player === chancePlayer ? 10000 : zIndex.current,
              }}>
              <Pile player={p.player} />
            </View>
          )
        })}

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
    </TouchableOpacity>
  )
}

function getRotatedArrowStyle(i: number) {
  if (i === 38) return {transform: [{rotate: '90deg'}]}
  else if (i === 25) return {transform: [{rotate: '0deg'}]}
  else if (i === 51) return {transform: [{rotate: '180deg'}]}
  else return {transform: [{rotate: '-90deg'}]}
}

export default React.memo(Cell)
