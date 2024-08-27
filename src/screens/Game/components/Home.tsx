import {Radial} from '@components/Gradient'
import React from 'react'
import {type ViewProps, View} from 'react-native'
import {w} from './MidBox'

type HomeProps = {
  Col?: string[]
} & ViewProps
function HomeBox({Col, style, ...props}: HomeProps) {
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

export default React.memo(HomeBox)
