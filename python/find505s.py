infile = open('sampled_from_2008.all.505s.txt', 'r', encoding='utf8', errors='ignore')
outfile = open('sampled_from_2008.all.only505s.txt', 'w', encoding='utf8', errors='ignore')
dfile = open('sampled_from_2008_double-dash.txt', 'w', encoding='utf8', errors='ignore')
rfile = open('sampled_from_2008_rest.txt', 'w', encoding='utf8', errors='ignore')
tfile = open('sampled_from_2008_subfieldt.txt', 'w', encoding='utf8', errors='ignore')
hfile = open('sampled_from_2008_html.txt', 'w', encoding='utf8', errors='ignore')
sfile = open('sampled_from_2008_semi-colon.txt', 'w', encoding='utf8', errors='ignore')
nfile = open('sampled_from_2008_no-html.txt', 'w', encoding='utf8', errors='ignore')
for line in infile:
    if "STARTNEW505" in line:
        outfile.write(line)
        if " --" in line:
            dfile.write(line)
        else:
            rfile.write(line)
infile.close()
outfile.close()
dfile.close()
rfile.close()
rfile = open('sampled_from_2008_rest.txt', 'r', encoding='utf8', errors='ignore')
for line in rfile:
    if "<" not in line:
        nfile.write(line)
    if "$$t" in line:
        tfile.write(line)
    elif "<" in line:
        hfile.write(line)
    else:
        semi_split = line.split(";")
        semi_count = len(semi_split) - 1
        word_split = line.split(" ")
        word_count = len(word_split) - 1
        if semi_count > 4:
            words_per_semi = word_count / semi_count
            if words_per_semi < 15:
                sfile.write(line)
rfile.close()
tfile.close()
hfile.close()
sfile.close()
nfile.close()
