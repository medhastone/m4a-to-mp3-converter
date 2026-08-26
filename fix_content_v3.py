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
    
    script_matches = re.findall(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    src_matches = re.findall(r'<script\b[^>]*src="([^"]+)"[^>]*></script>', html, re.IGNORECASE)
    
    src_matches = [src for src in src_matches if "tailwindcss" not in src]
    script_matches = [s.strip() for s in script_matches if s.strip() and "tailwind.config" not in s and "classList.remove('no-js')" not in s]

    safe_html = inner_content.replace('`', '\\`').replace('$', '\\$')
    
    scripts_str = "[" + ", ".join(["`" + s.replace('`', '\\`').replace('$', '\\$') + "`" for s in script_matches]) + "]"
    srcs_str = "[" + ", ".join(["'" + src + "'" for src in src_matches]) + "]"
    
    page_content = f"""
'use client';
import {{ useEffect, useRef }} from 'react';

export default function Page({{ params }}: {{ params: Promise<{{ locale: string }}> }}) {{
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {{
    const loadScripts = async () => {{
      const srcs = {srcs_str};
      const inlineScripts = {scripts_str};

      for (const src of srcs) {{
        if (!document.querySelector(`script[src="${{src}}"]`)) {{
          await new Promise((resolve, reject) => {{
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          }});
        }}
      }}

      for (const code of inlineScripts) {{
        try {{
          const scriptEl = document.createElement('script');
          scriptEl.textContent = code;
          document.body.appendChild(scriptEl);
        }} catch (e) {{
          console.error("Failed to execute inline script:", e);
        }}
      }}

      // Initialize Lucide icons if available
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
        
    print(f"Restored content + scripts for {basename}")
