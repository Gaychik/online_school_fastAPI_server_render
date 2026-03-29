"""
Script to extract all sections from the original HTML file and create correct Jinja2 templates
"""
import re
import os

# Read original HTML file
with open('файл с сайтом.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Create sections directory if it doesn't exist
os.makedirs('templates/sections', exist_ok=True)

# Extract each section using regex
sections = {}

# Section 1 (section-1) - Hero
section_1_match = re.search(r'(<section class="section-1".*?</section>)', html_content, re.DOTALL)
if section_1_match:
    sections['section_2_hero.html'] = section_1_match.group(1)

# Section 2 (section-2) - Для кого этот курс
section_2_match = re.search(r'(<section class="section-2">.*?</section>)', html_content, re.DOTALL)
if section_2_match:
    sections['section_3_subjects.html'] = section_2_match.group(1)

# Section 3 (section-3) - Как устроена учёба
section_3_match = re.search(r'(<section id="how" class="section-3">.*?</section>)', html_content, re.DOTALL)
if section_3_match:
    sections['section_4_benefits.html'] = section_3_match.group(1)

# Section 4 (section-4) - Автор курса
section_4_match = re.search(r'(<section id="autor" class="section-4">.*?</section>)', html_content, re.DOTALL)
if section_4_match:
    sections['section_5_program.html'] = section_4_match.group(1)

# Section 5 (section-5) - Программа курса
section_5_match = re.search(r'(<section id="programm" class="section-5">.*?</section>)', html_content, re.DOTALL)
if section_5_match:
    sections['section_6_calendar.html'] = section_5_match.group(1)

# Section 6 (section-6) - Куратор
section_6_match = re.search(r'(<section id="kurator" class="section-6 section-4">.*?</section>)', html_content, re.DOTALL)
if section_6_match:
    sections['section_7_info.html'] = section_6_match.group(1)

# Section 7 (section-7) - Отзывы
section_7_match = re.search(r'(<section class="section-7">.*?</section>)', html_content, re.DOTALL)
if section_7_match:
    sections['section_8_reviews.html'] = section_7_match.group(1)

# Section 8 (section-8) - Цены
section_8_match = re.search(r'(<section id="prices" class="section-8">.*?</section>)', html_content, re.DOTALL)
if section_8_match:
    sections['section_9_packages.html'] = section_8_match.group(1)

# Section 9 (section-9) - Консультация
section_9_match = re.search(r'(<section class="section-9">.*?</section>)', html_content, re.DOTALL)
if section_9_match:
    sections['section_10_consultation.html'] = section_9_match.group(1)

# Section 10 (section-10) - FAQ
section_10_match = re.search(r'(<section class="section-10">.*?</section>)', html_content, re.DOTALL)
if section_10_match:
    sections['section_11_faq.html'] = section_10_match.group(1)

# Section 11 (section-11) - Лицензия
section_11_match = re.search(r'(<section class="section-11">.*?</section>)', html_content, re.DOTALL)
if section_11_match:
    sections['section_12_license.html'] = section_11_match.group(1)

# Section 12 (section-12) - Финальная форма
section_12_match = re.search(r'(<section class="section-12">.*?</section>)', html_content, re.DOTALL)
if section_12_match:
    sections['section_13_final_cta.html'] = section_12_match.group(1)

# Write each section to a file
for filename, content in sections.items():
    filepath = f'templates/sections/{filename}'
    
    # Remove existing file if it exists
    if os.path.exists(filepath):
        os.remove(filepath)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f"<!-- {filename} - Extracted from original HTML -->\n")
        f.write(content)
        print(f"Created: {filepath}")

print(f"\n✅ Successfully extracted {len(sections)} sections!")
print("Note: Some minor adjustments may be needed for Jinja2 template syntax")
