My CMS Project

📌 This project is a simple **Content Management System (CMS)** that allows users to manage entries via a web interface. It features user role management, status toggling, and CRUD operations via a modal-based UI.

🛠️ Features
- **User Management**: Add, edit, and delete users.
- **Role Assignment**: Users can be assigned as **Admin** or **User**.
- **Status Control**: Users can be set as **Active** or **Inactive**.
- **Bulk Actions**: Allows batch selection for modifying user statuses.
- **Modal-Based UI**: User-friendly popups for adding and editing users.

📂 Project Structure

/project-root  
index.html # Main HTML file (User Interface). 
script.js # JavaScript handling UI interaction and AJAX requests. 
style.css # Stylesheet for the CMS UI. 
source.php # Backend PHP script for handling requests. 
test_users.sql # Sample database script for test users. 

🚀 How to Use
1. Clone this repository:
   ```sh
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
2. Set up a local or remote PHP server.
3. Import the database schema from test_users.sql.
4. Open index.html in a browser or run the project via a local server.

⚙️ Technologies Used
- HTML, CSS, JavaScript (jQuery)
- Bootstrap for UI styling
- PHP for backend processing
- MySQL for data storage

📌 Key Functionalities
- AJAX requests (script.js) communicate with source.php for database operations.
- jQuery modal dialogs for adding, editing, and deleting users.
- Bulk operations via checkboxes and dropdown actions.
