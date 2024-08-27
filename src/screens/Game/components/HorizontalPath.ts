import React, {useMemo} from 'react'
import {View} from 'react-native'

const HorizontalPath = React.memo(({cells, color}: {cells: number[]; color: string}) => {
  const groupedCells = useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 6) {
      groups.push(cells.slice(i, i + 6))
    }
    return groups
  }, [cells])

  return (
    // <View
    //   style={{
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     width: '40%',
    //     height: '100%',
    //   }}>
    //   <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
    //     {groupedCells.map((group, groupIndex) => (
    //       <View key={`group-${groupIndex}`} style={{flexDirection: 'row', width: '16.7%', height: '33.7%'}}>
    //         {group.map((id) => (
    //           // <Cell cell={true} key={`cell-${id}`} id={id} color={color} />
    //           <View />
    //         ))}
    //       </View>
    //     ))}
    //   </View>
    // </View>
    null
  )
})

export default HorizontalPath
