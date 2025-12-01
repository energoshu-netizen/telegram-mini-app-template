.PHONY: up down build logs clean migrate seed

up:
	 docker-compose up -d

down:
	 docker-compose down

build:
	 docker-compose build --no-cache

logs:
	 docker-compose logs -f

clean:
	 docker-compose down -v
	 docker system prune -f

migrate:
	 docker-compose exec backend npm run migrate

seed:
	 docker-compose exec backend npm run seed
