// Imports
import { readdir } from "fs/promises";
import path from 'path';
import getPixels from "./modules/colorExtractor";

// Types
import { FinalColor } from "extract-colors/lib/types/Color";

// the directory where the images are located
const rootDir = `${import.meta.dir}/public`

// In order to manage callback functions that are called
// after colors are extracted we need to 'promisify' them
// then wait for all to finish, see below
let promises: Promise<FinalColor>[] = []

// name of the images
const fileList = await readdir(rootDir);

// for each file create a promise that extracts the colors
fileList.forEach(async (file) => {
  promises.push(getPixels(path.join(rootDir, file)))
})

// wait for all promises to resolve then write outputs to file
Promise.all(promises)
  .then(v => {
    const data = JSON.stringify(v)
    Bun.write('output/colors.json', data)
  })
