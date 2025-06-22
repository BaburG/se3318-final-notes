# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# Defensive Programming

---

# DEFENSIVE PROGRAMMING

*   Barricade Your Program to Contain the Damage Caused by Errors
*   Assertions
*   Exceptions
*   Error Handling Techniques

---

# BARRICADE YOUR PROGRAM TO CONTAIN THE DAMAGE CAUSED BY ERRORS

![A diagram illustrating the concept of a program barricade. On the left, a column of boxes represents external, untrusted data sources: "Graphical User Interface", "Command Line Interface", "Real-time Data Feed", "External Files", and "Other external objects". A caption below reads "Data here is assumed to be dirty and untrusted." Arrows point from these sources to a central, jagged-edged area labeled "the barricade". Inside this area are boxes for "Validation Class 1", "Validation Class 2", up to "Validation Class n". A caption below this area reads "These classes are responsible for cleaning the data. They make up the barricade." A large arrow points from the barricade to a grid of boxes on the right, representing the internal, trusted part of the program. These boxes are labeled "Internal Class 1", "Internal Class 2", up to "Internal Class n". A caption below this grid reads "These classses can assume data is clean and trusted."](image.png)

---

*   The class's public methods assume the data is unsafe and they are responsible for checking the data and sanitizing it.
*   The class's private methods can assume the data is safe.

---

# POP QUIZ

If class's public methods assume the data is unsafe, what would be the role of precondition?

---

# CHECKING DATA AND SANITIZING IT

*   Use conditional statements to validate inputs
*   Convert input data to proper type at input time
*   Throw exceptions

---

# USE CONDITIONAL STATEMENTS TO VALIDATE INPUTS

```vb
Public Function VelocityInput(
    ByRef latitude As Single,
    ByRef longitude As Single,
    ByRef elevation As Single
) As Single
'
' Here is the code that handles bad input data at run time.
' Sanitize input data. Values should be within the ranges
    If ( latitude < -90 ) Then
        latitude = -90
    ElseIf ( latitude > 90 ) Then
        latitude = 90
    End If
    ...
```

---

# CONVERT INPUT DATA TO PROPER TYPE AT INPUT TIME

It is possible to safely handle inputs, however, this may not be possible all the time?

```vb
...
' Here is the code that handles bad input data at run time.
' Sanitize input data. Values should be within the ranges
    If ( latitude < -90 ) Then
        latitude = -90
    ElseIf ( latitude > 90 ) Then
        latitude = 90
    End If

+   If ( longitude < 0 ) Then
+       longitude = 0
+   ElseIf ( longitude > 360 ) Then
+   ...
```

Pop question: Why is it not possible to handle invalid inputs at run time in general?

---

# Throw exceptions

*   Use exceptions to notify other parts of the program about errors that should not be ignored
*   Throw an exception only for conditions that are truly exceptional
*   Avoid throwing exceptions in constructors and destructors
*   Throw exceptions at the right level of abstraction
*   Include in the exception message all information that led to the exception
*   Avoid empty `catch` blocks
*   Consider building a centralized exception reporter
*   Standardize your project's use of exceptions

---

# THROW AN EXCEPTION ONLY FOR CONDITIONS THAT ARE TRULY EXCEPTIONAL

## File Not Found Exception

If file cannot be found throwing a `FileNotFoundException` is appropriate. This is an exceptional condition that the program cannot handle through alternative means.

```java
public void readFile(String filePath) throws FileNotFoundException {
    File file = new File(filePath);
    if (!file.exists()) {
        throw new FileNotFoundException("File not found: " + filePath);
    }
    // Continue reading the file if it exists
}
```

---

# THROW AN EXCEPTION ONLY FOR CONDITIONS THAT ARE TRULY EXCEPTIONAL

## Division By Zero Exception

Dividing a number by zero is mathematically invalid and should result in an exception (`ArithmeticException`). This is an exceptional condition that cannot be addressed through normal program flow.

```java
public double divideNumbers(int numerator, int denominator) {
    if (denominator == 0) {
        throw new ArithmeticException("Division by zero");
    }
    return numerator / denominator;
}
```

---

# THROW AN EXCEPTION ONLY FOR CONDITIONS THAT ARE TRULY EXCEPTIONAL

## Network Connection Timeout Exception

If connection times out, throwing a `SocketTimeoutException` or a related networking exception is appropriate. This is an exceptional condition that cannot be resolved by the application code.

---

# THROW AN EXCEPTION ONLY FOR CONDITIONS THAT ARE TRULY EXCEPTIONAL

If a method receives invalid input parameters that prevent it from functioning correctly, throwing an `IllegalArgumentException` or a custom exception for invalid input is suitable.

## Invalid Input Parameters Exception

```java
public void processUserData(String username, int age) {
    if (username == null || username.isEmpty()) {
        throw new IllegalArgumentException("Username cannot be empty");
    }
    if (age < 0) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
    // Continue processing user data
}
```

---

# AVOID THROWING EXCEPTIONS IN CONSTRUCTORS AND DESTRUCTORS

In some languages (C++) destructors aren't called unless an object is fully constructed.

If code within a constructor throws an exception, the destructor won't be called, thereby setting up a possible resource leak (Meyers 1996, Stroustrup 1997).

Avoid throwing exceptions in constructors.

Pop question: What are implications of this practice?

---

# THROW EXCEPTIONS AT THE RIGHT LEVEL OF ABSTRACTION

The exceptions thrown are part of the routine interface, just like specific data types are.

