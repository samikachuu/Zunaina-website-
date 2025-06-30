git clone https://github.com/your-github-id/akiya-solutions.git
cd akiya-solutions/backend
npm install
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
npm start
docker build -t akiya-solutions-backend .
docker run -d -p 5000:5000 --env-file .env akiya-solutions-backend
cd akiya-solutions/frontend
npm install
npm start
https://akiya-solutions-demo.netlify.app/
