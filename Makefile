.PHONY: help test

help:
	@echo update - Download or update dependencies
	@echo test - Run the tests

update:
	git submodule init
	git submodule update

test:
	nodeunit
