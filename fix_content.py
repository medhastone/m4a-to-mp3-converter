import os
import glob
import re

html_files = glob.glob('public/*.html')

for html_file in html_files:
    basename = os.path.basename(html_file).replace('.html', '')
    folder_path = f'app/[locale]/{basename}'
    
    if not os.path.exists(f'{folder_path}/page.tsx'):
        continue
        
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Extract content between </header> and <footer
    match = re.search(r'</header>(.*?)<footer', html, re.DOTALL | re.IGNORECASE)
    if not match:
        continue
        
    inner_content = match.group(1).strip()
    
    # We will inject it via dangerouslySetInnerHTML
    safe_html = inner_content.replace('`', '\\`').replace('$', '\\$')
    
    page_content = f"""
export function generateStaticParams() {{
  return [
    {{ locale: 'en' }},
    {{ locale: 'es' }},
    {{ locale: 'fr' }},
    {{ locale: 'hi' }},
    {{ locale: 'de' }},
    {{ locale: 'pt' }},
  ];
}}

export default async function Page({{ params }}: {{ params: Promise<{{ locale: string }}> }}) {{
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  return (
    <div dangerouslySetInnerHTML={{{{__html: `{safe_html}`}}}} />
  );
}}
"""
    
    with open(f'{folder_path}/page.tsx', 'w', encoding='utf-8') as f:
        f.write(page_content)
        
    print(f"Restored content for {basename}")
