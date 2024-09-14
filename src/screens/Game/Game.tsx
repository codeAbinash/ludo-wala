import {Medium, SemiBold} from '@/fonts'
import {playSound} from '@/helpers/SoundUtility'
import {socketStore} from '@/zustand/socketStore'
import Animations from '@assets/animations/animations'
import Images from '@assets/images/images'
import {Radial} from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import Wrap from '@components/Screen'
import {join_tournament_room, type InitialState} from '@query/api'
import {useMutation} from '@tanstack/react-query'
import {GRADS} from '@utils/colors'
import {webSocketLink} from '@utils/constants'
import {H} from '@utils/dimensions'
import {secureLs} from '@utils/storage'
import {delay} from '@utils/utils'
import LottieView from 'lottie-react-native'
import React, {useEffect, useMemo, useState} from 'react'
import {Alert, Image, View} from 'react-native'
import {io} from 'socket.io-client'
import HomeBox from './components/Home'
import {MidBox, w} from './components/MidBox'
import {HorizontalBoxes, VerticalBoxes} from './components/Path'
import Player from './components/Player'
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data, turningPoints, victoryStart} from './plotData'
import gameStore, {type Num} from './zustand/gameStore'
import type {PlayerState} from './zustand/initialState'

export type Message = {
  diceRolled?: DiceRolled
  tokenMoved?: TokenMoved
}

export type DiceRolled = {
  diceValue: number
  playerId: number
}
export type TokenMoved = {
  playerId: number
  position: number
  tokenId: string
  travelCount: number
  nextTurn: Num
}

const setDiceRolling = gameStore.getState().setIsDiceRolling
const setDiceTouchDisabled = gameStore.getState().setIsTouchDisabled
const setDiceNo = gameStore.getState().setDiceNumber
const setChancePlayer = gameStore.getState().setChancePlayer
const setTokenSelection = gameStore.getState().enableTokenSelection

function getInitialPositions(data: InitialState[]): PlayerState[] {
  const positions: PlayerState[] = []

  for (const token of data) {
    const newToken: PlayerState = {
      id: token.tokenId,
      pos: token.position,
      travelCount: token.travelCount,
      player: token.playerId as Num,
    }
    positions.push(newToken)
  }

  return positions
}

