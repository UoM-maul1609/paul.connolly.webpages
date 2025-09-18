import PyPDF2
#pdfFile = open('../eart10160_student.pdf','rb')
pdfFile = open('eart20170_student.pdf','rb')

pdfReader=PyPDF2.PdfFileReader(pdfFile)
pdfWriter=PyPDF2.PdfFileWriter()

import sys

#print (sys.argv[1])
low = int(sys.argv[1])
high = int(sys.argv[2])
NewFile = '' + str(sys.argv[3]) + ''


for pageNum in range(low-1,high):
   pageObj=pdfReader.getPage(pageNum)
   pdfWriter.addPage(pageObj)

pdfOutputFile=open(NewFile,'wb')
pdfWriter.write(pdfOutputFile)
pdfOutputFile.close()
pdfFile.close()

