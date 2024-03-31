import * as ICONS from '@radix-ui/react-icons'
import type { IconProps } from '@radix-ui/react-icons/dist/types'

export const icons = Object.entries(ICONS).map(([value, component]) => {
   return {
      value,
      component,
   }
})

export type Icon = React.ForwardRefExoticComponent<
   IconProps & React.RefAttributes<SVGSVGElement>
>

export default ICONS as Record<string, Icon>
