https://medium.com/firebase-developers/how-to-import-production-data-from-cloud-firestore-to-the-local-emulator-e82ae1c6ed8

delete old backup folders:
gsutil -m rm -r gs://loop-luck.appspot.com/firestore  

take new backup
gcloud firestore export gs://loop-luck.appspot.com/firestore

cd functions
gsutil -m cp -r gs://loop-luck.appspot.com/firestore .    
