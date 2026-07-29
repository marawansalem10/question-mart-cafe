
export interface SeedCategory {
  name: { en: string; ar: string };
  description?: { en: string; ar: string };
  slug: string;
  type: 'drink' | 'bakery' | 'food';
  image?: string;
  displayOrder?: number;
  isActive: boolean;
}

export const categoriesData: SeedCategory[] = [
  {
    name: { en: 'Hot Coffee', ar: 'قهوة ساخنة' },
    description: {
      en: 'A selection of delicious hot coffee drinks',
      ar: 'مجموعة من مشروبات القهوة الساخنة اللذيذة',
    },
    slug: 'hot-coffee',
    type: 'drink',
    displayOrder: 1,
    isActive: true,
  },
  {
    name: { en: 'Ice Coffee', ar: 'قهوة مثلجة' },
    description: {
      en: 'Refreshing iced coffee options',
      ar: 'خيارات قهوة مثلجة منعشة',
    },
    slug: 'ice-coffee',
    type: 'drink',
    displayOrder: 2,
    isActive: true,
  },
  {
    name: { en: 'French Coffee', ar: 'قهوة فرنسية' },
    description: {
      en: 'Classic French coffee specialties',
      ar: 'تخصصات القهوة الفرنسية الكلاسيكية',
    },
    slug: 'french-coffee',
    type: 'drink',
    displayOrder: 3,
    isActive: true,
  },
  {
    name: { en: 'Turkish Coffee', ar: 'قهوة تركية' },
    description: {
      en: 'Authentic Turkish coffee',
      ar: 'قهوة تركية أصيلة',
    },
    slug: 'turkish-coffee',
    type: 'drink',
    displayOrder: 4,
    isActive: true,
  },
  {
    name: { en: 'Frappe', ar: 'فرابيه' },
    description: {
      en: 'Blended iced frappe drinks',
      ar: 'مشروبات فرابيه مثلجة الممزوجة',
    },
    slug: 'frappe',
    type: 'drink',
    displayOrder: 5,
    isActive: true,
  },
  {
    name: { en: 'Fresh Juice', ar: 'عصير طازج' },
    description: {
      en: 'Freshly squeezed fruit juices',
      ar: 'عصائر فواكه طازجة',
    },
    slug: 'fresh-juice',
    type: 'drink',
    displayOrder: 6,
    isActive: true,
  },
  {
    name: { en: 'Mojito', ar: 'موهيتو' },
    description: {
      en: 'Refreshing mojito drinks',
      ar: 'مشروبات موهيتو منعشة',
    },
    slug: 'mojito',
    type: 'drink',
    displayOrder: 7,
    isActive: true,
  },
  {
    name: { en: 'Milk Shake', ar: 'ميلك شيك' },
    description: {
      en: 'Creamy milkshakes in various flavors',
      ar: 'ميلك شيك كريمي بنكهات مختلفة',
    },
    slug: 'milk-shake',
    type: 'drink',
    displayOrder: 8,
    isActive: true,
  },
  {
    name: { en: 'Choco Loverz', ar: 'عشاق الشوكولاتة' },
    description: {
      en: 'Chocolate lovers special drinks',
      ar: 'مشروبات خاصة لعشاق الشوكولاتة',
    },
    slug: 'choco-loverz',
    type: 'drink',
    displayOrder: 9,
    isActive: true,
  },
  {
    name: { en: 'Bakery & Food', ar: 'مخبوزات و أطعمة' },
    description: {
      en: 'Delicious bakery items and food',
      ar: 'أطعمة ومخبوزات لذيذة',
    },
    slug: 'bakery-food',
    type: 'food',
    displayOrder: 10,
    isActive: true,
  },
];
