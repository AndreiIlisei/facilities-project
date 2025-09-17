export interface Facility {
  id: string
  name: string
  address: string
  description?: string
  imageUrl?: string
  openingTime: string // "HH:mm"
  closingTime: string // "HH:mm"
  isDefault: boolean
  createdAt: number
  updatedAt: number
}
