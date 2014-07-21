all: resume.pdf clean_temp

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

.PHONY: clean_temp
clean_temp:
	rm -rfv  *.out *.bbl *.blg *.aux *.log

.PHONY: clean
clean:
	rm -rfv  *.out *.bbl *.blg *.aux *.log *.pdf
 

	
