import Sound from 'react-native-sound'

Sound.setCategory('Playback')

export const playSound = (soundName: SoundName, loop = false, volume = 1) => {
  try {
    const soundPath = soundName
    const sound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error)
        return
      }
      sound.setNumberOfLoops(loop ? -1 : 0)
      sound.setVolume(volume)
      sound.play((success) => {
        sound.release()
      })
    })
  } catch (e) {
    console.log('Cannot play the sound file', e)
  }
}

// setTimeout(() => {
//   playSound('home', true, 0.2)
// }, 1000)

const sounds = [
  'dice_roll',
  'cheer',
  'game_start',
  'collide',
  'home_win',
  'token_move',
  'safe_spot',
  'ui',
  'home',
  'girl1',
  'girl2',
  'girl3',
]
type SoundName = (typeof sounds)[number]
