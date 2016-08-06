<?xml version="1.0" encoding="utf-8"?>
<!-- vim: set ts=2 et sw=2 sts=2 fileencoding=utf-8: -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  >
  <xsl:output
    method="html"
    encoding="utf-8"
    doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="ja">
      <head>
        <meta charset="utf-8"/>
        <title>HTML5 Hello World</title>
      </head>
      <body>
        <header>
          <h1>HTML5 Header</h1>
          <nav>
            <ul>
              <li>Hello, world!!</li>
            </ul>
          </nav>
        </header>
        <main>
          <article>
            <h1>HTML5 Article</h1>
            <p>Hello, world!!</p>
          </article>
        </main>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>

