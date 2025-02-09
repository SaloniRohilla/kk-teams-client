**Table of Contents**
1. Tech Stack
2. Dependencies
3. Setup
4. Environment Variables


**Tech Stack**
Framework: Next.js (React)
Styling: Tailwind CSS
State Management: Context API
API Communication: Axios


**Dependencies**
React: ^18.3.1
Next.js: ^15.0.3
Tailwind CSS: ^3.4.14
Axios: ^1.7.7


**Setup**
Clone the Repository:
git clone https://github.com/your-username/kk-teams-client.git
cd kk-teams-client

**Install Dependencies:**
npm install

**Run the Project:**
npm run dev

The app will be accessible at http://localhost:3000.

**Connect to the Server:**
Ensure the backend server is running, and set the API URL in the environment file.

**Environment Variables**
Create a .env.local file in the root of kk-teams-client with the following:

NEXT_PUBLIC_API_URL=http://localhost:5000
Replace http://localhost:5000 with your server’s URL if different.
