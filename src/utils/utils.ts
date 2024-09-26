import {image} from '@/image'
import type {User} from '@query/api'
import type {Num} from '@screens/Game/zustand/gameStore'
import {Linking} from 'react-native'
import {OneSignal} from 'react-native-onesignal'
import Share from 'react-native-share'
import {getShareText, ONESIGNAL_APP_ID} from './constants'

export function getTotal(s1: string, s2: string, s3: string) {
  return (parseFloat(s1) + parseFloat(s2) + parseFloat(s3)).toFixed(2)
}

export function print(...data: any[]) {
  for (const d of data) {
    if (typeof d === 'object') console.log(JSON.stringify(d, null, 2))
    else console.log(d)
  }
}

export function stylishDate(date: Date) {
  return new Date(date).toLocaleTimeString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

export function open(link: string) {
  Linking.openURL(link)
}

export function refer(user: User | null) {
  const shareOptions = {
    title: 'Invite your friends',
    message: getShareText(user?.data?.referCode || ''),
    url: image,
  }

  Share.open(shareOptions)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      err && console.log(err)
    })
}

/**
 * Returns a random number between 1 and 6
 */
export function randomNumber() {
  return Math.floor(Math.random() * 6) + 1
}

/**
 * Returns a random number between 0 and 3
 */
export function random3() {
  return Math.floor(Math.random() * 3)
}

export function getColor(player: number) {
  switch (player) {
    case 1:
      return 'Red'
    case 2:
      return 'Green'
    case 3:
      return 'Yellow'
    case 4:
      return 'Blue'
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function nFormatter(num: number) {
  let formatter = Intl.NumberFormat('en', {notation: 'compact'})
  return formatter.format(num)
}

export function getNextTurn(turn: number): Num {
  return turn + 1 > 3 ? 0 : ((turn + 1) as Num)
}

export function getPP(fname: string, lname: string) {
  return `https://avatar.iran.liara.run/username?username=${fname} ${lname}`
}

export function oneSignalInit() {
  OneSignal.initialize(ONESIGNAL_APP_ID)
}
