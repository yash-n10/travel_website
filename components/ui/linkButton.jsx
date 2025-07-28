// components/ui/link-button.jsx
import Link from 'next/link'
import { buttonVariants } from './button'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'

export function LinkButton({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  )
}

LinkButton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  // Add other Next.js Link props as needed
}