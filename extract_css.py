import re

# Read original HTML file
with open('файл с сайтом.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find all style blocks
style_pattern = r'<style[^>]*>(.*?)</style>'
style_blocks = re.findall(style_pattern, html_content, re.DOTALL)

print(f"Found {len(style_blocks)} style blocks")

# Combine all CSS
all_css = []
for i, css in enumerate(style_blocks):
    # Clean up whitespace
    css = css.strip()
    if css and not 'sourceURL' in css:  # Skip WordPress source maps
        all_css.append(f"\n/* Style block {i+1} */\n{css}")

# Write to sections.css
if all_css:
    with open('static/css/original_styles.css', 'w', encoding='utf-8') as f:
        f.write('\n'.join(all_css))
    
    print(f"Extracted CSS saved to static/css/original_styles.css")
    print(f"Total CSS length: {sum(len(css) for css in all_css)} characters")
else:
    print("No CSS found!")
