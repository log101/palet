const getPixels = require("get-pixels")
import { extractColors } from 'extract-colors'

const extractColorsFromFile = (src) => {
    return new Promise((res, rej) => getPixels(src, async (err, pixels) => {
        if (!err) {
            const data = [...pixels.data]
            const width = Math.round(Math.sqrt(data.length / 4))
            const height = width

            const color = await extractColors({ data, width, height })
            res(color)
        } else {
            rej(err)
        }
    }))
}


export default extractColorsFromFile
