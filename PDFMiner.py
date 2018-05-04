# -*- coding: utf-8 -*-
"""
Created on Sat Apr  7 12:37:27 2018

@author: Lauren
"""
# resource https://stackoverflow.com/questions/44024697/how-to-read-pdf-file-using-pdfminer3k
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfparser import PDFDocument
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.layout import LTTextBoxHorizontal
import re
import json      # reference https://docs.python.org/2/library/json.html
import copy

# sets up regex
# resource https://docs.python.org/3/howto/regex.html
courseFilter = re.compile( '[A-Z][A-Z][A-Z] [0-9][0-9][0-9]' )
latinHonorsRegex = re.compile( '{[A-Z]}' )

# opens course catalog pdf, sets up parser
courseCatalog = open( 'SmithCatalogue2017-18.pdf', "rb" )
parser = PDFParser( courseCatalog )
pdfDoc = PDFDocument()
parser.set_document( pdfDoc )
pdfDoc.set_parser( parser )
pdfDoc.initialize( "" )
manager = PDFResourceManager()
params = LAParams()
aggregate = PDFPageAggregator( manager, laparams=params )
interpret = PDFPageInterpreter( manager, aggregate )
data = {}
empty = {}

# loops over all pages in pdf
for page in pdfDoc.get_pages():
    interpret.process_page( page )
    pgLayout = aggregate.get_result()
    # loops over elements identified in page
    for el in pgLayout:
        #if the element is a horizontal box of text process as a course description
        if isinstance(el,LTTextBoxHorizontal):
            txtToCheck = el.get_text()
            latinHonorsTxt = ""
            ltnHonorsExists = True
            # checks that the block begins with a course identifier
            if (courseFilter.match(txtToCheck[0:7])):
                courseData = copy.copy(empty)   #creates a copy of the empty dictionary to avoid pointer conflicts
                txtArray = txtToCheck.split("\n")  #splits text on line breaks
                courseData["number"] = txtArray[0][0:7]  #stores course number
                courseData["name"] = txtArray[0][7:]  #stores full course name
                txtArray.pop(0) #removes course number and name so it isn't duplicated in description
                description = "\n".join(txtArray)  #joins lines remaining to form description
                courseData["description"] = description    #stores course description
                courseData["offered"] = {"Fall":False,"Spring":False}
                if not (description.find("spring")==-1) or not (description.find("Spring")==-1):
                    courseData["offered"]["Spring"] = True
                if not (description.find("fall")==-1) or not (description.find("Fall")==-1):
                    courseData["offered"]["Fall"] = True
                # finds all latin honors, stops when there are none left
                while (ltnHonorsExists):
                    ltnHnrs = latinHonorsRegex.search(description)
                    if (ltnHnrs==None):
                        ltnHonorsExists = False
                    else:
                        latinHonorsTxt = latinHonorsTxt + ltnHnrs[0]
                        description = description.replace(ltnHnrs[0],"")
                courseData["latin honors"] = latinHonorsTxt
                data[courseData["number"].replace(" ","")] = courseData  #stores dictionary with course number as key
# closes file
courseCatalog.close()

# puts course data in json file
jsonFile = open("courses.json","w")
json.dump(data,jsonFile)
jsonFile.close()
