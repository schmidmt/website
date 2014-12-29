all: resume.pdf resume.txt clean_temp

define buildtex 
	pdflatex $(1)
	#bibtex $(1) >/dev/null
	pdflatex $(1) >/dev/null
	pdflatex $(1) >/dev/null
endef

JINJAFY = ../bin/jinjafy
CONTENT_JSON = ../resume.json

resume.tex: $(CONTENT_JSON)
	$(JINJAFY) --latex resume.tmpl $(CONTENT_JSON) -o resume.tex

resume.pdf: resume.tex
	$(call buildtex,resume)

resume.txt: resume.txt.tmpl
	$(JINJAFY) resume.txt.tmpl $(CONTENT_JSON) -o resume.txt
	

.PHONY: clean_temp
clean_temp:
	rm -rfv  *.out *.bbl *.blg *.aux *.log

.PHONY: clean
clean: clean_temp
	rm -rfv  resume.pdf resume.txt resume.tex
 

	
