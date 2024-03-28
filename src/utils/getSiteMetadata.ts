'use server'
import cheerio from 'cheerio'

function formatPath(path: string) {
   return path.startsWith('/') ? path : `/${path}`
}

function getFullUrl(domain: URL, src: string) {
   if (src.includes('localhost')) {
      const [_, path] = src.split('localhost')
      return `${domain.origin}${formatPath(path)}`
   }

   if (src.startsWith('http')) {
      return src
   }

   if (src.startsWith('//')) {
      return `${domain.protocol}${src}`
   }

   return `${domain.origin}${formatPath(src)}`
}

function extractMetadata(url: URL, body: string) {
   /**
    * Title
    */
   const $ = cheerio.load(body)
   const title =
      $('title').text() ||
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="title"]').attr('content')

   /**
    * Favicon
    */
   const faviconPath =
      $('link[rel="icon"]').prop('href') ??
      $('link[rel="shortcut icon"]').prop('href') ??
      'favicon.ico'

   const favicon = getFullUrl(url, faviconPath)

   /**
    * OG Image
    */
   const ogImagePath =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[property="og:image:url"]').attr('content')

   const ogImage = ogImagePath ? getFullUrl(url, ogImagePath) : ''

   return {
      title,
      ogImage,
      favicon,
   }
}

export async function getSiteMetadata(url: string) {
   try {
      const response = await fetch(url)
      const body = await response.text()
      const metadata = extractMetadata(new URL(url), body)

      return {
         id: 1,
         title: metadata.title,
         url,
         icon: metadata.favicon,
         image: metadata.ogImage,
      }
   } catch {
      return null
   }
}
