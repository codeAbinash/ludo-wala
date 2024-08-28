import {image} from '@/image'
import type {User} from '@query/api'
import {getShareText} from './constants'
import Share from 'react-native-share'
import {Linking} from 'react-native'

export function getTotal(s1: string, s2: string, s3: string) {
  return (parseFloat(s1) + parseFloat(s2) + parseFloat(s3)).toFixed(2)
}

export function print(data: any) {
  console.log(JSON.stringify(data, null, 2))
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
