# Cassandra Migration Container Dockerfile only used for creating an automated build at Docker Hub
FROM cassandra:3.9

# script to orchestrate the automatic keyspace creation and apply all migration scripts
ADD scripts/autoMigrate.sh /usr/local/bin/autoMigrate
RUN chmod 755 /usr/local/bin/autoMigrate

# script to run any cql script from src/main/resources/config/cql
ADD scripts/execute-cql.sh  /usr/local/bin/execute-cql
RUN chmod 755 /usr/local/bin/execute-cql

ENTRYPOINT ["autoMigrate"]
