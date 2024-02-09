import xml.etree.ElementTree as ET
outfile = open('BNB_date_isbn_with_references.txt', 'w')

def processBNBfile(filename):
    print(filename)
    tree = ET.parse(filename)
    root = tree.getroot()
    rdf = "{http://www.w3.org/1999/02/22-rdf-syntax-ns#}"
    dcterms = "{http://purl.org/dc/terms/}"
    bibo = "{http://purl.org/ontology/bibo/}"
    records = root.findall(rdf + "Description")
    print(len(records))
    for record in records:
        try:
            date = record.find(dcterms + "issued").text
            if len(date) == 4:
                pass
            else:
                continue
        except:
            continue
        try:
            isbn = record.find(bibo + "isbn13").text
        except:
            continue
        includesReferences = False
        try:
            description_list = record.findall(dcterms + "description")
            for description in description_list:
                if "Includes bibliographical references and index" in description.text:
                    includesReferences = True
            if not includesReferences:
                continue
        except:
            continue
        outfile.write(date + "\t" + isbn + "\n")

processBNBfile('BNBBasic_202309_f01.rdf')
processBNBfile('BNBBasic_202309_f02.rdf')
processBNBfile('BNBBasic_202309_f03.rdf')
processBNBfile('BNBBasic_202309_f04.rdf')
processBNBfile('BNBBasic_202309_f05.rdf')
processBNBfile('BNBBasic_202309_f06.rdf')
processBNBfile('BNBBasic_202309_f07.rdf')
processBNBfile('BNBBasic_202309_f08.rdf')
processBNBfile('BNBBasic_202309_f09.rdf')
processBNBfile('BNBBasic_202309_f10.rdf')
processBNBfile('BNBBasic_202309_f11.rdf')
processBNBfile('BNBBasic_202309_f12.rdf')
processBNBfile('BNBBasic_202309_f13.rdf')
processBNBfile('BNBBasic_202309_f14.rdf')
processBNBfile('BNBBasic_202309_f15.rdf')
processBNBfile('BNBBasic_202309_f16.rdf')
processBNBfile('BNBBasic_202309_f17.rdf')
processBNBfile('BNBBasic_202309_f18.rdf')
processBNBfile('BNBBasic_202309_f19.rdf')
processBNBfile('BNBBasic_202309_f20.rdf')
processBNBfile('BNBBasic_202309_f21.rdf')
processBNBfile('BNBBasic_202309_f22.rdf')
processBNBfile('BNBBasic_202309_f23.rdf')
processBNBfile('BNBBasic_202309_f24.rdf')
processBNBfile('BNBBasic_202309_f25.rdf')
processBNBfile('BNBBasic_202309_f26.rdf')
processBNBfile('BNBBasic_202309_f27.rdf')
processBNBfile('BNBBasic_202309_f28.rdf')
processBNBfile('BNBBasic_202309_f29.rdf')
processBNBfile('BNBBasic_202309_f30.rdf')
processBNBfile('BNBBasic_202309_f31.rdf')
processBNBfile('BNBBasic_202309_f32.rdf')
processBNBfile('BNBBasic_202309_f33.rdf')
processBNBfile('BNBBasic_202309_f34.rdf')
processBNBfile('BNBBasic_202309_f35.rdf')
processBNBfile('BNBBasic_202309_f36.rdf')
processBNBfile('BNBBasic_202309_f37.rdf')
processBNBfile('BNBBasic_202309_f38.rdf')
processBNBfile('BNBBasic_202309_f39.rdf')
processBNBfile('BNBBasic_202309_f40.rdf')
processBNBfile('BNBBasic_202309_f41.rdf')
processBNBfile('BNBBasic_202309_f42.rdf')
processBNBfile('BNBBasic_202309_f43.rdf')
processBNBfile('BNBBasic_202309_f44.rdf')
processBNBfile('BNBBasic_202309_f45.rdf')
processBNBfile('BNBBasic_202309_f46.rdf')
processBNBfile('BNBBasic_202309_f47.rdf')
processBNBfile('BNBBasic_202309_f48.rdf')
processBNBfile('BNBBasic_202309_f49.rdf')
processBNBfile('BNBBasic_202309_f50.rdf')
processBNBfile('BNBBasic_202309_f51.rdf')
processBNBfile('BNBBasic_202309_f52.rdf')
processBNBfile('BNBBasic_202309_f53.rdf')
processBNBfile('BNBBasic_202309_f54.rdf')
processBNBfile('BNBBasic_202309_f55.rdf')
processBNBfile('BNBBasic_202309_f56.rdf')
processBNBfile('BNBBasic_202309_f57.rdf')
processBNBfile('BNBBasic_202309_f58.rdf')
processBNBfile('BNBBasic_202309_f59.rdf')
processBNBfile('BNBBasic_202309_f60.rdf')
processBNBfile('BNBBasic_202309_f61.rdf')
processBNBfile('BNBBasic_202309_f62.rdf')
processBNBfile('BNBBasic_202309_f63.rdf')
processBNBfile('BNBBasic_202309_f64.rdf')
processBNBfile('BNBBasic_202309_f65.rdf')
processBNBfile('BNBBasic_202309_f66.rdf')
processBNBfile('BNBBasic_202309_f67.rdf')
processBNBfile('BNBBasic_202309_f68.rdf')
processBNBfile('BNBBasic_202309_f69.rdf')
processBNBfile('BNBBasic_202309_f70.rdf')
processBNBfile('BNBBasic_202309_f71.rdf')
processBNBfile('BNBBasic_202309_f72.rdf')
outfile.close()
