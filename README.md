## Simple Course Selling Website Backend with JWT Authentication & MongoDB Integration

**It has two routes:**  

 1. Admin
 2. User

***Admin Route*** 

There are five endpoints:  

 1. **Signup endpoint**  
	 Allows creation of admin account  
	 
 2. **Sign in endpoint**  
	 Allows a admin to sign in  
	 
 3. **Course Creation endpoint**  
	 Allows a admin to create a course  
	 
 4. **View all Courses endpoint**    
	 Allows a admin to view all the courses  
	 
 5. **Course Updation endpoint**    
	 Allows a admin to update an already existing course  
 
 ***User Route***  
 
 There are five endpoints:  

 1. **Signup endpoint**  
	 Allows creation of user account  
	 
 2. **Sign in endpoint**  
	 Allows a user to sign in  
	 
 3. **View all courses endpoint**    
	 Allows a user to view all the courses    
	 
 4. **Course Purchasing endpoint**  
	 Allows a user to purchase a course  
	 
 5. **View Purchased Courses endpoint**  
	 Allows a user to view all the courses by purchased by the user  

***Database***  

There are three collections:  

 1. **Admins**  
	 Stores admin details  
	 
 2. **Users**  
	 Stores user details along with the courses purchased by the user  
	 
 3. **Courses**  
	 Stores course details  

***Authentication***

 - Authentication for both admins and users has been implemented using
   JSON Web Tokens (JWTs)

***Middlewares***

 - There are two middlewares, one for user authentication and one for
   admin authentication.
