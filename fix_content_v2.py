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
    match_html = re.search(r'</header>(.*?)<footer', html, re.DOTALL | re.IGNORECASE)
    if not match_html:
        continue
        
    inner_content = match_html.group(1).strip()
    
    # Extract script tags that are AFTER footer (or just find all script tags that don't have src="https://cdn.tailwindcss")
    # Actually, we can find all script tags in the original HTML and put them into a list.
    script_matches = re.findall(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    
    # Also find script tags with src
    src_matches = re.findall(r'<script\b[^>]*src="([^"]+)"[^>]*></script>', html, re.IGNORECASE)
    
    # Filter out tailwind
    src_matches = [src for src in src_matches if "tailwindcss" not in src]
    
    # Filter out the documentElement classList remove script
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

      // Load external scripts sequentially
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

      // Execute inline scripts
      for (const code of inlineScripts) {{
        try {{
          const scriptEl = document.createElement('script');
          scriptEl.textContent = code;
          document.body.appendChild(scriptEl);
          // Optional: remove it right after executing so it doesn't clutter
          // document.body.removeChild(scriptEl);
        }} catch (e) {{
          console.error("Failed to execute inline script:", e);
        }}
      }}

      // Initialize Lucide icons if available
      if (window.lucide) {{
        window.lucide.createIcons();
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
