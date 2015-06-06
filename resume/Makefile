all: resume.pdf resume.txt clean_temp

JINJAFY = ../bin/jinjafy
CONTENT_JSON = ../resume.json

resume.tex: $(CONTENT_JSON)
	$(JINJAFY) --latex resume.tmpl $(CONTENT_JSON) -o resume.tex

resume.pdf: resume.tex
	latexmk -silent -use-make -pdf resume

resume.txt: resume.txt.tmpl
	$(JINJAFY) resume.txt.tmpl $(CONTENT_JSON) -o resume.txt
	

.PHONY: clean_temp
clean_temp:
	latexmk -c -silent

.PHONY: clean
clean:
	latexmk -C -silent
