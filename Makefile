#Makefile

install: install-deps install-flow-typed

develop:
	npx webpack-serve

install-deps:
	npm install
	
start:
	npx babel-node -- src/bin/rss-reader.js
	
install-flow-typed:
	npx flow-typed install

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

watch:
	npm test -- --watch