export default function Game() {
  const token = useMemo(() => 'Bearer ' + secureLs.getString('token'), [])
  const setSocket = socketStore((state) => state.setSocket)
  const [isConnected, setIsConnected] = useState(false)
  const setPlayersData = gameStore((state) => state.setPlayersData)
  const setCurrentPositions = gameStore((state) => state.updateCurrentPositions)

  const {isPending, isError, mutate} = useMutation({
    mutationKey: ['joinTournamentRoom'],
    mutationFn: join_tournament_room,
    onSuccess: (data) => {
      if (!data.status) return Alert.alert('Error', data.message)
      gameStore.getState().setMyId(data.playerId as Num) // Directly set the player id
      setChancePlayer(data.currentTurn) // Set the current turn
      data.events && data.events.length && setCurrentPositions(getInitialPositions(data.events))
      console.log(JSON.stringify(data, null, 2))
      setPlayersData(data.players)
    },
  })
  useEffect(() => {
    mutate()
    // const s = io('ws://192.168.21.12:3000', {
    const s = io(webSocketLink, {
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
      auth: {token: token, roomType: 'tournament'},
    })

    s.on('connect', () => {
      setSocket(s)
      setIsConnected(true)
    })
    s.on('fail', console.log)
    s.on('message', async (message: Message) => {
      if (message.diceRolled) handelDiceRoll(message.diceRolled)
      if (message.tokenMoved) handelTokenMove(message.tokenMoved)
      console.log(message)
    })
    s.on('error', (e) => {
      Alert.alert('Error', e)
      console.log(e)
    })
    s.on('connect_error', (e) => {
      Alert.alert('Error', e.toString())
      console.log(JSON.stringify(e, null, 2))
    })
    s.on('disconnect', () => {
      console.log('Disconnected')
      setIsConnected(false)
    })

    setSocket(s)

    return () => {
      s.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <View className='flex-1'>
      <View className={`${isConnected && !isPending ? 'flex-0' : 'flex-1'}`}>
        <Radial className='flex-1 justify-center'>
          <LottieView source={Animations.connecting} autoPlay loop style={{height: H / 4, width: '100%'}} />
          <SemiBold className='text-center text-xl text-white'>Connecting...</SemiBold>
          <Medium className='mt-3 text-center text-white/70'>Please wait while we connect you to the server</Medium>
        </Radial>
      </View>
      <View className={`${isConnected && !isPending ? 'flex-1' : 'flex-0'}`}>
        <Wrap Col={['#215962', '#0b1e22']}>
          <PaddingTop />
          <View className='flex-1 items-center justify-between'>
            <FirstPrice />
            <View>
              <TopPart />
              <Board />
              <BottomPart />
            </View>
            <View className='pb-3'>
              {/* <Medium className='text-center text-white/70'>{getColor(player)}'s turn</Medium> */}
            </View>
          </View>
          <PaddingBottom />
        </Wrap>
      </View>
    </View>
  )
}

function FirstPrice() {
  return (
    <View className='w-full flex-row justify-between px-3'>
      <View style={{flex: 0.5}}></View>
      <View className='mt-2 flex-1 flex-row'>
        <View
          className='mx-auto flex-row items-center justify-between rounded-xl bg-white px-3 py-1 pl-1.5'
          style={{columnGap: 10}}>
          <Image source={Images.trophy} style={{width: 40, height: 40}} />
          <View>
            <SemiBold className='text-blue-600'>1st Prize</SemiBold>
            <SemiBold className='text-base text-blue-600'>₹1 Crore</SemiBold>
          </View>
        </View>
      </View>
      <View style={{flex: 0.5}} className='flex-row justify-end'>
        <Medium>Menu</Medium>
      </View>
    </View>
  )
}

function TopPart() {
  const p1 = gameStore((state) => state.player0)
  const p2 = gameStore((state) => state.player1)
  return (
    <View className='w-full justify-between'>
      <View className='flex-row justify-between'>
        <Player name='Abinash' life={2} player={0} data={p1} />
        <Player name='Sudipto' life={3} reversed player={1} data={p2} />
      </View>
    </View>
  )
}

function BottomPart() {
  const p3 = gameStore((state) => state.player2)
  const p4 = gameStore((state) => state.player3)
  return (
    <View className=''>
      <View className='flex-row justify-between'>
        <Player life={2} name='Sujal' bottom player={3} data={p4} />
        <Player name='Raju' life={2} reversed bottom player={2} data={p3} />
      </View>
    </View>
  )
}

function Board() {
  // const handlePress = () => {
  //   if (socket) {
  //     socket.emit('sendMessage', {
  //       playerId,
  //       type: 'diceRoll',
  //     })
  //   }
  // }
  return (
    <>
      <View style={{height: w, width: w}} className='mx-auto flex-row flex-wrap justify-between'>
        <HomeBox style={{borderTopLeftRadius: 40}} no={0} />
        <VerticalBoxes cells={Plot2Data} color={GRADS[1]![1]!} />
        <HomeBox style={{borderTopRightRadius: 40}} no={1} />
        <HorizontalBoxes cells={Plot1Data} color={GRADS[0]![1]!} />
        <MidBox />
        <HorizontalBoxes cells={Plot3Data} color={GRADS[2]![1]!} />
        <HomeBox style={{borderBottomLeftRadius: 40}} no={3} />
        <VerticalBoxes cells={Plot4Data} color={GRADS[3]![1]!} />
        <HomeBox style={{borderBottomRightRadius: 40}} no={2} />
      </View>
    </>
  )
}

async function handelTokenMove(data: TokenMoved) {
  setTokenSelection(-1) // Disable token selection
  setDiceTouchDisabled(true)

  if (data.playerId === gameStore.getState().myId && data.travelCount !== 0) {
    setChancePlayer(data.nextTurn)
    return
  }

  const currentPositions = gameStore.getState().currentPositions
  const setCurrentPositions = gameStore.getState().updateCurrentPositions
  const player = data.playerId as Num
  const tokenId = data.tokenId
  const newTravelCount = data.travelCount
  const token = currentPositions.find((t) => t.id === tokenId)
  if (!token) return
  const travelCount = token.travelCount
  const travelDiff = newTravelCount - travelCount

  if (newTravelCount === 0) {
    console.log('Token killed')
    playSound('collide')
    for (let i = 0; i < travelCount; i++) {
      token.pos -= 1
      token.travelCount -= 1
      if (token.pos === 0) token.pos = 52
      setCurrentPositions([...currentPositions])
      await delay(0)
    }
  }

  for (let i = 0; i < travelDiff; i++) {
    playSound('token_move')
    token.pos += 1
    token.travelCount += 1
    if (token.pos === turningPoints[player]) token.pos = victoryStart[player]!
    if (token.pos === 53) token.pos = 1
    setCurrentPositions([...currentPositions])
    await delay(__DEV__ ? 0 : 150)
  }

  // Check for victory
  if (token.travelCount === 56) {
    playSound('home_win')
    // Remove the token from the board
    currentPositions.splice(
      currentPositions.findIndex((t) => t.id === token.id),
      1,
    )
    setCurrentPositions([...currentPositions])
    // setChancePlayer(data.nextTurn)
  }

  // Check if the chance is of the player who moved the token
  // if (travelDiff === 6) return setChancePlayer(player)
  // else setChancePlayer(data.nextTurn)
  setChancePlayer(data.nextTurn)
}

async function handelDiceRoll(data: DiceRolled) {
  const newDiceNo = data.diceValue
  setDiceRolling(true)
  setDiceTouchDisabled(true)
  playSound('dice_roll')
  // await delay(0)
  setDiceRolling(false)
  setDiceNo(newDiceNo)

  if (data.playerId === gameStore.getState().myId) {
    setTokenSelection(gameStore.getState().myId)
  }

  // const isAnyTokenAlive = currentPositions.findIndex((t) => t.pos !== 57 && t.player === player) !== -1
  // // const isAnyTokenLocked = currentPositions.findIndex((t) => t.pos === 0)

  // // If there is not any token alive then change the turn
  // if (!isAnyTokenAlive) return setChancePlayer(getNextTurn(turn))

  // const canMove = isMovePossible(currentPositions, newDiceNo, player)

  // // If it can move then move the token
  // if (canMove) {
  //   // Logic to move the dice
  //   /**
  //    * -------------------
  //    * -------------------
  //    * -------------------
  //    * -------------------
  //    */
  //   // ToastAndroid.show('Token can move', ToastAndroid.SHORT)
  //   enableTokenSelection(player)
  //   // Enable Token selection and return
  //   return
  // } else {
  //   // If it is 6 then try again
  //   if (newDiceNo === 6) return setChancePlayer(player)
  //   // If it can't move then change the turn
  //   setChancePlayer(getNextTurn(turn))
  // }
}
