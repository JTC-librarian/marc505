This folder contains python files used in the processing of records for my research into the formating of 505 fields.
The scripts are fairly basic, and are shared here more in the desire to be open about how the research was performed than in the expectation that they will be useful to others.
There are five scripts:
1. process-bnb.py.  This takes the RDF files from the British National Bibliography and reduces them to a simple CSV file, containing date and ISBN for those records that meet the critieria.
2. select-random-sample-10000.py. This takes the output from the above script as its input, looks for all lines with a certain date (hardcoded), and then selects 10,000 lines from those at random.
The list of ISBNS resulting from script 2 were used to retrieve MARC records via z39.50. These were converted to MARCXML in MArcEdit and processed by the follpwing scripts:
3. get505fields.py. This reduces the large xml files to just a list of 505 fields.
4. find505s.py. This determines - with some acknowledged and accepted level of inaccuracy - the delimiter used in each 505.
5. 505linelength.py. This does some basic mathematical analysis of the line length of 505s.
