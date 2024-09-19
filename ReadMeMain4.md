What is the correct sequence of steps for comparing the user's password with a stored hash during login using bcrypt?

i. Retrieve the hashed password from the database.

ii. Compare the plain text password entered by the user with the hashed password retrieved using bcrypt.compare(password, hashedpassword).

iii. User enters a plain text password during login.

Ans - 3 > 1 > 2
Explanation - Solution description
When a user logs in, they first enter their password (iii). The system then retrieves the stored hash from the database (i) and compares both passwords (ii) to authenticate the user. The correct sequence is: iii -> ¡ -> ii.