#!/usr/bin/env python
# vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

import argparse
import os
import sys
import xml.etree.ElementTree as ET

DEFAULT_TARGET_DIR = '.'
DEFAULT_OUTPUT_FILE = sys.stdout
DEFAULT_XSL = 'xsl/html5-hello-world.xsl'


def create_xsl_root(xsl):
    root = ET.Element(None)
    root.append(ET.PI("xml-stylesheet", "type='text/xsl' href='%s'" % (xsl,)))
    return root


def create_listdir_xml(parent, target_dir):
    return parent


def create_xml_doc(target_dir, xsl):
    root = create_xsl_root(xsl)
    root.append(create_listdir_xml(ET.Element('top'), target_dir))
    return root


def create_argparser():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('dir',
            type=str, default=DEFAULT_TARGET_DIR,
            nargs='?',
            metavar='<target-directory>',
            help='Target Directory')
    parser.add_argument('-o',
            dest='output',
            default=DEFAULT_OUTPUT_FILE,
            metavar='<output-file>',
            help='Target Directory')
    parser.add_argument('-x',
            dest='xsl',
            default=DEFAULT_XSL,
            metavar='<xsl-file>',
            help='XSL file')
    return parser

####################################################################
# Main
####################################################################

if __name__ == '__main__':

    args = create_argparser().parse_args()

    ET.ElementTree(
            create_xml_doc(args.dir, args.xsl)).write(
            args.output, xml_declaration=True, encoding='utf-8')
