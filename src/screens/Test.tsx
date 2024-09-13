import {Medium} from '@/fonts'
import {Radial} from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import {ls, secureLs} from '@utils/storage'
import type {NavProp} from '@utils/types'
import React, {useEffect, useMemo, useState} from 'react'
import {TouchableOpacity, View} from 'react-native'
import type {TouchableOpacityProps} from 'react-native-gesture-handler'

import {io, type Socket} from 'socket.io-client'
import Dice from './Game/components/Dice'

export default function Test({navigation}: NavProp) {
  return (
    <View className='flex-1'>
      <PaddingTop />
      <Radial>
        <View className='items-center justify-center p-5' style={{gap: 10}}>
          <Medium className='text-white'>Test</Medium>
          <DiceBox title='Dice 1' diceId={1} />
          <DiceBox title='Dice 2' diceId={2} />
          <DiceBox title='Dice 3' diceId={3} />
          <DiceBox title='Dice 4' diceId={4} />
        </View>
      </Radial>
      <PaddingBottom />
    </View>
  )
}

type DiceProps = {
  title: string
  diceId: number
} & TouchableOpacityProps

function DiceBox({title, diceId: playerId, ...props}: DiceProps) {
  const [value, setValue] = React.useState(0)
  const token = useMemo(() => 'Bearer ' + secureLs.getString('token'), [])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    console.log(token)
    const s = io('ws://192.168.29.220:3000', {
      // const socket = io("http://socket.ludowalagames.com:3000", {
      reconnectionDelayMax: 10000,
      auth: {token: token},
    })

    s.on('connect', console.log)
    s.on('fail', console.log)
    s.on('message', console.log)
    s.on('error', console.log)
    s.on('connect_error', console.log)

    setSocket(s)

    return () => {
      s.close()
    }
  }, [token])

  const handlePress = () => {
    if (socket) {
      socket.emit('sendMessage', {
        playerId,
        type: 'diceRoll',
      })
    }
  }
  return (
    <TouchableOpacity
      className='h-28 w-28 items-center justify-center rounded-xl bg-red-500'
      onPress={handlePress}
      {...props}>
      <Medium className='text-white'>{title}</Medium>
      <Medium className='text-white'>{value}</Medium>
      <Dice diceNo={0} key={55} />
    </TouchableOpacity>
  )
}
