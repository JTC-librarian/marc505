import csv
import re
import statistics
infile = open('sampled_from_2008.all.only505s.txt', 'r', encoding='utf8', errors='ignore')
inreader = csv.reader(infile, delimiter="\t")
c_list = []
for row in inreader:
    c = row[1]
    c = c.replace("STARTNEW505", "")
    c = re.sub(r'\$\$.', ' ', c)
    c = re.sub(r'<.*?>', '', c)
    c_list.append(len(c))
print(statistics.mean(c_list))
print(statistics.median(c_list))
print(statistics.quantiles(c_list, n=10))
infile.close()
infile = open('sampled_from_2008_double-dash.txt', 'r', encoding='utf8', errors='ignore')
inreader = csv.reader(infile, delimiter="\t")
c_list = []
for row in inreader:
    c = row[1]
    c = c.replace("STARTNEW505", "")
    c = re.sub(r'\$\$.', ' ', c)
    c = re.sub(r'<.*?>', '', c)
    c_list.append(len(c))
print(statistics.mean(c_list))
print(statistics.median(c_list))
print(statistics.quantiles(c_list, n=10))
infile.close()
infile = open('sampled_from_2008_rest.txt', 'r', encoding='utf8', errors='ignore')
inreader = csv.reader(infile, delimiter="\t")
c_list = []
for row in inreader:
    c = row[1]
    c = c.replace("STARTNEW505", "")
    c = re.sub(r'\$\$.', ' ', c)
    c = re.sub(r'<.*?>', '', c)
    c_list.append(len(c))
print(statistics.mean(c_list))
print(statistics.median(c_list))
print(statistics.quantiles(c_list, n=10))
infile.close()
infile = open('sampled_from_2008_html.txt', 'r', encoding='utf8', errors='ignore')
inreader = csv.reader(infile, delimiter="\t")
c_list = []
for row in inreader:
    c = row[1]
    c = c.replace("STARTNEW505", "")
    c = re.sub(r'\$\$.', ' ', c)
    c = re.sub(r'<.*?>', '', c)
    c_list.append(len(c))
print(statistics.mean(c_list))
print(statistics.median(c_list))
print(statistics.quantiles(c_list, n=10))
infile.close()

    
