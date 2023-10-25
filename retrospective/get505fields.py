import xml.etree.ElementTree as ET

def getContentsNotes(record):
    content_string = ""
    dfs = record.findall('datafield')
    for df in dfs:
        if df.attrib['tag'] == '505':
            content_string = content_string + "STARTNEW505"
            sfs = df.findall('subfield')
            for sf in sfs:
                code = sf.attrib['code']
                text = sf.text
                if text == None:
                    text = ""
                content_string = content_string + "$$" + code + text
    if content_string[0:11] == "STARTNEW505":
        content_string = content_string[11:]
    return content_string

def getMMS(record):
    mms = ""
    dfs = record.findall('controlfield')
    for df in dfs:
        if df.attrib['tag'] == '001':
            mms = df.text
    return mms

xml_file = open('mms_list.txt', 'r', encoding='utf8', errors='ignore')
outfile = open('solent_contents_notes.txt', 'w', encoding='utf8', errors='ignore')
count = 0

tree = ET.parse('solent505s.xml')
root = tree.getroot()
records = root.findall('record')
for record in records:
    mms = getMMS(record)
    content_string = getContentsNotes(record)
    print(content_string)
    outfile.write(mms + "\t" + content_string + "\n")
outfile.close()
