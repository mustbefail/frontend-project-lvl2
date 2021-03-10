install: install-deps

install-deps:
	npm ci

gendiff:
	node gendiff.js
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run
