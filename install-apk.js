const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')

const directory = 'android/app/build/outputs/apk/release'

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Unable to scan directory:', err)
    process.exit(1)
  }

  const apkFile = files.find((file) => file.endsWith('.apk'))

  if (!apkFile) {
    console.error('No APK file found in the directory')
    process.exit(1)
  }

  const apkPath = path.join(directory, apkFile)
  const command = `adb install -r "${apkPath}"`

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error installing APK:', err)
      process.exit(1)
    }

    console.log(stdout)
    console.error(stderr)
  })
})
