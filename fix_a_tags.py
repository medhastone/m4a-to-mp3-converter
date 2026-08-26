with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the invalid prefetch attribute from <a> tags
content = content.replace(' prefetch={false}', '')

# Identify <a href="/"> and <a href="https://m4atomp3converter.com/"> and change them to Link.
# Wait, if they are just footer links, it might be easier to use <Link> 
# Actually, the warning is just a WARNING. It doesn't cause exit code 1.
# What caused exit code 1 was the `react/no-unescaped-entities`!
# Let me just remove prefetch={false} and see if it builds successfully now that quotes are escaped.

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
