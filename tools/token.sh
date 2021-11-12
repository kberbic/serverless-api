curl -i \
-H "Content-Type=application/x-www-form-urlencoded" \
https://service-user-pool-domain-dev-develop.auth.us-east-1.amazoncognito.com/oauth2/token \
-d 'grant_type=authorization_code&client_id=4fncmqhc9fhr5k08gffs32ivae&code=AUTHORIZATION_CODE&redirect_uri=com.myclientapp://myclient/redirect'
