.PHONY: docker
build-docker:
	docker build -t conpot:latest .

run-docker:
	docker run -it -p 80:8800 -p 102:10201 -p 502:5020 -p 161:16100/udp --network=bridge --name conpot conpot:latest

format:
	black .
