import { Product } from './models/productModel';
import { IPacket } from './types/Request';
import { User } from './models/userModel';
import bcrypt from 'bcryptjs';

export const users: User[] = [
  {
    name: 'Belal',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345'),
    isAdmin: true,
  },
  {
    name: 'Said',
    email: 'user@example.com',
    password: bcrypt.hashSync('123'),
    isAdmin: false,
  },
  {
    name: 'Mohammad',
    email: 'user2@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
];

export const products: Product[] = [
  {
    name: 'EXTREME ISO WHEY (1,8 kg)',
    slug: 'extreme-iso-whey',
    category: 'Proteine',
    image: '../public/images/Products/2139_1.jpg',
    images: [
      '../public/images/Products/2139_2.jpg',
      '../public/images/Products/2139_5.jpg',
    ],
    price: 84.99,
    countInStock: 10,
    brand: 'BODY ATTACK',
    rating: 4.9,
    numReviews: 10,
    description: [
      '100 % CFM Whey Protein Isolat von mehr als 90 % Isolat-Anteil',
      'Aus bester Milch von irischen Weidekühen - Grassfütterung',
      'Laktosearm - gluten- aspartamfrei & fettarm - perfekt löslich & hervorragend verträglich',
    ],
    reviews: [
      { name: 'Ali', comment: 'Very Good', rating: 5, createdAt: new Date() },
    ],
    taste: ['Vanilla', 'Chocolate', 'Strawberry'],
    banner: '../public/images/Products/DESKTOP_NEUES_CI_-_CLEAR_ISO_WHEY_NEUE_SORTEN_3436.jpg',
    isFeatured: true,
  },
  {
    name: 'NATURAL VEGAN PROTEIN (750g)',
    slug: 'natural-vegan-protein',
    category: 'Proteine',
    image: '../public/images/Products/2456_1.jpg',
    images: [
      '../public/images/Products/2456_2.jpg',
      '../public/images/Products/2456_4.jpg',
    ],
    price: 20.99,
    countInStock: 20,
    brand: 'MY SUPPS',
    rating: 2.7,
    numReviews: 10,
    description: [
      '100% natürliches Premium Erbsenprotein ohne künstliche Aromen',
      'Proteinanteil von 80% mit BCAA & Glutamin',
      'Vegan - laktosefrei - glutenfrei & gentechnisch unverändert',
    ],
    reviews: [
      { name: 'Max', comment: 'Good', rating: 4, createdAt: new Date() },
    ],
    taste: [],
    isFeatured: false,
  },
  {
    name: 'A-Z Multivitamin',
    slug: 'a-z-multivitamin',
    category: 'Vitamins',
    image:
      '../public/images/Products/11521278-1274854679742985.webp',
    images: [],
    price: 9.99,
    countInStock: 20,
    brand: 'Myvitamins',
    rating: 2,
    numReviews: 2,
    description: [
      'Multivitamin Formel',
      'Vitamin B12 reduziert Müdigkeit und Abgeschlagenheit*',
      'Vitamin C unterstützt eine normale Funktion des Immunsystems',
      'Tägliche Ergänzung',
    ],
    reviews: [],
    taste: [],
    isFeatured: false,
  },
  {
    name: 'WHEY GOLD STANDARD (908g)',
    slug: 'whey-gold-standard',
    category: 'Proteine',
    image: '../public/images/Products/2770_1.jpg',
    images: [
      '../public/images/Products/2770_2.jpg',
      '../public/images/Products/2770_3.jpg',
    ],
    price: 43.99,
    countInStock: 5,
    brand: 'OPTIMUM NUTRITION',
    rating: 3.1,
    numReviews: 17,
    description: [
      'Reichhaltig an Proteinen & Aminosäuren',
      'BCAA & Glutamin',
      'Hervorragender Geschmack und wenig Fett',
    ],
    reviews: [
      { name: 'Jahn', comment: 'Good', rating: 5, createdAt: new Date() },
    ],
    taste: [],
    isFeatured: false,
  },
  {
    name: 'Pancake Protein-Mix - 600g Dose',
    slug: 'pancake-protein-Mix',
    category: 'Sportnahrung',
    image:
      '../public/images/Products/ALL STARS Pancake Protein-Mix 600 g Dose_1280x1280.jpg',
    images: ['../public/images/Products/pancake_links-1586_1280x1280.jpg', '../public/images/Products/all-stars-pancake-mix_1280x1280.jpg'],
    price: 24.99,
    countInStock: 20,
    brand: 'ALL STARS',
    rating: 4,
    numReviews: 11,
    description: [
      'Pancakes mit viel Protein',
      'hochwertiges Protein aus Whey & Milcheiweiß',
      'Unter 2g Zucker',
      'mit Dinkelvollkornmehl',
      'einfache Zubereitung mit Wasser',
    ],
    reviews: [],
    taste: [],
    isFeatured: false,
  },
  {
    name: 'CASEIN GOLD STANDARD (1,8kg)',
    slug: 'casein-gold-standard',
    category: 'Proteine',
    image:
      '../public/images/Products/100+Gold+Standard+Casein+Schokolade+55+1820+Gramm.jpg',
    images: [],
    price: 79.99,
    countInStock: 15,
    brand: 'OPTIMUM NUTRITION',
    rating: 4.5,
    numReviews: 14,
    description: [
      '24 g Mizellares Casein pro Portion',
      'ca. 5 g BCAA pro Portion',
      'ca. 5 g Glutamin pro Portion',
    ],
    reviews: [{ name: 'Mohammad', comment: 'Very Good', rating: 4, createdAt: new Date() },],
    taste: [],
    banner: "../public/images/Products/8285c81d-d6e4-488f-a169-36f49b375268._SR970,300_.jpg",
    isFeatured: true,
  },
  {
    name: 'WHEY PROTEIN (2,3 kg)',
    slug: 'whey-protein',
    category: 'Proteine',
    image:
      '../public/images/Products/2975_1.jpg',
    images: ['../public/images/Products/2975_2.jpg', '../public/images/Products/2975_4.jpg'],
    price: 64.99,
    countInStock: 8,
    brand: 'BODY ATTACK',
    rating: 5,
    numReviews: 1,
    description: [
      'Wheyproteinhydrolysate und ultra-filtriertes Whey Protein',
      'Enthält je nach Geschmack 94.6 % reines Whey Konzentrat',
      'Perfekt zum Muskelaufbau & -erhalt geeignet',
    ],
    reviews: [{ name: 'Lukas', comment: 'Ich bin sehr beeindruckt ', rating: 5, createdAt: new Date() },],
    taste: ["Apfelstrudel", "Chocolate Brownie", "Chocolate Cream", "Cookies n Cream", "Strawberry Cream", "Strawberry-White Chocolate", "Vanilla Cream", "Vanilla Ice"],
    banner: '../public/images/Products/2975_1.jpg',
    isFeatured: false,
  },
  {
    name: 'CITRULLINE ZERO (500 g)',
    slug: 'citrulline-zero',
    category: 'Aminosäuren',
    image:
      '../public/images/Products/Body-Attack-Citrulline-Zero_500.webp',
    images: [],
    price: 32.99,
    countInStock: 8,
    brand: 'BODY ATTACK',
    rating: 5,
    numReviews: 7,
    description: [
      '100 % reinstes Citrulline ohne Zusätze - 30 % mehr Wirkung',
      'Vegan - aus pflanzlicher Fermentation - hochdosiert 5000 mg - patentierter Wirkstoff CITRUSYN®',
      'Optimale Löslichkeit - mit zusätzlichem Vitamin B6 - Laborgeprüft & Made in Germany',
    ],
    reviews: [{ name: 'Belal', comment: 'Good', rating: 5, createdAt: new Date() },],
    taste: [],
    isFeatured: false,
  },
  {
    name: 'ALL STARS Riegel-BOX',
    slug: 'all-stars-riegel-box',
    category: 'Riegel',
    image:
      '../public/images/Products/ALL STARS Riegel Box_1280x1280.jpg',
    images: [],
    price: 42.99,
    countInStock: 20,
    brand: 'ALL STARS',
    rating: 5,
    numReviews: 20,
    description: [
      '22 verschiedene Riegel',
      'Passendes Geschenk für Sportler',
    ],
    reviews: [],
    taste: [],
    isFeatured: false,
  },
  {
    name: 'PURE L-GLUTAMINSÄURE (400g)',
    slug: 'pure-l-glutaminsäure',
    category: 'Aminosäuren',
    image:
      '../public/images/Products/1603_1.jpg',
    images: ['../public/images/Products/1603_2.jpg', '../public/images/Products/1603_4.jpg'],
    price: 17.99,
    countInStock: 8,
    brand: 'BODY ATTACK',
    rating: 4.5,
    numReviews: 7,
    description: [
      '100% reines Glutamin-Pulver',
      'Vegan & ohne Gentechnik',
      'Ideal für Muskelaufbau- und Regenerationsprozesse',
    ],
    reviews: [{ name: 'Leon', comment: 'Good', rating: 5, createdAt: new Date() },],
    taste: [],
    isFeatured: true,
    banner: "../public/images/Products/71Pb1UOp5UL._AC_SL1500_.jpg",
  },
  {
    name: 'ALL STARS Protein Bar',
    slug: 'all-stars-protein-bar',
    category: 'Riegel',
    image:
      '../public/images/Products/Protein-BarRIEGEL_PROTEIN-BAR_Caramel_Single.jpeg',
    images: [],
    price: 2.69,
    countInStock: 20,
    brand: 'ALL STARS',
    rating: 5,
    numReviews: 1,
    description: [
      'Low Sugar & High Protein Bar',
      '50g Eiweißriegel',
      'Bis zu 35% qualitativ hochwertiges Eiweiß',
      'Zuckerreduziert mit maximal 2,3g Zucker pro Riegel',
      'Erhältlich in Peanut-Caramel und Triple-Chocolate',
    ],
    reviews: [{ name: 'Lukas', comment: 'Der Riegel hatte eine angenehme Konsistenz.', rating: 5, createdAt: new Date() },],
    taste: ['Triple Chocolate', 'Chocolate Coffee', 'Peanut-Caramel'],
    isFeatured: false,
  },
  {
    name: 'Creatin Caps - 150 Kapseln',
    slug: 'all-stars-creatin-caps',
    category: 'Creatin',
    image:
      '../public/images/Products/CREATINE Caps_F_FRONT_Render-Layer 1.png',
    images: ['../public/images/Products/CREATINE Caps_L_LINKS_Render-Layer 1.png', '../public/images/Products/CREATINE Caps_R_RECHTS_Render-Layer 1.png',],
    price: 22.69,
    countInStock: 20,
    brand: 'ALL STARS',
    rating: 0,
    numReviews: 0,
    description: [
      'hochreines Creatin Monohydrat',
      'Gelatinefreie Kapseln',
      'Gelatinefreie Kapseln',
      '150 Mega Caps',
    ],
    reviews: [],
    taste: [],
    isFeatured: false,
  },
];

export const packets: IPacket[] = [
  
  {
    "title": "VIP",
    "image": '../public/images/Home/cardio4.jpg',
    "price": "35 €",
    "leistungenTitle": "VIP Leistungen",
    "leistungen": [
      "Trainieren in der VIP Zone",
      "Kostenlose outdoor Kurse",
      "Kostenlose Kurse zum Abnehmen",
      "Ernährungsempfehlung",
      "Körperfettanalyse",
      "All Access zu allen Events + 1 bring a friend zum Event",
      "1 Kaffee kostenlos pro Tag",
      "10 % Rabatt im Onlineshop",
      "Know Your Body Vortragsreihe",
      "Zugriff zur Performance Area"
    ],
    "dauer": [
      {"package": "23 MONATE** 35 € /MTL.", "price": 35},
      {"package": "12 MONATE** 45 € /MTL.", "price": 45},
      {"package": "1 MONAT*** 55 € /MTL.", "price": 55}
    ],
  },
  {
    "title": "GOLD",
    "image": '../public/images/Home/best-fitness-gyms.jpg',
    "price": "20 €",
    "leistungenTitle": "GOLD Leistungen",
    "leistungen": ["Mineralgetränke-Flat", "Sauna*", "Kursprogramm", "Vibrationstraining", "Digitaler Trainingsplan", "5 % Rabatt im Onlineshop"],
    "dauer": [
      {"package": "23 MONATE** 20 € /MTL.", "price": 20},
      {"package": "12 MONATE** 35 € /MTL.", "price": 35},
      {"package": "1 MONAT*** 45 € /MTL.", "price": 45}
    ],
  },
  {
    "title": "BASIC",
    "image": '../public/images/Home/alles-drin.jpg',
    "price": "15 €",
    "leistungenTitle": "BASIC Leistungen",
    "leistungen": ["Geräte- + Cardiotraining", "Angebot für Studenten", "LadyFit Area*", "Freihantelbereich", "Functional Training"],
    "dauer": [
      {"package": "23 MONATE** 15 € /MTL.", "price": 15},
      {"package": "12 MONATE** 25 € /MTL.", "price": 25},
      {"package": "1 MONAT*** 35 € /MTL.", "price": 35}
    ],
  }
]
