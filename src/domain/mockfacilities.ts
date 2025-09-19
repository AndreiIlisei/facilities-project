export type MockFacility = {
  name: string
  address: string
  description?: string
  imageUrl?: string
  openingTime: string
  closingTime: string
}
export const mockFacilities: MockFacility[] = [
  {
    name: 'Royal Copenhagen Golf Club',
    address: '456 Golf Lane, Aarhus, Denmark',
    description:
      'Championship course with lush greenery and scenic landscapes. Features the famous gold-rimmed clubhouse.',
    imageUrl:
      'https://lecoingolf.fr/wp-content/uploads/2019/11/Parcours-de-golf-18-trous-Golf-du-Mont-Saint-Jean-768x501.jpg',
    openingTime: '08:00',
    closingTime: '21:00',
  },
  {
    name: 'Golden Valley Golf Resort',
    address: '123 Fairway Drive, Copenhagen, Denmark',
    description:
      'Luxury resort with golden hour views and expert coaching programs. Premium dining facilities.',
    imageUrl:
      'https://images.unsplash.com/photo-1629596545782-775f0792dbc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdvbGZpbmd8ZW58MHx8MHx8fDA%3D',
    openingTime: '09:00',
    closingTime: '22:00',
  },
  {
    name: 'Sunrise Golf Park',
    address: '12 Golfvej, Copenhagen, Denmark',
    description:
      'Perfect for both beginners and seasoned golfers. Beautiful sunrise views over water hazards.',
    imageUrl:
      'https://images.unsplash.com/photo-1443706340763-4b60757a36ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGdvbGZpbmd8ZW58MHx8MHx8fDA%3D',
    openingTime: '07:30',
    closingTime: '20:30',
  },
  {
    name: 'Nordic Highlands Golf Course',
    address: '88 Mountain View Rd, Silkeborg, Denmark',
    description:
      'Challenging mountain course with elevated greens and panoramic views of Danish countryside.',
    imageUrl:
      'https://images.unsplash.com/photo-1629596783568-29441e5d8632?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    openingTime: '08:30',
    closingTime: '19:30',
  },
  {
    name: 'Coastal Links Golf Club',
    address: '245 Seaside Boulevard, Skagen, Denmark',
    description:
      'Links-style course along the coastline with challenging wind conditions and ocean views.',
    imageUrl:
      'https://images.unsplash.com/photo-1635328800844-0e68e80ab258?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    openingTime: '07:00',
    closingTime: '21:30',
  },
  {
    name: 'Heritage Golf & Country Club',
    address: '156 Historic Lane, Roskilde, Denmark',
    description:
      'Historic course established in 1896 with traditional Scottish design and mature oak trees.',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1680006709032-c7ea4351dfc0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    openingTime: '08:00',
    closingTime: '20:00',
  },
  {
    name: 'Danish Open Golf Center',
    address: '78 Championship Way, Aalborg, Denmark',
    description:
      'Tournament-ready course that hosts professional events. Features gold-standard maintenance.',
    imageUrl:
      'https://images.unsplash.com/photo-1662329726775-a1a976939687?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    openingTime: '07:45',
    closingTime: '21:15',
  },
]
