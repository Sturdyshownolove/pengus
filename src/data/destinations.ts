import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'japan',
    name: 'Tokyo & Kyoto',
    country: 'Japan',
    flag: '🇯🇵',
    photoAsset: '/photos/japaneese.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Mt. Fuji & Cherry Blossoms',
    accentColor: '#FF477E',
    bgGradient: 'from-pink-500/20 to-purple-600/20',
    sampleBudgetTL: 85000,
    outfitName: 'Kimono Pingu',
    particleType: 'sakura',
    description: 'Walk under pink sakura petals and experience futuristic neon lights with Kimono Pingu!',
    milestones: [
      { percent: 10, title: 'Passport & Visa Prepared', description: 'Pingu bought his Japan travel guide!', icon: '✈️' },
      { percent: 25, title: 'Tokyo Flight Locked', description: 'Seat reserved next to Mt. Fuji view!', icon: '🎫' },
      { percent: 50, title: 'Kyoto Ryokan Booked', description: 'Kimono Pingu tried his first matcha tea!', icon: '🍵' },
      { percent: 75, title: 'Shinkansen Bullet Pass', description: 'High-speed rail across Japan unlocked!', icon: '🚅' },
      { percent: 100, title: 'Full Sakura Dream Unlocked!', description: 'You made it to Japan with Pingu!', icon: '🌸' }
    ]
  },
  {
    id: 'italy',
    name: 'Rome & Venice',
    country: 'Italy',
    flag: '🇮🇹',
    photoAsset: '/photos/italian.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Venetian Gondola & Colosseum',
    accentColor: '#E63946',
    bgGradient: 'from-amber-500/20 to-red-600/20',
    sampleBudgetTL: 78000,
    outfitName: 'Gondolier Pingu',
    particleType: 'warm_glow',
    description: 'Glide through historic canals with Gondolier Pingu and savor authentic gelato!',
    milestones: [
      { percent: 10, title: 'Italian Phrasebook Learned', description: 'Pingu says "Ciao Bella!"', icon: '🇮🇹' },
      { percent: 25, title: 'Venice Canal Ticket', description: 'Gondolier hat fitted perfectly!', icon: '🛶' },
      { percent: 50, title: 'Colosseum VIP Pass', description: 'Gladiator arena tour confirmed!', icon: '🏛️' },
      { percent: 75, title: 'Gelato Tasting Reserve', description: '10 scoops of artisan pistachio gelato!', icon: '🍦' },
      { percent: 100, title: 'La Dolce Vita Achieved!', description: 'Pack your bags, Italy is waiting!', icon: '🍕' }
    ]
  },
  {
    id: 'bali',
    name: 'Ubud & Seminyak',
    country: 'Bali',
    flag: '🇮🇩',
    photoAsset: '/photos/bali.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Tropical Beach & Ocean Waves',
    accentColor: '#06D6A0',
    bgGradient: 'from-teal-400/20 to-emerald-600/20',
    sampleBudgetTL: 65000,
    outfitName: 'Tropical Pingu',
    particleType: 'bubbles',
    description: 'Relax under palm trees, surf gentle ocean waves, and visit lush rice terraces with Tropical Pingu!',
    milestones: [
      { percent: 10, title: 'Sunscreen & Boardshorts', description: 'Tropical Pingu gets his floral shirt!', icon: '🌺' },
      { percent: 25, title: 'Bali Beachfront Villa', description: 'Private pool overlooking the ocean!', icon: '🏖️' },
      { percent: 50, title: 'Ubud Rice Terrace Tour', description: 'Swinging over lush tropical green valleys!', icon: '🌴' },
      { percent: 75, title: 'Sunset Surf Lesson', description: 'Pingu caught his first wave!', icon: '🏄‍♂️' },
      { percent: 100, title: 'Island Paradise Unlocked!', description: 'Welcome to your Bali sanctuary!', icon: '🍹' }
    ]
  },
  {
    id: 'egypt',
    name: 'Cairo & Nile Valley',
    country: 'Egypt',
    flag: '🇪🇬',
    photoAsset: '/photos/egytp.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Great Pyramids of Giza',
    accentColor: '#F4A261',
    bgGradient: 'from-amber-400/20 to-orange-600/20',
    sampleBudgetTL: 58000,
    outfitName: 'Explorer Pingu',
    particleType: 'gold_sparkles',
    description: 'Uncover ancient mysteries, ride camels by the Pyramids, and cruise the Nile River!',
    milestones: [
      { percent: 10, title: 'Explorer Hat Acquired', description: 'Pingu inspects the treasure map!', icon: '🤠' },
      { percent: 25, title: 'Pyramid Entry Ticket', description: 'Sphinx secret chamber pass secured!', icon: '🏺' },
      { percent: 50, title: 'Nile Felucca Cruise', description: 'Sailing along ancient pharaoh routes!', icon: '⛵' },
      { percent: 75, title: 'Camel Caravan Ride', description: 'Desert safari under golden stars!', icon: '🐪' },
      { percent: 100, title: 'Pharaoh Treasure Unlocked!', description: 'Egypt expedition fully funded!', icon: '👑' }
    ]
  },
  {
    id: 'korea',
    name: 'Seoul & Jeju',
    country: 'South Korea',
    flag: '🇰🇷',
    photoAsset: '/photos/korea.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Gyeongbokgung Palace',
    accentColor: '#3A86FF',
    bgGradient: 'from-blue-500/20 to-indigo-600/20',
    sampleBudgetTL: 72000,
    outfitName: 'Hanbok Pingu',
    particleType: 'sakura',
    description: 'Immerse in royal Hanbok fashion, vibrant street food night markets, and K-pop vibes!',
    milestones: [
      { percent: 10, title: 'Silk Hanbok Fitted', description: 'Pingu wears regal royal blue Hanbok!', icon: '👘' },
      { percent: 25, title: 'Seoul Flight Ticket', description: 'Incheon airport express pass ready!', icon: '🛫' },
      { percent: 50, title: 'Palace Photo Shoot', description: 'Gyeongbokgung royal courtyard access!', icon: '🏯' },
      { percent: 75, title: 'Myeongdong Night Market', description: 'Unlimited hotteok & tteokbokki feast!', icon: '🍢' },
      { percent: 100, title: 'K-Dream Voyage Unlocked!', description: 'Seoul awaits you with Hanbok Pingu!', icon: '🌟' }
    ]
  },
  {
    id: 'mexico',
    name: 'Cancun & Oaxaca',
    country: 'Mexico',
    flag: '🇲🇽',
    photoAsset: '/photos/mexico.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Chichen Itza & Caribbean Coast',
    accentColor: '#FF006E',
    bgGradient: 'from-rose-500/20 to-orange-500/20',
    sampleBudgetTL: 68000,
    outfitName: 'Mariachi Pingu',
    particleType: 'confetti',
    description: 'Celebrate life with vibrant Mariachi music, ancient Mayan ruins, and turquoise beach waters!',
    milestones: [
      { percent: 10, title: 'Sombrero & Guitar Ready', description: 'Pingu strums his first fiesta chord!', icon: '🎸' },
      { percent: 25, title: 'Cancun Resort Flight', description: 'All-inclusive Caribbean bay view!', icon: '🍹' },
      { percent: 50, title: 'Mayan Cenote Tour', description: 'Swimming in crystal subterranean waters!', icon: '🏊' },
      { percent: 75, title: 'Street Taco Crawl', description: 'Fresh al pastor tacos & homemade salsa!', icon: '🌮' },
      { percent: 100, title: 'Fiesta Total Unlocked!', description: 'Viva Mexico with Mariachi Pingu!', icon: '🎉' }
    ]
  },
  {
    id: 'brazil',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    flag: '🇧🇷',
    photoAsset: '/photos/brasil.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Christ the Redeemer & Copacabana',
    accentColor: '#38B000',
    bgGradient: 'from-green-500/20 to-yellow-500/20',
    sampleBudgetTL: 82000,
    outfitName: 'Carnival Pingu',
    particleType: 'confetti',
    description: 'Dance to samba rhythms, relax on Copacabana Beach, and marvel at Rio from Sugarloaf Mountain!',
    milestones: [
      { percent: 10, title: 'Carnival Feathers On', description: 'Pingu practices his samba footwork!', icon: '🦚' },
      { percent: 25, title: 'Rio Flight & Hotel', description: 'Copacabana oceanfront balcony!', icon: '🏨' },
      { percent: 50, title: 'Sugarloaf Cable Car Pass', description: 'Panoramic sunset view over Guanabara Bay!', icon: '🚡' },
      { percent: 75, title: 'Sambadrome VIP Seat', description: 'Front-row Carnival parade tickets!', icon: '🥁' },
      { percent: 100, title: 'Samba Celebration Achieved!', description: 'Rio de Janeiro is ready for you!', icon: '🇧🇷' }
    ]
  },
  {
    id: 'turkey',
    name: 'Cappadocia & Istanbul',
    country: 'Turkey',
    flag: '🇹🇷',
    photoAsset: '/photos/turkish.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Hot Air Balloons & Bosphorus',
    accentColor: '#D90429',
    bgGradient: 'from-red-500/20 to-amber-500/20',
    sampleBudgetTL: 48000,
    outfitName: 'Ottoman Pingu',
    particleType: 'warm_glow',
    description: 'Fly high in a Cappadocia hot air balloon, sip Turkish tea by the Bosphorus, and explore Grand Bazaar!',
    milestones: [
      { percent: 10, title: 'Fez & Turkish Tea Cup', description: 'Pingu learns how to brew authentic tea!', icon: '☕' },
      { percent: 25, title: 'Istanbul Bosphorus Cruise', description: 'Sailing between Europe & Asia continents!', icon: '🚢' },
      { percent: 50, title: 'Cappadocia Cave Hotel', description: 'Waking up to 100 hot air balloons in sky!', icon: '🎈' },
      { percent: 75, title: 'Grand Bazaar Shopping', description: 'Handcrafted carpets & baklava treats!', icon: '🕌' },
      { percent: 100, title: 'Anatolian Journey Unlocked!', description: 'Istanbul & Cappadocia expedition ready!', icon: '🇹🇷' }
    ]
  },
  {
    id: 'uae',
    name: 'Dubai & Abu Dhabi',
    country: 'UAE',
    flag: '🇦🇪',
    photoAsset: '/photos/uae.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Burj Khalifa & Desert Dunes',
    accentColor: '#FFB703',
    bgGradient: 'from-amber-400/20 to-yellow-600/20',
    sampleBudgetTL: 92000,
    outfitName: 'Emirati Pingu',
    particleType: 'gold_sparkles',
    description: 'Reach the clouds at Burj Khalifa, experience high-speed sand dune bashing, and visit Louvre Abu Dhabi!',
    milestones: [
      { percent: 10, title: 'Kandura & Sunglasses', description: 'Emirati Pingu steps into luxury mode!', icon: '🕶️' },
      { percent: 25, title: 'Emirates Flight Reserved', description: 'First-class lounge access unlocked!', icon: '✈️' },
      { percent: 50, title: 'Burj Khalifa 148th Floor', description: 'Standing atop the tallest tower on Earth!', icon: '🏙️' },
      { percent: 75, title: 'Desert Safari & Quad Bashing', description: 'Thrilling dunes ride under sunset glow!', icon: '🏜️' },
      { percent: 100, title: 'Dubai Luxury Achieved!', description: 'Welcome to futuristic Arabia with Pingu!', icon: '👑' }
    ]
  },
  {
    id: 'uk',
    name: 'London & Highlands',
    country: 'United Kingdom',
    flag: '🇬🇧',
    photoAsset: '/photos/british.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Big Ben & London Eye',
    accentColor: '#1D3557',
    bgGradient: 'from-blue-600/20 to-red-600/20',
    sampleBudgetTL: 98000,
    outfitName: 'Royal Guard Pingu',
    particleType: 'warm_glow',
    description: 'Ride iconic red double-decker buses, sip afternoon royal tea, and discover Scottish castles!',
    milestones: [
      { percent: 10, title: 'Bearskin Hat Fitted', description: 'Pingu stands at attention at Buckingham!', icon: '💂' },
      { percent: 25, title: 'London Underground Pass', description: 'Oyster card topped up for West End!', icon: '🚇' },
      { percent: 50, title: 'London Eye VIP Pod', description: 'Private flight overlooking Big Ben & Thames!', icon: '🎡' },
      { percent: 75, title: 'Highland Castle Tour', description: 'Spotting Nessie in Scottish lochs!', icon: '🏰' },
      { percent: 100, title: 'British Voyage Unlocked!', description: 'Cheerio! London is calling you!', icon: '☕' }
    ]
  },
  {
    id: 'russia',
    name: 'St. Petersburg & Moscow',
    country: 'Russia',
    flag: '🇷🇺',
    photoAsset: '/photos/russia.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1513326718677-b964603b136b?q=80&w=1200&auto=format&fit=crop',
    landmark: 'St. Basil’s Cathedral & Hermitage',
    accentColor: '#0077B6',
    bgGradient: 'from-sky-500/20 to-blue-700/20',
    sampleBudgetTL: 76000,
    outfitName: 'Winter Coat Pingu',
    particleType: 'snow',
    description: 'Marvel at colorful onion domes of St. Basil’s, explore Hermitage palace, and enjoy snowy winter fairy tales!',
    milestones: [
      { percent: 10, title: 'Ushanka Winter Hat', description: 'Cozy fur hat ready for snowy breezes!', icon: '🧥' },
      { percent: 25, title: 'Red Square Flight Pass', description: 'Express train to St. Petersburg booked!', icon: '🚄' },
      { percent: 50, title: 'Hermitage Museum Pass', description: 'Touring 3 million masterpieces in palace!', icon: '🎨' },
      { percent: 75, title: 'Sleigh Ride & Hot Tea', description: 'Gliding through snow-covered birch forests!', icon: '🛷' },
      { percent: 100, title: 'Winter Wonderland Unlocked!', description: 'Spasibo! Russia adventure fully funded!', icon: '❄️' }
    ]
  },
  {
    id: 'india',
    name: 'Agra & Jaipur',
    country: 'India',
    flag: '🇮🇳',
    photoAsset: '/photos/india.png',
    photoFallbackUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
    landmark: 'Taj Mahal & Palace of Winds',
    accentColor: '#FF6B35',
    bgGradient: 'from-orange-500/20 to-pink-600/20',
    sampleBudgetTL: 62000,
    outfitName: 'Festival Pingu',
    particleType: 'warm_glow',
    description: 'Witness sunset over marble Taj Mahal, celebrate Holi color festivals, and explore Pink City palaces!',
    milestones: [
      { percent: 10, title: 'Kurta & Marigold Garlands', description: 'Festival Pingu sparkles with vibrant colors!', icon: '🥻' },
      { percent: 25, title: 'Taj Mahal Sunrise Ticket', description: 'Front-row marble reflections booked!', icon: '🕌' },
      { percent: 50, title: 'Jaipur Heritage Resort', description: 'Living like royalty in a historic palace!', icon: '👑' },
      { percent: 75, title: 'Spices & Chai Tour', description: 'Aromatic masala chai & naan feast!', icon: '🍵' },
      { percent: 100, title: 'Golden Triangle Unlocked!', description: 'Namaste! India is welcoming you!', icon: '🕉️' }
    ]
  }
];

export const getDestinationById = (id: string): Destination => {
  return DESTINATIONS.find(d => d.id === id) || DESTINATIONS[0];
};
