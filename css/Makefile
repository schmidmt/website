#!/usr/bin/make -f

LESSC        = /usr/bin/lessc

.PHONY: css
css : style.css style.min.css

style.css style.min.css : style.less
			$(LESSC) style.less style.css
			$(LESSC) --clean-css style.less style.min.css

.PHONY: clean
clean :
			-$(RM) -f style.css style.min.css

.PHONY: check
check :
			$(LESSC) --lint style.less
