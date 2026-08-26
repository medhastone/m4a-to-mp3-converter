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
        
    match_html = re.search(r'</header>(.*?)<footer', html, re.DOTALL | re.IGNORECASE)
    if not match_html:
        continue
        
    inner_content = match_html.group(1).strip()
    
    # Extract only inline script tags that are not JSON-LD
    script_matches = re.findall(r'<script\b(?![^>]*type=["\']application/ld\+json["\'])[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    
    # Filter out Tailwind configuration
    script_matches = [s.strip() for s in script_matches if s.strip() and "tailwind.config" not in s and "classList.remove('no-js')" not in s]

    # Process inline scripts to replace top-level let/const with var
    processed_scripts = []
    for s in script_matches:
        s = re.sub(r'^\s*let\s+', 'var ', s, flags=re.MULTILINE)
        s = re.sub(r'^\s*const\s+', 'var ', s, flags=re.MULTILINE)
        processed_scripts.append(s)

    safe_html = inner_content.replace('`', '\\`').replace('$', '\\$')
    
    scripts_str = "[" + ", ".join(["`" + s.replace('`', '\\`').replace('$', '\\$') + "`" for s in processed_scripts]) + "]"
    
    page_content = f"""
'use client';
import {{ useEffect, useRef }} from 'react';

export default function Page({{ params }}: {{ params: Promise<{{ locale: string }}> }}) {{
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {{
    const loadScripts = () => {{
      const inlineScripts = {scripts_str};

      for (const code of inlineScripts) {{
        try {{
          const scriptEl = document.createElement('script');
          scriptEl.textContent = code;
          document.body.appendChild(scriptEl);
        }} catch (e) {{
          console.error("Failed to execute inline script:", e);
        }}
      }}
      
      if ((window as any).lucide) {{
        (window as any).lucide.createIcons();
      }}
    }};
    
    loadScripts();
  }}, []);

  return (
    <div ref={{containerRef}} dangerouslySetInnerHTML={{{{__html: `{safe_html}`}}}} />
  );
}}
"""
    
    with open(f'{folder_path}/page.tsx', 'w', encoding='utf-8') as f:
        f.write(page_content)
        
    print(f"Restored content + safe scripts for {basename}")
