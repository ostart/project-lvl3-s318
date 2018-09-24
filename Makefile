#Makefile

install:
	npm install
	
start:
	npm run babel-node -- src/bin/rss-reader.js
	
build:
	rm -rf dist/
	npm run build
	
publish:
	npm publish
	
lint:
	npm run eslint .

test:
	npm test

watch:
	npm test -- --watch