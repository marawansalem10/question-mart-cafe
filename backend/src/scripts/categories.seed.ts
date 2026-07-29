
import Category from '../models/Category';
import { categoriesData } from '../data/categories';

export const seedCategories = async (): Promise<number> => {
  console.log('Seeding Categories...');

  // Validate: No duplicate category slugs or names
  const slugs = new Set<string>();
  const namesEn = new Set<string>();
  const namesAr = new Set<string>();

  for (const cat of categoriesData) {
    if (slugs.has(cat.slug)) {
      throw new Error(`Duplicate category slug: ${cat.slug}`);
    }
    slugs.add(cat.slug);

    if (namesEn.has(cat.name.en)) {
      throw new Error(`Duplicate category English name: ${cat.name.en}`);
    }
    namesEn.add(cat.name.en);

    if (namesAr.has(cat.name.ar)) {
      throw new Error(`Duplicate category Arabic name: ${cat.name.ar}`);
    }
    namesAr.add(cat.name.ar);
  }

  // Bulk upsert categories (upsert by slug)
  const operations = categoriesData.map((cat) => ({
    updateOne: {
      filter: { slug: cat.slug },
      update: { $set: cat },
      upsert: true,
    },
  }));

  if (operations.length > 0) {
    await Category.bulkWrite(operations);
  }

  console.log('✓ Categories completed');
  return categoriesData.length;
};
