require('dotenv').config();
const multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage')

const uploadLocal = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'src/public/uploads');
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

const BUCKET_NAME = process.env.FIREBASE_BUCKET_NAME||'';
const CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL||'';
const PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') ||'';
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID||'';


const uploadFirebase = multer({
  storage: FirebaseStorage({
    bucketName: BUCKET_NAME,
    credentials: {
      clientEmail: CLIENT_EMAIL,
      privateKey: PRIVATE_KEY,
      projectId: PROJECT_ID
    },
    directoryPath:'web',
    unique: true,
    public: true
  })
})
module.exports = {uploadLocal, uploadFirebase};