## Bad Java Example of a Class that Throws an Exception at an Inconsistent Level of Abstraction

```java
class Employee {
    ...
    public TaxId GetTaxId() throws EOFException {
        ...
    }
    ...
}
```

---

# THROW EXCEPTIONS AT THE RIGHT LEVEL OF ABSTRACTION: CONTINUED

## Good Java Example of a Class that Throws an Exception at a Consistent Level of Abstraction

```java
class Employee {
    ...
    public TaxId GetTaxId() throws EmployeeDataNotAvailable {
        ...
    }
    ...
}
```

---

# INCLUDE IN THE EXCEPTION MESSAGE ALL INFORMATION THAT LED TO THE EXCEPTION

Be sure the message contains the information needed to understand why the exception was thrown.

```java
public void withdraw(double amount) {
    if (amount <= 0) {
        throw new IllegalArgumentException(
            "Invalid withdrawal amount: " + amount);
    }

    if (amount > balance) {
        throw new IllegalStateException(
            "Insufficient balance for withdrawal. "
            + "Account balance: "
            + balance + ", Withdrawal amount: " + amount);
    }

    balance -= amount;
}
```

---

# AVOID EMPTY `catch` BLOCKS

Sometimes it's tempting to pass off an exception that you don't know what to do with, like this:

## Bad Java Example of Ignoring an Exception

```java
try {
    ...
    // lots of code
    ...
} catch ( AnException exception ) {
}
```

Pop question: Which checkstyle checks would check this?

---

# ASSUME THE DATA IS SAFE

*   An assertion is code that's used during development
*   When an assertion is true, that means everything is operating as expected.
*   When it's false, that means it has detected an unexpected error in the code.

Example: If the system assumes that a customer information file will never have more than 50,000 records, at some point the program might contain an assertion that the number of records is less than or equal to 50,000.

## Java Example of an Assertion

```java
assert customer.numberOfRecords() < MAX_RECORD_LIMIT : "Record limit exceeded!";
```

---

# ERROR HANDLING VS CONDITIONS THAT SHOULD NEVER OCCUR

Error-handling code is used to address an anomalous condition, the error handling will enable the program to respond to the error gracefully.

Assertion is fired for an anomalous condition, prevents part of the program from satisfying specification.

Pop question: What is that an assertion actually checks?

---

# ERROR HANDLING VS CONDITIONS THAT SHOULD NEVER OCCUR: CONTINUED

![Diagram illustrating design by contract. A "client" provides "input" that "satisfies precondition". This input goes to the "implementor" for "computation". The "output" from the implementor "satisfies postcondition" and goes back to the client. A red, jagged line labeled "specification" and "acts as firewall" separates the client and implementor, representing the contract between them.](image.png)

Assertion checks that the data satisfies precondition, so that the routine satisfies postcondition.

---

# USE ASSERTIONS TO DOCUMENT AND VERIFY PRECONDITIONS AND POSTCONDITIONS

## Visual Basic Example of Using Assertions to Document Preconditions and Postconditions

```vb
Private Function CalculateVelocity(ByVal latitude As Single, _
                                 ByVal longitude As Single, _
                                 ByVal elevation As Single) As Single
    ' Preconditions
    Debug.Assert ( -90 <= latitude And latitude <= 90 )
    Debug.Assert ( 0 <= longitude And longitude < 360 )
    Debug.Assert ( -500 <= elevation And elevation <= 75000 )
    ...
    ' Postconditions
    Debug.Assert ( 0 <= returnVelocity And returnVelocity <= 600 )
    ' return value
    Velocity = returnVelocity
End Function
```

---

# BARRICADE YOUR PROGRAM TO CONTAIN THE DAMAGE CAUSED BY ERRORS: REVIEW

![A diagram illustrating the concept of a program barricade. On the left, a column of boxes represents external, untrusted data sources: "Graphical User Interface", "Command Line Interface", "Real-time Data Feed", "External Files", and "Other external objects". A caption below reads "Data here is assumed to be dirty and untrusted." Arrows point from these sources to a central, jagged-edged area labeled "the barricade". Inside this area are boxes for "Validation Class 1", "Validation Class 2", up to "Validation Class n". A caption below this area reads "These classes are responsible for cleaning the data. They make up the barricade." A large arrow points from the barricade to a grid of boxes on the right, representing the internal, trusted part of the program. These boxes are labeled "Internal Class 1", "Internal Class 2", up to "Internal Class n". A caption below this grid reads "These classses can assume data is clean and trusted."](image.png)

---

# USE CONDITIONAL STATEMENTS TO VALIDATE INPUTS: REVIEW

```vb
Public Function VelocityInput(
    ByRef latitude As Single,
    ByRef longitude As Single,
    ByRef elevation As Single
) As Single
'
' Here is the code that handles bad input data at run time.
' Sanitize input data. Values should be within the ranges
    If ( latitude < -90 ) Then
        latitude = -90
    ElseIf ( latitude > 90 ) Then
        latitude = 90
    End If
    ...
```

---

# AVOID PUTTING EXECUTABLE CODE INTO ASSERTIONS

## Visual Basic Example of a Dangerous Use of an Assertion

```vb
Debug.Assert( PerformAction() ) ' Couldn't perform action
```

Put executable statements on their own lines, assign the results to status variables, and test the status variables instead.

## Visual Basic Example of a Safe Use of an Assertion

```vb
actionPerformed = PerformAction()
Debug.Assert( actionPerformed ) ' Couldn't perform action
```

---

End of Week 13

Thanks for listening