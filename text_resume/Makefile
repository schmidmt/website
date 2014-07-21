all: resume.tex clean

define buildtex 
	pdflatex $(1)
	#bibtex $(1) >/dev/null
	#pdflatex $(1) >/dev/null
	pdflatex $(1) >/dev/null
endef

JINJAFY = ../bin/jinjafy
CONTENT_JSON = ../resume.json

resume.tex: $(CONTENT_JSON)
	$(JINJAFY) --latex resume.tmpl $(CONTENT_JSON) -o resume.tex

resume_teacher: resume.tex
	$(call buildtex,resume)

clean:
	rm -rfv  *.out *.bbl *.blg *.aux *.log

pdfclean:
	rm -rfv  *.out *.bbl *.blg *.aux *.log *.pdf
 

	
