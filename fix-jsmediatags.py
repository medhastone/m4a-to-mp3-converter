import re

with open("app/components/MetadataRemover.tsx", "r") as f:
    content = f.read()

# Remove the import line if it exists
content = re.sub(r"import\('jsmediatags'\)\.then\(\(jsmediatags\) => \{.*?(?=\s*\}\)\.catch\()", "", content, flags=re.DOTALL)
# It's better to just regex replace the whole loadMetadata function

old_func = """  const loadMetadata = (fileToRead: File) => {
    // Dynamic import to avoid SSR issues with jsmediatags
    import('jsmediatags').then((jsmediatags) => {
      jsmediatags.default.read(fileToRead, {
        onSuccess: (tag: any) => {
          setMetadata(tag.tags);
        },
        onError: (error: any) => {
          console.error("Error reading tags", error);
          // Set an empty object to indicate we tried and found nothing or failed
          setMetadata({});
        }
      });
    }).catch(err => {
      console.error("Error importing jsmediatags", err);
      setMetadata({});
    });
  };"""

new_func = """  const loadMetadata = (fileToRead: File) => {
    const loadScriptAndRead = () => {
      const jsmediatags = (window as any).jsmediatags;
      if (jsmediatags) {
        jsmediatags.read(fileToRead, {
          onSuccess: (tag: any) => setMetadata(tag.tags),
          onError: (error: any) => {
            console.error("Error reading tags", error);
            setMetadata({});
          }
        });
      } else {
        setMetadata({});
      }
    };

    if (!(window as any).jsmediatags) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
      script.onload = loadScriptAndRead;
      script.onerror = () => setMetadata({});
      document.body.appendChild(script);
    } else {
      loadScriptAndRead();
    }
  };"""

content = content.replace(old_func, new_func)

with open("app/components/MetadataRemover.tsx", "w") as f:
    f.write(content)
