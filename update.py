import glob
import re
import json

for filepath in glob.glob('public/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Footer style 1
    old_f1 = r'&copy; 2026 M4A to MP3 Converter\. Strictly Confidential Processing\.'
    new_f1 = r'&copy; 2026 M4A to MP3 Converter.com &bull; Engineered by <a href="https://zentova.in" target="_blank" rel="noopener" class="text-orange-400 hover:text-orange-300 font-semibold underline decoration-orange-500/30 transition">Medhastone</a> &bull; Support: medhastone@gmail.com'
    content = re.sub(old_f1, new_f1, content)
    
    # Footer style 2
    old_f2 = r'&copy; 2026 M4A to MP3 Converter\.com — Browser-Native Audio Transcoding Network\. All rights reserved\.'
    new_f2 = r'&copy; 2026 M4A to MP3 Converter.com &bull; Engineered by <a href="https://zentova.in" target="_blank" rel="noopener" class="text-orange-400 hover:text-orange-300 font-semibold underline decoration-orange-500/30 transition">Medhastone</a> &bull; Support: medhastone@gmail.com'
    content = re.sub(old_f2, new_f2, content)

    # JSON-LD
    def replacer(match):
        json_str = match.group(1)
        try:
            data = json.loads(json_str)
            
            author_dict = {
                "@type": "Person",
                "name": "Medhastone",
                "url": "https://zentova.in"
            }
            
            if "@graph" in data:
                for item in data["@graph"]:
                    if item.get("@type") == "WebApplication":
                        item["author"] = author_dict
                        item["creator"] = author_dict
            elif data.get("@type") == "WebApplication":
                data["author"] = author_dict
                data["creator"] = author_dict
            
            new_json_str = json.dumps(data, indent=2)
            return f'<script type="application/ld+json">\n{new_json_str}\n</script>'
        except Exception as e:
            return match.group(0)

    content = re.sub(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', replacer, content, flags=re.DOTALL)

    # About us blurb
    if "about.html" in filepath:
        old_blurb = r'M4A to MP3 Converter\.com is maintained by a specialized team of audio engineers and web performance architects\. Our collective background stems from building low-latency digital audio workstations \(DAWs\) and optimizing high-throughput network applications\.'
        new_blurb = r'M4A to MP3 Converter.com is engineered and maintained by <strong>Medhastone</strong> (Portfolio: <a href="https://zentova.in" target="_blank" rel="noopener" class="text-emerald-400 hover:text-emerald-300 font-semibold underline transition">zentova.in</a>), focusing on client-side browser performance, zero-latency Web Audio workflows, and data privacy.'
        content = re.sub(old_blurb, new_blurb, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

