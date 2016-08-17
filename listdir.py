#!/usr/bin/env python
# vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

from itertools import ifilter

import argparse
import hashlib
import os
import re
import stat
import sys
import xml.etree.ElementTree as ET

DEFAULT_TARGET_DIR = '.'
DEFAULT_OUTPUT_FILE = sys.stdout
DEFAULT_XSL = 'xsl/listdir.xsl'
DEFAULT_REGEX = r'.*'

def md5(path):
    hash_md5 = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def create_xsl_root(xsl):
    root = ET.Element(None)
    root.append(ET.PI("xml-stylesheet", "type='text/xsl' href='%s'" % (xsl,)))
    return root


def create_file_xml(path, regex):
    if not re.compile(regex).match(path):
        return None

    elem = ET.Element('file')
    elem.set('name', os.path.basename(path))
    elem.set('mtime', str(os.stat(path).st_mtime))
    elem.set('md5', md5(path))
    return elem


def create_directory_xml(path, regex):
    elem = ET.Element('directory')
    elem.set('name', os.path.basename(path))
    elem.set('mtime', str(os.stat(path).st_mtime))

    for node in ifilter(lambda x: x is not None,
            [ create_node_xml(os.path.join(path, child), regex) \
                for child in os.listdir(path) ]):
        elem.append(node)
    return elem if len(list(elem)) > 0 else None


def create_node_xml(path, regex):
    return create_directory_xml(path, regex) if os.path.isdir(path) else \
           create_file_xml(path, regex) if os.path.isfile(path) else \
           None

def create_xml_doc(path, xsl, regex):
    root = create_xsl_root(xsl)
    root.append(create_node_xml(path, regex))
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

    parser.add_argument('-r',
            dest='regex',
            default=DEFAULT_REGEX,
            metavar='<regex>',
            help='Regex for File Name')

    return parser

####################################################################
# Main
####################################################################

if __name__ == '__main__':

    args = create_argparser().parse_args()

    ET.ElementTree(
            create_xml_doc(args.dir, args.xsl, args.regex)).write(
            args.output, xml_declaration=True, encoding='utf-8')
