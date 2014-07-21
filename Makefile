#!/usr/bin/make -f

LESSC          = /usr/bin/lessc
CONTENT_JSON   = ./resume.json
PAGEDIR        = .
REMOTE_HOST    = schmidmt.com
SERVERSIDE_DIR = ./public_html
JINJAFY        = ./bin/jinjafy
HTMLCOMPRESSOR = /usr/bin/java -jar ./bin/htmlcompressor-1.5.3.jar
COMPRESSOROPS  = --remove-intertag-spaces --remove-quotes  

ALL: css js resume index.html
.DEFAULT: css js resume index.html

index.html: $(CONTENT_JSON) index.tmpl
			$(JINJAFY) index.tmpl $(CONTENT_JSON) |  $(HTMLCOMPRESSOR) $(COMPRESSOROPTS) --output index.html

.PHONY: push
push: index.html css resume js
			rsync -avP --exclude="*.sw[op]" $(PAGEDIR)/{*.html,css,img,js,sitemap.xml,resume/resume.pdf} $(REMOTE_HOST):$(SERVERSIDE_DIR)/.
			#rsync -avP --exclude="*.sw[op]" $(PAGEDIR)/{*.html,css,img,js,sitemap.xml,resume/resume.pdf} schmidmt.duckdns.org:/var/www/default/htdocs/.

.PHONY: js
js: force
			@echo "Building js"
			$(MAKE) -C js

.PHONY: css
css: force
			@echo "Building css"
			$(MAKE) -C css

.PHONY: resume
resume: force
			@echo "Building resume"
			$(MAKE) -C resume

.PHONY: clean
clean :
			-$(RM) index.html
			$(MAKE) -C css clean
			$(MAKE) -C resume clean
			$(MAKE) -C js clean

.PHONY: force
force :;
