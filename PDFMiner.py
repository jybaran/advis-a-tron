# -*- coding: utf-8 -*-
"""
Created on Sat Apr  7 12:37:27 2018

@author: Lauren
"""
#resource https://stackoverflow.com/questions/44024697/how-to-read-pdf-file-using-pdfminer3k
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfparser import PDFDocument
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.layout import LTTextBoxHorizontal
import re
import json      #reference https://docs.python.org/2/library/json.html
import copy

#resource https://docs.python.org/3/howto/regex.html
courseFilter = re.compile('[A-Z][A-Z][A-Z] [0-9][0-9][0-9]')
courseCatalog = open('SmithCatalogue2017-18.pdf',"rb")
parser = PDFParser(courseCatalog)
pdfDoc = PDFDocument()
parser.set_document(pdfDoc)
pdfDoc.set_parser(parser)
pdfDoc.initialize("")
manager = PDFResourceManager()
params = LAParams()
aggregate = PDFPageAggregator(manager, laparams=params)
interpret = PDFPageInterpreter(manager,aggregate)
data = []
empty = {}
for page in pdfDoc.get_pages():
    interpret.process_page(page)
    pgLayout = aggregate.get_result()
    for el in pgLayout:
        if isinstance(el,LTTextBoxHorizontal):
            txtToCheck = el.get_text()
            if (courseFilter.match(txtToCheck[0:7])):
                courseData = copy.copy(empty)
                txtArray = txtToCheck.split("\n")
                courseData["number"] = txtArray[0][0:7]
                courseData["name"] = txtArray[0][7:]
                txtArray.pop(0)
                description = "\n".join(txtArray)
                courseData["description"] = description
                data.append(courseData)               
courseCatalog.close()
jsonFile = open("courses.json","w")
json.dump(data,jsonFile)
jsonFile.close()