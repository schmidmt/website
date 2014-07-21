#!/usr/bin/make -f

LESSC          = /usr/bin/lessc
CONTENT_JSON   = ./resume.json
PAGEDIR        = .
REMOTE_HOST    = schmidmt.com
SERVERSIDE_DIR = ./public_html
JINJAFY        = ./bin/jinjafy

ALL: css resume index.html
.DEFAULT: css resume index.html

index.html: $(CONTENT_JSON) index.tmpl
			$(JINJAFY) index.tmpl $(CONTENT_JSON) -o index.html

.PHONY: push
push: index.html css text_resume
			rsync -avvP --exclude="*.sw[op]" $(PAGEDIR)/{*.html,css,img,js,sitemap.xml,text_resume/resume.pdf} $(REMOTE_HOST):$(SERVERSIDE_DIR)/.
			#rsync -avP --exclude="*.sw[op]" $(PAGEDIR)/{*.html,css,img,js,sitemap.xml,text_resume/resume.pdf} schmidmt.duckdns.org:/var/www/default/htdocs/.

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
			$(MAKE) -C text_resume clean

.PHONY: force
force :;
