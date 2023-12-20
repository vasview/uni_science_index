.PHONY: run setup activate

# VENV = venv
# PYTHON = ${VENV}\Scripts\python
# PIP = ${VENV}\Scripts\pip
PYTHON=python
PIP = pip
MANAGE = ./manage.py
APP_ACCOUNT = accounts
APP_ACTIVITIES = activities
APP_ORGANIZATION = organization
APP_REGISTER = registers
APP_PUBLICATIONS = publications
FIXTURE = ./config/fixtures

# ${VENV}\Scripts\activate: requirements.txt
# 	python -m venv venv
# 	${VENV}\Scripts\pip install -r requirements.txt

# setup: requirements.txt
# 	python -m venv ${VENV}
# 	${PIP} install -r requirements.txt

run:
	${PYTHON} ${MANAGE} runserver

migrations:
	${PYTHON} ${MANAGE} makemigrations ${APP_ACCOUNT}
	${PYTHON} ${MANAGE} makemigrations ${APP_ORGANIZATION}
	${PYTHON} ${MANAGE} makemigrations ${APP_REGISTER}
	${PYTHON} ${MANAGE} makemigrations ${APP_ACTIVITIES}
	${PYTHON} ${MANAGE} makemigrations ${APP_PUBLICATIONS}

inspect_migration:
	${PYTHON} ${MANAGE} sqlmigrate ${APP_ACCOUNT}
	${PYTHON} ${MANAGE} sqlmigrate ${APP_ORGANIZATION}
	${PYTHON} ${MANAGE} sqlmigrate ${APP_REGISTER}
	${PYTHON} ${MANAGE} sqlmigrate ${APP_ACTIVITIES}
	${PYTHON} ${MANAGE} sqlmigrate ${APP_PUBLICATIONS}
	
migrate:
	${PYTHON} ${MANAGE} migrate

rollback_all_migrations:
	${PYTHON} ${MANAGE} migrate ${APP_ACCOUNT} zero
	${PYTHON} ${MANAGE} migrate ${APP_ORGANIZATION} zero
	${PYTHON} ${MANAGE} migrate ${APP_REGISTER} zero
	${PYTHON} ${MANAGE} migrate ${APP_ACTIVITIES} zero
	${PYTHON} ${MANAGE} migrate ${APP_PUBLICATIONS} zero

delete_migrations:
	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc"  -delete

flush:
	${PYTHON} ${MANAGE} flush

static:
	${PYTHON} ${MANAGE} collectstatic

load_data:
	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/faculty.json
	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/department.json
	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/academic_degree.json
	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/academic_title.json
#	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/country.json
# 	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/menu_items.json
#	${PYTHON} ${MANAGE} loaddata ${FIXTURE}/groups.json

clean:
	find . -type f -name *.pyc -delete
	find . -type d -name __pycache__ -delete
