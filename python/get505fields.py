import xml.etree.ElementTree as ET

def getContentsNotes(record):
    content_string = ""
    dfs = record.findall('{http://www.loc.gov/MARC21/slim}datafield')
    for df in dfs:
        if df.attrib['tag'] == '505':
            content_string = content_string + "STARTNEW505"
            sfs = df.findall('{http://www.loc.gov/MARC21/slim}subfield')
            for sf in sfs:
                code = sf.attrib['code']
                text = sf.text
                if text == None:
                    text = ""
                content_string = content_string + "$$" + code + text
    return content_string

def getMMS(record):
    mms = ""
    dfs = record.findall('{http://www.loc.gov/MARC21/slim}controlfield')
    for df in dfs:
        if df.attrib['tag'] == '001':
            mms = df.text
    return mms

outfile = open('sampled_from_2008.all.505s.txt', 'w', encoding='utf8', errors='ignore')
count = 0

tree = ET.parse('sampled_from_2008.all.xml')
root = tree.getroot()
records = root.findall('{http://www.loc.gov/MARC21/slim}record')
for record in records:
    mms = getMMS(record)
    content_string = getContentsNotes(record)
    print(content_string)
    outfile.write(mms + "\t" + content_string + "\n")
outfile.close()
