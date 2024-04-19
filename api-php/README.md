# DUNEDIN - PHP api

## setup

### DB
##### grant privileges:
```
docker-compose exec ${DB_DOCKER_NAME} sh -c 'mariadb -uroot -p${MYSQL_ROOT_PASSWORD}'
CREATE DATABASE ${MYSQL_DATABASE};
GRANT ALL PRIVILEGES ON ${MYSQL_USER}.* TO '${MYSQL_USER}'@'%' WITH GRANT OPTION;
```

```
docker-compose exec dunedin_sql sh -c 'mariadb -uroot -proot'
CREATE DATABASE dunedin2;
GRANT ALL PRIVILEGES ON user.* TO 'user'@'%' WITH GRANT OPTION;
```

##### APP Configuration:
```
==[n]app_name==|>>Dunedin>>;;
==[s]code_path==|>>/var/www/html/app>>;;
==[s]code_structure==|>>feature>>;;
==[s]code_namespace==|>>Dunedin>>;;
==[n]media_folder==|>>/var/www/medias>>;;
```



