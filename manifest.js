module.exports = (baseUrl, id, width, height) => ({
  '@context': 'http://iiif.io/api/presentation/2/context.json',
  '@type': 'sc:Manifest',
  '@id': `${baseUrl}/m/${id}/manifest`,
  sequences: [
    {
      '@type': 'sc:Sequence',
      canvases: [
        {
          '@id': `${baseUrl}/m/${id}/canvas/c1`,
          '@type': 'sc:Canvas',
          images: [
            {
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': `${baseUrl}/${id}/full/!1024,1024/0/default.jpg`,
                '@type': 'dctypes:Image',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': `${baseUrl}/${id}`,
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  protocol: 'http://iiif.io/api/image'
                },
                format: 'image/jpeg',
                width,
                height
              },
              on: `${baseUrl}/m/${id}/canvas/c1`
            }
          ],
          width,
          height
        }
      ]
    }
  ]
})
