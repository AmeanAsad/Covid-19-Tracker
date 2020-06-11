# Covid-19-Tracker
Covid-19 project that displays statistics for each country regarding the pandemic. 


# Installation
To download repo you can:
 - Use git clone:
  <pre> <code> git init </code></pre>
  <pre> <code>git clone https://github.com/AmeanAsad/Covid-19-Tracker.git </code> </pre>
 - Download zip file from Git. 
 
 After download, you need to install required packages:
  - You need to have Node and pip installed on your machine. Installing these packages is fairly easy with a quick google search. 
  - There are two steps to this, installing the Python Django Packages and Installing the Node Packages:
  1. To install Python Packages:
   - Open terminal/cmd
   - cd to the root directory of the repo. 
   - Run <code> pip install -r requirements.txt </code> 
  2. To install Node Packages:
   - Open terminal/cmd
   - cd to the root directory of the repo.
   - Type <code> cd DjangoReact/frontend </code>
   - Type <code> npm install </code> 

# Usage

- There are two types of local environments you can run:
  1. A development environment, running Django and React independtly. This is the recommended one for performing edits on the project. 
  2. A production environment, serving the React app through the Django server on the same <code> localhost </code>. This is recommended only to test the website before a push to production. 
  
 - To run the development environment: 
   1. Open two terminal/cmd tabs and cd to the root directory of the project on both tabs.
   2. On one of the tabs type <code> cd DjangoReact/frontend </code> 
   3. In the root directory tab, type <code> python manage.py runserver --settings=settings </code> to start the Django server.
   4. In the frontend directory tab, type <code> npm start </code> to start the react app. 
   5. Go to your browser and in the url tab, type <code> http://localhost:3000/ </code> to navigate to the page. 
   
 - To run the production environment: 
   1. Open two terminal/cmd tabs and cd to the root directory of the project on both tabs.
   2. On one of the tabs type <code> cd DjangoReact/frontend </code> 
   3. In the root directory tab, type <code> python manage.py runserver --settings=production_settings </code> to start the Django server.
   4. In the frontend directory tab, type <code> npm run build </code>. 
   5. In <code> DjangoReact/frontend </code> directory, copy the src file from that directory.
   6. Paste it in the root directory of the project, and replacing the <code> src </code> file there. (I am working on a fix to prevent the copy/pasting part, but this works for now).
   7. Go to your browser and in the url tab, type <code> http://127.0.0.1:8000/ </code> to navigate to the page. 
   
   
 
   
