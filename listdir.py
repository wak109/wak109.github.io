#!/usr/bin/env python
# vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

import argparse
import hashlib
import json
import os
import re
import stat
import sys
import xml.etree.ElementTree as ET

if sys.version_info < (3, 0):
    from itertools import ifilter as filter

DEFAULT_CONFIG = 'json/config.json'


def get_markdown_title(path, regex=r'^#+\s+(.*)$'):
    with open(path) as f:
        try:
            return next(filter(lambda match: match != None,
                map(lambda line: re.match(regex, line),
                    iter(f.readline, '')))).group(1)
        except StopIteration:
            return os.path.splitext(os.path.basename(path))[0]

def md5(path):
    hash_md5 = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def read_config(path):
    if sys.version_info < (3, 0):
        with open(path, "rb") as fp:
            return json.load(fp, 'utf-8')
    else:
        with open(path, "r") as fp:
            return json.load(fp)

def create_xsl_root():
    return ET.Element(None)


def create_file_xml(path, regex):
    if not re.compile(regex).match(path):
        return None

    elem = ET.Element('file')
    elem.set('name', os.path.basename(path))
    elem.set('mtime', str(os.stat(path).st_mtime))
    elem.set('md5', md5(path))
    elem.set('title', get_markdown_title(path))
    return elem


def create_directory_xml(path, regex):
    elem = ET.Element('directory')
    elem.set('name', os.path.basename(path))
    elem.set('mtime', str(os.stat(path).st_mtime))

    for node in create_child_node_list(path, regex):
        elem.append(node)

    return elem if len(list(elem)) > 0 else None


def create_node_xml(path, regex):
    return create_directory_xml(path, regex) if os.path.isdir(path) else \
           create_file_xml(path, regex) if os.path.isfile(path) else \
           None


def create_child_node_list(path, regex):
    return filter(lambda x: x is not None,
            [ create_node_xml(os.path.join(path, child), regex) \
                for child in os.listdir(path) ])


def create_top_node_xml(path, regex):
    elem = ET.Element('top')
    elem.set('path', path)
    elem.set('regex', regex)

    for child in create_child_node_list(path, regex):
        elem.append(child)

    return elem    


def create_xml_doc(path, regex):
    root = create_xsl_root()
    root.append(create_top_node_xml(path, regex))
    
    return root


def create_argparser():
    parser = argparse.ArgumentParser(description=__doc__)

    parser.add_argument('-c',
            dest='config',
            default=DEFAULT_CONFIG,
            metavar='<config-file>',
            help='Config JSON file')

    parser.add_argument('dir',
            type=str, default=None,
            nargs='?',
            metavar='<target-directory>',
            help='Target Directory')

    parser.add_argument('-o',
            dest='output',
            default=None,
            metavar='<output-file>',
            help='Output File')

    parser.add_argument('-r',
            dest='regex',
            default=None,
            metavar='<regex>',
            help='Regex for File Name')

    return parser

####################################################################
# Main
####################################################################

if __name__ == '__main__':

    args = create_argparser().parse_args()
    config = read_config(args.config)

    ET.ElementTree(
        create_xml_doc(
            args.dir or config['dir'],
            args.regex or config['regex']
            )).write( 
                args.output or config['output'],
                xml_declaration=True, encoding='utf-8')
