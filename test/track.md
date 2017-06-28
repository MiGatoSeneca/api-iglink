# Test track



### 1 Devuelve (200) siempre una brand la tenga o no en la base de datos
### 2 Devuelve una brand con los datos que se han metido en la base de datos
### 3 Devuelve (200) y si la brand no existe devuelve la brand que se a puesto y timezone (GTM)

## Track Segment (POST /track/segment/:fingerprint/:type/:slug)

### 1 Se pasa un fingerprint, un tipo de segmento y un slug y devuelve (200) y se almacena en la base de datos
### 2 Si fingerprint va vacío devuelve error(401) y (code: FINGERPRINT_IS_MISSING)
### 3 Si tipo de segmento va vacío devuelve error(401) y (code: SEGMENT_TYPE_IS_MISSING)
### 3 Si el slug del segmento va vacío devuelve error(401) y (code: SEGMENT_SLUG_IS_MISSING)

## Track Conversion (POST /track/conversion/:fingerprint/:slug)

### 1 Se pasa un fingerprint y un slug y devuelve (200) y se almacena en la base de datos
### 2 Si fingerprint va vacío devuelve error(401) y (code: FINGERPRINT_IS_MISSING)
### 3 Si el slug del conversion va vacío devuelve error(401) y (code: SEGMENT_SLUG_IS_MISSING)





# Test login

## 1 Con un usuario y contraseña válidos devuelve (200) y un sessionKey que se almacena en la base de datos
## 2 Con un usuario y contraseña no válidos devuelve error(401)
## 3 Con un email no válido devuelve error(400) de formato(code: EMAIL_NOT_VALID)
## 4 Con una contraseña no válida devuelve error(400) en el formato(code: PASSWORD_NOT_VALID)
## 5 Si falta el email devuelve error(401) de que faltan datos en el formulario (code: EMAIL_IS_MISSING)
## 6 Si falta la contraseña devuelve error(401) de que faltan datos en el formulario (code: EMAIL_IS_MISSING)
## 7 Si se loguea dos veces el sessionKey almacenado es el último

# Test signup

## 1 Si la brand no existe la introduce en la base de datos
## 2 Si la brand tiene un formato no válido devuelve error
## 3 Si la brand no lleva timezone fija GTM
## 4 Si la brand ya existe en base de datos da error

# Test account

## 1 Recupera los datos de la brand
## 2 Modifica los datos de la brand
## 3 Elimina la brand de la base de datos
