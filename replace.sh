#!/bin/sh
sed -i 's#\${API_URL}#'"$API_URL"'#g' src/environments/environment.prod.ts
npm run build
