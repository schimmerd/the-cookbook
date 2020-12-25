# MUM'M Recipes World

Community based product:
Upload & Search your favourite recipes (.jpg recommended)

## Deployment
gcloud builds submit --tag eu.gcr.io/v135-5247-playground-schimmer/the-cookbook-web-app
gcloud beta run deploy the-cookbook-web-app --image eu.gcr.io/v135-5247-playground-schimmer/the-cookbook-web-app --platform managed --region europe-west1 --concurrency 10 --allow-unauthenticated --memory 2Gi --timeout 300


### Roadmap
v.1.0
- add "to favourites" function
- add PDF support --> DOCUMENT_TEXT_DETECTION
- Bugfixes

