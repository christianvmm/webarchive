import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         keyframes: {
            reveal: {
               from: {
                  opacity: '0%',
               },
               to: {
                  opacity: '100%',
               },
            },
         },

         animation: {
            revealSm: 'reveal 0.8s cubic-bezier(0.5,-0.2,0.1,1.2) forwards',
            reveal: 'reveal 1.2s cubic-bezier(0.5,-0.2,0.1,1.3) forwards',
            revealMd: 'reveal 1.4s cubic-bezier(0.5,-0.2,0.1,1.4) forwards',
            revealLg: 'reveal 1.6s cubic-bezier(0.5,-0.2,0.1,1.5) forwards',
         },
      },
   },
   plugins: [],
}
export default config
