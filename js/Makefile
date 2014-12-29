#!/usr/bin/make -f
SHELL := /bin/bash

YUICOMPRESSOR = /usr/bin/yuicompressor

ALL: script.min.js
.DEFAULT: script.min.js

script.min.js: main.js 
			#$(YUICOMPRESSOR) --type js <( cat jquery.min.js jquery.lazyload.min.js bootstrap.min.js footable.min.js footable.paginate.js script.js) -o script.min.js
			r.js -o build.js

.PHONY: clean
clean :
			-$(RM) script.min.js

.PHONY: force
force :;
