#!/usr/bin/env python
# vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

import os
import sys
import xml.etree.ElementTree as ET

def create_xsl_root(xsl):
    root = ET.Element(None)
    root.append(ET.PI("xml-stylesheet", "type='text/xsl' href='%s'" % (xsl,)))
    return root


def create_listdir_xml(target_dir):
    return ET.Element('data')


def create_xml_doc(target_dir, xsl):
    root = create_xsl_root(xsl)
    root.append(create_listdir_xml(target_dir))
    return root


####################################################################
# Main
####################################################################

if __name__ == '__main__':

    import argparse

    def create_argparser():
        parser = argparse.ArgumentParser(description=__doc__)
        parser.add_argument('dir',
                type=str, default='.', nargs='?',
                metavar='<target-directory>',
                help='Target Directory')
        parser.add_argument('-o',
                dest='output',
                default=sys.stdout,
                metavar='<output-file>',
                help='Target Directory')
        parser.add_argument('-x',
                dest='xsl',
                default='xsl/html5-hello-world.xsl',
                metavar='<xsl-file>',
                help='XSL file')
        return parser


    args = create_argparser().parse_args()

    ET.ElementTree(
            create_xml_doc(args.dir, args.xsl)).write(
            args.output, xml_declaration=True, encoding='utf-8')
