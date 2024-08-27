import React, {useMemo} from 'react'
import {type ViewProps, View} from 'react-native'
import Cell from './Cell'
import {w} from './MidBox'

type VerticalBoxesProps = {
  cells: number[]
  color: string
} & ViewProps

export const VerticalBoxes = React.memo(({cells, color, ...props}: VerticalBoxesProps) => {
  const groupedCells = useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 3) groups.push(cells.slice(i, i + 3))
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
})

export const HorizontalBoxes = React.memo(({cells, color, ...props}: VerticalBoxesProps) => {
  const groupedCells = useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 6) groups.push(cells.slice(i, i + 6))
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
})
