const filesCategories = ['avatar', 'image'] as const

type FileCategory = typeof filesCategories[number]

export { filesCategories, FileCategory }
