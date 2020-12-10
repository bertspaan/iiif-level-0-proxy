module.exports = (baseUrl, id, width, height) => ({
  '@context': 'http://iiif.io/api/image/2/context.json',
  '@id': `${baseUrl}/${id}`,
  width,
  height,
  sizes: [
    {
      width,
      height
    }
  ],
  profile: [
    'http://iiif.io/api/image/2/level0.json',
    {
      formats: [
        'jpg'
      ],
      qualities: [
        'default'
      ]
    }
  ],
  protocol: 'http://iiif.io/api/image'
})
