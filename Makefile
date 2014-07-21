#!/usr/bin/make -f

LESSC = /usr/bin/lessc


STYLE_LESS = css/style.less
STYLE_CSS = css/style.css
STYLE_MINCSS = css/style.min.css
CONTENT_JSON = ./resume.json
PAGEDIR = .

REMOTE_HOST = schmidmt.com
SERVERSIDE_DIR = ./public_html

JINJAFY = ./jinjafy

.PHONY: html
html: index.html

index.html: $(CONTENT_JSON) index.tmpl
	${JINJAFY} index.tmpl $(CONTENT_JSON) -o index.html

.PHONY: check
check: $(STYLE_LESS)
				$(LESSC) --lint $(STYLE_LESS)

$(STYLE_CSS) $(STYLE_MINCSS): $(STYLE_LESS) check
				$(LESSC) $(STYLE_LESS) $(STYLE_CSS)
				$(LESSC) --clean-css $(STYLE_LESS) $(STYLE_MINCSS)
					
.PHONY: css
css: $(STYLE_CSS)

.PHONY: push
push: $(STYLE_CSS) html
			rsync -avP --exclude="*.sw[op]" $(PAGEDIR)/{*.html,css,img,js,sitemap.xml} $(REMOTE_HOST):$(SERVERSIDE_DIR)/.
			rsync -avP --exclude="*.sw[op]" $(PAGEDIR)/{*.html,css,img,js,sitemap.xml} schmidmt.duckdns.org:/var/www/default/htdocs/.

.DEFAULT: css html
