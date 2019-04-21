# Big Data

### Clone repository

`git clone https://github.com/SolenneD/bigdata.git`

`cd bigdata`

### Install

`npm install`

`npm install pm2@3.2.5`

### Create folder

`mkdir csv`

`mkdir csvmove`

### Download CSV file

[Download here](https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/) : **Sirene : Fichier StockEtablissement**
Put the CSV file (unzipped) at the root of the project

`node index.js`
*to split into multiple files*

### Start

Open **MongoDBCompass**

Run port **27017**

Open two shell, in one :
`pm2 monit`
in the other :
`pm2 start process.js`

### End
When everything is finished

`pm2 delete all`