const uiConfig = {
  variants: {
    default: {
      text: "text-neutral-100",
      textLessContrast: "text-neutral-400",
      textMoreContrast: "text-neutral-50",

      bg: "bg-neutral-800",
      bgLessContrast: "bg-neutral-700",
      bgMoreContrast: "bg-neutral-900",

      bgHover: "hover:bg-neutral-700",
      bgHoverLessContrast: "hover:bg-neutral-600",
      bgHoverMoreContrast: "hover:bg-neutral-800",

      bgActive: "active:bg-neutral-600",
      bgActiveLessContrast: "active:bg-neutral-500",
      bgActiveMoreContrast: "active:bg-neutral-700",

      border: "border border-neutral-700",
      borderLessContrast: "border border-neutral-600",
      borderMoreContrast: "border border-neutral-800",

      focus: "focus:outline-none focus:ring-2 focus:ring-blue-500/50",

      accent: "accent-blue-500",
    },

    primary: {
      text: "text-blue-100",
      textLessContrast: "text-blue-400",
      textMoreContrast: "text-blue-50",

      bg: "bg-blue-500",
      bgLessContrast: "bg-blue-400",
      bgMoreContrast: "bg-blue-600",

      bgHover: "hover:bg-blue-600",
      bgHoverLessContrast: "hover:bg-blue-500",
      bgHoverMoreContrast: "hover:bg-blue-700",

      bgActive: "active:bg-blue-700",
      bgActiveLessContrast: "active:bg-blue-600",
      bgActiveMoreContrast: "active:bg-blue-800",

      border: "border border-blue-500",
      borderLessContrast: "border border-blue-400",
      borderMoreContrast: "border border-blue-600",

      focus: "focus:outline-none focus:ring-2 focus:ring-blue-500/50",

      accent: "accent-blue-500",
    },
  },

  sizes: {
    sm: {
      text: "text-sm font-medium",
      textSmaller: "text-xs font-medium",
      textBigger: "text-base font-medium",

      height: "h-9",
      heightSmall: "h-8",
      heightSmaller: "h-4",
      heightSmallest: "h-3",

      minHeight: "min-h-9",
      minHeightSmall: "min-h-8",
      minHeightSmaller: "min-h-4",
      minHeightSmallest: "min-h-3",

      width: "w-9",
      widthSmall: "w-8",
      widthSmaller: "w-4",
      widthSmallest: "w-3",

      rounding: "rounded",
      roundingMore: "rounded-lg",
      roundingLess: "rounded-sm",

      padding: {
        all: "p-3",
        top: "pt-3",
        right: "pr-3",
        bottom: "pb-3",
        left: "pl-3",
        x: "px-3",
        y: "py-3",
      },

      paddingSmaller: {
        all: "p-2",
        top: "pt-2",
        right: "pr-2",
        bottom: "pb-2",
        left: "pl-2",
        x: "px-2",
        y: "py-2",
      },

      paddingSmallest: {
        all: "p-1",
        top: "pt-1",
        right: "pr-1",
        bottom: "pb-1",
        left: "pl-1",
        x: "px-1",
        y: "py-1",
      },

      margin: {
        all: "m-3",
        top: "mt-3",
        right: "mr-3",
        bottom: "mb-3",
        left: "ml-3",
        x: "mx-3",
        y: "my-3",
      },

      marginSmaller: {
        all: "m-2",
        top: "mt-2",
        right: "mr-2",
        bottom: "mb-2",
        left: "ml-2",
        x: "mx-2",
        y: "my-2",
      },

      marginSmallest: {
        all: "m-1",
        top: "mt-1",
        right: "mr-1",
        bottom: "mb-1",
        left: "ml-1",
      },

      gap: {
        all: "gap-3",
        x: "gap-x-3",
        y: "gap-y-3",
      },

      gapSmaller: {
        all: "gap-2",
        x: "gap-x-2",
        y: "gap-y-2",
      },

      gapSmallest: {
        all: "gap-1",
        x: "gap-x-1",
        y: "gap-y-1",
      },

      spacing: {
        all: "space-3",
        x: "space-x-3",
        y: "space-y-3",
      },

      spacingSmaller: {
        all: "space-2",
        x: "space-x-2",
        y: "space-y-2",
      },

      spacingSmallest: {
        all: "space-1",
        x: "space-x-1",
        y: "space-y-1",
      },
    },
    md: {
      text: "text-base font-medium",
      textSmaller: "text-sm font-medium",
      textBigger: "text-lg font-medium",

      height: "h-12",
      heightSmall: "h-10",
      heightSmaller: "h-6",
      heightSmallest: "h-4",

      minHeight: "min-h-12",
      minHeightSmall: "min-h-10",
      minHeightSmaller: "min-h-6",
      minHeightSmallest: "min-h-4",

      width: "w-12",
      widthSmall: "w-10",
      widthSmaller: "w-6",
      widthSmallest: "w-4",

      rounding: "rounded",
      roundingMore: "rounded-lg",
      roundingLess: "rounded-sm",

      padding: {
        all: "p-4",
        top: "pt-4",
        right: "pr-4",
        bottom: "pb-4",
        left: "pl-4",
        x: "px-4",
        y: "py-4",
      },

      paddingSmaller: {
        all: "p-2.5",
        top: "pt-2.5",
        right: "pr-2.5",
        bottom: "pb-2.5",
        left: "pl-2.5",
        x: "px-2.5",
        y: "py-2.5",
      },

      paddingSmallest: {
        all: "p-1",
        top: "pt-1",
        right: "pr-1",
        bottom: "pb-1",
        left: "pl-1",
        x: "px-1",
        y: "py-1",
      },

      margin: {
        all: "m-4",
        top: "mt-4",
        right: "mr-4",
        bottom: "mb-4",
        left: "ml-4",
        x: "mx-4",
        y: "my-4",
      },

      marginSmaller: {
        all: "m-2",
        top: "mt-2",
        right: "mr-2",
        bottom: "mb-2",
        left: "ml-2",
        x: "mx-2",
        y: "my-2",
      },

      marginSmallest: {
        all: "m-1",
        top: "mt-1",
        right: "mr-1",
        bottom: "mb-1",
        left: "ml-1",
      },

      gap: {
        all: "gap-4",
        x: "gap-x-4",
        y: "gap-y-4",
      },

      gapSmaller: {
        all: "gap-2",
        x: "gap-x-2",
        y: "gap-y-2",
      },

      gapSmallest: {
        all: "gap-1",
        x: "gap-x-1",
        y: "gap-y-1",
      },

      spacing: {
        all: "space-4",
        x: "space-x-4",
        y: "space-y-4",
      },

      spacingSmaller: {
        all: "space-2",
        x: "space-x-2",
        y: "space-y-2",
      },

      spacingSmallest: {
        all: "space-1",
        x: "space-x-1",
        y: "space-y-1",
      },
    },
  },
} as const

export type Sizes = keyof typeof uiConfig.sizes
export type Variants = keyof typeof uiConfig.variants

export default uiConfig
