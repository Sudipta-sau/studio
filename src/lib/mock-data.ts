export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  isGuide: boolean;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  likes: number;
  comments: number;
  createdAt: string;
  location?: string;
};

export type Guide = {
    id: string;
    name: string;
    avatarUrl: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    bio: string;
    location: string;
}

export type ChatMessage = {
    id: string;
    sender: User;
    text: string;
    timestamp: string;
    reactions?: {[emoji: string]: number};
    replyTo?: string;
}

export type ChatRoom = {
    id: string;
    name: string;
    type: 'group' | 'direct';
    avatarUrl: string;
    unreadCount: number;
    lastMessage: string;
    lastMessageTime: string;
    messages: ChatMessage[];
    location?: string;
}

export const users: User[] = [
  { id: 'u1', name: 'Alia', avatarUrl: 'https://picsum.photos/seed/101/100/100', isVerified: true, isGuide: false },
  { id: 'u2', name: 'Ben Carter', avatarUrl: 'https://picsum.photos/seed/102/100/100', isVerified: true, isGuide: true },
  { id: 'u3', name: 'Chloe Davis', avatarUrl: 'https://picsum.photos/seed/103/100/100', isVerified: false, isGuide: false },
  { id: 'u4', name: 'David Kim', avatarUrl: 'https://picsum.photos/seed/104/100/100', isVerified: true, isGuide: true },
  { id: 'u5', name: 'You', avatarUrl: 'https://picsum.photos/seed/user99/100/100', isVerified: true, isGuide: false }
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: users[1],
    content: 'Just discovered this hidden waterfall near Rishikesh! Absolutely breathtaking. A must-visit for anyone in the area. #IncredibleIndia #TravelGuide',
    imageUrl: 'https://picsum.photos/seed/201/600/400',
    imageHint: 'waterfall nature',
    likes: 125,
    comments: 23,
    createdAt: '2h ago',
    location: 'Rishikesh',
  },
  {
    id: 'p2',
    author: users[0],
    content: 'Looking for travel buddies for a weekend trip to the mountains. Anyone interested in joining a trek near Manali?',
    likes: 42,
    comments: 15,
    createdAt: '5h ago',
    location: 'Manali',
  },
  {
    id: 'p3',
    author: users[3],
    content: 'Pro tip for solo travelers in Delhi: The street food in Chandni Chowk is a culinary adventure. Here are my top 5 picks!',
    imageUrl: 'https://picsum.photos/seed/202/600/400',
    imageHint: 'street food',
    likes: 230,
    comments: 55,
    createdAt: '1d ago',
    location: 'Delhi',
  },
    {
    id: 'p4',
    author: users[2],
    content: 'Just arrived in Goa. Any recommendations for good, safe places to stay for a solo female traveler?',
    likes: 18,
    comments: 9,
    createdAt: '2d ago',
    location: 'Goa',
  },
];

export const guides: Guide[] = [
    { id: 'g1', name: 'Priya Sharma', avatarUrl: 'https://picsum.photos/seed/301/200/200', rating: 4.9, reviewCount: 134, specialties: ['History', 'Food Tours'], bio: 'Passionate about sharing the rich history and culinary delights of my city.', location: 'Delhi' },
    { id: 'g2', name: 'Rohan Joshi', avatarUrl: 'https://picsum.photos/seed/302/200/200', rating: 4.8, reviewCount: 98, specialties: ['Trekking', 'Adventure Sports'], bio: 'An adrenaline junkie and certified mountaineer ready to guide you on your next adventure.', location: 'Manali' },
    { id: 'g3', name: 'Anika Reddy', avatarUrl: 'https://picsum.photos/seed/303/200/200', rating: 5.0, reviewCount: 210, specialties: ['Yoga', 'Spiritual Retreats'], bio: 'Helping travelers find peace and wellness through curated spiritual journeys.', location: 'Rishikesh' },
]

export const chatRooms: ChatRoom[] = [
    {
        id: 'cr1',
        name: 'Mumbai Wanderers',
        type: 'group',
        avatarUrl: 'https://picsum.photos/seed/cr1/100/100',
        unreadCount: 3,
        lastMessage: 'Ben: Sounds great! Let\'s meet at 5.',
        lastMessageTime: '10m',
        messages: [
            { id: 'm1', sender: users[0], text: 'Hey everyone! Anyone up for a street food tour this evening?', timestamp: '1h ago' },
            { id: 'm2', sender: users[1], text: 'I\'m in! Where should we meet?', timestamp: '30m ago', replyTo: 'm1' },
            { id: 'm3', sender: users[4], text: 'Sounds great! Let\'s meet at 5.', timestamp: '10m ago', reactions: {'👍': 2} },
        ],
        location: 'Mumbai',
    },
    {
        id: 'cr2',
        name: 'Ben Carter',
        type: 'direct',
        avatarUrl: users[1].avatarUrl,
        unreadCount: 1,
        lastMessage: 'Perfect, thanks for the info!',
        lastMessageTime: '1h',
        messages: [
            { id: 'm4', sender: users[4], text: 'Hey Ben, loved your post about the waterfall. Could you share the location?', timestamp: '2h ago' },
            { id: 'm5', sender: users[1], text: 'Sure! It\'s called Neer Garh Waterfall. It\'s about a 30-min drive from Tapovan.', timestamp: '1h ago', reactions: {'❤️': 1} },
            { id: 'm6', sender: users[4], text: 'Perfect, thanks for the info!', timestamp: '1h ago' },
        ]
    },
    {
        id: 'cr3',
        name: 'Goa Solo Travelers',
        type: 'group',
        avatarUrl: 'https://picsum.photos/seed/cr3/100/100',
        unreadCount: 0,
        lastMessage: 'You: I recommend staying near Anjuna.',
        lastMessageTime: '3d',
        messages: [
            { id: 'm7', sender: users[2], text: 'Just arrived in Goa. Any recommendations for good, safe places to stay for a solo female traveler?', timestamp: '3d ago' },
            { id: 'm8', sender: users[4], text: 'I recommend staying near Anjuna. It\'s quite safe and has a great vibe.', timestamp: '3d ago' },
        ],
        location: 'Goa',
    }
]
