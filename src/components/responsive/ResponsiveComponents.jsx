import React from 'react'

/**
 * ResponsiveContainer - A mobile-first responsive container wrapper
 * Automatically handles padding, margins, and responsive sizing
 */
export default function ResponsiveContainer({ 
  children, 
  className = '',
  fullHeight = false,
  noPadding = false,
  gapResponsive = false 
}) {
  return (
    <div 
      className={`
        w-full
        ${fullHeight ? 'h-screen sm:h-auto' : 'auto'}
        ${noPadding ? '' : 'px-4 sm:px-6 md:px-8 lg:px-12'}
        ${noPadding ? '' : 'py-3 sm:py-4 md:py-6 lg:py-8'}
        ${gapResponsive ? 'gap-3 sm:gap-4 md:gap-6 lg:gap-8' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/**
 * ResponsiveGrid - Mobile-first grid component
 */
export function ResponsiveGrid({ 
  children, 
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'responsive',
  className = ''
}) {
  const gapClass = gap === 'responsive' ? 'gap-3 sm:gap-4 md:gap-6 lg:gap-8' : `gap-${gap}`
  
  return (
    <div 
      className={`
        grid
        grid-cols-${cols.xs}
        sm:grid-cols-${cols.sm}
        md:grid-cols-${cols.md}
        lg:grid-cols-${cols.lg}
        ${gapClass}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/**
 * ResponsiveStack - Flex stack that switches from column to row
 */
export function ResponsiveStack({ 
  children, 
  direction = 'col', // 'col' | 'row'
  className = '',
  gap = 'responsive',
  align = 'start',
  justify = 'start'
}) {
  const gapClass = gap === 'responsive' ? 'gap-3 sm:gap-4 md:gap-6' : `gap-${gap}`
  const dirClass = direction === 'row' ? 'flex-col sm:flex-row' : 'flex-col'
  
  return (
    <div 
      className={`
        flex
        ${dirClass}
        items-${align}
        justify-${justify}
        ${gapClass}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

/**
 * ResponsiveText - Text with responsive sizing
 */
export function ResponsiveText({ 
  children, 
  variant = 'base', // 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  className = ''
}) {
  const sizeMap = {
    'sm': 'text-responsive-sm',
    'base': 'text-responsive-base',
    'lg': 'text-responsive-lg',
    'xl': 'text-responsive-xl',
    '2xl': 'text-responsive-2xl',
    '3xl': 'text-responsive-3xl'
  }
  
  return (
    <p className={`${sizeMap[variant] || sizeMap.base} ${className}`}>
      {children}
    </p>
  )
}

/**
 * ResponsiveButton - Touch-friendly button with minimum 44x44px
 */
export function ResponsiveButton({ 
  children, 
  onClick, 
  disabled = false,
  className = '',
  variant = 'primary'
}) {
  const variantClass = {
    'primary': 'bg-indigo-500 hover:bg-indigo-600 text-white',
    'secondary': 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    'outline': 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50'
  }[variant] || variantClass.primary
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        touch-target
        px-4 py-3 sm:px-6 sm:py-4
        rounded-lg
        font-medium
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClass}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

/**
 * MobileMenu - Mobile-friendly menu component
 */
export function MobileMenu({ 
  isOpen = false, 
  onClose, 
  children,
  className = ''
}) {
  if (!isOpen) return null
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={`
        fixed
        inset-y-0
        right-0
        w-64 max-w-[90vw]
        bg-white
        shadow-lg
        z-50
        overflow-y-auto
        ${className}
      `}>
        {children}
      </div>
    </>
  )
}

/**
 * SafeAreaView - Respects device safe areas
 */
export function SafeAreaView({ children, className = '' }) {
  return (
    <div className={`
      pt-safe-top
      pb-safe
      pl-safe-left
      pr-safe-right
      ${className}
    `}>
      {children}
    </div>
  )
}
