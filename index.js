#!/usr/bin/env node

const axios = require('axios')
const sharp = require('sharp')
const base64url = require('base64url')
const NodeCache = require('node-cache')
const express = require('express')
const cors = require('cors')
const app = express()

const secondsPerDay = 60 * 60 * 24

const cache = new NodeCache({ stdTTL: 7 * secondsPerDay, checkperiod: 120 })

const createInfo = require('./info')
const createManifest = require('./manifest')

app.use(cors())

const port = 8989
const baseUrl = `http://localhost:${port}`

// const idToImageUrl = (id) => decodeURIComponent(id)
const idToImageUrl = (id) => base64url.decode(id)

async function imageDimensions (imageUrl) {
  return new Promise(async (resolve, reject) => {
    let dimensions = cache.get(imageUrl)

    if (!dimensions) {
      const metaReader = sharp()

      metaReader
        .metadata()
        .then((info) => {
          const {width, height} = info
          dimensions = [width, height]

          cache.set(imageUrl, dimensions)
          resolve(dimensions)
        })
        .catch(reject)

      try {
        const response = await axios({
          method: 'get',
          url: imageUrl,
          responseType: 'stream'
        })

        const stream = response.data
        stream.pipe(metaReader)
      } catch (err) {
        // console.error(err)
      }
    } else {
      resolve(dimensions)
    }
  })
}

app.get('/m/:id/manifest', async (req, res) => {
  const id = req.params.id
  const imageUrl = idToImageUrl(id)
  const [width, height] = await imageDimensions(imageUrl)

  res.send(createManifest(baseUrl, id, width, height))
})

app.get('/:id/info.json', async (req, res) => {
  const id = req.params.id
  const imageUrl = idToImageUrl(id)
  const [width, height] = await imageDimensions(imageUrl)

  res.send(createInfo(baseUrl, id, width, height))
})

app.get('/:id/:region/:size/:rotation/default.jpg', async (req, res) => {
  const id = req.params.id
  const imageUrl = idToImageUrl(id)

  res.redirect(imageUrl)
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
