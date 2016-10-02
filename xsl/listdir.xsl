<?xml version="1.0" encoding="utf-8"?>
<!-- vim: set ts=2 et sw=2 sts=2 fileencoding=utf-8: -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  >
  <xsl:output method="html" encoding="utf-8"/>
  <!-- <xsl:output method="html" encoding="utf-8" doctype-system="about:legacy-compat"/> -->

  <xsl:template match="/">
    <xsl:apply-templates select="top"/>
  </xsl:template>

  <xsl:template match="top">
    <ul>
      <xsl:apply-templates select="*">
        <xsl:with-param name="path" select="@path"/>
      </xsl:apply-templates>
    </ul>
  </xsl:template>

  <xsl:template match="directory">
    <xsl:param name="path"/>
    <li>
      <input type="checkbox">
        <xsl:attribute name="id">
          <xsl:value-of select="concat($path, '/', @name)"/>
        </xsl:attribute>
      </input>
      <label>
        <xsl:attribute name="href">
          <xsl:value-of select="concat($path, '/', @name)"/>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </label>
      <ul>
        <xsl:apply-templates select="*">
          <xsl:with-param name="path" select="concat($path, '%2F', @name)"/>
        </xsl:apply-templates>
      </ul>
    </li>
  </xsl:template>

  <xsl:template match="file">
    <xsl:param name="path"/>
    <li>
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="concat('?file=', $path, '%2F', @name)"/>
        </xsl:attribute>
        <xsl:value-of select="@title"/>
      </a>
    </li>
  </xsl:template>

</xsl:stylesheet>

