import {StarIcon, ArrowIcon} from '@assets/icons/icons'
import {useMemo} from 'react'
import {type ViewProps, View} from 'react-native'
import {SafeSpots, StarSpots, startingPoints, ArrowSpot} from '../plotData'
import {w} from './MidBox'
import React from 'react'

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

export default React.memo(Cell)
