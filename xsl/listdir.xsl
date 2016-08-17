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
        <title>Directory Tree</title>
      </head>
      <body>
        <header>
          <nav>
            <h1>Navigation</h1>
            <ul>
              <xsl:apply-templates select="directory/*">
                <xsl:with-param name="path" select="directory/@name"/>
              </xsl:apply-templates>
            </ul>
          </nav>
        </header>
        <main>
          <article>
            <h1>Article</h1>
            <p>Hello, world!!</p>
          </article>
        </main>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="directory">
    <xsl:param name="path"/>
    <li>
      <span>
        <xsl:attribute name="href">
          <xsl:value-of select="concat($path, @name)"/>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </span>
      <ul>
        <xsl:apply-templates select="*">
          <xsl:with-param name="path" select="concat($path, '/', @name)"/>
        </xsl:apply-templates>
      </ul>
    </li>
  </xsl:template>

  <xsl:template match="file">
    <xsl:param name="path"/>
    <li>
      <span>
        <xsl:attribute name="href">
          <xsl:value-of select="concat($path, '/', @name)"/>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </span>
    </li>
  </xsl:template>

</xsl:stylesheet>

