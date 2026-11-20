-- ==============================================================================
-- ScienceKH — Official MoEYS National Curriculum Master Seed Migration
-- Grades 7–12 across All 11 Disciplines:
-- Mathematics, Physics, Chemistry, Biology, Earth Science, Khmer Literature,
-- English, History, Geography, ICT, and Moral/Civics.
-- Generated: 2026-11-11
-- ==============================================================================

-- 1. Ensure all 11 MoEYS Subjects exist
INSERT INTO public.subjects (slug, name_en, name_km, icon, sort_order) VALUES
  ('mathematics', 'Mathematics',             'គណិតវិទ្យា',             'Calculator',    1),
  ('physics',     'Physics',                 'រូបវិទ្យា',               'Atom',          2),
  ('chemistry',   'Chemistry',               'គីមីវិទ្យា',              'FlaskConical',  3),
  ('biology',     'Biology',                 'ជីវវិទ្យា',               'Dna',           4),
  ('earth',       'Earth Science',           'ផែនដី និងបរិស្ថានវិទ្យា', 'Globe2',        5),
  ('khmer',       'Khmer Literature',        'ភាសាខ្មែរ',               'BookOpen',      6),
  ('english',     'English',                 'ភាសាអង់គ្លេស',            'Languages',     7),
  ('ict',         'ICT & Computing',         'ព័ត៌មានវិទ្យា',           'Laptop',        8),
  ('history',     'History',                 'ប្រវត្តិវិទ្យា',           'Landmark',      9),
  ('geography',   'Geography',               'ភូមិវិទ្យា',              'Compass',       10),
  ('morality',    'Moral & Civics',          'សីលធម៌ និងពលរដ្ឋវិជ្ជា',   'ShieldCheck',   11)
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_km = EXCLUDED.name_km,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- 2. Curriculum Units Architecture Table
CREATE TABLE IF NOT EXISTS public.curriculum_units (
  id TEXT PRIMARY KEY,
  grade SMALLINT NOT NULL CHECK (grade BETWEEN 7 AND 12),
  subject_slug TEXT NOT NULL REFERENCES public.subjects(slug) ON DELETE CASCADE,
  unit_number INT NOT NULL,
  title_km TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_km TEXT,
  description_en TEXT,
  icon TEXT DEFAULT '📚',
  lesson_ids JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.curriculum_units TO authenticated;
GRANT ALL ON public.curriculum_units TO service_role;
ALTER TABLE public.curriculum_units ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Authenticated can view curriculum units"
    ON public.curriculum_units FOR SELECT TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Seed all authentic Units
INSERT INTO public.curriculum_units (id, grade, subject_slug, unit_number, title_km, title_en, description_km, description_en, icon, lesson_ids) VALUES
  ('unit-g7-math-1', 7, 'mathematics', 1, 'ជំពូកទី ១ ៖ ចំនួនគត់ និងចំនួនគត់រ៉ឺឡាទីប', 'Unit 1: Integers & Signed Numbers', 'សញ្ញាណចំនួនគត់ ឫសការេ ឫសគូប កត្តាបឋម ប.ម.ធ ព.គ.ទ និងប្រមាណវិធីលើចំនួនគត់រ៉ឺឡាទីប', 'Natural numbers, square/cube roots, prime factorization, GCD, LCM, and signed integer arithmetic', '🔢', '["les-g7-math-01","les-g7-math-02","les-g7-math-03"]'::jsonb),
  ('unit-g7-math-2', 7, 'mathematics', 2, 'ជំពូកទី ២ ៖ ប្រភាគ ចំនួនទសភាគ និងភាគរយ', 'Unit 2: Fractions, Decimals & Percentages', 'ប្រភាគសមមូល ប្រមាណវិធីលើប្រភាគ ចំនួនទសភាគ និងការគណនាភាគរយ-ការប្រាក់', 'Equivalent fractions, decimal operations, percentages, discounts, and simple commercial interest', '🥧', '["les-g7-math-04","les-g7-math-05","les-g7-math-06"]'::jsonb),
  ('unit-g7-math-3', 7, 'mathematics', 3, 'ជំពូកទី ៣ ៖ ស្វ័យគុណ និងពីជគណិត', 'Unit 3: Powers & Algebra', 'វិធានស្វ័យគុណ កន្សោមពីជគណិត សមីការដឺក្រេទី១ វិសមភាព និងផលធៀប-សមាមាត្រ', 'Exponent laws, algebraic expressions, linear equations ax+b=c, inequalities, and proportions', '⚡', '["les-g7-math-07","les-g7-math-08","les-g7-math-09","les-g7-math-10","les-g7-math-11"]'::jsonb),
  ('unit-g7-math-4', 7, 'mathematics', 4, 'ជំពូកទី ៤ ៖ ធរណីមាត្រក្នុងប្លង់ និងសូលីត', 'Unit 4: Geometry & 3D Solids', 'ចំណុច បន្ទាត់ មុំ បន្ទាត់ស្រប-កែង ត្រីកោណ បរិមាត្រ ផ្ទៃក្រឡា រង្វង់ មាឌគូប និងភាពឆ្លុះ', 'Lines, angles, parallel transversals, triangles, polygon areas, circles, 3D solids, and reflections', '📐', '["les-g7-math-12","les-g7-math-13","les-g7-math-14","les-g7-math-15","les-g7-math-16","les-g7-math-17","les-g7-math-18","les-g7-math-19"]'::jsonb),
  ('unit-g7-math-5', 7, 'mathematics', 5, 'ជំពូកទី ៥ ៖ ស្ថិតិ និងប្រូបាប', 'Unit 5: Statistics & Probability', 'ការពិសោធន៍ចៃដន្យ គណនាប្រូបាប តារាងប្រេកង់ ដ្យាក្រាមក្រាបសសរ និងក្រាបផ្ចិត', 'Random experiments, probability P(A)=m/n, frequency tables, bar charts, and circular pie charts', '📊', '["les-g7-math-20","les-g7-math-21","les-g7-math-22"]'::jsonb),
  ('unit-g7-khmer-1', 7, 'khmer', 1, 'កាព្យឃ្លោងខ្មែរ និងវេយ្យាករណ៍គ្រឹះ', 'Classical Poetic Meters & Grammar', 'ចង្វាក់បទកាកគតិ បទពាក្យ ៧ ថ្នាក់ពាក្យ នាម កិរិយា និងគុណនាម', 'Kak-Kati & 7-syllable poetic meters, parts of speech, and descriptive essays', '📖', '["les-g7-khmer-01","les-g7-khmer-02"]'::jsonb),
  ('unit-g7-phys-1', 7, 'physics', 1, 'ការវាស់វែង ខ្នាត SI និងដង់ស៊ីតេ', 'Measurement, SI Units & Density', 'ប្រព័ន្ធខ្នាតអន្តរជាតិ SI ម៉ាស មាឌ និងរូបមន្តដង់ស៊ីតេ', 'Standard SI base units, mass, volume, and density calculations', '⚖️', '["les-g7-phys-01","les-g7-phys-02"]'::jsonb),
  ('unit-g7-phys-2', 7, 'physics', 2, 'ម៉ាស៊ីនសាមញ្ញ និងកម្ដៅ', 'Simple Machines & Thermal Expansion', 'រ៉ក ឃ្នាស់ របងជម្រាល និងការរីកមាឌនៃរូបធាតុពេលត្រូវកម្ដៅ', 'Levers, pulleys, inclined planes, and thermal expansion of matter', '⚙️', '["les-g7-phys-03","les-g7-phys-04","les-g7-phys-05"]'::jsonb),
  ('unit-g7-chem-1', 7, 'chemistry', 1, 'សារធាតុបរិសុទ្ធ ល្បាយ និងវិធីញែក', 'Pure Substances, Mixtures & Separation', 'ល្បាយស្មើសាច់ មិនស្មើសាច់ វិធីច្រោះ ការរំហួត និងការបំណិត', 'Homogeneous/heterogeneous mixtures, filtration, evaporation, and distillation', '🧪', '["les-g7-chem-01","les-g7-chem-02"]'::jsonb),
  ('unit-g7-chem-2', 7, 'chemistry', 2, 'បាតុភូតរូប គីមី ទឹក និងខ្យល់', 'Physical/Chemical Changes, Water & Air', 'បម្រែបម្រួលរូប និងគីមី សមាសភាពទឹក និងខ្យល់ក្នុងបរិយាកាស', 'Physical vs chemical reactions, water states, and atmospheric air gases', '⚗️', '["les-g7-chem-03","les-g7-chem-04","les-g7-chem-05"]'::jsonb),
  ('unit-g7-bio-1', 7, 'biology', 1, 'កោសិកា និងចំណាត់ថ្នាក់ភាវៈរស់', 'Cells & Classification of Living Things', 'រចនាសម្ព័ន្ធកោសិការុក្ខជាតិ និងសត្វ ព្រមទាំងអាណាចក្រភាវៈរស់ទាំង ៥', 'Plant and animal cell structures, organelles, and the five biological kingdoms', '🔬', '["les-g7-bio-01","les-g7-bio-02"]'::jsonb),
  ('unit-g7-bio-2', 7, 'biology', 2, 'រុក្ខជាតិ និងច្រវាក់អាហារអេកូឡូស៊ី', 'Plant Physiology & Food Chains', 'រចនាសម្ព័ន្ធរុក្ខជាតិ ការសំយោគពន្លឺ ច្រវាក់អាហារ និងបណ្តាញអាហារ', 'Plant anatomy, photosynthesis basics, producers, consumers, and food webs', '🌱', '["les-g7-bio-03","les-g7-bio-04","les-g7-bio-05"]'::jsonb),
  ('unit-g7-earth-1', 7, 'earth', 1, 'ស្រទាប់ផែនដី វដ្តថ្ម និងវដ្តទឹក', 'Earth Layers, Rock & Water Cycles', 'សំបកផែនដី ម៉ង់តូ ស្នូល ប្រភេទថ្មទាំង ៣ និងដំណាក់កាលនៃវដ្តទឹក', 'Crust, mantle, core, igneous/sedimentary/metamorphic rocks, and water cycle', '🌍', '["les-g7-earth-01","les-g7-earth-02","les-g7-earth-03"]'::jsonb),
  ('unit-g7-earth-2', 7, 'earth', 2, 'បរិយាកាស និងការប្រែប្រួលអាកាសធាតុ', 'Atmosphere & Weather Systems', 'ស្រទាប់បរិយាកាស សម្ពាធខ្យល់ របបពពក និងទឹកភ្លៀង', 'Atmospheric strata, barometric pressure, cloud types, and precipitation', '☁️', '["les-g7-earth-04","les-g7-earth-05"]'::jsonb),
  ('unit-g7-hist-1', 7, 'history', 1, 'បុរេប្រវត្តិសាស្ត្រកម្ពុជា និងការកកើតនគរភ្នំ', 'Cambodian Prehistory & Rise of Funan', 'ស្ថានីយល្អាងស្ពាន សំរោងសែន និងពាណិជ្ជកម្មកំពង់ផែអូរកែវនៃនគរភ្នំ', 'Prehistoric archaeological sites and maritime commerce through the Oc Eo entrepôt', '🏛️', '["les-g7-hist-01","les-g7-hist-02"]'::jsonb),
  ('unit-g7-geo-1', 7, 'geography', 1, 'ភូមិសាស្ត្ររូបវន្តកម្ពុជា ជួរភ្នំ និងប្រព័ន្ធទឹក', 'Physical Geography: Landforms & Hydrology', 'ទន្លេមេគង្គ បឹងទន្លេសាប ជួរភ្នំក្រវាញ-ដងរែក និងរបបខ្យល់មូសុង', 'Cardamom & Dangrek ranges, Mekong-Tonle Sap basin, and tropical monsoons', '🗺️', '["les-g7-geo-01","les-g7-geo-02"]'::jsonb),
  ('unit-g7-eng-1', 7, 'english', 1, 'Present & Past Tenses in Daily Life', 'Present & Past Tenses in Daily Life', 'កាលបច្ចុប្បន្ន និងអតីតកាលធម្មតា កិរិយាស័ព្ទប្រក្រតី/មិនប្រក្រតី និងការសន្ទនា', 'Present simple, past simple narrative structures, and everyday school vocabulary', '🔤', '["les-g7-eng-01","les-g7-eng-02"]'::jsonb),
  ('unit-g7-ict-1', 7, 'ict', 1, 'ផ្នែករឹងកុំព្យូទ័រ និងការវាយអក្សរខ្មែរយូនីកូដ', 'Computer Hardware & Khmer Unicode Typing', 'ស្ថាបត្យកម្ម CPU, RAM ប្លង់ក្តារចុចយូនីកូដ (Coeng) និងការរៀបចំឯកសារ', 'Core processor architecture, memory, Khmer subscript typing, and word processing', '💻', '["les-g7-ict-01","les-g7-ict-02"]'::jsonb),
  ('unit-g7-moral-1', 7, 'morality', 1, 'សីលធម៌ក្នុងគ្រួសារ និងសិទ្ធិកុមារ', 'Family Ethics & Child Rights', 'កតញ្ញូតាធម៌ សិទ្ធិទាំងបួនរបស់កុមារ និងកាតព្វកិច្ចសិស្សក្នុងសាលារៀន', 'Filial piety, UNCRC four child rights pillars, and student civic duties', '🤝', '["les-g7-moral-01","les-g7-moral-02"]'::jsonb),
  ('unit-g8-math-1', 8, 'mathematics', 1, 'ចំនួនសនិទាន និងពន្លាតពីជគណិត', 'Rational Numbers & Algebraic Expansions', 'ចំនួនសនិទាន អសនិទាន រូបមន្តពន្លាត (a±b)² និងការដាក់ជាផលគុណកត្តា', 'Rational vs irrational numbers, remarkable binomial identities, and factorization', '📐', '["les-g8-math-01","les-g8-math-02","les-g8-math-06"]'::jsonb),
  ('unit-g8-math-2', 8, 'mathematics', 2, 'វិសមីការ និងចំណោទប្រព័ន្ធសមីការ', 'Inequalities & Applied System Problems', 'វិសមីការដឺក្រេទី១ មានមួយអញ្ញាត និងចំណោទដោះស្រាយដោយប្រព័ន្ធសមីការ', 'Linear inequalities, negative sign reversal rules, and word problem modeling', '⚖️', '["les-g8-math-04","les-g8-math-10"]'::jsonb),
  ('unit-g8-math-3', 8, 'mathematics', 3, 'ទ្រឹស្តីបទពីតាក័រ និងត្រីកោណប៉ុនគ្នា', 'Pythagorean Theorem & Triangle Congruence', 'ទ្រឹស្តីបទពីតាក័រ c² = a² + b² ចតុកោណពិសេស និងករណីប៉ុនគ្នា (SSS, SAS, ASA)', 'Pythagorean theorem, right-triangle geometry, and congruent triangle proofs', '📏', '["les-g8-math-03","les-g8-math-05","les-g8-math-07"]'::jsonb),
  ('unit-g8-math-4', 8, 'mathematics', 4, 'ធរណីមាត្រមាឌ និងស្ថិតិអនុវត្ត', 'Curved Solids & Grouped Statistics', 'មាឌស៊ីឡាំង កោន ស្វ៊ែរ មធ្យមនព្វន្ត និងការសង់អ៊ីស្តូក្រាមទិន្នន័យ', 'Cylinder, cone, and sphere volumes, weighted means, and frequency histograms', '📊', '["les-g8-math-08","les-g8-math-09"]'::jsonb),
  ('unit-g8-khmer-1', 8, 'khmer', 1, 'រឿងទុំទាវ និងពាក្យកម្ចីបាលី-សំស្ក្រឹត', 'Tum Teav Literature & Classical Loanwords', 'ការវិភាគតួអង្គទុំ ទាវ នោ ម៉ឺនងួន និងវិធានពាក្យកម្ចីបាលី-សំស្ក្រឹត', 'Character analysis in Tum Teav and Pali-Sanskrit loanword identification rules', '📜', '["les-g8-khmer-01","les-g8-khmer-02"]'::jsonb),
  ('unit-g8-phys-1', 8, 'physics', 1, 'កម្លាំង សម្ពាធ និងការងារមេកានិច', 'Forces, Pressure & Mechanical Work', 'សម្ពាធអង្គធាតុរាវ សម្ពាធបរិយាកាស និងការងារមេកានិច W = F · d', 'Fluid pressure, hydrostatic laws, mechanical work W = F·d, and power', '⚡', '["les-g8-phys-01","les-g8-phys-02"]'::jsonb),
  ('unit-g8-phys-2', 8, 'physics', 2, 'អគ្គិសនីឋិតិវន្ត និងពន្លឺ', 'Static Electricity & Optics', 'បន្ទុកអគ្គិសនី អគ្គិសនីកម្ម ចរន្តអគ្គិសនី និងការសាយភាយពន្លឺ', 'Electric charges, static discharge, electric current, and rectilinear light travel', '💡', '["les-g8-phys-03","les-g8-phys-04","les-g8-phys-05"]'::jsonb),
  ('unit-g8-chem-1', 8, 'chemistry', 1, 'អាតូម ម៉ូលេគុល និងតារាងខួប', 'Atoms, Molecules & Periodic Table', 'រចនាសម្ព័ន្ធអាតូម និមិត្តសញ្ញាធាតុ និងតារាងខួប ២០ ធាតុដំបូង', 'Atomic structure, chemical element symbols, and the first 20 periodic elements', '⚛️', '["les-g8-chem-01","les-g8-chem-02"]'::jsonb),
  ('unit-g8-chem-2', 8, 'chemistry', 2, 'ច្បាប់រក្សាម៉ាស និងតុល្យភាពសមីការ', 'Conservation of Mass & Chemical Equations', 'ច្បាប់ឡាវ័រហ្ស៊ីយេ តុល្យភាពសមីការគីមី អុកស៊ីសែន និងអ៊ីដ្រូសែន', 'Lavoisier law of mass conservation, stoichiometric equation balancing, and gases', '⚖️', '["les-g8-chem-03","les-g8-chem-04","les-g8-chem-05"]'::jsonb),
  ('unit-g8-bio-1', 8, 'biology', 1, 'ប្រព័ន្ធរំលាយអាហារ និងប្រព័ន្ធរបត់ឈាម', 'Digestive & Circulatory Systems', 'សរីរាង្គរំលាយអាហារ ការបំប្លែងជីវជាតិ បេះដូង និងចរន្តឈាមរត់', 'Digestive tract organs, nutrient assimilation, human heart anatomy, and blood loop', '🫀', '["les-g8-bio-01","les-g8-bio-02"]'::jsonb),
  ('unit-g8-bio-2', 8, 'biology', 2, 'ប្រព័ន្ធដង្ហើម និងការបញ្ចេញចោល', 'Respiratory & Excretory Systems', 'សួត ការផ្លាស់ប្តូរឧស្ម័ន តម្រងនោម និងការបញ្ចេញកាកសំណល់ពីរាងកាយ', 'Lungs, alveolar gas exchange, kidneys, nephron filtration, and homeostasis', '🫁', '["les-g8-bio-03","les-g8-bio-04","les-g8-bio-05"]'::jsonb),
  ('unit-g8-earth-1', 8, 'earth', 1, 'ផ្លាកតិចតូនិច ភ្នំភ្លើង និងការរញ្ជួយដី', 'Plate Tectonics, Volcanoes & Earthquakes', 'ចលនាផ្លាកតិចតូនិច បន្ទុះភ្នំភ្លើង រលកស៊ូណាមិ និងគ្រោះរញ្ជួយដី', 'Continental drift, fault lines, volcanic eruptions, and earthquake Richter scales', '🌋', '["les-g8-earth-01","les-g8-earth-02","les-g8-earth-03"]'::jsonb),
  ('unit-g8-earth-2', 8, 'earth', 2, 'បរិយាកាស និងធនធានធម្មជាតិ', 'Atmospheric Layers & Natural Reserves', 'ស្រទាប់អូហ្សូន បាតុភូតផ្ទះកញ្ចក់ និងការគ្រប់គ្រងធនធានធម្មជាតិ', 'Ozone layer protection, greenhouse effect, and sustainable natural resources', '☀️', '["les-g8-earth-04","les-g8-earth-05"]'::jsonb),
  ('unit-g8-hist-1', 8, 'history', 1, 'សម័យមហានគរ ការកកើត និងការកសាងអង្គរវត្ត', 'Angkor Empire: Foundation & Angkor Wat', 'ពិធីទេវរាជ គ.ស. ៨០២ រជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ និងស្ថាបត្យកម្មប្រាសាទអង្គរវត្ត', 'The 802 AD Devaraja consecration, reign of Suryavarman II, and Angkor Wat temple architecture', '🏰', '["les-g8-hist-01","les-g8-hist-02"]'::jsonb),
  ('unit-g8-geo-1', 8, 'geography', 1, 'អាកាសធាតុកម្ពុជា កសិកម្ម និងប្រព័ន្ធធារាសាស្ត្រ', 'Climate, Paddy Agriculture & Irrigation', 'ខ្យល់មូសុង របបទឹកភ្លៀង ការដាំដុះស្រូវវស្សា-ប្រាំង និងទំនើបកម្មកសិកម្ម', 'Monsoon regimes, wet/dry season paddy cultivation, and national irrigation networks', '🌧️', '["les-g8-geo-01","les-g8-geo-02"]'::jsonb),
  ('unit-g8-eng-1', 8, 'english', 1, 'Narratives & Modal Auxiliaries in Action', 'Narratives & Modal Auxiliaries in Action', 'កិរិយាស័ព្ទមិនទៀងទាត់ កាលអតីតកាល និង modal verbs (Must, Should, Can)', 'Irregular past narratives, obligations, prohibitions, and recommendation modals', '📝', '["les-g8-eng-01","les-g8-eng-02"]'::jsonb),
  ('unit-g8-ict-1', 8, 'ict', 1, 'សន្លឹកកិច្ចការអេឡិចត្រូនិក និងការវិភាគទិន្នន័យ', 'Spreadsheets & Numerical Analysis', 'រូបមន្តគណិតវិទ្យា អនុគមន៍ SUM, AVERAGE, MAX និងការបង្កើតគំនូសតាង Charts', 'Formulas, cell references, aggregate calculations, and visual data charting', '📈', '["les-g8-ict-01","les-g8-ict-02"]'::jsonb),
  ('unit-g9-math-1', 9, 'mathematics', 1, 'ពីជគណិត និងសមីការដឺក្រេទី១-២', 'Algebra & Linear/Quadratic Equations', 'វិធីជំនួស បូកបំបាត់ រូបមន្តឌីសគ្រីមីណង់ Δ និងទំនាក់ទំនងវីយែត (S, P)', 'Master 2x2 linear systems, substitution, elimination, quadratic discriminant Δ, and Viète formulas', '📐', '["les-g9-math-01","les-g9-math-02","les-g9-math-06"]'::jsonb),
  ('unit-g9-math-2', 9, 'mathematics', 2, 'ចំណោទសមីការ អនុគមន៍ និងស្ថិតិ', 'Applied Equations, Functions & Statistics', 'ដោះស្រាយចំណោទប្រឡងឌីប្លូម អនុគមន៍ y = ax + b និងប្រូបាប៊ីលីតេបឋម', 'Brevet quadratic word problems, linear function graphs, slopes, and probability', '📈', '["les-g9-math-07","les-g9-math-08","les-g9-math-10"]'::jsonb),
  ('unit-g9-math-3', 9, 'mathematics', 3, 'ធរណីមាត្រ និងផលធៀបត្រីកោណមាត្រ', 'Geometry & Trigonometric Ratios', 'ទ្រឹស្តីបទតាលែស ត្រីកោណដូចគ្នា និងផលធៀបត្រីកោណមាត្រ sin, cos, tan', 'Thales theorem, similar triangle ratios, and sine/cosine/tangent applications', '📏', '["les-g9-math-03","les-g9-math-04"]'::jsonb),
  ('unit-g9-math-4', 9, 'mathematics', 4, 'ធរណីមាត្ររង្វង់ និងចតុកោណចារឹក', 'Circles, Tangents & Cyclic Quadrilaterals', 'មុំផ្ចិត មុំចារឹកក្នុងរង្វង់ បន្ទាត់ប៉ះ និងចតុកោណចារឹកក្នុងរង្វង់', 'Central angles, inscribed angles, tangent properties, and cyclic quadrilaterals', '⭕', '["les-g9-math-05","les-g9-math-09"]'::jsonb),
  ('unit-g9-khmer-1', 9, 'khmer', 1, 'រឿងកុលាបប៉ៃលិន និងរចនាសម្ព័ន្ធល្បះខ្មែរ', 'Kulap Pailin Novel & Sentence Syntax', 'ការវិភាគតួអង្គចៅចិត្រ ឃុននារី ល្បះទោល ល្បះផ្សំ និងឈ្នាប់ភាសាខ្មែរ', 'Character analysis in Kulap Pailin, clause coordination, and grammatical conjunctions', '🌹', '["les-g9-khmer-01","les-g9-khmer-02"]'::jsonb),
  ('unit-g9-khmer-2', 9, 'khmer', 2, 'តែងសេចក្តី និងវិញ្ញាសាឌីប្លូមភាសាខ្មែរ', 'Essay Composition & Brevet National Exam', 'វិធីសាស្ត្រតែងសេចក្តីពិពណ៌នា ពន្យល់ និងការអនុវត្តវិញ្ញាសាប្រឡងឌីប្លូម', 'Descriptive/expository essay frameworks and authentic Brevet past exam drills', '✍️', '["les-g9-khmer-03","les-g9-khmer-04"]'::jsonb),
  ('unit-g9-phys-1', 9, 'physics', 1, 'អគ្គិសនី ច្បាប់អូម និងថាមពល', 'Electricity, Ohm''s Law & Power', 'ច្បាប់អូម U = R·I សៀគ្វីតជាស៊េរី-ខ្នែង និងអានុភាពអគ្គិសនី P = U·I', 'Ohm''s law, series/parallel circuit analysis, and electric power & energy', '⚡', '["les-g9-phys-01","les-g9-phys-02","les-g9-phys-03"]'::jsonb),
  ('unit-g9-phys-2', 9, 'physics', 2, 'អេឡិចត្រូម៉ាញេទិច និងអុបទិកពន្លឺ', 'Electromagnetism & Light Optics', 'ដែនម៉ាញេទិច អេឡិចត្រូម៉ាញ៉ែត ច្បាប់ឆ្លុះ និងងាកពន្លឺ', 'Magnetic fields, solenoids, reflection laws, and light refraction', '🧲', '["les-g9-phys-04","les-g9-phys-05"]'::jsonb),
  ('unit-g9-chem-1', 9, 'chemistry', 1, 'អាស៊ីត បាស pH និងម៉ូលគីមី', 'Acids, Bases, pH & Chemical Moles', 'កម្រិត pH សូចនាករពណ៌ បរិមាណសារធាតុ ម៉ូល និងកំហាប់សូលុយស្យុង', 'pH scale 0–14, color indicators, mole calculations n = m/M, and molarity', '🧪', '["les-g9-chem-01","les-g9-chem-02"]'::jsonb),
  ('unit-g9-chem-2', 9, 'chemistry', 2, 'លោហៈសកម្ម អំបិល និងអុកស៊ីដូរេដុកកម្ម', 'Metals, Salts & Redox Reactions', 'ជួរប្រតិកម្មលោហៈ ប្រតិកម្មបន្សាបអាស៊ីត-បាស និងអុកស៊ីតកម្ម-រេដុកកម្ម', 'Activity series of metals, neutralization reaction, and redox processes', '⚗️', '["les-g9-chem-03","les-g9-chem-04","les-g9-chem-05"]'::jsonb),
  ('unit-g9-bio-1', 9, 'biology', 1, 'ប្រព័ន្ធប្រសាទ និងវិញ្ញាណទាំង ៥', 'Nervous System, Hormones & Senses', 'រចនាសម្ព័ន្ធណឺរ៉ូន ខួរក្បាល ប្រព័ន្ធអង់ដូគ្រីន និងសរីរាង្គវិញ្ញាណ', 'Neuron anatomy, brain functions, endocrine hormones, and the five senses', '🧠', '["les-g9-bio-01","les-g9-bio-02","les-g9-bio-03"]'::jsonb),
  ('unit-g9-bio-2', 9, 'biology', 2, 'តំណពូជ និងប្រព័ន្ធភាពស៊ាំ', 'Genetics & Immune Defense', 'ក្រូម៉ូសូម ហ្សែន ការបញ្ជូនលក្ខណៈតំណពូជ និងប្រព័ន្ធការពាររាងកាយ', 'Chromosomes, genes, heredity patterns, and human immune defense', '🧬', '["les-g9-bio-04","les-g9-bio-05"]'::jsonb),
  ('unit-g9-earth-1', 9, 'earth', 1, 'បរិយាកាស និងធនធានធម្មជាតិកម្ពុជា', 'Atmosphere & Natural Resources', 'ស្រទាប់អូហ្សូន ធនធានរ៉ែ ធ្យូងថ្ម ប្រេងកាត និងទឹកជំនន់-រាំងស្ងួតនៅកម្ពុជា', 'Ozone layer, Cambodian mineral reserves, coal, petroleum, and flood patterns', '🌍', '["les-g9-earth-01","les-g9-earth-02","les-g9-earth-03"]'::jsonb),
  ('unit-g9-earth-2', 9, 'earth', 2, 'បរិស្ថាន និងថាមពលកកើតឡើងវិញ', 'Environment & Renewable Energy', 'ការគ្រប់គ្រងសំណល់រឹង ការបំពុលបរិស្ថាន និងថាមពលព្រះអាទិត្យ', 'Solid waste management, pollution control, and solar energy balance', '☀️', '["les-g9-earth-04","les-g9-earth-05"]'::jsonb),
  ('unit-g9-hist-1', 9, 'history', 1, 'សម័យមហានគរ និងចលនាទាមទារឯករាជ្យ ១៩៥៣', 'Angkor Peak & 1953 Independence Crusade', 'រជ្ជកាលព្រះបាទជ័យវរ្ម័នទី ៧ អាណាព្យាបាលបារាំង និងព្រះរាជបូជនីយកិច្ចឯករាជ្យ', 'Reign of Jayavarman VII, the French protectorate, and King Sihanouk''s independence crusade', '👑', '["les-g9-hist-01","les-g9-hist-02"]'::jsonb),
  ('unit-g9-geo-1', 9, 'geography', 1, 'ប្រជាសាស្ត្រ និងសេដ្ឋកិច្ចឧស្សាហកម្មកម្ពុជា', 'Demographics & Industrial Development', 'ពីរ៉ាមីតប្រជាជន ការធ្វើចំណាកស្រុក ឧស្សាហកម្មកាត់ដេរ និងពាណិជ្ជកម្មនាំចេញ', 'Population pyramid, labor migration, garment manufacturing, and export trade', '👥', '["les-g9-geo-01","les-g9-geo-02"]'::jsonb),
  ('unit-g9-eng-1', 9, 'english', 1, 'Brevet English: Reading, Modals & Composition', 'Brevet English: Reading, Modals & Composition', 'កិរិយាជំនួយ ល្បះអកម្ម បច្ចេកទេសសរសេរកថាខណ្ឌ និងការដោះស្រាយវិញ្ញាសាឌីប្លូម', 'Modal auxiliaries, passive voice, paragraph composition, and Brevet past papers', '🇬🇧', '["les-g9-eng-01","les-g9-eng-02"]'::jsonb),
  ('unit-g9-moral-1', 9, 'morality', 1, 'នីតិរដ្ឋ សិទ្ធិកុមារ និងស្ថាប័នប្រជាធិបតេយ្យ', 'Rule of Law, Child Rights & Democracy', 'សិទ្ធិកុមារទាំងបួន សុវត្ថិភាពចរាចរណ៍ តួនាទីរដ្ឋសភា និងការបោះឆ្នោតប្រជាធិបតេយ្យ', 'Four child rights pillars, road safety, legislative institutions, and democratic voting', '⚖️', '["les-g9-moral-01","les-g9-moral-02"]'::jsonb),
  ('unit-g10-math-1', 10, 'mathematics', 1, 'ពហុធា និងសមីការ-វិសមីការដឺក្រេទី២', 'Polynomials & Quadratic Equations', 'ឫសនៃពហុធា សញ្ញានៃត្រីធាដឺក្រេទី២ និងវិសមីការពីជគណិត', 'Polynomial roots, quadratic trinomial signs, and algebraic inequalities', '📐', '["les-g10-math-01","les-g10-math-02"]'::jsonb),
  ('unit-g10-math-2', 10, 'mathematics', 2, 'ត្រីកោណមាត្រកម្រិតខ្ពស់ និងវ៉ិចទ័រ', 'Trigonometry & Vector Analysis', 'រូបមន្តបូក គុណត្រីកោណមាត្រ វ៉ិចទ័រក្នុងប្លង់ និងផលគុណស្កាលែ', 'Trigonometric identities, planar vectors, and scalar dot products', '📊', '["les-g10-math-03","les-g10-math-04","les-g10-math-05"]'::jsonb),
  ('unit-g10-khmer-1', 10, 'khmer', 1, 'រឿងរាមកេរ្តិ៍ និងកាព្យបុរាណព្រហ្មគីតិ', 'Reamker Epic & Classical Brahmagit Poetry', 'ទស្សនវិជ្ជាធម៌ឈ្នះអធម៌ក្នុងរឿងរាមកេរ្តិ៍ និងចង្វាក់កាព្យបទព្រហ្មគីតិ-ឥន្ទ្រជិត', 'Dharma vs Adharma in the Reamker and metrical prosody of classical Brahmagit verse', '🎭', '["les-g10-khmer-01","les-g10-khmer-02"]'::jsonb),
  ('unit-g10-hist-1', 10, 'history', 1, 'សម័យកណ្តាល ពាណិជ្ជកម្មលង្វែក និងសម័យឧដុង្គ', 'Middle Period: Longvek & Oudong Dynasty', 'ការប្តូររាជធានីពីអង្គរ សេដ្ឋកិច្ចពាណិជ្ជកម្មអន្តរជាតិលង្វែក និងរាជធានីឧដុង្គ', 'Post-Angkorian transition, maritime commerce in Longvek, and the royal Oudong period', '🏯', '["les-g10-hist-01","les-g10-hist-02"]'::jsonb),
  ('unit-g10-geo-1', 10, 'geography', 1, 'ធនធានធម្មជាតិ និងការអភិរក្សជីវចម្រុះ', 'Natural Resources & Biodiversity Conservation', 'សក្តានុពលរ៉ែ ទំនប់វារីអគ្គិសនី ឧទ្យានជាតិ និងតំបន់ការពារធម្មជាតិកម្ពុជា', 'Hydropower potential, mineral resources, national parks, and wildlife sanctuaries', '⛰️', '["les-g10-geo-01","les-g10-geo-02"]'::jsonb),
  ('unit-g10-eng-1', 10, 'english', 1, 'Academic Grammar, Perfect Tenses & Conditionals', 'Academic Grammar, Perfect Tenses & Conditionals', 'Present Perfect vs Past Simple លក្ខខណ្ឌ Type 1 & 2 និងពាក្យភ្ជាប់គំនិតពិភាក្សា', 'Tense contrasts, conditional logic, and formal cause-effect transition connectors', '📖', '["les-g10-eng-01","les-g10-eng-02"]'::jsonb),
  ('unit-g10-ict-1', 10, 'ict', 1, 'ក្បួនដោះស្រាយបញ្ហា និងគំនូសតាង (Algorithms)', 'Algorithms, Pseudocode & Flowcharts', 'ការរៀបចំ Algorithm និមិត្តសញ្ញា Flowchart លក្ខខណ្ឌ និងរង្វិលជុំ Loops', 'Algorithmic thinking, flowchart logic gates, conditional branching, and iteration loops', '🔀', '["les-g10-ict-01","les-g10-ict-02"]'::jsonb),
  ('unit-g11-math-1', 11, 'mathematics', 1, 'លីមីតនៃអនុគមន៍ និងភាពជាប់', 'Limits of Functions & Continuity', 'លីមីតនៃអនុគមន៍សនិទាន ត្រីកោណមាត្រ និងភាពជាប់នៃអនុគមន៍ត្រង់ចំណុច', 'Rational and trigonometric function limits, indeterminate forms, and continuity', '📐', '["les-g11-math-01","les-g11-math-02"]'::jsonb),
  ('unit-g11-math-2', 11, 'mathematics', 2, 'ដេរីវេ ស្វ៊ីត និងប្រូបាប៊ីលីតេ', 'Derivatives, Sequences & Probability', 'រូបមន្តដេរីវេ អនុវត្តក្នុងការរកបរមា ស្វ៊ីតនព្វន្ត-ធរណីមាត្រ និងប្រូបាប', 'Differentiation rules, extrema, arithmetic/geometric progressions, and probability', '📈', '["les-g11-math-03","les-g11-math-04","les-g11-math-05"]'::jsonb),
  ('unit-g11-khmer-1', 11, 'khmer', 1, 'អក្សរសិល្ប៍ទំនើប៖ ស៊ីមអ្នកបរឡាន និងមាលាដួងចិត្ត', 'Modern Realism: Sim the Driver & Mealea Doung Chett', 'ការវិភាគវណ្ណៈកម្មករ ស្នេហាជាតិ និងទស្សនៈបញ្ញវន្តខ្មែរក្នុងអក្សរសិល្ប៍ទំនើប', 'Working-class solidarity, patriotism, and modern realism in 20th-century literature', '🚚', '["les-g11-khmer-01","les-g11-khmer-02"]'::jsonb),
  ('unit-g11-hist-1', 11, 'history', 1, 'សម័យអាណាព្យាបាលបារាំង និងចលនាតស៊ូខ្មែរ', 'French Protectorate & Cambodian Anticolonial Resistance', 'សន្ធិសញ្ញាឆ្នាំ ១៨៦៣ ចលនាអាចារ្យស្វា ក្រឡាហោមគង់ និងឥទ្ធិពលសង្គ្រាមលោក', 'The 1863 protectorate, peasant uprisings, monastic demonstrations, and wartime dynamics', '🏛️', '["les-g11-hist-01","les-g11-hist-02"]'::jsonb),
  ('unit-g11-geo-1', 11, 'geography', 1, 'នគរូបនីយកម្ម តំបន់សេដ្ឋកិច្ចពិសេស និងហេដ្ឋារចនាសម្ព័ន្ធ', 'Urbanization, SEZs & Strategic Logistics', 'ការរីកចម្រើននៃរាជធានីភ្នំពេញ តំបន់សេដ្ឋកិច្ចពិសេស ផ្លូវល្បឿនលឿន និងកំពង់ផែទឹកជ្រៅ', 'Urban growth, industrial SEZ corridors, expressway networks, and deep-sea ports', '🏙️', '["les-g11-geo-01","les-g11-geo-02"]'::jsonb),
  ('unit-g12-math-1', 12, 'mathematics', 1, 'គណិតវិភាគ អាំងតេក្រាល និងមាឌ', 'Calculus, Definite Integrals & Volumes', 'អាំងតេក្រាលកំណត់ ក្រឡាផ្ទៃ និងមាឌសូលីតបង្វិលជុំវិញអ័ក្ស Ox សម្រាប់បាក់ឌុប', 'Definite integrals, bounded curve area, and volume of solids of revolution', '∫', '["les-g12-math-01","les-g12-math-06","les-g12-math-03"]'::jsonb),
  ('unit-g12-math-2', 12, 'mathematics', 2, 'សមីការឌីផេរ៉ង់ស្យែល និងចំនួនកុំផ្លិច', 'Differential Equations & Complex Numbers', 'សមីការឌីផេរ៉ង់ស្យែលលំដាប់២ ទម្រង់ត្រីកោណមាត្រ និងរូបមន្តដឺម័រ (De Moivre)', 'Second-order linear ODEs, trigonometric complex forms, and De Moivre powers', '🔢', '["les-g12-math-07","les-g12-math-02","les-g12-math-08"]'::jsonb),
  ('unit-g12-math-3', 12, 'mathematics', 3, 'ធរណីមាត្រក្នុងលំហ Oxyz', '3D Analytic Geometry in Space', 'ផលគុណស្កាលែ ផលគុណវ៉ិចទ័រ សមីការប្លង់ និងចម្ងាយពីចំណុចទៅប្លង់', 'Vector cross products, plane equations Ax+By+Cz+D=0, and distance formulas', '📐', '["les-g12-math-04","les-g12-math-09"]'::jsonb),
  ('unit-g12-math-4', 12, 'mathematics', 4, 'ប្រូបាប៊ីលីតេ និងអថេរចៃដន្យ', 'Combinatorics & Random Variables', 'ចម្លាស់ បន្សំ C_n^k ប្រូបាបលក្ខខណ្ឌ អថេរចៃដន្យដាច់ និងសង្ឃឹមគណិត E(X)', 'Combinatorics, conditional probability, discrete random variables, and expectation', '🎲', '["les-g12-math-05","les-g12-math-10"]'::jsonb),
  ('unit-g12-khmer-1', 12, 'khmer', 1, 'រឿងរាមកេរ្តិ៍ និងភូមិតិរច្ឆាន (អក្សរសិល្ប៍បាក់ឌុប)', 'Classical & Realist Literature (Bac II)', 'ទស្សនវិជ្ជាសីលធម៌ក្នុងរឿងរាមកេរ្តិ៍ និងចលនាតស៊ូរបស់កសិករភូមិក្រាំងលាវ (ភូមិតិរច្ឆាន)', 'Dharmic ethics in the Reamker and peasant anticolonial resistance in Phum Tirachan', '👑', '["les-g12-khmer-01","les-g12-khmer-02"]'::jsonb),
  ('unit-g12-khmer-2', 12, 'khmer', 2, 'រឿងកុលាបប៉ៃលិន និងវិធីសាស្ត្រតែងសេចក្តីបាក់ឌុប', 'Kolap Pailin & Bac II Essay Composition', 'ការវិភាគតួអង្គចៅចិត្រ ទស្សនៈមនុស្សធម៌ និងគន្លឹះតែងសេចក្តីពន្យល់-ពិភាក្សា', 'Humanism in Kolap Pailin and rigorous MoEYS expository/discursive essay frameworks', '📖', '["les-g12-khmer-03","les-g12-khmer-04"]'::jsonb),
  ('unit-g12-phys-1', 12, 'physics', 1, 'មេកានិច និងលំយោលសេរី', 'Mechanics & Free Oscillations', 'ច្បាប់ញូតុនទី២ ឌីណាមិចនៃចលនា ប៉ោលទោល និងប៉ោលអេឡាស្ទិច', 'Newton''s second law, incline planes, simple pendulums, and elastic springs', '⏱️', '["les-g12-phys-01","les-g12-phys-04"]'::jsonb),
  ('unit-g12-phys-2', 12, 'physics', 2, 'រលក សៀគ្វី RLC និងរូបវិទ្យានុយក្លេអ៊ែរ', 'Waves, RLC Circuits & Nuclear Physics', 'អន្តរាគមន៍រលក អាំប៉េដង់សៀគ្វី RLC ការបំបែកវិទ្យុសកម្ម និងថាមពល E = mc²', 'Mechanical waves, RLC resonance, radioactive half-life, and nuclear binding energy', '〰️', '["les-g12-phys-02","les-g12-phys-03","les-g12-phys-05"]'::jsonb),
  ('unit-g12-chem-1', 12, 'chemistry', 1, 'ស៊ីនេទិចគីមី និងលំនឹងគីមី', 'Chemical Kinetics & Equilibrium', 'ល្បឿនប្រតិកម្ម កាតាលីករ ថេរលំនឹង Kc និងគោលការណ៍ Le Chatelier', 'Reaction rates, catalysts, activation energy, and equilibrium shift', '⏱️', '["les-g12-chem-01","les-g12-chem-02"]'::jsonb),
  ('unit-g12-chem-2', 12, 'chemistry', 2, 'អាស៊ីត-បាស អេឡិចត្រូគីមី និងគីមីសរីរាង្គ', 'Acids-Bases, Electrochemistry & Organics', 'ការគណនា pH អត្រាកម្ម ពីលហ្គាល់វ៉ានិច អេស្ទែរ និងខ្លាញ់ទ្រីគ្លីសេរីត', 'pH titrations, galvanic cells, electrolysis, esterification, and triglycerides', '🧪', '["les-g12-chem-03","les-g12-chem-04","les-g12-chem-05"]'::jsonb),
  ('unit-g12-bio-1', 12, 'biology', 1, 'ហ្សែនវិទ្យាម៉ូលេគុល និងច្បាប់ម៉ង់ដែល', 'Molecular Genetics & Mendelian Inheritance', 'ស្វ័យតម្រងទ្វេ DNA ការសំយោគប្រូតេអ៊ីន mRNA និងច្បាប់តំណពូជម៉ង់ដែល', 'DNA replication, translation, biotech cloning, and Mendelian dihybrid inheritance', '🧬', '["les-g12-bio-01","les-g12-bio-02","les-g12-bio-03"]'::jsonb),
  ('unit-g12-bio-2', 12, 'biology', 2, 'ប្រព័ន្ធភាពស៊ាំ និងការវិវត្តភាវៈរស់', 'Immunology & Organic Evolution', 'អង់ទីហ្សែន អង់ទីគ័រ វ៉ាក់សាំង និងទ្រឹស្តីជម្រើសធម្មជាតិដាវីន', 'Antibodies, cell-mediated immunity, vaccines, and Darwin''s natural selection', '🛡️', '["les-g12-bio-04","les-g12-bio-05"]'::jsonb),
  ('unit-g12-earth-1', 12, 'earth', 1, 'តារារូបវិទ្យា ចក្រវាល និងធនធានទឹក', 'Astrophysics, Universe & Hydrology', 'ទ្រឹស្តី Big Bang ជីវិតផ្កាយ ប្រហោងខ្មៅ និងអាងទន្លេមេគង្គកម្ពុជា', 'Big Bang cosmology, stellar evolution, and Mekong river basin hydrology', '🌌', '["les-g12-earth-01","les-g12-earth-02","les-g12-earth-03"]'::jsonb),
  ('unit-g12-earth-2', 12, 'earth', 2, 'គ្រោះមហន្តរាយ និងថាមពលកកើតឡើងវិញ', 'Disaster Risk & Renewable Green Energy', 'ប្រព័ន្ធព្រមានទុកជាមុន ថាមពលពន្លឺព្រះអាទិត្យ និងការអភិវឌ្ឍន៍ប្រកបដោយចីរភាព', 'Early disaster warning systems, solar energy, and sustainable green growth', '🌱', '["les-g12-earth-04","les-g12-earth-05"]'::jsonb),
  ('unit-g12-hist-1', 12, 'history', 1, 'សង្គ្រាមលោក និងកម្ពុជាប្រជាធិបតេយ្យ (១៩៧០-១៩៧៩)', 'World Conflicts & Democratic Kampuchea', 'សង្គ្រាមលោកលើកទី២ សង្គ្រាមត្រជាក់ របបសាធារណរដ្ឋខ្មែរ និងវាលពិឃាតខ្មែរក្រហម', 'WWII aftermath, Cold War polarization, Khmer Republic, and Khmer Rouge regime', '🏛️', '["les-g12-hist-01","les-g12-hist-02"]'::jsonb),
  ('unit-g12-hist-2', 12, 'history', 2, 'កិច្ចព្រមព្រៀងសន្តិភាពប៉ារីស និងនយោបាយឈ្នះ-ឈ្នះ', 'Paris Peace Accords & Win-Win Reunification', 'កិច្ចព្រមព្រៀង ២៣ តុលា ១៩៩១ ការបោះឆ្នោតអ៊ុនតាក់ និងនយោបាយឈ្នះ-ឈ្នះ ១៩៩៨', '1991 Paris Peace Accords, UNTAC mission, 1993 Constitution, and Win-Win policy', '✌️', '["les-g12-hist-03","les-g12-hist-04"]'::jsonb),
  ('unit-g12-geo-1', 12, 'geography', 1, 'សកលភាវូបនីយកម្ម និងសមាហរណកម្មអាស៊ាន', 'Globalization & ASEAN Integration', 'សសរស្តម្ភសេដ្ឋកិច្ចទាំងបួន សហគមន៍សេដ្ឋកិច្ចអាស៊ាន AEC និងកិច្ចព្រមព្រៀង RCEP', 'Four economic growth pillars, AEC single market, and RCEP international trade', '🌏', '["les-g12-geo-01","les-g12-geo-02"]'::jsonb),
  ('unit-g12-geo-2', 12, 'geography', 2, 'បម្រែបម្រួលអាកាសធាតុ និងនគរូបនីយកម្មភ្នំពេញ', 'Climate Resilience & Urban Master Planning', 'យុទ្ធសាស្ត្រធន់នឹងអាកាសធាតុ របបទឹកទន្លេមេគង្គ និងផែនការមេរាជធានីភ្នំពេញ ២០៣៥', 'Climate adaptation, Mekong hydrology, and Phnom Penh smart city master plan', '🏙️', '["les-g12-geo-03","les-g12-geo-04"]'::jsonb),
  ('unit-g12-eng-1', 12, 'english', 1, 'Bac II Academic Reading & Argumentative Writing', 'Bac II Academic Reading & Argumentative Writing', 'យុទ្ធសាស្ត្រអានយល់ន័យ វេយ្យាករណ៍កម្រិតខ្ពស់ Inversion និងតែងសេចក្តី PEEL', 'Reading comprehension, negative inversions, and argumentative essay composition', '🎓', '["les-g12-eng-01","les-g12-eng-02"]'::jsonb),
  ('unit-g12-moral-1', 12, 'morality', 1, 'រដ្ឋធម្មនុញ្ញ នីតិរដ្ឋ និងអភិបាលកិច្ចល្អ', 'Constitution, Rule of Law & Governance', 'ការបែងចែកអំណាចទាំងបី សិទ្ធិមនុស្ស ក្រមសីលធម៌វិជ្ជាជីវៈ និងអង្គភាព ACU', 'Trias politica constitutional separation, human rights, and Anti-Corruption mechanisms', '⚖️', '["les-g12-moral-01","les-g12-moral-02"]'::jsonb),
  ('unit-g12-ict-1', 12, 'ict', 1, 'មូលដ្ឋានទិន្នន័យ SQL និងបណ្តាញកុំព្យូទ័រ', 'Relational SQL & Network Cybersecurity', 'កូនសោចម្បង Primary Key សំណួរ SQL បណ្តាញ TCP/IP និងសុវត្ថិភាព Cloud', 'RDBMS primary/foreign keys, SQL queries, TCP/IP networking, and cybersecurity', '🗄️', '["les-g12-ict-01","les-g12-ict-02"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_km = EXCLUDED.title_km,
  title_en = EXCLUDED.title_en,
  description_km = EXCLUDED.description_km,
  description_en = EXCLUDED.description_en,
  icon = EXCLUDED.icon,
  lesson_ids = EXCLUDED.lesson_ids;

-- 3. Insert / Harmonize all 254 Curated MoEYS Lessons
DO $$
DECLARE
  v_subject_id UUID;
BEGIN
  -- Lesson: Signed Integers & Number Line (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Signed Integers & Number Line',
      'និយមន័យ និងការប្រៀបធៀបចំនួនគត់រ៉ឺឡាទីវ',
      'Positive integers, zero, negative integers, order relations, and the horizontal number line',
      'ស្វែងយល់ចំនួនគត់វិជ្ជមាន ចំនួនសូន្យ ចំនួនគត់អវិជ្ជមាន និងការប្រៀបធៀបលើបន្ទាត់ចំនួន',
      $BODY_EN$## 1. Signed Integers
Integers include positive whole numbers ($+1, +2, ...$), zero ($0$), and negative numbers ($-1, -2, ...$).

## 2. Order on the Number Line
Numbers to the right are always greater than numbers to the left: $+5 > +2$, $0 > -3$, and $-2 > -7$.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យចំនួនគត់រ៉ឺឡាទីវ
ចំនួនគត់រ៉ឺឡាទីវ (Integers) គឺជាសំណុំចំនួនដែលរួមមាន៖
- **ចំនួនគត់វិជ្ជមាន៖** $+1, +2, +3, +4, ...$ (ធំជាង $0$)
- **ចំនួនសូន្យ៖** $0$ (មិនវិជ្ជមាន ហើយក៏មិនអវិជ្ជមាន)
- **ចំនួនគត់អវិជ្ជមាន៖** $-1, -2, -3, -4, ...$ (តូចជាង $0$)

## ២. បន្ទាត់ចំនួន (The Number Line)
នៅលើបន្ទាត់ចំនួនដេក៖
- ចំណុចគល់ $0$ នៅកណ្តាល
- ចំនួនគត់វិជ្ជមាននៅខាងស្តាំ $0$
- ចំនួនគត់អវិជ្ជមាននៅខាងឆ្វេង $0$

## ៣. ការប្រៀបធៀបពីរចំនួនគត់
- ចំនួនណានៅខាងស្តាំលើបន្ទាត់ចំនួន តែងតែ **ធំជាង** ចំនួននៅខាងឆ្វេង៖
  $$+5 > +2, \quad 0 > -3, \quad -2 > -7$$
- ចំនួនគត់វិជ្ជមានតែងតែធំជាង $0$ និងធំជាងចំនួនគត់អវិជ្ជមានជានិច្ច។$BODY_KM$,
      18,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Addition & Subtraction of Signed Integers (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Addition & Subtraction of Signed Integers',
      'វិធីបូក និងវិធីដកចំនួនគត់រ៉ឺឡាទីវ',
      'Rules for adding same-sign and opposite-sign integers, and converting subtraction to additive inverse',
      'វិធានបូកចំនួនមានសញ្ញាដូចគ្នា សញ្ញាផ្ទុយគ្នា និងការប្តូរប្រមាណវិធីដកទៅជាបូកចំនួនផ្ទុយ',
      $BODY_EN$## 1. Addition Rules
- Same sign: add absolute values and keep sign: $(-3) + (-5) = -8$.
- Opposite signs: subtract smaller from larger absolute value and keep the sign of the larger: $(-7) + 15 = +8$.

## 2. Subtraction Rule
Subtracting a number is adding its opposite: $a - b = a + (-b)$.$BODY_EN$,
      $BODY_KM$## ១. វិធានប្រមាណវិធីបូក
- **បូកពីរចំនួនមានសញ្ញាដូចគ្នា៖** បូកតម្លៃដាច់ខាត រួចរក្សាសញ្ញារួមដដែល៖
  $$(+4) + (+6) = +10, \quad (-3) + (-5) = -8$$
- **បូកពីរចំនួនមានសញ្ញាផ្ទុយគ្នា៖** យកតម្លៃដាច់ខាតធំដកតម្លៃដាច់ខាតតូច រួចយកសញ្ញាតាមចំនួនដែលមានតម្លៃដាច់ខាតធំជាង៖
  $$(-7) + (+15) = +(15 - 7) = +8$$
  $$(+6) + (-11) = -(11 - 6) = -5$$

## ២. វិធានប្រមាណវិធីដក
ដើម្បីដកចំនួនគត់ $b$ ចេញពី $a$ យើងត្រូវបូក $a$ នឹងចំនួនផ្ទុយនៃ $b$៖
$$a - b = a + (-b)$$
- **ឧទាហរណ៍៖**
  $$7 - (+10) = 7 + (-10) = -3$$
  $$5 - (-4) = 5 + (+4) = 9$$
  $$(-8) - (-3) = (-8) + (+3) = -5$$$BODY_KM$,
      18,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Multiplication & Division of Signed Integers (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Multiplication & Division of Signed Integers',
      'វិធីគុណ និងវិធីចែកចំនួនគត់រ៉ឺឡាទីវ',
      'Sign rules for multiplication and division: like signs yield positive, unlike signs yield negative',
      'វិធានសញ្ញាក្នុងការគុណ និងចែក៖ សញ្ញាដូចគ្នាបានវិជ្ជមាន សញ្ញាខុសគ្នាបានអវិជ្ជមាន',
      $BODY_EN$## 1. Multiplication Sign Rules
- Like signs: $(+) \times (+) = (+)$ and $(-) \times (-) = (+)$.
- Unlike signs: $(+) \times (-) = (-)$ and $(-) \times (+) = (-)$.

## 2. Division Sign Rules
Follow the exact same signs as multiplication: $(-24) / (-6) = +4$ and $35 / (-7) = -5$.$BODY_EN$,
      $BODY_KM$## ១. វិធានសញ្ញាក្នុងវិធីគុណ
- សញ្ញាដូចគ្នា គុណគ្នា បានលទ្ធផល **វិជ្ជមាន (+)**៖
  $$(+) \times (+) = (+), \quad (-) \times (-) = (+)$$
  $$(+4) \times (+5) = +20, \quad (-3) \times (-7) = +21$$
- សញ្ញាខុសគ្នា គុណគ្នា បានលទ្ធផល **អវិជ្ជមាន (-)**៖
  $$(+) \times (-) = (-), \quad (-) \times (+) = (-)$$
  $$(+6) \times (-4) = -24, \quad (-5) \times (+8) = -40$$

## ២. វិធានសញ្ញាក្នុងវិធីចែក
វិធានសញ្ញាក្នុងវិធីចែកដូចគ្នានឹងវិធីគុណបេះបិទ៖
- $(+) \div (+) = (+), \quad (-) \div (-) = (+)$
  $$\frac{+18}{+3} = +6, \quad \frac{-24}{-6} = +4$$
- $(+) \div (-) = (-), \quad (-) \div (+) = (-)$
  $$\frac{+35}{-7} = -5, \quad \frac{-40}{+8} = -5$$$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Absolute Value & Order of Operations (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Absolute Value & Order of Operations',
      'តម្លៃដាច់ខាត និងលំដាប់នៃប្រមាណវិធី',
      'Absolute value |a| as distance from zero, nested grouping, and PEMDAS order of operations',
      'និយមន័យតម្លៃដាច់ខាត |a| ចម្ងាយពីសូន្យ និងវិធានលំដាប់ប្រមាណវិធី PEMDAS',
      $BODY_EN$## 1. Absolute Value
The absolute value $|a|$ represents distance from zero and is never negative: $|-8| = 8$.

## 2. Order of Operations
Parentheses $\rightarrow$ Exponents $\rightarrow$ Multiplication & Division (left to right) $\rightarrow$ Addition & Subtraction.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យតម្លៃដាច់ខាត
តម្លៃដាច់ខាតនៃចំនួន $a$ តាងដោយ $|a|$ គឺជាចម្ងាយពីចំណុច $a$ ទៅចំណុច $0$ នៅលើបន្ទាត់ចំនួន។ តម្លៃដាច់ខាតតែងតែ $\ge 0$៖
- $|+8| = 8, \quad |-8| = 8, \quad |0| = 0$
- ចំពោះចំនួនពីរផ្ទុយគ្នា មានតម្លៃដាច់ខាតស្មើគ្នា៖ $|a| = |-a|$

## ២. លំដាប់នៃប្រមាណវិធី (PEMDAS)
នៅពេលគណនាកន្សោមលេខដែលមានប្រមាណវិធីចម្រុះ ត្រូវអនុវត្តតាមលំដាប់៖
១. គណនាក្នុងវង់ក្រចកជាមុន $(\dots)$
២. គណនាស្វ័យគុណ
៣. គណនាវិធីគុណ និងចែក (ពីឆ្វេងទៅស្តាំ)
៤. គណនាវិធីបូក និងដក (ពីឆ្វេងទៅស្តាំ)$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Equivalent Fractions & Simplification (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Equivalent Fractions & Simplification',
      'ប្រភាគសមមូល និងការសម្រួលប្រភាគ',
      'Equivalent fractions, scaling numerator/denominator, and finding irreducible forms via GCD',
      'ប្រភាគស្មើគ្នា ការគុណឬចែកភាគយកនិងភាគបែងនឹងចំនួនដូចគ្នា និងប្រភាគសម្រួលលែងបាន',
      $BODY_EN$## 1. Equivalent Fractions
Two fractions $\frac{a}{b} = \frac{c}{d}$ are equivalent if and only if cross products match: $a \cdot d = b \cdot c$.

## 2. Simplification
Divide numerator and denominator by their greatest common divisor (GCD).$BODY_EN$,
      $BODY_KM$## ១. និយមន័យប្រភាគសមមូល
ប្រភាគពីរ $\frac{a}{b}$ និង $\frac{c}{d}$ ($b, d \neq 0$) ហៅថាសមមូលគ្នា (ស្មើគ្នា) លុះត្រាតែផលគុណខ្វែងស្មើគ្នា៖
$$\frac{a}{b} = \frac{c}{d} \iff a \cdot d = b \cdot c$$
ឧទាហរណ៍៖ $\frac{2}{3} = \frac{6}{9}$ ព្រោះ $2 \times 9 = 3 \times 6 = 18$។

## ២. ការសម្រួលប្រភាគ
ដើម្បីសម្រួលប្រភាគឱ្យទៅជាប្រភាគសម្រួលលែងបាន យើងត្រូវចែកភាគយក និងភាគបែងនឹងតួចែករួមធំបំផុត (GCD) របស់ពួកវា៖
$$\frac{24}{36} = \frac{24 \div 12}{36 \div 12} = \frac{2}{3}$$$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Adding & Subtracting Fractions with LCM (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Adding & Subtracting Fractions with LCM',
      'វិធីបូក និងដកប្រភាគមានភាគបែងខុសគ្នា',
      'Least common multiple (LCM) for denominators, fraction addition, subtraction, and mixed numbers',
      'ការរកភាគបែងរួមតូចបំផុត (LCM) តម្រូវភាគបែង និងការបូកដកប្រភាគចម្រុះ',
      $BODY_EN$## Adding & Subtracting Fractions
Find the least common multiple (LCM) of denominators, scale numerators, and combine over common denominator.$BODY_EN$,
      $BODY_KM$## ១. វិធានបូក និងដកប្រភាគ
ដើម្បីបូកឬដកប្រភាគដែលមានភាគបែងខុសគ្នា៖
១. រកភាគបែងរួមតូចបំផុត (LCM នៃភាគបែង)
២. តម្រូវភាគបែងនៃប្រភាគនីមួយៗឱ្យដូចគ្នា
៣. បូកឬដកភាគយក រួចរក្សាភាគបែងរួមដដែល៖
$$\frac{a}{b} \pm \frac{c}{d} = \frac{ad \pm bc}{bd}$$

> **ឧទាហរណ៍៖** គណនា $\frac{3}{4} + \frac{1}{6}$
> ភាគបែងរួមតូចបំផុតនៃ $4$ និង $6$ គឺ $12$៖
> $$\frac{3 \times 3}{4 \times 3} + \frac{1 \times 2}{6 \times 2} = \frac{9}{12} + \frac{2}{12} = \frac{11}{12}$$$BODY_KM$,
      20,
      35,
      true,
      6
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Multiplying & Dividing Fractions (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Multiplying & Dividing Fractions',
      'វិធីគុណ និងចែកប្រភាគ',
      'Direct numerator/denominator multiplication, cross-cancellation, and division by reciprocal',
      'វិធានគុណភាគយកនឹងភាគយក ភាគបែងនឹងភាគបែង និងវិធីចែកដោយគុណនឹងចម្រាស',
      $BODY_EN$## 1. Multiplying Fractions
Multiply across: $\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}$.

## 2. Dividing Fractions
Multiply by reciprocal: $\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{ad}{bc}$.$BODY_EN$,
      $BODY_KM$## ១. វិធីគុណប្រភាគ
គុណភាគយកនឹងភាគយក ហើយភាគបែងនឹងភាគបែង (អាចសម្រួលមុនគុណដើម្បីងាយស្រួល)៖
$$\frac{a}{b} \times \frac{c}{d} = \frac{a \cdot c}{b \cdot d}$$
- **ឧទាហរណ៍៖** $\frac{3}{5} \times \frac{10}{9} = \frac{3 \times 10}{5 \times 9} = \frac{30}{45} = \frac{2}{3}$

## ២. វិធីចែកប្រភាគ
ចែកប្រភាគទីមួយនឹងប្រភាគទីពីរ ស្មើនឹងគុណប្រភាគទីមួយនឹង **ចម្រាស** នៃប្រភាគទីពីរ៖
$$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{a \cdot d}{b \cdot c}$$
- **ឧទាហរណ៍៖** $\frac{4}{7} \div \frac{2}{3} = \frac{4}{7} \times \frac{3}{2} = \frac{12}{14} = \frac{6}{7}$$BODY_KM$,
      18,
      35,
      true,
      7
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Decimals & Fraction Conversion (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Decimals & Fraction Conversion',
      'ចំនួនទសភាគ និងការបំប្លែងរវាងប្រភាគ-ទសភាគ',
      'Decimal place values, arithmetic with decimals, and converting rational fractions to decimals',
      'តម្លៃតាមខ្ទង់នៃចំនួនទសភាគ ប្រមាណវិធីលើទសភាគ និងការបំប្លែងប្រភាគទៅជាទសភាគ',
      $BODY_EN$## Converting Fractions and Decimals
- Fraction to decimal: divide numerator by denominator: $3/4 = 0.75$.
- Decimal to fraction: place over powers of 10 and simplify: $0.25 = 25/100 = 1/4$.$BODY_EN$,
      $BODY_KM$## ១. ចំនួនទសភាគ និងតម្លៃតាមខ្ទង់
ចំនួនទសភាគមានពីរផ្នែក ខណ្ឌដោយសញ្ញាក្បៀស (ឬចុច)៖
- ផ្នែកគត់ (ខាងឆ្វេង)៖ ខ្ទង់រាយ, ខ្ទង់ដប់, ខ្ទង់រយ...
- ផ្នែកទសភាគ (ខាងស្តាំ)៖ ខ្ទង់ភាគដប់ ($\frac{1}{10}$), ខ្ទង់ភាគរយ ($\frac{1}{100}$)...

## ២. ការបំប្លែងរវាងប្រភាគ និងទសភាគ
- **ប្រភាគទៅជាទសភាគ៖** យកភាគយកចែកនឹងភាគបែង៖
  $$\frac{3}{4} = 3 \div 4 = 0.75, \quad \frac{1}{8} = 0.125$$
- **ទសភាគទៅជាប្រភាគ៖** សរសេរលើភាគបែងស្វ័យគុណដប់ រួចសម្រួល៖
  $$0.4 = \frac{4}{10} = \frac{2}{5}, \quad 0.25 = \frac{25}{100} = \frac{1}{4}$$$BODY_KM$,
      18,
      35,
      true,
      8
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Percentages, Discounts & Simple Interest (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Percentages, Discounts & Simple Interest',
      'ភាគរយ និងការគណនាការប្រាក់ ការបញ្ចុះតម្លៃ',
      'Percentage definitions, finding a percentage of a quantity, discount calculation, and simple interest',
      'និយមន័យភាគរយ ការគណនាភាគរយនៃបរិមាណ ការបញ្ចុះតម្លៃ និងការប្រាក់សាមញ្ញ I = P · r · t',
      $BODY_EN$## Percentages & Applications
$P\% = P/100$. Discount amount = Original Price $\times$ Discount Rate. Sale Price = Original Price - Discount.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យភាគរយ (%)
ភាគរយ គឺជាផលធៀបដែលមានភាគបែងស្មើ $100$៖
$$P\% = \frac{P}{100}$$

## ២. ការគណនាភាគរយនៃចំនួនមួយ
ដើម្បីរក $P\%$ នៃចំនួន $A$ យើងគុណ $A$ នឹង $\frac{P}{100}$៖
$$\text{តម្លៃ} = A \times \frac{P}{100}$$
- **ឧទាហរណ៍៖** $20\%$ នៃ $500\$$ គឺ $500 \times 0.20 = 100\$$។

## ៣. ការគណនាការបញ្ចុះតម្លៃ (Discount)
$$\text{តម្លៃលក់} = \text{តម្លៃដើម} - \text{ប្រាក់បញ្ចុះ}$$$BODY_KM$,
      20,
      35,
      true,
      9
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Powers & Base Exponent Notation (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Powers & Base Exponent Notation',
      'ស្វ័យគុណនៃចំនួនគត់ និងទសភាគ',
      'Definition of power aⁿ, base, exponent, and evaluating numerical power expressions',
      'និយមន័យស្វ័យគុណ aⁿ គោល និទស្សន្ត និងការគណនាតម្លៃលេខនៃស្វ័យគុណ',
      $BODY_EN$## Powers Notation
$a^n$ denotes $a$ multiplied by itself $n$ times. Negative base with even exponent is positive; with odd exponent is negative.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យស្វ័យគុណ
ស្វ័យគុណនៃចំនួន $a$ ស្វ័យគុណ $n$ ($n \in \mathbb{N}^*$) គឺជាផលគុណនៃ $n$ កត្តាស្មើៗគ្នាដែលកត្តានីមួយៗស្មើ $a$៖
$$a^n = \underbrace{a \times a \times a \times \dots \times a}_{n \text{ កត្តា}}$$
- $a$ ហៅថា **គោល (Base)**
- $n$ ហៅថា **និទស្សន្ត (Exponent)**

## ២. ឧទាហរណ៍នៃការគណនា
- $2^4 = 2 \times 2 \times 2 \times 2 = 16$
- $(-3)^2 = (-3) \times (-3) = +9$
- $(-3)^3 = (-3) \times (-3) \times (-3) = -27$
- វិធានសញ្ញា៖ ចំនួនអវិជ្ជមានស្វ័យគុណគូ ផ្តល់ផលវិជ្ជមាន; ស្វ័យគុណសេស ផ្តល់ផលអវិជ្ជមាន។$BODY_KM$,
      18,
      35,
      true,
      10
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Exponent Rules for Products & Quotients (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Exponent Rules for Products & Quotients',
      'វិធានផលគុណ និងផលចែកស្វ័យគុណ aᵐ · aⁿ',
      'Product of powers rule aᵐ · aⁿ = aᵐ⁺ⁿ and quotient of powers rule aᵐ / aⁿ = aᵐ⁻ⁿ',
      'រូបមន្តគុណស្វ័យគុណគោលដូចគ្នា aᵐ · aⁿ = aᵐ⁺ⁿ និងផលចែក aᵐ / aⁿ = aᵐ⁻ⁿ',
      $BODY_EN$## Product and Quotient Rules
- Product rule: $a^m \cdot a^n = a^{m+n}$.
- Quotient rule: $\frac{a^m}{a^n} = a^{m-n}$ for $a \neq 0$.$BODY_EN$,
      $BODY_KM$## ១. ផលគុណនៃស្វ័យគុណមានគោលដូចគ្នា
ដើម្បីគុណស្វ័យគុណដែលមានគោលដូចគ្នា យើងរក្សាគោលទុកដដែល រួចបូកនិទស្សន្តចូលគ្នា៖
$$a^m \cdot a^n = a^{m + n}$$
- **ឧទាហរណ៍៖** $3^2 \times 3^4 = 3^{2+4} = 3^6 = 729$

## ២. ផលចែកនៃស្វ័យគុណមានគោលដូចគ្នា
ដើម្បីចែកស្វ័យគុណដែលមានគោលដូចគ្នា ($a \neq 0, m \ge n$) យើងរក្សាគោលទុកដដែល រួចដកនិទស្សន្ត៖
$$\frac{a^m}{a^n} = a^{m - n}$$
- **ឧទាហរណ៍៖** $\frac{5^7}{5^4} = 5^{7-4} = 5^3 = 125$$BODY_KM$,
      18,
      35,
      true,
      11
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Power of a Power & Zero Exponents (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Power of a Power & Zero Exponents',
      'ស្វ័យគុណនៃស្វ័យគុណ (aᵐ)ⁿ និងស្វ័យគុណសូន្យ',
      'Power of a power rule (aᵐ)ⁿ = aᵐⁿ, power of a product (ab)ⁿ = aⁿbⁿ, and zero exponent a⁰ = 1',
      'រូបមន្ត (aᵐ)ⁿ = aᵐ·ⁿ, ស្វ័យគុណនៃផលគុណ (ab)ⁿ = aⁿbⁿ និងស្វ័យគុណសូន្យ a⁰ = 1',
      $BODY_EN$## Power of a Power and Zero Exponent
- Power of a power: $(a^m)^n = a^{mn}$.
- Power of a product: $(ab)^n = a^n b^n$.
- Zero exponent rule: $a^0 = 1$ for any non-zero base $a$.$BODY_EN$,
      $BODY_KM$## ១. ស្វ័យគុណនៃស្វ័យគុណ
ដើម្បីគណនាស្វ័យគុណនៃស្វ័យគុណ យើងរក្សាគោលដដែល រួចគុណនិទស្សន្តនឹងនិទស្សន្ត៖
$$(a^m)^n = a^{m \cdot n}$$
- **ឧទាហរណ៍៖** $(2^3)^2 = 2^{3 \times 2} = 2^6 = 64$

## ២. ស្វ័យគុណនៃផលគុណ និងផលចែក
$$(a \cdot b)^n = a^n \cdot b^n, \quad \left(\frac{a}{b}\right)^n = \frac{a^n}{b^n} \quad (b \neq 0)$$

## ៣. ស្វ័យគុណសូន្យ (Zero Exponent)
គ្រប់ចំនួន $a \neq 0$ លើកជាស្វ័យគុណ $0$ តែងតែស្មើនឹង $1$៖
$$a^0 = 1 \quad (a \neq 0)$$
- **ឧទាហរណ៍៖** $7^0 = 1, \quad (-15)^0 = 1$$BODY_KM$,
      18,
      35,
      true,
      12
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Algebraic Expressions & Value Evaluation (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Algebraic Expressions & Value Evaluation',
      'កន្សោមពីជគណិត និងការគណនាតម្លៃលេខ',
      'Variables, coefficients, constant terms, and substituting numerical values into algebraic expressions',
      'អញ្ញាត អថេរ មេគុណ និងការជំនួសតម្លៃលេខដើម្បីគណនាតម្លៃនៃកន្សោមពីជគណិត',
      $BODY_EN$## Evaluating Expressions
Substitute given numerical values for each variable and follow standard order of operations.$BODY_EN$,
      $BODY_KM$## ១. អ្វីជាកន្សោមពីជគណិត?
កន្សោមពីជគណិត គឺជាកន្សោមដែលផ្សំឡើងពីលេខ អក្សរ (អញ្ញាត ឬអថេរ) និងសញ្ញាប្រមាណវិធីគណិតវិទ្យា ($+, -, \times, \div$)៖
- ឧទាហរណ៍៖ $2x + 5, \quad 3a^2 - 4b + 1$
- ក្នុងតួ $2x$៖ $2$ ជា **មេគុណ (Coefficient)** ហើយ $x$ ជា **អថេរ (Variable)**

## ២. ការគណនាតម្លៃលេខនៃកន្សោម
ដើម្បីគណនាតម្លៃនៃកន្សោមពីជគណិតចំពោះតម្លៃអថេរដែលបានកំណត់ យើងគ្រាន់តែ **ជំនួសលេខ** នោះចូលក្នុងកន្សោម រួចគណនាតាមលំដាប់ប្រមាណវិធី៖
> **ឧទាហរណ៍៖** គណនាតម្លៃនៃ $A = 3x^2 - 2x + 7$ ចំពោះ $x = 2$
> $$A = 3(2)^2 - 2(2) + 7 = 3(4) - 4 + 7 = 12 - 4 + 7 = 15$$$BODY_KM$,
      20,
      35,
      true,
      13
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Monomials & Basic Polynomial Operations (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Monomials & Basic Polynomial Operations',
      'ឯកធា និងពហុធាគ្រឹះ',
      'Monomial definitions, like terms, combining like terms, and polynomial degree',
      'និយមន័យឯកធា ឯកធាដូចគ្នា ការបូកដកឯកធា និងការបង្រួមពហុធា',
      $BODY_EN$## Monomials and Like Terms
Like terms share identical variables and exponents. Combine by adding or subtracting coefficients: $3x^2 + 5x^2 = 8x^2$.$BODY_EN$,
      $BODY_KM$## ១. ឯកធា (Monomials)
ឯកធា គឺជាកន្សោមពីជគណិតដែលមានតែផលគុណរវាងចំនួនពិត និងអថេរដែលមាននិទស្សន្តជាចំនួនគត់វិជ្ជមាន៖
- ឧទាហរណ៍៖ $5x, \quad -3x^2y, \quad 7$

## ២. ឯកធាដូចគ្នា (Like Terms)
ឯកធាពីរឬច្រើន ហៅថាដូចគ្នា លុះត្រាតែមាន **ផ្នែកអថេរដូចគ្នាទាំងស្រុង** (អក្សរដូចគ្នា និងស្វ័យគុណដូចគ្នា)៖
- $3x^2$ និង $-5x^2$ ជាឯកធាដូចគ្នា
- $2x$ និង $2x^2$ មិនដូចគ្នាទេ

## ៣. ការបូក និងដកឯកធាដូចគ្នា
ដើម្បីបូកឬដកឯកធាដូចគ្នា យើងបូកឬដកតែមេគុណ រួចរក្សាផ្នែកអថេរទុកដដែល៖
$$3x^2 + 5x^2 = (3 + 5)x^2 = 8x^2$$
$$7ab - 4ab = (7 - 4)ab = 3ab$$$BODY_KM$,
      20,
      35,
      true,
      14
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Solving 1-Variable Linear Equations (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Solving 1-Variable Linear Equations',
      'សមីការដឺក្រេទី១ មានមួយអញ្ញាត ax + b = c',
      'Transposition rules, isolating single variables, and verifying solutions through substitution',
      'វិធានផ្ទេរតួ ដោះស្រាយសមីការដឺក្រេទី១ មានមួយអញ្ញាត និងការផ្ទៀងផ្ទាត់ចម្លើយ',
      $BODY_EN$## Linear Equations
Isolate the variable by transposing constants to the opposite side and dividing by the leading coefficient: $ax + b = c \implies x = (c-b)/a$.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យសមីការដឺក្រេទី១
សមីការដឺក្រេទី១ មានមួយអញ្ញាត $x$ គឺជាសមភាពដែលអាចសរសេរជាទម្រង់៖
$$ax + b = c \quad (a \neq 0)$$

## ២. វិធាននៃការដោះស្រាយ
១. ផ្ទេរតួគ្មានអញ្ញាតទៅអង្គម្ខាងទៀត ដោយ **ប្តូរសញ្ញា** ($+$ ទៅ $-$, $-$ ទៅ $+$)៖
   $$ax = c - b$$
២. ចែកអង្គទាំងពីរនឹងមេគុណ $a$៖
   $$x = \frac{c - b}{a}$$

> **ឧទាហរណ៍៖** ដោះស្រាយ $4x - 7 = 13$
> $$4x = 13 + 7 = 20 \implies x = \frac{20}{4} = 5$$
> **ផ្ទៀងផ្ទាត់៖** $4(5) - 7 = 20 - 7 = 13$ (ពិត)$BODY_KM$,
      20,
      35,
      true,
      15
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Ratios, Proportions & Direct Variation (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Ratios, Proportions & Direct Variation',
      'ផលធៀប និងសមាមាត្រ a/b = c/d',
      'Ratios, proportions a/b = c/d, cross multiplication ad = bc, and solving for unknowns',
      'ផលធៀប សមាមាត្រស្មើគ្នា លក្ខណៈផលគុណខ្វែង និងការទាញរកអញ្ញាតក្នុងសមាមាត្រ',
      $BODY_EN$## Proportions and Cross Multiplication
In any proportion $\frac{a}{b} = \frac{c}{d}$, cross multiplication holds: $ad = bc$.$BODY_EN$,
      $BODY_KM$## ១. សមាមាត្រ (Proportion)
សមាមាត្រ គឺជាសមភាពរវាងផលធៀបពីរ៖
$$\frac{a}{b} = \frac{c}{d} \quad (b, d \neq 0)$$

## ២. លក្ខណៈគ្រឹះ (ផលគុណខ្វែង)
ក្នុងសមាមាត្រណាក៏ដោយ ផលគុណតួចុងស្មើផលគុណតួកណ្តាល៖
$$a \cdot d = b \cdot c$$

> **ឧទាហរណ៍៖** រកតម្លៃ $x$ បើ $\frac{x}{8} = \frac{3}{4}$
> $$4x = 8 \times 3 = 24 \implies x = \frac{24}{4} = 6$$$BODY_KM$,
      18,
      35,
      true,
      16
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Linear Inequalities & Graphs (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Linear Inequalities & Graphs',
      'វិសមីការដឺក្រេទី១ មានមួយអញ្ញាត',
      'Inequality symbols, sign reversal when multiplying/dividing by negative numbers, and interval graphs',
      'សញ្ញាវិសមភាព (<, >, ≤, ≥), វិធានគុណចែកនឹងចំនួនអវិជ្ជមាន និងការគូសចម្លើយលើបន្ទាត់ចំនួន',
      $BODY_EN$## Linear Inequalities
When multiplying or dividing both sides by a negative number, always reverse the inequality symbol ($<$ becomes $>$, $\ge$ becomes $\le$).$BODY_EN$,
      $BODY_KM$## ១. និយមន័យវិសមីការ
វិសមីការដឺក្រេទី១ មានមួយអញ្ញាត ជាវិសមភាពដែលមានទម្រង់ $ax + b > 0$, $ax + b < 0$, $ax + b \ge 0$, ឬ $ax + b \le 0$។

## ២. វិធានសំខាន់ក្នុងការដោះស្រាយ
- បូកឬដកចំនួនដូចគ្នាលើអង្គទាំងពីរ៖ វិសមភាព **មិនប្តូរទិសដៅ**
- គុណឬចែកអង្គទាំងពីរនឹងចំនួន **វិជ្ជមាន**៖ វិសមភាព **មិនប្តូរទិសដៅ**
- **សំខាន់បំផុត៖** កាលណាគុណឬចែកនឹងចំនួន **អវិជ្ជមាន** ត្រូវតែ **ប្តូរទិសដៅវិសមភាព** ($>$ ទៅ $<$, $\le$ ទៅ $\ge$)៖
  $$-2x < 6 \implies x > \frac{6}{-2} = -3$$$BODY_KM$,
      20,
      35,
      true,
      17
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Applied Word Problems & Modeling (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Applied Word Problems & Modeling',
      'ចំណោទគណិតវិទ្យាដោះស្រាយដោយប្រើសមីការ',
      '4-step modeling: variable assignment, equation formulation, solving, and contextual interpretation',
      'ជំហានទាំង ៤ ក្នុងការដោះស្រាយចំណោទ៖ តាងអញ្ញាត បង្កើតសមីការ ដោះស្រាយ និងបកស្រាយចម្លើយ',
      $BODY_EN$## Solving Word Problems
Define the variable $x$, translate conditions into an algebraic equation, solve for $x$, and verify solution in original context.$BODY_EN$,
      $BODY_KM$## ១. ជំហានទាំង ៤ ដោះស្រាយចំណោទ
១. **ជ្រើសរើសអញ្ញាត៖** តាងអក្សរ $x$ ជំនួសបរិមាណដែលមិនទាន់ស្គាល់ និងកំណត់ខ្នាត
២. **បង្កើតសមីការ៖** បកប្រែឃ្លាប្រធានចំណោទទៅជាសមីការគណិតវិទ្យា
៣. **ដោះស្រាយសមីការ៖** ស្វែងរកតម្លៃ $x$
៤. **ផ្ទៀងផ្ទាត់ និងឆ្លើយ៖** ពិនិត្យមើលថាតើតម្លៃ $x$ ស្របនឹងស្ថានភាពជាក់ស្តែងឬទេ រួចឆ្លើយសំណួរ។

> **ឧទាហរណ៍៖** ផលបូកពីរចំនួនជាប់គ្នាស្មើ $35$។ រកចំនួនទាំងពីរនោះ។
> - តាងចំនួនទី១ ដោយ $x$ នោះចំនួនបន្ទាប់គឺ $x + 1$
> - សមីការ៖ $x + (x + 1) = 35 \implies 2x = 34 \implies x = 17$
> - ដូចនេះចំនួនទាំងពីរគឺ $17$ និង $18$។$BODY_KM$,
      22,
      35,
      true,
      18
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Points, Lines, Rays & Segments (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Points, Lines, Rays & Segments',
      'ចំណុច បន្ទាត់ កាំរស្មី និងអង្កត់',
      'Foundational geometry elements: collinear points, line segments, rays, and midpoint theorem',
      'ធរណីមាត្រគ្រឹះក្នុងប្លង់ ចំណុចកណ្តាលនៃអង្កត់ និងប្រវែងរង្វាស់',
      $BODY_EN$## Foundational Elements
Points have coordinates. Rays extend indefinitely in one direction. A midpoint divides segment $[AB]$ into two equal halves.$BODY_EN$,
      $BODY_KM$## ១. ធាតុគ្រឹះនៃធរណីមាត្រ
- **ចំណុច (Point)៖** សម្គាល់ទីតាំងក្នុងលំហ គ្មានទំហំ (តាងដោយអក្សរធំ $A, B, C$)
- **បន្ទាត់ (Line)៖** លាតសន្ធឹងសងខាងគ្មានទីបញ្ចប់ (តាងដោយ $(d)$ ឬ $(AB)$)
- **កាំរស្មី (Ray)៖** មានចំណុចគល់មួយ ហើយលាតសន្ធឹងទៅម្ខាងទៀតគ្មានទីបញ្ចប់ (តាងដោយ $[Ax)$)
- **អង្កត់ (Segment)៖** ផ្នែកនៃបន្ទាត់ដែលខណ្ឌដោយចំណុចពីរ (តាងដោយ $[AB]$) មានប្រវែងកំណត់ $AB$

## ២. ចំណុចកណ្តាលនៃអង្កត់ (Midpoint)
ចំណុច $M$ ហៅថាចំណុចកណ្តាលនៃអង្កត់ $[AB]$ កាលណា $M$ ស្ថិតនៅលើ $[AB]$ ហើយ $MA = MB = \frac{AB}{2}$។$BODY_KM$,
      18,
      35,
      true,
      19
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Parallel, Perpendicular Lines & Transversals (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Parallel, Perpendicular Lines & Transversals',
      'បន្ទាត់ស្រប បន្ទាត់កែង និងលក្ខណៈមុំ',
      'Perpendicular lines, perpendicular bisectors, parallel line transversals, and alternate interior angles',
      'បន្ទាត់កាត់កែង មេដ្យាទ័រ បន្ទាត់ស្របកាត់ដោយខ្នាត់ និងមុំឆ្លាស់ក្នុង-ក្រៅ',
      $BODY_EN$## Parallel Lines & Transversals
When two parallel lines are cut by a transversal, alternate interior angles are congruent, and interior consecutive angles sum to $180^\circ$.$BODY_EN$,
      $BODY_KM$## ១. បន្ទាត់កែង និងមេដ្យាទ័រ
- បន្ទាត់ពីរហៅថាកែងគ្នា កាលណាពួកវាប្រសព្វគ្នាបង្កើតបានមុំកែង $90^\circ$ (តាងដោយ $d_1 \perp d_2$)
- **មេដ្យាទ័រ (Perpendicular Bisector)៖** ជាបន្ទាត់ដែលកាត់កែងនឹងអង្កត់មួយត្រង់ចំណុចកណ្តាលរបស់វា

## ២. បន្ទាត់ស្របកាត់ដោយខ្នាត់
នៅពេលបន្ទាត់ស្របពីរ $(d_1) \parallel (d_2)$ ត្រូវបានកាត់ដោយបន្ទាត់ទីបី $(\Delta)$៖
- មុំឆ្លាស់ក្នុងស្មើគ្នា
- មុំឆ្លាស់ក្រៅស្មើគ្នា
- មុំស្របគ្នាស្មើគ្នា
- មុំក្នុងរួមខាងមានផលបូកស្មើ $180^\circ$ (មុំបន្ថែមគ្នា)$BODY_KM$,
      20,
      35,
      true,
      20
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Angle Classification & Triangle Sum Theorem (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Angle Classification & Triangle Sum Theorem',
      'ប្រភេទមុំ និងផលបូកមុំក្នុងត្រីកោណ ១៨០°',
      'Acute, right, obtuse angles, vertical angles, and the fundamental theorem that triangle angles sum to 180°',
      'មុំស្រួច មុំកែង មុំទាល មុំទល់កំពូល និងទ្រឹស្តីបទផលបូករង្វាស់មុំក្នុងត្រីកោណស្មើ ១៨០ ដឺក្រេ',
      $BODY_EN$## Triangle Sum Theorem
The interior angles of any planar triangle sum to exactly $180^\circ$: $\angle A + \angle B + \angle C = 180^\circ$.$BODY_EN$,
      $BODY_KM$## ១. ចំណាត់ថ្នាក់មុំ
- **មុំស្រួច (Acute Angle)៖** $0^\circ < \alpha < 90^\circ$
- **មុំកែង (Right Angle)៖** $\alpha = 90^\circ$
- **មុំទាល (Obtuse Angle)៖** $90^\circ < \alpha < 180^\circ$
- **មុំរាប (Straight Angle)៖** $\alpha = 180^\circ$
- **មុំទល់កំពូល (Vertical Angles)៖** តែងតែមានរង្វាស់ស្មើគ្នាជានិច្ច

## ២. ផលបូកមុំក្នុងត្រីកោណ
ក្នុងគ្រប់ត្រីកោណ $ABC$ ផលបូករង្វាស់មុំក្នុងទាំងបី តែងតែស្មើនឹង $180^\circ$៖
$$\angle A + \angle B + \angle C = 180^\circ$$
- ក្នុងត្រីកោណកែង៖ ផលបូកមុំស្រួចទាំងពីរស្មើ $90^\circ$
- ក្នុងត្រីកោណសម័ង្ស៖ មុំនីមួយៗស្មើ $60^\circ$$BODY_KM$,
      20,
      35,
      true,
      21
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Quadrilaterals, Parallelograms & Polygons (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Quadrilaterals, Parallelograms & Polygons',
      'ចតុកោណ និងពហុកោណ',
      'Parallelograms, rectangles, squares, rhombi, trapezoids, and the 360° quadrilateral angle sum',
      'ចតុកោណកែង ការ៉េ ប្រលេឡូក្រាម ចតុកោណព្នាយ និងផលបូកមុំក្នុងចតុកោណ ៣៦០ ដឺក្រេ',
      $BODY_EN$## Quadrilaterals
Interior angles sum to $360^\circ$. Parallelograms feature equal opposite sides; rectangles have four right angles; squares possess four congruent sides and right angles.$BODY_EN$,
      $BODY_KM$## ១. ផលបូកមុំក្នុងចតុកោណ
ផលបូកមុំក្នុងទាំងបួននៃចតុកោណណាមួយ តែងតែស្មើនឹង $360^\circ$៖
$$\angle A + \angle B + \angle C + \angle D = 360^\circ$$

## ២. ប្រភេទចតុកោណពិសេស
- **ប្រលេឡូក្រាម (Parallelogram)៖** ជ្រុងឈមស្របគ្នា និងស្មើគ្នា អង្កត់ទ្រូងកាត់គ្នាត្រង់ចំណុចកណ្តាល
- **ចតុកោណកែង (Rectangle)៖** ជាប្រលេឡូក្រាមដែលមានមុំកែង ៤ និងអង្កត់ទ្រូងស្មើគ្នា
- **ចតុកោណស្មើ/ពេជ្រ (Rhombus)៖** ជ្រុងទាំង ៤ ស្មើគ្នា អង្កត់ទ្រូងកាត់កែងគ្នា
- **ការ៉េ (Square)៖** រួមបញ្ចូលលក្ខណៈចតុកោណកែង និងចតុកោណស្មើ (ជ្រុង ៤ ស្មើគ្នា និងមុំកែង ៤)$BODY_KM$,
      20,
      35,
      true,
      22
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Perimeter & Area of Planar Polygons (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Perimeter & Area of Planar Polygons',
      'បរិមាត្រ និងផ្ទៃក្រឡានៃពហុកោណ',
      'Formulas for perimeter and surface area: triangles, rectangles, parallelograms, and trapezoids',
      'រូបមន្តបរិមាត្រ និងក្រឡាផ្ទៃត្រីកោណ ចតុកោណកែង ការ៉េ ប្រលេឡូក្រាម និងចតុកោណព្នាយ',
      $BODY_EN$## Area Formulas
- Rectangle: $S = a \times b$.
- Square: $S = a^2$.
- Triangle: $S = \frac{1}{2} b \cdot h$.
- Trapezoid: $S = \frac{(B+b) \cdot h}{2}$.$BODY_EN$,
      $BODY_KM$## ១. បរិមាត្រ (Perimeter)
បរិមាត្រ គឺជាប្រវែងសរុបនៃខ្សែព័ទ្ធជុំវិញរូបធរណីមាត្រ (បូកប្រវែងជ្រុងទាំងអស់)។

## ២. រូបមន្តក្រឡាផ្ទៃសំខាន់ៗ
- **ចតុកោណកែង (Rectangle)៖** $S = \text{បណ្តោយ} \times \text{ទទឹង} = a \times b$
- **ការ៉េ (Square)៖** $S = a^2$
- **ត្រីកោណ (Triangle)៖** $S = \frac{1}{2} \times b \times h$ (បាត $\times$ កម្ពស់ ចែកនឹង ២)
- **ប្រលេឡូក្រាម (Parallelogram)៖** $S = b \times h$
- **ចតុកោណព្នាយ (Trapezoid)៖** $S = \frac{(B + b) \times h}{2}$$BODY_KM$,
      20,
      35,
      true,
      23
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Circles, Circumference & Area (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Circles, Circumference & Area',
      'រង្វង់ បរិមាត្រ និងផ្ទៃក្រឡារង្វង់',
      'Radius r, diameter d, number pi (π ≈ 3.14), circumference C = 2πr, and disk area S = πr²',
      'កាំ (r), អង្កត់ផ្ចិត (d = 2r), ចំនួន π ≈ 3.14, បរិមាត្រ C = 2πr និងក្រឡាផ្ទៃ S = πr²',
      $BODY_EN$## Circles
Circumference $C = 2\pi r = \pi d$. Area $S = \pi r^2$, using $\pi \approx 3.1416$.$BODY_EN$,
      $BODY_KM$## ១. ធាតុផ្សំនៃរង្វង់
- **ផ្ចិត (Center $O$)**
- **កាំ (Radius $r$)៖** ចម្ងាយពីផ្ចិតទៅចំណុចលើរង្វង់
- **អង្កត់ផ្ចិត (Diameter $d$)៖** $d = 2r$

## ២. បរិមាត្ររង្វង់ (Circumference)
$$C = 2\pi r = \pi d \quad (\pi \approx 3.14)$$

## ៣. ក្រឡាផ្ទៃរង្វង់ (Area of Circle)
$$S = \pi r^2$$
- **ឧទាហរណ៍៖** បើរង្វង់មានកាំ $r = 7\text{ cm}$ នោះ៖
  $$S = \pi \times 7^2 \approx \frac{22}{7} \times 49 = 154\text{ cm}^2$$$BODY_KM$,
      20,
      35,
      true,
      24
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: 3D Solids: Cubes & Rectangular Prisms (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      '3D Solids: Cubes & Rectangular Prisms',
      'ធរណីមាត្រមាឌ គូប និងប្រលេពីប៉ែតកែង',
      'Vertices, edges, faces, lateral area, total surface area, and volume formulas V = a³ and V = abc',
      'កំពូល គែម មុខ ក្រឡាផ្ទៃខាង ក្រឡាផ្ទៃសរុប និងមាឌនៃគូប V = a³ និងប្រលេពីប៉ែត V = a · b · c',
      $BODY_EN$## 3D Solid Geometry
Cube volume $V = a^3$ and total surface area $S_t = 6a^2$. Rectangular prism volume $V = a \cdot b \cdot c$.$BODY_EN$,
      $BODY_KM$## ១. គូប (Cube)
គូបមានមុខ ៦ ជាការ៉េស្មើគ្នា មានកំពូល ៨ និងគែម ១២ ស្មើៗគ្នា ($a$)៖
- **ក្រឡាផ្ទៃសរុប៖** $S_t = 6a^2$
- **មាឌគូប៖** $V = a^3$

## ២. ប្រលេពីប៉ែតកែង (Rectangular Prism)
មានវិមាត្របី៖ បណ្តោយ ($a$), ទទឹង ($b$), និងកម្ពស់ ($c$)៖
- **ក្រឡាផ្ទៃខាង៖** $S_l = 2(a + b)c$ (បរិមាត្របាត $\times$ កម្ពស់)
- **ក្រឡាផ្ទៃសរុប៖** $S_t = 2(ab + bc + ca)$
- **មាឌ៖** $V = a \times b \times c$ (ផ្ទៃបាត $\times$ កម្ពស់)$BODY_KM$,
      20,
      35,
      true,
      25
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Frequency Tables & Data Representation (mathematics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Frequency Tables & Data Representation',
      'តារាងប្រេកង់ និងដ្យាក្រាមទិន្នន័យ',
      'Data tallying, frequency tables, bar charts, line graphs, and interpreting statistical distributions',
      'ការប្រមូលទិន្នន័យ តារាងប្រេកង់ ដ្យាក្រាមបង្គោល ដ្យាក្រាមបន្ទាត់ និងដ្យាក្រាមរង្វង់',
      $BODY_EN$## Basic Descriptive Statistics
Frequency tables count occurrences. Bar charts compare discrete categories; pie charts represent percentage distribution out of $360^\circ$.$BODY_EN$,
      $BODY_KM$## ១. ការរៀបចំទិន្នន័យ និងតារាងប្រេកង់
- **ទិន្នន័យ (Data)៖** ព័ត៌មាន ឬចំនួនលេខដែលប្រមូលបានពីការអង្កេត
- **ប្រេកង់ (Frequency)៖** ចំនួនដងដែលទិន្នន័យនីមួយៗបានកើតឡើង

## ២. ដ្យាក្រាមទិន្នន័យ (Data Visualizations)
- **ដ្យាក្រាមបង្គោល (Bar Chart)៖** ប្រើប្រាស់បង្គោលចតុកោណកែងដើម្បីប្រៀបធៀបបរិមាណ
- **ដ្យាក្រាមបន្ទាត់ (Line Graph)៖** បង្ហាញការវិវត្ត ឬបម្រែបម្រួលនៃទិន្នន័យតាមពេលវេលា
- **ដ្យាក្រាមរង្វង់ (Pie Chart)៖** បង្ហាញសមាមាត្រនៃផ្នែកនីមួយៗធៀបនឹងទិន្នន័យសរុប ($360^\circ$)។$BODY_KM$,
      20,
      35,
      true,
      26
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Measurement & SI Standard Units (physics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Measurement & SI Standard Units',
      'ការវាស់វែង និងប្រព័ន្ធខ្នាតអន្តរជាតិ SI',
      'International System of Units (SI), metric prefixes, length, mass, and time measurements',
      'ខ្នាតគោល SI ប្រវែង ម៉ាស ពេលវេលា និងឧបករណ៍វាស់ជាក់ស្តែង',
      $BODY_EN$## SI Units
Base units: meter ($m$), kilogram ($kg$), second ($s$). Use standard metric conversions.$BODY_EN$,
      $BODY_KM$## ១. ប្រព័ន្ធខ្នាតអន្តរជាតិ (SI)
ក្នុងវិទ្យាសាស្ត្រ ដើម្បីឱ្យការវាស់វែងមានស្តង់ដាររួមទូទាំងពិភពលោក យើងប្រើប្រព័ន្ធ **SI (Système International)**៖
- **ប្រវែង (Length)៖** ម៉ែត្រ ($m$)
- **ម៉ាស (Mass)៖** គីឡូក្រាម ($kg$)
- **ពេលវេលា (Time)៖** វិនាទី ($s$)

## ២. បុព្វបទខ្នាត (Prefixes)
- គីឡូ ($k$) $= 10^3 = 1000$ (ឧ. $1\text{ km} = 1000\text{ m}$)
- សង់ទី ($c$) $= 10^{-2} = 0.01$ (ឧ. $1\text{ m} = 100\text{ cm}$)
- មីលី ($m$) $= 10^{-3} = 0.001$ (ឧ. $1\text{ g} = 1000\text{ mg}$)$BODY_KM$,
      18,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Simple Machines: Levers & Mechanical Advantage (physics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Simple Machines: Levers & Mechanical Advantage',
      'ម៉ាស៊ីនសាមញ្ញ ៖ ឃ្នាស់ រ៉ក និងរបងជម្រាល',
      'Lever equilibrium F1·d1 = F2·d2, fulcrum principles, pulleys, and inclined planes',
      'គោលការណ៍លំនឹងឃ្នាស់ F₁ · d₁ = F₂ · d₂ ចំណុចទម្រ និងប្រយោជន៍មេកានិច',
      $BODY_EN$## Levers
Equilibrium rule: $F_1 \cdot d_1 = F_2 \cdot d_2$. Longer effort arm multiplies mechanical force.$BODY_EN$,
      $BODY_KM$## ១. ឃ្នាស់ (Lever)
ឃ្នាស់មានចំណុចសំខាន់ ៣៖
1. **ចំណុចទម្រ ($O$ / Fulcrum)**
2. **ចំណុចរងកម្លាំងចលករ ($F_1$)**
3. **ចំណុចទប់ទម្ងន់ ($F_2$)**

## ២. ច្បាប់លំនឹងនៃឃ្នាស់
នៅពេលឃ្នាស់មានលំនឹងផ្ដេក៖
$$F_1 \cdot d_1 = F_2 \cdot d_2$$
- $F_1, F_2$ ៖ កម្លាំងទាំងសងខាង ($N$)
- $d_1, d_2$ ៖ ប្រវែងដៃឃ្នាស់ពីចំណុចទម្រទៅកាន់កម្លាំងនីមួយៗ ($m$)

> **ចំណុចគន្លឹះ៖** កាលណាដៃឃ្នាស់ $d_1$ កាន់តែវែង យើងប្រើកម្លាំង $F_1$ កាន់តែតូច ដើម្បីលើកវត្ថុធ្ងន់!$BODY_KM$,
      20,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mass, Volume & Density (D = m / V) (physics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Mass, Volume & Density (D = m / V)',
      'ម៉ាសមាឌ និងដង់ស៊ីតេ (D = m / V)',
      'Density equation D = m/V, pure water benchmark 1000 kg/m³, and flotation criteria',
      'និយមន័យដង់ស៊ីតេ រូបមន្ត D = m / V និងលក្ខខណ្ឌអណ្តែត-លិចក្នុងទឹក',
      $BODY_EN$## Density
$D = m/V$. Density of pure water is $1000\text{ kg/m}^3$. Objects with $D < 1000\text{ kg/m}^3$ float.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យម៉ាសមាឌ (ដង់ស៊ីតេ)
ម៉ាសមាឌ (Density) គឺជាម៉ាសនៃអង្គធាតុក្នុងមួយខ្នាតមាឌ៖
$$D = \frac{m}{V}$$
- $D$ ៖ ម៉ាសមាឌ ($kg/m^3$ ឬ $g/cm^3$)
- $m$ ៖ ម៉ាសអង្គធាតុ ($kg$ ឬ $g$)
- $V$ ៖ មាឌអង្គធាតុ ($m^3$ ឬ $cm^3$)

## ២. ដង់ស៊ីតេនៃទឹកសុទ្ធ
ទឹកសុទ្ធមានដង់ស៊ីតេ $D_{\text{water}} = 1\text{ g/cm}^3 = 1000\text{ kg/m}^3$។
- អង្គធាតុណាដែលមាន $D < D_{\text{water}}$ នឹង **អណ្តែត** (ឧ. ប្រេង ឈើ)
- អង្គធាតុណាដែលមាន $D > D_{\text{water}}$ នឹង **លិច** (ឧ. ដែក ដុំថ្ម)$BODY_KM$,
      20,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Forces and Motion (physics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Forces and Motion',
      'កម្លាំង និងចលនា',
      'Pushes and pulls, friction resistance, gravity, and velocity changes',
      'កម្លាំងទាញ កម្លាំងរុញ កម្លាំងកកិត និងឥទ្ធិពលលើល្បឿននៃចលនា',
      $BODY_EN$## Forces
Forces are vector pushes or pulls measured in Newtons ($N$). Friction always opposes motion.$BODY_EN$,
      $BODY_KM$## ១. តើកម្លាំងជាអ្វី?
**កម្លាំង (Force)** គឺជាអំពើរុញ ឬទាញលើអង្គធាតុមួយ។ កម្លាំងមានខ្នាតគិតជា **ញូតុន ($N$)**។

## ២. ឥទ្ធិពលនៃកម្លាំង
កម្លាំងអាចធ្វើឱ្យអង្គធាតុ៖
1. ចាប់ផ្តើមផ្លាស់ទី (ពីនៅស្ងៀមទៅផ្លាស់ទី)
2. បង្កើនល្បឿន ឬបន្ថយល្បឿន
3. ប្តូរទិសដៅនៃចលនា
4. ប្តូររូបរាង (ខូចទ្រង់ទ្រាយ)

## ៣. កម្លាំងកកិត (Friction)
កម្លាំងកកិតកើតឡើងរវាងផ្ទៃប៉ះនៃវត្ថុពីរ ហើយតែងតែមានទិសដៅ **ប្រឆាំងនឹងចលនា**។$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Heat & Thermal Expansion of Matter (physics - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Heat & Thermal Expansion of Matter',
      'កម្តៅ និងការរីកមាឌនៃអង្គធាតុ',
      'Thermal expansion in solids, liquids, gases, and Celsius temperature scales',
      'ឥទ្ធិពលកម្តៅលើសូលីត រាវ ឧស្ម័ន និងទែរម៉ូម៉ែត្រវាស់សីតុណ្ហភាព',
      $BODY_EN$## Thermal Expansion
Heating causes matter to expand; cooling causes contraction. Gases expand the most.$BODY_EN$,
      $BODY_KM$## ១. ការរីកមាឌដោយសារកម្តៅ
នៅពេលអង្គធាតុក្តៅឡើង ម៉ូលេគុលរបស់វាញ័រខ្លាំង និងឃ្លាតឆ្ងាយពីគ្នា ធ្វើឱ្យអង្គធាតុ **រីកមាឌ**។ នៅពេលត្រជាក់វិញ អង្គធាតុ **រួមមាឌ**។

- **ឧស្ម័ន** រីកមាឌខ្លាំងជាងគេ
- **អង្គធាតុរាវ** រីកមាឌមធ្យម
- **អង្គធាតុរឹង** រីកមាឌតិចជាងគេ

## ២. ការអនុវត្តក្នុងវិស្វកម្ម
- ផ្លូវដែកតែងតែទុកចន្លោះតូចមួយរវាងរនាំងដែក ដើម្បីកុំឱ្យកោងនៅពេលក្តៅថ្ងៃ
- ខ្សែភ្លើងត្រូវបង្ហូតឱ្យធូរល្មម ដើម្បីកុំឱ្យដាច់នៅរដូវរងា$BODY_KM$,
      18,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Pure Substances & Mixtures (chemistry - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Pure Substances & Mixtures',
      'សារធាតុបរិសុទ្ធ និងល្បាយ',
      'Pure substances, elements, compounds, homogeneous and heterogeneous mixtures',
      'ភាពខុសគ្នារវាងសារធាតុបរិសុទ្ធ ល្បាយស្មើសាច់ និងល្បាយមិនស្មើសាច់',
      $BODY_EN$## Pure Substances & Mixtures
Pure substances have definite properties. Homogeneous mixtures look uniform; heterogeneous show distinct layers.$BODY_EN$,
      $BODY_KM$## ១. សារធាតុបរិសុទ្ធ (Pure Substances)
សារធាតុបរិសុទ្ធ មានសមាសភាពគីមីថេរ និងមានលក្ខណៈរូបច្បាស់លាស់ (ចំណុចរលាយ និងចំណុចពុះថេរ) ដូចជា ទឹកសុទ្ធ ($H_2O$), អុកស៊ីសែន ($O_2$), មាស ($Au$)។

## ២. ល្បាយ (Mixtures)
ល្បាយកើតពីសារធាតុតាំងពីពីរឡើងទៅលាយចូលគ្នា ដោយគ្មានប្រតិកម្មគីមី៖
- **ល្បាយស្មើសាច់ (Homogeneous)៖** មើលមិនឃើញព្រំដែនខណ្ឌ (ឧ. ទឹកអំបិល ទឹកស្ករ ខ្យល់)
- **ល្បាយមិនស្មើសាច់ (Heterogeneous)៖** មើលឃើញផ្នែកផ្សេងគ្នាច្បាស់ (ឧ. ទឹកលាយប្រេង ទឹកភក់)$BODY_KM$,
      18,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Physical vs. Chemical Changes (chemistry - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Physical vs. Chemical Changes',
      'បាតុភូតរូប និងបាតុភូតគីមី',
      'Phase transitions vs chemical reactions creating entirely new substances with energy transfer',
      'ការផ្លាស់ប្តូររូបរាង កំណក រលាយ និងប្រតិកម្មគីមីបង្កើតសារធាតុថ្មី',
      $BODY_EN$## Physical vs Chemical Changes
Physical changes do not form new substances (e.g. melting ice). Chemical changes create new substances (e.g. rusting iron).$BODY_EN$,
      $BODY_KM$## ១. បាតុភូតរូប (Physical Change)
គឺជាការប្រែប្រួលដែល **មិនបង្កើតសារធាតុថ្មី** ឡើយ។ រូបមន្តគីមីនៅដដែល គ្រាន់តែផ្លាស់ប្តូរស្ថានភាព ឬរូបរាង៖
- ទឹកកករលាយជាទឹក ($H_2O_{(s)} \rightarrow H_2O_{(l)}$)
- ការហួតទឹក ការកាត់ក្រដាស

## ២. បាតុភូតគីមី (Chemical Change)
គឺជាការប្រែប្រួលដែល **បង្កើតសារធាតុថ្មី** ដែលមានលក្ខណៈខុសពីសារធាតុដើម៖
- ការឆេះនៃទៀន ឬឈើ
- ដែកច្រែះ ($4Fe + 3O_2 \rightarrow 2Fe_2O_3$)
- ការផ្អួរទឹកដោះគោ ឬការរលួយស្លឹកឈើ$BODY_KM$,
      18,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Water, Solvents & Solubility (chemistry - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Water, Solvents & Solubility',
      'ទឹក និងសារធាតុរំលាយ',
      'Universal solvent properties of water, solute, solvent, and saturation concentrations',
      'ទឹកជាសារធាតុរំលាយសកល សូលុយស្យុង សារធាតុរលាយ និងកំហាប់',
      $BODY_EN$## Solutions
Solution = Solvent (liquid like water) + Solute (dissolved solid like salt). Saturated solutions can dissolve no more solute.$BODY_EN$,
      $BODY_KM$## ១. សមាសភាគនៃសូលុយស្យុង
$$\text{សូលុយស្យុង (Solution)} = \text{សារធាតុរំលាយ (Solvent)} + \text{សារធាតុរលាយ (Solute)}$$
- **ទឹក (Water)** គឺជាសារធាតុរំលាយសកល ព្រោះវាអាចរំលាយសារធាតុជាច្រើន។

## ២. សូលុយស្យុងឆ្អែត
- **សូលុយស្យុងមិនទាន់ឆ្អែត៖** នៅតែអាចរំលាយសារធាតុបន្ថែមទៀតបាន
- **សូលុយស្យុងឆ្អែត៖** មិនអាចរំលាយសារធាតុរលាយបន្ថែមបានទៀតទេនៅសីតុណ្ហភាពនោះ$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Air & Atmospheric Composition (chemistry - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Air & Atmospheric Composition',
      'ខ្យល់ និងសមាសភាគបរិយាកាស',
      'Atmospheric composition: 78% Nitrogen, 21% Oxygen, Argon and Carbon dioxide traces',
      'សមាសភាគឧស្ម័ន អាសូត ៧៨% អុកស៊ីសែន ២១% និងឧស្ម័នផ្សេងៗ',
      $BODY_EN$## Atmosphere
Air composition: 78% Nitrogen, 21% Oxygen, and trace gases. Oxygen sustains respiration and combustion.$BODY_EN$,
      $BODY_KM$## ១. សមាសភាគនៃខ្យល់ស្ងួត
ខ្យល់គឺជាល្បាយស្មើសាច់នៃឧស្ម័នជាច្រើន៖
- **ឧស្ម័នអាសូត ($N_2$)៖** ប្រហែល $78\%$
- **ឧស្ម័នអុកស៊ីសែន ($O_2$)៖** ប្រហែល $21\%$
- **ឧស្ម័នអាកុង ($Ar$)៖** ប្រហែល $0.9\%$
- **ឧស្ម័នកាបូនិក ($CO_2$) និងឧស្ម័នផ្សេងៗ៖** ប្រហែល $0.1\%$

## ២. សារៈសំខាន់នៃអុកស៊ីសែន
អុកស៊ីសែនចាំបាច់សម្រាប់ **ដង្ហើមភាវៈរស់** និង **អំពើឆេះ** នៃឥន្ធនៈ។$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Atoms & Molecules Fundamentals (chemistry - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Atoms & Molecules Fundamentals',
      'អាតូម និងម៉ូលេគុលបឋម',
      'Introductory atomic structure: protons, neutrons, electrons, and simple molecular bonding',
      'រចនាសម្ព័ន្ធបឋមនៃអាតូម នុយក្លេអ៊ុង ប្រូតុង អេឡិចត្រុង និងម៉ូលេគុល',
      $BODY_EN$## Atoms & Molecules
Atoms have a nucleus (protons + neutrons) surrounded by electrons. Molecules are bonded atoms.$BODY_EN$,
      $BODY_KM$## ១. អាតូម (Atom)
អាតូម គឺជាភាគល្អិតតូចបំផុតនៃរូបធាតុដែលមិនអាចបំបែកដោយវិធីគីមីធម្មតាបានឡើយ។
អាតូមផ្សំឡើងពី៖
- **ស្នូលកណ្តាល (Nucleus)៖** មានប្រូតុង ($p^+$, បន្ទុកវិជ្ជមាន) និងណឺត្រុង ($n^0$, គ្មានបន្ទុក)
- **ពពកអេឡិចត្រុង៖** មានអេឡិចត្រុង ($e^-$, បន្ទុកអវិជ្ជមាន) វិលជុំវិញស្នូល

## ២. ម៉ូលេគុល (Molecule)
ម៉ូលេគុល កើតពីអាតូមតាំងពីពីរឡើងទៅចងភ្ជាប់គ្នាដោយសម្ព័ន្ធគីមី៖
- ម៉ូលេគុលទោលធាតុ៖ $O_2, H_2, N_2$
- ម៉ូលេគុលសមាសធាតុ៖ $H_2O, CO_2, NaCl$$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Plant & Animal Cell Architecture (biology - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Plant & Animal Cell Architecture',
      'រចនាសម្ព័ន្ធកោសិការុក្ខជាតិ និងកោសិកាសត្វ',
      'Cell theory basics: cell wall, cell membrane, cytoplasm, nucleus, vacuole, chloroplast differences',
      'កោសិកាជាឯកតាមូលដ្ឋាន ភ្នាសកោសិកា ស៊ីតូប្លាស ណ្វៃយ៉ូ និងក្លរ៉ូប្លាស',
      $BODY_EN$## Cell Biology
All living organisms are made of cells. Plant cells uniquely feature cell walls and chloroplasts for photosynthesis.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីកោសិកា
កោសិកា (Cell) គឺជា **ឯកតាមូលដ្ឋាននៃជីវិត** សម្រាប់គ្រប់ភាវៈរស់ទាំងអស់។

## ២. ផ្នែកសំខាន់ៗទាំង ៣ នៃកោសិកា
1. **ភ្នាសកោសិកា (Cell Membrane)៖** គ្រប់គ្រងការចេញចូលនៃសារធាតុ
2. **ស៊ីតូប្លាស (Cytoplasm)៖** សារធាតុរាវអន្ធិលផ្ទុកសរីរាង្គកោសិកា
3. **ណ្វៃយ៉ូ (Nucleus)៖** បញ្ជាសកម្មភាពកោសិកា និងផ្ទុកព័ត៌មានតំណពូជ DNA

## ៣. ភាពខុសគ្នារវាងកោសិការុក្ខជាតិ និងសត្វ
- **កោសិការុក្ខជាតិមាន៖** កោសិកាភ្នាសរឹង (Cell Wall), ក្លរ៉ូប្លាស (Chloroplasts សម្រាប់រស្មីសំយោគ), និងវ៉ាគុយអូលធំ
- **កោសិកាសត្វ៖** គ្មានកោសិកាភ្នាសរឹង និងគ្មានក្លរ៉ូប្លាសទេ$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Classification of Living Things (5 Kingdoms) (biology - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Classification of Living Things (5 Kingdoms)',
      'ចំណាត់ថ្នាក់ភាវៈរស់ទាំង ៥ អាណាចក្រ',
      'Whittaker''s 5 Kingdom taxonomy: Monera, Protista, Fungi, Plantae, and Animalia',
      'អាណាចក្របាក់តេរី ព្រូទីស ផ្សិត រុក្ខជាតិ និងសត្វ តាមប្រព័ន្ធ Whittaker',
      $BODY_EN$## The 5 Kingdoms
Monera (Bacteria), Protista (Single-cell eukaryotes), Fungi, Plantae (Plants), Animalia (Animals).$BODY_EN$,
      $BODY_KM$## ១. ចំណាត់ថ្នាក់ជីវសាស្ត្រ
ភាវៈរស់នៅលើផែនដីត្រូវបានបែងចែកជា **៥ អាណាចក្រធំៗ**៖
1. **អាណាចក្រម៉ូណេរ៉ា (Monera)៖** បាក់តេរី (គ្មានណ្វៃយ៉ូច្បាស់លាស់ / Prokaryotes)
2. **អាណាចក្រប្រូទីស្តា (Protista)៖** អាមីប ប៉ារ៉ាមេស៊ី សារ៉ាយឯកកោសិកា
3. **អាណាចក្រផ្សិត (Fungi)៖** ផ្សិតចំបើង មេដំបែ (មិនធ្វើរស្មីសំយោគទេ)
4. **អាណាចក្ររុក្ខជាតិ (Plantae)៖** ស្វ័យជីព ធ្វើរស្មីសំយោគ
5. **អាណាចក្រសត្វ (Animalia)៖** បរជីព ផ្លាស់ទីបាន ចែកជាសត្វឥតឆ្អឹងកង និងមានឆ្អឹងកង$BODY_KM$,
      18,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Plant Anatomy: Roots, Stems & Leaves (biology - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Plant Anatomy: Roots, Stems & Leaves',
      'សរីរាង្គរុក្ខជាតិ ៖ ឫស ដើម ស្លឹក',
      'Root absorption, xylem-phloem stem transport, and stomata gas exchange mechanics',
      'មុខងារស្រូបទឹករបស់ឫស ការដឹកជញ្ជូន និងស្តូម៉ាតប្តូរឧស្ម័ននៅស្លឹក',
      $BODY_EN$## Plant Organs
Roots absorb water; stems transport via xylem/phloem; leaves photosynthesize and exchange gases via stomata.$BODY_EN$,
      $BODY_KM$## ១. ឫស (Roots)
- ស្រូបទឹក និងអំបិលខនិជពីក្នុងដីតាមរយៈរោមបឺត
- ទប់រុក្ខជាតិឱ្យឈររឹងមាំក្នុងដី

## ២. ដើម (Stem)
- ទ្រទ្រង់មែក ស្លឹក ផ្កា ផ្លែ
- ដឹកជញ្ជូនទឹកតាម **ស៊ីឡែម (Xylem)** និងអាហារតាម **ផ្លូអែម (Phloem)**

## ៣. ស្លឹក (Leaves)
- ធ្វើរស្មីសំយោគផលិតអាហារ
- បញ្ចេញចំហាយទឹក និងផ្លាស់ប្តូរឧស្ម័នតាមរន្ធ **ស្តូម៉ាត (Stomata)**$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Plant Photosynthesis & Transpiration (biology - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Plant Photosynthesis & Transpiration',
      'រស្មីសំយោគ និងការដកដង្ហើមរបស់រុក្ខជាតិ',
      'Photosynthesis chemical equation, solar photon absorption via chlorophyll, and oxygen release',
      'សមីការ 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ ពន្លឺព្រះអាទិត្យ និងសារៈសំខាន់ចំពោះជីវិត',
      $BODY_EN$## Photosynthesis
$6CO_2 + 6H_2O \rightarrow C_6H_{12}O_6 + 6O_2$. Chlorophyll converts solar energy into chemical energy.$BODY_EN$,
      $BODY_KM$## ១. សមីការរស្មីសំយោគ (Photosynthesis)
រុក្ខជាតិបៃតងចាប់យកពន្លឺព្រះអាទិត្យតាមរយៈសារធាតុ **ក្លរ៉ូភីល (Chlorophyll)** ដើម្បីផលិតជាតិស្ករគ្លុយកូស និងអុកស៊ីសែន៖

$$6\text{ CO}_2 + 6\text{ H}_2\text{O} \xrightarrow{\text{ពន្លឺ + ក្លរ៉ូភីល}} \text{C}_6\text{H}_{12}\text{O}_6 + 6\text{ O}_2$$

## ២. សារៈសំខាន់
- ផ្តល់អុកស៊ីសែន ($O_2$) សម្រាប់គ្រប់ភាវៈរស់ដកដង្ហើម
- ជាប្រភពអាហារដំបូងគេបង្អស់នៃខ្សែច្រវាក់ចំណីអាហារលើផែនដី$BODY_KM$,
      20,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Ecosystems, Trophic Levels & Food Webs (biology - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Ecosystems, Trophic Levels & Food Webs',
      'ប្រព័ន្ធអេកូឡូស៊ី និងខ្សែច្រវាក់ចំណីអាហារ',
      'Producers, primary/secondary consumers, decomposers, and trophic energy pyramid flow',
      'អ្នកផលិត អ្នកប្រើប្រាស់ អ្នករំលាយពុកផុយ និងលំហូរថាមពលក្នុងធម្មជាតិ',
      $BODY_EN$## Food Chains & Trophic Levels
Producers (plants) $\rightarrow$ Primary Consumers (herbivores) $\rightarrow$ Secondary Consumers (carnivores) $\rightarrow$ Decomposers.$BODY_EN$,
      $BODY_KM$## ១. ខ្សែច្រវាក់ចំណីអាហារ (Food Chain)
ខ្សែច្រវាក់ចំណីអាហារបង្ហាញពីទំនាក់ទំនងចំណីអាហារ និងលំហូរថាមពលរវាងភាវៈរស់៖
$$\text{អ្នកផលិត (ស្មៅ)} \rightarrow \text{អ្នកប្រើទី១ (ទន្សាយ)} \rightarrow \text{អ្នកប្រើទី២ (កញ្ជ្រោង)}$$

- **អ្នកផលិត (Producers)៖** រុក្ខជាតិបៃតង ផលិតអាហារដោយខ្លួនឯង
- **អ្នកប្រើប្រាស់ (Consumers)៖** សត្វស៊ីរុក្ខជាតិ ឬសត្វស៊ីសាច់
- **អ្នករំលាយ (Decomposers)៖** បាក់តេរី និងផ្សិត រំលាយសាកសពភាវៈរស់ទៅជាជីជាតិក្នុងដី$BODY_KM$,
      18,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Earth's Geosphere Layered Structure (earth - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Earth''s Geosphere Layered Structure',
      'រចនាសម្ព័ន្ធស្រទាប់ខាងក្នុងរបស់ផែនដី',
      'Crust, mantle, liquid outer core, solid inner core, seismic discontinuities, and temperatures',
      'សំបកផែនដី អាវផែនដី ស្នូលក្រៅ និងស្នូលក្នុងរឹង',
      $BODY_EN$## Earth's Interior
Crust (solid surface) $\rightarrow$ Mantle (convection currents) $\rightarrow$ Outer Core (liquid iron) $\rightarrow$ Inner Core (solid iron).$BODY_EN$,
      $BODY_KM$## ១. ស្រទាប់ធំៗទាំង ៣ នៃផែនដី
ផែនដីចែកជាស្រទាប់ពីក្រៅទៅក្នុង៖
1. **សំបកផែនដី (Crust)៖** ស្រទាប់រឹងស្តើងបំផុតពី $0 - 70\text{ km}$ (សំបកទ្វីប និងសំបកមហាសមុទ្រ)
2. **អាវផែនដី (Mantle)៖** ស្រទាប់ក្រាស់ជាងគេ (ជម្រៅដល់ $2900\text{ km}$) ផ្ទុកថ្មម៉ាក់ម៉ាក្តៅរាវ
3. **ស្នូលផែនដី (Core)៖**
   - **ស្នូលក្រៅ (Outer Core)៖** ជាដែក និងនីកែលរាវ បង្កើតដែនម៉ាញេទិចផែនដី
   - **ស្នូលក្នុង (Inner Core)៖** ជាដែករឹង ដោយសារសម្ពាធសង្កត់ដ៏មហាសាល$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: The Rock Cycle & Three Major Rock Types (earth - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'The Rock Cycle & Three Major Rock Types',
      'វដ្តថ្ម និងប្រភេទថ្មទាំង ៣',
      'Igneous, sedimentary, and metamorphic rock genesis through heat, pressure, and cooling',
      'ថ្មម៉ាក់ម៉ា ថ្មកម្ទេចកំណ និងថ្មប្រែក្លាយ ព្រមទាំងការបំលែងនៃវដ្តថ្ម',
      $BODY_EN$## Rock Cycle
Igneous (cooled magma) $\leftrightarrow$ Sedimentary (compacted sediments) $\leftrightarrow$ Metamorphic (heat & pressure).$BODY_EN$,
      $BODY_KM$## ១. ប្រភេទថ្មទាំង ៣
1. **ថ្មម៉ាក់ម៉ា (Igneous Rocks)៖** កកើតពីការត្រជាក់ និងកកនៃម៉ាក់ម៉ា ឬកម្អែលភ្នំភ្លើង (ឧ. ថ្មក្រានីត ថ្មបាសាល់)
2. **ថ្មកម្ទេចកំណ (Sedimentary Rocks)៖** កកើតពីការកកកុញនៃកម្ទេចកំទី និងគ្រោងឆ្អឹងសត្វ (ឧ. ថ្មកំបោរ ថ្មភក់) មានផ្ទុកផូស៊ីល!
3. **ថ្មប្រែក្លាយ (Metamorphic Rocks)៖** កកើតពីថ្មដើមរងកម្តៅ និងសម្ពាធខ្លាំងក្នុងដី (ឧ. ថ្មម៉ាប)$BODY_KM$,
      18,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Hydrological Water Cycle & Global Reservoirs (earth - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Hydrological Water Cycle & Global Reservoirs',
      'វដ្តទឹក និងប្រភពទឹកលើផែនដី',
      'Evaporation, transpiration, condensation, precipitation, surface runoff, and Mekong water flow',
      'ការហួត កំណកញើស ទឹកភ្លៀង និងលំហូរទឹកក្នុងទន្លេមេគង្គ និងបឹងទន្លេសាប',
      $BODY_EN$## Water Cycle
Solar heat drives continuous cycle: Evaporation $\rightarrow$ Condensation (clouds) $\rightarrow$ Precipitation $\rightarrow$ Runoff.$BODY_EN$,
      $BODY_KM$## ១. វដ្តទឹកធម្មជាតិ (Water Cycle)
ទឹកផ្លាស់ប្តូរស្ថានភាព និងចលនាឥតឈប់ឈរ៖
1. **ការហួត (Evaporation)៖** កម្តៅព្រះអាទិត្យធ្វើឱ្យទឹកសមុទ្រ និងទន្លេហួតជាចំហាយទឹក
2. **កំណកញើស (Condensation)៖** ចំហាយទឹកឡើងលើត្រជាក់បង្កើតជាពពក
3. **ធ្លាក់ទឹកភ្លៀង (Precipitation)៖** តំណក់ទឹកធ្លាក់មកដីជាភ្លៀង
4. **លំហូរ និងជ្រាបចូលដី (Runoff & Infiltration)៖** ទឹកហូរចូលស្ទឹង ទន្លេ និងជ្រាបទៅជាទឹកក្រោមដី$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Weather, Wind Systems & Atmospheric Pressure (earth - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Weather, Wind Systems & Atmospheric Pressure',
      'អាកាសធាតុ ខ្យល់ និងសម្ពាធបរិយាកាស',
      'High and low pressure systems, isobaric wind generation, and seasonal monsoon cycles in Cambodia',
      'សម្ពាធខ្ពស់ សម្ពាធទាប ការកកើតខ្យល់ និងខ្យល់មូសុងនៅប្រទេសកម្ពុជា',
      $BODY_EN$## Weather & Monsoons
Winds blow from high to low pressure. Cambodia experiences Southwest rainy monsoons and Northeast dry monsoons.$BODY_EN$,
      $BODY_KM$## ១. សម្ពាធបរិយាកាស និងខ្យល់
- **ខ្យល់ (Wind)៖** គឺជាចលនានៃខ្យល់ដែលបក់ពី **តំបន់សម្ពាធខ្ពស់ (High Pressure)** ទៅកាន់ **តំបន់សម្ពាធទាប (Low Pressure)**។

## ២. រដូវកាលនៅប្រទេសកម្ពុជា
កម្ពុជាស្ថិតក្នុងតំបន់ត្រូពិច មានខ្យល់មូសុងពីរដូវ៖
- **ខ្យល់មូសុងនិរតី (ខែឧសភា - តុលា)៖** នាំមកនូវសំណើមពីសមុទ្រ បង្កើតជារដូវវស្សា (ភ្លៀងធ្លាក់)
- **ខ្យល់មូសុងឦសាន (ខែវិច្ឆិកា - មេសា)៖** នាំមកនូវខ្យល់ស្ងួត និងត្រជាក់ បង្កើតជារដូវប្រាំង$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Planetary Systems in the Solar Orbit (earth - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Planetary Systems in the Solar Orbit',
      'ភពក្នុងប្រព័ន្ធព្រះអាទិត្យ',
      'The Sun, terrestrial inner planets (Mercury, Venus, Earth, Mars), gas giants (Jupiter, Saturn, Uranus, Neptune)',
      'ព្រះអាទិត្យ ភពទាំង ៨ ភពដី និងភពឧស្ម័នយក្ស ព្រមទាំងគន្លងតារាវិថី',
      $BODY_EN$## Solar System
8 planets orbit the Sun: Mercury, Venus, Earth, Mars (terrestrial), Jupiter, Saturn, Uranus, Neptune (gas giants).$BODY_EN$,
      $BODY_KM$## ១. ប្រព័ន្ធព្រះអាទិត្យ (Solar System)
ប្រព័ន្ធព្រះអាទិត្យមាន **ព្រះអាទិត្យ** ជាផ្កាយកណ្តាល និងមាន **ភពចំនួន ៨** វិលជុំវិញ៖

1. **ភពថ្ម (Terrestrial Planets)៖**
   - ពុធ (Mercury) ៖ កៀកព្រះអាទិត្យជាងគេ
   - សុក្រ (Venus) ៖ ក្តៅជាងគេដោយសារឥទ្ធិពលផ្ទះកញ្ចក់ក្រាស់
   - ផែនដី (Earth) ៖ មានទឹក និងជីវិត
   - អង្គារ (Mars) ៖ ភពក្រហម
2. **ភពឧស្ម័នយក្ស (Gas Giants)៖**
   - ព្រហស្បតិ៍ (Jupiter) ៖ ធំជាងគេបង្អស់
   - សៅរ៍ (Saturn) ៖ មានខ្សែក្រវាត់ដ៏ស្រស់ស្អាត
   - អ៊ុយរ៉ានុស (Uranus) និង ណិបទូន (Neptune) ៖ ភពទឹកកកត្រជាក់$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Rational & Irrational Numbers (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Rational & Irrational Numbers',
      'ចំនួនសនិទាន និងចំនួនអសនិទាន',
      'Rational number set Q, repeating decimals, square roots, and irrational numbers √2, √3, π',
      'និយមន័យសំណុំចំនួនសនិទាន Q ចំនួនទសភាគខួប និងឬសការេអសនិទាន √2, √3, π',
      $BODY_EN$## Rational vs Irrational
Rational numbers ($\mathbb{Q}$) can be expressed as $a/b$ ($b \neq 0$). Irrational numbers cannot be written as fractions (e.g., $\sqrt{2}, \pi$).$BODY_EN$,
      $BODY_KM$## ១. ចំនួនសនិទាន (Rational Numbers $\mathbb{Q}$)
ចំនួនសនិទាន គឺជាចំនួនដែលអាចសរសេរជាទម្រង់ប្រភាគ $\frac{a}{b}$ ដែល $a, b \in \mathbb{Z}$ និង $b \neq 0$។
- ចំនួនគត់៖ $5 = \frac{5}{1}, \quad -3 = \frac{-3}{1}$
- ទសភាគកម្រិត៖ $0.75 = \frac{3}{4}$
- ទសភាគខួប៖ $0.333... = 0.\bar{3} = \frac{1}{3}$

## ២. ចំនួនអសនិទាន (Irrational Numbers)
ចំនួនអសនិទាន គឺជាចំនួនដែល **មិនអាច** សរសេរជាទម្រង់ប្រភាគបានឡើយ (ជាទសភាគមិនកំណត់ និងមិនខួប)៖
$$\sqrt{2} \approx 1.414213..., \quad \sqrt{3} \approx 1.732..., \quad \pi \approx 3.14159...$$$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Algebraic Identities & Factorization (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Algebraic Identities & Factorization',
      'រូបមន្តពន្លាតពីជគណិត និងកន្សោមពីជគណិត',
      'Remarkable algebraic identities (a + b)², (a - b)², and a² - b² with polynomial factorization',
      'សមភាពគួរចងចាំទាំង ៣ ៖ (a + b)², (a - b)² និង a² - b² ព្រមទាំងការដាក់ជាផលគុណកត្តា',
      $BODY_EN$## Algebraic Identities
$(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, and $a^2 - b^2 = (a - b)(a + b)$.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តពន្លាតគួរចងចាំទាំង ៣
1. ការេនៃផលបូក៖
   $$(a + b)^2 = a^2 + 2ab + b^2$$
2. ការេនៃផលដក៖
   $$(a - b)^2 = a^2 - 2ab + b^2$$
3. ផលដកការេពីរតួ៖
   $$a^2 - b^2 = (a - b)(a + b)$$

## ២. ការដាក់ជាផលគុណកត្តា (Factorization)
- ចាប់កត្តារួម៖ $3x^2 + 6x = 3x(x + 2)$
- ប្រើរូបមន្ត $a^2 - b^2$៖ $x^2 - 9 = (x - 3)(x + 3)$$BODY_KM$,
      22,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Pythagorean Theorem & Geometry Applications (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Pythagorean Theorem & Geometry Applications',
      'ទ្រឹស្តីបទពីតាក័រ និងការអនុវត្ត',
      'Hypotenuse formula a² + b² = c² in right-angled triangles and converse theorem proofs',
      'ទំនាក់ទំនងជ្រុងត្រីកោណកែង a² + b² = c² និងទ្រឹស្តីបទច្រាសដើម្បីបញ្ជាក់ត្រីកោណកែង',
      $BODY_EN$## Pythagorean Theorem
In right triangle: $c^2 = a^2 + b^2$. The converse verifies if a triangle contains a $90^\circ$ angle.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីបទពីតាក័រ (Pythagoras' Theorem)
ក្នុងត្រីកោណកែងមួយ ការេនៃអ៊ីប៉ូតេនុស ($c$) ស្មើនឹងផលបូកការេនៃជ្រុងជាប់មុំកែងទាំងពីរ ($a$ និង $b$)៖
$$c^2 = a^2 + b^2 \implies c = \sqrt{a^2 + b^2}$$

> **ឧទាហរណ៍៖** បើ $a = 3$ និង $b = 4$
> $$c = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$

## ២. ទ្រឹស្តីបទច្រាសពីតាក័រ
បើក្នុងត្រីកោណមួយ ជ្រុងវែងបំផុតមានការេស្មើនឹងផលបូកការេជ្រុងពីរទៀត ($c^2 = a^2 + b^2$) នោះត្រីកោណនោះគឺជា **ត្រីកោណកែង**។$BODY_KM$,
      20,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Linear Equations & Inequalities (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Linear Equations & Inequalities',
      'សមីការ និងវិសមីការដឺក្រេទី១',
      'Solving linear equations with denominators, inequalities, and sign reversal when multiplying negatives',
      'ការដោះស្រាយសមីការមានភាគបែង វិសមីការ និងការប្តូរសញ្ញានៅពេលគុណនឹងចំនួនអវិជ្ជមាន',
      $BODY_EN$## Inequalities
When multiplying or dividing both sides by a negative number, always reverse the inequality symbol.$BODY_EN$,
      $BODY_KM$## ១. វិសមីការដឺក្រេទី១ (Inequalities)
វិសមីការមានសញ្ញា៖ $<, \leq, >, \geq$។

> **វិធានមាសគួរចងចាំ៖**
> នៅពេលគុណ ឬចែកអង្គទាំងពីរនៃវិសមីការនឹង **ចំនួនអវិជ្ជមាន (Negative Number)** យើងត្រូវ **ប្តូរទិសដៅសញ្ញា** ជានិច្ច!
> $$-2x < 6 \implies x > \frac{6}{-2} \implies x > -3$$$BODY_KM$,
      20,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Quadrilaterals: Rectangles, Rhombuses & Squares (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Quadrilaterals: Rectangles, Rhombuses & Squares',
      'ចតុកោណកែង ចតុកោណស្មើ និងការ៉េ',
      'Properties of parallelograms, rectangles, rhombuses, squares, diagonals, and area formulas',
      'លក្ខណៈសម្គាល់នៃប្រលេឡូក្រាម ចតុកោណកែង ចតុកោណស្មើ ការ៉េ និងរូបមន្តក្រឡាផ្ទៃ',
      $BODY_EN$## Quadrilaterals
Parallelogram properties expand to rectangles (equal diagonals), rhombuses (perpendicular diagonals), and squares.$BODY_EN$,
      $BODY_KM$## ១. លក្ខណៈនៃចតុកោណពិសេស
- **ប្រលេឡូក្រាម៖** ជ្រុងឈមស្របគ្នា និងស្មើគ្នា អង្កត់ទ្រូងកាត់គ្នាត្រង់ចំណុចកណ្តាល
- **ចតុកោណកែង៖** ជាប្រលេឡូក្រាមដែលមានមុំកែង អង្កត់ទ្រូងទាំងពីរស្មើគ្នា
- **ចតុកោណស្មើ (Rhombus)៖** ជ្រុងទាំង ៤ ស្មើគ្នា អង្កត់ទ្រូងកាត់គ្នាកែង
- **ការ៉េ (Square)៖** ទាំងជ្រុងទាំង ៤ ស្មើគ្នា និងទាំងមុំទាំង ៤ កែង ($90^\circ$)

## ២. រូបមន្តក្រឡាផ្ទៃ
- ចតុកោណកែង៖ $S = L \times w$
- ការ៉េ៖ $S = a^2$
- ចតុកោណស្មើ៖ $S = \frac{d_1 \times d_2}{2}$$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Polynomial Factorization & Grouping (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Polynomial Factorization & Grouping',
      'ផលគុណកត្តានៃកន្សោមពីជគណិត និងការបំបែកតួ',
      'Common factor extraction, difference of squares a² - b², and splitting middle terms in quadratic trinomials',
      'វិធីចាប់កត្តារួម ការប្រើប្រាស់រូបមន្ត a² - b² និងវិធីបំបែកតួកណ្តាលនៃត្រីធា ax² + bx + c',
      $BODY_EN$## Factorization Methods
Extract greatest common factor, apply $a^2 - b^2 = (a-b)(a+b)$, and decompose middle terms to factor quadratic polynomials.$BODY_EN$,
      $BODY_KM$## ១. វិធីចាប់កត្តារួម (Common Factors)
$$ab + ac = a(b + c)$$
- **ឧទាហរណ៍៖** $6x^2 - 9x = 3x(2x - 3)$

## ២. ប្រើប្រាស់រូបមន្តផលដកការេ
$$a^2 - b^2 = (a - b)(a + b)$$
- **ឧទាហរណ៍៖** $4x^2 - 25 = (2x - 5)(2x + 5)$

## ៣. វិធីបំបែកតួកណ្តាល
ដើម្បីដាក់ $x^2 + 5x + 6$ ជាផលគុណកត្តា យើងរកពីរចំនួនដែលមានផលបូក $5$ និងផលគុណ $6$ (គឺ $2$ និង $3$)៖
$$x^2 + 5x + 6 = (x + 2)(x + 3)$$$BODY_KM$,
      22,
      35,
      true,
      6
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Triangle Congruence (SSS, SAS, ASA Criteria) (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Triangle Congruence (SSS, SAS, ASA Criteria)',
      'ត្រីកោណប៉ុនគ្នា (លក្ខខណ្ឌ ជ្រ-ជ្រ-ជ្រ, ជ្រ-ម-ជ្រ, ម-ជ្រ-ម)',
      'Criteria for triangle congruence: Side-Side-Side, Side-Angle-Side, Angle-Side-Angle, and geometric proofs',
      'លក្ខណៈត្រីកោណប៉ុនគ្នា ជ្រុងត្រូវគ្នា មុំត្រូវគ្នា និងការអនុវត្តក្នុងការបញ្ជាក់ធរណីមាត្រ',
      $BODY_EN$## Triangle Congruence
Two triangles are congruent if they satisfy SSS (Side-Side-Side), SAS (Side-Angle-Side), or ASA (Angle-Side-Angle) conditions.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យត្រីកោណប៉ុនគ្នា
ត្រីកោណពីរហៅថាប៉ុនគ្នា លុះត្រាតែជ្រុងត្រូវគ្នាស្មើៗគ្នា និងមុំត្រូវគ្នាស្មើៗគ្នា។

## ២. ករណីប៉ុនគ្នាទាំង ៣
១. **ករណីទី១ (ជ្រុង-ជ្រុង-ជ្រុង / SSS)៖** ជ្រុងទាំងបីនៃត្រីកោណមួយស្មើនឹងជ្រុងទាំងបីនៃត្រីកោណមួយទៀត
២. **ករណីទី២ (ជ្រុង-មុំ-ជ្រុង / SAS)៖** ជ្រុងពីរ និងមុំផ្គុំដោយជ្រុងទាំងពីរនៃត្រីកោណមួយ ស្មើនឹងជ្រុងពីរ និងមុំផ្គុំនៃត្រីកោណមួយទៀត
៣. **ករណីទី៣ (មុំ-ជ្រុង-មុំ / ASA)៖** ជ្រុងមួយ និងមុំជាប់ជ្រុងនោះពីរនៃត្រីកោណមួយ ស្មើនឹងជ្រុងមួយ និងមុំជាប់នៃត្រីកោណមួយទៀត។$BODY_KM$,
      22,
      35,
      true,
      7
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Volumes of Cylinders, Cones & Spheres (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Volumes of Cylinders, Cones & Spheres',
      'ធរណីមាត្រមាឌ ស៊ីឡាំង កោន និងស្វ៊ែរ',
      'Solid volume and surface area formulas for cylinders, cones, and spheres with practical calculation examples',
      'រូបមន្តមាឌស៊ីឡាំង V = πr²h មាឌកោន V = (1/3)πr²h និងមាឌស្វ៊ែរ V = (4/3)πr³',
      $BODY_EN$## Curved Solids
Cylinder: $V = \pi r^2 h$. Cone: $V = \frac{1}{3}\pi r^2 h$. Sphere: $V = \frac{4}{3}\pi r^3$.$BODY_EN$,
      $BODY_KM$## ១. ស៊ីឡាំង (Cylinder)
- ក្រឡាផ្ទៃខាង៖ $S_l = 2\pi rh$
- មាឌ៖ $V = \pi r^2 h$ (ផ្ទៃបាត $\times$ កម្ពស់)

## ២. កោន (Cone)
- មាឌ៖ $V = \frac{1}{3} \pi r^2 h$ (មួយភាគបីនៃមាឌស៊ីឡាំងដែលមានកាំបាត និងកម្ពស់ដូចគ្នា)

## ៣. ស្វ៊ែរ (Sphere)
- ក្រឡាផ្ទៃស្វ៊ែរ៖ $S = 4\pi r^2$
- មាឌស្វ៊ែរ៖ $V = \frac{4}{3} \pi r^3$$BODY_KM$,
      22,
      35,
      true,
      8
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Descriptive Statistics, Mean & Histograms (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Descriptive Statistics, Mean & Histograms',
      'ស្ថិតិ មធ្យមនព្វន្ត និងដ្យាក្រាមទិន្នន័យ',
      'Mean calculation, modal classes, continuous frequency distribution tables, and histogram representations',
      'ការគណនាមធ្យមនព្វន្ត ម៉ូត ថ្នាក់ទិន្នន័យ តារាងប្រេកង់ និងអ៊ីស្តូក្រាម',
      $BODY_EN$## Grouped Statistics
Calculate the weighted mean $\bar{x} = \frac{\sum f_i x_i}{N}$ and plot frequency density on histograms.$BODY_EN$,
      $BODY_KM$## ១. មធ្យមនព្វន្ត (Arithmetic Mean)
$$\bar{x} = \frac{\sum f_i x_i}{N} = \frac{f_1 x_1 + f_2 x_2 + ... + f_k x_k}{f_1 + f_2 + ... + f_k}$$
- $x_i$ ៖ តម្លៃទិន្នន័យ (ឬចំណុចកណ្តាលថ្នាក់)
- $f_i$ ៖ ប្រេកង់នៃទិន្នន័យនីមួយៗ
- $N$ ៖ ចំនួនទិន្នន័យសរុប

## ២. អ៊ីស្តូក្រាម (Histogram)
អ៊ីស្តូក្រាម គឺជាដ្យាក្រាមចតុកោណកែងជាប់ៗគ្នា ដែលផ្ទៃក្រឡាចតុកោណកែងនីមួយៗសមាមាត្រនឹងប្រេកង់នៃថ្នាក់នីមួយៗ។$BODY_KM$,
      20,
      35,
      true,
      9
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Applied Math Word Problems (Systems) (mathematics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Applied Math Word Problems (Systems)',
      'ចំណោទគណិតវិទ្យាដោះស្រាយដោយប្រព័ន្ធសមីការបឋម',
      'Mathematical modeling of commercial transactions, perimeter constraints, and linear system formulation',
      'ការបង្កើត និងដោះស្រាយចំណោទសេដ្ឋកិច្ច ការទិញលក់ និងធរណីមាត្រតាមរយៈសមីការលីនេអ៊ែរ',
      $BODY_EN$## Problem Solving with Linear Systems
Formulate two equations with two unknowns ($x, y$), eliminate or substitute variables, and verify economic reality.$BODY_EN$,
      $BODY_KM$## ១. វិធីសាស្ត្របង្កើតប្រព័ន្ធសមីការ
១. កំណត់អញ្ញាតពីរ $x$ និង $y$ ព្រមទាំងខ្នាត
២. បកប្រែលក្ខខណ្ឌទាំងពីរនៃប្រធានចំណោទទៅជាសមីការពីរ
៣. ដោះស្រាយប្រព័ន្ធសមីការតាមវិធីបូកបំបាត់ ឬវិធីជំនួស
៤. ផ្ទៀងផ្ទាត់ចម្លើយ និងឆ្លើយសំណួរ។

> **ឧទាហរណ៍៖** សៀវភៅ ២ ក្បាល និងប៊ិច ៣ ដើម តម្លៃ $8000$ រៀល។ សៀវភៅ ៣ ក្បាល និងប៊ិច ២ ដើម តម្លៃ $9500$ រៀល។ រកតម្លៃសៀវភៅ ១ ក្បាល និងប៊ិច ១ ដើម។
> $$\begin{cases} 2x + 3y = 8000 \\ 3x + 2y = 9500 \end{cases}$$
> ដោះស្រាយបាន $x = 2500$ រៀល (សៀវភៅ) និង $y = 1000$ រៀល (ប៊ិច)។$BODY_KM$,
      22,
      35,
      true,
      10
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Solid & Hydrostatic Pressure (P = F / S) (physics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Solid & Hydrostatic Pressure (P = F / S)',
      'សម្ពាធក្នុងសូលីត និងសន្ទនីយ៍ (P = F / S)',
      'Pressure formula P = F/S, Pascal unit (Pa), and hydrostatic fluid depth pressure P = ρgh',
      'និយមន័យសម្ពាធ រូបមន្ត P = F / S សម្ពាធក្នុងទឹក P = ρ · g · h និងខ្នាតប៉ាស្កាល់ (Pa)',
      $BODY_EN$## Pressure
$P = F/S$ measured in Pascals ($Pa$). Hydrostatic liquid pressure increases with depth: $P = \rho g h$.$BODY_EN$,
      $BODY_KM$## ១. សម្ពាធក្នុងសូលីត (Pressure in Solids)
សម្ពាធ $P$ គឺជាកម្លាំងសង្កត់កែងលើផ្ទៃមួយខ្នាតក្រឡាផ្ទៃ $S$៖
$$P = \frac{F}{S}$$
- $P$ ៖ សម្ពាធ (ប៉ាស្កាល់ $Pa$ ឬ $N/m^2$)
- $F$ ៖ កម្លាំងសង្កត់កែង ($N$)
- $S$ ៖ ក្រឡាផ្ទៃប៉ះ ($m^2$)

## ២. សម្ពាធសន្ទនីយ៍ក្នុងអង្គធាតុរាវ (Hydrostatic Pressure)
សម្ពាធក្នុងអង្គធាតុរាវកើនឡើងតាមជម្រៅទឹក $h$៖
$$P = \rho \cdot g \cdot h$$
- $\rho$ ៖ ម៉ាសមាឌរាវ ($kg/m^3$)
- $g = 9.8\text{ m/s}^2$ ៖ សំទុះទំនាញដី
- $h$ ៖ ជម្រៅទឹក ($m$)$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Archimedes' Buoyancy Principle (physics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Archimedes'' Buoyancy Principle',
      'កម្លាំងរុញអាកស៊ីម៉ែត និងលក្ខខណ្ឌអណ្តែត',
      'Buoyancy force FA = ρ·V·g equal to weight of displaced fluid, apparent weight, and flotation',
      'ច្បាប់អាកស៊ីម៉ែត FA = ρ · V · g ទម្ងន់ជាក់ស្តែងក្នុងទឹក និងលក្ខខណ្ឌអណ្តែត-លិច',
      $BODY_EN$## Archimedes' Principle
$F_A = \rho V g$. Buoyant force equals the weight of displaced liquid. Floating happens when $F_A = Weight$.$BODY_EN$,
      $BODY_KM$## ១. គោលការណ៍អាកស៊ីម៉ែត (Archimedes' Principle)
អង្គធាតុមួយដែលពន្លិចក្នុងអង្គធាតុរាវ រងកម្លាំងរុញច្រានពីក្រោមឡើងលើ ហៅថា **កម្លាំងរុញអាកស៊ីម៉ែត ($F_A$)** ដែលស្មើនឹងទម្ងន់នៃអង្គធាតុរាវដែលត្រូវផ្លាស់ទី៖

$$F_A = \rho \cdot V \cdot g$$
- $\rho$ ៖ ម៉ាសមាឌអង្គធាតុរាវ ($kg/m^3$)
- $V$ ៖ មាឌផ្នែកដែលលិចក្នុងទឹក ($m^3$)
- $g$ ៖ សំទុះទំនាញ ($9.8\text{ m/s}^2$)

## ២. លក្ខខណ្ឌអណ្តែត និងលិច
- បើ $F_A > P$ (ទម្ងន់វត្ថុ) ៖ អង្គធាតុ **អណ្តែតឡើងលើ**
- បើ $F_A = P$ ៖ អង្គធាតុ **អណ្តែតត្រឹមផ្ទៃទឹក (លំនឹង)**
- បើ $F_A < P$ ៖ អង្គធាតុ **លិចចុះបាត**$BODY_KM$,
      20,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mechanical Work & Power (W = F · d, P = W / t) (physics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Mechanical Work & Power (W = F · d, P = W / t)',
      'ការងារ និងអានុភាពមេកានិច (W = F · d, P = W / t)',
      'Work W = F·d measured in Joules (J), and power P = W/t measured in Watts (W)',
      'និយមន័យការងារមេកានិច ខ្នាតស៊ូល (J) និងអានុភាពគិតជាវ៉ាត់ (W)',
      $BODY_EN$## Work & Power
Work $W = F \cdot d$ (Joules). Power $P = W/t$ (Watts). One horsepower is roughly $746\text{ W}$.$BODY_EN$,
      $BODY_KM$## ១. ការងារមេកានិច (Work $W$)
កម្លាំងមួយធ្វើការងារ លុះត្រាតែកម្លាំងនោះធ្វើឱ្យវត្ថុផ្លាស់ទីតាមទិសដៅនៃកម្លាំង៖
$$W = F \cdot d$$
- $W$ ៖ ការងារ (ស៊ូល $J$)
- $F$ ៖ កម្លាំង ($N$)
- $d$ ៖ ចម្ងាយផ្លាស់ទី ($m$)

## ២. អានុភាពមេកានិច (Power $P$)
អានុភាព គឺជាល្បឿននៃការបំពេញការងារក្នុងមួយឯកតាពេល៖
$$P = \frac{W}{t}$$
- $P$ ៖ អានុភាព (វ៉ាត់ $W$)
- $t$ ៖ រយៈពេល ($s$)
- $1\text{ kW} = 1000\text{ W}$, $1\text{ សេះ (HP)} \approx 746\text{ W}$$BODY_KM$,
      20,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Thermal Physics & Heat Transfer (physics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Thermal Physics & Heat Transfer',
      'ទែរម៉ូម៉ែត្រ និងការចម្លងកម្តៅ',
      'Three modes of thermal energy transfer: conduction, convection currents, and infrared radiation',
      'ការចម្លងកម្តៅតាមរយៈ បន្សាយកម្តៅ ចរន្តវិលវល់ និងវិទ្យុសកម្មកម្តៅ',
      $BODY_EN$## Heat Transfer
Conduction (solids), Convection (fluids), and Radiation (electromagnetic infrared across vacuum).$BODY_EN$,
      $BODY_KM$## ១. របៀបទាំង ៣ នៃការបញ្ជូនកម្តៅ
1. **ការចម្លងកម្តៅ (Conduction)៖** កើតឡើងក្នុងអង្គធាតុរឹង (លោហៈចម្លងកម្តៅបានល្អជាងគេ)
2. **ចរន្តវិលវល់ (Convection)៖** កើតឡើងក្នុងអង្គធាតុរាវ និងឧស្ម័ន (សារធាតុរាវក្តៅស្រាលអណ្តែតឡើង សារធាតុរាវត្រជាក់ធ្លាក់ចុះ)
3. **វិទ្យុសកម្ម (Radiation)៖** ការបញ្ជូនតាមរលកអេឡិចត្រូម៉ាញេទិច មិនត្រូវការមជ្ឈដ្ឋានកណ្តាលឡើយ (ដូចកម្តៅព្រះអាទិត្យមកផែនដី)$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Electrostatics & Elementary Circuits (physics - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Electrostatics & Elementary Circuits',
      'អគ្គិសនីស្ទាទិច និងសៀគ្វីអគ្គិសនីបឋម',
      'Electric charge properties, attraction/repulsion, conductors vs insulators, and basic series circuits',
      'បន្ទុកវិជ្ជមាន អវិជ្ជមាន ការឆក់អេឡិចត្រូស្ទាទិច និងគ្រឿងបង្គុំសៀគ្វីអគ្គិសនី',
      $BODY_EN$## Electrostatics & Circuits
Opposite charges attract; like charges repel. Closed circuits allow electron current to illuminate bulbs.$BODY_EN$,
      $BODY_KM$## ១. បន្ទុកអគ្គិសនី (Electric Charges)
- មានពីរប្រភេទ៖ **បន្ទុកវិជ្ជមាន ($+$)** និង **បន្ទុកអវិជ្ជមាន ($-$)**
- បន្ទុកដូចគ្នា **ច្រានគ្នា** ($+ \leftrightarrow +$ ឬ $- \leftrightarrow -$)
- បន្ទុកផ្ទុយគ្នា **ទាញគ្នា** ($+ \rightarrow \leftarrow -$)

## ២. សៀគ្វីអគ្គិសនីសាមញ្ញ
សៀគ្វីអគ្គិសនីត្រូវតែបិទជិត ដើម្បីឱ្យចរន្តអគ្គិសនីហូរបាន៖
- **ប្រភពអគ្គិសនី (ថ្មពិល)៖** ផ្តល់តង់ស្យុង
- **ខ្សែចម្លង (ទង់ដែង)៖** ដឹកនាំអេឡិចត្រុងសេរី
- **អ្នកទទួល (អំពូលភ្លើង)៖** បំប្លែងថាមពលអគ្គិសនីទៅជាពន្លឺ$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Atoms, Chemical Formulas & Valency (chemistry - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Atoms, Chemical Formulas & Valency',
      'អាតូម ម៉ូលេគុល និងរូបមន្តគីមី',
      'Chemical element symbols, valency rules, writing compound formulas, and molecular weight M',
      'និមិត្តសញ្ញាគីមី វ៉ាឡង់នៃធាតុ រូបមន្តគីមី និងម៉ាសម៉ូលេគុល M',
      $BODY_EN$## Chemical Formulas
Cross-valency rule: element A (valency x) and element B (valency y) form compound $A_y B_x$ (e.g. $Al_2O_3$).$BODY_EN$,
      $BODY_KM$## ១. និមិត្តសញ្ញាធាតុ និងវ៉ាឡង់
- អ៊ីដ្រូសែន ($H$) ៖ វ៉ាឡង់ I
- អុកស៊ីសែន ($O$) ៖ វ៉ាឡង់ II
- កាបូន ($C$) ៖ វ៉ាឡង់ IV
- សូដ្យូម ($Na$) ៖ វ៉ាឡង់ I

## ២. វិធានខ្វែងវ៉ាឡង់ដើម្បីសរសេររូបមន្តគីមី
$$\text{ធាតុ A (វ៉ាឡង់ } x) + \text{ធាតុ B (វ៉ាឡង់ } y) \implies A_y B_x$$
> **ឧទាហរណ៍៖** អាលុយមីញ៉ូម ($Al$ វ៉ាឡង់ III) ផ្សំជាមួយអុកស៊ីសែន ($O$ វ៉ាឡង់ II) ៖
> $$\implies Al_2O_3$$$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Conservation of Mass & Equation Balancing (chemistry - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Conservation of Mass & Equation Balancing',
      'ច្បាប់រក្សាម៉ាស និងតុល្យភាពសមីការគីមី',
      'Lavoisier''s Law of Mass Conservation: total mass of reactants equals total mass of products',
      'ច្បាប់ឡាវ៉្វាស៊ីយេ ម៉ាសមុនប្រតិកម្មស្មើម៉ាសក្រោយប្រតិកម្ម និងមេគុណស្ទ័រគ្យូម៉េទ្រី',
      $BODY_EN$## Conservation of Mass
Lavoisier's law: Mass is conserved in chemical reactions. Balance equations by matching atom counts on both sides.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់រក្សាម៉ាស (ច្បាប់ឡាវ៉្វាស៊ីយេ)
> «គ្មានអ្វីបាត់បង់ គ្មានអ្វីកើតឡើងថ្មី គ្រប់យ៉ាងប្រែប្រួល»
> ផលបូកម៉ាសនៃអង្គធាតុប្រតិករ តែងតែស្មើនឹងផលបូកម៉ាសនៃអង្គធាតុកកើត៖
> $$\sum m_{\text{reactants}} = \sum m_{\text{products}}$$

## ២. តុល្យភាពសមីការគីមី
ចំនួនអាតូមនៃធាតុនីមួយៗនៅខាងឆ្វេង (ប្រតិករ) ត្រូវតែស្មើនឹងចំនួនអាតូមនៅខាងស្តាំ (កកើត)៖
$$2\text{ H}_2 + \text{O}_2 \rightarrow 2\text{ H}_2\text{O}$$
- ខាងឆ្វេង៖ $4\text{ H}, 2\text{ O}$
- ខាងស្តាំ៖ $4\text{ H}, 2\text{ O}$ (មានតុល្យភាព!)$BODY_KM$,
      22,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Oxygen Chemistry & Combustion (chemistry - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Oxygen Chemistry & Combustion',
      'អុកស៊ីសែន និងប្រតិកម្មឆេះ',
      'Properties of O2, complete vs incomplete combustion of carbon and metals, forming oxides',
      'លក្ខណៈរូប និងគីមីនៃអុកស៊ីសែន ប្រតិកម្មអុកស៊ីតកម្ម និងលក្ខខណ្ឌនៃការឆេះ',
      $BODY_EN$## Combustion
Oxygen supports rapid exothermic oxidation reactions. Complete hydrocarbon burning yields $CO_2$ and $H_2O$.$BODY_EN$,
      $BODY_KM$## ១. លក្ខណៈនៃអុកស៊ីសែន ($O_2$)
អុកស៊ីសែនជាឧស្ម័នគ្មានពណ៌ គ្មានក្លិន ធ្ងន់ជាងខ្យល់បន្តិច និងទ្រទ្រង់អំពើឆេះ។

## ២. ប្រតិកម្មឆេះ (Combustion)
- ឆេះកាបូន៖
  $$\text{C} + \text{O}_2 \rightarrow \text{CO}_2$$
- ឆេះដែក៖
  $$3\text{Fe} + 2\text{O}_2 \rightarrow \text{Fe}_3\text{O}_4$$
- ឆេះឧស្ម័នមេតាន (ហ្គាសផ្ទះបាយ)៖
  $$\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$$$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Hydrogen Properties & Metal Reactions (chemistry - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Hydrogen Properties & Metal Reactions',
      'អ៊ីដ្រូសែន និងប្រតិកម្មជាមួយលោហៈ',
      'Lightest gas H2, acid-metal single displacement reactions Zn + 2HCl → ZnCl2 + H2, pop test',
      'ឧស្ម័នស្រាលជាងគេ ការផលិត H₂ ដោយឱ្យអាស៊ីតមានអំពើលើលោហៈសកម្ម (Zn, Fe)',
      $BODY_EN$## Hydrogen
Lightest element. Prepared via acid + metal displacement: $Zn + 2HCl \rightarrow ZnCl_2 + H_2$.$BODY_EN$,
      $BODY_KM$## ១. ឧស្ម័នអ៊ីដ្រូសែន ($H_2$)
អ៊ីដ្រូសែន គឺជាឧស្ម័នដែល **ស្រាលជាងគេបំផុត** ក្នុងសកលលោក។ នៅពេលឆេះក្នុងខ្យល់ វាបញ្ចេញសំឡេងផ្ទុះ «ផូង» យ៉ាងលក្ខណៈសម្គាល់។

## ២. ការទាញយកអ៊ីដ្រូសែនក្នុងបន្ទប់ពិសោធន៍
គេឱ្យលោហៈសកម្ម (ស័ង្កសី $Zn$, ដែក $Fe$) មានប្រតិកម្មជាមួយអាស៊ីតក្លរីឌ្រិច ($HCl$)៖
$$\text{Zn} + 2\text{HCl} \rightarrow \text{ZnCl}_2 + \text{H}_2 \uparrow$$$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Introductory Acids, Bases & Indicators (chemistry - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Introductory Acids, Bases & Indicators',
      'អាស៊ីត និងបាសបឋម',
      'Litmus paper indicators (red for acid, blue for base), sensory properties, and common household chemicals',
      'ក្រដាសលីតមុស ពណ៌ប្រែប្រួល រសជាតិជូរនៃអាស៊ីត និងរអិលនៃបាស',
      $BODY_EN$## Acids & Bases
Acids turn blue litmus red. Bases turn red litmus blue and feel slippery like soap.$BODY_EN$,
      $BODY_KM$## ១. អាស៊ីត (Acids)
- មានរសជាតិជូរ (ឧ. ទឹកក្រូចឆ្មា $HCl$)
- ធ្វើឱ្យ **ក្រដាសលីតមុសប្តូរពីពណ៌ខៀវ ទៅជាពណ៌ក្រហម**

## ២. បាស (Bases)
- មានរសជាតិចត់ និងរអិលដូចសាប៊ូ (ឧ. សូដ្យូមអ៊ីដ្រុកស៊ីត $NaOH$, ទឹកកំបោរ $Ca(OH)_2$)
- ធ្វើឱ្យ **ក្រដាសលីតមុសប្តូរពីពណ៌ក្រហម ទៅជាពណ៌ខៀវ**$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Human Digestive Anatomy & Enzymatic Breakdown (biology - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Human Digestive Anatomy & Enzymatic Breakdown',
      'ប្រព័ន្ធរំលាយអាហាររបស់មនុស្ស',
      'Mechanical chewing, gastric acid, digestive enzymes (amylase, pepsin), small intestine villi absorption',
      'ដំណើររំលាយអាហារមេកានិច និងគីមីពីមាត់ ក្រពះ ពោះវៀនតូច និងការស្រូបសារធាតុចិញ្ចឹម',
      $BODY_EN$## Digestive System
Food breaks down mechanically and chemically. The small intestine completes digestion and absorbs nutrients into blood.$BODY_EN$,
      $BODY_KM$## ១. ផ្លូវរំលាយអាហារ
$$\text{មាត់} \rightarrow \text{បំពង់អាហារ} \rightarrow \text{ក្រពះ} \rightarrow \text{ពោះវៀនតូច} \rightarrow \text{ពោះវៀនធំ} \rightarrow \text{ទ្វារធំ}$$

## ២. មុខងារសំខាន់ៗ
- **មាត់៖** ទំពារបំបែកអាហារ និងអង់ស៊ីមអាមីឡាសក្នុងទឹកមាត់រំលាយជាតិម្សៅ
- **ក្រពះ៖** បញ្ចេញអាស៊ីត $HCl$ និងអង់ស៊ីមប៉ិបស៊ីនរំលាយប្រូតេអ៊ីន
- **ពោះវៀនតូច៖** កន្លែងបញ្ចប់ការរំលាយអាហារ និង **ស្រូបយកសារធាតុចិញ្ចឹម** ចូលក្នុងចរន្តឈាមតាមបណ្តោយរោមពោះវៀន$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Human Circulatory System & Cardiac Pumping (biology - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Human Circulatory System & Cardiac Pumping',
      'ប្រព័ន្ធរបត់ឈាម និងបេះដូង',
      '4 heart chambers (atria, ventricles), arteries, veins, capillaries, red blood cells and hemoglobin',
      'រចនាសម្ព័ន្ធបេះដូងថតទាំង ៤ សរសៃឈាមអាទែ វ៉ែន និងគោលិកាក្រហមដឹកនាំ O₂',
      $BODY_EN$## Circulatory System
4-chambered heart pumps oxygenated blood via arteries and returns deoxygenated blood via veins.$BODY_EN$,
      $BODY_KM$## ១. បេះដូងមនុស្ស (Human Heart)
បេះដូងមាន ៤ ថត៖
- **ថតលើស្តាំ និងថតលើឆ្វេង (Atria)៖** ទទួលឈាម
- **ថតក្រោមក្តៅ និងថតក្រោមឆ្វេង (Ventricles)៖** ច្របាច់បញ្ជូនឈាម (ថតក្រោមឆ្វេងមានសាច់ដុំក្រាស់ជាងគេ ព្រោះត្រូវបាញ់ឈាមទៅទូទាំងរាងកាយ)

## ២. សរសៃឈាម និងសមាសភាគឈាម
- **អាទែ (Arteries)៖** នាំឈាមសម្បូរ $O_2$ ចេញពីបេះដូង
- **វ៉ែន (Veins)៖** នាំឈាមសម្បូរ $CO_2$ ត្រឡប់មកបេះដូងវិញ
- **គោលិកាឈាមក្រហម៖** ផ្ទុកអេម៉ូក្លូប៊ីន ដឹកនាំអុកស៊ីសែន$BODY_KM$,
      20,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Human Respiratory Mechanics (biology - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Human Respiratory Mechanics',
      'ប្រព័ន្ធដង្ហើម និងការផ្លាស់ប្តូរឧស្ម័ន',
      'Trachea, bronchi, alveoli capillary diffusion, diaphragm movement, and oxygen-CO2 exchange',
      'សួត ទងសួត ថង់ខ្យល់អាល់វេអូល និងការផ្លាស់ប្តូរឧស្ម័ន O₂ និង CO₂ ជាមួយឈាម',
      $BODY_EN$## Respiratory System
Gas exchange occurs across alveolar membranes: $O_2$ diffuses into blood capillaries; $CO_2$ diffuses out.$BODY_EN$,
      $BODY_KM$## ១. ការផ្លាស់ប្តូរឧស្ម័ននៅថង់ខ្យល់សួត (Alveoli)
សួតរបស់មនុស្សមានថង់ខ្យល់តូចៗរាប់រយលាន៖
- អុកស៊ីសែន ($O_2$) ជ្រាបពីថង់ខ្យល់ចូលទៅក្នុងសរសៃឈាមប្តូរ
- ឧស្ម័នកាបូនិក ($CO_2$) ជ្រាបពីឈាមចូលមកក្នុងថង់ខ្យល់សួត ដើម្បីដកដង្ហើមបញ្ចេញមកក្រៅ$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Excretory System & Renal Nephron Filtration (biology - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Excretory System & Renal Nephron Filtration',
      'ប្រព័ន្ធបញ្ចេញចោល និងតម្រងនោម',
      'Nephron blood filtration, urea waste excretion, urine formation, and homeostasis osmoregulation',
      'មុខងារតម្រងនោម ច្រោះឈាម បញ្ចេញអ៊ុយរ៉េ និងការថែរក្សាលំនឹងទឹកក្នុងសារពាង្គកាយ',
      $BODY_EN$## Excretory System
Kidneys filter urea and metabolic wastes from blood to regulate fluid balance and form urine.$BODY_EN$,
      $BODY_KM$## ១. តម្រងនោម (Kidneys)
មនុស្សមានតម្រងនោមមួយគូ រាងដូចគ្រាប់សណ្តែកក្រហម មានមុខងារ៖
- ច្រោះជាតិពុល និងអ៊ុយរ៉េចេញពីឈាម
- រក្សាលំនឹងទឹក និងជាតិអំបិលក្នុងសារពាង្គកាយ (Homeostasis)
- បង្កើតទឹកនោមបញ្ជូនទៅកាន់ប្លោកនោម$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Reproduction in Plants and Animals (biology - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Reproduction in Plants and Animals',
      'ការបន្តពូជរបស់រុក្ខជាតិ និងសត្វ',
      'Sexual vs asexual reproduction, flower pollination, gamete fertilization, and embryonic stages',
      'ការបន្តពូជដោយភេទ និងឥតភេទ លំអងផ្កា ការបង្កកំណើត និងការលូតលាស់នៃអំប្រ៊ីយ៉ុង',
      $BODY_EN$## Reproduction
Asexual produces identical clones. Sexual involves fertilization of sperm and egg, ensuring genetic diversity.$BODY_EN$,
      $BODY_KM$## ១. ការបន្តពូជឥតភេទ (Asexual)
មិនត្រូវការមេជីវិតឈ្មោល និងញីទេ (កូនបង្កើតមកដូចមេបេះបិទ) ដូចជា ការបំបែកកោសិកា ការលូតមែក ផ្សាំ ឫសដំឡូង។

## ២. ការបន្តពូជដោយភេទ (Sexual)
ត្រូវការការបង្កកំណើតរវាង **ស្ពែម៉ាតូសូអ៊ីត ($n$)** និង **អូវុល ($n$)** បង្កើតបានជា **ស៊ីហ្គោត ($2n$)** ដែលមានលក្ខណៈចម្រុះពីមេបាទាំងពីរ។$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Plate Tectonics & Continental Drift (earth - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Plate Tectonics & Continental Drift',
      'ផ្លាកតិចតូនិច និងចលនាទ្វីប',
      'Wegener''s continental drift, mantle thermal convection driving lithospheric tectonic plates',
      'ទ្រឹស្តី Alfred Wegener បន្ទះសំបកផែនដី រលកវិលវល់កម្តៅក្នុងអាវផែនដី',
      $BODY_EN$## Plate Tectonics
Convection currents in mantle drive tectonic plates: convergent boundaries push up mountains; divergent create rifts.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីរសាត់ទ្វីប (Continental Drift)
នៅអតីតកាលរាប់រយលានឆ្នាំមុន ទ្វីបទាំងអស់ធ្លាប់ភ្ជាប់គ្នាជាមហាទ្វីបតែមួយ ហៅថា **ផង់ស៊ា (Pangaea)**។

## ២. ចលនានៃផ្លាកតិចតូនិច
សំបកផែនដីបែកជាបន្ទះធំៗ (Tectonic Plates) ដែលអណ្តែតលើអាវផែនដី ដោយសារ **ចរន្តវិលវល់កម្តៅ (Convection Currents)**៖
- បន្ទះរំកិលចេញពីគ្នា (Divergent) ៖ បង្កើតជួរភ្នំក្រោមសមុទ្រ
- បន្ទះរំកិលបុកគ្នា (Convergent) ៖ បង្កើតជួរភ្នំខ្ពស់ៗ (ដូចជាភ្នំហិម៉ាឡៃ)
- បន្ទះរអិលកកិតគ្នា (Transform) ៖ បង្កឱ្យមានការរញ្ជួយដីខ្លាំង$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Volcanoes, Seismic Waves & Richter Scale (earth - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Volcanoes, Seismic Waves & Richter Scale',
      'បន្ទុះភ្នំភ្លើង និងការរញ្ជួយដី',
      'Seismic epicenters, P and S body waves, Richter magnitude scale, and Pacific Ring of Fire',
      'ចំណុចកណ្តាលរញ្ជួយដី អេពីសង់ រលកភូមិរញ្ជួយ P និង S និងខ្សែក្រវាត់ភ្លើងប៉ាស៊ីហ្វិក',
      $BODY_EN$## Seismology
Earthquakes release elastic strain energy from faults measured on the Richter scale. Epicenter is surface point directly above focus.$BODY_EN$,
      $BODY_KM$## ១. ការរញ្ជួយដី (Earthquakes)
កើតឡើងនៅពេលថាមពលសំពាធក្នុងថ្មរំដោះភ្លាមៗតាមបណ្តោយស្នាមប្រេះ (Faults)៖
- **ហ្វូយេ (Focus) ៖** ចំណុចចាប់ផ្តើមរញ្ជួយដីក្នុងដី
- **អេពីសង់ (Epicenter) ៖** ចំណុចលើផ្ទៃដីចំពីលើហ្វូយេ (រងគ្រោះធ្ងន់ជាងគេ)
- វាស់កម្លាំងរញ្ជួយដីតាម **មាត្រដ្ឋានរិចទ័រ (Richter Scale)**$BODY_KM$,
      20,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Weathering, Erosion & Deposition (earth - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Weathering, Erosion & Deposition',
      'ការសឹករិចរិល និងកំណកកម្ទេចថ្ម',
      'Mechanical vs chemical weathering, fluvial sediment transport, and Mekong delta alluvial plains',
      'ការបំបែកដោយអាកាសធាតុ ទឹកភ្លៀង ខ្យល់ និងការបង្កើតដីល្បាប់មានជីជាតិនៅកម្ពុជា',
      $BODY_EN$## Weathering & Erosion
Physical and chemical breakdown of bedrock. Mekong floodwaters deposit nutrient-rich alluvium across Cambodian basins.$BODY_EN$,
      $BODY_KM$## ១. ការសឹករិចរិល (Weathering & Erosion)
- **ការបំបែកដោយរូបវិទ្យា៖** ទឹកកកកក ឫសឈើចោះថ្ម
- **ការបំបែកដោយគីមី៖** ទឹកភ្លៀងអាស៊ីតរំលាយថ្មកំបោរ (បង្កើតជារូងភ្នំ karst)
- **ដីល្បាប់ទន្លេមេគង្គ៖** ទឹកជំនន់ប្រចាំឆ្នាំនាំដីល្បាប់ពណ៌ត្នោតសម្បូរជីវជាតិមកចាក់ស្រោចវាលស្រែកម្ពុជា$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Oceanography, Salinity & Gravitational Tides (earth - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Oceanography, Salinity & Gravitational Tides',
      'មហាសមុទ្រ និងជំនោរទឹកសមុទ្រ',
      'Ocean salinity 35 ppt, thermohaline dynamics, and lunar/solar gravitational tidal bulges',
      'កំហាប់អំបិលសមុទ្រ ៣៥ ភាគពាន់ ឥទ្ធិពលទំនាញព្រះចន្ទ និងព្រះអាទិត្យលើជំនោរនាច',
      $BODY_EN$## Oceans & Tides
Lunar gravitational pull drives ocean tides twice daily. Mean ocean salinity is 35 parts per thousand.$BODY_EN$,
      $BODY_KM$## ១. ទឹកសមុទ្រ
ទឹកសមុទ្រគ្របដណ្តប់ $71\%$ នៃផ្ទៃផែនដី មានកំហាប់អំបិលជាមធ្យម $3.5\%$ ($35\text{ g/L}$) ដែលភាគច្រើនជាអំបិល $NaCl$។

## ២. ជំនោរ និងនាច (Tides)
កើតឡើងដោយសារ **កម្លាំងទំនាញទំនាញរបស់ព្រះចន្ទ** និងព្រះអាទិត្យទាញទឹកសមុទ្រ។ រៀងរាល់ថ្ងៃមានជំនោរឡើង ២ ដង និងនាចស្រក ២ ដង។$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Greenhouse Effect & Climate Dynamics (earth - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Greenhouse Effect & Climate Dynamics',
      'ឥទ្ធិពលផ្ទះកញ្ចក់ និងការប្រែប្រួលអាកាសធាតុ',
      'Atmospheric thermal trapping via CO2 and CH4, global warming trends, and climate risks for Cambodia',
      'ឧស្ម័ន CO₂, CH₄ ទប់កម្តៅព្រះអាទិត្យ កម្តៅផែនដីកើនឡើង និងផលប៉ះពាល់លើកម្ពុជា',
      $BODY_EN$## Greenhouse Effect
Greenhouse gases trap infrared radiation. Excessive anthropogenic $CO_2$ causes global warming and severe weather anomalies.$BODY_EN$,
      $BODY_KM$## ១. ឥទ្ធិពលផ្ទះកញ្ចក់ធម្មជាតិ (Natural Greenhouse Effect)
ឧស្ម័នផ្ទះកញ្ចក់ ($CO_2, CH_4, H_2O$) ស្រូបកម្តៅកាំរស្មីអាំងហ្វ្រារ៉េដពីដី ជួយឱ្យផែនដីមានសីតុណ្ហភាពមធ្យម $+15^\circ\text{C}$ ដែលទ្រទ្រង់ជីវិតបាន។

## ២. កម្តៅសកលកើនឡើង (Global Warming)
ការដុតប្រេង ធ្យូងថ្ម និងការកាប់បំផ្លាញព្រៃឈើ បង្កើន $CO_2$ ហួសប្រមាណ នាំឱ្យ៖
- ទឹកកកប៉ូលរលាយ កម្ពស់ទឹកសមុទ្រឡើង
- គ្រោះរាំងស្ងួត និងទឹកជំនន់ធ្ងន់ធ្ងរនៅតំបន់ដីសណ្តទន្លេមេគង្គ$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Systems of Linear Equations (Diploma Exam) (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Systems of Linear Equations (Diploma Exam)',
      'ប្រព័ន្ធសមីការដឺក្រេទី១ មានពីរអញ្ញាត (ត្រៀមឌីប្លូម)',
      'Solving 2x2 linear systems using substitution, linear combination elimination, and graphing',
      'វិធីជំនួស វិធីបូកបំបាត់ និងវិធីក្រាហ្វិកក្នុងការរកគូកូអរដោនេ (x, y)',
      $BODY_EN$## Systems of Linear Equations
Solve via substitution or elimination to find intersection coordinate $(x, y)$.$BODY_EN$,
      $BODY_KM$## ១. ទម្រង់ទូទៅនៃប្រព័ន្ធសមីការ
$$\begin{cases} ax + by = c \\ a'x + b'y = c' \end{cases}$$

## ២. វិធីបូកបំបាត់ (Elimination Method)
គុណសមីការនឹងមេគុណសមស្រប ដើម្បីឱ្យមេគុណនៃអញ្ញាតមួយដូចគ្នា ឬផ្ទុយគ្នា រួចធ្វើប្រមាណវិធីបូក ឬដក៖

> **ឧទាហរណ៍៖**
> $$\begin{cases} 2x + y = 7 \quad (1) \\ x - y = 2 \quad (2) \end{cases}$$
> បូកសមីការ $(1) + (2)$៖
> $$(2x + x) + (y - y) = 7 + 2 \implies 3x = 9 \implies x = 3$$
> ជំនួស $x = 3$ ចូលក្នុង $(2)$៖
> $$3 - y = 2 \implies y = 1$$
> ដូចនេះ គូដំណោះស្រាយគឺ $(x, y) = (3, 1)$។$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Quadratic Equations & Discriminant Δ (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Quadratic Equations & Discriminant Δ',
      'សមីការដឺក្រេទី២ និងរូបមន្តឌីសគ្រីមីណង់ Δ (ត្រៀមឌីប្លូម)',
      'Discriminant formula Δ = b² - 4ac, root count analysis, and quadratic roots x = (-b ± √Δ) / 2a',
      'ការគណនា Δ = b² - 4ac ការវិភាគចំនួនឬស និងរូបមន្តឬស x = (-b ± √Δ) / 2a',
      $BODY_EN$## Quadratic Formula
$\Delta = b^2 - 4ac$. If $\Delta > 0$, two distinct real roots exist: $x = \frac{-b \pm \sqrt{\Delta}}{2a}$. If $\Delta = 0$, one double root.$BODY_EN$,
      $BODY_KM$## ១. សមីការដឺក្រេទី២ ទម្រង់ទូទៅ
$$ax^2 + bx + c = 0 \quad (a \neq 0)$$

## ២. រូបមន្តឌីសគ្រីមីណង់ (Discriminant $\Delta$)
$$\Delta = b^2 - 4ac$$

## ៣. ការវិភាគឬសតាមសញ្ញា $\Delta$
1. **បើ $\Delta > 0$ ៖** សមីការមាន **ឬសពីរជាចំនួនពិតផ្សេងគ្នា**៖
   $$x_1 = \frac{-b - \sqrt{\Delta}}{2a}, \quad x_2 = \frac{-b + \sqrt{\Delta}}{2a}$$
2. **បើ $\Delta = 0$ ៖** សមីការមាន **ឬសឌុបតែមួយ**៖
   $$x_1 = x_2 = -\frac{b}{2a}$$
3. **បើ $\Delta < 0$ ៖** សមីការ **គ្មានឬសក្នុងសំណុំចំនួនពិត $\mathbb{R}$ ឡើយ**$BODY_KM$,
      25,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Similar Triangles & Thales' Theorem (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Similar Triangles & Thales'' Theorem',
      'ត្រីកោណដូចគ្នា និងទ្រឹស្តីបទតាលែស',
      'Angle-Angle similarity criteria, proportional side segments, and Thales'' theorem',
      'លក្ខខណ្ឌត្រីកោណដូចគ្នា មុំ-មុំ ផលធៀបសមាមាត្រ និងទ្រឹស្តីបទតាលែសក្នុងត្រីកោណ',
      $BODY_EN$## Similar Triangles
Thales' theorem ensures parallel lines create proportional segments: $\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}$.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីបទតាលែស (Thales' Theorem)
បើបន្ទាត់មួយស្របនឹងជ្រុងមួយនៃត្រីកោណ ហើយកាត់ជ្រុងពីរទៀត នោះវានឹងចែកជ្រុងទាំងពីរជាកំណាត់សមាមាត្រគ្នា៖
$$\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}$$

## ២. ករណីត្រីកោណដូចគ្នា
ត្រីកោណពីរដូចគ្នា ប្រសិនបើ៖
- មុំពីររៀងគ្នាស្មើគ្នា (ករណី ម.ម)
- ជ្រុងទាំងបីសមាមាត្ររៀងគ្នា (ករណី ជ.ជ.ជ)$BODY_KM$,
      20,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Right-Triangle Trigonometric Ratios (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Right-Triangle Trigonometric Ratios',
      'ផលធៀបត្រីកោណមាត្រ sin, cos, tan',
      'Definitions of sine (opposite/hypotenuse), cosine (adjacent/hypotenuse), tangent, and sin²θ + cos²θ = 1',
      'និយមន័យ ស៊ីនុស កូស៊ីនុស តង់សង់ ក្នុងត្រីកោណកែង និងរូបមន្តគ្រឹះ sin²θ + cos²θ = 1',
      $BODY_EN$## Trigonometric Ratios
$\sin = \text{Opp}/\text{Hyp}$, $\cos = \text{Adj}/\text{Hyp}$, $\tan = \text{Opp}/\text{Adj}$. Identity: $\sin^2\theta + \cos^2\theta = 1$.$BODY_EN$,
      $BODY_KM$## ១. ផលធៀបត្រីកោណមាត្រក្នុងត្រីកោណកែង
- **ស៊ីនុស (Sine)៖**
  $$\sin \theta = \frac{\text{ជ្រុងឈម}}{\text{អ៊ីប៉ូតេនុស}}$$
- **កូស៊ីនុស (Cosine)៖**
  $$\cos \theta = \frac{\text{ជ្រុងជាប់}}{\text{អ៊ីប៉ូតេនុស}}$$
- **តង់សង់ (Tangent)៖**
  $$\tan \theta = \frac{\text{ជ្រុងឈម}}{\text{ជ្រុងជាប់}} = \frac{\sin \theta}{\cos \theta}$$

## ២. រូបមន្តគ្រឹះ
$$\sin^2 \theta + \cos^2 \theta = 1$$$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Circles, Inscribed Angles & Tangents (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Circles, Inscribed Angles & Tangents',
      'រង្វង់ ៖ មុំផ្ចិត មុំចារឹកក្នុងរង្វង់ និងបន្ទាត់ប៉ះ',
      'Inscribed angle theorem (inscribed angle is half the central angle), tangent perpendicularity',
      'ទំនាក់ទំនងរវាងមុំចារឹកក្នុងរង្វង់ និងមុំផ្ចិតស្ទាក់ធ្នូតែមួយ α = 1/2 θ',
      $BODY_EN$## Circles
An inscribed angle intercepting an arc equals half the central angle. An angle inscribed in a semicircle is always $90^\circ$.$BODY_EN$,
      $BODY_KM$## ១. មុំចារឹកក្នុងរង្វង់ និងមុំផ្ចិត
រង្វាស់នៃមុំចារឹកក្នុងរង្វង់ ស្មើនឹងពាក់កណ្តាលនៃរង្វាស់មុំផ្ចិតដែលស្ទាក់ធ្នូជាមួយគ្នា៖
$$\angle \text{inscribed} = \frac{1}{2} \angle \text{central}$$

> **លក្ខណៈពិសេស៖** មុំចារឹកក្នុងកន្លះរង្វង់ តែងតែជា **មុំកែង ($90^\circ$)** ជានិច្ច!

## ២. បន្ទាត់ប៉ះរង្វង់ (Tangent)
បន្ទាត់ប៉ះរង្វង់កែងនឹងកាំរង្វង់ត្រង់ចំណុចប៉ះជានិច្ច។$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Viète's Formulas & Factoring (Diploma) (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Viète''s Formulas & Factoring (Diploma)',
      'ទំនាក់ទំនងវីយែត ផលបូក និងផលគុណឫសនៃសមីការដឺក្រេទី២',
      'Viète''s relations S = -b/a and P = c/a, finding mental roots, and reconstructing quadratic equations X² - SX + P = 0',
      'ផលបូកឫស S = x₁ + x₂ = -b/a និងផលគុណឫស P = x₁ · x₂ = c/a ក្នុងការបង្កើតសមីការ X² - SX + P = 0',
      $BODY_EN$## Viète's Formulas
For $ax^2 + bx + c = 0$, the sum of roots is $S = -b/a$ and product is $P = c/a$. Reconstruct the quadratic via $X^2 - SX + P = 0$.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តទំនាក់ទំនងវីយែត (Viète's Relations)
ចំពោះសមីការដឺក្រេទី២ $ax^2 + bx + c = 0$ ($a \neq 0$) ដែលមានឫសពីរ $x_1, x_2$ (កាលណា $\Delta \ge 0$)៖
- **ផលបូកឫស (Sum of Roots)៖**
  $$S = x_1 + x_2 = -\frac{b}{a}$$
- **ផលគុណឫស (Product of Roots)៖**
  $$P = x_1 \cdot x_2 = \frac{c}{a}$$

## ២. ការបង្កើតសមីការដឺក្រេទី២
បើគេស្គាល់ពីរចំនួនដែលមានផលបូក $S$ និងផលគុណ $P$ នោះចំនួនទាំងពីរគឺជាឫសនៃសមីការ៖
$$X^2 - SX + P = 0$$

## ៣. ករណីពិសេសគណនាឫសរហ័ស
- បើ $a + b + c = 0$ នោះសមីការមានឫស $x_1 = 1, \quad x_2 = \frac{c}{a}$
- បើ $a - b + c = 0$ នោះសមីការមានឫស $x_1 = -1, \quad x_2 = -\frac{c}{a}$$BODY_KM$,
      22,
      40,
      true,
      6
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Applied Quadratic Word Problems (Brevet) (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Applied Quadratic Word Problems (Brevet)',
      'ចំណោទសមីការដឺក្រេទី២ ត្រៀមប្រឡងឌីប្លូម',
      'Word problem modeling leading to quadratic forms: rectangle dimensions, speed-distance-time, and integer sequences',
      'វិធីសាស្ត្រដោះស្រាយចំណោទធរណីមាត្រ ក្រឡាផ្ទៃ និងបញ្ហាល្បឿនដែលបង្កើតបានជាសមីការដឺក្រេទី២',
      $BODY_EN$## Solving Quadratic Word Problems
Assign positive variable $x$, formulate the area/distance equation, evaluate via discriminant, and discard physically impossible negative roots.$BODY_EN$,
      $BODY_KM$## ១. ជំហានដោះស្រាយចំណោទដឺក្រេទី២
១. **ជ្រើសរើសអញ្ញាត៖** តាង $x$ ជាប្រវែង ឬបរិមាណមិនទាន់ស្គាល់ ($x > 0$)
២. **បង្កើតសមីការ៖** បកប្រែព័ត៌មានទៅជាសមីការដឺក្រេទី២ $ax^2 + bx + c = 0$
៣. **ដោះស្រាយរកឫស៖** គណនា $\Delta = b^2 - 4ac$ រួចរក $x$
៤. **ជ្រើសរើសឫសសមស្រប៖** ច្រានចោលឫសអវិជ្ជមាន ឬមិនសមស្របនឹងលក្ខខណ្ឌជាក់ស្តែង។

> **ចំណោទគំរូឌីប្លូម៖** ចតុកោណកែងមួយមានបណ្តោយវែងជាងទទឹង $3\text{ m}$ និងមានក្រឡាផ្ទៃ $54\text{ m}^2$។ រកវិមាត្រនៃចតុកោណកែង។
> - តាងទទឹងដោយ $x$ ($x > 0$) នោះបណ្តោយគឺ $x + 3$
> - សមីការក្រឡាផ្ទៃ៖ $x(x + 3) = 54 \iff x^2 + 3x - 54 = 0$
> - ផលបូក $S = -3$, ផលគុណ $P = -54 \implies x_1 = 6, \quad x_2 = -9$ (មិនយក)
> - ដូចនេះ ទទឹងគឺ $6\text{ m}$ និងបណ្តោយគឺ $9\text{ m}$។$BODY_KM$,
      25,
      40,
      true,
      7
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Linear Functions, Slopes & Coordinate Graphs (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Linear Functions, Slopes & Coordinate Graphs',
      'អនុគមន៍លីនេអ៊ែរ និងក្រាហ្វិក y = ax + b',
      'Slope $a$, $y$-intercept $b$, parallel slopes $a = a''$, and perpendicular slopes $a \cdot a'' = -1$',
      'មេគុណប្រាប់ទិស a (Slope), កូអរដោនេដើម b, បន្ទាត់ស្របគ្នា និងបន្ទាត់កាត់កែងក្នុងប្លង់កូអរដោនេ',
      $BODY_EN$## Linear Functions & Lines
$y = ax + b$. Parallel lines share identical slopes: $a_1 = a_2$. Perpendicular lines satisfy $a_1 \cdot a_2 = -1$.$BODY_EN$,
      $BODY_KM$## ១. សមីការបន្ទាត់ទម្រង់ទូទៅ
$$y = ax + b$$
- $a$ ៖ **មេគុណប្រាប់ទិស (Slope)** បញ្ជាក់ពីកម្រិតជម្រាលនៃបន្ទាត់
  $$a = \frac{y_2 - y_1}{x_2 - x_1}$$
- $b$ ៖ **អរដោនេដើម ($y$-intercept)** ជាចំណុចដែលបន្ទាត់កាត់អ័ក្ស $(y'Oy)$ ត្រង់ $(0, b)$

## ២. ទីតាំងធៀបនៃបន្ទាត់ពីរ
ចំពោះបន្ទាត់ $(d_1): y = a_1x + b_1$ និង $(d_2): y = a_2x + b_2$៖
- $(d_1) \parallel (d_2) \iff a_1 = a_2$ (មេគុណប្រាប់ទិសស្មើគ្នា)
- $(d_1) \perp (d_2) \iff a_1 \cdot a_2 = -1$ (ផលគុណមេគុណប្រាប់ទិសស្មើ $-1$)$BODY_KM$,
      22,
      40,
      true,
      8
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cyclic Quadrilaterals & Tangent Angles (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Cyclic Quadrilaterals & Tangent Angles',
      'ចតុកោណចារឹកក្នុងរង្វង់ និងមុំផ្គុំដោយបន្ទាត់ប៉ះ',
      'Opposite angle summation to 180° in cyclic quadrilaterals, tangent-chord angle theorems, and secant lines',
      'លក្ខណៈចតុកោណចារឹកក្នុងរង្វង់ មុំឈមបន្ថែមគ្នា ១៨០° និងមុំផ្គុំដោយបន្ទាត់ប៉ះនិងអង្កត់ធ្នូ',
      $BODY_EN$## Cyclic Quadrilaterals
Opposite angles in any cyclic quadrilateral are supplementary: $\angle A + \angle C = 180^\circ$.$BODY_EN$,
      $BODY_KM$## ១. ចតុកោណចារឹកក្នុងរង្វង់ (Cyclic Quadrilateral)
ចតុកោណមួយចារឹកក្នុងរង្វង់បាន លុះត្រាតែកំពូលទាំង ៤ របស់វាស្ថិតនៅលើរង្វង់តែមួយ។
- **ទ្រឹស្តីបទសំខាន់៖** ផលបូករង្វាស់មុំឈមទាំងពីរនៃចតុកោណចារឹកក្នុងរង្វង់ តែងតែស្មើនឹង $180^\circ$៖
  $$\angle A + \angle C = 180^\circ, \quad \angle B + \angle D = 180^\circ$$

## ២. មុំផ្គុំដោយបន្ទាត់ប៉ះ និងអង្កត់ធ្នូ
រង្វាស់មុំផ្គុំដោយបន្ទាត់ប៉ះ និងអង្កត់ធ្នូនៃរង្វង់មួយ ស្មើនឹងពាក់កណ្តាលនៃរង្វាស់ធ្នូដែលស្ទាក់ដោយអង្កត់ធ្នូនោះ៖
$$\alpha = \frac{1}{2} \text{ធ្នូស្ទាក់}$$$BODY_KM$,
      22,
      40,
      true,
      9
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Applied Statistics & Basic Probability (Brevet) (mathematics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Applied Statistics & Basic Probability (Brevet)',
      'ស្ថិតិអនុវត្ត និងប្រូបាប៊ីលីតេបឋម (ត្រៀមឌីប្លូម)',
      'Arithmetic mean, median, mode, and classic Laplace probability calculation P(A) = favorable / total',
      'មធ្យមនព្វន្ត មេដ្យាន ម៉ូត និងការគណនាប្រូបាប៊ីលីតេនៃព្រឹត្តិការណ៍ P(A) = n(A) / n(S)',
      $BODY_EN$## Statistics and Basic Probability
Mean $\bar{x} = \sum f_i x_i / N$. Probability of event $A$ is $P(A) = n(A)/n(S)$, with $0 \le P(A) \le 1$.$BODY_EN$,
      $BODY_KM$## ១. ប៉ារ៉ាម៉ែត្រស្ថិតិ
- **មធ្យមនព្វន្ត (Mean $\bar{x}$)៖** $\bar{x} = \frac{\sum f_i x_i}{N}$ (ផលបូកតម្លៃទាំងអស់ចែកនឹងចំនួនសរុប)
- **មេដ្យាន (Median)៖** តម្លៃទិន្នន័យដែលស្ថិតនៅចំកណ្តាលគេក្រោយពេលតម្រៀបតាមលំដាប់កើន
- **ម៉ូត (Mode)៖** តម្លៃទិន្នន័យណាដែលមានប្រេកង់ (ចំនួនកើតឡើង) ច្រើនជាងគេ

## ២. ប្រូបាប៊ីលីតេបឋម (Probability)
ប្រូបាបនៃព្រឹត្តិការណ៍ $A$ មួយ គឺ៖
$$P(A) = \frac{\text{ចំនួនករណីស្រប}}{\text{ចំនួនករណីអាច (លំហសំណាក)}} = \frac{n(A)}{n(S)}$$
- ជានិច្ចកាល៖ $0 \le P(A) \le 1$
- ព្រឹត្តិការណ៍មិនអាចកើតឡើង៖ $P = 0$; ព្រឹត្តិការណ៍ប្រាកដ៖ $P = 1$។$BODY_KM$,
      20,
      40,
      true,
      10
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Ohm's Law & Circuit Analysis (Diploma Exam) (physics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Ohm''s Law & Circuit Analysis (Diploma Exam)',
      'ច្បាប់អូម និងសៀគ្វីអគ្គិសនី (U = R · I ត្រៀមឌីប្លូម)',
      'Ohm''s law U = R·I, resistance measurement in Ohms (Ω), Volts (V), Amperes (A), and I-V characteristics',
      'ទំនាក់ទំនង U = R · I ខ្នាតអូម (Ω) វ៉ុល (V) អំពែ (A) និងបន្ទាត់ចរិតលក្ខណៈ',
      $BODY_EN$## Ohm's Law
$U = R \cdot I$. Voltage equals resistance multiplied by electric current.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់អូម (Ohm's Law)
តង់ស្យុងអគ្គិសនីសងខាងរេស៊ីស្ត័រមួយ សមាមាត្រនឹងអាំងតង់ស៊ីតេចរន្តដែលឆ្លងកាត់វា៖
$$U = R \cdot I$$
- $U$ ៖ ផលសងប៉ូតង់ស្យែល ឬតង់ស្យុង (វ៉ុល $V$)
- $R$ ៖ រេស៊ីស្តង់អគ្គិសនី (អូម $\Omega$)
- $I$ ៖ អាំងតង់ស៊ីតេចរន្ត (អំពែ $A$)

## ២. រូបមន្តទាញរក $I$ និង $R$
$$I = \frac{U}{R}, \quad R = \frac{U}{I}$$$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Series & Parallel Resistor Networks (physics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Series & Parallel Resistor Networks',
      'ការតរេស៊ីស្ត័រជាស៊េរី និងជាខ្នែង',
      'Equivalent resistance formulas: series R_eq = R1 + R2 and parallel 1/R_eq = 1/R1 + 1/R2',
      'រេស៊ីស្តង់សមមូល R_eq = R₁ + R₂ (ស៊េរី) និង 1/R_eq = 1/R₁ + 1/R₂ (ខ្នែង)',
      $BODY_EN$## Resistor Networks
Series: $R_{\text{eq}} = R_1 + R_2$. Parallel: $R_{\text{eq}} = \frac{R_1 R_2}{R_1 + R_2}$.$BODY_EN$,
      $BODY_KM$## ១. ការតជាស៊េរី (Series)
ចរន្តឆ្លងកាត់ស្មើគ្នា ($I = I_1 = I_2$) តង់ស្យុងបូកបញ្ចូលគ្នា ($U = U_1 + U_2$)៖
$$R_{\text{eq}} = R_1 + R_2 + ... + R_n$$

## ២. ការតជាខ្នែង (Parallel)
តង់ស្យុងស្មើគ្នា ($U = U_1 = U_2$) ចរន្តបូកបញ្ចូលគ្នា ($I = I_1 + I_2$)៖
$$\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2}$$
ចំពោះរេស៊ីស្ត័រពីរតជាខ្នែង៖
$$R_{\text{eq}} = \frac{R_1 \cdot R_2}{R_1 + R_2}$$$BODY_KM$,
      22,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Electrical Power & Energy Consumption (physics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Electrical Power & Energy Consumption',
      'ថាមពលអគ្គិសនី និងអានុភាព (P = U · I, W = P · t)',
      'Joule''s heating law W = R·I²·t, electrical power P = U·I, and kilowatt-hour utility metering',
      'រូបមន្ត P = U · I ច្បាប់ស៊ូល W = R · I² · t និងការគណនាថ្លៃកុងទ័រភ្លើង (kWh)',
      $BODY_EN$## Electric Energy & Power
$P = U \cdot I$. Energy $W = P \cdot t = R I^2 t$. Electricity meters measure in kilowatt-hours ($kWh$).$BODY_EN$,
      $BODY_KM$## ១. អានុភាពអគ្គិសនី (Electric Power)
$$P = U \cdot I = R \cdot I^2 = \frac{U^2}{R}$$
- $P$ ៖ អានុភាព (វ៉ាត់ $W$)

## ២. ថាមពលអគ្គិសនី (Electric Energy)
$$W = P \cdot t = U \cdot I \cdot t = R \cdot I^2 \cdot t$$
- $W$ ៖ ថាមពល (ស៊ូល $J$ ឬ គីឡូវ៉ាត់ម៉ោង $kWh$)
- $1\text{ kWh} = 1000\text{ W} \times 3600\text{ s} = 3.6 \times 10^6\text{ J}$$BODY_KM$,
      22,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Magnetic Fields & Electromagnetism (physics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Magnetic Fields & Electromagnetism',
      'ដែនម៉ាញេទិច និងអេឡិចត្រូម៉ាញេទិច',
      'Magnetic field lines from North to South, Oersted''s discovery, and solenoids with iron core',
      'ដែនម៉ាញេទិចនៃមេដែក ខ្សែដែន និងដែនម៉ាញេទិចបង្កើតដោយចរន្តអគ្គិសនី (សូលេណូអ៊ីត)',
      $BODY_EN$## Electromagnetism
Electric currents produce magnetic fields. Solenoids with soft iron cores form powerful electromagnets.$BODY_EN$,
      $BODY_KM$## ១. មេដែក និងខ្សែដែនម៉ាញេទិច
មេដែកមានប៉ូលពីរគឺ **ប៉ូលជើង ($N$)** និង **ប៉ូលត្បូង ($S$)**។ ខ្សែដែនម៉ាញេទិចតែងតែចេញពីប៉ូលជើង ចូលទៅប៉ូលត្បូង។

## ២. អេឡិចត្រូម៉ាញេទិច (Electromagnets)
នៅពេលចរន្តអគ្គិសនីឆ្លងកាត់ខ្សែលួសរុំជារង្វង់ (សូលេណូអ៊ីត) វាបង្កើតបានជាដែនម៉ាញេទិចដូចមេដែកធម្មជាតិ។ ការដាក់ស្នូលដែកទន់ខាងក្នុង ធ្វើឱ្យកម្លាំងទាញកើនឡើងរាប់ពាន់ដង (ប្រើក្នុងម៉ូទ័រ និងកណ្តឹងអគ្គិសនី)។$BODY_KM$,
      20,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Light Optics: Reflection & Refraction (physics - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Light Optics: Reflection & Refraction',
      'ច្បាប់ឆ្លុះ និងងាកពន្លឺ',
      'Law of reflection i = r, Snell''s law of refraction n1 sin i1 = n2 sin i2, and critical angle',
      'ច្បាប់ដេកាត មុំឆ្លុះស្មើនឹងមុំធ្លាក់ i = r សន្ទស្សន៍ចំណាំងបែរ n₁ sin i₁ = n₂ sin i₂',
      $BODY_EN$## Optics
Law of reflection: angle of incidence equals angle of reflection ($i = r$). Snell's law: $n_1 \sin i_1 = n_2 \sin i_2$.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់ឆ្លុះពន្លឺ (Reflection)
មុំឆ្លុះ ($r$) តែងតែស្មើនឹងមុំធ្លាក់ ($i$)៖
$$i = r$$

## ២. ច្បាប់ងាកពន្លឺ (ច្បាប់ដេកាត — Snell-Descartes Law)
នៅពេលពន្លឺឆ្លងកាត់ពីមជ្ឈដ្ឋានមួយទៅមជ្ឈដ្ឋានមួយទៀតដែលមានដង់ស៊ីតេអុបទិកខុសគ្នា កាំរស្មីនឹងងាកទិស៖
$$n_1 \sin(i_1) = n_2 \sin(i_2)$$$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Acids, Bases & The pH Scale (chemistry - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Acids, Bases & The pH Scale',
      'អាស៊ីត បាស និងកម្រិត pH ពី ០ ដល់ ១៤',
      'Hydronium H+ and hydroxide OH- ions, pH = -log[H+], neutral water at 7, and universal indicators',
      'អ៊ីយ៉ុង H⁺ និង OH⁻ មាត្រដ្ឋាន pH អព្យាក្រឹត្យ pH = 7 អាស៊ីត pH < 7 បាស pH > 7',
      $BODY_EN$## pH Scale
pH < 7 is acidic ($H^+$), pH = 7 is neutral, and pH > 7 is basic ($OH^-$). Logarithmic concentration scale.$BODY_EN$,
      $BODY_KM$## ១. មាត្រដ្ឋាន pH (pH Scale 0–14)
- **$0 \leq \text{pH} < 7$ ៖ សូលុយស្យុងអាស៊ីត** (សម្បូរអ៊ីយ៉ុង $H^+$)
- **$\text{pH} = 7$ ៖ សូលុយស្យុងអព្យាក្រឹត** (ដូចជាទឹកសុទ្ធ)
- **$7 < \text{pH} \leq 14$ ៖ សូលុយស្យុងបាស** (សម្បូរអ៊ីយ៉ុង $OH^-$)

> **ចំណាំ៖** pH កាន់តែតូច អាស៊ីតកាន់តែខ្លាំង។ pH កាន់តែធំ បាសកាន់តែខ្លាំង!$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: The Mole Concept & Molar Concentrations (chemistry - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'The Mole Concept & Molar Concentrations',
      'បរិមាណសារធាតុ ម៉ូល និងកំហាប់សូលុយស្យុង',
      'Avogadro''s number 6.022x10²³, molar mass formulas n = m/M, gas molar volume 22.4 L, molarity C = n/V',
      'ចំនួនអាវ៉ូហ្គាដ្រូ NA = 6.022 · 10²³ រូបមន្ត n = m / M, n = V / 22.4 និងកំហាប់ C = n / V',
      $BODY_EN$## Mole Calculations
$n = m/M$, $n = V/22.4$ (at STP), and molar concentration $C = n/V$ ($mol/L$).$BODY_EN$,
      $BODY_KM$## ១. ម៉ូល (Mole) និងចំនួនអាវ៉ូហ្គាដ្រូ
១ ម៉ូល គឺជាបរិមាណសារធាតុដែលផ្ទុក $6.022 \times 10^{23}$ ភាគល្អិត (អាតូម ឬម៉ូលេគុល)។

## ២. រូបមន្តគណនាម៉ូល
1. តាមម៉ាស៖
   $$n = \frac{m}{M}$$
   ($m$ គិតជា $g$, $M$ គិតជា $g/mol$)
2. តាមមាឌឧស្ម័ននៅលក្ខខណ្ឌស្តង់ដារ (STP)៖
   $$n = \frac{V}{22.4\text{ L}}$$
3. កំហាប់ជាម៉ូល (Molarity $C$)៖
   $$C = \frac{n}{V} \quad (mol/L \text{ ឬ } M)$$$BODY_KM$,
      25,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Metal Activity & Reactivity Series (chemistry - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Metal Activity & Reactivity Series',
      'លោហៈសកម្ម និងជួរប្រតិកម្មគីមី',
      'Electrochemical metal reactivity series, single displacement reactions with water and acids',
      'ជួរសកម្មភាពលោហៈ K > Na > Ca > Mg > Al > Zn > Fe > H > Cu > Ag > Au',
      $BODY_EN$## Reactivity Series
More reactive metals displace less reactive ones from salt solutions: $Fe + CuSO_4 \rightarrow FeSO_4 + Cu$.$BODY_EN$,
      $BODY_KM$## ១. ជួរសកម្មភាពលោហៈ (Reactivity Series)
$$\text{K} > \text{Na} > \text{Ca} > \text{Mg} > \text{Al} > \text{Zn} > \text{Fe} > \text{Pb} > (\text{H}) > \text{Cu} > \text{Ag} > \text{Au}$$

## ២. ច្បាប់ប្រតិកម្មជំនួស
លោហៈណាដែលនៅខាងឆ្វេង (សកម្មជាង) អាចរុញលោហៈដែលនៅខាងស្តាំ (ខ្សោយជាង) ចេញពីសូលុយស្យុងអំបិលរបស់វាបាន៖
$$\text{Fe} + \text{CuSO}_4 \rightarrow \text{FeSO}_4 + \text{Cu} \downarrow$$$BODY_KM$,
      20,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Salts & Acid-Base Neutralization (chemistry - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Salts & Acid-Base Neutralization',
      'អំបិល និងប្រតិកម្មបន្សាបអាស៊ីត-បាស',
      'Classic neutralization acid + base → salt + water, precipitate formation rules',
      'ប្រតិកម្ម HCl + NaOH → NaCl + H₂O ការបង្កើតអំបិល និងការកកើតកករ',
      $BODY_EN$## Neutralization
$Acid + Base \rightarrow Salt + Water$. $H^+ + OH^- \rightarrow H_2O$.$BODY_EN$,
      $BODY_KM$## ១. ប្រតិកម្មបន្សាប (Neutralization)
$$\text{អាស៊ីត} + \text{បាស} \rightarrow \text{អំបិល} + \text{ទឹក}$$

> **ឧទាហរណ៍៖**
> $$\text{HCl} + \text{NaOH} \rightarrow \text{NaCl} + \text{H}_2\text{O}$$
> អ៊ីយ៉ុង $H^+$ ពីអាស៊ីត បន្សាបជាមួយអ៊ីយ៉ុង $OH^-$ ពីបាស បង្កើតជាម៉ូលេគុលទឹក $H_2O$។$BODY_KM$,
      20,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Oxidation & Reduction Fundamentals (chemistry - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Oxidation & Reduction Fundamentals',
      'ប្រតិកម្មអុកស៊ីតកម្ម និងរេដុកកម្ម',
      'Electron transfer definitions (OIL RIG: Oxidation Is Loss, Reduction Is Gain of electrons)',
      'ការបាត់បង់ និងការទទួលអេឡិចត្រុង ភ្នាក់ងារអុកស៊ីតករ និងភ្នាក់ងាររេដុករ',
      $BODY_EN$## Redox
Oxidation is electron loss; Reduction is electron gain. They always occur simultaneously.$BODY_EN$,
      $BODY_KM$## ១. និយមន័យអុកស៊ីត-រេដុក
- **អុកស៊ីតកម្ម (Oxidation)៖** គឺជាដំណើរការ **បាត់បង់អេឡិចត្រុង ($e^-$)**
- **រេដុកកម្ម (Reduction)៖** គឺជាដំណើរការ **ចាប់យកអេឡិចត្រុង ($e^-$)**

> **គន្លឹះចងចាំ៖**
> «អុកស៊ីតកម្ម **បាត់** — រេដុកកម្ម **ចាប់**»$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Human Nervous System & Brain Anatomy (biology - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Human Nervous System & Brain Anatomy',
      'ប្រព័ន្ធប្រសាទ ណឺរ៉ូន និងខួរក្បាល',
      'Central nervous system, neuron axons and dendrites, neurotransmitter synapses, and reflex arcs',
      'ណឺរ៉ូន ស៊ីណាប់ ចលនារេផ្លិច និងមជ្ឈមណ្ឌលបញ្ជាខួរក្បាល និងខួរឆ្អឹងខ្នង',
      $BODY_EN$## Nervous System
Neurons transmit electrical action potentials across chemical synapses. Reflex arcs bypass brain thinking.$BODY_EN$,
      $BODY_KM$## ១. ណឺរ៉ូន (Neuron)
ណឺរ៉ូន គឺជាឯកតាមូលដ្ឋាននៃប្រព័ន្ធប្រសាទ ផ្សំឡើងពី៖
- តួកោសិកា (Cell Body)
- ដែនឌ្រីត (Dendrites ទទួលព័ត៌មាន)
- អាក់សូន (Axon បញ្ជូនព័ត៌មានទៅមុខ)

## ២. ចលនារេផ្លិច (Reflex Arc)
គឺជាចលនាឆ្លើយតបបន្ទាន់ដោយស្វ័យប្រវត្តិដោយមិនចាំបាច់ឆ្លងកាត់ការគិតរបស់ខួរក្បាល (ខួរឆ្អឹងខ្នងជាអ្នកបញ្ជាផ្ទាល់) ដូចជា ការដកដៃចេញភ្លាមៗពេលប៉ះរបស់ក្តៅ។$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Endocrine System & Hormonal Balance (biology - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Endocrine System & Hormonal Balance',
      'ប្រព័ន្ធអង់ដូគ្រីន និងអ័រម៉ូន',
      'Pituitary master gland, thyroid, pancreas insulin and glucagon blood glucose regulation',
      'ក្រពេញអង់ដូគ្រីន អ៊ីប៉ូភីស ទីរ៉ូអ៊ីត អាំងស៊ុយលីន និងការគ្រប់គ្រងកម្រិតជាតិស្ករក្នុងឈាម',
      $BODY_EN$## Endocrine System
Hormones are chemical messengers. The pancreas balances blood sugar via insulin (lowers glucose) and glucagon (raises glucose).$BODY_EN$,
      $BODY_KM$## ១. អ័រម៉ូន (Hormones)
អ័រម៉ូនជាសារធាតុគីមីបញ្ចេញដោយក្រពេញគ្មានបំពង់ (Endocrine Glands) ចូលក្នុងចរន្តឈាមដោយផ្ទាល់។

## ២. ការគ្រប់គ្រងជាតិស្ករដោយលំពែង
- **អាំងស៊ុយលីន (Insulin)៖** បញ្ចុះជាតិស្ករក្នុងឈាម (ពេលញ៉ាំបាយឆ្អែត)
- **គ្លូកាហ្គុង (Glucagon)៖** បង្កើនជាតិស្ករក្នុងឈាម (ពេលឃ្លាន)$BODY_KM$,
      20,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: The Five Sensory Organs (biology - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'The Five Sensory Organs',
      'សរីរាង្គវិញ្ញាណទាំង ៥',
      'Photoreceptors in retina, cochlear auditory hair cells, olfactory receptors, taste buds, and dermis',
      'ភ្នែក (គំហើញ) ត្រចៀក (សោតវិញ្ញាណ) ច្រមុះ អណ្តាត និងស្បែក',
      $BODY_EN$## Sensory Organs
The eye focuses light onto retinal photoreceptors, transmitting impulses via the optic nerve to the visual cortex.$BODY_EN$,
      $BODY_KM$## ១. ភ្នែកមនុស្ស (Vision)
ពន្លឺឆ្លងកាត់កញ្ចក់ភ្នែក តាមប្រស្រីភ្នែក និងឡង់ទី ទៅផ្តុំរូបភាពបញ្ច្រាសលើ **រ៉េទីន (Retina)** ដែលផ្ទុកកោសិកាទទួលពន្លឺ រួចបញ្ជូនទៅខួរក្បាលតាមសរសៃប្រសាទអុបទិក។$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Genetics, Chromosomes & Traits (biology - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Genetics, Chromosomes & Traits',
      'ហ្សែន ក្រូម៉ូសូម និងការបញ្ជូនលក្ខណៈតំណពូជ',
      'Human 46 chromosomes (23 pairs), dominant vs recessive alleles, genotype and phenotype expressions',
      'ក្រូម៉ូសូមមនុស្ស ៤៦ ដើម (២៣ គូ) អាឡែល ហ្សែនត្រួត និងហ្សែនបន្ទាប់',
      $BODY_EN$## Genetics
Humans have 46 chromosomes (23 pairs). Chromosome pair 23 determines sex ($XX$ female, $XY$ male).$BODY_EN$,
      $BODY_KM$## ១. ក្រូម៉ូសូមមនុស្ស (Human Chromosomes)
កោសិកាមនុស្សធម្មតាមាន **៤៦ ក្រូម៉ូសូម (២៣ គូ)**៖
- គូទី ១ ដល់ ២២ ៖ ក្រូម៉ូសូមធម្មតា (Autosomes)
- គូទី ២៣ ៖ ក្រូម៉ូសូមភេទ ($XX$ ចំពោះស្រី, $XY$ ចំពោះប្រុស)

## ២. ហ្សែនត្រួត និងហ្សែនបន្ទាប់
- **ហ្សែនត្រួត (Dominant)៖** បង្ហាញលក្ខណៈរូបសូម្បីតែមានតែមួយ
- **ហ្សែនបន្ទាប់ (Recessive)៖** បង្ហាញលក្ខណៈរូបបាន លុះត្រាតែមានទាំងពីរដូចគ្នា$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Immune Defenses & Infectious Diseases (biology - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Immune Defenses & Infectious Diseases',
      'ប្រព័ន្ធការពាររាងកាយ និងជំងឺឆ្លង',
      'Skin physical barrier, phagocytes, B-cell antibodies, pathogen antigens, and active vaccine immunity',
      'របាំងស្បែក គោលិកាស leukocyte អង់ទីគ័រ និងគោលការណ៍នៃវ៉ាក់សាំង',
      $BODY_EN$## Immune System
White blood cells produce specific antibodies against pathogens. Vaccines train memory cells for future defense.$BODY_EN$,
      $BODY_KM$## ១. របាំងការពាររាងកាយ
1. **របាំងទី១៖** ស្បែក និងទឹករំអិល
2. **របាំងទី២៖** គោលិកាឈាមស (ស៊ីមេរោគ)
3. **របាំងទី៣ (ភាពស៊ាំជាក់លាក់)៖** ផលិត **អង់ទីគ័រ (Antibodies)** ដើម្បីកម្ចាត់អង់ទីហ្សែនជាក់លាក់

## ២. វ៉ាក់សាំង (Vaccines)
វ៉ាក់សាំងផ្ទុកមេរោគដែលខ្សោយ ឬងាប់ ដើម្បីបង្រៀនប្រព័ន្ធការពាររាងកាយឱ្យបង្កើតអង់ទីគ័រទុកជាមុន។$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Earth's Atmosphere & The Ozone Shield (earth - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Earth''s Atmosphere & The Ozone Shield',
      'បរិយាកាស និងស្រទាប់អូហ្សូន',
      'Troposphere, stratosphere, ozone layer (O3) shielding against mutagenic ultraviolet (UV) radiation',
      'ស្រទាប់ត្រូប៉ូស្វ៊ែ ស្ត្រាតូស្វ៊ែ ស្រទាប់អូហ្សូន O₃ និងការទប់ស្កាត់កាំរស្មី UV',
      $BODY_EN$## Atmosphere
Troposphere contains weather systems. Stratosphere houses the ozone layer ($O_3$) filtering harmful UV rays.$BODY_EN$,
      $BODY_KM$## ១. ស្រទាប់បរិយាកាស
1. **ត្រូប៉ូស្វ៊ែ (Troposphere 0–12 km)៖** កន្លែងកើតបាតុភូតអាកាសធាតុទាំងអស់ (ពពក ភ្លៀង ផ្គរ)
2. **ស្ត្រាតូស្វ៊ែ (Stratosphere 12–50 km)៖** ផ្ទុក **ស្រទាប់អូហ្សូន ($O_3$)** ដែលស្រូបយកកាំរស្មីយូវី ($UV$) ដ៏គ្រោះថ្នាក់ពីព្រះអាទិត្យ$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodia's Mineral & Energy Resources (earth - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Cambodia''s Mineral & Energy Resources',
      'ធនធានរ៉ែ ធ្យូងថ្ម និងប្រេងកាតនៅកម្ពុជា',
      'Mondulkiri gold deposits, Kampot limestone for cement, and offshore Gulf of Thailand petroleum reserves',
      'រ៉ែមាសនៅមណ្ឌលគិរី ប៉ៃលិន ថ្មកំបោរនៅកំពត និងប្រេងកាតប្លុក A ក្នុងឈូងសមុទ្រកម្ពុជា',
      $BODY_EN$## Cambodia Resources
Limestone in Kampot supports national cement production; offshore basins hold oil and gas potential.$BODY_EN$,
      $BODY_KM$## ១. ធនធានរ៉ែសំខាន់ៗនៅកម្ពុជា
- **រ៉ែមាស៖** នៅខេត្តមណ្ឌលគិរី ក្រចេះ និងត្បូងឃ្មុំ
- **ថ្មកំបោរ៖** នៅខេត្តកំពត និងបាត់ដំបង (សម្រាប់ផលិតស៊ីម៉ង់ត៍)
- **ត្បូងថ្មមានតម្លៃ៖** នៅខេត្តប៉ៃលិន និងរតនគិរី
- **ប្រេងកាត និងឧស្ម័នធម្មជាតិ៖** ក្នុងឈូងសមុទ្រកម្ពុជា$BODY_KM$,
      18,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Floods & Droughts Management in Cambodia (earth - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Floods & Droughts Management in Cambodia',
      'បញ្ហាទឹកជំនន់ និងគ្រោះរាំងស្ងួតនៅកម្ពុជា',
      'Mekong hydrological pulse, Tonle Sap buffer mechanism, drought prevention canals, and disaster management',
      'យន្តការទឹកជំនន់ទន្លេមេគង្គ ឥទ្ធិពលបឹងទន្លេសាប និងការគ្រប់គ្រងគ្រោះមហន្តរាយ',
      $BODY_EN$## Tonle Sap Natural Buffer
During rainy monsoons, the Mekong reverses into Tonle Sap Lake, mitigating flooding and later feeding dry-season agriculture.$BODY_EN$,
      $BODY_KM$## ១. បឹងទន្លេសាបជាអាងស្តុកទឹកធម្មជាតិ
នៅរដូវវស្សា ទឹកទន្លេមេគង្គហូរច្រាសចូលបឹងទន្លេសាប ជួយកាត់បន្ថយទឹកជំនន់នៅតំបន់ដីសណ្តខាងក្រោម។ នៅរដូវប្រាំង ទឹកបឹងទន្លេសាបហូរត្រឡប់ចូលទន្លេមេគង្គវិញ ជួយកាត់បន្ថយគ្រោះរាំងស្ងួត។$BODY_KM$,
      18,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Solid Waste Management & Plastic Pollution (earth - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Solid Waste Management & Plastic Pollution',
      'ការគ្រប់គ្រងសំណល់រឹង និងការបំពុលបរិស្ថាន',
      'Plastic breakdown hazards, microplastics, 3R circular economy, and community ecological stewardship',
      'យុទ្ធនាការកាត់បន្ថយប្លាស្ទិក គោលការណ៍ 3R (Reduce, Reuse, Recycle) និងជីវចម្រុះ',
      $BODY_EN$## Waste Management
The 3R environmental framework: Reduce single-use plastics, Reuse sturdy containers, and Recycle recyclable scrap.$BODY_EN$,
      $BODY_KM$## ១. គោលការណ៍ 3R
- **Reduce (កាត់បន្ថយ)៖** កាត់បន្ថយការប្រើប្រាស់ថង់ប្លាស្ទិកប្រើម្តងចោល
- **Reuse (ប្រើឡើងវិញ)៖** ប្រើប្រាស់ដបទឹក ឬប្រអប់ឡើងវិញ
- **Recycle (កែច្នៃ)៖** កែច្នៃសំណល់ដែក ក្រដាស កញ្ចក់ ទៅជាវត្ថុប្រើប្រាស់ថ្មី$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Solar Radiation & Earth Energy Balance (earth - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Solar Radiation & Earth Energy Balance',
      'ថាមពលព្រះអាទិត្យ និងតុល្យភាពថាមពលផែនដី',
      'Incoming shortwave solar irradiance, terrestrial longwave re-radiation, planetary albedo, and energy balance',
      'ថាមពលពន្លឺព្រះអាទិត្យ អាល់បេដូ (Albedo) និងការស្រូប-បញ្ចេញថាមពលកម្តៅ',
      $BODY_EN$## Earth Energy Balance
Equilibrium between incoming solar shortwave and outgoing infrared radiation keeps global mean temperatures stable.$BODY_EN$,
      $BODY_KM$## ១. តុល្យភាពថាមពលផែនដី
ថាមពលដែលផែនដីទទួលបានពីព្រះអាទិត្យ ត្រូវតែស្មើនឹងថាមពលដែលផែនដីបញ្ចេញត្រឡប់ទៅក្នុងលំហវិញ ដើម្បីរក្សាសីតុណ្ហភាពឱ្យនៅថេរ។
- ផ្ទៃព្រិល និងទឹកកកមាន **អាល់បេដូខ្ពស់** (ឆ្លុះពន្លឺបានរហូតដល់ $90\%$)
- ផ្ទៃសមុទ្រមាន **អាល់បេដាទាប** (ស្រូបយកកម្តៅបានច្រើន)$BODY_KM$,
      18,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Quadratic Functions & Parabola Geometry (mathematics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Quadratic Functions & Parabola Geometry',
      'អនុគមន៍ដឺក្រេទី២ ប៉ារ៉ាបូល និងអថេរភាព',
      'Parabola vertex form, axis of symmetry x = -b/2a, concavity, and quadratic variation tables',
      'ទម្រង់ y = ax² + bx + c កំពូលប៉ារ៉ាបូល (-b/2a, -Δ/4a) អ័ក្សឆ្លុះ និងតារាងអថេរភាព',
      $BODY_EN$## Quadratic Functions
Graph is a parabola with vertex at $x = -b/(2a)$. Concave up if $a > 0$, concave down if $a < 0$.$BODY_EN$,
      $BODY_KM$## ១. ទម្រង់ទូទៅនៃអនុគមន៍ដឺក្រេទី២
$$f(x) = ax^2 + bx + c \quad (a \neq 0)$$
ក្រាហ្វនៃអនុគមន៍ដឺក្រេទី២ គឺជាខ្សែ **ប៉ារ៉ាបូល (Parabola)**។

## ២. កំពូល និងអ័ក្សឆ្លុះ
- **កំពូល $S$ ៖**
  $$S\left(-\frac{b}{2a}, -\frac{\Delta}{4a}\right) \quad \text{ដែល } \Delta = b^2 - 4ac$$
- **អ័ក្សឆ្លុះ ៖** បន្ទាត់ឈរ $x = -\frac{b}{2a}$
- **ទិសដៅភាពកោង ៖**
  - បើ $a > 0$ ៖ ប៉ារ៉ាបូលបែរភាពកោងឡើងលើ (មានតម្លៃអប្បបរមា)
  - បើ $a < 0$ ៖ ប៉ារ៉ាបូលបែរភាពកោងចុះក្រោម (មានតម្លៃអតិបរមា)$BODY_KM$,
      24,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Vectors in the Plane & Dot Product (mathematics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Vectors in the Plane & Dot Product',
      'វ៉ិចទ័រក្នុងប្លង់ និងផលគុណស្កាលែ',
      'Vector magnitude, orthogonal dot product u · v = 0, and analytical formula x x'' + y y''',
      'កូអរដោនេវ៉ិចទ័រ ផលបូកវ៉ិចទ័រ ប្រវែងវ៉ិចទ័រ និងផលគុណស្កាលែ u · v = |u||v|cos θ',
      $BODY_EN$## Vectors & Dot Product
$\vec{u} \cdot \vec{v} = x x' + y y'$. Two nonzero vectors are orthogonal perpendicular if and only if $\vec{u} \cdot \vec{v} = 0$.$BODY_EN$,
      $BODY_KM$## ១. ផលគុណស្កាលែ (Dot Product)
ផលគុណស្កាលែនៃវ៉ិចទ័រពីរ $\vec{u}$ និង $\vec{v}$ កំណត់ដោយ៖
$$\vec{u} \cdot \vec{v} = ||\vec{u}|| \cdot ||\vec{v}|| \cdot \cos(\theta)$$

ក្នុងប្លង់កូអរដោនេ បើ $\vec{u} = (x, y)$ និង $\vec{v} = (x', y')$ នោះ៖
$$\vec{u} \cdot \vec{v} = x \cdot x' + y \cdot y'$$

## ២. លក្ខខណ្ឌកែងគ្នានៃវ៉ិចទ័រពីរ
$$\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0 \iff x \cdot x' + y \cdot y' = 0$$$BODY_KM$,
      22,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Advanced Trigonometry & Addition Formulas (mathematics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Advanced Trigonometry & Addition Formulas',
      'ត្រីកោណមាត្រកម្រិតខ្ពស់ និងរូបមន្តបំប្លែង',
      'Angle addition theorems, double-angle formulas sin 2a = 2 sin a cos a, cos 2a = cos²a - sin²a',
      'រូបមន្តបូក cos(a ± b), sin(a ± b) និងរូបមន្តមុំទ្វេ sin 2a, cos 2a',
      $BODY_EN$## Trigonometric Formulas
Angle sum identities and double-angle expressions: $\sin 2a = 2\sin a \cos a$, $\cos 2a = \cos^2 a - \sin^2 a$.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តបូកត្រីកោណមាត្រ
$$\cos(a - b) = \cos a \cos b + \sin a \sin b$$
$$\cos(a + b) = \cos a \cos b - \sin a \sin b$$
$$\sin(a + b) = \sin a \cos b + \cos a \sin b$$
$$\sin(a - b) = \sin a \cos b - \cos a \sin b$$

## ២. រូបមន្តមុំទ្វេ (Double-Angle Formulas)
$$\sin(2a) = 2\sin a \cos a$$
$$\cos(2a) = \cos^2 a - \sin^2 a = 2\cos^2 a - 1 = 1 - 2\sin^2 a$$$BODY_KM$,
      24,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Linear Equations & Point-to-Line Distance (mathematics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Linear Equations & Point-to-Line Distance',
      'សមីការបន្ទាត់ និងចម្ងាយពីចំណុចទៅបន្ទាត់',
      'General line equation ax + by + c = 0, normal vector (a, b), and distance formula d = |ax0 + by0 + c| / √(a² + b²)',
      'សមីការទូទៅ ax + by + c = 0 វ៉ិចទ័រប្រាប់ទិស វ៉ិចទ័រណរម៉ាល់ និងរូបមន្តចម្ងាយ d',
      $BODY_EN$## Distance to Line
The perpendicular distance from point $(x_0, y_0)$ to line $ax + by + c = 0$ is $d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$.$BODY_EN$,
      $BODY_KM$## ១. សមីការទូទៅនៃបន្ទាត់
$$ax + by + c = 0$$
- វ៉ិចទ័រណរម៉ាល់ (កែងនឹងបន្ទាត់) ៖ $\vec{n} = (a, b)$
- វ៉ិចទ័រប្រាប់ទិស (ស្របនឹងបន្ទាត់) ៖ $\vec{u} = (-b, a)$

## ២. រូបមន្តចម្ងាយពីចំណុច $M_0(x_0, y_0)$ ទៅបន្ទាត់
$$d(M_0, \Delta) = \frac{|a x_0 + b y_0 + c|}{\sqrt{a^2 + b^2}}$$$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Quadratic Inequalities & Sign Analysis (mathematics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Quadratic Inequalities & Sign Analysis',
      'វិសមីការដឺក្រេទី២ និងតារាងសញ្ញា',
      'Sign table rules for quadratic trinomials: sign between roots is opposite to a, sign outside is same as a',
      'សញ្ញានៃត្រីធាដឺក្រេទី២ ax² + bx + c វិធាន «ក្នុងផ្ទុយ ក្រៅដូច» និងសំណុំដំណោះស្រាយ',
      $BODY_EN$## Quadratic Inequalities
Between the roots, the sign is opposite to $a$. Outside the roots, the sign matches $a$.$BODY_EN$,
      $BODY_KM$## ១. សញ្ញានៃត្រីធាដឺក្រេទី២
ចំពោះត្រីធា $f(x) = ax^2 + bx + c$ ($a \neq 0$) ដែលមានឬសពីរ $x_1 < x_2$ (ករណី $\Delta > 0$)៖
- **ចន្លោះខាងក្នុងឬស ($x_1 < x < x_2$) ៖** មានសញ្ញា **ផ្ទុយនឹងសញ្ញា $a$**
- **ចន្លោះខាងក្រៅឬស ($x < x_1$ ឬ $x > x_2$) ៖** មានសញ្ញា **ដូចសញ្ញា $a$**

> **គន្លឹះចងចាំ៖** «ក្នុងផ្ទុយ — ក្រៅដូច»!$BODY_KM$,
      22,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Kinematics: Uniformly Accelerated Motion (physics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Kinematics: Uniformly Accelerated Motion',
      'ស៊ីនេម៉ាទិច ៖ ចលនាត្រង់ប្រែប្រួលស្មើ (v = at + v₀)',
      'Constant acceleration a, velocity-time equation v = at + v0, and displacement x = 1/2 at² + v0t',
      'សំទុះ a = const សមីការល្បឿន v = at + v₀ និងសមីការពេល x = 1/2 at² + v₀t + x₀',
      $BODY_EN$## Accelerated Motion
$v = at + v_0$, $x = \frac{1}{2}at^2 + v_0 t$, and $v^2 - v_0^2 = 2a\Delta x$. Acceleration in $m/s^2$.$BODY_EN$,
      $BODY_KM$## ១. សំទុះ (Acceleration $a$)
សំទុះគឺជាបម្រែបម្រួលល្បឿនក្នុងមួយឯកតាពេល៖
$$a = \frac{v - v_0}{t - t_0} \quad (m/s^2)$$

## ២. សមីការនៃចលនាត្រង់ប្រែប្រួលស្មើ
1. សមីការល្បឿន៖
   $$v = at + v_0$$
2. សមីការពេលនៃចលនា (ចម្ងាយចរ)៖
   $$x = \frac{1}{2}at^2 + v_0 t + x_0$$
3. រូបមន្តឯករាជ្យពីពេល៖
   $$v^2 - v_0^2 = 2a(x - x_0)$$$BODY_KM$,
      24,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Newton's Three Laws of Motion (physics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Newton''s Three Laws of Motion',
      'ច្បាប់ញូតុនទាំង ៣ នៃចលនា',
      'First law (inertia), second law (F = ma net force dynamics), and third law (action-reaction pairs)',
      'ច្បាប់ទី១ (និចលភាព) ច្បាប់ទី២ (F = ma) និងច្បាប់ទី៣ (សកម្មភាព និងប្រតិកម្ម)',
      $BODY_EN$## Newton's Laws
1. Inertia ($sum F = 0 implies v = 	ext{const}$). 2. Momentum dynamics ($sum F = ma$). 3. Action-Reaction ($F_{AB} = -F_{BA}$).$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់ទី១ ញូតុន (ច្បាប់និចលភាព)
បើគ្មានកម្លាំងក្រៅមានអំពើលើអង្គធាតុទេ (ឬកម្លាំងផ្គួបស្មើ $0$) នោះអង្គធាតុដែលនៅស្ងៀមនឹងបន្តនៅស្ងៀម អង្គធាតុដែលកំពុងធ្វើចលនានឹងបន្តធ្វើចលនាត្រង់ស្មើ។

## ២. ច្បាប់ទី២ ញូតុន (គោលការណ៍គ្រឹះឌីណាមិច)
$$\sum \vec{F} = m \cdot \vec{a}$$
កម្លាំងផ្គួបស្មើនឹងម៉ាសគុណនឹងសំទុះ។

## ៣. ច្បាប់ទី៣ ញូតុន (សកម្មភាព និងប្រតិកម្ម)
$$\vec{F}_{A/B} = -\vec{F}_{B/A}$$
កម្លាំងសកម្មភាព និងប្រតិកម្មកើតឡើងជាគូជានិច្ច មានទិសដូចគ្នា ទិសដៅផ្ទុយគ្នា និងអាំងតង់ស៊ីតេស្មើគ្នា។$BODY_KM$,
      22,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Friction Forces & Universal Gravitation (physics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Friction Forces & Universal Gravitation',
      'កម្លាំងកកិត និងកម្លាំងទំនាញសកល',
      'Static and kinetic friction f = μN, normal force, and Newton''s Universal Gravitation law',
      'កកិតទប់ កកិតរអិល f = μ · N និងច្បាប់ទំនាញសកលរបស់ញូតុន F = G · (m₁m₂)/r²',
      $BODY_EN$## Gravitation & Friction
$f = \mu N$. Universal gravitation: $F = G \frac{m_1 m_2}{r^2}$ where $G = 6.674 \times 10^{-11}\text{ N m}^2/\text{kg}^2$.$BODY_EN$,
      $BODY_KM$## ១. កម្លាំងកកិតរអិល (Kinetic Friction)
$$f_k = \mu_k \cdot N$$
- $\mu_k$ ៖ មេគុណកកិតរអិល (គ្មានខ្នាត)
- $N$ ៖ កម្លាំងប្រតិកម្មកែង ($N$)

## ២. ច្បាប់ទំនាញសកល (Universal Gravitation)
គ្រប់អង្គធាតុទាំងអស់ក្នុងចក្រវាលទាញគ្នាទៅវិញទៅមកដោយកម្លាំងមួយសមាមាត្រនឹងផលគុណម៉ាស និងច្រាសសមាមាត្រនឹងការេនៃចម្ងាយ៖
$$F = G \cdot \frac{m_1 \cdot m_2}{r^2}$$
- $G = 6.674 \times 10^{-11}\text{ N}\cdot\text{m}^2/\text{kg}^2$ ៖ ថេរទំនាញសកល$BODY_KM$,
      22,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Kinetic & Potential Energy Conservation (physics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Kinetic & Potential Energy Conservation',
      'ការងារ ថាមពលស៊ីនេទិច និងថាមពលប៉ូតង់ស្យែល',
      'Kinetic energy Ek = 1/2 mv², gravitational potential energy Ep = mgh, and work-energy theorem',
      'ថាមពលស៊ីនេទិច Ek = 1/2 mv² ថាមពលប៉ូតង់ស្យែលទំនាញ Ep = mgh និងទ្រឹស្តីបទថាមពលស៊ីនេទិច',
      $BODY_EN$## Energy Concepts
$E_k = \frac{1}{2}mv^2$, $E_p = mgh$. Work-energy theorem: $\Delta E_k = W_{\text{net}}$.$BODY_EN$,
      $BODY_KM$## ១. ថាមពលស៊ីនេទិច (Kinetic Energy $E_k$)
$$E_k = \frac{1}{2}m v^2$$
- $m$ ៖ ម៉ាស ($kg$), $v$ ៖ ល្បឿន ($m/s$), $E_k$ ៖ គិតជាស៊ូល ($J$)

## ២. ថាមពលប៉ូតង់ស្យែលទំនាញដី ($E_p$)
$$E_p = m \cdot g \cdot h$$
- $h$ ៖ កម្ពស់ធៀបនឹងកម្រិតយោង ($m$)

## ៣. ទ្រឹស្តីបទថាមពលស៊ីនេទិច (Work-Energy Theorem)
បម្រែបម្រួលថាមពលស៊ីនេទិច ស្មើនឹងផលបូកការងារនៃកម្លាំងក្រៅទាំងអស់៖
$$\Delta E_k = E_{k2} - E_{k1} = \sum W$$$BODY_KM$,
      24,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Conservation of Mechanical Energy (physics - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Conservation of Mechanical Energy',
      'ច្បាប់រក្សាថាមពលមេកានិច (Em = Ek + Ep)',
      'Mechanical energy conservation in conservative gravitational fields: kinetic transforms to potential',
      'ថាមពលមេកានិចសរុប Em = Ek + Ep = ថេរ ក្នុងដែនទំនាញដី (គ្មានកម្លាំងកកិត)',
      $BODY_EN$## Mechanical Energy Conservation
In the absence of dissipative friction, total mechanical energy is conserved: $E_m = E_k + E_p = \text{constant}$.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់រក្សាថាមពលមេកានិច
ក្នុងប្រព័ន្ធដាច់ខាតដែលគ្មានកម្លាំងកកិត (មានតែកម្លាំងអភិរក្ស ដូចជាទំនាញដី) ថាមពលមេកានិចសរុប $E_m$ រក្សាតម្លៃថេរជានិច្ច៖
$$E_m = E_k + E_p = \frac{1}{2}mv^2 + mgh = \text{ថេរ (Constant)}$$

> **ឧទាហរណ៍៖** វត្ថុធ្លាក់ចុះមកក្រោម កម្ពស់ $h$ ថយចុះ (ប៉ូតង់ស្យែលបាត់បង់) បំប្លែងទៅជាល្បឿន $v$ កើនឡើង (ស៊ីនេទិចកើនឡើង)!$BODY_KM$,
      22,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Atomic Structure & Electron Configurations (chemistry - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Atomic Structure & Electron Configurations',
      'រចនាសម្ព័ន្ធអាតូម និងការកំណត់អេឡិចត្រុង',
      'Atomic number Z, mass number A, s/p/d/f subshells, Aufbau diagonal principle, Pauli exclusion',
      'លេខអាតូម Z ស្រទាប់ K, L, M, N អ័រប៊ីតាល់ s, p, d, f និងគោលការណ៍ Aufbau',
      $BODY_EN$## Electron Configuration
Orbitals s (2 max), p (6 max), d (10 max). Aufbau rule fills lowest energy subshells first: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^{10}$.$BODY_EN$,
      $BODY_KM$## ១. និមិត្តសញ្ញានុយក្លេអ៊ែរ
$$^A_Z X$$
- $Z$ ៖ លេខអាតូម (ចំនួនប្រូតុង = ចំនួនអេឡិចត្រុងក្នុងអាតូមណឺត)
- $A$ ៖ លេខម៉ាស ($A = Z + N$, ចំនួនប្រូតុង + ណឺត្រុង)

## ២. ការកំណត់អេឡិចត្រុងតាមស្រទាប់រង (s, p, d, f)
- ស្រទាប់រង $s$ ផ្ទុកអតិបរមា $2e^-$
- ស្រទាប់រង $p$ ផ្ទុកអតិបរមា $6e^-$
- ស្រទាប់រង $d$ ផ្ទុកអតិបរមា $10e^-$
លំដាប់ថាមពល Aufbau៖ $1s^2 \rightarrow 2s^2 \rightarrow 2p^6 \rightarrow 3s^2 \rightarrow 3p^6 \rightarrow 4s^2 \rightarrow 3d^{10}$$BODY_KM$,
      24,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Periodic Trends & Chemical Periodicity (chemistry - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Periodic Trends & Chemical Periodicity',
      'តារាងខួបនៃធាតុគីមី និងច្បាប់ Mendeleev',
      'Periods, alkali/halogen groups, electronegativity trends, ionization energy, and atomic radii',
      'ខួប (Periods) ក្រុម (Groups) អេឡិចត្រុងវ៉ាឡង់ និងបម្រែបម្រួលកាំអាតូម និងអេឡិចត្រូអវិជ្ជមាន',
      $BODY_EN$## Periodic Table
Group number corresponds to valence electrons. Electronegativity increases across a period and decreases down a group.$BODY_EN$,
      $BODY_KM$## ១. រចនាសម្ព័ន្ធតារាងខួប
- **ខួប (Periods) ទាំង ៧៖** តំណាងឱ្យចំនួនស្រទាប់អេឡិចត្រុង
- **ក្រុម (Groups) ទាំង ១៨៖** ធាតុក្នុងក្រុមតែមួយមានចំនួន **អេឡិចត្រុងវ៉ាឡង់ស្មើគ្នា** នាំឱ្យមានលក្ខណៈគីមីដូចគ្នា

## ២. ច្បាប់បម្រែបម្រួល (Trends)
- **កាំអាតូម (Atomic Radius) ៖** កើនឡើងពីលើចុះក្រោមក្នុងក្រុម និងថយចុះពីឆ្វេងទៅស្តាំក្នុងខួប
- **អេឡិចត្រូអវិជ្ជមាន (Electronegativity) ៖** កើនឡើងពីឆ្វេងទៅស្តាំក្នុងខួប (ធាតុ $F$ ខ្លាំងជាងគេ)$BODY_KM$,
      22,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Chemical Bonding: Ionic vs Covalent (chemistry - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Chemical Bonding: Ionic vs Covalent',
      'សម្ព័ន្ធគីមី ៖ សម្ព័ន្ធអ៊ីយ៉ុង និងកូវ៉ាឡង់',
      'Octet rule, ionic crystal lattices via electron transfer, and polar/nonpolar covalent molecular sharing',
      'ការផ្ទេរអេឡិចត្រុង (សម្ព័ន្ធអ៊ីយ៉ុង) និងការចូលរួមអេឡិចត្រុងរួម (សម្ព័ន្ធកូវ៉ាឡង់)',
      $BODY_EN$## Chemical Bonds
Ionic bonds transfer electrons between metals and nonmetals. Covalent bonds share electron pairs between nonmetals.$BODY_EN$,
      $BODY_KM$## ១. សម្ព័ន្ធអ៊ីយ៉ុង (Ionic Bond)
កើតឡើងរវាង **លោហៈ** និង **អលោហៈ** ដោយសារការផ្ទេរអេឡិចត្រុង បង្កើតជាកាចុង ($+$) និងអានីយ៉ុង ($-$) ទាញគ្នាដោយកម្លាំងអេឡិចត្រូស្ទាទិច (ឧ. $Na^+ + Cl^- \rightarrow NaCl$)។

## ២. សម្ព័ន្ធកូវ៉ាឡង់ (Covalent Bond)
កើតឡើងរវាង **អលោហៈ** និង **អលោហៈ** ដោយសារការ **ចូលរួមអេឡិចត្រុងរួមគ្នា** ដើម្បីសម្រេចក្បួនអoctet ៨ អេឡិចត្រុង (ឧ. $H_2O, CO_2, CH_4$)។$BODY_KM$,
      22,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Redox Reactions & Oxidation States (chemistry - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Redox Reactions & Oxidation States',
      'ប្រតិកម្មអុកស៊ីដូរេដុកកម្ម និងតុល្យភាពអេឡិចត្រុង',
      'Determining oxidation states, balancing complex redox equations via ion-electron half-reaction method',
      'ការគណនាលេខអុកស៊ីតកម្ម (N.O) វិធីតុល្យភាពកន្លះសមីការអេឡិចត្រុង',
      $BODY_EN$## Redox Balancing
Equate electrons lost in oxidation half-reaction to electrons gained in reduction half-reaction.$BODY_EN$,
      $BODY_KM$## ១. លេខអុកស៊ីតកម្ម (Oxidation State)
- អុកស៊ីសែនក្នុងសមាសធាតុភាគច្រើនមាន N.O $= -2$
- អ៊ីដ្រូសែនក្នុងសមាសធាតុភាគច្រើនមាន N.O $= +1$
- ផលបូក N.O ក្នុងម៉ូលេគុលណឺត ស្មើ $0$ជានិច្ច

## ២. តុល្យភាពប្រតិកម្មអុកស៊ីដូរេដុក
ចំនួនអេឡិចត្រុងដែលរេដុករ **បោះបង់** ត្រូវតែស្មើនឹងចំនួនអេឡិចត្រុងដែលអុកស៊ីតករ **ចាប់យក**៖
$$\text{Cu} + 2\text{Ag}^+ \rightarrow \text{Cu}^{2+} + 2\text{Ag}$$$BODY_KM$,
      24,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Molar Solutions & Dilution Dynamics (chemistry - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Molar Solutions & Dilution Dynamics',
      'សូលុយស្យុង និងកំហាប់ម៉ូល (C = n / V)',
      'Solution preparation, volumetric flasks, molarity C = n/V, and dilution equation C1·V1 = C2·V2',
      'ការរៀបចំសូលុយស្យុង ការរំលាយសារធាតុ និងរូបមន្តពង្រាវសូលុយស្យុង C₁ · V₁ = C₂ · V₂',
      $BODY_EN$## Dilution Law
$C_1 \cdot V_1 = C_2 \cdot V_2$. Adding water preserves the total dissolved moles of solute.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តពង្រាវសូលុយស្យុង (Dilution Formula)
នៅពេលបន្ថែមទឹកសុទ្ធទៅក្នុងសូលុយស្យុងដើម ចំនួនម៉ូលសារធាតុរលាយរក្សាដដែល ($n_1 = n_2$)៖
$$C_1 \cdot V_1 = C_2 \cdot V_2$$
- $C_1, C_2$ ៖ កំហាប់ម៉ូលដើម និងកំហាប់ក្រោយពង្រាវ ($mol/L$)
- $V_1, V_2$ ៖ មាឌសូលុយស្យុងដើម និងមាឌសរុបក្រោយពង្រាវ ($L$ ឬ $mL$)$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Biological Macromolecules & Nutrition (biology - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Biological Macromolecules & Nutrition',
      'ម៉ាក្រូម៉ូលេគុលជីវសាស្រ្ត ៖ កាបូអ៊ីដ្រាត ប្រូតេអ៊ីន ខ្លាញ់',
      'Carbohydrates (monosaccharides, starch), proteins (amino acids), lipids (fatty acids, glycerol), nucleic acids',
      'ម៉ូណូមែ ប៉ូលីមែ អាស៊ីតអាមីណេ អាស៊ីតខ្លាញ់ និងសារៈសំខាន់ក្នុងរាងកាយ',
      $BODY_EN$## Biological Macromolecules
Carbohydrates (energy), Proteins (structural & enzymatic), Lipids (long-term storage), Nucleic acids (genetic code).$BODY_EN$,
      $BODY_KM$## ១. ម៉ាក្រូម៉ូលេគុលទាំង ៤ នៃជីវិត
1. **កាបូអ៊ីដ្រាត (Carbohydrates)៖** ផ្តល់ថាមពលលឿន (គ្លុយកូស $C_6H_{12}O_6$, ម្សៅ)
2. **ប្រូតេអ៊ីន (Proteins)៖** បង្កើតជាសាច់ដុំ អង់ស៊ីម សរសៃសក់ (ផ្សំពីអាស៊ីតអាមីណេ ២០ ប្រភេទ)
3. **លីពីដ / ខ្លាញ់ (Lipids)៖** ស្តុកថាមពលយូរអង្វែង ផ្សំពីគ្លីសេរ៉ូល និងអាស៊ីតខ្លាញ់
4. **អាស៊ីតនុយក្លេអ៊ិច (Nucleic Acids)៖** ផ្ទុកព័ត៌មានពន្ធុ (DNA, RNA)$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Enzyme Catalysis & Substrate Specificity (biology - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Enzyme Catalysis & Substrate Specificity',
      'អង់ស៊ីម និងកាតាលីករជីវសាស្ត្រ',
      'Enzyme active site, lowering activation energy, denaturation with high temperature and pH fluctuations',
      'យន្តការសោ និងកូនសោ (Lock-and-Key) ឥទ្ធិពលសីតុណ្ហភាព និង pH លើល្បឿនអង់ស៊ីម',
      $BODY_EN$## Enzymes
Biological catalysts reduce reaction activation energy. Active sites bind substrates via lock-and-key specificity.$BODY_EN$,
      $BODY_KM$## ១. អង់ស៊ីម (Enzymes)
អង់ស៊ីមគឺជាកាតាលីករជីវសាស្ត្រធម្មជាតិ (ប្រូតេអ៊ីន) ដែលជួយពន្លឿនប្រតិកម្មគីមីក្នុងរាងកាយរាប់លានដង ដោយ **បន្ថយថាមពលសកម្មកម្ម**។

## ២. យន្តការសោ និងកូនសោ
អង់ស៊ីមនីមួយៗមាន **តំបន់សកម្ម (Active Site)** ដែលភ្ជាប់តែមួយគត់ជាមួយ **ស្រទាប់ខាងក្រោម (Substrate)** ជាក់លាក់។ កម្តៅខ្ពស់លើស $45^\circ\text{C}$ ធ្វើឱ្យអង់ស៊ីមខូចទ្រង់ទ្រាយ (Denaturation)។$BODY_KM$,
      20,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cellular Metabolism & ATP Synthesis (biology - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Cellular Metabolism & ATP Synthesis',
      'មេតាបូលីសកោសិកា ៖ ATP និងដង្ហើមកោសិកា',
      'Cellular energy currency ATP, mitochondrial aerobic respiration producing 36-38 ATP per glucose',
      'រូបិយប័ណ្ណថាមពលកោសិកា ATP ដង្ហើមត្រូវការអុកស៊ីសែន C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36 ATP',
      $BODY_EN$## Cellular Respiration
Glucose + $6O_2 \rightarrow 6CO_2 + 6H_2O$ generating 36-38 ATP molecules inside cellular mitochondria.$BODY_EN$,
      $BODY_KM$## ១. អាដេណូស៊ីនទ្រីផូស្វាត (ATP)
ATP គឺជា «រូបិយប័ណ្ណថាមពល» របស់កោសិកា។ នៅពេលចំណងផូស្វាតចុងក្រោយផ្តាច់ចេញ ($ATP \rightarrow ADP + P_i$) វាបញ្ចេញថាមពលសម្រាប់សកម្មភាពកោសិកា។

## ២. សមីការដង្ហើមកោសិកា (Cellular Respiration)
$$\text{C}_6\text{H}_{12}\text{O}_6 + 6\text{O}_2 \rightarrow 6\text{CO}_2 + 6\text{H}_2\text{O} + 36\text{ ATP}$$
ដំណើរការនេះកើតឡើងក្នុង **មីតូកុងឌ្រី (Mitochondria)**។$BODY_KM$,
      24,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cell Cycle & Mitotic Division (biology - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Cell Cycle & Mitotic Division',
      'វដ្តកោសិកា និងការបែងចែកកោសិកា មីតូស',
      'Interphase (G1, S, G2 DNA synthesis) and 4 mitotic stages: Prophase, Metaphase, Anaphase, Telophase',
      'ដំណាក់កាលអាំងទែផាស ៤ ដំណាក់កាលនៃមីតូស ៖ ប្រូផាស មេតាផាស អាណាផាស និងតេឡូផាស',
      $BODY_EN$## Mitosis
Somatic cell division ($2n \rightarrow 2n$). Four continuous phases: Prophase, Metaphase, Anaphase, and Telophase.$BODY_EN$,
      $BODY_KM$## ១. មីតូស (Mitosis)
ការបែងចែកកោសិកាលូតលាស់ ($2n \rightarrow 2n$) បង្កើតបានកោសិកាកូន ២ ដែលដូចគ្នាបេះបិទនឹងកោសិកាមេ៖
1. **ប្រូផាស (Prophase) ៖** ក្រូម៉ូសូមកកខាប់ខ្លី ភ្នាសណ្វៃយ៉ូរលាយ
2. **មេតាផាស (Metaphase) ៖** ក្រូម៉ូសូមតម្រង់ជួរត្រង់ប្លង់អេក្វាទ័រកោសិកា
3. **អាណាផាស (Anaphase) ៖** ក្រូម៉ាទីតបងប្អូនបែកចេញពីគ្នា ឆ្ពោះទៅប៉ូលសងខាង
4. **តេឡូផាស (Telophase) ៖** បង្កើតភ្នាសណ្វៃយ៉ូថ្មី និងស៊ីតូប្លាសចែកជាពីរ$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Meiosis & Gametogenesis (biology - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Meiosis & Gametogenesis',
      'មេយ៉ូស និងការបង្កើតស្ពែម៉ាតូសូអ៊ីត អូវុល',
      'Reduction division from 2n diploid to n haploid gametes, homologous crossing-over, and genetic diversity',
      'ការបែងចែកកាត់បន្ថយក្រូម៉ូសូម 2n → n ការឆ្លាស់ប្តូរហ្សែន Crossing-over និងបំរែបំរួលពន្ធុ',
      $BODY_EN$## Meiosis
Produces 4 haploid gametes ($n$) from 1 diploid cell ($2n$). Crossing-over in prophase I reshuffles genetic variation.$BODY_EN$,
      $BODY_KM$## ១. មេយ៉ូស (Meiosis)
គឺជាការបែងចែកកោសិកាភេទដើម្បីបង្កើត **ហ្គាម៉ែត ($n$)** ពីកោសិកាមេ ($2n$)។ មានពីរដំណាក់កាលជាប់គ្នាគឺ មេយ៉ូស I និង មេយ៉ូស II។
- កោសិកាមេ $1$ ($2n$) បង្កើតបានកោសិកាកូន $4$ ($n$)
- ក្នុងប្រូផាស I មានបាតុភូត **ក្រូស៊ីងអូវ័រ (Crossing-over)** ផ្លាស់ប្តូរផ្នែកក្រូម៉ូសូម បង្កើតភាពចម្រុះនៃពន្ធុ!$BODY_KM$,
      24,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Advanced Lithospheric Plate Tectonics (earth - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Advanced Lithospheric Plate Tectonics',
      'ភូមិសាស្ត្ររូបវិទ្យា ៖ បន្ទះតិចតូនិចកម្រិតខ្ពស់',
      'Deep ocean subduction trenches, Mariana trench 11 km depth, volcanic island arcs, and slab pull',
      'តំបន់រុញច្រានក្រោម (Subduction Zones) ក្រវាត់ភ្លើងប៉ាស៊ីហ្វិក និងរណ្តៅសមុទ្រម៉ារីយ៉ាណា',
      $BODY_EN$## Subduction Tectonics
Dense oceanic crust sinks beneath lighter continental crust, forging volcanic mountain belts and deep oceanic trenches.$BODY_EN$,
      $BODY_KM$## ១. តំបន់រុញច្រានចូលក្រោម (Subduction Zone)
នៅពេលបន្ទះមហាសមុទ្រ (ដង់ស៊ីតេធ្ងន់) បុកជាមួយបន្ទះទ្វីប (ស្រាល) បន្ទះមហាសមុទ្រនឹង **រអិលចូលក្រោម** អាវផែនដី រលាយជាម៉ាក់ម៉ា បង្កើតបានជា៖
- រណ្តៅសមុទ្រជ្រៅបំផុត (ដូចជា **រណ្តៅសមុទ្រម៉ារីយ៉ាណា** ជម្រៅជិត $11\text{ km}$)
- ជួរភ្នំភ្លើងសកម្ម និងការរញ្ជួយដីកម្រិតធ្ងន់$BODY_KM$,
      20,
      35,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Geological Structures: Folds & Faults (earth - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Geological Structures: Folds & Faults',
      'រចនាសម្ព័ន្ធភូគព្ភសាស្ត្រ ៖ ផ្នត់ និងកំហុស',
      'Anticline arches, syncline troughs, normal faults, reverse thrust faults, and strike-slip shear boundaries',
      'អង់ទីគ្លីណាល់ ស៊ីងគ្លីណាល់ កំហុសធម្មតា កំហុសច្រាស និងកំហុសរអិលកាត់',
      $BODY_EN$## Folds & Faults
Compressional stress causes anticlines (upfolds) and synclines (downfolds). Brittle failure produces fault scarps.$BODY_EN$,
      $BODY_KM$## ១. ផ្នត់ (Folds)
កើតឡើងនៅពេលស្រទាប់ថ្មរងកម្លាំងសង្កត់យឺតៗ ធ្វើឱ្យកោង៖
- **អង់ទីគ្លីណាល់ (Anticline) ៖** ផ្នត់ប៉ោងឡើងលើដូចដំបូល
- **ស៊ីងគ្លីណាល់ (Syncline) ៖** ផ្នត់ទ្រុឌចុះក្រោមដូចស្នូក

## ២. កំហុស (Faults)
នៅពេលថ្មរឹងរងកម្លាំងខ្លាំងលើសកំណត់ វានឹងប្រេះបាក់ និងរអិលផ្លាស់ទី (ឧ. កំហុស San Andreas)។$BODY_KM$,
      20,
      35,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Hydrogeology, Aquifers & Groundwater (earth - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Hydrogeology, Aquifers & Groundwater',
      'ធារាសាស្ត្រ និងជលសាស្រ្តទឹកក្រោមដី',
      'Unconfined vs confined aquifers, water table recharge, and natural arsenic contamination along Mekong',
      'ស្រទាប់ផ្ទុកទឹក អណ្តូងធម្មជាតិ កម្រិតទឹកក្រោមដី និងបញ្ហាជាតិអាសេនិចនៅកម្ពុជា',
      $BODY_EN$## Groundwater & Aquifers
Rainwater charges underground aquifers. Arsenic mitigation along Mekong alluvial floodplains protects drinking wells.$BODY_EN$,
      $BODY_KM$## ១. ស្រទាប់ផ្ទុកទឹកក្រោមដី (Aquifers)
ទឹកភ្លៀងជ្រាបចូលក្នុងដីកកកុញក្នុងស្រទាប់ដីខ្សាច់ ឬថ្មប្រហោង បង្កើតជា **ស្រទាប់ផ្ទុកទឹក (Aquifer)**។

## ២. បញ្ហាជាតិអាសេនិច (Arsenic) នៅកម្ពុជា
នៅតាមតំបន់ទំនាបមាត់ទន្លេមេគង្គ និងទន្លេបាសាក់ (កណ្តាល ព្រៃវែង) ទឹកក្រោមដីខ្លះមានផ្ទុកសារធាតុពុល **អាសេនិច ($As$)** ធម្មជាតិ ដែលទាមទារការពិនិត្យ និងចម្រោះមុនពេលបរិភោគ។$BODY_KM$,
      20,
      35,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodia Monsoon Climatology (earth - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Cambodia Monsoon Climatology',
      'ប្រព័ន្ធអាកាសធាតុកម្ពុជា ៖ ខ្យល់មូសុងនិរតី និងឦសាន',
      'Intertropical Convergence Zone (ITCZ), Southwest wet monsoon, Northeast dry monsoon, and paddy rice agriculture',
      'សម្ពាធទាបឥណ្ឌា សម្ពាធខ្ពស់ស៊ីបេរី របបទឹកភ្លៀង និងឥទ្ធិពលលើកសិកម្មស្រូវ',
      $BODY_EN$## Monsoonal Dynamics
Southwest monsoons deliver over 80% of Cambodia's annual precipitation, driving the national rice production cycle.$BODY_EN$,
      $BODY_KM$## ១. យន្តការខ្យល់មូសុងកម្ពុជា
- **ខ្យល់មូសុងនិរតី (Southwest Monsoon)៖** បក់ពីមហាសមុទ្រឥណ្ឌា នាំខ្យល់ក្តៅសើម បង្កើតរដូវវស្សា ផ្តល់ទឹកភ្លៀងជាង $80\%$ នៃបរិមាណទឹកភ្លៀងប្រចាំឆ្នាំ។
- **ខ្យល់មូសុងឦសាន (Northeast Monsoon)៖** បក់ពីទ្វីបអាស៊ីខាងជើង (ស៊ីបេរី) នាំមកនូវខ្យល់ស្ងួត និងត្រជាក់ បង្កើតរដូវប្រាំង។$BODY_KM$,
      18,
      35,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Geologic Time Scale & Index Fossils (earth - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Geologic Time Scale & Index Fossils',
      'ភូគព្ភប្រវត្តិ និងផូស៊ីល',
      'Paleozoic, Mesozoic, Cenozoic eras, index fossils, and carbon-14 radiometric dating principles',
      'មហាយុគ (Eras) សម័យកាល ផូស៊ីលណែនាំ និងការកំណត់អាយុកាលតាមវិទ្យុសកម្ម C-14',
      $BODY_EN$## Geologic Time
Law of superposition establishes relative chronology. Carbon-14 half-life radioactive decay determines absolute dates.$BODY_EN$,
      $BODY_KM$## ១. ផូស៊ីល (Fossils)
ផូស៊ីលគឺជាសំណល់ ឬស្លាកស្នាមនៃភាវៈរស់បុរាណដែលកប់ជាប់ក្នុងថ្មកម្ទេចកំណ។

## ២. ការកំណត់អាយុកាល
- **អាយុកាលធៀប (Relative Age) ៖** ច្បាប់ជាន់លើ (ស្រទាប់ថ្មខាងក្រោមចាស់ជាងស្រទាប់ថ្មខាងលើ)
- **អាយុកាលដាច់ខាត (Absolute Age) ៖** កំណត់ដោយការរលាយនៃអ៊ីសូតូបវិទ្យុសកម្ម ដូចជា កាបូន-១៤ ($^{14}C$) សម្រាប់សំណល់ជីវសាស្រ្ត។$BODY_KM$,
      20,
      35,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Arithmetic & Geometric Sequences (mathematics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Arithmetic & Geometric Sequences',
      'ស្វ៊ីតចំនួនពិត ៖ ស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ',
      'Arithmetic general term un = u1 + (n-1)d, geometric term un = u1·qⁿ⁻¹, and partial series sums Sn',
      'តួទី n នៃស្វ៊ីតនព្វន្ត un = u₁ + (n-1)d ស្វ៊ីតធរណីមាត្រ un = u₁ · qⁿ⁻¹ និងផលបូក n តួដំបូង Sn',
      $BODY_EN$## Sequences & Series
Arithmetic: $u_n = u_1 + (n-1)d$, sum $S_n = \frac{n(u_1+u_n)}{2}$. Geometric: $u_n = u_1 q^{n-1}$, sum $S_n = u_1\frac{1-q^n}{1-q}$.$BODY_EN$,
      $BODY_KM$## ១. ស្វ៊ីតនព្វន្ត (Arithmetic Sequence)
ស្វ៊ីតនព្វន្តមានផលសងរួម $d = u_{n+1} - u_n$ ថេរ៖
- **តួទី $n$ ៖**
  $$u_n = u_1 + (n - 1)d$$
- **ផលបូក $n$ តួដំបូង ($S_n$) ៖**
  $$S_n = \frac{n(u_1 + u_n)}{2} = \frac{n[2u_1 + (n - 1)d]}{2}$$

## ២. ស្វ៊ីតធរណីមាត្រ (Geometric Sequence)
ស្វ៊ីតធរណីមាត្រមានផលធៀបរួម $q = \frac{u_{n+1}}{u_n}$ ថេរ៖
- **តួទី $n$ ៖**
  $$u_n = u_1 \cdot q^{n-1}$$
- **ផលបូក $n$ តួដំបូង ($S_n$, $q \neq 1$) ៖**
  $$S_n = u_1 \cdot \frac{1 - q^n}{1 - q}$$$BODY_KM$,
      24,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Limits of Functions & Continuity (mathematics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Limits of Functions & Continuity',
      'លីមីតនៃអនុគមន៍ និងភាពជាប់',
      'Indeterminate forms 0/0 and ∞/∞, factoring, conjugate multiplication, and trigonometric limit lim (sin x)/x = 1',
      'រាងមិនកំណត់ 0/0, ∞/∞ វិធីបំបែកជាកត្តា គុណកន្សោមឆ្លាស់ និងលីមីតត្រីកោណមាត្រ lim (sin x)/x = 1',
      $BODY_EN$## Limits
Overcoming indeterminate form 0/0 via factoring or conjugate rationalization. Fundamental identity $\lim_{x \to 0} \frac{\sin x}{x} = 1$.$BODY_EN$,
      $BODY_KM$## ១. រាងមិនកំណត់ $\left[\frac{0}{0}\right]$
- **ពហុធា ៖** ដាក់ជាផលគុណកត្តា $(x - a)$ រួចសម្រួលចោល
- **កន្សោមរ៉ាឌីកាល់ ៖** គុណនឹងកន្សោមឆ្លាស់ (Conjugate)៖
  $$\lim_{x \to 0} \frac{\sqrt{x + 1} - 1}{x} = \lim_{x \to 0} \frac{(x + 1) - 1}{x(\sqrt{x + 1} + 1)} = \frac{1}{2}$$

## ២. លីមីតគ្រឹះត្រីកោណមាត្រ
$$\lim_{x \to 0} \frac{\sin x}{x} = 1, \quad \lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$$BODY_KM$,
      25,
      45,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Derivatives & Differentiation Rules (mathematics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Derivatives & Differentiation Rules',
      'ដេរីវេ និងរូបមន្តដេរីវេ',
      'Limit definition of derivative, power rule (xⁿ)'' = n·xⁿ⁻¹, product rule (uv)'', quotient rule (u/v)'', and chain rule',
      'និយមន័យដេរីវេជាលីមីត រូបមន្ត (xⁿ)'' = n · xⁿ⁻¹, (u · v)'', (u / v)'' និងដេរីវេបណ្តាក់',
      $BODY_EN$## Differentiation
Power rule $(x^n)' = n x^{n-1}$, product rule $(uv)' = u'v + uv'$, and quotient rule $(u/v)' = \frac{u'v - uv'}{v^2}$.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តដេរីវេគ្រឹះ
- $(c)' = 0$ (ថេរ)
- $(x^n)' = n \cdot x^{n-1}$
- $(\sqrt{x})' = \frac{1}{2\sqrt{x}}$
- $(\sin x)' = \cos x, \quad (\cos x)' = -\sin x$

## ២. វិធានប្រមាណវិធី
- $(u + v)' = u' + v'$
- **ផលគុណ ៖** $(u \cdot v)' = u'v + uv'$
- **ផលចែក ៖** $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$
- **ដេរីវេបណ្តាក់ ៖** $(u^n)' = n \cdot u' \cdot u^{n-1}$$BODY_KM$,
      25,
      45,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Applications of Derivatives: Extrema & Graphing (mathematics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Applications of Derivatives: Extrema & Graphing',
      'ការអនុវត្តដេរីវេ ៖ អថេរភាព បរមា និងខ្សែកោង',
      'Monotonicity tests using f''(x) sign, local extrema, critical points, and tangent line equation y = f''(x0)(x - x0) + y0',
      'ទិសដៅអថេរភាពតាមសញ្ញានៃ f''(x) ចំណុចអតិបរមា អប្បបរមា និងសមីការបន្ទាត់ប៉ះ y = f''(x₀)(x - x₀) + y₀',
      $BODY_EN$## Curve Sketching
Sign of $f'(x)$ establishes increasing/decreasing intervals. Tangent line at $x_0$ is $y = f'(x_0)(x - x_0) + y_0$.$BODY_EN$,
      $BODY_KM$## ១. ទិសដៅអថេរភាព
- បើ $f'(x) > 0$ លើចន្លោះ $I$ នោះអនុគមន៍ $f$ **កើនដាច់ខាត**
- បើ $f'(x) < 0$ លើចន្លោះ $I$ នោះអនុគមន៍ $f$ **ចុះដាច់ខាត**
- បើ $f'(x_0) = 0$ ហើយប្តូរសញ្ញាឆ្លងកាត់ $x_0$ នោះអនុគមន៍មាន **បរមា (Extremum)** ត្រង់ $x_0$

## ២. សមីការបន្ទាត់ប៉ះ (Tangent Line Equation)
សមីការបន្ទាត់ប៉ះនឹងខ្សែកោង $(C)$ ត្រង់ចំណុច $M(x_0, y_0)$ គឺ៖
$$y = f'(x_0)(x - x_0) + f(x_0)$$$BODY_KM$,
      24,
      45,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Advanced Trigonometric Equations (mathematics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Advanced Trigonometric Equations',
      'ត្រីកោណមាត្រកម្រិតខ្ពស់ ៖ សមីការត្រីកោណមាត្រ',
      'Solving fundamental periodic equations sin x = a, cos x = b, and auxiliary angle reduction a sin x + b cos x = c',
      'ការដោះស្រាយសមីការ sin x = sin α, cos x = cos α និងសមីការលីនេអ៊ែរ a sin x + b cos x = c',
      $BODY_EN$## Trigonometric Equations
General periodic solutions $x = \alpha + 2k\pi$ and reduction of $a\sin x + b\cos x = c$ using $\sqrt{a^2+b^2}$.$BODY_EN$,
      $BODY_KM$## ១. សមីការគ្រឹះត្រីកោណមាត្រ
- $\sin x = \sin \alpha \iff x = \alpha + 2k\pi \quad \text{ឬ} \quad x = \pi - \alpha + 2k\pi \quad (k \in \mathbb{Z})$
- $\cos x = \cos \alpha \iff x = \pm \alpha + 2k\pi \quad (k \in \mathbb{Z})$

## ២. សមីការទម្រង់ $a \sin x + b \cos x = c$
ចែកអង្គទាំងពីរនឹង $\sqrt{a^2 + b^2}$ ដើម្បីបំប្លែងទៅជាទម្រង់ $\sin(x + \varphi) = \frac{c}{\sqrt{a^2 + b^2}}$ (លក្ខខណ្ឌមានឬស ៖ $a^2 + b^2 \geq c^2$)។$BODY_KM$,
      24,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Electrostatics & Coulomb's Law (physics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Electrostatics & Coulomb''s Law',
      'អគ្គិសនីស្ទាទិច និងច្បាប់គូឡុំ (Coulomb''s Law)',
      'Coulomb''s electrostatic force law F = k|q1q2|/r², permittivity, and superposition of point charges',
      'ច្បាប់គូឡុំ F = k · |q₁q₂| / r² ថេរ k = 9 · 10⁹ N · m² / C² និងអន្តរកម្មរវាងបន្ទុកចំនុច',
      $BODY_EN$## Coulomb's Law
$F = k \frac{|q_1 q_2|}{r^2}$ where $k = 9 \times 10^9\text{ N m}^2/\text{C}^2$. Forces are attractive for opposite charges, repulsive for like charges.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់គូឡុំ (Coulomb's Law)
កម្លាំងអន្តរកម្មអេឡិចត្រូស្ទាទិចរវាងបន្ទុកអគ្គិសនីចំនុចពីរ $q_1$ និង $q_2$ ក្នុងសុញ្ញាកាស៖
$$F = k \cdot \frac{|q_1 \cdot q_2|}{r^2}$$
- $F$ ៖ កម្លាំងអគ្គិសនី ($N$)
- $k = 9 \times 10^9\text{ N}\cdot\text{m}^2/\text{C}^2$ ៖ ថេរគូឡុំ
- $q_1, q_2$ ៖ បរិមាណបន្ទុក (គូឡុំ $C$)
- $r$ ៖ ចម្ងាយរវាងបន្ទុកទាំងពីរ ($m$)$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Electric Fields & Electric Potential (physics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Electric Fields & Electric Potential',
      'ដែនអគ្គិសនី និងប៉ូតង់ស្យែល (E = F / q, V = E · d)',
      'Electric field vector E = F/q (V/m or N/C), uniform fields between parallel plates, and electric potential V',
      'វ៉ិចទ័រដែនអគ្គិសនី E = k · |q| / r² ខ្សែដែនអគ្គិសនី និងការងារផ្លាស់ទីបន្ទុក W = q · U',
      $BODY_EN$## Electric Fields
$\vec{E} = \vec{F}/q$. For uniform fields between parallel plates, $U = E \cdot d$. Work done is $W = q \cdot U$.$BODY_EN$,
      $BODY_KM$## ១. ដែនអគ្គិសនី (Electric Field $\vec{E}$)
$$\vec{E} = \frac{\vec{F}}{q} \implies E = k \cdot \frac{|q|}{r^2} \quad (V/m \text{ ឬ } N/C)$$
- ខ្សែដែនអគ្គិសនីចេញពីបន្ទុកវិជ្ជមាន ($+$) ចូលទៅបន្ទុកអវិជ្ជមាន ($-$)

## ២. ទំនាក់ទំនងរវាងដែន និងផលសងប៉ូតង់ស្យែល
ក្នុងដែនអគ្គិសនីស្មើ (រវាងបន្ទះលោហៈស្របពីរ)៖
$$U = E \cdot d \implies E = \frac{U}{d}$$
ការងារកម្លាំងអគ្គិសនី ៖ $W = q \cdot U$$BODY_KM$,
      24,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Capacitors & Energy Storage (physics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Capacitors & Energy Storage',
      'កុងដង់សាទ័រ និងសមត្ថភាព (C = Q / U)',
      'Capacitance C = Q/U measured in Farads (F), parallel-plate geometry C = εA/d, and energy storage E = 1/2 CU²',
      'និយមន័យសមត្ថភាព C = Q / U ខ្នាតហ្វារ៉ាត់ (F) និងថាមពលស្តុកក្នុងកុងដង់សាទ័រ E = 1/2 CU²',
      $BODY_EN$## Capacitors
$C = Q/U$. Energy stored in electrostatic field is $E = \frac{1}{2} C U^2$.$BODY_EN$,
      $BODY_KM$## ១. សមត្ថភាពកុងដង់សាទ័រ (Capacitance $C$)
$$C = \frac{Q}{U}$$
- $C$ ៖ សមត្ថភាព (ហ្វារ៉ាត់ $F$, មីក្រូហ្វារ៉ាត់ $\mu F = 10^{-6}\text{ F}$)
- $Q$ ៖ បន្ទុកអគ្គិសនី ($C$)
- $U$ ៖ តង់ស្យុងសងខាងកុងដង់សាទ័រ ($V$)

## ២. ថាមពលអគ្គិសនីស្តុកក្នុងកុងដង់សាទ័រ
$$E = \frac{1}{2} C U^2 = \frac{1}{2} Q U = \frac{Q^2}{2C}$$$BODY_KM$,
      22,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Magnetic Fields & Lorentz Force (physics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Magnetic Fields & Lorentz Force',
      'ដែនម៉ាញេទិច និងកម្លាំងឡូរ៉ិន (Lorentz Force)',
      'Lorentz force on moving charges F = q v B sin α, right-hand rule, and circular trajectory in uniform magnetic fields',
      'កម្លាំងឡូរ៉ិនលើបន្ទុកផ្លាស់ទី F = |q| · v · B · sin α និងវិធានដៃស្តាំ',
      $BODY_EN$## Lorentz Force
$F = |q| v B \sin\alpha$. Perpendicular charges undergo uniform circular motion with orbital radius $R = \frac{mv}{|q|B}$.$BODY_EN$,
      $BODY_KM$## ១. កម្លាំងឡូរ៉ិន (Lorentz Magnetic Force)
បន្ទុកអគ្គិសនី $q$ ដែលផ្លាស់ទីដោយល្បឿន $v$ ក្នុងដែនម៉ាញេទិច $B$ រងកម្លាំងម៉ាញេទិច៖
$$F = |q| \cdot v \cdot B \cdot \sin(\alpha)$$
- $F$ ៖ កម្លាំងឡូរ៉ិន ($N$)
- $B$ ៖ អាំងឌុចស្យុងម៉ាញេទិច (តេស្លា $T$)
- $\alpha = (\vec{v}, \vec{B})$ ៖ មុំរវាងវ៉ិចទ័រល្បឿន និងដែនម៉ាញេទិច

> **ចំណាំ៖** បើ $\vec{v} \perp \vec{B}$ ($\alpha = 90^\circ$) នោះចលនារបស់ភាគល្អិតជា **ចលនារង្វង់ស្មើ** ដែលមានកាំ $R = \frac{m v}{|q| B}$!$BODY_KM$,
      24,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Electromagnetic Induction & Faraday's Law (physics - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Electromagnetic Induction & Faraday''s Law',
      'អាំងឌុចស្យុងអេឡិចត្រូម៉ាញេទិច និងច្បាប់ហ្វារ៉ាដេ',
      'Magnetic flux Φ = B·S·cos θ (Weber), Faraday''s law of induced EMF e = -dΦ/dt, and Lenz''s direction law',
      'ភ្លុចម៉ាញេទិច Φ = B · S · cos θ ច្បាប់ហ្វារ៉ាដេ e = -ΔΦ / Δt និងច្បាប់ឡិនស៍',
      $BODY_EN$## Electromagnetic Induction
Faraday's law $e = -\frac{\Delta\Phi}{\Delta t}$. Lenz's negative sign dictates induced currents oppose changing magnetic flux.$BODY_EN$,
      $BODY_KM$## ១. ភ្លុចម៉ាញេទិច (Magnetic Flux $\Phi$)
$$\Phi = B \cdot S \cdot \cos(\theta)$$
- $\Phi$ ៖ ភ្លុចម៉ាញេទិច (វ៉េប៊ែរ $Wb$)
- $\theta$ ៖ មុំរវាងវ៉ិចទ័រដែន $\vec{B}$ និងវ៉ិចទ័រណរម៉ាល់ $\vec{n}$ នៃផ្ទៃ

## ២. ច្បាប់ហ្វារ៉ាដេ (Faraday's Law)
កម្លាំងអគ្គិសនីចលករអាំងឌ្វី ($e$) សមាមាត្រនឹងល្បឿនបម្រែបម្រួលភ្លុចម៉ាញេទិចកាត់ផ្ទៃសៀគ្វី៖
$$e = -\frac{\Delta \Phi}{\Delta t}$$
សញ្ញាដក ($-$) បញ្ជាក់ពី **ច្បាប់ឡិនស៍ (Lenz's Law)**៖ ចរន្តអាំងឌ្វីតែងតែបង្កើតដែនម៉ាញេទិចប្រឆាំងនឹងបម្រែបម្រួលភ្លុចដែលបង្កើតវា!$BODY_KM$,
      24,
      45,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Chemical Kinetics & Reaction Rates (chemistry - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Chemical Kinetics & Reaction Rates',
      'ស៊ីនេទិចគីមី និងល្បឿនប្រតិកម្ម',
      'Average and instantaneous reaction rate definitions, concentration curves, and kinetic rate laws',
      'ល្បឿនមធ្យមនៃការបាត់បង់ប្រតិករ និងការកកើតផល v = -Δ[A]/Δt = +Δ[P]/Δt',
      $BODY_EN$## Chemical Kinetics
Rate of reaction measures concentration change over time: $v = -\frac{\Delta[A]}{\Delta t} = +\frac{\Delta[B]}{\Delta t}$ ($mol/(L\cdot s)$).$BODY_EN$,
      $BODY_KM$## ១. ល្បឿនប្រតិកម្មគីមី (Reaction Rate $v$)
ចំពោះប្រតិកម្ម $A \rightarrow B$៖
- ល្បឿននៃការបាត់បង់ប្រតិករ $A$៖
  $$v(A) = -\frac{\Delta [A]}{\Delta t} = -\frac{[A]_2 - [A]_1}{t_2 - t_1}$$
- ល្បឿននៃការកកើតផល $B$៖
  $$v(B) = +\frac{\Delta [B]}{\Delta t} = +\frac{[B]_2 - [B]_1}{t_2 - t_1}$$
ខ្នាតនៃល្បឿនគឺ $mol\cdot L^{-1}\cdot s^{-1}$ ឬ $M/s$។$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Chemical Equilibrium & Le Chatelier's Principle (chemistry - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Chemical Equilibrium & Le Chatelier''s Principle',
      'សមតុល្យគីមី និងគោលការណ៍ Le Chatelier',
      'Reversible reactions, dynamic equilibrium constant Kc, and Le Chatelier''s stress response shifts',
      'ប្រតិកម្មទៅមក ថេរលំនឹង Kc និងឥទ្ធិពលនៃកំហាប់ សម្ពាធ និងសីតុណ្ហភាព',
      $BODY_EN$## Chemical Equilibrium
Equilibrium expression $K_c = \frac{[C]^c [D]^d}{[A]^a [B]^b}$. Le Chatelier's principle predicts dynamic response to external stresses.$BODY_EN$,
      $BODY_KM$## ១. ថេរលំនឹង ($K_c$)
ចំពោះប្រតិកម្មទៅមក៖ $aA + bB \rightleftharpoons cC + dD$
$$K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$$

## ២. គោលការណ៍ Le Chatelier
នៅពេលប្រព័ន្ធមួយស្ថិតក្នុងលំនឹងរងឥទ្ធិពលពីកត្តាខាងក្រៅ ប្រព័ន្ធនោះនឹងរំកិលតាមទិសដៅណាដែល **កាត់បន្ថយឥទ្ធិពលនោះ**៖
- បង្កើនកំហាប់ប្រតិករ $\rightarrow$ រំកិលទៅ **ទិសដៅមុខ (បង្កើតផល)**
- បង្កើនសីតុណ្ហភាព $\rightarrow$ រំកិលទៅ **ទិសដៅស្រូបកម្តៅ (Endothermic)**$BODY_KM$,
      24,
      45,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Organic Chemistry: Alkanes (CnH2n+2) (chemistry - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Organic Chemistry: Alkanes (CnH2n+2)',
      'គីមីសរីរាង្គ ៖ អ៊ីដ្រូកាបួឆ្អែត អាល់កាន (CnH2n+2)',
      'Alkane homologous series CnH2n+2, IUPAC nomenclature, structural isomers, and free radical halogenation',
      'រូបមន្តទូទៅ CnH2n+2 ការហៅឈ្មោះតាម IUPAC អ៊ីសូមែ និងប្រតិកម្មជំនួសជាមួយក្លរ',
      $BODY_EN$## Alkanes
Saturated hydrocarbons $C_n H_{2n+2}$. Single covalent bonds undergo substitution halogenation under UV light.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តទូទៅនៃអាល់កាន
$$C_n H_{2n+2} \quad (n \geq 1)$$
- $n = 1$ ៖ មេតាន ($CH_4$)
- $n = 2$ ៖ អេតាន ($C_2H_6$)
- $n = 3$ ៖ ប្រូប៉ាន ($C_3H_8$)
- $n = 4$ ៖ ប៊ុយតាន ($C_4H_{10}$)

## ២. ប្រតិកម្មជំនួស (Halogenation)
$$\text{CH}_4 + \text{Cl}_2 \xrightarrow{\text{ពន្លឺ UV}} \text{CH}_3\text{Cl} + \text{HCl}$$$BODY_KM$,
      24,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Unsaturated Hydrocarbons: Alkenes & Alkynes (chemistry - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Unsaturated Hydrocarbons: Alkenes & Alkynes',
      'គីមីសរីរាង្គ ៖ អាល់សែន និងអាល់ស៊ីន',
      'Double bond alkenes CnH2n, triple bond alkynes CnH2n-2, Markovnikov''s rule, and bromine addition decolorization',
      'សម្ព័ន្ធពីរ CnH2n (អាល់សែន) សម្ព័ន្ធបី CnH2n-2 (អាល់ស៊ីន) និងប្រតិកម្មបូក',
      $BODY_EN$## Alkenes & Alkynes
Unsaturated bonds decolorize bromine water through electrophilic addition: $C_2H_4 + Br_2 \rightarrow C_2H_4Br_2$.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តទូទៅ
- **អាល់សែន (Alkenes) ៖** $C_n H_{2n}$ ($n \geq 2$, មានសម្ព័ន្ធពីរ $C=C$) ឧ. អេទីឡែន ($C_2H_4$)
- **អាល់ស៊ីន (Alkynes) ៖** $C_n H_{2n-2}$ ($n \geq 2$, មានសម្ព័ន្ធបី $C\equiv C$) ឧ. អាសេទីឡែន ($C_2H_2$)

## ២. ប្រតិកម្មបូក (Addition Reactions)
ធ្វើឱ្យទឹកប្រូមបាត់ពណ៌ក្រហមត្នោត ៖
$$\text{CH}_2=\text{CH}_2 + \text{Br}_2 \rightarrow \text{CH}_2\text{Br}-\text{CH}_2\text{Br}$$$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Alcohols, Ethers & Functional Groups (chemistry - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Alcohols, Ethers & Functional Groups',
      'អាល់កុល និងអេទែ (R-OH, R-O-R'')',
      'Hydroxyl functional group -OH, ethanol fermentation, physical hydrogen bonding, and sodium metal reactions',
      'បង្គុំមុខងារអ៊ីដ្រុកស៊ីល -OH អេតាណុល C₂H₅OH និងប្រតិកម្មចំហេះ ប្រតិកម្មជាមួយសូដ្យូម',
      $BODY_EN$## Alcohols
Characterized by hydroxyl $-OH$ group. Alcohols react with sodium metal to release hydrogen gas: $2ROH + 2Na \rightarrow 2RONa + H_2$.$BODY_EN$,
      $BODY_KM$## ១. អាល់កុល (Alcohols)
មានបង្គុំមុខងារ **អ៊ីដ្រុកស៊ីល ($-OH$)** ភ្ជាប់នឹងកាបូនឆ្អែត ៖
$$R-OH \quad (C_n H_{2n+1}OH)$$
- អេតាណុល ($C_2H_5OH$) ប្រើក្នុងវេជ្ជសាស្ត្រ និងគ្រឿងស្រវឹង

## ២. ប្រតិកម្មជាមួយលោហៈសូដ្យូម
$$2\text{C}_2\text{H}_5\text{OH} + 2\text{Na} \rightarrow 2\text{C}_2\text{H}_5\text{ONa} + \text{H}_2 \uparrow$$$BODY_KM$,
      22,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Deep Photosynthesis: Light Reactions & Calvin Cycle (biology - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Deep Photosynthesis: Light Reactions & Calvin Cycle',
      'រស្មីសំយោគស៊ីជម្រៅ ៖ ដំណាក់កាលពន្លឺ និងវដ្ត Calvin',
      'Thylakoid light-dependent ATP/NADPH photolysis and stroma light-independent Calvin cycle (RuBisCO fixation)',
      'ទីឡាកូអ៊ីត ផូតូស៊ីស្ទែម II និង I ការបំបែកទឹកដោយពន្លឺ NADPH និងការផលិតគ្លុយកូសក្នុងស្ត្រូម៉ា',
      $BODY_EN$## Advanced Photosynthesis
Light reactions on thylakoids produce ATP and NADPH via photolysis. The Calvin cycle in stroma fixes $CO_2$ into glucose using RuBisCO.$BODY_EN$,
      $BODY_KM$## ១. ដំណាក់កាលពន្លឺ (Light-Dependent Reactions)
កើតឡើងលើភ្នាស **ទីឡាកូអ៊ីត (Thylakoid)** ក្នុងក្លរ៉ូប្លាស៖
- ពន្លឺព្រះអាទិត្យបំបែកម៉ូលេគុលទឹក (Photolysis)៖ $2H_2O \rightarrow 4H^+ + 4e^- + O_2$
- ផលិតថាមពល **ATP** និងភ្នាក់ងាររេដុករ **NADPH**

## ២. ដំណាក់កាលងងឹត (វដ្តកាល់វីន / Calvin Cycle)
កើតឡើងក្នុង **ស្ត្រូម៉ា (Stroma)**៖
- អង់ស៊ីម RuBisCO ចាប់យក $CO_2$
- ប្រើ $ATP$ និង $NADPH$ ពីដំណាក់កាលពន្លឺដើម្បីសំយោគជាតិស្ករគ្លុយកូស ($C_6H_{12}O_6$)$BODY_KM$,
      25,
      45,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cellular Respiration: Glycolysis, Krebs & ETC (biology - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Cellular Respiration: Glycolysis, Krebs & ETC',
      'ដង្ហើមកោសិកា ៖ Glycolysis, Krebs Cycle & ETC',
      'Cytosolic glycolysis (pyruvate), mitochondrial matrix Krebs cycle, and inner membrane oxidative phosphorylation',
      'គ្លីកូលីសក្នុងស៊ីតូប្លាស វដ្ត Krebs និងច្រវាក់ដឹកនាំអេឡិចត្រុងបង្កើត ៣៦ ទៅ ៣៨ ATP',
      $BODY_EN$## Aerobic Respiration
Glycolysis (cytosol, 2 ATP) $\rightarrow$ Krebs cycle (mitochondrial matrix, 2 ATP) $\rightarrow$ Electron Transport Chain (cristae, 32-34 ATP).$BODY_EN$,
      $BODY_KM$## ១. ដំណាក់កាលទាំង ៣ នៃដង្ហើមកោសិកា
1. **គ្លីកូលីស (Glycolysis) ៖** កើតក្នុងស៊ីតូប្លាស បំបែកគ្លុយកូសជា ២ អាស៊ីតពីរូវិច ទទួលបាន $2\text{ ATP}$
2. **វដ្តក្រិប (Krebs Cycle) ៖** កើតក្នុងម៉ាទ្រីសនៃមីតូកុងឌ្រី បញ្ចេញ $CO_2$ និងបង្កើត $NADH, FADH_2$
3. **ច្រវាក់ដឹកនាំអេឡិចត្រុង (ETC) ៖** កើតលើគ្រីស្តា ទទួលបានថាមពលច្រើនជាងគេ (ប្រហែល $32-34\text{ ATP}$ ដោយអង់ស៊ីម ATP Synthase)$BODY_KM$,
      25,
      45,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Protein Synthesis: Transcription & Translation (biology - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Protein Synthesis: Transcription & Translation',
      'ការសំយោគប្រូតេអ៊ីន ៖ ចម្លងកូដ និងបកប្រែកូដ',
      'RNA polymerase transcription from DNA template, mRNA codons, tRNA anticodons, and ribosome peptide translation',
      'ការចម្លងកូដ DNA → mRNA ក្នុងណ្វៃយ៉ូ និងការបកប្រែកូដ mRNA → អាស៊ីតអាមីណេនៅរីបូសូម',
      $BODY_EN$## Central Dogma
DNA $\rightarrow$ mRNA via nuclear transcription. Ribosomes translate mRNA triplet codons into amino acid polypeptide chains.$BODY_EN$,
      $BODY_KM$## ១. ការចម្លងកូដ (Transcription)
កើតឡើងក្នុងណ្វៃយ៉ូ ដោយអង់ស៊ីម RNA Polymerase ចម្លងខ្សែស្រឡាយ DNA ទៅជា **mRNA (messenger RNA)** តាមច្បាប់បំពេញបាស ($A-U, T-A, G-C, C-G$)។

## ២. ការបកប្រែកូដ (Translation)
កើតឡើងលើ **រីបូសូម (Ribosomes)** ក្នុងស៊ីតូប្លាស៖
- រីបូសូមអានកូដុង (Codon ត្រីធាតុបាសលើ mRNA)
- **tRNA** ដឹកនាំអាស៊ីតអាមីណេត្រឹមត្រូវមកផ្គុំគ្នាជាខ្សែប៉ូលីប៉ិបទីត (ប្រូតេអ៊ីន)$BODY_KM$,
      25,
      45,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Gene Mutations & Genetic Variations (biology - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Gene Mutations & Genetic Variations',
      'ហ្សែន និងការបំប្លែងហ្សែន Mutations',
      'Point mutations (substitution, insertion, deletion), frameshift errors, mutagenic agents, and sickle cell anemia',
      'ការបំប្លែងហ្សែនចំនុច ជំនួស បាត់ ថែមបាស កាំរស្មីយូវី និងជំងឺពន្ធុ',
      $BODY_EN$## Mutations
Alterations in DNA nucleotide sequences. Frameshift insertions/deletions drastically disrupt downstream amino acid sequences.$BODY_EN$,
      $BODY_KM$## ១. ការបំប្លែងហ្សែន (Gene Mutations)
គឺជាបម្រែបម្រួលនៃលំដាប់តម្រៀបនុយក្លេអូទីតក្នុង DNA៖
- **ការជំនួសបាស (Substitution) ៖** ប្តូរបាសមួយដោយបាសមួយទៀត
- **ការលុប ឬបន្ថែមបាស (Deletion/Insertion) ៖** បណ្តាលឱ្យមានបាតុភូត **Frameshift** ធ្វើឱ្យប្រូតេអ៊ីនខូចទាំងស្រុង

## ២. មូលហេតុ
កត្តារូប (កាំរស្មី $X$, កាំរស្មីយូវី), កត្តាគីមី (ផ្សែងបារី សារជាតិគីមីពុល)។$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Plant Vascular Transport: Xylem & Phloem (biology - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Plant Vascular Transport: Xylem & Phloem',
      'ការដឹកជញ្ជូនសារធាតុក្នុងរុក្ខជាតិ ៖ Xylem & Phloem',
      'Transpirational pull in xylem vessels, cohesion-tension theory, and pressure-flow hypothesis in phloem sieve tubes',
      'លំហូរទឹកតាមស៊ីឡែម (កម្លាំងបឺតពីការបញ្ចេញចំហាយទឹក) និងលំហូរអាហារតាមផ្លូអែម',
      $BODY_EN$## Plant Transport
Xylem carries water upwards powered by leaf transpirational suction. Phloem distributes photosynthesized sucrose systemically.$BODY_EN$,
      $BODY_KM$## ១. ស៊ីឡែម (Xylem Vessels)
ដឹកជញ្ជូន **ទឹក និងអំបិលខនិជ (រដូវឆៅ)** ពីឫសឡើងទៅស្លឹក តាមរយៈយន្តការ៖
- កម្លាំងបឺតនៃការបញ្ចេញចំហាយទឹកតាមស្តូម៉ាត (Transpirational Pull)
- កម្លាំងភ្ជាប់គ្នានៃម៉ូលេគុលទឹក (Cohesion-Tension)

## ២. ផ្លូអែម (Phloem Sieve Tubes)
ដឹកជញ្ជូន **ជាតិស្ករសរីរាង្គ (រដូវឆ្អិន)** ពីស្លឹកទៅចិញ្ចឹមគ្រប់ផ្នែកនៃរុក្ខជាតិ។$BODY_KM$,
      20,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Global Ocean Thermohaline Circulation (earth - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Global Ocean Thermohaline Circulation',
      'មហាសមុទ្រវិទ្យា និងចរន្តទឹកសមុទ្រពិភពលោក',
      'Thermohaline conveyor belt driven by water density and salinity gradients, Gulf stream heat transport',
      'ខ្សែពានដឹកជញ្ជូនសកល ចរន្តទឹកក្តៅ Gulf Stream និងឥទ្ធិពលលើសីតុណ្ហភាពទ្វីបអឺរ៉ុប',
      $BODY_EN$## Ocean Circulation
Thermohaline circulation operates as a planetary conveyor belt driven by temperature and salinity density differentials.$BODY_EN$,
      $BODY_KM$## ១. ចរន្តទឹកសមុទ្រសកល (Thermohaline Circulation)
គឺជាប្រព័ន្ធខ្សែពានទឹកសមុទ្រពិភពលោកដែលដំណើរការដោយ **ដង់ស៊ីតេទឹក** (ខុសគ្នាតាមសីតុណ្ហភាព និងកំហាប់អំបិល)៖
- ទឹកត្រជាក់ប្រៃនៅប៉ូលខាងជើងធ្លាក់ចុះបាតសមុទ្រ
- ចរន្តទឹកក្តៅ **Gulf Stream** ហូរនាំកម្តៅពីអេក្វាទ័រទៅកាន់ទ្វីបអឺរ៉ុប ជួយឱ្យអឺរ៉ុបខាងលិចមានអាកាសធាតុកក់ក្តៅ។$BODY_KM$,
      22,
      40,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: El Niño & La Niña Dynamics (ENSO) (earth - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'El Niño & La Niña Dynamics (ENSO)',
      'បាតុភូតអែលនីញ៉ូ និងឡានីញ៉ា (ENSO)',
      'El Niño Southern Oscillation (ENSO), trade wind anomalies, severe droughts, and flash flood patterns in Cambodia',
      'ការកើនឡើងកម្តៅទឹកសមុទ្រប៉ាស៊ីហ្វិក គ្រោះរាំងស្ងួត និងទឹកជំនន់នៅអាស៊ីអាគ្នេយ៍ និងកម្ពុជា',
      $BODY_EN$## ENSO Patterns
El Niño warms Pacific waters, triggering droughts in Cambodia. La Niña cools equatorial waters, exacerbating heavy flooding.$BODY_EN$,
      $BODY_KM$## ១. បាតុភូតអែលនីញ៉ូ (El Niño)
កើតឡើងនៅពេលផ្ទៃទឹកសមុទ្រប៉ាស៊ីហ្វិកកណ្តាល និងខាងកើតឡើងកម្តៅខុសប្រក្រតី ធ្វើឱ្យខ្យល់ជំនួញចុះខ្សោយ៖
- **នៅកម្ពុជា និងអាស៊ីអាគ្នេយ៍ ៖** កើតមាន **គ្រោះរាំងស្ងួត** កម្តៅហួតហែង និងភ្លៀងធ្លាក់យឺត
- **នៅឆ្នេរអាមេរិកខាងត្បូង (ប៉េរូ) ៖** កើតមានភ្លៀងធ្លាក់ជោកជាំ និងទឹកជំនន់

## ២. បាតុភូតឡានីញ៉ា (La Niña)
មានឥទ្ធិពលផ្ទុយគ្នា៖ បង្កឱ្យមានភ្លៀងធ្លាក់ខ្លាំងខុសធម្មតា និងទឹកជំនន់នៅកម្ពុជា។$BODY_KM$,
      22,
      40,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Biogeochemical Cycles: Carbon & Nitrogen (earth - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Biogeochemical Cycles: Carbon & Nitrogen',
      'វដ្តជីវគីមី ៖ វដ្តកាបូន និងអាសូត',
      'Carbon sinks and fluxes, atmospheric reservoirs, and soil nitrogen-fixing bacteria (Rhizobium)',
      'ការផ្លាស់ប្តូរកាបូនរវាងបរិយាកាស ជីវមណ្ឌល និងសមុទ្រ ព្រមទាំងបាក់តេរីចាប់អាសូតក្នុងដី',
      $BODY_EN$## Biogeochemical Cycles
Carbon flows across atmosphere, oceans, and biosphere. Nitrogen fixation by Rhizobium enables biological protein synthesis.$BODY_EN$,
      $BODY_KM$## ១. វដ្តកាបូន (Carbon Cycle)
កាបូន ($CO_2$) ត្រូវបានស្រូបដោយរុក្ខជាតិតាមរយៈរស្មីសំយោគ បញ្ជូនបន្តតាមខ្សែច្រវាក់ចំណីអាហារ និងត្រឡប់ទៅបរិយាកាសវិញតាមរយៈដង្ហើមភាវៈរស់ ការរលួយសាកសព និងការដុតឥន្ធនៈហ្វូស៊ីល។

## ២. វដ្តអាសូត (Nitrogen Cycle)
រុក្ខជាតិមិនអាចស្រូបយក $N_2$ ពីខ្យល់ដោយផ្ទាល់បានទេ។ បាក់តេរីចាប់អាសូត (Rhizobium នៅក្នុងឫសរុក្ខជាតិអំបូរផ្កាសណ្តែក) ជួយបំប្លែង $N_2$ ទៅជា **នីត្រាត ($NO_3^-$)** ដែលរុក្ខជាតិអាចស្រូបបាន។$BODY_KM$,
      22,
      40,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Global Climate Change & Cryosphere Loss (earth - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Global Climate Change & Cryosphere Loss',
      'ការប្រែប្រួលអាកាសធាតុសកល និងឧស្ម័នផ្ទះកញ្ចក់',
      'Keeling curve, CO2 exceeding 420 ppm, positive feedback loops, polar ice sheet melt, and sea level rise',
      'ការកើនឡើងកំហាប់ CO₂ លើស ៤២០ ppm ការរលាយផ្ទាំងទឹកកកប៉ូល និងកម្ពស់ទឹកសមុទ្រឡើង',
      $BODY_EN$## Climate Change
Anthropogenic greenhouse emissions pushed atmospheric $CO_2$ past 420 ppm, destabilizing the polar cryosphere.$BODY_EN$,
      $BODY_KM$## ១. ការកើនឡើងកំហាប់កាបូនិក
ទិន្នន័យពីស្ថានីយ Mauna Loa បង្ហាញថាកំហាប់ $CO_2$ បានកើនឡើងពី $280\text{ ppm}$ (សម័យមុនបដិវត្តន៍ឧស្សាហកម្ម) ទៅលើស **$420\text{ ppm}$** នៅពេលបច្ចុប្បន្ន។

## ២. ផលប៉ះពាល់ធ្ងន់ធ្ងរ
- សីតុណ្ហភាពមធ្យមផែនដីកើនឡើងលើស $1.1^\circ\text{C}$
- ការរលាយទឹកកកនៅហ្គ្រោអង់ឡង់ និងអង់តាក់ទិក គំរាមកំហែងដល់ទីក្រុងឆ្នេរសមុទ្រពិភពលោក$BODY_KM$,
      22,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Astronomy: Stellar Systems & The Milky Way (earth - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Astronomy: Stellar Systems & The Milky Way',
      'តារាសាស្ត្រ ៖ ប្រព័ន្ធព្រះអាទិត្យ និងកាឡាក់ស៊ី Milky Way',
      'Spiral barred galaxy Milky Way, light-year distances, Sagittarius A* supermassive black hole, and stellar spectra',
      'កាឡាក់ស៊ីគូទខ្យង Milky Way ឆ្នាំពន្លឺ ផ្កាយព្រះអាទិត្យ និងប្រហោងខ្មៅកណ្តាលកាឡាក់ស៊ី',
      $BODY_EN$## The Milky Way
A barred spiral galaxy 100,000 light-years in diameter with over 200 billion stars orbiting supermassive black hole Sagittarius A*.$BODY_EN$,
      $BODY_KM$## ១. កាឡាក់ស៊ីមីលគីវេ (Milky Way Galaxy)
កាឡាក់ស៊ីរបស់យើងជារាងគូទខ្យង (Spiral Galaxy) ដែលមានផ្កាយជាង ២០០ ពាន់លានដួង៖
- អង្កត់ផ្ចិត ៖ ប្រហែល **១០០ ០០០ ឆ្នាំពន្លឺ (Light-years)**
- ១ ឆ្នាំពន្លឺ ៖ ចម្ងាយដែលពន្លឺធ្វើដំណើរក្នុងមួយឆ្នាំ (ប្រហែល $9.46 \times 10^{12}\text{ km}$)
- ចំកណ្តាលកាឡាក់ស៊ីមាន **ប្រហោងខ្មៅយក្ស (Supermassive Black Hole)** ឈ្មោះ Sagittarius A*។$BODY_KM$,
      20,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Definite Integrals & Fundamental Theorem (Bac II) (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Definite Integrals & Fundamental Theorem (Bac II)',
      'អាំងតេក្រាលកំណត់ និងព្រីមីទីវ (ត្រៀមបាក់ឌុប)',
      'Fundamental Theorem of Calculus ∫ f(x)dx = F(b) - F(a), integration by parts, and planar surface areas',
      'រូបមន្តព្រីមីទីវគ្រឹះ ការគណនាអាំងតេក្រាលដោយផ្នែក ∫ u dv = uv - ∫ v du និងក្រឡាផ្ទៃ',
      $BODY_EN$## Definite Integrals
Fundamental theorem $\int_a^b f(x)dx = F(b) - F(a)$. Integration by parts $\int u dv = uv - \int v du$. Area under curve $S = \int_a^b |f(x)|dx$.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីបទគ្រឹះនៃគណិតវិទ្យាវិភាគ
បើ $F(x)$ ជាព្រីមីទីវនៃ $f(x)$ លើចន្លោះ $[a, b]$ នោះ៖
$$\int_a^b f(x) \, dx = [F(x)]_a^b = F(b) - F(a)$$

## ២. រូបមន្តអាំងតេក្រាលដោយផ្នែក (Integration by Parts)
$$\int u \, dv = u \cdot v - \int v \, du$$

> **ឧទាហរណ៍៖** គណនា $I = \int_0^1 x e^x \, dx$
> តាង $u = x \implies du = dx$
> $dv = e^x dx \implies v = e^x$
> $$I = [x e^x]_0^1 - \int_0^1 e^x \, dx = (1 \cdot e^1 - 0) - [e^x]_0^1 = e - (e - 1) = 1$$

## ៣. ការគណនាក្រឡាផ្ទៃប្លង់ (Planar Area)
ក្រឡាផ្ទៃខណ្ឌដោយខ្សែកោង $y = f(x)$, អ័ក្ស $Ox$ និងបន្ទាត់ឈរ $x = a, x = b$ គឺ៖
$$S = \int_a^b |f(x)| \, dx$$$BODY_KM$,
      28,
      50,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Complex Numbers & De Moivre's Theorem (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Complex Numbers & De Moivre''s Theorem',
      'ចំនួនកុំផ្លិច និងរូបមន្តដឺម័រ (Complex Numbers)',
      'Algebraic form a + bi, modulus-argument polar form r(cos θ + i sin θ), and De Moivre''s power theorem',
      'ទម្រង់ពិជគណិត z = a + bi ទម្រង់ត្រីកោណមាត្រ z = r(cos θ + i sin θ) និងរូបមន្តដឺម័រ zⁿ = rⁿ(cos nθ + i sin nθ)',
      $BODY_EN$## Complex Numbers
Polar form $z = r(\cos\theta + i\sin\theta)$. De Moivre's theorem computes integer powers: $z^n = r^n(\cos n\theta + i\sin n\theta)$.$BODY_EN$,
      $BODY_KM$## ១. ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច
$$z = a + bi = r(\cos \theta + i \sin \theta)$$
- ម៉ូឌុល ៖ $r = |z| = \sqrt{a^2 + b^2}$
- អាគុយម៉ង់ ៖ $\cos \theta = \frac{a}{r}, \quad \sin \theta = \frac{b}{r}$

## ២. រូបមន្តដឺម័រ (De Moivre's Theorem)
ចំពោះគ្រប់ចំនួនគត់រ៉ឺឡាទីវ $n \in \mathbb{Z}$៖
$$[r(\cos \theta + i \sin \theta)]^n = r^n [\cos(n\theta) + i \sin(n\theta)]$$

> **ឧទាហរណ៍៖** គណនា $(1 + i)^8$
> $1 + i = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$
> $$(1 + i)^8 = (\sqrt{2})^8 [\cos(2\pi) + i\sin(2\pi)] = 16(1 + 0) = 16$$$BODY_KM$,
      26,
      50,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: First & Second Order Differential Equations (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'First & Second Order Differential Equations',
      'សមីការឌីផេរ៉ង់ស្យែល (Differential Equations)',
      'First order ODE y'' + ay = 0 (general solution y = Ce⁻ᵃˣ) and second order homogeneous characteristic equations',
      'សមីការលីនេអ៊ែរដឺក្រេទី១ y'' + ay = 0 និងដឺក្រេទី២ y'''' + ay'' + by = 0 តាមសមីការសម្គាល់ r² + ar + b = 0',
      $BODY_EN$## Differential Equations
Characteristic equation $r^2 + ar + b = 0$ governs 2nd order linear ODEs across real, repeated, and complex root cases.$BODY_EN$,
      $BODY_KM$## ១. សមីការលីនេអ៊ែរលំដាប់ទី១
$$y' + ay = 0 \implies y(x) = C \cdot e^{-ax} \quad (C \in \mathbb{R})$$

## ២. សមីការលីនេអ៊ែរលំដាប់ទី២ អូម៉ូសែន
$$y'' + ay' + by = 0$$
សមីការសម្គាល់ ៖ $r^2 + ar + b = 0$
- **បើ $\Delta > 0$ ៖** មានឬសពីរ $r_1 \neq r_2$
  $$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$$
- **បើ $\Delta = 0$ ៖** មានឬសឌុប $r_0$
  $$y = (C_1 x + C_2) e^{r_0 x}$$
- **បើ $\Delta < 0$ ៖** មានឬសកុំផ្លិច $r = \alpha \pm i\beta$
  $$y = e^{\alpha x} (C_1 \cos \beta x + C_2 \sin \beta x)$$$BODY_KM$,
      26,
      45,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: 3D Space Analytical Geometry: Planes & Lines (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      '3D Space Analytical Geometry: Planes & Lines',
      'ធរណីមាត្រក្នុងលំហ Oxyz ៖ សមីការប្លង់ និងបន្ទាត់',
      'Cross product of vectors, normal plane equations ax + by + cz + d = 0, and parametric spatial lines',
      'ផលគុណខ្វែងនៃពីរវ៉ិចទ័រ សមីការប្លង់ ax + by + cz + d = 0 និងសមីការប៉ារ៉ាម៉ែត្រនៃបន្ទាត់',
      $BODY_EN$## 3D Geometry
Cross product $\vec{u} \times \vec{v}$ gives normal vector $\vec{n}$. Plane equation $ax + by + cz + d = 0$. Distance $d = \frac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$.$BODY_EN$,
      $BODY_KM$## ១. ផលគុណខ្វែង (Cross Product $\vec{u} \times \vec{v}$)
$$\vec{u} \times \vec{v} = \left( yz' - zy', \; zx' - xz', \; xy' - yx' \right)$$
ផលគុណខ្វែងបង្កើតបានជាវ៉ិចទ័រមួយដែល **កែងនឹងវ៉ិចទ័រទាំងពីរ** $\vec{u}$ និង $\vec{v}$។

## ២. សមីការប្លង់កាត់តាម $A(x_0, y_0, z_0)$ មានវ៉ិចទ័រណរម៉ាល់ $\vec{n}=(a, b, c)$
$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \implies ax + by + cz + d = 0$$

## ៣. ចម្ងាយពីចំណុច $M_0$ ទៅប្លង់ $(P)$
$$d(M_0, P) = \frac{|a x_0 + b y_0 + c z_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$$$BODY_KM$,
      26,
      50,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Combinatorics & Classical Probability (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Combinatorics & Classical Probability',
      'ប្រូបាប៊ីលីតេ និងបន្សំ (Probability & Combinations)',
      'Permutations, combinations C(n, k), sample spaces, independent events, and conditional probability P(A|B)',
      'ចម្លាស់ បន្សំ C_n^k = n! / (k!(n-k)!) ប្រូបាប P(A) = n(A) / n(S) និងទ្រឹស្តីបទប្រូបាបមានលក្ខខណ្ឌ',
      $BODY_EN$## Probability
Combinations $C_n^k = \frac{n!}{k!(n-k)!}$. Probability $P(A) = \frac{n(A)}{n(S)}$. Complementary probability $P(\bar{A}) = 1 - P(A)$.$BODY_EN$,
      $BODY_KM$## ១. បន្សំ (Combinations $C_n^k$)
បន្សំ $k$ ធាតុ យកពី $n$ ធាតុខុសៗគ្នា (ដោយមិនគិតពីលំដាប់) ៖
$$C_n^k = \frac{n!}{k!(n - k)!}$$

## ២. និយមន័យប្រូបាបក្លាស៊ិក
$$P(A) = \frac{\text{ចំនួនករណីស្រប}}{\text{ចំនួនករណីអាច}} = \frac{n(A)}{n(S)}$$
- $0 \leq P(A) \leq 1$
- ព្រឹត្តិការណ៍ផ្ទុយ ៖ $P(\bar{A}) = 1 - P(A)$
- ព្រឹត្តិការណ៍មិនចុះសម្រុងគ្នា ៖ $P(A \cup B) = P(A) + P(B) - P(A \cap B)$$BODY_KM$,
      24,
      45,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Area & Solids of Revolution by Definite Integrals (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Area & Solids of Revolution by Definite Integrals',
      'គណនាផ្ទៃក្រឡា និងមាឌសូលីតបង្វិលដោយអាំងតេក្រាល',
      'Planar area bounded by curves and solid revolution volume V = π∫f(x)²dx about the x-axis for Bac II exam',
      'រូបមន្តក្រឡាផ្ទៃ A = ∫|f(x) - g(x)|dx និងមាឌសូលីតបង្វិលជុំវិញអ័ក្ស (Ox) V = π∫[f(x)]²dx ត្រៀមបាក់ឌុប',
      $BODY_EN$## Area & Solid Volume of Revolution
Planar area: $A = \int_a^b [f(x) - g(x)] dx$. Volume of revolution about x-axis: $V = \pi \int_a^b [f(x)]^2 dx$.$BODY_EN$,
      $BODY_KM$## ១. ក្រឡាផ្ទៃខណ្ឌដោយខ្សែកោង
ក្រឡាផ្ទៃ $A$ នៃដែនកំណត់ដោយខ្សែកោង $y = f(x)$, $y = g(x)$ និងបន្ទាត់ឈរ $x = a, x = b$ ($a \le b$)៖
$$A = \int_a^b |f(x) - g(x)| \, dx$$
បើ $f(x) \ge g(x)$ លើ $[a, b]$ នោះ៖
$$A = \int_a^b [f(x) - g(x)] \, dx$$

## ២. មាឌសូលីតបង្វិលជុំវិញអ័ក្ស $(Ox)$
មាឌ $V$ នៃសូលីតបង្វិលដែលកើតឡើងពីការបង្វិលដែន $D$ ជុំវិញអ័ក្ស $(Ox)$ មួយជុំ ($360^\circ$)៖
$$V = \pi \int_a^b [f(x)]^2 \, dx$$

> **ឧទាហរណ៍បាក់ឌុប៖** គណនាមាឌសូលីតបង្វិលនៃ $y = \sqrt{x}$ ជុំវិញ $(Ox)$ ពី $x = 0$ ដល់ $x = 4$
> $$V = \pi \int_0^4 (\sqrt{x})^2 \, dx = \pi \int_0^4 x \, dx = \pi \left[ \frac{x^2}{2} \right]_0^4 = \pi \left(\frac{16}{2}\right) = 8\pi \text{ ឯកតាមាឌ}$$$BODY_KM$,
      26,
      50,
      true,
      6
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Second-Order Linear ODEs (Bac II) (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Second-Order Linear ODEs (Bac II)',
      'សមីការឌីផេរ៉ង់ស្យែលលំដាប់២ y'''' + ay'' + by = 0',
      'Characteristic equation r² + ar + b = 0, real distinct roots, repeated roots, and complex conjugate harmonic solutions',
      'សមីការចរិតលក្ខណៈ r² + ar + b = 0 និងដំណោះស្រាយទូទៅចំពោះករណី Δ > 0, Δ = 0, Δ < 0',
      $BODY_EN$## Second-Order Homogeneous ODEs
$y'' + ay' + by = 0$ with characteristic roots $r$. Solutions span exponential, critical damping, or sinusoidal harmonic combinations.$BODY_EN$,
      $BODY_KM$## ១. សមីការចរិតលក្ខណៈ (Characteristic Equation)
ចំពោះសមីការឌីផេរ៉ង់ស្យែលលំដាប់២ អូម៉ូសែន៖
$$y'' + ay' + by = 0$$
សមីការចរិតលក្ខណៈគឺ៖
$$r^2 + ar + b = 0 \quad (\Delta = a^2 - 4b)$$

## ២. ទម្រង់ដំណោះស្រាយទូទៅ
- **ករណី $\Delta > 0$៖** មានឫសពីរខុសគ្នា $r_1, r_2$
  $$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$$
- **ករណី $\Delta = 0$៖** មានឫសឌុប $r_0 = -\frac{a}{2}$
  $$y = (C_1 x + C_2) e^{r_0 x}$$
- **ករណី $\Delta < 0$៖** មានឫសកុំផ្លិចឆ្លាស់ $r = \alpha \pm i\beta$
  $$y = e^{\alpha x} (C_1 \cos\beta x + C_2 \sin\beta x)$$$BODY_KM$,
      26,
      50,
      true,
      7
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Trigonometric Form & De Moivre's Theorem (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Trigonometric Form & De Moivre''s Theorem',
      'ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច និងរូបមន្តដឺម័រ',
      'Modulus r = √(a²+b²), argument θ, polar form z = r(cosθ + i sinθ), and De Moivre''s theorem for powers and nth roots',
      'ម៉ូឌុល r = |z|, អាគុយម៉ង់ θ, ទម្រង់ z = r(cos θ + i sin θ) និងរូបមន្តដឺម័រ zⁿ = rⁿ(cos nθ + i sin nθ)',
      $BODY_EN$## Trigonometric Form & De Moivre
$z = r(\cos\theta + i\sin\theta)$. Powers of complex numbers simplify via De Moivre's theorem: $z^n = r^n(\cos n\theta + i\sin n\theta)$.$BODY_EN$,
      $BODY_KM$## ១. ទម្រង់ត្រីកោណមាត្រនៃចំនួនកុំផ្លិច
ចំពោះចំនួនកុំផ្លិច $z = a + bi$ ($z \neq 0$)៖
- **ម៉ូឌុល (Modulus)៖** $r = |z| = \sqrt{a^2 + b^2}$
- **អាគុយម៉ង់ (Argument $\theta$)៖** $\cos\theta = \frac{a}{r}, \quad \sin\theta = \frac{b}{r}$
- **ទម្រង់ត្រីកោណមាត្រ៖**
  $$z = r(\cos\theta + i\sin\theta)$$

## ២. រូបមន្តដឺម័រ (De Moivre's Theorem)
ចំពោះគ្រប់ចំនួនគត់ $n \in \mathbb{Z}$៖
$$[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)$$

> **ឧទាហរណ៍បាក់ឌុប៖** គណនា $(1 + i\sqrt{3})^{12}$
> - ម៉ូឌុល $r = \sqrt{1 + 3} = 2$
> - អាគុយម៉ង់ $\cos\theta = \frac{1}{2}, \sin\theta = \frac{\sqrt{3}}{2} \implies \theta = \frac{\pi}{3}$
> - $(1 + i\sqrt{3})^{12} = 2^{12}\left(\cos 12\frac{\pi}{3} + i\sin 12\frac{\pi}{3}\right) = 4096(\cos 4\pi + i\sin 4\pi) = 4096(1 + 0) = 4096$$BODY_KM$,
      25,
      50,
      true,
      8
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: 3D Space Geometry: Plane Equations & Distances (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      '3D Space Geometry: Plane Equations & Distances',
      'ធរណីមាត្រក្នុងលំហ Oxyz ៖ សមីការប្លង់ និងចម្ងាយ',
      'General plane equations Ax + By + Cz + D = 0, normal vectors, angle between planes, and distance formula',
      'សមីការទូទៅនៃប្លង់ Ax + By + Cz + D = 0 វ៉ិចទ័រណរម៉ាល់ n(A, B, C) និងរូបមន្តចម្ងាយពីចំណុចទៅប្លង់',
      $BODY_EN$## 3D Planes in Space
General plane equation: $Ax + By + Cz + D = 0$. Distance from point $M_1$ to plane: $d = \frac{|Ax_1 + By_1 + Cz_1 + D|}{\sqrt{A^2 + B^2 + C^2}}$.$BODY_EN$,
      $BODY_KM$## ១. សមីការប្លង់ក្នុងលំហ $(Oxyz)$
ប្លង់ $(P)$ កាត់តាមចំណុច $M_0(x_0, y_0, z_0)$ និងមានវ៉ិចទ័រណរម៉ាល់ $\vec{n}(A, B, C)$ មានសមីការ៖
$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$
ឬជាទម្រង់ទូទៅ៖
$$Ax + By + Cz + D = 0 \quad (A^2 + B^2 + C^2 \neq 0)$$

## ២. ចម្ងាយពីចំណុចទៅប្លង់ (Distance Formula)
ចម្ងាយពីចំណុច $M_1(x_1, y_1, z_1)$ ទៅកាន់ប្លង់ $(P): Ax + By + Cz + D = 0$ គឺ៖
$$d(M_1, (P)) = \frac{|Ax_1 + By_1 + Cz_1 + D|}{\sqrt{A^2 + B^2 + C^2}}$$$BODY_KM$,
      26,
      50,
      true,
      9
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Random Variables & Probability Distributions (mathematics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'mathematics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Random Variables & Probability Distributions',
      'អថេរចៃដន្យ និងបំណែងចែកប្រូបាបបាក់ឌុប',
      'Discrete random variables, probability mass function, expected value E(X), variance V(X), and standard deviation',
      'អថេរចៃដន្យដាច់ X តារាងបំណែងចែកប្រូបាប សង្ឃឹមគណិត E(X) វ៉ារ្យ៉ង់ V(X) និងគម្លាតស្តង់ដារ σ(X)',
      $BODY_EN$## Random Variables & Distributions
Expected value $E(X) = \sum x_i p_i$. Variance $V(X) = E(X^2) - [E(X)]^2$, and standard deviation $\sigma = \sqrt{V(X)}$.$BODY_EN$,
      $BODY_KM$## ១. អថេរចៃដន្យដាច់ (Discrete Random Variable $X$)
ជាអនុគមន៍ដែលភ្ជាប់លទ្ធផលនៃលំហសំណាកទៅនឹងចំនួនពិត $x_1, x_2, ..., x_n$ ដោយមានប្រូបាបរៀងគ្នា $p_1, p_2, ..., p_n$៖
$$\sum_{i=1}^n p_i = 1$$

## ២. សង្ឃឹមគណិត (Expected Value $E(X)$)
$$E(X) = \mu = \sum_{i=1}^n x_i p_i = x_1 p_1 + x_2 p_2 + ... + x_n p_n$$

## ៣. វ៉ារ្យ៉ង់ និងគម្លាតស្តង់ដារ
- **វ៉ារ្យ៉ង់ (Variance)៖**
  $$V(X) = E(X^2) - [E(X)]^2 = \sum_{i=1}^n (x_i - \mu)^2 p_i$$
- **គម្លាតស្តង់ដារ (Standard Deviation)៖**
  $$\sigma(X) = \sqrt{V(X)}$$$BODY_KM$,
      25,
      50,
      true,
      10
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Newton's Second Law & Dynamic Forces (Bac II) (physics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Newton''s Second Law & Dynamic Forces (Bac II)',
      'ច្បាប់ញូតុនទី២ និងឌីណាមិចនៃចលនា (ត្រៀមបាក់ឌុប)',
      'Dynamic vector equilibrium, inclined plane force projections, kinetic friction, and momentum conservation',
      'កម្លាំងផ្គួប ΣF = m · a ចលនាលើប្លង់ជម្រាល កម្លាំងកកិត និងច្បាប់រក្សាបរិមាណចលនា',
      $BODY_EN$## Newton's Second Law
$\sum \vec{F} = m\vec{a}$. On an inclined frictionless slope, acceleration is $a = g\sin\alpha$. Total momentum is conserved in isolated systems.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់ញូតុនទី២ ក្នុងទម្រង់វ៉ិចទ័រ
$$\sum \vec{F}_{\text{ext}} = m \cdot \vec{a}$$

## ២. ចលនាលើប្លង់ជម្រាលមុំ $\alpha$
នៅពេលទម្លាក់វត្ថុពីលើប្លង់ជម្រាលគ្មានកកិត៖
- ទម្ងន់បំបែកជាពីរភាគ ៖
  - តាមទិសកែងនឹងប្លង់ ៖ $P_y = P \cos\alpha = mg\cos\alpha$
  - តាមទិសស្របនឹងប្លង់ ៖ $P_x = P \sin\alpha = mg\sin\alpha$
- សំទុះចលនា ៖
  $$a = g \sin\alpha$$

## ៣. ច្បាប់រក្សាបរិមាណចលនា (Momentum Conservation)
ក្នុងប្រព័ន្ធដាច់ខាត ៖
$$\vec{p} = m_1 \vec{v}_1 + m_2 \vec{v}_2 = \text{ថេរ (Constant)}$$$BODY_KM$,
      26,
      50,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mechanical & Electromagnetic Waves (physics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Mechanical & Electromagnetic Waves',
      'រលកមេកានិច និងរលកអេឡិចត្រូម៉ាញេទិច',
      'Wave speed, wavelength λ = v/f, transverse vs longitudinal waves, wave interference, and the electromagnetic spectrum',
      'ប្រវែងរលក λ = v / f ស្មើ v · T សមីការរលក រ៉េសូណង់ និងល្បឿនពន្លឺ c = 3 · 10⁸ m/s',
      $BODY_EN$## Wave Mechanics
$\lambda = v/f$. In vacuum, electromagnetic waves travel at $c = 3 \times 10^8\text{ m/s}$. High frequency corresponds to shorter wavelength.$BODY_EN$,
      $BODY_KM$## ១. ទំនាក់ទំនងគ្រឹះនៃរលក
$$\lambda = v \cdot T = \frac{v}{f}$$
- $\lambda$ ៖ ប្រវែងរលក (ម៉ែត្រ $m$)
- $v$ ៖ ល្បឿនរលក ($m/s$)
- $T$ ៖ ខួប ($s$), $f$ ៖ ប្រេកង់ (ហឺត $Hz$)

## ២. រលកអេឡិចត្រូម៉ាញេទិច (EM Waves)
រលកអេឡិចត្រូម៉ាញេទិចធ្វើដំណើរក្នុងសុញ្ញាកាសដោយល្បឿនពន្លឺ ៖
$$c = 3 \times 10^8\text{ m/s}$$
$$\lambda = \frac{c}{f}$$
តាមលំដាប់ប្រេកង់កើនឡើង ៖ រលកវិទ្យុ $\rightarrow$ មីក្រូរលក $\rightarrow$ អាំងហ្វ្រារ៉េដ $\rightarrow$ ពន្លឺមើលឃើញ $\rightarrow$ យូវី $\rightarrow$ កាំរស្មី $X$ $\rightarrow$ កាំរស្មីហ្គាម៉ា ($\gamma$)។$BODY_KM$,
      26,
      50,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Alternating Current RLC Circuits & Resonance (physics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Alternating Current RLC Circuits & Resonance',
      'សៀគ្វីចរន្តឆ្លាស់ RLC និងបាតុភូតរ៉េសូណង់',
      'AC impedance, inductive reactance Lω, capacitive reactance 1/Cω, phasor diagrams, and resonance conditions',
      'អាំងប៉េដង់ Z = √(R² + (Lω - 1/Cω)²) មុំផាស tan φ និងប្រេកង់រ៉េសូណង់ f₀ = 1 / (2π√(LC))',
      $BODY_EN$## RLC Circuits
Impedance $Z = \sqrt{R^2 + (L\omega - 1/(C\omega))^2}$. At resonance $L\omega = 1/(C\omega)$, impedance is minimized ($Z = R$) and current peaks.$BODY_EN$,
      $BODY_KM$## ១. អាំងប៉េដង់សរុបនៃសៀគ្វី RLC
$$Z = \sqrt{R^2 + \left(L\omega - \frac{1}{C\omega}\right)^2}$$
- $R$ ៖ រេស៊ីស្តង់ ($\Omega$)
- $Z_L = L\omega$ ៖ រេអាក់តង់អាំងឌុចទីវ
- $Z_C = \frac{1}{C\omega}$ ៖ រេអាក់តង់កាប៉ាស៊ីទីវ

## ២. បាតុភូតរ៉េសូណង់អគ្គិសនី (Electrical Resonance)
កើតឡើងនៅពេល $Z_L = Z_C \iff L\omega = \frac{1}{C\omega}$៖
- អាំងប៉េដង់តូចបំផុត ៖ $Z_{\min} = R$
- ចរន្តធំបំផុត ៖ $I_{\max} = \frac{U}{R}$
- ប្រេកង់រ៉េសូណង់ ៖
  $$f_0 = \frac{1}{2\pi\sqrt{LC}}$$$BODY_KM$,
      28,
      50,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Simple Harmonic Motion: Pendulums & Springs (physics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Simple Harmonic Motion: Pendulums & Springs',
      'លំយោលសេរី ៖ ប៉ោលទោល និងប៉ោលអេឡាស្ទិច (ត្រៀមបាក់ឌុប)',
      'Simple pendulum period T = 2π√(l/g), spring-mass oscillation T = 2π√(m/k), and harmonic equation x(t) = Xm cos(ωt + φ)',
      'ខួបប៉ោលទោល T = 2π√(l/g) ខួបប៉ោលរ៉ឺស័រ T = 2π√(m/k) និងសមីការចលនាលំយោល x(t) = Xm cos(ωt + φ)',
      $BODY_EN$## Harmonic Oscillators
Spring period $T = 2\pi\sqrt{m/k}$. Simple pendulum period $T = 2\pi\sqrt{l/g}$ (independent of pendulum mass for small angles).$BODY_EN$,
      $BODY_KM$## ១. ប៉ោលអេឡាស្ទិច (Spring Oscillator)
$$T = 2\pi \sqrt{\frac{m}{k}}$$
- $m$ ៖ ម៉ាស ($kg$), $k$ ៖ ថេររឹងរ៉ឺស័រ ($N/m$)
- ថាមពលមេកានិចសរុប ៖
  $$E_m = \frac{1}{2} k X_m^2 = \text{ថេរ}$$

## ២. ប៉ោលទោល (Simple Pendulum)
ចំពោះមុំលំយោលតូច ($\alpha_0 \leq 10^\circ$) ៖
$$T = 2\pi \sqrt{\frac{l}{g}}$$
- $l$ ៖ ប្រវែងខ្សែប៉ោល ($m$), $g$ ៖ សំទុះទំនាញដី ($m/s^2$)
- ខួបនៃប៉ោលទោល **មិនអាស្រ័យនឹងម៉ាស** នៃដុំប៉ោលឡើយ!$BODY_KM$,
      26,
      45,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Nuclear Physics: Radioactive Decay & E = mc² (physics - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'physics';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Nuclear Physics: Radioactive Decay & E = mc²',
      'រូបវិទ្យានុយក្លេអ៊ែរ ៖ វិទ្យុសកម្ម និង E = mc²',
      'Alpha, beta, gamma decay, half-life decay law N(t) = N0 e^(-λt), mass defect, and Einstein''s mass-energy equivalence',
      'កាំរស្មី α, β, γ ច្បាប់ពាក់កណ្តាលជីវិត N(t) = N₀ · 2^(-t/T) កំហាតម៉ាស និងសមភាពអែងស្តែង E = mc²',
      $BODY_EN$## Nuclear Physics
Decay follows $N(t) = N_0 \cdot 2^{-t/T}$. Einstein's relation $E = \Delta m c^2$ explains immense binding energy from nuclear mass defect.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់បំបែកវិទ្យុសកម្ម (Radioactive Half-Life)
$$N(t) = N_0 \cdot 2^{-\frac{t}{T}} = N_0 \cdot e^{-\lambda t}$$
- $N_0$ ៖ ចំនួនណ្វៃយ៉ូដើម
- $T$ ៖ ថេរពាក់កណ្តាលជីវិត (Half-life)
- $\lambda = \frac{\ln 2}{T} \approx \frac{0.693}{T}$ ៖ ថេរបំបែក

## ២. សមមូលម៉ាស និងថាមពល (សមភាព Einstein)
$$E = m \cdot c^2$$
ថាមពលចងភ្ជាប់ណ្វៃយ៉ូ ៖
$$\Delta E = \Delta m \cdot c^2 = (Z m_p + N m_n - M_{\text{nucleus}}) \cdot c^2$$
($1\text{ u} \approx 931.5\text{ MeV}$)$BODY_KM$,
      26,
      50,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Advanced Chemical Kinetics (Bac II) (chemistry - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Advanced Chemical Kinetics (Bac II)',
      'ស៊ីនេទិចគីមីកម្រិតខ្ពស់ និងល្បឿនប្រតិកម្ម (ត្រៀមបាក់ឌុប)',
      'Rate law expressions, reaction order, Arrhenius activation energy equation k = A e^(-Ea/RT), and catalysts',
      'ច្បាប់ល្បឿន v = k · [A]^m [B]^n លំដាប់ប្រតិកម្ម ថាមពលសកម្មកម្ម Ea និងសមីការ Arrhenius',
      $BODY_EN$## Advanced Kinetics
Rate law $v = k [A]^m [B]^n$. Arrhenius equation connects temperature and activation energy $E_a$: $k = A e^{-E_a/RT}$.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់ល្បឿនប្រតិកម្ម (Rate Law)
ចំពោះប្រតិកម្ម $aA + bB \rightarrow \text{Products}$៖
$$v = k \cdot [A]^m [B]^n$$
- $k$ ៖ ថេរល្បឿន (ប្រែប្រួលតាមសីតុណ្ហភាព)
- $m, n$ ៖ លំដាប់ដោយផ្នែក (កំណត់ដោយការពិសោធន៍)
- លំដាប់ប្រតិកម្មសរុប ៖ $m + n$

## ២. សមីការ Arrhenius
$$k = A \cdot e^{-\frac{E_a}{R T}}$$
- $E_a$ ៖ ថាមពលសកម្មកម្ម ($J/mol$)
- កាតាលីករជួយពន្លឿនប្រតិកម្មដោយ **បន្ថយថាមពលសកម្មកម្ម $E_a$**។$BODY_KM$,
      26,
      50,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Chemical Equilibrium & Kc / Kp Calculations (chemistry - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Chemical Equilibrium & Kc / Kp Calculations',
      'សមតុល្យគីមី និងថេរលំនឹង Kc (ត្រៀមបាក់ឌុប)',
      'Equilibrium constant expressions Kc and Kp = Kc(RT)^Δn, ICE tables, and reaction quotient Q comparisons',
      'ការគណនា Kc និង Kp តារាង ICE (Initial, Change, Equilibrium) ផលធៀបប្រតិកម្ម Q និងទិសដៅរំកិលលំនឹង',
      $BODY_EN$## Equilibrium Dynamics
$K_p = K_c(RT)^{\Delta n}$. Comparing reaction quotient $Q$ against $K_c$ predicts the thermodynamic shift direction.$BODY_EN$,
      $BODY_KM$## ១. ទំនាក់ទំនងរវាង $K_p$ និង $K_c$
$$K_p = K_c \cdot (R T)^{\Delta n}$$
- $\Delta n = \sum n_{\text{gas (products)}} - \sum n_{\text{gas (reactants)}}$

## ២. ផលធៀបប្រតិកម្ម ($Q$)
- បើ $Q < K_c$ ៖ ប្រព័ន្ធរំកិលទៅ **ទិសដៅមុខ (បង្កើតផល)**
- បើ $Q = K_c$ ៖ ប្រព័ន្ធស្ថិតក្នុង **សមតុល្យ**
- បើ $Q > K_c$ ៖ ប្រព័ន្ធរំកិលទៅ **ទិសដៅច្រាស (បង្កើតប្រតិករ)**$BODY_KM$,
      26,
      50,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Acid-Base Titration & pH Buffers (Bac II) (chemistry - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Acid-Base Titration & pH Buffers (Bac II)',
      'អាស៊ីត-បាស គណនា pH និង Titration (ត្រៀមបាក់ឌុប)',
      'Weak acid ionization Ka, buffer solutions, titration equivalence point C_A·V_A = C_B·V_B, and Henderson-Hasselbalch',
      'អាស៊ីតខ្លាំង-បាសខ្លាំង អាស៊ីតខ្សោយ Ka, pKa = -log Ka ចំណុចសមមូលទីត្រាស និងសមីការ Henderson-Hasselbalch',
      $BODY_EN$## Acid-Base Calculations
Strong acids: $pH = -\log[H_3O^+]$. Equivalence point in titration: $C_A V_A = C_B V_B$. Buffers follow $pH = pKa + \log([A^-]/[HA])$.$BODY_EN$,
      $BODY_KM$## ១. រូបមន្តគណនា pH
- **អាស៊ីតខ្លាំង ៖** $\text{pH} = -\log [H_3O^+]$
- **បាសខ្លាំង ៖** $\text{pH} = 14 + \log [OH^-]$
- **អាស៊ីតខ្សោយ ៖** $\text{pH} = \frac{1}{2}(\text{p}K_a - \log C_a)$
- **បាសខ្សោយ ៖** $\text{pH} = 14 - \frac{1}{2}(\text{p}K_b - \log C_b)$

## ២. ចំណុចសមមូលនៃការធ្វើទីត្រាស (Equivalence Point)
$$C_A \cdot V_A = C_B \cdot V_B$$
នៅចំណុចសមមូល ចំនួនម៉ូល $H^+$ ពីអាស៊ីត ស្មើនឹងចំនួនម៉ូល $OH^-$ ពីបាស។$BODY_KM$,
      28,
      50,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Esters, Triglycerides & Saponification (chemistry - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Esters, Triglycerides & Saponification',
      'អេស្ទែរ ខ្លាញ់ និងប្រតិកម្មសាប៊ូកម្ម (Saponification)',
      'Esterification equilibrium, pleasant fruit aromas, lipid triglycerides, and basic hydrolysis saponification',
      'ប្រតិកម្មអេស្ទែរកម្ម RCOOH + R''OH ⇌ RCOOR'' + H₂O ទ្រីគ្លីសេរីដ និងការផលិតសាប៊ូជាមួយ NaOH',
      $BODY_EN$## Esters & Saponification
Esters form from acid + alcohol. Alkaline hydrolysis of triglycerides produces fatty acid carboxylate salts (soap) and glycerol.$BODY_EN$,
      $BODY_KM$## ១. ប្រតិកម្មអេស្ទែរកម្ម (Esterification)
$$\text{R-COOH} + \text{R'-OH} \xrightleftharpoons[\Delta]{\text{H}_2\text{SO}_4} \text{R-COO-R'} + \text{H}_2\text{O}$$
- អេស្ទែរមានក្លិនក្រអូបផ្លែឈើ (ឧ. ចេកទុំ ម្នាស់ ផ្លែប៉ោម)

## ២. ប្រតិកម្មសាប៊ូកម្ម (Saponification)
ការដុតកម្តៅខ្លាញ់ ឬប្រេង (Triglycerides) ជាមួយបាសខ្លាំង ($NaOH$ ឬ $KOH$) បង្កើតបានជា **សាប៊ូ (អំបិលអាស៊ីតខ្លាញ់)** និងគ្លីសេរ៉ូល ៖
$$\text{ខ្លាញ់} + 3\text{NaOH} \rightarrow 3\text{R-COONa (សាប៊ូ)} + \text{C}_3\text{H}_5(\text{OH})_3$$$BODY_KM$,
      24,
      45,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Electrochemistry: Galvanic Cells & Electrolysis (chemistry - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'chemistry';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Electrochemistry: Galvanic Cells & Electrolysis',
      'អេឡិចត្រូគីមី ៖ ពីលហ្គាល់វ៉ានិច និងអេឡិចត្រូលីស',
      'Daniell galvanic cells, standard reduction potentials E°, cell EMF, and Faraday''s law of electrolysis m = (M·I·t)/(n·F)',
      'ពីលដាញ៉ែល អានូត (-) កាតូត (+) កម្លាំងអគ្គិសនីចលករ E°_cell = E°_cathode - E°_anode និងច្បាប់ហ្វារ៉ាដេ',
      $BODY_EN$## Electrochemistry
Galvanic cells convert chemical potential into electricity: $E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}$. Electrolysis mass follows $m = \frac{MIt}{nF}$.$BODY_EN$,
      $BODY_KM$## ១. ពីលហ្គាល់វ៉ានិច (Galvanic Cell)
បំប្លែងថាមពលគីមីទៅជាថាមពលអគ្គិសនី ៖
- **អានូត (Anode, ប៉ូល $-$) ៖** កន្លែងកើតអុកស៊ីតកម្ម (បោះបង់ $e^-$)
- **កាតូត (Cathode, ប៉ូល $+$) ៖** កន្លែងកើតរេដុកកម្ម (ទទួល $e^-$)
- កម្លាំងអគ្គិសនីចលករស្តង់ដារ ៖
  $$E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}$$

## ២. អេឡិចត្រូលីស និងច្បាប់ហ្វារ៉ាដេ
ម៉ាសសារធាតុរំដោះនៅអេឡិចត្រូត ៖
$$m = \frac{M \cdot I \cdot t}{n \cdot F}$$
($F = 96500\text{ C/mol}$ ៖ ថេរហ្វារ៉ាដេ)$BODY_KM$,
      26,
      50,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Molecular Genetics: Replication & Genetic Code (Bac II) (biology - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Molecular Genetics: Replication & Genetic Code (Bac II)',
      'ហ្សែនវិទ្យាម៉ូលេគុល ៖ DNA Replication & Genetic Code',
      'Watson-Crick antiparallel double helix, semiconservative replication via DNA polymerase, and the universal 64-codon table',
      'ទម្រង់ Helix ភ្លោះ Watson-Crick ការស្វ័យតម្រងទ្វេពាក់កណ្តាលរក្សាទុក DNA Polymerase និងកូដពន្ធុ ៦៤ កូដុង',
      $BODY_EN$## Molecular Genetics
Antiparallel double helix DNA binds via complementary base pairing: A=T (2 H-bonds) and G≡C (3 H-bonds). Replication is semiconservative.$BODY_EN$,
      $BODY_KM$## ១. រចនាសម្ព័ន្ធ DNA (Watson & Crick, 1953)
DNA ជារាង Helix ភ្លោះស្របបញ្ច្រាសទិសគ្នា ($5' \rightarrow 3'$ និង $3' \rightarrow 5'$) ផ្សំឡើងពី ៤ នុយក្លេអូទីត ភ្ជាប់គ្នាដោយសម្ព័ន្ធអ៊ីដ្រូសែនតាមច្បាប់បំពេញបាស ៖
- $A$ ភ្ជាប់នឹង $T$ ដោយសម្ព័ន្ធអ៊ីដ្រូសែន $2$
- $G$ ភ្ជាប់នឹង $C$ ដោយសម្ព័ន្ធអ៊ីដ្រូសែន $3$

## ២. ការស្វ័យតម្រងទ្វេពាក់កណ្តាលរក្សាទុក (Semiconservative)
ខ្សែស្រឡាយកូននីមួយៗផ្សំឡើងពី **ខ្សែស្រឡាយមេ ១** និង **ខ្សែស្រឡាយថ្មី ១** ដែលសំយោគដោយអង់ស៊ីម DNA Polymerase។$BODY_KM$,
      26,
      50,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mendelian Genetics & Dihybrid Crosses (Bac II) (biology - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Mendelian Genetics & Dihybrid Crosses (Bac II)',
      'ច្បាប់តំណពូជរបស់ម៉ង់ដែល និងការបំប្លែងហ្សែន',
      'Mendel''s laws of segregation (3:1 monohybrid) and independent assortment (9:3:3:1 dihybrid Punnett square ratios)',
      'ច្បាប់ឯកសណ្ឋានជំនាន់ F1 ច្បាប់បំបែកលក្ខណៈ F2 (3:1) និងច្បាប់ផ្គុំដោយឯករាជ្យនៃកូនកាត់ពីរគូ (9:3:3:1)',
      $BODY_EN$## Mendelian Inheritance
Monohybrid $F_2$ yields a 3:1 phenotypic ratio (1:2:1 genotypic). Dihybrid crosses of independent unlinked traits yield 9:3:3:1.$BODY_EN$,
      $BODY_KM$## ១. ច្បាប់ម៉ង់ដែល (Mendel's Laws)
1. **ច្បាប់ឯកសណ្ឋាននៃជំនាន់ $F_1$ ៖** កូនកាត់ជំនាន់ $F_1$ មានរូបរាងដូចគ្នាទាំងអស់ ($100\%$ ដូចលក្ខណៈត្រួត)
2. **ច្បាប់បំបែកលក្ខណៈនៅជំនាន់ $F_2$ (កូនកាត់មួយគូ) ៖**
   - សមាមាត្ររូប (Phenotype) ៖ $3 \text{ ត្រួត} : 1 \text{ បន្ទាប់}$
   - សមាមាត្រពន្ធុ (Genotype) ៖ $1 AA : 2 Aa : 1 aa$
3. **ច្បាប់ផ្គុំដោយឯករាជ្យ (កូនកាត់ពីរគូ) ៖**
   - សមាមាត្ររូប $F_2$ ៖ $9 : 3 : 3 : 1$$BODY_KM$,
      26,
      50,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Genetic Engineering, Recombinant DNA & PCR (biology - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Genetic Engineering, Recombinant DNA & PCR',
      'វិស្វកម្មហ្សែន និងបច្ចេកវិទ្យាជីវសាស្ត្រ',
      'Restriction endonucleases, plasmid DNA cloning, Polymerase Chain Reaction (PCR) DNA amplification, and transgenic GMOs',
      'អង់ស៊ីមកាត់កំណត់ (Restriction Enzymes) ប្លាស្មីតវ៉ិចទ័រ ក្លូនហ្សែន បច្ចេកទេស PCR និងសារពាង្គកាយកែប្រែហ្សែន (GMO)',
      $BODY_EN$## Biotechnology
Recombinant DNA inserts target genes into bacterial plasmids for therapeutic synthesis. PCR amplifies DNA geometrically.$BODY_EN$,
      $BODY_KM$## ១. បច្ចេកវិទ្យា DNA រេកុំប៊ីណង់ (Recombinant DNA)
- ប្រើ **អង់ស៊ីមកាត់កំណត់ (Restriction Enzymes)** កាត់ហ្សែនដែលចង់បាន (ឧ. ហ្សែនផលិតអាំងស៊ុយលីនមនុស្ស)
- បញ្ចូលហ្សែននោះទៅក្នុង **ប្លាស្មីត (Plasmid)** របស់បាក់តេរី ដោយប្រើអង់ស៊ីម Ligase
- បញ្ចូលប្លាស្មីតទៅក្នុងបាក់តេរី $E. coli$ ដើម្បីផលិតអាំងស៊ុយលីនយ៉ាងច្រើនសន្ធឹកសន្ធាប់

## ២. បច្ចេកទេស PCR (Polymerase Chain Reaction)
ចម្លងបង្កើនបរិមាណបំណែក DNA រាប់លានដងក្នុងរយៈពេលប៉ុន្មានម៉ោង។$BODY_KM$,
      24,
      45,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Immunology: Cellular Immunity & Vaccines (biology - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Immunology: Cellular Immunity & Vaccines',
      'ប្រព័ន្ធការពាររាងកាយ Immunology និងវ៉ាក់សាំង',
      'Humoral B-cell antibody immunity, cell-mediated cytotoxic CD8+ T cells, MHC recognition, and mRNA vaccine platforms',
      'កោសិកា B ផលិតអង់ទីគ័រ កោសិកា T ស៊ីតូតុកស៊ីក ភាពស៊ាំកោសិកា និងវ៉ាក់សាំង mRNA សម័យទំនើប',
      $BODY_EN$## Immunology
Adaptive immunity involves B-cell humoral antibodies and T-cell mediated cytotoxicity destroying infected host cells.$BODY_EN$,
      $BODY_KM$## ១. ភាពស៊ាំកម្រិតខ្ពស់ (Adaptive Immunity)
1. **ភាពស៊ាំតាមរយៈសារធាតុរាវ (Humoral) ៖**
   - **កោសិកា B (B-cells) ៖** បំប្លែងជាប្លាស្មូស៊ីត ផលិត **អង់ទីគ័រ (Antibodies)** ទៅចងភ្ជាប់ និងបន្សាបអង់ទីហ្សែនមេរោគ
2. **ភាពស៊ាំតាមរយៈកោសិកា (Cell-Mediated) ៖**
   - **កោសិកា T ស៊ីតូតុកស៊ីក (Killer T-cells) ៖** កម្ទេចកោសិកាដែលផ្ទុកមេរោគ ឬកោសិកាមហារីកដោយផ្ទាល់$BODY_KM$,
      24,
      45,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Evolutionary Biology & Natural Selection (biology - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'biology';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Evolutionary Biology & Natural Selection',
      'វិវត្តន៍នៃភាវៈរស់ និងទ្រឹស្តី Darwin',
      'Darwin''s natural selection theory, differential reproductive fitness, homologous structures, and speciation mechanisms',
      'ទ្រឹស្តីជម្រើសធម្មជាតិរបស់ Charles Darwin ការសម្របខ្លួន ភស្តុតាងផូស៊ីល និងការកកើតប្រភេទថ្មី',
      $BODY_EN$## Evolutionary Biology
Natural selection favors adaptive phenotypes. Homologous anatomical structures provide evidence of shared common ancestry.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីជម្រើសធម្មជាតិ (Natural Selection)
Charles Darwin បានបង្ហាញថា ភាវៈរស់ណាដែលមានលក្ខណៈប្រែប្រួល **សម្របខ្លួនបានល្អបំផុតជាមួយបរិស្ថាន** នឹងមានឱកាសរស់រានមានជីវិតខ្ពស់ជាងគេ និងបន្តពូជបញ្ជូនហ្សែនល្អនោះទៅជំនាន់ក្រោយ។

## ២. ភស្តុតាងនៃការវិវត្តន៍
- **ផូស៊ីល ៖** បង្ហាញពីការវិវត្តន៍រូបរាងសត្វតាមយុគសម័យ
- **សរីរាង្គអូម៉ូឡូក (Homologous Structures) ៖** ដៃមនុស្ស ជើងសេះ ព្រុយត្រីបាឡែន និងស្លាបប្រចៀវ មានឆ្អឹងគ្រោងដូចគ្នាពីបុព្វបុរសរួម!$BODY_KM$,
      22,
      40,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Astrophysics, Stellar Evolution & The Big Bang (earth - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Astrophysics, Stellar Evolution & The Big Bang',
      'តារារូបវិទ្យា ជីវិតផ្កាយ និង Big Bang',
      'The Big Bang theory 13.8 billion years ago, cosmic microwave background, stellar fusion, and Hubble expansion law',
      'ការកកើតចក្រវាល Big Bang ច្បាប់ Hubble v = H₀ · d ការលាយនុយក្លេអ៊ែរក្នុងផ្កាយ និងប្រហោងខ្មៅ',
      $BODY_EN$## Astrophysics & Cosmogenesis
The Big Bang initiated cosmic expansion 13.8 billion years ago ($v = H_0 d$). Stars generate energy via hydrogen fusion into helium.$BODY_EN$,
      $BODY_KM$## ១. ទ្រឹស្តីបន្ទុះធំ (Big Bang Theory)
ចក្រវាលកកើតឡើងកាលពីប្រហែល **១៣.៨ ពាន់លានឆ្នាំមុន** ពីចំណុចតូចបំផុតដែលមានដង់ស៊ីតេ និងកម្តៅអនន្ត (Singularity)។
- **ច្បាប់ Hubble ៖** កាឡាក់ស៊ីកាន់តែឆ្ងាយ រំកិលចេញពីយើងកាន់តែលឿន ($v = H_0 \cdot d$) បញ្ជាក់ថាចក្រវាលកំពុងរីកមាឌឥតឈប់ឈរ!

## ២. វដ្តជីវិតនៃផ្កាយ
ផ្កាយដូចព្រះអាទិត្យឆេះដោយសារ **ប្រតិកម្មច្របល់នុយក្លេអ៊ែរ (Nuclear Fusion)** ៖
$$4\text{ }^1_1H \rightarrow \text{ }^4_2He + 2e^+ + 2\nu + \text{ថាមពលមហាសាល}$$
ផ្កាយធំៗពេលអស់ឥន្ធនៈ នឹងផ្ទុះជា **Supernova** បង្កើតជាផ្កាយណឺត្រុង ឬប្រហោងខ្មៅ (Black Hole)។$BODY_KM$,
      24,
      45,
      true,
      1
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mekong Basin Water Governance & Dam Impacts (earth - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Mekong Basin Water Governance & Dam Impacts',
      'ការគ្រប់គ្រងធនធានទឹក និងទំនប់វារីអគ្គិសនីទន្លេមេគង្គ',
      'Sediment trapping behind upstream cascade dams, Tonle Sap pulse suppression, salinity intrusion, and MRC treaties',
      'លំហូរដីល្បាប់ធម្មជាតិ ការថយចុះ ៥០% ជម្រកត្រីបឹងទន្លេសាប និងគណៈកម្មការទន្លេមេគង្គ (MRC)',
      $BODY_EN$## Mekong River Hydropolitics
Hydropower dams trap essential riverine sediments and dampen flood pulses, requiring multilateral Mekong River Commission coordination.$BODY_EN$,
      $BODY_KM$## ១. បញ្ហាប្រឈមនៃអាងទន្លេមេគង្គ
ទំនប់វារីអគ្គិសនីនៅផ្នែកខាងលើនៃទន្លេមេគង្គបានកាត់បន្ថយលំហូរដីល្បាប់ធម្មជាតិជាង $50\%$ មកកាន់កម្ពុជា៖
- ធ្វើឱ្យបាត់បង់ជម្រកត្រី និងជីវចម្រុះក្នុងបឹងទន្លេសាប
- នាំឱ្យមានការជ្រៀតចូលនៃទឹកប្រៃនៅតំបន់ដីសណ្ត
- ដំណោះស្រាយ ៖ ការគ្រប់គ្រងធនធានទឹករួមគ្នាតាមរយៈគណៈកម្មការទន្លេមេគង្គ ($MRC$) និងការងាកទៅរកថាមពលកកើតឡើងវិញ។$BODY_KM$,
      22,
      45,
      true,
      2
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodia National Climate Strategy & NDC (earth - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Cambodia National Climate Strategy & NDC',
      'យុទ្ធសាស្ត្រជាតិស្តីពីការប្រែប្រួលអាកាសធាតុ (MoEYS Policy)',
      'Cambodia Nationally Determined Contributions (NDC), renewable solar grid expansion, forest REDD+ carbon credits',
      'ការកាត់បន្ថយការបំភាយឧស្ម័នផ្ទះកញ្ចក់ ថាមពលព្រះអាទិត្យ ៦០% ឥណទានកាបូន REDD+ និងកិច្ចព្រមព្រៀងប៉ារីស',
      $BODY_EN$## Cambodia Climate Framework
Targets include expanding grid solar past 60%, forest conservation financing via REDD+, and climate-resilient agricultural adaptation.$BODY_EN$,
      $BODY_KM$## ១. ផែនការយុទ្ធសាស្ត្រអាកាសធាតុកម្ពុជា
កម្ពុជាបានដាក់ចេញផែនការយុទ្ធសាស្ត្រឆ្លើយតបនឹងការប្រែប្រួលអាកាសធាតុ ៖
1. **បង្កើនការប្រើប្រាស់ថាមពលកកើតឡើងវិញ ៖** ជំរុញថាមពលពន្លឺព្រះអាទិត្យ (Solar) ឱ្យបានលើស $60\%$ នៃបណ្តាញជាតិ
2. **ការការពារព្រៃឈើ និង REDD+ ៖** ទប់ស្កាត់ការកាប់បំផ្លាញព្រៃឈើ និងលក់ឥណទានកាបូន
3. **កសិកម្មឆ្លាតវៃធន់នឹងអាកាសធាតុ ៖** ប្រើប្រាស់ពូជស្រូវធន់នឹងភាពរាំងស្ងួត និងទឹកជំនន់$BODY_KM$,
      22,
      45,
      true,
      3
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Natural Disasters & Early Warning Systems (earth - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Natural Disasters & Early Warning Systems',
      'គ្រោះមហន្តរាយធម្មជាតិ និងប្រព័ន្ធព្រមានទុកជាមុន',
      'Tropical cyclones, flash flood hydrological modeling, tsunami buoys, and national early warning telemetry',
      'ព្យុះទីហ្វុង ទឹកជំនន់រហ័ស រលកយក្សស៊ូណាមិ ផ្កាយរណបឧតុនិយម និងប្រព័ន្ធឆ្លើយតបគ្រោះមហន្តរាយ',
      $BODY_EN$## Disaster Preparedness
Satellite remote sensing, Doppler radar, and automated river stage telemetry provide life-saving early flood alerts.$BODY_EN$,
      $BODY_KM$## ១. ប្រព័ន្ធព្រមានទុកជាមុន (Early Warning Systems)
ការប្រើប្រាស់រូបភាពផ្កាយរណបឧតុនិយម រ៉ាដា និងស្ថានីយជលសាស្ត្រស្វ័យប្រវត្តិតាមបណ្តោយដងទន្លេ ដើម្បីព្យាករណ៍ និងជូនដំណឹងដល់ប្រជាពលរដ្ឋបានទាន់ពេលវេលា មុនពេលទឹកជំនន់ ឬព្យុះវាយប្រហារ ជួយសង្គ្រោះអាយុជីវិត និងទ្រព្យសម្បត្តិ។$BODY_KM$,
      20,
      40,
      true,
      4
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Renewable Energy & Cambodia's Green Future (earth - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'earth';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Renewable Energy & Cambodia''s Green Future',
      'ថាមពលកកើតឡើងវិញ និងអនាគតបៃតងកម្ពុជា',
      'Solar photovoltaics, biomass gasification, small run-of-river hydro, circular economy, and 2050 carbon neutrality roadmap',
      'ថាមពលពន្លឺព្រះអាទិត្យ ជីវម៉ាស វារីអគ្គិសនីខ្នាតតូច សេដ្ឋកិច្ចវិលជុំ និងអព្យាក្រឹតភាពកាបូនឆ្នាំ ២០៥០',
      $BODY_EN$## Green Future Roadmap
Cambodia's Long-Term Strategy for Carbon Neutrality by 2050 commits to zero new coal plants, massive solar grid expansion, and circular waste recycling.$BODY_EN$,
      $BODY_KM$## ១. ផែនទីបង្ហាញផ្លូវអព្យាក្រឹតភាពកាបូនឆ្នាំ ២០៥០
កម្ពុជាបានប្តេជ្ញាចិត្តសម្រេចឱ្យបាន **អព្យាក្រឹតភាពកាបូន (Carbon Neutrality) នៅឆ្នាំ ២០៥០** តាមរយៈ៖
- ការបញ្ឈប់ការសាងសង់រោងចក្រអគ្គិសនីដុតធ្យូងថ្មថ្មី
- ការពង្រីកកសិដ្ឋានសូឡាខ្នាតធំនៅខេត្តកំពង់ឆ្នាំង កំពង់ស្ពឺ ពោធិ៍សាត់
- ការលើកកម្ពស់សេដ្ឋកិច្ចវិលជុំ (Circular Economy) កែច្នៃធនធាន$BODY_KM$,
      22,
      45,
      true,
      5
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Khmer Poetic Meters (Kak-Kati & 7-Syllable Meter) (khmer - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Khmer Poetic Meters (Kak-Kati & 7-Syllable Meter)',
      'កាព្យឃ្លោងខ្មែរ (បទកាកគតិ និងបទពាក្យ ៧)',
      'Rhythm, syllable counts, and rhyme schemes in traditional Khmer poetry',
      'សិក្សាចង្វាក់ ចំនួនព្យាង្គ និងចំណាប់ចុងចួននៃបទកាកគតិ និងបទពាក្យប្រាំពីរ',
      $BODY_EN$## 1. Kak-Kati Poetic Form
The Kak-Kati meter consists of 7 phrases of 4 syllables each (28 syllables total per stanza).

## 2. 7-Syllable Meter (Pathya Vat)
Contains 4 lines of 7 syllables each with strict internal and external rhyme schemes.$BODY_EN$,
      $BODY_KM$## ១. បទកាកគតិ (៧ ឃ្លាក្នុងមួយល្បះ)
បទកាកគតិមាន ៧ ឃ្លាក្នុងមួយល្បះ ហើយឃ្លានីមួយៗមាន ៤ ព្យាង្គ (សរុប ២៨ ព្យាង្គ)៖
- **ឃ្លាទី១** ចួននឹង **ឃ្លាទី២** (ព្យាង្គទី៤ ចួននឹងព្យាង្គទី៤)
- **ឃ្លាទី២** ចួននឹង **ឃ្លាទី៣** (ព្យាង្គទី៤ ចួននឹងព្យាង្គទី២)
- **ឃ្លាទី៥** ចួននឹង **ឃ្លាទី៦** (ព្យាង្គទី៤ ចួននឹងព្យាង្គទី៤)
- **ឃ្លាទី៧** ចួននឹងឃ្លាទី២ នៃល្បះបន្ទាប់ (ចំណាប់ចួនឆ្លងល្បះ)

## ២. បទពាក្យ ៧
បទពាក្យ ៧ មាន ៤ ឃ្លាក្នុងមួយល្បះ ឃ្លានីមួយៗមាន ៧ ព្យាង្គ (សរុប ២៨ ព្យាង្គ)៖
- ព្យាង្គទី៧ នៃឃ្លាទី១ ចួននឹងព្យាង្គទី៤ នៃឃ្លាទី២
- ព្យាង្គទី៧ នៃឃ្លាទី២ ចួននឹងព្យាង្គទី៧ នៃឃ្លាទី៣ និងព្យាង្គទី៤ នៃឃ្លាទី៤$BODY_KM$,
      20,
      35,
      true,
      101
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Parts of Speech: Nouns, Verbs & Adjectives (khmer - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Parts of Speech: Nouns, Verbs & Adjectives',
      'ថ្នាក់ពាក្យ នាម កិរិយា និងគុណនាម',
      'Classification of word classes and syntactic roles in Khmer grammar',
      'ការបែងចែកថ្នាក់ពាក្យ និងមុខងារវេយ្យាករណ៍ក្នុងប្រយោគភាសាខ្មែរ',
      $BODY_EN$## 1. Khmer Word Classes
Nouns name people and concepts. Verbs denote actions. In Khmer syntax, adjectives strictly follow the noun they modify.$BODY_EN$,
      $BODY_KM$## ១. នាម (Nouns)
នាម គឺជាពាក្យសម្រាប់សម្គាល់ឈ្មោះមនុស្ស សត្វ វត្ថុ ឬគំនិតអរូបី (ដូចជា៖ សិស្ស, ផ្ទះ, សៀវភៅ, សេចក្តីស្រឡាញ់)។

## ២. កិរិយាស័ព្ទ (Verbs)
កិរិយា បញ្ជាក់ពីសកម្មភាព ឬដំណើរប្រព្រឹត្តទៅ (ដូចជា៖ រៀន, ដើរ, សរសេរ, គិត)។

## ៣. គុណនាម (Adjectives)
គុណនាម បញ្ជាក់លក្ខណៈរបស់នាម (ដូចជា៖ ឆ្លាត, ស្អាត, ខ្ពស់, ធំ)។ ក្នុងភាសាខ្មែរ គុណនាមតែងតែនៅ **ខាងក្រោយ** នាម។$BODY_KM$,
      18,
      35,
      true,
      102
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodian Prehistory: Laang Spean & Samrong Sen (history - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Cambodian Prehistory: Laang Spean & Samrong Sen',
      'បុរេប្រវត្តិសាស្ត្រកម្ពុជា (ស្ថានីយល្អាងស្ពាន និងសំរោងសែន)',
      'Archaeological evidence of Paleolithic, Neolithic, and Bronze ages in Cambodia',
      'ភស្តុតាងបុរាណវិទ្យាអំពីមនុស្សសម័យថ្មបំបែក ថ្មរំលីង និងយុគសំរឹទ្ធនៅកម្ពុជា',
      $BODY_EN$## 1. Laang Spean Archaeological Site
Discovered in Battambang province, revealing Hoabinhian stone tool culture dating back over 7,000 BCE.

## 2. Samrong Sen Neolithic Site
Located in Kampong Chhnang, providing evidence of early pottery, polished stone adzes, and bronze metallurgy.$BODY_EN$,
      $BODY_KM$## ១. ស្ថានីយល្អាងស្ពាន (ខេត្តបាត់ដំបង)
ស្ថានីយល្អាងស្ពានផ្តល់ភស្តុតាងនៃការរស់នៅរបស់មនុស្សតាំងពីប្រមាណ ៧០០០ ឆ្នាំមុនគ.ស. (សម័យហ័រពិញៀន) ដោយរកឃើញឧបករណ៍ថ្មបំបែក និងសំណល់ឆ្អឹងសត្វ។

## ២. ស្ថានីយសំរោងសែន (ខេត្តកំពង់ឆ្នាំង)
ស្ថានីយសំរោងសែនជាកន្លែងរកឃើញឧបករណ៍យុគថ្មរំលីង និងយុគសំរឹទ្ធ រួមមានក្អម ឆ្នាំងដី ពូថៅថ្មរំលីង និងឧបករណ៍ធ្វើពីលោហៈធាតុសំរឹទ្ធ។$BODY_KM$,
      20,
      35,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Funan Kingdom: Origins & Oc Eo Maritime Trade (history - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Funan Kingdom: Origins & Oc Eo Maritime Trade',
      'នគរភ្នំ (ហ្វូណន)៖ ការកកើត និងពាណិជ្ជកម្មកំពង់ផែអូរកែវ',
      'Establishment of Cambodia''s earliest recorded state, maritime trade through Oc Eo, and early irrigation',
      'ការកកើតរដ្ឋដំបូងនៅកម្ពុជា ទំនាក់ទំនងពាណិជ្ជកម្មជាមួយឥណ្ឌានិងរ៉ូម និងប្រព័ន្ធធារាសាស្ត្រ',
      $BODY_EN$## 1. Establishment of Funan (1st - 6th Century CE)
Recorded by Chinese emissaries Kang Tai and Zhu Ying, Funan emerged as Southeast Asia's first centralized polity, founded through the union of Huntian (Preah Thong) and Liuye (Neang Neak).

## 2. Oc Eo Maritime Port
Oc Eo was a major cosmopolitan entrepot on maritime trade routes linking China, India, and the Roman Empire, yielding Roman medallions and gold artifacts.$BODY_EN$,
      $BODY_KM$## ១. ការកកើតរដ្ឋនគរភ្នំ (សតវត្សទី១ ដល់ ទី៦ នៃ គ.ស.)
តាមកំណត់ត្រាប្រវត្តិសាស្ត្រចិន (កាំងថាយ និងជូយីន) នគរភ្នំត្រូវបានកកើតឡើងដោយការរួបរួមរវាងព្រះថោង (ហ៊ុនទៀន) និងនាងនាគ (លីវយី)។ នេះជារដ្ឋដំបូងបង្អស់ដែលមានរចនាសម្ព័ន្ធរដ្ឋបាលច្បាស់លាស់នៅអាស៊ីអាគ្នេយ៍ដីគោក។

## ២. កំពង់ផែអូរកែវ និងបណ្តាញពាណិជ្ជកម្មអន្តរជាតិ
- **កំពង់ផែអូរកែវ** គឺជាមជ្ឈមណ្ឌលពាណិជ្ជកម្មអន្តរជាតិដ៏រុងរឿង តភ្ជាប់ផ្លូវសមុទ្ររវាងប្រទេសចិន ឥណ្ឌា និងចក្រភពរ៉ូម (រកឃើញកាក់ប្រាក់រ៉ូម៉ាំង និងគ្រឿងអលង្ការមាស)។
- ប្រជាជននគរភ្នំចេះជីកប្រឡាយធារាសាស្ត្រខ្វាត់ខ្វែងដើម្បីរំដោះទឹកជំនន់ និងដឹកជញ្ជូនទំនិញតាមទូក។$BODY_KM$,
      20,
      35,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Physical Geography of Cambodia: Mekong & Tonle Sap (geography - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Physical Geography of Cambodia: Mekong & Tonle Sap',
      'ភូមិសាស្ត្ររូបវន្តកម្ពុជា (ទន្លេមេគង្គ និងបឹងទន្លេសាប)',
      'Hydrological systems, reverse flow mechanics, and Tonle Sap biosphere',
      'ប្រព័ន្ធធារាសាស្ត្រធម្មជាតិ របបទឹកហូរច្រាសទិស និងជីវចម្រុះបឹងទន្លេសាប',
      $BODY_EN$## 1. Mekong River in Cambodia
Traverses approximately 500 km through Cambodia, providing rich alluvial sediment.

## 2. Tonle Sap Reverse Flow Phenomenon
During the monsoon season, high Mekong water forces the Tonle Sap River to flow backward into the great lake, expanding its area up to fivefold.$BODY_EN$,
      $BODY_KM$## ១. ទន្លេមេគង្គនៅកម្ពុជា
ទន្លេមេគង្គហូរកាត់កម្ពុជាប្រវែងប្រមាណ ៥០០ គីឡូម៉ែត្រ ចាប់ពីព្រំដែនឡាវ (ល្បាក់ខោន) កាត់ខេត្តស្ទឹងត្រែង ក្រចេះ កំពង់ចាម កណ្តាល និងភ្នំពេញ។

## ២. បាតុភូតទឹកហូរច្រាសទិសនៃបឹងទន្លេសាប
នៅរដូវវស្សា (ឧសភា-តុលា) ទឹកទន្លេមេគង្គឡើងខ្ពស់ ហូរច្រាសចូលបឹងទន្លេសាប ធ្វើឱ្យផ្ទៃក្រឡាបឹងរីកធំដល់ទៅ ៥ ដង (ពី ៣០០០ គម² ដល់ ១៥០០០ គម²)។ នៅរដូវប្រាំង ទឹកហូរត្រឡប់ចេញទៅទន្លេមេគង្គវិញ។$BODY_KM$,
      20,
      35,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Landforms & Climate: Cardamom Mountains & Monsoons (geography - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Landforms & Climate: Cardamom Mountains & Monsoons',
      'សណ្ឋានដី និងអាកាសធាតុកម្ពុជា (ជួរភ្នំក្រវាញ ដងរែក និងខ្យល់មូសុង)',
      'Four major physiographic regions: Cardamom & Dangrek ranges, plains, coastal zone, and monsoons',
      'ការបែងចែកតំបន់ភូមិសាស្ត្រធំៗទាំង ៤ នៃកម្ពុជា និងរបបខ្យល់មូសុងប្រចាំឆ្នាំ',
      $BODY_EN$## 1. Cambodia's Physiographic Zones
Cambodia features 4 primary domains: the central alluvial floodplain (Mekong-Tonle Sap basin), the surrounding highlands (Cardamom Mountains with Mt. Aural at 1,813m, Dangrek Escarpment), and the 440km Gulf of Thailand coastline.

## 2. Tropical Monsoon Climate
Driven by the Southwest Monsoon (May-Oct: heavy rain, high humidity) and Northeast Monsoon (Nov-Apr: dry season with cooler nights and warm days).$BODY_EN$,
      $BODY_KM$## ១. សណ្ឋានដីនៃប្រទេសកម្ពុជា (បែងចែកជា ៤ តំបន់)
- **តំបន់ទំនាបកណ្តាល៖** គ្របដណ្តប់ផ្ទៃដីធំជាងគេ សម្បូរដីល្បាប់មានជីជាតិជុំវិញបឹងទន្លេសាប និងទន្លេមេគង្គ (ជង្រុកស្រូវជាតិ)។
- **តំបន់ខ្ពង់រាប និងភ្នំជុំវិញ៖** រួមមានជួរភ្នំក្រវាញ (ភ្នំឱរ៉ាល់ កម្ពស់ ១៨១៣ម ខ្ពស់ជាងគេនៅកម្ពុជា) ជួរភ្នំដងរែកនៅភាគខាងជើង និងខ្ពង់រាបឦសាន។
- **តំបន់ឆ្នេរសមុទ្រ៖** លាតសន្ធឹងតាមបណ្តោយខេត្តកោះកុង ព្រះសីហនុ កំពត និងកែប ប្រវែង ៤៤០ គីឡូម៉ែត្រ។

## ២. របបខ្យល់មូសុង (អាកាសធាតុត្រូពិចក្តៅហើយសើម)
- **មូសុងនិរតី (ឧសភា ដល់ តុលា)៖** នាំមកនូវពពកទឹកភ្លៀង និងសំណើមខ្ពស់ (រដូវវស្សា)។
- **មូសុងឦសាន (វិច្ឆិកា ដល់ មេសា)៖** នាំមកនូវខ្យល់ស្ងួត ត្រជាក់ក្នុងខែធ្នូ-មករា និងក្តៅខ្លាំងក្នុងខែមីនា-មេសា (រដូវប្រាំង)។$BODY_KM$,
      20,
      35,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Present Simple Tense & Daily Routines (english - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Present Simple Tense & Daily Routines',
      'Present Simple Tense & Daily Routines',
      'Present simple usage, third-person singular inflection, and interrogative/negative forms',
      'ការប្រើប្រាស់កាលបច្ចុប្បន្នកាលធម្មតា វិធានបំប្លែងកិរិយា និងប្រយោគបដិសេធ',
      $BODY_EN$## Present Simple Tense
Describes habits, universal truths, and scheduled routines. Remember to append -s/-es for third-person singular subjects (he, she, it).$BODY_EN$,
      $BODY_KM$## 1. Form & Usage of Present Simple
Used for daily habits, general facts, and routines:
- **Affirmative:** Subject + Verb (s/es with He/She/It)
  - *Example:* She studies science every day.
- **Negative:** Subject + do/does not + Base Verb
  - *Example:* They do not play football on Monday.
- **Question:** Do/Does + Subject + Base Verb?
  - *Example:* Does he speak Khmer?$BODY_KM$,
      18,
      35,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Past Simple Tense: School Days & Personal Narratives (english - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Past Simple Tense: School Days & Personal Narratives',
      'Past Simple Tense: School Days & Personal Narratives',
      'Past simple structures, regular (-ed) and irregular verbs, and conversational narrative past',
      'ការប្រើប្រាស់ Past Simple កិរិយាស័ព្ទប្រក្រតី/មិនប្រក្រតី និងការរៀបរាប់ព្រឹត្តិការណ៍កន្លងផុត',
      $BODY_EN$## Past Simple Structure & Conversational Usage
Master regular inflection rules (-ed) and high-frequency irregular forms (went, saw, wrote) with didactic sentence patterns.$BODY_EN$,
      $BODY_KM$## 1. Past Simple: Form & Usage
Used to express actions that started and finished at a definite time in the past.

### Regular Verbs (+ed / +d)
- *play → played*, *study → studied*, *visit → visited*
- *Example:* "Sophea visited the National Museum yesterday."

### Irregular Verbs (Stem Changes)
- *go → went*, *see → saw*, *write → wrote*, *buy → bought*
- *Example:* "They went to Siem Reap during the Water Festival."

## 2. Negative & Question Forms
- **Negative:** *Subject + did not (didn't) + base verb*
  - "I did not forget my homework."
- **Question:** *Did + subject + base verb...?*
  - "Did you finish the science experiment?" (Yes, I did. / No, I didn't.)$BODY_KM$,
      20,
      35,
      true,
      108
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Computer Hardware & Operating Systems (ict - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Computer Hardware & Operating Systems',
      'កុំព្យូទ័រ និងប្រព័ន្ធប្រតិបត្តិការ (Hardware & OS)',
      'Hardware components (CPU, RAM, SSD) and operating system architecture',
      'សមាសភាគរឹង (CPU, RAM, Storage) និងតួនាទីនៃប្រព័ន្ធប្រតិបត្តិការ',
      $BODY_EN$## 1. Hardware Architecture
CPU executes machine instructions. RAM provides volatile high-speed scratch space. Solid-state drives provide persistent storage.

## 2. Operating Systems
The OS manages hardware allocation, file systems, process scheduling, and user interfaces.$BODY_EN$,
      $BODY_KM$## ១. សមាសភាគរឹងកុំព្យូទ័រ (Hardware)
- **CPU (Central Processing Unit):** ខួរក្បាលកុំព្យូទ័រសម្រាប់ដំណើរការពាក្យបញ្ជា
- **RAM (Random Access Memory):** អង្គចងចាំបណ្តោះអាសន្នមានល្បឿនលឿន
- **Storage (SSD / HDD):** អង្គចងចាំផ្ទុកទិន្នន័យអចិន្ត្រៃយ៍
- **Input/Output Devices:** ក្តារចុច (Keyboard), កណ្ដុរ (Mouse), អេក្រង់ (Monitor)

## ២. ប្រព័ន្ធប្រតិបត្តិការ (Operating System)
ប្រព័ន្ធប្រតិបត្តិការ (Windows, macOS, Linux, Android) ដើរតួជាស្ពានភ្ជាប់រវាងអ្នកប្រើប្រាស់ កម្មវិធី និងផ្នែករឹងកុំព្យូទ័រ។$BODY_KM$,
      18,
      35,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Khmer Unicode Typing & Word Processing (ict - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Khmer Unicode Typing & Word Processing',
      'ការវាយអក្សរខ្មែរយូនីកូដ និងការរៀបចំឯកសារ (Word Processing)',
      'Khmer Unicode keyboard layout, subscript consonants (Coeng key), and document layout formatting',
      'ប្លង់ក្តារចុចខ្មែរយូនីកូដ ស្រៈពេញតួ ជើងអក្សរ (Coeng) និងការរៀបចំទម្រង់ឯកសារ',
      $BODY_EN$## Khmer Unicode Standard Typing
Explains the dedicated subscript generator key ('j' for Coeng), vowel combinations, and standard MoEYS typographical formatting principles in word processors.$BODY_EN$,
      $BODY_KM$## ១. ប្លង់ក្តារចុចខ្មែរយូនីកូដ (Khmer Unicode Layout)
- **ការវាយព្យញ្ជនៈ និងស្រៈ៖** ប្រើពុម្ពអក្សរស្ដង់ដារ (Khmer OS Battambang, Khmer OS Siemreap)
- **ការវាយជើងអក្សរ (Subscript Consonant):** ត្រូវចុចកូនសោ **'j' (Coeng)** ជាមុនសិន រួចចុចព្យញ្ជនៈដែលត្រូវធ្វើជាជើង (ឧ. 'k' + 'j' + 'n' = ក្ន)។
- **ស្រៈពេញតួ (Independent Vowels):** ដូចជា ឰ, ឪ, ឫ, ឬ ប្រើគ្រាប់ចុចជាក់លាក់ (Shift + Key)។

## ២. ការរៀបចំទម្រង់ឯកសារអត្ថបទ (Formatting)
- កំណត់ទំហំក្រដាស A4 រឹមទំព័រ (Margins: 2.54cm គ្រប់ជ្រុង)
- កំណត់ទំហំអក្សរចំណងជើង (14pt Bold) និងតួសេចក្តី (12pt Regular) ជាមួយគម្លាតបន្ទាត់ 1.15 lines។$BODY_KM$,
      20,
      35,
      true,
      110
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Ethics in Family & School Community (morality - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'morality';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Ethics in Family & School Community',
      'សីលធម៌ក្នុងគ្រួសារ និងសាលារៀន',
      'Filial piety, respect for teachers, and fundamental civic duties in school and family',
      'ការដឹងគុណមាតាបិតា ការគោរពលោកគ្រូអ្នកគ្រូ និងច្បាប់សីលធម៌រស់នៅប្រចាំថ្ងៃ',
      $BODY_EN$## Family & School Ethics
Family forms society's foundation. Cultivating filial piety, disciplined study habits, and mutual respect builds character.$BODY_EN$,
      $BODY_KM$## ១. សីលធម៌ក្នុងគ្រួសារ
គ្រួសារជាកោសិកាដំបូងនៃសង្គម។ កូនល្អត្រូវមានកតញ្ញូតាធម៌ (ការដឹងគុណ និងតបស្នងសងគុណមាតាបិតា) ជួយការងារផ្ទះ និងគោរពដំបូន្មានឪពុកម្តាយ។

## ២. សីលធម៌ក្នុងសាលារៀន
សាលារៀនជាថ្នាលបណ្តុះចំណេះវិជ្ជា និងចរិយាសម្បត្តិ៖
- គោរពវិន័យសាលារៀន មកឱ្យទាន់ពេល
- គោរពគ្រូបង្រៀន និងយកចិត្តទុកដាក់ស្តាប់ការពន្យល់
- រក្សាសាមគ្គីភាព និងជួយយកអាសាគ្នាក្នុងចំណោមមិត្តភក្តិ។$BODY_KM$,
      18,
      35,
      true,
      107
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Child Rights & Student Civic Duty (morality - G7)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'morality';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      7,
      'Child Rights & Student Civic Duty',
      'សិទ្ធិកុមារ និងកាតព្វកិច្ចពលរដ្ឋក្នុងសាលារៀន',
      'Four core pillars of child rights (UNCRC), gender equity, and stewardship of public property',
      'សិទ្ធិជាមូលដ្ឋានទាំងបួនរបស់កុមារ សមភាពយេនឌ័រ និងការថែរក្សាទ្រព្យសម្បត្តិសាធារណៈ',
      $BODY_EN$## Four Pillars of Children's Rights
Detailing survival, holistic development, safety protection, and active civic participation, balanced with reciprocal student responsibilities in schools.$BODY_EN$,
      $BODY_KM$## ១. សិទ្ធិជាមូលដ្ឋានទាំង ៤ របស់កុមារ (អនុសញ្ញា UNCRC)
១. **សិទ្ធិរស់រានមានជីវិត (Survival):** ទទួលបានអាហារូបត្ថម្ភ ការថែទាំសុខភាព និងទីជម្រកសុវត្ថិភាព។
២. **សិទ្ធិទទួលបានការអភិវឌ្ឍ (Development):** ទទួលបានការអប់រំប្រកបដោយគុណភាព និងការលេងកម្សាន្ត។
៣. **សិទ្ធិទទួលបានការការពារ (Protection):** ពីអំពើហិង្សា ការរំលោភបំពាន និងការកេងប្រវ័ញ្ចកម្លាំងពលកម្ម។
៤. **សិទ្ធិក្នុងការចូលរួម (Participation):** បញ្ចេញមតិយោបល់ និងចូលរួមក្នុងសកម្មភាពសង្គម។

## ២. កាតព្វកិច្ចសិស្សក្នុងសាលារៀន
- គោរពបទបញ្ជាផ្ទៃក្នុងរបស់សាលា និងថែរក្សាបរិស្ថានស្អាត (គ្មានសំរាម)
- ស្រឡាញ់សមភាពយេនឌ័រ មិនរើសអើង និងជួយការពារសិស្សពិការ ឬខ្វះខាត។$BODY_KM$,
      20,
      35,
      true,
      112
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Tum Teav Literature Analysis (Characters & Society) (khmer - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Tum Teav Literature Analysis (Characters & Society)',
      'រឿងទុំទាវ (ស្នាដៃភិក្ខុសោម - ការវិភាគតួអង្គ)',
      'Character analysis of Tum, Teav, No, and societal conflicts between love and feudal tradition',
      'ការវិភាគតួអង្គទុំ ទាវ នោ ម៉ឺនងួន យាយផាន់ និងទំនាស់រវាងស្នេហានិងប្រពៃណី',
      $BODY_EN$## Tum Teav Literature Analysis
A cornerstone Khmer poetic masterpiece examining individual autonomy versus feudal societal constraints.$BODY_EN$,
      $BODY_KM$## ១. សាវតានៃរឿងទុំទាវ
រឿងទុំទាវ និពន្ធដោយ **ភិក្ខុសោម** នៅឆ្នាំ ១៩១៥ ជារឿងប្រលោមលោកកំណាព្យ (បទកាកគតិ និងបទពាក្យ៧) ដ៏ល្បីល្បាញបំផុតមួយក្នុងអក្សរសិល្ប៍ខ្មែរ។

## ២. ការវិភាគតួអង្គសំខាន់ៗ
- **ទុំ៖** តំណាងយុវជនមានទេពកោសល្យខាងសំនៀងកាព្យ ស្នេហាស្មោះស្ម័គ្រ ប៉ុន្តែមានភាពឆេវឆាវ
- **ទាវ៖** នារីរូបស្រស់ ស្មោះត្រង់នឹងស្នេហា និងហ៊ានតស៊ូប្រឆាំងនឹងការបង្ខិតបង្ខំ
- **យាយផាន់៖** តំណាងឱ្យមាតាដែលលោភលន់ចង់បានបុណ្យសក្តិ ទ្រព្យសម្បត្តិ និងប្រកាន់ទស្សនៈ «នំមិនធំជាងនាឡិ»
- **ម៉ឺនងួន៖** តំណាងអភិជនអាត្មានិយម យកអំណាចបុណ្យសក្តិមកដណ្តើមស្នេហា។$BODY_KM$,
      20,
      38,
      true,
      101
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Pali & Sanskrit Loanwords in Khmer (khmer - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Pali & Sanskrit Loanwords in Khmer',
      'ពាក្យកម្ចីបាលី-សំស្ក្រឹតក្នុងភាសាខ្មែរ',
      'Identification rules for Pali-Sanskrit loanwords, consonant clustering, and semantic evolution',
      'វិធានសម្គាល់ពាក្យបាលី-សំស្ក្រឹត ការប្រើប្រាស់ព្យញ្ជនៈសង្កត់ និងការវិវត្តន័យ',
      $BODY_EN$## Pali & Sanskrit Linguistic Influences
Distinguishing phonological rules between Pali and Sanskrit loanwords in modern formal Khmer registers.$BODY_EN$,
      $BODY_KM$## ១. ប្រភពនៃពាក្យកម្ចី
ភាសាខ្មែរបានខ្ចីពាក្យពីបាលី និងសំស្ក្រឹតយ៉ាងច្រើនតាមរយៈសាសនាព្រាហ្មណ៍ និងព្រះពុទ្ធសាសនា។

## ២. វិធានសម្គាល់ពាក្យ
- **សំស្ក្រឹត៖** ប្រើស្រៈ ឫ, ឬ, ឭ, ឮ, ស្រៈ ឰ, ឳ និងព្យញ្ជនៈ «ឝ», «ឞ», «ក្ស» (ឧទាហរណ៍៖ ក្សត្រ, ប្រទេស, វិទ្យាសាស្ត្រ)
- **បាលី៖** មិនប្រើព្យញ្ជនៈក្បាល «ក្ស» ឬស្រៈសំស្ក្រឹតឡើយ (ឧទាហរណ៍៖ ខត្តិយ, បទេស, វិជ្ជា)។$BODY_KM$,
      18,
      38,
      true,
      102
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Angkor Empire & Construction of Angkor Wat (history - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Angkor Empire & Construction of Angkor Wat',
      'សម័យមហានគរ និងការកសាងអង្គរវត្ត',
      'Reign of King Suryavarman II, Angkor Wat temple architecture, and hydraulic mastery',
      'រជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ ស្ថាបត្យកម្មប្រាសាទអង្គរវត្ត និងប្រព័ន្ធធារាសាស្ត្រ',
      $BODY_EN$## Angkor Wat & Suryavarman II
Built in the early 12th century, Angkor Wat represents the pinnacle of classical Khmer temple-mountain architecture.$BODY_EN$,
      $BODY_KM$## ១. រជ្ជកាលព្រះបាទសូរ្យវរ្ម័នទី ២ (១១១៣-១១៥០)
ព្រះបាទសូរ្យវរ្ម័នទី ២ បានបង្រួបបង្រួមទឹកដី និងពង្រីកឥទ្ធិពលចក្រភពខ្មែរយ៉ាងធំធេងនៅជ្រោយឥណ្ឌូចិន។

## ២. ការកសាងប្រាសាទអង្គរវត្ត
អង្គរវត្តឧទ្ទិសថ្វាយព្រះវិស្ណុ (សាសនាព្រាហ្មណ៍)៖
- បែរមុខទៅទិសខាងលិច (ទិសនៃព្រះវិស្ណុ)
- កំពូល ៥ តំណាងឱ្យកំពូលភ្នំព្រះសុមេរុ (មជ្ឈមណ្ឌលនៃចក្រវាល)
- គូទឹកព័ទ្ធជុំវិញតំណាងឱ្យមហាសមុទ្រសកលលោក។$BODY_KM$,
      20,
      38,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: National Unification & Angkor Foundation (Jayavarman II) (history - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'National Unification & Angkor Foundation (Jayavarman II)',
      'ការបង្រួបបង្រួមជាតិ និងការកកើតអាណាចក្រអង្គរ (ព្រះបាទជ័យវរ្ម័នទី ២)',
      'The Devaraja coronation ritual on Mount Kulen in 802 AD and founding of the Angkor Empire',
      'ពិធីទេវរាជនៅលើភ្នំគូលែនឆ្នាំ ៨០២ គ.ស. និងការប្រកាសឯករាជ្យពីជ្វា',
      $BODY_EN$## 1. Unification by Jayavarman II
Following the fragmentation of Water and Land Chenla, King Jayavarman II re-unified the Khmer territories and cast off Javanese suzerainty.

## 2. The 802 AD Devaraja Cult on Mount Kulen
In 802 AD, on Phnom Kulen (Mahendraparvata), the Devaraja (God-King) consecration consecrated Cambodia's sovereignty, initiating the golden Angkor Empire.$BODY_EN$,
      $BODY_KM$## ១. ព្រះបាទជ័យវរ្ម័នទី ២ និងការបង្រួបបង្រួមជាតិ
នៅចុងសតវត្សទី ៨ ប្រទេសកម្ពុជាស្ថិតក្នុងភាពបែកបាក់រវាងចេនឡាទឹកលិច និងចេនឡាដីគោក។ ព្រះបាទជ័យវរ្ម័នទី ២ បានធ្វើចម្បាំងបង្រួបបង្រួមទឹកដី និងរំដោះប្រទេសពីឥទ្ធិពលជ្វា (Java)។

## ២. ពិធីទេវរាជលើភ្នំមហិន្ទ្របព៌ត (ភ្នំគូលែន គ.ស. ៨០២)
- នៅឆ្នាំ ៨០២ គ.ស. ព្រះអង្គបានរៀបចំពិធីសាសនាព្រាហ្មណ៍ "ទេវរាជ" លើកំពូលភ្នំគូលែន ដោយមានព្រាហ្មណ៍សិវកៃវល្យជាអ្នកប្រារព្ធពិធី។
- ពិធីនេះប្រកាសថា ព្រះរាជាជាស្តេចនៃស្តេច (ចក្រវរ្តិន) ហើយប្រទេសកម្ពុជាមិនចំណុះនរណាទៀតឡើយ នេះជាចំណុចចាប់ផ្តើមនៃយុគសម័យអង្គរដ៏រុងរឿង។$BODY_KM$,
      20,
      38,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Monsoon Climate & Precipitation in Cambodia (geography - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Monsoon Climate & Precipitation in Cambodia',
      'អាកាសធាតុខ្យល់មូសុង និងរបបទឹកភ្លៀងនៅកម្ពុជា',
      'Southwest and northeast monsoons, wet/dry seasons, and their direct impact on agriculture',
      'ខ្យល់មូសុងនិរតី និងឦសាន រដូវវស្សា រដូវប្រាំង និងឥទ្ធិពលលើកសិកម្ម',
      $BODY_EN$## Cambodia's Monsoon Climate
Governed by tropical southwest (rainy) and northeast (dry) monsoon cycles directly dictating the agricultural calendar.$BODY_EN$,
      $BODY_KM$## ១. លក្ខណៈទូទៅនៃអាកាសធាតុកម្ពុជា
កម្ពុជាស្ថិតក្នុងតំបន់ត្រូពិចក្តៅហើយសើម មានរដូវពីរច្បាស់លាស់៖
- **រដូវវស្សា (ឧសភា ដល់ តុលា)៖** ទទួលឥទ្ធិពលពី **ខ្យល់មូសុងនិរតី** បក់មកពីមហាសមុទ្រឥណ្ឌា នាំមកនូវទឹកភ្លៀងច្រើន (៧៥-៨៥% នៃទឹកភ្លៀងប្រចាំឆ្នាំ)
- **រដូវប្រាំង (វិច្ឆិកា ដល់ មេសា)៖** ទទួលឥទ្ធិពលពី **ខ្យល់មូសុងឦសាន** បក់មកពីទ្វីបអាស៊ី (ចិន) អាកាសធាតុស្ងួត និងត្រជាក់ស្រាលនៅខែធ្នូ-មករា។$BODY_KM$,
      18,
      38,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodian Agriculture, Rice Cultivation & Irrigation (geography - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Cambodian Agriculture, Rice Cultivation & Irrigation',
      'កសិកម្មកម្ពុជា ដំណាំស្រូវ និងប្រព័ន្ធធារាសាស្ត្រ',
      'Wet and dry season paddy rice varieties, modern agro-techniques, and national irrigation networks',
      'ប្រភេទស្រូវវស្សា ស្រូវប្រាំង បច្ចេកទេសកសិកម្មទំនើប និងប្រព័ន្ធធារាសាស្ត្រកម្ពុជា',
      $BODY_EN$## 1. Wet & Dry Season Paddy Cultivation
Paddy rice is the cornerstone of Cambodia's rural economy, featuring seasonal fragrant varieties (Phka Rumduol) and high-yield irrigated dry-season crops.

## 2. Agro-Mechanization & Water Security
Transformation through combine harvesters, canal dredging, and centralized reservoir infrastructure.$BODY_EN$,
      $BODY_KM$## ១. ដំណាំស្រូវ ឆ្អឹងខ្នងនៃកសិកម្មកម្ពុជា
- **ស្រូវវស្សា (Wet-Season Rice):** ដាំដុះពឹងផ្អែកលើទឹកភ្លៀងមូសុង (ចាប់ពីខែឧសភា-តុលា) ដូចជាពូជផ្ការំដួល ផ្កាម្លិះ។
- **ស្រូវប្រាំង (Dry-Season Rice):** ដាំដុះនៅរដូវប្រាំងដោយប្រើប្រព័ន្ធធារាសាស្ត្រ ទទួលបានទិន្នផលខ្ពស់ (ពូជស្រូវស្រាលមិនប្រកាន់រដូវ)។

## ២. ទំនើបកម្មកសិកម្ម និងប្រព័ន្ធធារាសាស្ត្រ
- ការប្រើប្រាស់គ្រឿងយន្តកសិកម្ម (ត្រាក់ទ័រ ម៉ាស៊ីនច្រូតកាត់) ជំនួសកម្លាំងសត្វពាហនៈ
- ការជីកស្តារប្រឡាយមេ ប្រឡាយរង និងទំនប់ស្ទាក់ទឹកដើម្បីធានាសន្តិសុខស្បៀងជាតិ។$BODY_KM$,
      20,
      38,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Past Simple Tense & Historical Narratives (english - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Past Simple Tense & Historical Narratives',
      'Past Simple Tense & Historical Narratives',
      'Irregular past tense verbs, time markers, and narrative composition',
      'ការប្រើប្រាស់កិរិយាស័ព្ទមិនទៀងទាត់ (Irregular Verbs) និងការនិទានរឿងអតីតកាល',
      $BODY_EN$## Past Simple Tense
Crucial for describing completed past actions, historical events, and experimental scientific observations.$BODY_EN$,
      $BODY_KM$## 1. Past Simple Structure
- **Regular verbs:** append -ed (worked, played, visited)
- **Irregular verbs:** change vowel or form (go -> went, build -> built, see -> saw)
- **Time markers:** yesterday, last year, in 1993, two days ago.$BODY_KM$,
      18,
      38,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Modal Verbs: Rules, Necessity & Advice (Can, Must, Should) (english - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Modal Verbs: Rules, Necessity & Advice (Can, Must, Should)',
      'Modal Verbs: Rules, Necessity & Advice (Can, Must, Should)',
      'Expressing ability, obligation, prohibition, and advice using modal auxiliaries',
      'ការប្រើប្រាស់ modal verbs សម្តែងសមត្ថភាព បញ្ជា កាតព្វកិច្ច និងដំបូន្មាន',
      $BODY_EN$## Modal Auxiliaries in Standard English
Core distinctions between strong obligations (*must, have to*), strict prohibitions (*must not*), and normative advice (*should, ought to*).$BODY_EN$,
      $BODY_KM$## 1. Modals of Obligation & Necessity
- **Must:** Strong internal obligation or rule.
  - *Example:* "Students must wear the school uniform during examinations."
- **Must not (Mustn't):** Strict prohibition (forbidden).
  - *Example:* "You mustn't use smartphones inside the laboratory."
- **Have to:** External rule imposed by authority.
  - *Example:* "In Cambodia, motorists have to drive on the right side."

## 2. Modals of Advice & Recommendation
- **Should / Ought to:** Friendly advice or recommendation.
  - *Example:* "You should drink plenty of water during the hot dry season."
  - *Example:* "We should review past exam papers before the Brevet test."$BODY_KM$,
      20,
      38,
      true,
      108
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Spreadsheets & Calculation Formulas (ict - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Spreadsheets & Calculation Formulas',
      'កម្មវិធីសន្លឹកកិច្ចការ និងរូបមន្តគណនា (Spreadsheets)',
      'Cell addressing, rows, columns, and foundational formulas (SUM, AVERAGE, IF)',
      'ក្រឡា (Cells) ជួរដេក ជួរឈរ និងរូបមន្តគណនាគ្រឹះ SUM, AVERAGE, MIN, MAX',
      $BODY_EN$## Spreadsheet Fundamentals
Data organization using tabular cell grids and automated algebraic formulas for scientific data processing.$BODY_EN$,
      $BODY_KM$## ១. រចនាសម្ព័ន្ធសន្លឹកកិច្ចការ (Excel / Sheets)
- **Cell (ក្រឡា)៖** ប្រសព្វរវាងជួរឈរ (Columns: A, B, C...) និងជួរដេក (Rows: 1, 2, 3...) ដូចជា A1, B5
- **រូបមន្តគ្រឹះ៖**
  - '=SUM(A1:A10)' គណនាផលបូក
  - '=AVERAGE(B1:B10)' គណនាមធ្យមភាគ
  - '=MAX(C1:C10)' រកតម្លៃធំបំផុត$BODY_KM$,
      20,
      38,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Spreadsheets: Formulas, SUM/AVERAGE & Charting (ict - G8)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      8,
      'Spreadsheets: Formulas, SUM/AVERAGE & Charting',
      'សន្លឹកកិច្ចការអេឡិចត្រូនិក (Spreadsheet): រូបមន្ត និងគំនូសតាង',
      'Formulas, cell references, core functions (SUM, AVERAGE), and data visualization charts',
      'ការបញ្ចូលរូបមន្តគណិតវិទ្យា អនុគមន៍ SUM, AVERAGE, COUNT និងការបង្កើតគំនូសតាងក្រាហ្វិក',
      $BODY_EN$## Electronic Spreadsheets & Numerical Analysis
Master cell referencing, basic formulas starting with '=', standard aggregate functions (SUM, AVERAGE, MAX, MIN), and graphical chart visualization.$BODY_EN$,
      $BODY_KM$## ១. គំនិតគ្រឹះនៃ Spreadsheet (Excel / Google Sheets)
- **Cell Address (អាសយដ្ឋានក្រឡា):** ប្រសព្វរវាងជួរឈរ (Columns: A, B, C...) និងជួរដេក (Rows: 1, 2, 3...) ឧ. 'B5'
- **រូបមន្តតែងតែចាប់ផ្តើមដោយសញ្ញា '='៖** ឧទាហរណ៍ '=A1 + B1'

## ២. អនុគមន៍គណិតវិទ្យាគ្រឹះ
- '=SUM(B2:B20)' គណនាផលបូកសរុបនៃក្រឡាពី B2 ដល់ B20
- '=AVERAGE(C2:C20)' គណនាតម្លៃមធ្យមភាគ
- '=MAX(range)' និង '=MIN(range)' រកតម្លៃខ្ពស់បំផុត និងទាបបំផុត
- **គំនូសតាង (Charts):** បំប្លែងតារាងទិន្នន័យជា Column Chart ឬ Pie Chart សម្រាប់ការបង្ហាញច្បាស់លាស់។$BODY_KM$,
      20,
      38,
      true,
      110
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Kulap Pailin Novel Analysis (Brevet Core) (khmer - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Kulap Pailin Novel Analysis (Brevet Core)',
      'រឿងកុលាបប៉ៃលិន (ញ៉ុក ថែម - វិញ្ញាសាឌីប្លូម)',
      'Literary character analysis, virtue ethics, and societal context in Kulap Pailin',
      'ការវិភាគតួអង្គចៅចិត្រ ឃុននារី គុណធម៌ និងបរិបទសង្គមក្នុងរឿងកុលាបប៉ៃលិន',
      $BODY_EN$## 1. Kulap Pailin by Nhok Them
A seminal Cambodian novel central to the national Grade 9 Brevet curriculum.

## 2. Character Analysis
Chau Chet epitomizes moral integrity, hard work, and loyalty, proving human dignity transcends socioeconomic status.$BODY_EN$,
      $BODY_KM$## ១. សេចក្តីផ្តើមនៃរឿងកុលាបប៉ៃលិន
រឿងកុលាបប៉ៃលិន តែងដោយលោក **ញ៉ុក ថែម** នៅឆ្នាំ ១៩៣៦ ឬ ១៩៤៣ គឺជាប្រលោមលោកទំនើបបែបមនោសញ្ចេតនា និងសីលធម៌ដ៏ល្បីល្បាញបំផុតក្នុងកម្មវិធីសិក្សាឌីប្លូម។

## ២. ការវិភាគតួអង្គសំខាន់ៗ
- **ចៅចិត្រ៖** តំណាងឱ្យយុវជនមានប្រភពក្រីក្រ តែពោរពេញដោយភាពស្មោះត្រង់ ឧស្សាហ៍ព្យាយាម សេចក្តីក្លាហាន និងការគោរពគុណធម៌។
- **ឃុននារី៖** តំណាងឱ្យស្ត្រីខ្មែរដែលមានចរិយាសម្បត្តិល្អ មិនរើសអើងវណ្ណៈ និងមានសន្តានចិត្តមេត្តាធម៌។
- **ហ្លួងរតនសម្បត្តិ៖** តំណាងឱ្យឥស្សរជនដែលមានចិត្តទូលាយ និងចេះឲ្យតម្លៃលើមនុស្សស្មោះត្រង់។

## ៣. តម្លៃអប់រំ និងសង្គម
រឿងនេះបង្រៀនថា «តម្លៃនៃមនុស្សស្ថិតនៅលើអំពើល្អ ភាពស្មោះត្រង់ និងការប្រឹងប្រែង មិនមែនលើទ្រព្យសម្បត្តិ ឬឋានៈសង្គមឡើយ»។$BODY_KM$,
      22,
      40,
      true,
      101
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Sentence Structures & Discussion Essay (Brevet) (khmer - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Sentence Structures & Discussion Essay (Brevet)',
      'វេយ្យាករណ៍ល្បះទោល ល្បះផ្សំ និងតែងសេចក្តីពិភាក្សា',
      'Compound-complex clauses, coordinating conjunctions, and 3-part discussion essay architecture',
      'ការបង្កើតល្បះផ្សំ ឈ្នាប់ភាសា និងរចនាសម្ព័ន្ធ ៣ ផ្នែកនៃតែងសេចក្តីពិភាក្សា',
      $BODY_EN$## Discussion Essay Architecture for Brevet
3-part structure: Introduction (thesis statement), Body (proponent arguments, counter-perspectives, synthesis), and Conclusion.$BODY_EN$,
      $BODY_KM$## ១. ល្បះទោល និងល្បះផ្សំ
- **ល្បះទោល៖** មានប្រធានមួយ និងកិរិយាមួយ (ឧទាហរណ៍៖ សិស្សរៀនវិទ្យាសាស្ត្រ)
- **ល្បះផ្សំ៖** កើតឡើងពីល្បះទោលពីរឡើងទៅ ដោយប្រើឈ្នាប់ (និង, ប៉ុន្តែ, ពីព្រោះ, ប្រសិនបើ)

## ២. រចនាសម្ព័ន្ធតែងសេចក្តីពិភាក្សា
១. **សេចក្តីផ្តើម៖** លំនាំបញ្ហា ចំណូលបញ្ហា ចំណោទបញ្ហា
២. **តួសេចក្តី៖**
   - គំនិតស្រប (លើកអំណះអំណាង និងឧទាហរណ៍គាំទ្រ)
   - គំនិតប្រឆាំង (លើកទស្សនៈផ្ទុយ ឬកម្រិតព្រំដែននៃគំនិត)
   - ការសំយោគគំនិត (ថ្លឹងថ្លែងរកការពិត)
៣. **សេចក្តីបញ្ចប់៖** វាយតម្លៃប្រធាន និងមតិផ្ទាល់ខ្លួន។$BODY_KM$,
      22,
      40,
      true,
      102
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Descriptive & Expository Khmer Essay Writing (khmer - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Descriptive & Expository Khmer Essay Writing',
      'វិធីសាស្ត្រតែងសេចក្តីពិពណ៌នា និងសេចក្តីពន្យល់',
      'Three-part essay composition framework (Introduction, Body, Conclusion) for Brevet exams',
      'រចនាសម្ព័ន្ធតែងសេចក្តី៖ សេចក្តីផ្តើម តួសេចក្តី និងសេចក្តីបញ្ចប់ សម្រាប់ប្រឡងឌីប្លូម',
      $BODY_EN$## Three-Tier Architecture of Khmer Essays
Methodological drill on MoEYS Brevet composition structure: Introduction (context, thesis, prompt), Body (argument development, evidence), and Conclusion (synthesis, personal commitment).$BODY_EN$,
      $BODY_KM$## ១. រចនាសម្ព័ន្ធគំរូនៃតែងសេចក្តីខ្មែរ (៣ ផ្នែកធំៗ)
១. **សេចក្តីផ្តើម (Introduction)៖**
   - លំនាំបញ្ហា (ទិដ្ឋភាពទូទៅក្នុងសង្គម)
   - ចំណូលបញ្ហា (លើកប្រធានមកបញ្ជាក់ ឬសម្រង់ពាក្យស្លោក)
   - ចំណោទបញ្ហា (ចោទជាសំណួរដើម្បីបកស្រាយក្នុងតួសេចក្តី)។

២. **តួសេចក្តី (Body)៖**
   - ពន្យល់ពាក្យគន្លឹះ និងន័យរួមនៃប្រធាន
   - បកស្រាយគំនិតសំខាន់ៗ ភ្ជាប់ជាមួយភស្តុតាងជាក់ស្តែង (ក្នុងសង្គម ឬក្នុងអក្សរសិល្ប៍)
   - សរុបគំនិតក្នុងតួសេចក្តី។

៣. **សេចក្តីបញ្ចប់ (Conclusion)៖**
   - វាយតម្លៃប្រធាន (ប្រធានមានតម្លៃអប់រំយ៉ាងណា)
   - មតិផ្ទាល់ខ្លួន (ការប្តេជ្ញាចិត្តរបស់សិស្ស)។$BODY_KM$,
      22,
      40,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Brevet Khmer National Exam: Textual Analysis & Grammar (khmer - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Brevet Khmer National Exam: Textual Analysis & Grammar',
      'វិញ្ញាសាភាសាខ្មែរប្រឡងឌីប្លូម (សំណួរអត្ថបទ និងវេយ្យាករណ៍)',
      'Brevet past-paper drill, literal vs figurative comprehension, and orthographic precision',
      'ការអនុវត្តវិញ្ញាសាជាក់ស្តែង វិភាគន័យត្រង់ ន័យធៀប និងការកែលម្អកំហុសអក្ខរាវិរុទ្ធ',
      $BODY_EN$## Brevet Khmer Exam Examination Protocol
Techniques for deciphering literal vs figurative semantic layers, grammatical voice conversions, rhetorical tropes, and Choun Nath dictionary spelling fidelity.$BODY_EN$,
      $BODY_KM$## ១. គន្លឹះឆ្លើយសំណួរអានយល់ន័យក្នុងវិញ្ញាសាឌីប្លូម
- **ន័យត្រង់ (Literal Meaning):** ន័យដើមនៃពាក្យដូចមានក្នុងវចនានុក្រមសម្ដេចព្រះសង្ឃរាជ ជួន ណាត។
- **ន័យធៀប (Figurative Meaning):** ន័យប្រៀបធៀបដែលបង្កប់ការអប់រំ ឬទស្សនវិជ្ជាជីវិត។
- **ការរកគំនិតសំខាន់ (Main Theme):** អានអត្ថបទពីរដង រកប្រយោគគន្លឹះដែលអ្នកនិពន្ធចង់ដាស់តឿនសង្គម។

## ២. វេយ្យាករណ៍ និងអក្ខរាវិរុទ្ធដែលឧស្សាហ៍ចេញប្រឡង
- កិរិយាសព្ទសកម្ម និងកិរិយាសព្ទអកម្ម
- សំនួនវោហារ៖ ឧបមានវោហារ (Simile), រូបកវោហារ (Metaphor)
- ការប្រើប្រាស់សញ្ញាវណ្ណយុត្តិ៖ សញ្ញាខណ្ឌ (.) សញ្ញាក្បៀស (,) និងសញ្ញាឧទាន (!)$BODY_KM$,
      22,
      40,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Angkor Empire & Reign of King Jayavarman VII (history - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Angkor Empire & Reign of King Jayavarman VII',
      'សម័យមហានគរ និងរជ្ជកាលព្រះបាទជ័យវរ្ម័នទី ៧',
      'Bayon construction, Arogyasala hospitals, Dharmasalas, and imperial consolidation',
      'ការកសាងប្រាសាទបាយ័ន មន្ទីរពេទ្យ សាលាសំណាក់ និងការស្តារជាតិឡើងវិញ',
      $BODY_EN$## Reign of Jayavarman VII (1181–1218 CE)
Liberated Angkor in 1181, built the Bayon temple, and instituted the ancient state hospital network (102 Arogyasalas).$BODY_EN$,
      $BODY_KM$## ១. ការរំដោះប្រទេសពីចាម (១១៧៧-១១៨១)
ព្រះបាទជ័យវរ្ម័នទី ៧ បានដឹកនាំការតស៊ូរំដោះរាជធានីអង្គរពីការកាន់កាប់របស់កងទ័ពចាមនៅឆ្នាំ ១១៨១ និងឡើងសោយរាជ្យជាព្រះមហាក្សត្រដ៏អស្ចារ្យ។

## ២. សមិទ្ធផលដ៏ធំធេងក្នុងរជ្ជកាល
- **ស្ថាបត្យកម្ម៖** ប្រាសាទបាយ័ន (Bayon), ប្រាសាទតាព្រហ្ម, ប្រាសាទបន្ទាយឆ្មារ, និងកំពែងក្រុងអង្គរធំ
- **សុខាភិបាល៖** សាងសង់មន្ទីរពេទ្យ «អរោគ្យសាលា» ចំនួន ១០២ ទូទាំងផ្ទៃប្រទេស
- **គមនាគមន៍៖** សាងសង់សាលាសំណាក់ «ធម្មសាលា» ១២១ ខ្នង និងស្ពានថ្មបុរាណរាប់សិបកន្លែង$BODY_KM$,
      22,
      40,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: French Protectorate & National Independence Crusade 1953 (history - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'French Protectorate & National Independence Crusade 1953',
      'អាណាព្យាបាលបារាំង និងព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យ ៩ វិច្ឆិកា ១៩៥៣',
      'The 1863 protectorate treaty, anticolonial resistance, and King Norodom Sihanouk''s crusade for independence',
      'សន្ធិសញ្ញាឆ្នាំ ១៨៦៣ ការកែទម្រង់រដ្ឋបាល និងព្រះរាជបូជនីយកិច្ចរបស់ព្រះបាទនរោត្តម សីហនុ',
      $BODY_EN$## 1. 1863 French Protectorate
Signed by King Norodom to safeguard territorial integrity, followed by centralized French colonial administrative encroachment.

## 2. Royal Crusade for Independence
Through diplomatic maneuvers spearheaded by King Norodom Sihanouk across France, the US, and Japan, Cambodia achieved complete independence on November 9, 1953.$BODY_EN$,
      $BODY_KM$## ១. ការចុះសន្ធិសញ្ញាអាណាព្យាបាលបារាំង (១១ សីហា ១៨៦៣)
ព្រះបាទនរោត្តម បានចុះសន្ធិសញ្ញាជាមួយបារាំងដើម្បីការពារប្រទេសពីការគំរាមកំហែងពីប្រទេសជិតខាង។ ប៉ុន្តែក្រោយមក បារាំងបានកែប្រែការគ្រប់គ្រងដោយដកហូតអំណាចរដ្ឋបាលបន្តិចម្តងៗ (អនុសញ្ញាឆ្នាំ ១៨៨៤)។

## ២. ព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យជាតិ (១៩៥២-១៩៥៣)
- ព្រះករុណា ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ បានធ្វើ "ព្រះរាជបូជនីយកិច្ច" យ៉ាងស្វិតស្វាញលើឆាកអន្តរជាតិ (បំពេញព្រះរាជទស្សនកិច្ចនៅបារាំង អាមេរិក ជប៉ុន និងថៃ)។
- ជាលទ្ធផល ប្រទេសកម្ពុជាទទួលបាន **ឯករាជ្យពេញលេញនៅថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣** ដោយគ្មានការបង្ហូរឈាម។$BODY_KM$,
      22,
      40,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Demography & Migration in Cambodia (geography - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Demography & Migration in Cambodia',
      'ប្រជាសាស្ត្រ និងការផ្លាស់ទីលំនៅនៅកម្ពុជា',
      'Age structures, population pyramid, fertility rates, and rural-urban migration',
      'រចនាសម្ព័ន្ធអាយុ ពីរ៉ាមីតប្រជាជន អត្រាកំណើត និងការធ្វើចំណាកស្រុក',
      $BODY_EN$## Demographic Dividend
Cambodia benefits from a young demographic profile with over 60% working-age citizens.$BODY_EN$,
      $BODY_KM$## ១. រចនាសម្ព័ន្ធប្រជាជនកម្ពុជា
ប្រជាជនកម្ពុជាមានរចនាសម្ព័ន្ធវ័យក្មេង (ជាង ៦០% ស្ថិតក្នុងវ័យធ្វើការអាយុ ១៥-៦៤ ឆ្នាំ) ដែលផ្តល់ «ភាគលាភប្រជាសាស្ត្រ» (Demographic Dividend) ដល់ការអភិវឌ្ឍសេដ្ឋកិច្ច។

## ២. ចំណាកស្រុក និងនគរូបនីយកម្ម
- ចំណាកស្រុកពីជនបទមកទីក្រុង (ភ្នំពេញ សៀមរាប ព្រះសីហនុ) ដើម្បីស្វែងរកការងារក្នុងវិស័យកាត់ដេរ សំណង់ និងសេវាកម្ម។
- ចំណាកស្រុកទៅក្រៅប្រទេស (ប្រទេសថៃ កូរ៉េខាងត្បូង ជប៉ុន) នាំមកនូវប្រាក់បញ្ញើជួយទ្រទ្រង់ជីវភាពគ្រួសារ។$BODY_KM$,
      20,
      40,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodian Industry, Garments & Foreign Trade (geography - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Cambodian Industry, Garments & Foreign Trade',
      'វិស័យឧស្សាហកម្ម កាត់ដេរ និងពាណិជ្ជកម្មកម្ពុជា',
      'Garment manufacturing, footwear, agro-processing, and Cambodia''s trade export partners',
      'ឧស្សាហកម្មកាត់ដេរសម្លៀកបំពាក់ ស្បែកជើង កសិ-ឧស្សាហកម្ម និងទីផ្សារនាំចេញ',
      $BODY_EN$## 1. Garment, Footwear & Travel Goods Sector
Primary driver of industrial exports and formal employment, supported by international preferential trade regimes (EBA, GSP).

## 2. Industrial Diversification
Transition into electrical assembly, bicycle manufacturing, and agro-processing value addition.$BODY_EN$,
      $BODY_KM$## ១. ឧស្សាហកម្មកាត់ដេរ និងស្បែកជើង (Garment & Footwear)
- វិស័យកាត់ដេរគឺជាសសរស្តម្ភដ៏ធំមួយនៃសេដ្ឋកិច្ចកម្ពុជា ផ្តល់ការងារដល់កម្មកររាប់សែននាក់ (ភាគច្រើនជានារីមកពីជនបទ)។
- ផលិតផលកាត់ដេរកម្ពុជានាំចេញទៅកាន់ទីផ្សារធំៗ រួមមានសហរដ្ឋអាមេរិក សហភាពអឺរ៉ុប (EBA) និងជប៉ុន។

## ២. ការធ្វើពិពិធកម្មឧស្សាហកម្ម និងពាណិជ្ជកម្ម
- ការអភិវឌ្ឍន៍រោងចក្រដំឡើងគ្រឿងអេឡិចត្រូនិច គ្រឿងបន្លាស់រថយន្ត និងកង់នាំចេញ
- ការកែច្នៃកសិផល (កៅស៊ូ ស្វាយចន្ទី ដំឡូងមី ស្រូវអង្ករ) ដើម្បីបង្កើនតម្លៃបន្ថែមក្នុងស្រុក។$BODY_KM$,
      22,
      40,
      true,
      108
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Brevet English: Modals, Passives & Reading (english - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Brevet English: Modals, Passives & Reading',
      'Brevet English: Modals, Passives & Reading',
      'Modal auxiliaries, passive voice transformation, and Brevet reading strategies',
      'កិរិយាជំនួយ (can, should, must), ល្បះអកម្ម និងបច្ចេកទេសអានវិញ្ញាសាឌីប្លូម',
      $BODY_EN$## Brevet English Exam Essentials
Focuses on modal auxiliary verbs, basic active-to-passive voice transformations, and text skimming/scanning.$BODY_EN$,
      $BODY_KM$## 1. Modals for Rules & Advice
- **Must:** Obligation (You must wear a helmet.)
- **Should:** Advice (You should study every day.)
- **Can:** Ability or permission (She can solve quadratic equations.)

## 2. Basic Passive Voice
*Object + is/are/was/were + Past Participle (V3)*
- *Active:* Engineers build the bridge.
- *Passive:* The bridge is built by engineers.$BODY_KM$,
      20,
      40,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Brevet English: Paragraph Writing & Reading Comprehension (english - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Brevet English: Paragraph Writing & Reading Comprehension',
      'Brevet English: Paragraph Writing & Reading Comprehension',
      'Cohesive devices, paragraph development, and Brevet reading passage strategies',
      'បច្ចេកទេសសរសេរកថាខណ្ឌ ភាសាភ្ជាប់គំនិត និងការឆ្លើយសំណួរអានវិញ្ញាសាឌីប្លូម',
      $BODY_EN$## Brevet Paragraph Construction & Reading
Mastering topic sentence articulation, cohesive transition markers (*furthermore, consequently*), and exact retrieval of textual details.$BODY_EN$,
      $BODY_KM$## 1. Paragraph Writing Structure for Brevet
A well-constructed English paragraph requires 3 essential elements:
- **Topic Sentence:** States the controlling idea of the paragraph.
  - *Example:* "Learning digital technology brings three major benefits to Cambodian youth."
- **Supporting Sentences:** Give facts, examples, and detailed explanations.
  - *Connectors:* *First of all, In addition, Furthermore, For example...*
- **Concluding Sentence:** Restates the main thought with closure.
  - *Example:* "In conclusion, digital skills empower students to build brighter futures."

## 2. Question Words & Reading Precision
- **Who:** Identifies people | **Where:** Identifies locations
- **When:** Identifies time/dates | **Why:** Requires reason (*Because... / In order to...*)$BODY_KM$,
      22,
      40,
      true,
      110
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Rule of Law, Child Rights & Road Safety (morality - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'morality';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Rule of Law, Child Rights & Road Safety',
      'នីតិរដ្ឋ សិទ្ធិកុមារ និងច្បាប់ចរាចរណ៍ផ្លូវគោក',
      'Four core child rights (survival, protection, development, participation) and road safety law',
      'សិទ្ធិជាមូលដ្ឋានទាំង ៤ របស់កុមារ សុវត្ថិភាពចរាចរណ៍ និងការគោរពច្បាប់រដ្ឋ',
      $BODY_EN$## Child Rights & Civic Duty
The 4 pillars of the UN Convention on the Rights of the Child and adherence to traffic laws as core civic duties.$BODY_EN$,
      $BODY_KM$## ១. សិទ្ធិជាមូលដ្ឋានទាំង ៤ របស់កុមារ (UN CRC)
១. **សិទ្ធិរស់រានមានជីវិត (Survival):** អាហារ ទឹកស្អាត ជម្រក និងការថែទាំសុខភាព
២. **សិទ្ធិទទួលបានការការពារ (Protection):** ការពារពីអំពើហិង្សា ពលកម្មកុមារ និងការរំលោភបំពាន
៣. **សិទ្ធិទទួលបានការអភិវឌ្ឍ (Development):** ការអប់រំ និងការលេងកម្សាន្ត
៤. **សិទ្ធិក្នុងការចូលរួម (Participation):** បញ្ចេញមតិយោបល់ក្នុងកិច្ចការដែលពាក់ព័ន្ធនឹងខ្លួន។

## ២. ច្បាប់ចរាចរណ៍ផ្លូវគោក
ការពាក់មួកសុវត្ថិភាព ការមិនបើកបរក្រោមឥទ្ធិពលគ្រឿងស្រវឹង និងការគោរពភ្លើងសញ្ញាចរាចរណ៍ជាកាតព្វកិច្ចច្បាប់ដើម្បីការពារអាយុជីវិត។$BODY_KM$,
      18,
      40,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Democratic Institutions & Citizen Civic Action (morality - G9)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'morality';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      9,
      'Democratic Institutions & Citizen Civic Action',
      'ស្ថាប័នប្រជាធិបតេយ្យ និងការចូលរួមរបស់ពលរដ្ឋ',
      'The National Assembly, Senate, Royal Government, and democratic voting participation',
      'តួនាទីរដ្ឋសភា ព្រឹទ្ធសភា រាជរដ្ឋាភិបាល និងការបោះឆ្នោតតាមបែបប្រជាធិបតេយ្យ',
      $BODY_EN$## Democratic Governance & Civic Engagement
Covers Cambodia's constitutional monarchy, legislative scrutiny by Parliament, executive governance, and universal suffrage at age 18.$BODY_EN$,
      $BODY_KM$## ១. ស្ថាប័នកំពូលនៃរដ្ឋក្នុងរបបរាជាធិបតេយ្យអាស្រ័យរដ្ឋធម្មនុញ្ញ
- **រដ្ឋសភា (National Assembly)៖** ស្ថាប័ននីតិប្បញ្ញត្តិ អនុម័តច្បាប់ និងតាមដានការអនុវត្តរបស់រាជរដ្ឋាភិបាល។
- **ព្រឹទ្ធសភា (Senate)៖** ស្ថាប័នពិនិត្យ និងឱ្យយោបល់លើសេចក្តីព្រាងច្បាប់។
- **រាជរដ្ឋាភិបាល (Royal Government)៖** ស្ថាប័ននីតិប្រតិបត្តិ ដឹកនាំប្រទេស និងអនុវត្តច្បាប់រដ្ឋ។

## ២. ការបោះឆ្នោត និងសិទ្ធិពលរដ្ឋ
- ពលរដ្ឋខ្មែរគ្រប់រូបដែលមានអាយុចាប់ពី ១៨ ឆ្នាំឡើងទៅ មានសិទ្ធិបោះឆ្នោតជ្រើសរើសតំណាងរាស្ត្រដោយសេរី ស្មើភាព និងសម្ងាត់
- ការចូលរួមអភិវឌ្ឍន៍សហគមន៍ និងការស្ម័គ្រចិត្តជួយសង្គម។$BODY_KM$,
      22,
      40,
      true,
      112
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Reamker Epic: Philosophy & Classical Art (khmer - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Reamker Epic: Philosophy & Classical Art',
      'រឿងរាមកេរ្តិ៍ (កម្រិតវិភាគទស្សនវិជ្ជា និងសិល្បៈតែង)',
      'Philosophical analysis of Dharma versus Adharma and royal literature in the Reamker',
      'ការវិភាគតួអង្គព្រះរាម ក្រុងរាពណ៍ និងទស្សនវិជ្ជាធម៌ឈ្នះអធម៌ក្នុងសង្គមខ្មែរ',
      $BODY_EN$## Classical Reamker Foundations
Examines moral philosophy and aesthetic structures depicted on Angkorian bas-reliefs and royal ballet.$BODY_EN$,
      $BODY_KM$## ១. សារៈសំខាន់នៃរឿងរាមកេរ្តិ៍
រឿងរាមកេរ្តិ៍ជាស្នាដៃអក្សរសិល្ប៍បុរាណកំពូលរបស់ខ្មែរ ដែលចាក់គ្រឹះយ៉ាងជ្រៅទៅក្នុងវប្បធម៌ សិល្បៈរបាំព្រះរាជទ្រព្យ និងចម្លាក់តាមជញ្ជាំងប្រាសាទអង្គរវត្ត។

## ២. ទស្សនវិជ្ជាសីលធម៌
- **ព្រះរាម៖** តំណាងឱ្យព្រះធម៌ យុត្តិធម៌ និងការគោរពពាក្យសត្យ
- **ក្រុងរាពណ៍៖** តំណាងឱ្យអំណាចផ្តាច់ការ និងការបំពានសីលធម៌
- **ទស្សនវិជ្ជាស្នូល៖** អធម៌ (អំពើអាក្រក់) អាចមានឥទ្ធិពលមួយគ្រា ប៉ុន្តែទីបំផុតតែងតែត្រូវវិនាសចាញ់ព្រះធម៌ជានិច្ច។$BODY_KM$,
      22,
      42,
      true,
      101
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Brahmagit & Indrajit Classical Khmer Poetic Meters (khmer - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Brahmagit & Indrajit Classical Khmer Poetic Meters',
      'កាព្យបទព្រហ្មគីតិ និងឥន្ទ្រជិត',
      'Metric rhythm, internal consonance, and strophic conventions in classical poetry',
      'លក្ខណៈចង្វាក់ បទពាក្យ ៧ និង ៨ ក្នុងស្នាដៃអក្សរសិល្ប៍បុរាណ',
      $BODY_EN$## Classical Metrics: Brahmagit & Indrajit
Stanza structures, syllable distributions (5-6-5-6 pattern in Brahmagit), and pedagogical gnomic traditions in Khmer verse.$BODY_EN$,
      $BODY_KM$## ១. បទព្រហ្មគីតិ (បទដែលនិយមប្រើក្នុងការទូន្មាន និងច្បាប់បុរាណ)
បទព្រហ្មគីតិមាន ៤ ឃ្លាក្នុងមួយល្បះ៖
- ឃ្លាទី១ មាន ៥ ព្យាង្គ, ឃ្លាទី២ មាន ៦ ព្យាង្គ
- ឃ្លាទី៣ មាន ៥ ព្យាង្គ, ឃ្លាទី៤ មាន ៦ ព្យាង្គ (សរុប ២២ ព្យាង្គ)
- ចំណាប់ចួន៖ ព្យាង្គទី៥ នៃឃ្លាទី១ ចួននឹងព្យាង្គទី៣ នៃឃ្លាទី២។

## ២. បទឥន្ទ្រជិត
បទឥន្ទ្រជិតជាបទកាព្យមាន ៤ ឃ្លាក្នុងមួយល្បះ ហើយឃ្លានីមួយៗមាន ៧ ព្យាង្គ មានសូរសំនៀងរណ្តំពីរោះរណ្តំ និងក្បួនចួនតឹងរ៉ឹង។$BODY_KM$,
      20,
      42,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Middle Period Cambodia: Chaktomuk, Longvek & Oudong (history - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Middle Period Cambodia: Chaktomuk, Longvek & Oudong',
      'សម័យកណ្តាល (ចតុមុខ លង្វែក និងឧដុង្គ)',
      'Capital relocation from Angkor, maritime trading prosperity in Longvek, and Oudong era',
      'ការប្តូររាជធានីពីអង្គរ សេដ្ឋកិច្ចពាណិជ្ជកម្មលង្វែក និងការកសាងក្រុងឧដុង្គ',
      $BODY_EN$## Cambodia's Middle Period
Transition from agrarian inland empire to dynamic maritime trading networks centered at Longvek and Oudong.$BODY_EN$,
      $BODY_KM$## ១. ការប្តូររាជធានីមកទួលបាសាន និងចតុមុខ (១៤៣១)
ក្រោយការធ្លាក់ចុះនៃសម័យអង្គរ ព្រះបាទពញាយ៉ាតបានផ្លាស់ប្តូររាជធានីមករកតំបន់ប្រសព្វទន្លេ ៤ មុខ (ភ្នំពេញ/ចតុមុខ) ដើម្បីងាយស្រួលធ្វើពាណិជ្ជកម្មតាមផ្លូវទឹក។

## ២. សម័យរុងរឿងនៃក្រុងលង្វែក (សតវត្សទី ១៦)
ក្រោមរជ្ជកាលព្រះបាទអង្គចន្ទទី ១ ក្រុងលង្វែកបានក្លាយជាមជ្ឈមណ្ឌលពាណិជ្ជកម្មអន្តរជាតិដ៏រស់រវើក ដោយមានឈ្មួញអឺរ៉ុប (អេស្ប៉ាញ ព័រទុយហ្គាល់) ចិន ជប៉ុន ចូលមកធ្វើជំនួញ។$BODY_KM$,
      22,
      42,
      true,
      102
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Longvek Maritime Prosperity & Oudong Royal Era (history - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Longvek Maritime Prosperity & Oudong Royal Era',
      'សេដ្ឋកិច្ចពាណិជ្ជកម្មលង្វែក និងសម័យឧដុង្គ (សតវត្សទី ១៦-១៩)',
      'International trade in Longvek, diplomatic contacts with Europe, and the Oudong period',
      'កំពង់ផែពាណិជ្ជកម្មអន្តរជាតិលង្វែក ទំនាក់ទំនងជាមួយព័រទុយហ្កាល់ អេស្ប៉ាញ និងហូឡង់',
      $BODY_EN$## Longvek Maritime Entrepôt & Oudong Dynasty
Covers the strategic shift to Longvek as an international trading crossroads, followed by Oudong's Buddhist scholastic and artistic consolidation.$BODY_EN$,
      $BODY_KM$## ១. សម័យលង្វែក៖ មជ្ឈមណ្ឌលពាណិជ្ជកម្មអន្តរជាតិ
ក្រោយការបោះបង់រាជធានីអង្គរ ព្រះបាទអង្គចន្ទទី១ បានកសាងបន្ទាយលង្វែក (ខេត្តកំពង់ឆ្នាំង)។ លង្វែកបានក្លាយជាកំពង់ផែពាណិជ្ជកម្មដ៏មមាញឹក ដោយមានឈ្មួញព័រទុយហ្កាល់ អេស្ប៉ាញ ជប៉ុន និងអារ៉ាប់មកជួញដូរគ្រឿងទេស ឈើក្រអូប និងដំរី។

## ២. សម័យឧដុង្គ (គ.ស. ១៦២០-១៨៦៦)
- ព្រះបាទជ័យជេដ្ឋាទី២ បានតាំងរាជធានីនៅឧដុង្គ (ភ្នំព្រះរាជទ្រព្យ)
- រាជធានីឧដុង្គជាមជ្ឈមណ្ឌលព្រះពុទ្ធសាសនា វប្បធម៌ និងការសាងសង់ព្រះចេតិយតម្កល់ព្រះបរមអដ្ឋិធាតុនៃព្រះមហាក្សត្រខ្មែរ។$BODY_KM$,
      20,
      42,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mineral Resources, Energy & Agriculture in Cambodia (geography - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Mineral Resources, Energy & Agriculture in Cambodia',
      'ធនធានរ៉ែ ថាមពល និងកសិកម្មកម្ពុជា',
      'Bauxite, gold, iron ore potential, hydropower development, and agricultural diversification',
      'សក្តានុពលរ៉ែដែក មាស បុកស៊ីត ទំនប់វារីអគ្គិសនី និងការធ្វើពិពិធកម្មកសិកម្ម',
      $BODY_EN$## Mineral & Energy Landscape
Geological distribution of mineral reserves, cement limestone in Kampot, and clean energy transition.$BODY_EN$,
      $BODY_KM$## ១. ធនធានរ៉ែនៅកម្ពុជា
- **រ៉ែមាស៖** តំបន់អូរខ្វាវ (ខេត្តមណ្ឌលគិរី) និងខេត្តកំពង់ធំ
- **រ៉ែដែក និងបុកស៊ីត (Bauxite):** តំបន់ភ្នំដែក (ខេត្តព្រះវិហារ) និងខេត្តមណ្ឌលគិរី
- **ថ្មកំបោរ៖** ខេត្តកំពត និងបាត់ដំបង បម្រើដល់ឧស្សាហកម្មស៊ីម៉ង់ត៍។

## ២. វិស័យថាមពល
កម្ពុជាកំពុងពង្រីកថាមពលវារីអគ្គិសនី (សេសានក្រោម២ កំចាយ) និងកសិដ្ឋានថាមពលពន្លឺព្រះអាទិត្យ (Solar Farms) ដើម្បីផ្គត់ផ្គង់តម្រូវការឧស្សាហកម្ម។$BODY_KM$,
      20,
      42,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Biodiversity Conservation & Protected Areas (geography - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Biodiversity Conservation & Protected Areas',
      'ការអភិរក្សជីវចម្រុះ និងតំបន់ការពារធម្មជាតិនៅកម្ពុជា',
      'National parks, wildlife sanctuaries, biodiversity corridors, and sustainable ecotourism',
      'ឧទ្យានជាតិ ដែនជម្រកសត្វព្រៃ របៀងអភិរក្សជីវចម្រុះ និងអេកូទេសចរណ៍',
      $BODY_EN$## Cambodia's Protected Area Network
Analysis of national parks, wildlife corridors, Ramsar wetlands, and community-based ecotourism as economic alternatives to deforestation.$BODY_EN$,
      $BODY_KM$## ១. ប្រព័ន្ធតំបន់ការពារធម្មជាតិកម្ពុជា
កម្ពុជាមានតំបន់ការពារធម្មជាតិគ្របដណ្តប់ជាង ៤០% នៃផ្ទៃដីប្រទេស រួមមាន៖
- **ឧទ្យានជាតិ (National Parks)៖** គិរីរម្យ បូកគោ ព្រះមុនីវង្ស ភ្នំគូលែន។
- **ដែនជម្រកសត្វព្រៃ (Wildlife Sanctuaries)៖** ភ្នំព្រឹល ព្រៃឡង់ តំបន់ជួរភ្នំក្រវាញខាងត្បូង។
- **តំបន់រ៉ាមសារ (Ramsar Sites)៖** ដីសើមមានសារៈសំខាន់ជាអន្តរជាតិ (កោះកាពិ ស្ទឹងត្រែង បឹងឆ្មា)។

## ២. អេកូទេសចរណ៍ និងការអភិវឌ្ឍន៍សហគមន៍
- គម្រោងអេកូទេសចរណ៍ជីផាត (កោះកុង) និងអារ៉ែង បង្កើតប្រាក់ចំណូលដល់អ្នកភូមិ និងកាត់បន្ថយការកាប់ឈើ-បរបាញ់សត្វព្រៃ។$BODY_KM$,
      20,
      42,
      true,
      107
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Present Perfect vs Past Simple & Academic Texts (english - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Present Perfect vs Past Simple & Academic Texts',
      'Present Perfect vs Past Simple & Academic Texts',
      'Contrasting present perfect and past simple in scientific reporting and academic papers',
      'ការប្រៀបធៀប Present Perfect និង Past Simple ព្រមទាំងការអានអត្ថបទបែប STEM',
      $BODY_EN$## Scientific English Conventions
Distinguishing completed past findings from ongoing research findings using correct verb aspects.$BODY_EN$,
      $BODY_KM$## 1. Present Perfect vs. Past Simple
- **Past Simple:** Finished past action with specific time (e.g., Einstein published his paper in 1905).
- **Present Perfect:** Past action connected to present or without specific time (e.g., Scientists have discovered new exoplanets).
- *Form:* Subject + have/has + Past Participle (V3).$BODY_KM$,
      20,
      42,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Conditionals (Type 1 & 2) & Academic Connectors (english - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Conditionals (Type 1 & 2) & Academic Connectors',
      'Conditionals (Type 1 & 2) & Academic Connectors',
      'Real and unreal conditional hypotheses, with discourse transition words',
      'លក្ខខណ្ឌពិត និងមិនពិត ព្រមទាំងពាក្យភ្ជាប់គំនិតពិភាក្សា',
      $BODY_EN$## Conditional Grammar & Discursive Logic
Covers First (real) and Second (unreal hypothesis) conditionals alongside rigorous academic consequence connectors.$BODY_EN$,
      $BODY_KM$## 1. First Conditional (Real Possibility in Present/Future)
- **Form:** *If + Present Simple, will + base verb*
  - "If you study consistently, you will pass the national examination with Grade A."

## 2. Second Conditional (Hypothetical / Unreal in Present)
- **Form:** *If + Past Simple, would + base verb*
  - "If I had more time, I would research environmental conservation in the Cardamoms."
  - *Note:* Use *were* for all persons in formal academic writing (*"If I were you..."*).

## 3. Cause & Effect Connectors
- *Therefore, Consequently, As a result, Because of this...*$BODY_KM$,
      20,
      42,
      true,
      109
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Algorithms & Flowcharts (ict - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Algorithms & Flowcharts',
      'ក្បួនដោះស្រាយ និងដ្យាក្រាមលំហូរ (Algorithms & Flowcharts)',
      'Algorithmic thinking, standard flowchart symbols, decision logic, and pseudocode structures',
      'គំនិតនៃ Algorithm សញ្ញាសម្គាល់ក្នុង Flowchart (Start, Decision, Process) និង Pseudo-code',
      $BODY_EN$## Computational Thinking
Deconstructing complex problems into discrete, deterministic algorithmic sequences and standard flowchart notation.$BODY_EN$,
      $BODY_KM$## ១. អ្វីជាក្បួនដោះស្រាយ (Algorithm)?
Algorithm គឺជាសំណុំនៃជំហានច្បាស់លាស់ និងមានលំដាប់លំដោយសម្រាប់ដោះស្រាយបញ្ហាណាមួយ។

## ២. និមិត្តសញ្ញាស្តង់ដារក្នុង Flowchart
- **Oval (រាងពងក្រពើ)៖** Start / End (ចំណុចចាប់ផ្តើម និងបញ្ចប់)
- **Rectangle (ចតុកោណកែង)៖** Process (ដំណើរការ ឬការគណនា)
- **Parallelogram (ប្រលេឡូក្រាម)៖** Input / Output (ការបញ្ចូល ឬបង្ហាញទិន្នន័យ)
- **Diamond (រាងពេជ្រ)៖** Decision (ការសម្រេចចិត្តតាមលក្ខខណ្ឌ If-Else)។$BODY_KM$,
      20,
      42,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Algorithms, Logic Pseudocode & Flowcharts (ict - G10)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      10,
      'Algorithms, Logic Pseudocode & Flowcharts',
      'ក្បួនដោះស្រាយបញ្ហា (Algorithms) និងគំនូសតាង (Flowcharts)',
      'Algorithmic thinking, branching logic, loop constructs, and standard ISO flowchart symbols',
      'ការរៀបចំជំហានដោះស្រាយបញ្ហា លក្ខខណ្ឌ IF-THEN-ELSE រង្វិលជុំ LOOP និងនិមិត្តសញ្ញាគំនូសតាង',
      $BODY_EN$## Computational Thinking & Flowcharts
Formalization of algorithms, sequential instruction pipelines, conditional branching (diamond gates), and pseudocode syntax.$BODY_EN$,
      $BODY_KM$## ១. អ្វីជាក្បួនដោះស្រាយបញ្ហា (Algorithm)?
Algorithm គឺជាលំដាប់លំដោយនៃជំហានដោះស្រាយបញ្ហាយ៉ាងច្បាស់លាស់ ត្រឹមត្រូវ និងមានទីបញ្ចប់។

## ២. និមិត្តសញ្ញាគំនូសតាងស្ដង់ដារ (Flowchart Symbols)
- **Oval (Terminator)៖** ចាប់ផ្តើម (Start) ឬ បញ្ចប់ (End)
- **Rectangle (Process)៖** ការគណនា ឬប្រតិបត្តិការ (ឧ. 'Sum = A + B')
- **Diamond (Decision)៖** ការធ្វើសេចក្តីសម្រេច/លក្ខខណ្ឌ (ឧ. 'Score >= 50 ?') ផ្តល់លទ្ធផល Yes ឬ No
- **Parallelogram (Input/Output)៖** ការបញ្ចូល ឬបង្ហាញទិន្នន័យ (ឧ. 'Read X', 'Print Result')។$BODY_KM$,
      20,
      42,
      true,
      111
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Sim the Driver Novel (Modern Literature & Society) (khmer - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Sim the Driver Novel (Modern Literature & Society)',
      'រឿងស៊ីមអ្នកបរឡាន (អក្សរសិល្ប៍ទំនើប និងសង្គម)',
      'Analysis of working-class consciousness, urban solidarity, and progressive social themes',
      'ការវិភាគតួអង្គស៊ីម ជីវភាពវណ្ណៈកម្មករ និងស្មារតីសាមគ្គីភាពក្នុងសង្គមកម្ពុជា',
      $BODY_EN$## Social Realism in Sim the Driver
A benchmark mid-20th century Cambodian progressive novel exploring working-class dignity and collective community support.$BODY_EN$,
      $BODY_KM$## ១. សាវតានៃរឿងស៊ីមអ្នកបរឡាន
និពន្ធដោយលោក **អ៊ឹម ថុក** នៅឆ្នាំ ១៩៥៦ ជារឿងប្រលោមលោកបែបតថនិយមសង្គម ឆ្លុះបញ្ចាំងពីជីវិតពិតរបស់អ្នកធ្វើការងារស៊ីឈ្នួលនៅភ្នំពេញ។

## ២. ការវិភាគតួអង្គស៊ីម
ស៊ីមជាអ្នកបើកបររថយន្តឈ្នួលដ៏ស្មោះត្រង់ ឧស្សាហ៍ និងចេះជួយយកអាសាមិត្តភក្តិ។ ស៊ីមយល់ច្បាស់ពីតម្លៃនៃកម្លាំងពលកម្ម និងការរួបរួមសាមគ្គីភាពគ្នារវាងកម្មករដើម្បីទាមទារសិទ្ធិ និងភាពយុត្តិធម៌។$BODY_KM$,
      22,
      44,
      true,
      101
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Mealea Doung Chett Novel Analysis (Nou Hach) (khmer - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Mealea Doung Chett Novel Analysis (Nou Hach)',
      'រឿងមាលាដួងចិត្ត (ស្នាដៃ នូ ហាច - ការវិភាគស្នេហាជាតិ)',
      'Analysis of Nou Hach''s classic novel: overseas intellectual struggles and patriotism',
      'ការវិភាគតួអង្គធីតា ធារិទ្ធ ជីវិតនិស្សិតខ្មែរនៅបារាំង និងមនសិការស្នេហាជាតិ',
      $BODY_EN$## Modern Khmer Realism: Mealea Doung Chett
Analyzes Nou Hach's epistolary style, the diaspora experience of students in mid-century France, and the elevation of national duty over romance.$BODY_EN$,
      $BODY_KM$## ១. សាវតានៃរឿងមាលាដួងចិត្ត
ស្នាដៃនិពន្ធរបស់លោក នូ ហាច (បោះពុម្ពឆ្នាំ ១៩៧២) បង្ហាញពីទស្សនៈទំនើបរបស់បញ្ញវន្តខ្មែរក្នុងទសវត្សរ៍ ១៩៤០-១៩៥០។

## ២. ការវិភាគតួអង្គ និងតម្លៃអប់រំ
- **តួអង្គធារិទ្ធ៖** និស្សិតខ្មែរដែលទៅរៀននៅប្រទេសបារាំង មានមនសិការស្នេហាជាតិខ្ពស់ ខិតខំរៀនសូត្រដើម្បីយកចំណេះដឹងមកអភិវឌ្ឍមាតុភូមិ។
- **តួអង្គធីតា៖** នារីខ្មែរទន់ភ្លន់ រក្សាប្រពៃណីថ្លៃថ្នូរ និងមានចិត្តស្មោះត្រង់។
- **តម្លៃស្នូល៖** ស្នេហាបុគ្គលត្រូវផ្សារភ្ជាប់នឹងស្នេហាជាតិ និងកាតព្វកិច្ចចំពោះសង្គម។$BODY_KM$,
      22,
      42,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: French Protectorate Era in Cambodia (1863–1953) (history - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'French Protectorate Era in Cambodia (1863–1953)',
      'សម័យអាណាព្យាបាលបារាំងនៅកម្ពុជា (១៨៦៣-១៩៥៣)',
      'The August 11, 1863 treaty, French administrative reorganization, and anticolonial movements',
      'សន្ធិសញ្ញា ១១ សីហា ១៨៦៣ ការកែទម្រង់រដ្ឋបាល និងចលនាតស៊ូរបស់ប្រជាជនខ្មែរ',
      $BODY_EN$## French Protectorate Dynamics
Examines colonial treaties, administrative modernization, and indigenous resistance movements leading to 1953 independence.$BODY_EN$,
      $BODY_KM$## ១. ការចុះសន្ធិសញ្ញាអាណាព្យាបាល (១៨៦៣)
ព្រះបាទនរោត្តមបានចុះហត្ថលេខាលើសន្ធិសញ្ញាអាណាព្យាបាលជាមួយបារាំងនៅថ្ងៃទី ១១ ខែសីហា ឆ្នាំ ១៨៦៣ ដើម្បីការពារប្រទេសកម្ពុជាពីការគំរាមកំហែងរបស់ប្រទេសជិតខាង (សៀម និងអណ្ណាម)។

## ២. ចលនាតស៊ូប្រឆាំងបារាំង
- ចលនាតស៊ូរបស់ក្រឡាហោមគង់ (១៨៨៥-១៨៨៦)
- ចលនាតស៊ូរបស់សម្តេចព្រះសង្ឃរាជជួន ណាត និងព្រះសង្ឃក្នុងការការពារអក្សរសាស្ត្រជាតិ
- ព្រឹត្តិការណ៍បះបោរនៅភូមិក្រាំងលាវ (១៩២៥)។$BODY_KM$,
      24,
      44,
      true,
      102
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Anticolonial Movements & World War Impacts in Southeast Asia (history - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Anticolonial Movements & World War Impacts in Southeast Asia',
      'ចលនាតស៊ូប្រឆាំងបារាំង និងឥទ្ធិពលសង្គ្រាមលោកនៅអាស៊ីអាគ្នេយ៍',
      'Kralahom Kong and Achar Sva uprisings, monastic patriotic mobilization, and wartime shifts',
      'ចលនាតស៊ូរបស់ក្រឡាហោមគង់ អាចារ្យស្វា ព្រះសង្ឃ និងឥទ្ធិពលសង្គ្រាមលោកលើកម្ពុជា',
      $BODY_EN$## Cambodian Anticolonial Resistance
Traces the trajectory from traditional peasant revolts (Achar Sva, Kralahom Kong) to intellectual-monastic civil protests (1942 Umbrella Demonstration).$BODY_EN$,
      $BODY_KM$## ១. ចលនាតស៊ូប្រឆាំងបារាំងនៅចុងសតវត្សទី ១៩
- **ចលនាអាចារ្យស្វា (១៨៦៥-១៨៦៦)៖** ដឹកនាំកសិករ និងអ្នកស្រុកប្រឆាំងនឹងការកៀបសង្កត់ពន្ធដារបារាំង។
- **ចលនាក្រឡាហោមគង់ (១៨៨៥-១៨៨៦)៖** បះបោរប្រឆាំងនឹងអនុសញ្ញាឆ្នាំ ១៨៨៤ ដែលបារាំងបង្ខំឱ្យព្រះបាទនរោត្តមប្រគល់អំណាច។
- **ចលនាឆ័ត្រ (១៩៤២)៖** ការដើរក្បួនដោយសន្តិវិធីរបស់ព្រះសង្ឃ និងបញ្ញវន្តខ្មែរនៅភ្នំពេញ (ដឹកនាំដោយអាចារ្យហែម ចៀវ និងសឺង ង៉ុកថាញ់)។

## ២. ឥទ្ធិពលនៃសង្គ្រាមលោកលើកម្ពុជា
- ជប៉ុនចូលកាន់កាប់ឥណ្ឌូចិនក្នុងសង្គ្រាមលោកលើកទី២ និងការប្រកាសឯករាជ្យបណ្តោះអាសន្នឆ្នាំ ១៩៤៥។$BODY_KM$,
      22,
      42,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Urbanization & Special Economic Zones (SEZ) (geography - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Urbanization & Special Economic Zones (SEZ)',
      'នគរូបនីយកម្ម និងតំបន់សេដ្ឋកិច្ចពិសេស (SEZ)',
      'Phnom Penh municipal growth, infrastructure expansion, and industrial SEZs',
      'ការរីកចម្រើននៃទីក្រុងភ្នំពេញ ហេដ្ឋារចនាសម្ព័ន្ធ និងតួនាទីតំបន់សេដ្ឋកិច្ចពិសេស',
      $BODY_EN$## Urbanization & Industrialization
Spatial dynamics of urban expansion and strategic deployment of SEZs for export diversification.$BODY_EN$,
      $BODY_KM$## ១. នគរូបនីយកម្មនៅកម្ពុជា
រាជធានីភ្នំពេញ និងទីក្រុងសំខាន់ៗ (ក្រុងព្រះសីហនុ បាត់ដំបង សៀមរាប ប៉ោយប៉ែត) កំពុងពង្រីកខ្លួនយ៉ាងឆាប់រហ័ស ដែលទាមទារផែនការមេហេដ្ឋារចនាសម្ព័ន្ធ ប្រព័ន្ធលូ និងការគ្រប់គ្រងសំណល់។

## ២. តំបន់សេដ្ឋកិច្ចពិសេស (SEZs)
តំបន់សេដ្ឋកិច្ចពិសេស (ដូចជានៅភ្នំពេញ ក្រុងព្រះសីហនុ បាវិត) ផ្តល់ការលើកទឹកចិត្តពន្ធដារ ដើម្បីទាក់ទាញរោងចក្រផលិតបរិក្ខារអេឡិចត្រូនិក សម្ភារៈបន្ទះ និងគ្រឿងបន្លាស់រថយន្ត។$BODY_KM$,
      22,
      44,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Transport Infrastructure, Expressways & Deep-Sea Ports (geography - G11)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      11,
      'Transport Infrastructure, Expressways & Deep-Sea Ports',
      'ហេដ្ឋារចនាសម្ព័ន្ធដឹកជញ្ជូន ផ្លូវល្បឿនលឿន និងកំពង់ផែទឹកជ្រៅ',
      'Phnom Penh-Sihanoukville Expressway, deep-sea container ports, and regional connectivity corridors',
      'ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ កំពង់ផែស្វយ័តក្រុងព្រះសីហនុ និងច្រករបៀងសេដ្ឋកិច្ចភាគខាងត្បូង',
      $BODY_EN$## Strategic Logistics & Connectivity Infrastructure
Covers expressways, deep-water port modernization in Sihanoukville, and Class 4F international aviation hubs driving economic competitiveness.$BODY_EN$,
      $BODY_KM$## ១. បណ្តាញផ្លូវគមនាគមន៍យុទ្ធសាស្ត្រ
- **ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ (E1)៖** កាត់បន្ថយពេលវេលាធ្វើដំណើរពី ៥ ម៉ោង មកត្រឹមក្រោម ២ ម៉ោង ជំរុញខ្សែច្រវាក់ផ្គត់ផ្គង់ពាណិជ្ជកម្ម។
- **ផ្លូវជាតិសំខាន់ៗ៖** ផ្លូវជាតិលេខ 1, 3, 4, 5, 6 តភ្ជាប់រាជធានីទៅកាន់គ្រប់បណ្តាខេត្ត និងប្រទេសជិតខាង (ថៃ វៀតណាម ឡាវ)។

## ២. កំពង់ផែសមុទ្រទឹកជ្រៅ និងផ្លូវអាកាស
- **កំពង់ផែស្វយ័តក្រុងព្រះសីហនុ (PAS)៖** កំពង់ផែទឹកជ្រៅតែមួយគត់របស់កម្ពុជា ដែលកំពុងពង្រីកចំណតកុងតឺន័រដើម្បីទទួលកប៉ាល់ធំៗពីអឺរ៉ុប និងអាមេរិក។
- អាកាសយានដ្ឋានអន្តរជាតិតេជោ (ក្រុងតាខ្មៅ) កម្រិត 4F សម្រាប់ហោះហើរអន្តរទ្វីប។$BODY_KM$,
      22,
      42,
      true,
      107
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Reamker Epic & Classical Khmer Literature (Bac II) (khmer - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Reamker Epic & Classical Khmer Literature (Bac II)',
      'រឿងរាមកេរ្តិ៍ខ្មែរ (អក្សរសិល្ប៍បុរាណ - វិញ្ញាសាបាក់ឌុប)',
      'Dharmic virtue ethics, hero archetypes, and aesthetic theory in the Reamker',
      'ទស្សនវិជ្ជាសីលធម៌ ព្រះធម៌ តួអង្គព្រះរាម នាងសិតា និងក្រុងរាពណ៍',
      $BODY_EN$## The Cambodian Reamker
Rooted in the Indian Ramayana but uniquely localized with Theravada Buddhist ethics, shaping national identity and classical royal ballet.$BODY_EN$,
      $BODY_KM$## ១. ប្រភព និងលក្ខណៈពិសេសនៃរឿងរាមកេរ្តិ៍ខ្មែរ
រឿងរាមកេរ្តិ៍ខ្មែរ មានប្រភពដើមមកពីរឿងរាមាយណៈឥណ្ឌា ប៉ុន្តែបុព្វបុរសខ្មែរបានកែច្នៃឱ្យស្របតាមទស្សនវិជ្ជាព្រះពុទ្ធសាសនា ទំនៀមទម្លាប់ និងចិត្តគំនិតខ្មែរ។

## ២. ការវិភាគតួអង្គ និងជម្លោះមនោគមវិជ្ជា
- **ព្រះរាម៖** តំណាងឱ្យអវតារនៃព្រះធម៌ ភាពស្មោះត្រង់ចំពោះពាក្យសច្ចៈ និងកាតព្វកិច្ចរាជការ។
- **នាងសិតា៖** តំណាងឱ្យស្ត្រីខ្មែរដ៏បរិសុទ្ធ មានភក្តីភាព និងការលះបង់ខ្ពស់។
- **ក្រុងរាពណ៍ (រាពណ៌):** តំណាងឱ្យអំណាច អវិជ្ជា តណ្ហា និងភាពអាត្មានិយម ដែលទីបំផុតត្រូវវិនាសដោយសារអធម៌។
- **ហនុមាន៖** តំណាងឱ្យសេចក្តីស្មោះត្រង់ ភាពវៃឆ្លាត និងកម្លាំងខ្លាំងពូកែ។

## ៣. ខ្លឹមសារក្នុងការប្រឡងបាក់ឌុប
វិញ្ញាសាតែងសេចក្តីបាក់ឌុបតែងតែលើកយករឿងរាមកេរ្តិ៍មកធ្វើជាប្រធានពន្យល់ ឬពិភាក្សាអំពី «អំពើល្អតែងតែឈ្នះអំពើអាក្រក់» និង «ការថែរក្សាសច្ចវាចា»។$BODY_KM$,
      25,
      45,
      true,
      101
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Phum Tirachan Novel Analysis (Bac II Core) (khmer - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Phum Tirachan Novel Analysis (Bac II Core)',
      'រឿងភូមិតិរច្ឆាន (ឌឹក គាម & ឌឿក អំ - វិញ្ញាសាបាក់ឌុប)',
      'Peasant resistance against French colonial taxation in Krang Leav village (Bandez)',
      'ចលនាតស៊ូរបស់កសិករខ្មែរនៅភូមិក្រាំងលាវប្រឆាំងនឹងពន្ធដារបារាំង (បាដេស)',
      $BODY_EN$## Phum Tirachan (Village of the Beasts)
Historical novel documenting the 1925 Krang Leav rebellion against oppressive French colonial taxation.$BODY_EN$,
      $BODY_KM$## ១. បរិបទប្រវត្តិសាស្ត្រ
រឿង «ភូមិតិរច្ឆាន» និពន្ធដោយលោក **ឌឹក គាម** និង **ឌឿក អំ** ឆ្លុះបញ្ចាំងពីព្រឹត្តិការណ៍ពិតនៅថ្ងៃទី ១៨ ខែមេសា ឆ្នាំ ១៩២៥ នៅភូមិក្រាំងលាវ ស្រុករលាប្អៀរ ខេត្តកំពង់ឆ្នាំង។

## ២. មូលហេតុនៃព្រឹត្តិការណ៍
បារាំងបានដំឡើងពន្ធដារយ៉ាងធ្ងន់ធ្ងរ (ពន្ធក្បាលមនុស្ស ពន្ធដី ពន្ធសត្វពាហនៈ)។ លោកបាដេស (Bandez) ជាអ្នកប្រមូលពន្ធបារាំង បានចាប់ចង និងធ្វើទារុណកម្មអ្នកភូមិដែលគ្មានប្រាក់បង់ពន្ធ។

## ៣. ការបះបោរ និងការដាក់ឈ្មោះភូមិ
ដោយទ្រាំមិនបាននឹងការជិះជាន់ អ្នកភូមិដឹកនាំដោយតាជួន និងអ្នកភូមិឯទៀត បានងើបបះបោរសម្លាប់បាដេស។ អាជ្ញាធរបារាំងបានសងសឹកដោយប្តូរឈ្មោះភូមិក្រាំងលាវទៅជា «ភូមិតិរច្ឆាន» (ភូមិសត្វតិរច្ឆាន)។

## ៤. សារៈសំខាន់សម្រាប់ការប្រឡងបាក់ឌុប
បង្ហាញពីស្មារតីស្នេហាជាតិ ភាពអង់អាចក្លាហានរបស់កសិករខ្មែរ និងភាពអយុត្តិធម៌នៃរបបអាណានិគម។$BODY_KM$,
      25,
      45,
      true,
      102
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Kolap Pailin Novel: Humanism, Labor & Integrity (Nhok Them) (khmer - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Kolap Pailin Novel: Humanism, Labor & Integrity (Nhok Them)',
      'រឿងកុលាបប៉ៃលិន (ស្នាដៃ ញ៉ុក ថែម - ទស្សនៈមនុស្សធម៌)',
      'Literary analysis of Chao Chet, Khun Neary, and the humanistic virtues of honest work in Pailin',
      'ការវិភាគតួអង្គចៅចិត្រ ឃុននារី ផែនដីពេជ្រប៉ៃលិន និងគុណធម៌ការងារស្មោះត្រង់',
      $BODY_EN$## Humanism in Kolap Pailin
Literary critique of Chao Chet's moral integrity, labor dignity, and egalitarian values transcending feudal caste divisions in colonial-era Pailin.$BODY_EN$,
      $BODY_KM$## ១. សាវតានិងទស្សនវិជ្ជានៃរឿងកុលាបប៉ៃលិន
និពន្ធដោយលោក ញ៉ុក ថែម (បោះពុម្ពឆ្នាំ ១៩៤៣)។ រឿងនេះឆ្លុះបញ្ចាំងពីតម្លៃសីលធម៌នៃការតស៊ូព្យាយាម ភាពស្មោះត្រង់ និងទស្សនៈមនុស្សធម៌ជឿនលឿន។

## ២. ការវិភាគតួអង្គចៅចិត្រ
- ចៅចិត្រជាយុវជនមានប្រភពពីគ្រួសារក្រីក្រ ប៉ុន្តែមានចរិយាសម្បត្តិថ្លៃថ្នូរ ឧស្សាហ៍ព្យាយាម មានភក្តីភាព និងមិនលោភលន់ចំពោះទ្រព្យសម្បត្តិរបស់អ្នកដទៃ (ពេលរើសបានពេជ្រធ្លាក់)។
- ស្នេហារវាងចៅចិត្រ និងឃុននារី យកឈ្នះលើរបាំងវណ្ណៈសង្គម ដោយសារគុណធម៌ និងការទទួលស្គាល់ពីហ្លួងរតនសម្បត្តិ។

## ៣. តម្លៃអប់រំសម្រាប់វិញ្ញាសាបាក់ឌុប
- "តម្លៃមនុស្សស្ថិតនៅលើអំពើល្អ សេចក្តីព្យាយាម និងចំណេះដឹង មិនមែនលើទ្រព្យសម្បត្តិឡើយ"។$BODY_KM$,
      24,
      45,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Bac II Khmer Essay Methodology: Expository & Discursive (khmer - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'khmer';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Bac II Khmer Essay Methodology: Expository & Discursive',
      'វិធីសាស្ត្រតែងសេចក្តីពន្យល់ និងពិភាក្សាសម្រាប់បាក់ឌុប (Bac II Essay Writing)',
      'Rigorous MoEYS grading rubric structure, argumentative proofs, and rhetorical synthesis for Bac II Grade A',
      'គន្លឹះដោះស្រាយប្រធានតែងសេចក្តីពន្យល់ ពិភាក្សា និងប្រៀបធៀបដើម្បីទទួលបាននិទ្ទេស A',
      $BODY_EN$## Baccalaureate II National Khmer Essay Protocol
Methodological mastery of MoEYS criteria: thesis construction, antithetical counter-arguments, literary evidence integration, and dialectical synthesis.$BODY_EN$,
      $BODY_KM$## ១. ក្បួនតែងសេចក្តីកម្រិតបាក់ឌុប (Baccalaureate II Standards)
តែងសេចក្តីមាន ៣ ប្រភេទធំៗដែលតែងចេញប្រឡងបាក់ឌុប៖
១. **ប្រធានពន្យល់៖** តម្រូវឱ្យសិស្សពន្យល់ន័យ លើកឧទាហរណ៍បញ្ជាក់ឱ្យច្បាស់ពីខ្លឹមសារប្រធាន។
២. **ប្រធានពិភាក្សា៖** តម្រូវឱ្យសិស្សពិចារណាគំនិត ២ ផ្ទុយគ្នា (គំនិតស្រប និងគំនិតជំទាស់) រួចធ្វើការសំយោគគំនិត។
៣. **ប្រធានប្រៀបធៀប៖** រកចំណុចដូចគ្នា និងចំណុចខុសគ្នារវាងស្នាដៃពីរ ឬទស្សនៈពីរ។

## ២. ប្លង់លម្អិតនៃតួសេចក្តីប្រធានពិភាក្សា
- **គំនិតស្រប (Thesis):** ពន្យល់និងលើកភស្តុតាងគាំទ្រទស្សនៈទីមួយ
- **គំនិតជំទាស់ (Antithesis):** ចង្អុលបង្ហាញដែនកំណត់ ឬទស្សនៈផ្ទុយ
- **ការសំយោគគំនិត (Synthesis):** រកចំណុចកណ្តាលដ៏ត្រឹមត្រូវតាមទស្សនវិជ្ជាជីវិតជាក់ស្តែង។$BODY_KM$,
      25,
      45,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Paris Peace Agreements (October 23, 1991) (history - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Paris Peace Agreements (October 23, 1991)',
      'កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១',
      'Comprehensive peace process, UNTAC mission, 1993 elections, and Second Kingdom',
      'ដំណើរការស្វែងរកសន្តិភាព ការបោះឆ្នោតឆ្នាំ ១៩៩៣ និងការកកើតព្រះរាជាណាចក្រកម្ពុជាទី២',
      $BODY_EN$## Paris Peace Accords (1991)
Historical landmark ending civil war, leading to the UNTAC peacekeeping mission and the restoration of the Kingdom of Cambodia.$BODY_EN$,
      $BODY_KM$## ១. មូលហេតុ និងដំណើរការចរចា
ក្រោយសង្គ្រាមស៊ីវិលដ៏រ៉ាំរ៉ៃ ភាគីខ្មែរទាំង ៤ បានចូលរួមចរចារកសន្តិភាព ក្រោមព្រះរាជកិច្ចដឹកនាំរបស់ **ព្រះករុណា ព្រះបាទ សម្តេចព្រះ នរោត្តម សីហនុ** ដោយមានការគាំទ្រពីសហគមន៍អន្តរជាតិ។

## ២. ចំណុចស្នូលនៃកិច្ចព្រមព្រៀង ២៣ តុលា ១៩៩១
- បញ្ចប់ជម្លោះប្រដាប់អាវុធ និងបង្រួបបង្រួមជាតិ
- បង្កើតអាជ្ញាធរបណ្តោះអាសន្នអង្គការសហប្រជាជាតិនៅកម្ពុជា (UNTAC)
- រៀបចំការបោះឆ្នោតសកលដោយសេរី ត្រឹមត្រូវ និងយុត្តិធម៌ នៅខែឧសភា ឆ្នាំ ១៩៩៣
- បង្កើតរដ្ឋធម្មនុញ្ញថ្មី និងស្ថាបនាឡើងវិញនូវ «ព្រះរាជាណាចក្រកម្ពុជា» តាមរបបរាជានិយមអាស្រ័យរដ្ឋធម្មនុញ្ញ។$BODY_KM$,
      25,
      45,
      true,
      103
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Win-Win Policy & Complete National Peace (history - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Win-Win Policy & Complete National Peace',
      'នយោបាយឈ្នះ-ឈ្នះ និងសន្តិភាពពេញលេញនៅកម្ពុជា',
      'Dissolution of Khmer Rouge military structures, territorial integrity, and 1998 unity',
      'ការរំលាយអង្គការចាត់តាំងខ្មែរក្រហម ការបង្រួបបង្រួមទឹកដី និងឯកភាពជាតិឆ្នាំ ១៩៩៨',
      $BODY_EN$## Win-Win Policy (1998)
Guaranteed life, profession, and property to former combatants, achieving complete territorial and political peace for the first time in over five centuries.$BODY_EN$,
      $BODY_KM$## ១. សសរស្តម្ភ ៣ នៃនយោបាយឈ្នះ-ឈ្នះ
១. **ធានាអាយុជីវិត និងរូបកាយ៖** គ្មានការសងសឹក ឬចាប់ចងអ្នកផ្តាច់ខ្លួនឡើយ
២. **ធានាអាជីព និងមុខរបរ៖** ទទួលស្គាល់ឋានន្តរសក្តិ និងតួនាទីក្នុងជួរកងទ័ព/រដ្ឋបាល
៣. **ធានាកម្មសិទ្ធិ និងទ្រព្យសម្បត្តិ៖** រក្សាទុកដីធ្លី និងផ្ទះសម្បែងជូនអ្នកផ្តាច់ខ្លួន

## ២. លទ្ធផលជាប្រវត្តិសាស្ត្រ
នៅចុងឆ្នាំ ១៩៩៨ អង្គការចាត់តាំងខាងនយោបាយ និងយោធារបស់ខ្មែរក្រហមត្រូវបានរំលាយទាំងស្រុង ដែលនាំមកនូវសន្តិភាព និងការរួបរួមទឹកដីពេញលេញជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រជាង ៥០០ ឆ្នាំ។$BODY_KM$,
      22,
      45,
      true,
      104
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: 1991 Paris Peace Accords & UNTAC Democratic Elections (history - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      '1991 Paris Peace Accords & UNTAC Democratic Elections',
      'កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស ២៣ តុលា ១៩៩១ និងការបោះឆ្នោតអ៊ុនតាក់',
      'Four-party negotiations, 1991 Paris Accords signing, UNTAC peacekeeping mission, and the 1993 Constitution',
      'ការចរចាសន្តិភាព ការចុះហត្ថលេខានៅប៉ារីស បេសកកម្មអ៊ុនតាក់ និងការបង្កើតរដ្ឋធម្មនុញ្ញថ្មី ១៩៩៣',
      $BODY_EN$## The 1991 Paris Peace Accords & UNTAC
The historic quadripartite diplomatic peace architecture that ended decades of civil conflict, paving the way for the UNTAC mission and the 1993 Constitution.$BODY_EN$,
      $BODY_KM$## ១. កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស (២៣ តុលា ១៩៩១)
បន្ទាប់ពីសង្គ្រាមស៊ីវិលរ៉ាំរ៉ៃជាងពីរទសវត្សរ៍ ភាគីជម្លោះកម្ពុជាទាំង ៤ បានចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងសន្តិភាពនៅទីក្រុងប៉ារីស ដោយមានប្រទេសហត្ថលេខីចំនួន ១៨ ចូលរួមធ្វើជាសាក្សី។
- គោលការណ៍គ្រឹះ៖ បញ្ចប់សង្គ្រាម ដកកងទ័ពបរទេស និងរៀបចំការបោះឆ្នោតតាមបែបប្រជាធិបតេយ្យ។

## ២. បេសកកម្មអ៊ុនតាក់ (UNTAC) និងការបោះឆ្នោតឆ្នាំ ១៩៩៣
- អាជ្ញាធរបណ្តោះអាសន្នអង្គការសហប្រជាជាតិនៅកម្ពុជា (UNTAC) បានរៀបចំការបោះឆ្នោតសកលនៅខែឧសភា ឆ្នាំ ១៩៩៣ ដែលមានប្រជាពលរដ្ឋចូលរួមបោះឆ្នោតជិត ៩០%។
- សភាធម្មនុញ្ញត្រូវបានបង្កើតឡើង និងអនុម័ត **រដ្ឋធម្មនុញ្ញថ្មីនៅថ្ងៃទី ២៤ កញ្ញា ១៩៩៣** ដោយប្រកាសព្រះរាជាណាចក្រកម្ពុជាទីពីរ និងរបបរាជាធិបតេយ្យអាស្រ័យរដ្ឋធម្មនុញ្ញ។$BODY_KM$,
      24,
      45,
      true,
      107
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Win-Win Policy, Khmer Rouge Dissolution & Complete Peace (1998) (history - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'history';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Win-Win Policy, Khmer Rouge Dissolution & Complete Peace (1998)',
      'នយោបាយ ឈ្នះ-ឈ្នះ ការរំលាយអង្គការចាត់តាំងខ្មែរក្រហម និងសន្តិភាពពេញលេញ (១៩៩៨)',
      'Three core tenets of Win-Win policy, demobilization, full pacification, and nation-building era',
      'គោលការណ៍គ្រឹះទាំងបីនៃនយោបាយឈ្នះ-ឈ្នះ ការធ្វើសមាហរណកម្មកងទ័ព និងសន្តិភាពពេញលេញទូទាំងប្រទេស',
      $BODY_EN$## The Win-Win Policy & Comprehensive Pacification
Analyzes the tri-pillar guarantees (life, career integration, property preservation) that peacefully dissolved the Khmer Rouge movement by December 1998.$BODY_EN$,
      $BODY_KM$## ១. យុទ្ធសាស្ត្រនយោបាយ ឈ្នះ-ឈ្នះ (ដាក់ចេញដោយសម្តេចតេជោ ហ៊ុន សែន)
ទោះបីមានការបោះឆ្នោតឆ្នាំ ១៩៩៣ ក៏កម្ពុជាមិនទាន់មានសន្តិភាពពេញលេញនៅឡើយ ដោយសារកងកម្លាំងខ្មែរក្រហមបន្តកាន់កាប់តំបន់មួយចំនួន (ប៉ៃលិន សំឡូត អន្លង់វែង)។ "នយោបាយ ឈ្នះ-ឈ្នះ" ត្រូវបានដាក់ចេញដើម្បីបញ្ចប់សង្គ្រាមដោយសន្តិវិធី។

## ២. គោលការណ៍គ្រឹះទាំង ៣ នៃនយោបាយ ឈ្នះ-ឈ្នះ
១. **ការធានាអាយុជីវិត និងរូបកាយ៖** គ្មានការសងសឹក គ្មានការចាប់ចង ឬសម្លាប់
២. **ការធានាអាជីព និងមុខរបរ៖** ទទួលស្គាល់ឋានៈ និងបញ្ចូលកងទ័ពខ្មែរក្រហមទៅក្នុងកងយោធពលខេមរភូមិន្ទ
៣. **ការធានាកម្មសិទ្ធិ និងទ្រព្យសម្បត្តិ៖** អនុញ្ញាតឱ្យរក្សាទុកដីធ្លី និងផ្ទះសម្បែងដែលកំពុងកាន់កាប់។

## ៣. លទ្ធផលជាប្រវត្តិសាស្ត្រ (២៩ ធ្នូ ១៩៩៨)
នៅចុងឆ្នាំ ១៩៩៨ អង្គការចាត់តាំងទាំងខាងនយោបាយនិងយោធារបស់ខ្មែរក្រហមត្រូវបានរំលាយទាំងស្រុង កម្ពុជាទទួលបាន **សន្តិភាព និងឯកភាពជាតិពេញលេញជាលើកដំបូងក្នុងរយៈពេលជាង ៥០០ ឆ្នាំ**។$BODY_KM$,
      24,
      45,
      true,
      108
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Cambodia's Economy & ASEAN Integration (geography - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Cambodia''s Economy & ASEAN Integration',
      'សេដ្ឋកិច្ចកម្ពុជា និងសមាហរណកម្មអាស៊ាន',
      'Four economic growth pillars (garments, tourism, construction, agriculture) & ASEAN',
      'សសរស្តម្ភសេដ្ឋកិច្ចទាំង ៤ (កាត់ដេរ ទេសចរណ៍ សំណង់ កសិកម្ម) និងកាលានុវត្តភាពអាស៊ាន',
      $BODY_EN$## 4 Pillars of Economic Growth
Garments, tourism, construction, and agriculture sustain Cambodia's GDP expansion within the ASEAN Economic Community.$BODY_EN$,
      $BODY_KM$## ១. សសរស្តម្ភទាំង ៤ នៃកំណើនសេដ្ឋកិច្ចកម្ពុជា
១. **វិស័យកាត់ដេរ និងស្បែកជើង៖** ប្រភពនាំចេញដ៏ធំបំផុត និងផ្តល់ការងាររាប់សែនកន្លែង
២. **វិស័យទេសចរណ៍៖** «មាសបៃតង» ទាក់ទាញភ្ញៀវទេសចរអន្តរជាតិមកទស្សនាប្រាសាទបុរាណ និងតំបន់ឆ្នេរ
៣. **វិស័យសំណង់ និងអចលនទ្រព្យ៖** ជំរុញការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធ និងនគរូបនីយកម្ម
៤. **វិស័យកសិកម្ម៖** ស្រូវ អង្ករ កៅស៊ូ ដំឡូងមី ស្វាយចន្ទី ធានាសន្តិសុខស្បៀង

## ២. សមាហរណកម្មក្នុងសហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC)
កម្ពុជាបានចូលជាសមាជិកអាស៊ាននៅឆ្នាំ ១៩៩៩ ដោយទទួលបានអត្ថប្រយោជន៍ពីទីផ្សារសេរី ការវិនិយោគផ្ទាល់ពីបរទេស (FDI) និងកិច្ចសហប្រតិបត្តិការតំបន់។$BODY_KM$,
      22,
      45,
      true,
      105
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: ASEAN Economic Integration & Regional Trade (geography - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'ASEAN Economic Integration & Regional Trade',
      'សមាហរណកម្មអាស៊ាន និងសេដ្ឋកិច្ចតំបន់ (ASEAN Community)',
      'AEC single market, RCEP tariff elimination, and Cambodia''s geoeconomic position in ASEAN',
      'សហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC) កិច្ចព្រមព្រៀង RCEP និងតួនាទីយុទ្ធសាស្ត្រកម្ពុជា',
      $BODY_EN$## ASEAN Integration & Regional Geoeconomics
Details Cambodia's entry into ASEAN (1999), AEC market dynamics, and the RCEP megaregional trade agreement.$BODY_EN$,
      $BODY_KM$## ១. សហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC)
- កម្ពុជាបានចូលជាសមាជិកអាស៊ាននៅថ្ងៃទី ៣០ ខែមេសា ឆ្នាំ ១៩៩៩ (ជាសមាជិកទី ១០)។
- សហគមន៍សេដ្ឋកិច្ចអាស៊ាន (AEC) បង្កើតទីផ្សារ និងមូលដ្ឋានផលិតកម្មតែមួយ ដោយមានលំហូរដោយសេរីនូវទំនិញ សេវាកម្ម វិនិយោគ និងពលករជំនាញ។

## ២. កិច្ចព្រមព្រៀង RCEP និងពាណិជ្ជកម្មអន្តរជាតិ
- កិច្ចព្រមព្រៀងភាពជាដៃគូសេដ្ឋកិច្ចគ្រប់ជ្រុងជ្រោយតំបន់ (RCEP) បង្កើតប្លុកពាណិជ្ជកម្មសេរីធំបំផុតក្នុងពិភពលោក (អាស៊ាន + ចិន ជប៉ុន កូរ៉េខាងត្បូង អូស្ត្រាលី នូវែលសេឡង់)
- ផ្តល់ឱកាសឱ្យកម្ពុជានាំចេញកសិផល គ្រឿងអេឡិចត្រូនិក និងទាក់ទាញវិនិយោគទុនផ្ទាល់ពីបរទេស (FDI)។$BODY_KM$,
      22,
      45,
      true,
      110
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Climate Change, Droughts & Sustainable Hydrology (geography - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Climate Change, Droughts & Sustainable Hydrology',
      'បម្រែបម្រួលអាកាសធាតុ និងការគ្រប់គ្រងធនធានទឹកកម្ពុជា',
      'Impact of global warming on the Mekong-Tonle Sap pulse, drought resilience, and renewable policies',
      'ផលប៉ះពាល់នៃការឡើងកម្តៅផែនដី ទឹកជំនន់ រាំងស្ងួត និងយុទ្ធសាស្ត្រធន់នឹងអាកាសធាតុ',
      $BODY_EN$## Climate Resilience & Mekong Hydrology
Analyzes the changing Mekong-Tonle Sap flood pulse, drought vulnerability, and Cambodia's Climate Change Strategic Plan (CCCSP).$BODY_EN$,
      $BODY_KM$## ១. ផលប៉ះពាល់នៃបម្រែបម្រួលអាកាសធាតុនៅកម្ពុជា
- **បាតុភូតអែលនីញ៉ូ (El Niño) និងឡានីញ៉ា (La Niña)៖** បង្កឱ្យមានគ្រោះរាំងស្ងួតអូសបន្លាយ ឬទឹកជំនន់ធ្ងន់ធ្ងរខុសប្រក្រតី។
- **ការប្រែប្រួលរបបទឹកទន្លេមេគង្គ៖** ធ្វើឱ្យប៉ះពាល់ដល់ការហូរច្រាសទិសនៃបឹងទន្លេសាប ការបន្តពូជរបស់ត្រី និងការស្រោចស្រពកសិកម្ម។

## ២. យុទ្ធសាស្ត្រជាតិស្តីពីការប្រែប្រួលអាកាសធាតុ (CCCSP)
- ការកសាងទំនប់អាងស្តុកទឹក និងប្រព័ន្ធព្រមានគ្រោះមហន្តរាយទុកជាមុន
- ការជំរុញថាមពលកកើតឡើងវិញ (ថាមពលពន្លឺព្រះអាទិត្យ វារីអគ្គិសនី) និងការកាត់បន្ថយការបំភាយឧស្ម័នផ្ទះកញ្ចក់។$BODY_KM$,
      22,
      45,
      true,
      111
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Urban Growth & Phnom Penh Metropolitan Master Plan (geography - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'geography';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Urban Growth & Phnom Penh Metropolitan Master Plan',
      'នគរូបនីយកម្ម និងផែនការមេអភិវឌ្ឍន៍រាជធានីភ្នំពេញ (Urbanization)',
      'Rapid urban demographic growth, zoning, solid waste management, and green smart city master planning',
      'ការកើនឡើងប្រជាជនទីក្រុង ការគ្រប់គ្រងសំណល់ ហេដ្ឋារចនាសម្ព័ន្ធបៃតង និងទីក្រុងឆ្លាតវៃ (Smart City)',
      $BODY_EN$## Urban Geography & Phnom Penh Master Plan 2035
Studies demographic concentration, satellite cities, municipal solid waste management, and smart transit infrastructure.$BODY_EN$,
      $BODY_KM$## ១. ល្បឿននៃនគរូបនីយកម្មនៅកម្ពុជា
- រាជធានីភ្នំពេញមានប្រជាជនរស់នៅជាង ២,២ លាននាក់ ដោយសារកំណើនសេដ្ឋកិច្ច និងការធ្វើចំណាកស្រុកពីជនបទមករកការងារ។
- ការពង្រីកទីក្រុងរណប (កោះពេជ្រ ជ្រោយចង្វារ អ៊ឹង ខុងទ្រី ទីក្រុងកាំកូ)។

## ២. បញ្ហាប្រឈម និងផែនការមេឆ្នាំ ២០៣៥
- **បញ្ហាប្រឈម៖** ការកកស្ទះចរាចរណ៍ ការគ្រប់គ្រងសំណល់រឹង និងប្រព័ន្ធលូបង្ហូរទឹកភ្លៀងជៀសវាងការលិចលង់។
- **ផែនការមេ៖** ការសាងសង់ប្រព័ន្ធដឹកជញ្ជូនសាធារណៈ (រថយន្តក្រុង ផ្លូវដែកស្រាល AGT) និងការបង្កើនលំហបៃតងសាធារណៈ។$BODY_KM$,
      22,
      45,
      true,
      112
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Social Ethics, Rule of Law & Human Rights (morality - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'morality';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Social Ethics, Rule of Law & Human Rights',
      'សីលធម៌សង្គម នីតិរដ្ឋ និងសិទ្ធិមនុស្ស',
      'Human dignity, equality before the law, constitutional rights, and civic duties',
      'សេចក្តីថ្លៃថ្នូររបស់មនុស្ស សមភាពចំពោះមុខច្បាប់ និងទំនួលខុសត្រូវពលរដ្ឋ',
      $BODY_EN$## Rule of Law & Constitutional Rights
Every citizen is equal before the law with guaranteed human rights, educational access, and reciprocal civic responsibilities.$BODY_EN$,
      $BODY_KM$## ១. នីតិរដ្ឋ (Rule of Law)
នីតិរដ្ឋ គឺជាគោលការណ៍ដែលបុគ្គលគ្រប់រូប និងស្ថាប័នទាំងអស់ ត្រូវស្ថិតនៅក្រោមច្បាប់ និងស្មើភាពគ្នាចំពោះមុខច្បាប់ ដោយគ្មានការរើសអើង។

## ២. សិទ្ធិមនុស្ស និងសិទ្ធិពលរដ្ឋក្នុងរដ្ឋធម្មនុញ្ញកម្ពុជា
- **សិទ្ធិរស់រានមានជីវិត សេរីភាព និងសន្តិសុខផ្ទាល់ខ្លួន**
- **សិទ្ធិទទួលបានការអប់រំ និងការថែទាំសុខភាព**
- **សេរីភាពខាងជំនឿសាសនា និងការបញ្ចេញមតិក្នុងក្របខ័ណ្ឌច្បាប់**
- **កាតព្វកិច្ចពលរដ្ឋ៖** គោរពច្បាប់ ស្រឡាញ់មាតុភូមិ និងចូលរួមកសាងសង្គមជាតិ។$BODY_KM$,
      20,
      45,
      true,
      106
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Rule of Law, Professional Ethics & Anti-Corruption Mechanisms (morality - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'morality';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Rule of Law, Professional Ethics & Anti-Corruption Mechanisms',
      'នីតិរដ្ឋ ក្រមសីលធម៌វិជ្ជាជីវៈ និងការប្រឆាំងអំពើពុករលួយ',
      'Good governance, Anti-Corruption Unit (ACU) institutional role, accountability, and professional ethics',
      'អភិបាលកិច្ចល្អ តួនាទីអង្គភាពប្រឆាំងអំពើពុករលួយ (ACU) និងតម្លាភាពសង្គម',
      $BODY_EN$## Rule of Law & Institutional Integrity
Explores principles of good governance, the statutory authority of the Anti-Corruption Unit (ACU), and code of ethics across public and private sectors.$BODY_EN$,
      $BODY_KM$## ១. នីតិរដ្ឋ និងអភិបាលកិច្ចល្អ (Good Governance)
នីតិរដ្ឋ (Rule of Law) ធានាថាច្បាប់ត្រូវតែអនុវត្តស្មើភាពគ្នាចំពោះបុគ្គលគ្រប់រូប ទោះជាមន្ត្រីរដ្ឋ ឬប្រជាពលរដ្ឋសាមញ្ញ។
- **សសរស្តម្ភនៃអភិបាលកិច្ចល្អ៖** តម្លាភាព (Transparency), គណនេយ្យភាព (Accountability), ការចូលរួម (Participation) និងប្រសិទ្ធភាព។

## ២. ច្បាប់ស្តីពីការប្រឆាំងអំពើពុករលួយ និងអង្គភាព ACU
- អំពើពុករលួយបំផ្លាញសេដ្ឋកិច្ចជាតិ អយុត្តិធម៌សង្គម និងបាត់បង់ទំនុកចិត្តពីវិនិយោគិន។
- **តួនាទីរបស់ ACU៖** អប់រំ បង្ការទប់ស្កាត់ និងបង្ក្រាបបទល្មើសពុករលួយគ្រប់ទម្រង់
- **ក្រមសីលធម៌វិជ្ជាជីវៈ៖** ភាពស្មោះត្រង់ យុត្តិធម៌ មិនទទួលសំណូក និងការការពារផលប្រយោជន៍សាធារណៈ។$BODY_KM$,
      24,
      45,
      true,
      116
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Bac II Academic Reading Comprehension & Writing (english - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Bac II Academic Reading Comprehension & Writing',
      'Bac II Academic Reading Comprehension & Writing',
      'Skimming, scanning, contextual vocabulary, and error identification for national exams',
      'យុទ្ធសាស្ត្រដោះស្រាយវិញ្ញាសាអានយល់ន័យ វាក្យសព្ទ និងវេយ្យាករណ៍បាក់ឌុប',
      $BODY_EN$## National Bac II English Exam Strategy
Focuses on reading comprehension, contextual vocabulary inference, active-passive voice transformation, and conditional logic.$BODY_EN$,
      $BODY_KM$## 1. Reading Strategies for Bac II Examination
- **Skimming:** Read rapidly for the main idea and thesis statement.
- **Scanning:** Search for specific numbers, dates, proper nouns, or key formulas.
- **Context Clues:** Deduce the meaning of unfamiliar vocabulary using surrounding synonyms and contrast connectors.

## 2. Key Grammar Structures for National Exams
- Passive Voice: *Object + be + Past Participle (V3)*
  - *Active:* Scientists discover new renewable energy sources.
  - *Passive:* New renewable energy sources are discovered by scientists.
- Conditional Sentences (Types 1, 2, and 3)
- Relative Clauses (*who, which, that, where*)$BODY_KM$,
      22,
      45,
      true,
      107
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Bac II Argumentative Writing & Advanced Syntax Mastery (english - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'english';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Bac II Argumentative Writing & Advanced Syntax Mastery',
      'Bac II Argumentative Writing & Advanced Syntax Mastery',
      'Persuasive argumentation structure, thesis framing, formal syntactic inversions, and essay rubrics',
      'រចនាសម្ព័ន្ធតែងសេចក្តីជាភាសាអង់គ្លេស ការប្រើ Inversion, Cleft Sentences និង connectors',
      $BODY_EN$## Academic Writing & Formal Inversion
Mastering the PEEL paragraph framework, counter-argument refutation, and stylistically sophisticated negative inversions for national exams.$BODY_EN$,
      $BODY_KM$## 1. Advanced Argumentative Essay Architecture
- **Introductory Paragraph:** Hook + Background Context + Explicit Thesis Statement (*"While some believe X, evidence strongly indicates Y because A and B."*)
- **Body Paragraphs (PEEL method):**
  - **P**oint: Clear topic sentence introducing the argument
  - **E**xplanation: Detailed explanation of the underlying logic
  - **E**xample / Evidence: Authentic facts, statistics, or real-world cases
  - **L**ink: Connect back to the overarching thesis.
- **Refutation Paragraph:** Address counterarguments directly and refute them logically.

## 2. Advanced Syntactic Structures for High Exam Scores
- **Negative Inversion:**
  - *Normal:* "We rarely see such rapid economic modernization."
  - *Inverted:* "Rarely do we see such rapid economic modernization."
  - *Not only... but also:* "Not only does technology improve education, but it also creates green jobs."$BODY_KM$,
      24,
      45,
      true,
      114
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Relational Databases & SQL Fundamentals (ict - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Relational Databases & SQL Fundamentals',
      'មូលដ្ឋានទិន្នន័យទំនាក់ទំនង និងភាសា SQL',
      'Relational tables, primary/foreign keys, normalization, and structured queries',
      'តារាងទិន្នន័យ កូនសោចម្បង (Primary Key) កូនសោក្រៅ និងសំណួរ SQL (SELECT, INSERT)',
      $BODY_EN$## Relational Databases & SQL
Covers tables, primary/foreign key relational schema design, and standard SQL queries (SELECT, WHERE, JOIN).$BODY_EN$,
      $BODY_KM$## ១. គំនិតគ្រឹះនៃមូលដ្ឋានទិន្នន័យទំនាក់ទំនង (RDBMS)
- **Table (តារាង)៖** ផ្ទុកទិន្នន័យរៀបចំជាជួរដេក (Records/Rows) និងជួរឈរ (Columns/Fields)
- **Primary Key (PK)៖** កូនសោចម្បងសម្រាប់សម្គាល់ទិន្នន័យនីមួយៗមិនឱ្យជាន់គ្នា (Unique)
- **Foreign Key (FK)៖** កូនសោក្រៅសម្រាប់ភ្ជាប់ទំនាក់ទំនងរវាងតារាងពីរ

## ២. សំណួរមូលដ្ឋានក្នុងភាសា SQL
'''sql
-- ទាញយកទិន្នន័យសិស្សទាំងអស់ដែលមានពិន្ទុចាប់ពី ៨០ ឡើងទៅ
SELECT name, grade, score 
FROM students 
WHERE score >= 80 
ORDER BY score DESC;
'''$BODY_KM$,
      24,
      45,
      true,
      108
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Lesson: Computer Networks, Cybersecurity & Cloud Architecture (ict - G12)
  SELECT id INTO v_subject_id FROM public.subjects WHERE slug = 'ict';
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.lessons (subject_id, grade, title_en, title_km, summary_en, summary_km, body_en, body_km, estimated_minutes, xp_reward, is_published, sort_order)
    VALUES (
      v_subject_id,
      12,
      'Computer Networks, Cybersecurity & Cloud Architecture',
      'បណ្តាញកុំព្យូទ័រ សុវត្ថិភាពអ៊ីនធឺណិត និង Cloud Computing',
      'OSI 7-layer stack, TCP/IP, subnetting, symmetric/asymmetric encryption, and Cloud IaaS/PaaS',
      'គំរូ OSI, TCP/IP, អាសយដ្ឋាន IP, ការការពារមេរោគ Ransomware និងសេវា Cloud',
      $BODY_EN$## Networking, Security & Cloud Paradigm
In-depth coverage of LAN/WAN topologies, IPv4/IPv6 networking, cybersecurity hygiene (2FA, phishing detection, TLS encryption), and Cloud service tiers.$BODY_EN$,
      $BODY_KM$## ១. គំនិតគ្រឹះនៃបណ្តាញកុំព្យូទ័រ (Computer Networks)
- **ប្រភេទបណ្តាញ៖** LAN (Local Area Network), WAN (Wide Area Network - អ៊ីនធឺណិត)
- **គំរូ TCP/IP និងអាសយដ្ឋាន IP៖**
  - **IPv4 (32-bit):** ឧ. '192.168.1.1'
  - **IPv6 (128-bit):** ដោះស្រាយបញ្ហាកង្វះអាសយដ្ឋាន IP លើសកលលោក។

## ២. សុវត្ថិភាពអ៊ីនធឺណិត (Cybersecurity)
- **ការគំរាមកំហែងទូទៅ៖** Phishing (ការបោកបញ្ឆោតយកលេខសម្ងាត់), Malware, Ransomware (មេរោគចាប់ជំរិតទិន្នន័យ)
- **វិធានការការពារ៖** ការផ្ទៀងផ្ទាត់ ២ ជាន់ (Two-Factor Authentication - 2FA), ការប្រើលេខកូដសម្ងាត់ខ្លាំង និងការអ៊ិនគ្រីប (Encryption SSL/TLS)។

## ៣. Cloud Computing (IaaS, PaaS, SaaS)
ការប្រើប្រាស់ធនធានកុំព្យូទ័រតាមអ៊ីនធឺណិត (ដូចជា Google Drive, AWS, Cloud Storage) ដោយមិនចាំបាច់វិនិយោគលើម៉ាស៊ីន Server ផ្ទាល់។$BODY_KM$,
      24,
      45,
      true,
      118
    )
    ON CONFLICT DO NOTHING;
  END IF;

END $$;
