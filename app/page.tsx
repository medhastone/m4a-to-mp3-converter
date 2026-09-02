export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
        <script dangerouslySetInnerHTML={{ __html: `window.location.replace('/en');` }} />
      </head>
      <body className="bg-surface-dim">
      </body>
    </html>
  );
}
