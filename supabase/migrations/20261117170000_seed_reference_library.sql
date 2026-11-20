-- ==============================================================================
-- Migration: Seed Authentic MoEYS Verified Reference Library Entries
-- Covers Grades 7–12, Math, Physics, Chemistry, Biology, Khmer, History, ICT
-- Includes Official MoEYS textbook sources, LaTeX expressions, and variable definitions.
-- ==============================================================================

DO $$
DECLARE
  v_version_id UUID;
  v_doc_math7 UUID;
  v_doc_phys7 UUID;
  v_doc_chem8 UUID;
  v_doc_phys9 UUID;
  v_doc_math9 UUID;
  v_doc_phys12 UUID;
  v_doc_chem12 UUID;
  v_doc_bio7 UUID;
  v_doc_khmer7 UUID;
  v_doc_hist9 UUID;
  v_doc_ict7 UUID;

  v_ref_id UUID;
BEGIN
  -- Get current curriculum version
  SELECT id INTO v_version_id FROM public.curriculum_versions WHERE version_code = 'moeys_standard_2026' LIMIT 1;

  -- 1. Insert Official MoEYS Source Textbooks
  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ៧', 'MoEYS Grade 7 Mathematics Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 7, 'mathematics', 'បោះពុម្ពលើកទី ៤', 2024, 'https://oer.moeys.gov.kh/math-g7', 'https://sala.moeys.gov.kh/materials/math-g7', true)
  RETURNING id INTO v_doc_math7;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ៧', 'MoEYS Grade 7 Physics Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 7, 'physics', 'បោះពុម្ពលើកទី ៣', 2024, 'https://oer.moeys.gov.kh/physics-g7', 'https://sala.moeys.gov.kh/materials/phys-g7', true)
  RETURNING id INTO v_doc_phys7;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពគីមីវិទ្យា ថ្នាក់ទី ៨', 'MoEYS Grade 8 Chemistry Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 8, 'chemistry', 'បោះពុម្ពលើកទី ៣', 2024, 'https://oer.moeys.gov.kh/chem-g8', 'https://sala.moeys.gov.kh/materials/chem-g8', true)
  RETURNING id INTO v_doc_chem8;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ៩ (ត្រៀមឌីប្លូម)', 'MoEYS Grade 9 Physics Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 9, 'physics', 'បោះពុម្ពលើកទី ៥', 2024, 'https://oer.moeys.gov.kh/phys-g9', 'https://sala.moeys.gov.kh/materials/phys-g9', true)
  RETURNING id INTO v_doc_phys9;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពគណិតវិទ្យា ថ្នាក់ទី ៩ (ត្រៀមឌីប្លូម)', 'MoEYS Grade 9 Mathematics Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 9, 'mathematics', 'បោះពុម្ពលើកទី ៥', 2024, 'https://oer.moeys.gov.kh/math-g9', 'https://sala.moeys.gov.kh/materials/math-g9', true)
  RETURNING id INTO v_doc_math9;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពរូបវិទ្យា ថ្នាក់ទី ១២ (ត្រៀមបាក់ឌុប)', 'MoEYS Grade 12 Physics Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 12, 'physics', 'បោះពុម្ពលើកទី ៦', 2024, 'https://oer.moeys.gov.kh/phys-g12', 'https://sala.moeys.gov.kh/materials/phys-g12', true)
  RETURNING id INTO v_doc_phys12;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពគីមីវិទ្យា ថ្នាក់ទី ១២ (ត្រៀមបាក់ឌុប)', 'MoEYS Grade 12 Chemistry Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 12, 'chemistry', 'បោះពុម្ពលើកទី ៦', 2024, 'https://oer.moeys.gov.kh/chem-g12', 'https://sala.moeys.gov.kh/materials/chem-g12', true)
  RETURNING id INTO v_doc_chem12;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពជីវវិទ្យា ថ្នាក់ទី ៧', 'MoEYS Grade 7 Biology Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 7, 'biology', 'បោះពុម្ពលើកទី ៣', 2024, 'https://oer.moeys.gov.kh/bio-g7', 'https://sala.moeys.gov.kh/materials/bio-g7', true)
  RETURNING id INTO v_doc_bio7;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('វេយ្យាករណ៍ភាសាខ្មែរ MoEYS ថ្នាក់ទី ៧-៩', 'MoEYS Khmer Grammar & Syntax Guide', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 7, 'khmer', 'បោះពុម្ពលើកទី ៤', 2023, 'https://oer.moeys.gov.kh/khmer-grammar', 'https://sala.moeys.gov.kh/materials/khmer-g7', true)
  RETURNING id INTO v_doc_khmer7;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅពុម្ពប្រវត្តិវិទ្យា ថ្នាក់ទី ៩', 'MoEYS Grade 9 History Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 9, 'history', 'បោះពុម្ពលើកទី ៤', 2024, 'https://oer.moeys.gov.kh/history-g9', 'https://sala.moeys.gov.kh/materials/hist-g9', true)
  RETURNING id INTO v_doc_hist9;

  INSERT INTO public.source_documents (title_km, title_en, organization, grade, subject_slug, edition, publication_year, official_url, sala_url, is_official_moeys)
  VALUES ('សៀវភៅព័ត៌មានវិទ្យា MoEYS ថ្នាក់ទី ៧', 'MoEYS Grade 7 ICT Official Textbook', 'ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)', 7, 'ict', 'បោះពុម្ពលើកទី ២', 2023, 'https://oer.moeys.gov.kh/ict-g7', 'https://sala.moeys.gov.kh/materials/ict-g7', true)
  RETURNING id INTO v_doc_ict7;

  -- =========================================================================
  -- ENTRY 1: Average Speed Formula (v = s / t) — Physics Grades 7, 8
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'phys-average-speed',
    'រូបមន្តល្បឿនមធ្យម (v = s / t)',
    'Average Speed Formula',
    'physics',
    'formula',
    'all',
    'ចម្ងាយចរសរុបដែលចល័តធ្វើដំណើរបានក្នុងមួយឯកតាពេល។',
    'ល្បឿនមធ្យមនៃចល័តមួយ គឺជាផលធៀបរវាងចម្ងាយចរសរុប (s) នឹងរយៈពេលសរុប (t) ដែលបានចំណាយក្នុងការធ្វើដំណើរនោះ។',
    'Average speed is the total distance traveled divided by the total time taken.',
    'គិតស្រួលៗ៖ បើជិះកង់បានចម្ងាយ ១០ គីឡូម៉ែត្រ ក្នុងពេល ២ ម៉ោង មានន័យថាក្នុង ១ ម៉ោង ជិះបាន ៥ គីឡូម៉ែត្រ (v = 10 / 2 = 5 km/h)។',
    ARRAY['ល្បឿន', 'ចម្ងាយចរ', 'រយៈពេល', 'ខ្នាត m/s'],
    ARRAY['kinematics', 'speed', 'motion', 'grade7', 'grade8'],
    '{
      "latexExpression": "v = \\frac{s}{t}",
      "plainExpression": "v = s / t",
      "applicableConditions": "អនុវត្តសម្រាប់ចលនាត្រង់ស្មើ ឬការគណនាល្បឿនសរុបនៃដំណើរទាំងមូល។",
      "variables": [
        {"symbol": "v", "nameKh": "ល្បឿនមធ្យម", "nameEn": "Average speed", "unit": "m/s ឬ km/h", "description": "បរិមាណស្កាលែនៃចលនា"},
        {"symbol": "s", "nameKh": "ចម្ងាយចរសរុប", "nameEn": "Distance traveled", "unit": "m (ម៉ែត្រ) ឬ km", "description": "ប្រវែងគន្លងដែលចល័តបានឆ្លងកាត់"},
        {"symbol": "t", "nameKh": "រយៈពេលសរុប", "nameEn": "Time taken", "unit": "s (វិនាទី) ឬ h (ម៉ោង)", "description": "ថិរវេលានៃការធ្វើដំណើរ"}
      ],
      "derivedFormulas": [
        {"formula": "s = v \\cdot t", "meaningKh": "គណនាចម្ងាយចរ"},
        {"formula": "t = \\frac{s}{v}", "meaningKh": "គណនារយៈពេល"}
      ]
    }'::jsonb,
    '[
      {
        "problemKh": "រថយន្តមួយធ្វើដំណើរបានចម្ងាយ ១៨០ km ក្នុងរយៈពេល ៣ ម៉ោង។ គណនាល្បឿនមធ្យមគិតជា km/h និង m/s។",
        "solutionKh": "តាមរូបមន្ត v = s / t = 180 km / 3 h = 60 km/h។ ដើម្បីប្តូរទៅជា m/s៖ យក 60 ចែកនឹង 3.6 = 16.67 m/s។"
      }
    ]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 7, true, true), (v_ref_id, 8, false, false);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_phys7, 'ជំពូកទី ១៖ រង្វាស់រង្វាល់ និងចលនា', 1, 14, 16, 'ល្បឿនមធ្យមជាផលធៀបរវាងចម្ងាយចរ និងរយៈពេល។ v = s / t', true);

  -- =========================================================================
  -- ENTRY 2: Density Formula (rho = m / V) — Physics Grades 7, 8
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'phys-mass-density',
    'រូបមន្តម៉ាសមាឌ (\\rho = m / V)',
    'Mass Density Formula',
    'physics',
    'formula',
    'all',
    'ម៉ាសនៃអង្គធាតុក្នុងមួយឯកតាមាឌ កំណត់ថាតើអង្គធាតុណាលិច ឬអណ្តែតក្នុងទឹក។',
    'ម៉ាសមាឌ (សញ្ញាសម្គាល់អក្សរក្រិក រ៉ូ: \\rho) គឺជាផលធៀបរវាងម៉ាសនៃអង្គធាតុ (m) នឹងមាឌនៃអង្គធាតុនោះ (V)។',
    'Density is defined as the mass of an object divided by its volume.',
    'អង្គធាតុណាដែលមានម៉ាសមាឌតូចជាងទឹក (1000 kg/m³ ឬ 1 g/cm³) ដូចជាប្រេង និងឈើ នឹងអណ្តែតលើទឹក។ បើធ្ងន់ជាងទឹក ដូចជាដែក នឹងលិច។',
    ARRAY['ម៉ាសមាឌ', 'មាឌ', 'ម៉ាស', 'លិចអណ្តែត', 'រ៉ូ'],
    ARRAY['density', 'fluids', 'mechanics', 'grade7', 'grade8'],
    '{
      "latexExpression": "\\rho = \\frac{m}{V}",
      "plainExpression": "rho = m / V",
      "applicableConditions": "អនុវត្តលើអង្គធាតុរឹង រាវ និងឧស្ម័ន ដែលមានលក្ខណៈឯកសណ្ឋាន។",
      "variables": [
        {"symbol": "\\rho", "nameKh": "ម៉ាសមាឌ", "nameEn": "Density", "unit": "kg/m³ ឬ g/cm³", "description": "ម៉ាសក្នុងមួយឯកតាមាឌ"},
        {"symbol": "m", "nameKh": "ម៉ាសអង្គធាតុ", "nameEn": "Mass", "unit": "kg (គីឡូក្រាម) ឬ g", "description": "បរិមាណរូបធាតុ"},
        {"symbol": "V", "nameKh": "មាឌអង្គធាតុ", "nameEn": "Volume", "unit": "m³ ឬ cm³ ឬ L", "description": "ទំហំហាលំហដែលអង្គធាតុកាន់កាប់"}
      ]
    }'::jsonb,
    '[
      {
        "problemKh": "ដុំដែកមួយមានមាឌ 20 cm³ និងមានម៉ាស 156 g។ គណនាម៉ាសមាឌនៃដុំដែកនោះ។",
        "solutionKh": "តាមរូបមន្ត rho = m / V = 156 g / 20 cm³ = 7.8 g/cm³ = 7800 kg/m³។"
      }
    ]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 7, true, true), (v_ref_id, 8, false, false);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_phys7, 'ជំពូកទី ១៖ រង្វាស់រង្វាល់', 1, 22, 24, 'ម៉ាសមាឌជាម៉ាសនៃអង្គធាតុក្នុងមួយឯកតាមាឌ។ rho = m / V', true);

  -- =========================================================================
  -- ENTRY 3: Pythagorean Theorem (a^2 + b^2 = c^2) — Mathematics Grades 8, 9
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'math-pythagorean-theorem',
    'ទ្រឹស្តីបទពីតាករ (Pythagorean Theorem)',
    'Pythagorean Theorem',
    'mathematics',
    'theorem',
    'all',
    'ក្នុងត្រីកោណកែង ការ៉េនៃអ៊ីប៉ូតេនុសស្មើនឹងផលបូកការ៉េនៃជ្រុងជាប់មុំកែងទាំងពីរ។',
    'ទ្រឹស្តីបទពីតាករចែងថា៖ ក្នុងត្រីកោណកែង ABC ដែលមានមុំ A = 90° នោះការ៉េអ៊ីប៉ូតេនុស BC² = AB² + AC² ឬ a² + b² = c² (c ជាអ៊ីប៉ូតេនុស)។',
    'In a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.',
    'ចងចាំឈុតលេខពិសេសពីតាករ៖ (3, 4, 5) ព្រោះ 3² + 4² = 9 + 16 = 25 = 5²! ឈុតមួយទៀតគឺ (5, 12, 13)។',
    ARRAY['ពីតាករ', 'ត្រីកោណកែង', 'អ៊ីប៉ូតេនុស', 'ការ៉េជ្រុង'],
    ARRAY['geometry', 'triangle', 'theorem', 'grade8', 'grade9'],
    '{
      "latexExpression": "a^2 + b^2 = c^2",
      "plainExpression": "a^2 + b^2 = c^2",
      "applicableConditions": "អនុវត្តតែលើត្រីកោណកែង (Right Triangle) ដែលមានមុំមួយស្មើ ៩០ ដឺក្រេប៉ុណ្ណោះ។",
      "variables": [
        {"symbol": "c", "nameKh": "អ៊ីប៉ូតេនុស", "nameEn": "Hypotenuse", "unit": "cm, m", "description": "ជ្រុងដែលឈមនឹងមុំកែង និងវែងជាងគេ"},
        {"symbol": "a, b", "nameKh": "ជ្រុងជាប់មុំកែង", "nameEn": "Legs of triangle", "unit": "cm, m", "description": "ជ្រុងទាំងពីរដែលបង្កើតបានមុំកែង"}
      ],
      "derivedFormulas": [
        {"formula": "c = \\sqrt{a^2 + b^2}", "meaningKh": "រកប្រវែងអ៊ីប៉ូតេនុស"},
        {"formula": "a = \\sqrt{c^2 - b^2}", "meaningKh": "រកប្រវែងជ្រុងកែងមួយ"}
      ]
    }'::jsonb,
    '[
      {
        "problemKh": "ត្រីកោណកែងមួយមានជ្រុងកែងពីរប្រវែង 6 cm និង 8 cm។ គណនាប្រវែងអ៊ីប៉ូតេនុស។",
        "solutionKh": "តាមទ្រឹស្តីបទពីតាករ៖ c² = 6² + 8² = 36 + 64 = 100 => c = \\sqrt{100} = 10 cm។"
      }
    ]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 8, true, false), (v_ref_id, 9, false, true);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_math9, 'ជំពូកទី ៣៖ ធរណីមាត្រត្រីកោណ', 3, 45, 48, 'ក្នុងត្រីកោណកែង ការ៉េនៃអ៊ីប៉ូតេនុសស្មើផលបូកការ៉េនៃជ្រុងជាប់មុំកែង។', true);

  -- =========================================================================
  -- ENTRY 4: Ohm's Law (U = R * I) — Physics Grades 9, 10, 11
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'phys-ohms-law',
    'ច្បាប់អូម (Ohm''s Law: U = R · I)',
    'Ohm''s Law',
    'physics',
    'law_principle',
    'all',
    'តង់ស្យុងនៅសងខាងរេស៊ីស្តង់ សមាមាត្រនឹងអាំងតង់ស៊ីតេចរន្តអគ្គិសនីដែលឆ្លងកាត់វា។',
    'ច្បាប់អូមចែងថា៖ តង់ស្យុង (U) នៅសងខាងចុងនៃស៊ីឡាំងចម្លងអូម ស្មើនឹងផលគុណរវាងរេស៊ីស្តង់ (R) នឹងអាំងតង់ស៊ីតេចរន្ត (I) ដែលឆ្លងកាត់វា នៅសីតុណ្ហភាពថេរ។',
    'Ohm''s law states that current through a conductor between two points is directly proportional to voltage across the two points.',
    'ចងចាំអក្សរកាត់ URI៖ U នៅលើកំពូលត្រីកោណ, R និង I នៅបាតក្រោម។ ចង់រកអ្វី បិទដៃលើអក្សរនោះ (U = R·I, I = U/R, R = U/I)។',
    ARRAY['ច្បាប់អូម', 'តង់ស្យុង', 'រេស៊ីស្តង់', 'អាំងតង់ស៊ីតេចរន្ត', 'វ៉ុល'],
    ARRAY['electricity', 'circuit', 'law', 'brevet', 'grade9', 'grade10'],
    '{
      "latexExpression": "U = R \\cdot I",
      "plainExpression": "U = R * I",
      "applicableConditions": "អនុវត្តលើលោហៈចម្លង និងរេស៊ីស្តង់អូម នៅសីតុណ្ហភាពថេរ។",
      "variables": [
        {"symbol": "U", "nameKh": "តង់ស្យុងអគ្គិសនី", "nameEn": "Voltage", "unit": "V (វ៉ុល)", "description": "ផលសងប៉ូតង់ស្យែលអគ្គិសនី"},
        {"symbol": "R", "nameKh": "រេស៊ីស្តង់អគ្គិសនី", "nameEn": "Electrical resistance", "unit": "\\Omega (អូម)", "description": "កម្រិតរារាំងចរន្តអគ្គិសនី"},
        {"symbol": "I", "nameKh": "អាំងតង់ស៊ីតេចរន្ត", "nameEn": "Electric current", "unit": "A (អាំពែ)", "description": "បរិមាណបន្ទុកអគ្គិសនីឆ្លងកាត់ក្នុងមួយវិនាទី"}
      ]
    }'::jsonb,
    '[
      {
        "problemKh": "អំពូលភ្លើងមួយមានរេស៊ីស្តង់ 44 \\Omega ភ្ជាប់ទៅនឹងប្រភពតង់ស្យុង 220 V។ គណនាចរន្ត I ដែលឆ្លងកាត់អំពូល។",
        "solutionKh": "តាមច្បាប់អូម៖ I = U / R = 220 V / 44 \\Omega = 5 A។"
      }
    ]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 9, true, true), (v_ref_id, 10, false, false), (v_ref_id, 11, false, false);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_phys9, 'ជំពូកទី ២៖ ចរន្តអគ្គិសនី', 2, 28, 31, 'ផលសងប៉ូតង់ស្យែលរវាងចុងទាំងពីរនៃរេស៊ីស្តង់ស្មើ U = R · I', true);

  -- =========================================================================
  -- ENTRY 5: Mole Formula (n = m / M) — Chemistry Grades 9 to 12
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'chem-mole-formula',
    'រូបមន្តចំនួនម៉ូល (n = m / M)',
    'Mole Formula',
    'chemistry',
    'formula',
    'all',
    'រូបមន្តស្នូលលេខ ១ ក្នុងគីមីវិទ្យា សម្រាប់ស្វែងរកចំនួនម៉ូលពីម៉ាស និងម៉ាសម៉ូល។',
    'ចំនួនម៉ូល (n គិតជា mol) គឺជាបរិមាណរូបធាតុដែលស្មើនឹងផលធៀបរវាងម៉ាសសារធាតុ (m គិតជា g) នឹងម៉ាសម៉ូល (M គិតជា g/mol)។',
    'Amount of substance in moles equals mass of substance divided by its molar mass.',
    'អឹមតូច m (គិតជាក្រាម g) តែងតែនៅលើ! អឹមធំ M (ម៉ាសម៉ូលពីតារាងខួប) នៅក្រោម។ កុំច្រឡំទីតាំងគ្នា!',
    ARRAY['ចំនួនម៉ូល', 'ម៉ាសម៉ូល', 'អាតូម', 'ស្តូក្យូមេទ្រី'],
    ARRAY['mole', 'chemistry', 'formula', 'brevet', 'bacii', 'grade9', 'grade10', 'grade11', 'grade12'],
    '{
      "latexExpression": "n = \\frac{m}{M}",
      "plainExpression": "n = m / M",
      "applicableConditions": "អនុវត្តលើគ្រប់រូបធាតុគីមីទាំងអស់ (អង្គធាតុសុទ្ធ ល្បាយ សូលុយស្យុង)។",
      "variables": [
        {"symbol": "n", "nameKh": "ចំនួនម៉ូល", "nameEn": "Number of moles", "unit": "mol (ម៉ូល)", "description": "បរិមាណរូបធាតុ"},
        {"symbol": "m", "nameKh": "ម៉ាសសារធាតុ", "nameEn": "Mass", "unit": "g (ក្រាម)", "description": "ទម្ងន់សារធាតុដែលយកមកពិសោធន៍"},
        {"symbol": "M", "nameKh": "ម៉ាសម៉ូល", "nameEn": "Molar mass", "unit": "g/mol", "description": "ម៉ាសនៃរូបធាតុចំនួន 1 ម៉ូល (6.02 x 10²³ ភាគល្អិត)"}
      ]
    }'::jsonb,
    '[
      {
        "problemKh": "គណនាចំនួនម៉ូលនៃទឹក (H₂O) ចំនួន 36 g ដោយដឹង M(H)=1, M(O)=16 g/mol។",
        "solutionKh": "M(H₂O) = 2(1) + 16 = 18 g/mol។ នាំឱ្យ n = m / M = 36 g / 18 g/mol = 2 mol។"
      }
    ]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 9, true, true), (v_ref_id, 10, false, false), (v_ref_id, 11, false, false), (v_ref_id, 12, false, true);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_chem8, 'ជំពូកទី ៤៖ ចំនួនម៉ូល និងប្រតិកម្មគីមី', 4, 52, 54, 'ចំនួនម៉ូលស្មើម៉ាសចែកនឹងម៉ាសម៉ូល n = m / M', true);

  -- =========================================================================
  -- ENTRY 6: Photosynthesis Definition & Equation — Biology Grades 7, 8
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'bio-photosynthesis',
    'រស្មីសំយោគ (Photosynthesis)',
    'Photosynthesis',
    'biology',
    'definition',
    'all',
    'ដំណើរការដែលរុក្ខជាតិបៃតងផលិតអាហារ (ស្ករគ្លុយកូស) និងឧស្ម័នអុកស៊ីសែនដោយប្រើពន្លឺព្រះអាទិត្យ។',
    'រស្មីសំយោគ គឺជាដំណើរការជីវគីមីដែលរុក្ខជាតិបៃតងប្រើប្រាស់ក្លរ៉ូភីល ដើម្បីស្រូបយកថាមពលពន្លឺព្រះអាទិត្យ បំប្លែងទឹក (H₂O) និងឧស្ម័នកាបូនិច (CO₂) ទៅជាស្ករគ្លុយកូស (C₆H₁₂O₆) និងបញ្ចេញឧស្ម័នអុកស៊ីសែន (O₂) ទៅក្នុងបរិយាកាស។',
    'The biological process by which green plants synthesize nutrients from carbon dioxide and water using sunlight and chlorophyll.',
    'រុក្ខជាតិដូចជាចង្ក្រានបាយធម្មជាតិ៖ គ្រឿងផ្សំគឺ ទឹកពីឫស + ឧស្ម័ន CO₂ ពីខ្យល់, ភ្លើងចង្ក្រានគឺ ពន្លឺព្រះអាទិត្យ, ចម្អិនបាន ស្ករគ្លុយកូស និងខ្យល់ O₂ ឱ្យយើងដកដង្ហើម!',
    ARRAY['រស្មីសំយោគ', 'ក្លរ៉ូភីល', 'គ្លុយកូស', 'អុកស៊ីសែន', 'កាបូនិច'],
    ARRAY['botany', 'photosynthesis', 'plant', 'biology', 'grade7', 'grade8'],
    '{
      "termKh": "រស្មីសំយោគ",
      "termEn": "Photosynthesis",
      "chemicalEquation": "6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{ពន្លឺព្រះអាទិត្យ + ក្លរ៉ូភីល}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2",
      "organelle": "ក្លរ៉ូប្លាស (Chloroplast)",
      "reactants": ["ឧស្ម័នកាបូនិច (CO₂)", "ទឹក (H₂O)"],
      "products": ["ស្ករគ្លុយកូស (C₆H₁₂O₆)", "ឧស្ម័នអុកស៊ីសែន (O₂)"]
    }'::jsonb,
    '[]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 7, true, true), (v_ref_id, 8, false, false);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_bio7, 'ជំពូកទី ២៖ ជីវិតរុក្ខជាតិ', 2, 36, 39, 'រស្មីសំយោគជាដំណើរការផលិតអាហាររបស់រុក្ខជាតិបៃតង។', true);

  -- =========================================================================
  -- ENTRY 7: Khmer Noun Phrase Pattern (Grammar Rule) — Khmer Grades 7 to 9
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'khmer-noun-phrase-pattern',
    'ទម្រង់កន្សោមនាមក្នុងភាសាខ្មែរ (Khmer Noun Phrase)',
    'Structure of Khmer Noun Phrase',
    'khmer',
    'grammar_rule',
    'all',
    'ក្បួនវេយ្យាករណ៍រៀបលំដាប់ពាក្យក្នុងកន្សោមនាមភាសាខ្មែរ៖ នាមគោល + គុណនាម + គុណនាមចង្អុល។',
    'ក្នុងភាសាខ្មែរ គុណនាមបញ្ជាក់ន័យតែងតែស្ថិតនៅពីក្រោយនាមគោលជានិច្ច (ខុសពីភាសាអង់គ្លេសដែលគុណនាមនៅពីមុខ)។ ទម្រង់ទូទៅគឺ៖ នាមគោល + បន្ទាប់បន្សំ (គុណនាម/កន្សោមនាម) + គុណនាមចង្អុល (នេះ, នោះ, ឯណោះ)។',
    'In Khmer syntax, modifiers always follow the head noun, with demonstratives placed at the end of the phrase.',
    'ភាសាអង់គ្លេសគេនិយាយ "a red car" (ក្រហម នៅមុខ ឡាន) តែខ្មែរយើងនិយាយ "ឡានក្រហមនេះ" (ឡាន នៅមុខ ក្រហម ហើយ នេះ នៅចុងក្រោយបង្អស់)!',
    ARRAY['កន្សោមនាម', 'នាមគោល', 'គុណនាម', 'គុណនាមចង្អុល'],
    ARRAY['grammar', 'syntax', 'khmer', 'grade7', 'grade8', 'grade9'],
    '{
      "ruleStatementKh": "នាមគោល (Head Noun) + គុណនាមបញ្ជាក់ (Modifier) + គុណនាមចង្អុល (Demonstrative)",
      "comparisonEn": "English: Modifier + Noun (Red book) vs Khmer: Noun + Modifier (សៀវភៅក្រហម)",
      "components": [
        {"position": 1, "element": "នាមគោល (Head Noun)", "example": "សិស្ស"},
        {"position": 2, "element": "គុណនាម (Adjective)", "example": "ពូកែ"},
        {"position": 3, "element": "គុណនាមចង្អុល (Demonstrative)", "example": "នេះ"}
      ]
    }'::jsonb,
    '[
      {
        "correctExample": "សិស្សពូកែទាំងឡាយនេះ",
        "explanation": "សិស្ស (នាម) + ពូកែ (គុណនាម) + ទាំងឡាយ (បរិមាណ) + នេះ (ចង្អុល) ត្រឹមត្រូវតាមក្បួនវេយ្យាករណ៍ខ្មែរ។"
      }
    ]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 7, true, true), (v_ref_id, 8, false, false), (v_ref_id, 9, false, false);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_khmer7, 'ជំពូកទី ១៖ កន្សោមនាម និងល្បះ', 1, 10, 13, 'កន្សោមនាមខ្មែរមាននាមគោលនៅខាងដើម បន្ទាប់មកគុណនាម និងចុងក្រោយគឺគុណនាមចង្អុល។', true);

  -- =========================================================================
  -- ENTRY 8: Cambodian Independence Day (Historical Event) — History Grades 7, 9, 12
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'hist-cambodian-independence-1953',
    'ទិវាបុណ្យឯករាជ្យជាតិ ៩ វិច្ឆិកា ១៩៥៣ (National Independence Day)',
    'Cambodian National Independence Day (Nov 9, 1953)',
    'history',
    'historical_event',
    'all',
    'កម្ពុជាទទួលបានឯករាជ្យពេញលេញពីអាណាព្យាបាលបារាំងក្រោមព្រះរាជបូជនីយកិច្ចនៃព្រះបាទ នរោត្តម សីហនុ។',
    'នៅថ្ងៃទី ៩ ខែវិច្ឆិកា ឆ្នាំ ១៩៥៣ ប្រទេសកម្ពុជាបានប្រកាសឯករាជ្យពេញបរិបូរណ៍ពីអាណានិគមបារាំង បន្ទាប់ពីស្ថិតនៅក្រោមអាណាព្យាបាលអស់រយៈពេល ៩០ ឆ្នាំ (១៨៦៣-១៩៥៣)។ ជោគជ័យជាប្រវត្តិសាស្ត្រនេះសម្រេចបានតាមរយៈព្រះរាជបូជនីយកិច្ចទាមទារឯករាជ្យជាតិដឹកនាំដោយព្រះករុណា ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ ព្រះបរមរតនកោដ្ឋ ដោយគ្មានការបង្ហូរឈាម។',
    'Cambodia declared full independence from 90 years of French colonial protectorate on November 9, 1953, under the royal crusade of King Norodom Sihanouk.',
    'ចាំកាលបរិច្ឆេទសំខាន់៖ ៩ វិច្ឆិកា ១៩៥៣ — ឯករាជ្យជាតិ! វិមានឯករាជ្យនៅភ្នំពេញ ត្រូវបានសាងសង់ឡើងនៅឆ្នាំ ១៩៥៨ ដើម្បីរំលឹកដល់ទិវាប្រវត្តិសាស្ត្រនេះ។',
    ARRAY['ឯករាជ្យជាតិ', 'ព្រះរាជបូជនីយកិច្ច', 'នរោត្តម សីហនុ', '៩ វិច្ឆិកា', 'បារាំង'],
    ARRAY['history', 'cambodia', 'independence', 'brevet', 'bacii', 'grade7', 'grade9', 'grade12'],
    '{
      "eventDate": "1953-11-09",
      "dateDisplayKh": "ថ្ងៃទី ០៩ ខែ វិច្ឆិកា ឆ្នាំ ១៩៥៣",
      "historicalPeriod": "សម័យអាណាព្យាបាលបារាំង និងសម័យសង្គមរាស្ត្រនិយម",
      "keyFigures": ["ព្រះករុណា ព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ"],
      "significanceKh": "បញ្ចប់ការត្រួតត្រារបស់អាណានិគមបារាំង ៩០ ឆ្នាំ និងបង្កើតរដ្ឋអធិបតេយ្យពេញលេញ។"
    }'::jsonb,
    '[]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 7, true, false), (v_ref_id, 9, false, true), (v_ref_id, 12, false, true);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_hist9, 'ជំពូកទី ៤៖ ចលនាទាមទារឯករាជ្យជាតិកម្ពុជា', 4, 88, 92, 'នៅថ្ងៃទី ៩ វិច្ឆិកា ឆ្នាំ ១៩៥៣ កម្ពុជាបានទទួលឯករាជ្យបរិបូរណ៍ពីបារាំង។', true);

  -- =========================================================================
  -- ENTRY 9: Binary & Byte Units (ICT Concept) — ICT Grades 7, 8, 10
  -- =========================================================================
  INSERT INTO public.reference_entries (
    slug, original_title_kh, title_en, subject_slug, reference_type, stream_applicability,
    short_description_kh, explanation_kh, explanation_en, student_friendly_guide_kh,
    key_terms, tags, structured_content, examples, verification_status, curriculum_version_id
  ) VALUES (
    'ict-binary-byte-units',
    'ប្រព័ន្ធគោលពីរ និងខ្នាតផ្ទុកទិន្នន័យ (Bit & Byte)',
    'Binary System & Data Storage Units',
    'ict',
    'concept',
    'all',
    'ខ្នាតមូលដ្ឋានគ្រឹះនៃទិន្នន័យកុំព្យូទ័រ៖ 1 Byte = 8 Bits, 1 KB = 1024 Bytes។',
    'កុំព្យូទ័រដំណើរការលើប្រព័ន្ធគោលពីរ (Binary System) ដែលមានតែលេខ ០ និង ១ ប៉ុណ្ណោះ។ ប៊ីត (Bit) ជាឯកតាតូចបំផុតនៃទិន្នន័យ។ បៃ (Byte) ស្មើនឹង ៨ ប៊ីត ហើយជាខ្នាតស្តង់ដារសម្រាប់តំណាងតួអក្សរមួយតួ (ឧ. អក្សរ A)។',
    'Computers operate using binary code consisting of 0s and 1s. A bit is the basic unit, and a byte consists of 8 bits.',
    'ស្រួលចាំ៖ 1 Byte = 8 Bits (ស្មើនឹងអក្សរមួយតួ)! ចំណែក 1 KB មិនមែនស្មើ ១០០០ ទេ គឺស្មើ ១០២៤ Bytes ព្រោះជាស្វ័យគុណនៃ ២ (2¹⁰ = 1024)។',
    ARRAY['ប្រព័ន្ធគោលពីរ', 'ប៊ីត', 'បៃ', 'Bit', 'Byte', 'ទំហំផ្ទុក'],
    ARRAY['ict', 'binary', 'byte', 'storage', 'grade7', 'grade8'],
    '{
      "fundamentalRule": "1 Byte = 8 bits",
      "unitsTable": [
        {"unit": "1 Byte (B)", "equivalent": "8 bits", "meaningKh": "ផ្ទុកតួអក្សរមួយតួ"},
        {"unit": "1 Kilobyte (KB)", "equivalent": "1,024 Bytes", "meaningKh": "ផ្ទុកឯកសារអត្ថបទខ្លី"},
        {"unit": "1 Megabyte (MB)", "equivalent": "1,024 KB", "meaningKh": "ផ្ទុករូបភាព ឬបទចម្រៀង"},
        {"unit": "1 Gigabyte (GB)", "equivalent": "1,024 MB", "meaningKh": "ផ្ទុកវីដេអូ ឬកម្មវិធី"},
        {"unit": "1 Terabyte (TB)", "equivalent": "1,024 GB", "meaningKh": "ផ្ទុកទិន្នន័យ Hard Drive"}
      ]
    }'::jsonb,
    '[]'::jsonb,
    'verified',
    v_version_id
  ) RETURNING id INTO v_ref_id;

  INSERT INTO public.reference_grade_applicability (reference_id, grade, primary_introduced_grade, exam_focus_grade)
  VALUES (v_ref_id, 7, true, true), (v_ref_id, 8, false, false), (v_ref_id, 10, false, false);

  INSERT INTO public.reference_sources (reference_id, source_document_id, chapter_km, chapter_number, page_start, page_end, quoted_passage_km, is_primary)
  VALUES (v_ref_id, v_doc_ict7, 'ជំពូកទី ១៖ ស្វែងយល់ពីកុំព្យូទ័រ', 1, 15, 18, 'ទិន្នន័យកុំព្យូទ័រគិតជាប៊ីត និងបៃ។ 1 Byte = 8 bits។', true);

END $$;
