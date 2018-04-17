build:
	cat lib/nut.min.js lib/dragula.min.js src/game.js src/app.js > dist.js

dist: build
	uglifyjs --compress -- dist.js > dist2.js
	mv dist2.js dist.js
