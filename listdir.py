#!/usr/bin/env python
# vim: set ts=4 et sw=4 sts=4 fileencoding=utf-8:

import os
import sys
import xml.etree.ElementTree as ET

def ditp_main(target_dir, output_file):
    fake_root = ET.Element(None)
    pi = ET.PI("xml-stylesheet", "type='text/xsl' href='xsl/html5-hello-world.xsl'")
    fake_root.append(pi)
    root = ET.Element('data')
    fake_root.append(root)
    ET.ElementTree(fake_root).write(
            output_file, xml_declaration=True, encoding='utf-8')

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
        return parser

    args = create_argparser().parse_args()

    ditp_main(args.dir, args.output)
