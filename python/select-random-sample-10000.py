import random
import csv
infile = open('bnb_date_isbn_with_references.txt', 'r')
inreader = csv.reader(infile, delimiter="\t")
outfile = open('sampled_from_2018.txt', 'w')
full_list = []
count = 0
for row in inreader:
    count = count + 1
    print(count)
    date = row[0]
    isbn = row[1]
    if date == "2018":
        if isbn not in full_list:
            full_list.append(isbn)
print(len(full_list))
random.shuffle(full_list)
count = 0
for isbn in full_list:
    outfile.write(isbn + "\n")
    count = count + 1
    if count == 10000:
        break
infile.close()
outfile.close()
    
    
