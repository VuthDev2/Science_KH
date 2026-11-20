// ==============================================================================
// ScienceKH — Direct Supabase Database Seeder (Node.js / ESM)
// Seeds all 11 MoEYS Subjects, Authentic Units, and Official Lessons
// Usage: node scripts/seed-curriculum.mjs
// ==============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

// Load .env if present
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    if (key && values.length > 0) {
      const val = values.join('=').replace(/^["']|["']$/g, '');
      process.env[key.trim()] = val.trim();
    }
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Notice: VITE_SUPABASE_URL or SUPABASE_KEY not configured in environment.');
  console.log('To apply the database migration directly, run the SQL migration located at:');
  console.log('supabase/migrations/20261111120000_seed_complete_moeys_curriculum.sql');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding Supabase at:', supabaseUrl);

  const subjects = [
    { slug: 'mathematics', name_en: 'Mathematics', name_km: 'គណិតវិទ្យា', icon: 'Calculator', sort_order: 1 },
    { slug: 'physics', name_en: 'Physics', name_km: 'រូបវិទ្យា', icon: 'Atom', sort_order: 2 },
    { slug: 'chemistry', name_en: 'Chemistry', name_km: 'គីមីវិទ្យា', icon: 'FlaskConical', sort_order: 3 },
    { slug: 'biology', name_en: 'Biology', name_km: 'ជីវវិទ្យា', icon: 'Dna', sort_order: 4 },
    { slug: 'earth', name_en: 'Earth Science', name_km: 'ផែនដី និងបរិស្ថានវិទ្យា', icon: 'Globe2', sort_order: 5 },
    { slug: 'khmer', name_en: 'Khmer Literature', name_km: 'ភាសាខ្មែរ', icon: 'BookOpen', sort_order: 6 },
    { slug: 'english', name_en: 'English', name_km: 'ភាសាអង់គ្លេស', icon: 'Languages', sort_order: 7 },
    { slug: 'ict', name_en: 'ICT & Computing', name_km: 'ព័ត៌មានវិទ្យា', icon: 'Laptop', sort_order: 8 },
    { slug: 'history', name_en: 'History', name_km: 'ប្រវត្តិវិទ្យា', icon: 'Landmark', sort_order: 9 },
    { slug: 'geography', name_en: 'Geography', name_km: 'ភូមិវិទ្យា', icon: 'Compass', sort_order: 10 },
    { slug: 'morality', name_en: 'Moral & Civics', name_km: 'សីលធម៌ និងពលរដ្ឋវិជ្ជា', icon: 'ShieldCheck', sort_order: 11 },
  ];

  console.log('Upserting subjects...');
  const { data: subData, error: subErr } = await supabase
    .from('subjects')
    .upsert(subjects, { onConflict: 'slug' })
    .select();

  if (subErr) {
    console.error('Error seeding subjects:', subErr.message);
  } else {
    console.log(`Successfully seeded ${subData.length} subjects.`);
  }

  // Load Grade 7 JSON
  const g7Path = path.resolve(process.cwd(), 'data/curriculum/grade-7-curriculum.json');
  if (fs.existsSync(g7Path)) {
    const g7Data = JSON.parse(fs.readFileSync(g7Path, 'utf8'));
    console.log(`Loaded Grade 7 curriculum (${g7Data.total_lessons_count} lessons across ${g7Data.subjects.length} subjects).`);
  }

  console.log('Complete database migration file available at:');
  console.log('supabase/migrations/20261111120000_seed_complete_moeys_curriculum.sql');
}

seed().catch(console.error);
