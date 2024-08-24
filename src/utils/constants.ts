import {Linking} from 'react-native'

export const APP_VERSION = '1.0'

export function getShareText(referCode: string) {
  return `Duniya Ka Pehla Ludo Tournament App! 🌍

Ludo ka asli maza pao bina paisa lagaye! Apne doston ko invite karo aur kamao 2% har deposit par.

Referral Code: ${referCode}

Download App : https://ludowala.co/download`
}

const mainLink = 'https://ludowala.co/'

export const contactLink = `${mainLink}contact/`
export const privacyLink = `${mainLink}privacy-policy/`
export const termsLink = `${mainLink}terms-and-conditions/`
export const aboutLink = `${mainLink}about-us/`
export const conductLink = `${mainLink}code-of-conduct/`
export const rateLink = `${mainLink}review/`
