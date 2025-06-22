# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# CONTROLLING LOOPS

---

# CONTROLLING LOOPS

*   Selecting the Kind of Loop
*   Controlling the Loop
*   Processing the Middle of the Loop
*   Exiting the Loop
*   Using Loop Variables
*   Loop Length

---

# SELECTING THE KIND OF LOOP

*   The counted loop is performed a specific number of times
*   The iterator loop performs its action once for each element in a container class.
*   The continuously evaluated loop doesn't know ahead of time how many times it will be executed and tests whether it has finished on each iteration.
*   The endless loop executes forever once it has started.

---

# WHEN TO USE A `for` LOOP?

Know the Number of Iterations in Advance

![SpongeBob SquarePants holding open a glowing briefcase. Inside the briefcase is a snippet of Java code for a 'for' loop.](image.png)

**OCR Text from Image:**

```java
FOR (INT I = 1; I <= 5; I++) {
    SYSTEM.OUT.PRINTLN();
}
```

---

# WHEN TO USE A `for` LOOP?

Simplifying Loop Initialization and Updates:

```java
// Example: Summing numbers from 1 to 10 using a for loop
int sum = 0;
for (int i = 1; i <= 10; i++) {
    sum += i;
}
System.out.println("Sum: " + sum);
```

---

# WHEN TO USE A `for` LOOP?

Implementing Count-Controlled Loops:

```python
# Example: Using a for loop to iterate over a range of numbers
for i in range(1, 6): # Range from 1 to 5 (inclusive)
    print(i)
```

---

# WHEN TO USE A `for` LOOP?

Working with Index-Based Iteration:

```java
// Example: Accessing elements in an array using a for loop with index
int[] numbers = {10, 20, 30, 40, 50};
for (int i = 0; i < numbers.length; i++) {
    System.out.println("Element at index " + i + " : " + numbers[i]);
}
```

---

# WHEN TO USE A `for` LOOP?

Writing Concise and Readable Code:

```java
// Example: Calculating the factorial of a number using a for loop
int number = 5;
int factorial = 1;
for (int i = 1; i <= number; i++) {
    factorial *= i;
}
System.out.println("Factorial of " + number + " is " + factorial);
```

---

# WHEN TO USE A `foreach` LOOP?

Iterating Over Collections or Arrays:

```java
// Example: Using a for-each loop to iterate over elements in an array
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
```

---

# WHEN TO USE A `foreach` LOOP?

When You Don't Need Index-Based Access:

```python
# Example: Processing items in a list using a for-each loop
items = ['apple', 'banana', 'cherry']
for item in items:
    print(item)
```

---

# WHEN TO USE A `foreach` LOOP?

Avoiding Index Out of Bounds Errors:

```java
// Example: Using a for-each loop with an ArrayList to avoid index out of bounds errors
List<String> fruits = new ArrayList<>();
fruits.add("apple");
fruits.add("banana");
fruits.add("cherry");
for (String fruit : fruits) {
    System.out.println(fruit);
}
```

---

# WHEN TO USE A `foreach` LOOP?

Enhancing Code Readability and Maintainability:

```java
// Example: Processing elements in a map using a for-each loop
Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);
ages.put("Bob", 25);
ages.put("Charlie", 35);
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey()
        + " is "
        + entry.getValue()
        + " years old.");
}
```

---

# WHEN TO USE A `foreach` LOOP?

Working with Unmodifiable Collections:

```java
// Example: Iterating over an unmodifiable list using a for-each loop
List<String> colors = Collections.unmodifiableList(
    Arrays.asList("red", "green", "blue"));
for (String color : colors) {
    System.out.println(color);
}
```

---

# WHEN TO USE A `foreach` LOOP?

Avoiding ConcurrentModificationException in Iterators:

```java
// Example: Avoiding ConcurrentModificationException with a for-each loop
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

// Concurrently modify the list while iterating (not recommended but illustrates the issue)
for (String name : names) {
    System.out.println(name);
    if (name.equals("Bob")) {
        names.remove(name); // This will cause ConcurrentModificationException in single thread
    }
}
```

https://stackoverflow.com/questions/21865095/is-for-each-iteration-thread-safe

---

# CONTROLLING THE LOOP

*   Put initialization code directly before the loop
*   Use `while(true)` for infinite loops
*   Don't use a `for` loop when a `while` loop is more appropriate

---

# PUT INITIALIZATION CODE DIRECTLY BEFORE THE LOOP

Keep loop-initialization statements with the loop they're related to.

```java
int number = 5;
int factorial = 1;
for (int i = 1; i <= number; i++) {
    factorial *= i;
}
```

```cpp
inputFile.MoveToStart();
recordCount = 0;
while (!inputFile.EndOfFile()) {
    inputFile.GetRecord();
    recordCount++;
}
```

Pop question: What is the name of the related checkstyle check?

---

# PUT INITIALIZATION CODE DIRECTLY BEFORE THE LOOP: CONTINUED

Answer: `VariableDeclarationUsageDistance`

Checks the distance between declaration of variable and its first usage.

```java
int num; // violation, distance = 4
final double PI; // OK, final variables not checked
System.out.println("Statement 1");
System.out.println("Statement 2");
System.out.println("Statement 3");
num = 1;
```

---

# USE `while(true)` FOR INFINITE LOOPS

Don't fake infinite loops with statements.

![Tuxedo Winnie the Pooh meme. The regular Pooh is next to 'for(int i = 1; i <= 999999; i+=1) {}'. The fancy Pooh is next to 'while(true) { ... }'.](image.png)

---

# DON'T USE A `for` LOOP WHEN A `while` LOOP IS MORE APPROPRIATE

Don't abuse `for` loop structure by cramming contents of a `while` loop.

## C++ Example of a `while` Loop Abusively Crammed into a `for` Loop Header

```cpp
// read all the records from a file
for (inputFile.MoveToStart(), recordCount = 0;
     !inputFile.EndOfFile();
     recordCount++ ) {
    inputFile.GetRecord();
}
```

Pop question: What is wrong here?

---

# DON'T USE A `for` LOOP WHEN A `while` LOOP IS MORE APPROPRIATE

## C++ Example of Logical if Unconventional Use of a `for` Loop Header

```cpp
recordCount = 0;
for (
    inputFile.MoveToStart();
    !inputFile.EndOfFile();
    inputFile.GetRecord()) {
        recordCount++;
}
```

Pop question: What is wrong in this one?

---

# DON'T USE A `for` LOOP WHEN A `while` LOOP IS MORE APPROPRIATE

## C++ Example of Appropriate Use of a `while` Loop

```cpp
// read all the records from a file
inputFile.MoveToStart();
recordCount = 0;
while (!inputFile.EndOfFile()) {
    inputFile.GetRecord();
    recordCount++;
}
```

---

# PROCESSING THE MIDDLE OF THE LOOP

*   Use `{` and `}` to enclose the statements in a loop
*   Avoid empty loops
*   Keep loop-housekeeping chores at either the beginning or the end of the loop
*   Make each loop perform only one function

---

# USE `{` AND `}` TO ENCLOSE THE STATEMENTS IN A LOOP

```java
do // violation, ''do' construct must use '{}'s.'
    ++count;
while (false);
```

```java
while (false);
```

```java
for (int j = 0; j < 10; j++);
```

```java
while (value.charAt(12) < 5);
```

Related check: `NeedBraces` (Review Week 11)

---

# AVOID EMPTY LOOPS

In some languages it is possible to create a empty loop.

## C++ Example of an Empty Loop

```cpp
while ( ( inputChar = dataFile.GetChar() ) != CharType_Eof ) { ;
}
```

however, it would be a lot more clearer following way

## C++ Example of an Empty Loop Converted to an Occupied Loop

```cpp
do {
    inputChar = dataFile.GetChar();
} while (inputChar != CharType_Eof);
```

Pop question: What is the name of the related check for this?

---

# AVOID EMPTY LOOPS: POP ANSWER

Could it be

![Ancient Aliens meme with Giorgio A. Tsoukalos, with the text "ALIENS".](image.png)

---

# AVOID EMPTY LOOPS: POP ANSWER

Answer: `EmptyBlock`

Each block should have at least one statement.

```java
for (int i = 0; i < 10; i++) { // violation 'Must have at least one statement'
}
```

---

# KEEP LOOP-HOUSEKEEPING AT THE BEGINNING OR THE END OF THE LOOP

Loop-housekeeping chores are expressions like `i=i+1` or `j++`

The housekeeping is done at the end of the loop in this example:

```cpp
nameCount = 0;
totalLength = 0;
while (!inputFile.EndOfFile()) {
    // do the work of the loop
    inputFile >> inputString;
    names[ nameCount ] = inputString;
    ...
    // prepare for next pass through the loop--housekeeping
    nameCount++;
    totalLength = totalLength + inputString.length();
}
```

---

# MAKE EACH LOOP PERFORM ONLY ONE FUNCTION

![Steven Crowder "Change My Mind" meme. The sign says "Single loop can be used to do two things at once. CHANGE MY MIND".](image.png)

---

# MAKE EACH LOOP PERFORM ONLY ONE FUNCTION

"Single loop can be used to do two things at once" isn't sufficient justification for doing them together.

Some for properly separated loops:

```python
# Example: Separate loops for calculating square and cube of numbers
numbers = [1, 2, 3, 4, 5]

squares = []
for num in numbers: # Calculate squares
    squares.append(num ** 2)

cubes = []
for num in numbers: # Calculate cubes
    cubes.append(num ** 3)

print("Squares:", squares)
print("Cubes:", cubes)
```

---

# MAKE EACH LOOP PERFORM ONLY ONE FUNCTION: CONTINUED

Another example:

```java
...
for (int num : numbers) { // Separate loop for even numbers
    if (num % 2 == 0) {
        evenNumbers.add(num);
    }
}

for (int num : numbers) { // Separate loop for odd numbers
    if (num % 2 != 0) {
        oddNumbers.add(num);
    }
}
...
```

---

# EXITING THE LOOP

*   Assure yourself that the loop ends
*   Make loop-termination conditions obvious
*   Don't monkey with the loop index to terminate the loop
*   Consider using safety counters
*   Exiting loops early
*   Consider using `break` statement rather than `boolean` flags
*   Be wary of `break` usage
*   Use `continue` statements at the top of a loop

---

# ASSURE YOURSELF THAT THE LOOP ENDS

![Meme of a character concentrating intensely with red psychic waves emanating from his head. Top text: "MENTALLY SIMULATE THE LOOP". Bottom text: "UNTIL YOU ARE CONFIDENT THAT IT ENDS".](image.png)

---

# Make loop-termination conditions obvious

## Count-Controlled Loops

Use a loop counter and ensure that it increments or decrements toward an endpoint. For example:

```java
// Example: Count-controlled loop that ends after 10 iterations
for (int i = 0; i < 10; i++) {
    // Loop body
}
```

---

# Make loop-termination conditions obvious: Continued 1

## Conditional Loops with Exit Conditions

Include explicit exit conditions based on the loop's purpose. Ensure that these conditions will eventually evaluate to false to exit the loop. For example:

```python
# Example: Conditional loop with an exit condition
while condition:
    if exit_condition_met:
        break # Exit the loop
    # Loop body
```

---

# Make loop-termination conditions obvious: Continued 2

## Looping Through Finite Data Structures

When iterating over collections, arrays, or files, verify that the loop logic progresses through each item and doesn't get stuck in a repeating pattern. In this case it may be safer to use `foreach` style loop:

```java
// Example: Looping through an array
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    // Loop body
}
```

---

# Make loop-termination conditions obvious: Continued 3

## Avoiding Infinite Loops

Be cautious with conditions that might lead to infinite loops: such as conditions that never evaluate to false conditions dependent on external factors that may not change.

Always have a clear termination strategy. For example:

```python
# Example: Avoiding an infinite loop with proper condition handling
while True:
    if termination_condition_met:
        break # Exit the loop
    # Loop body
```

---

# Make loop-termination conditions obvious: Continued 4

## Testing Edge Cases and Boundaries

Test the loop with edge cases and boundary values to ensure it behaves as expected in extreme scenarios. This helps uncover potential issues with loop termination. For example:

```java
// Example: Testing loop with boundary values
for (int i = 1; i <= maxValue; i++) {
    // Loop body
}
```

---

# DON'T MONKEY WITH THE LOOP INDEX TO TERMINATE THE LOOP

![Meme of three orangutans at a news desk. One says "I INCREMENTED LOOP INDEX". Another says "LOL I SET IT OUT OF RANGE".](image.png)

---

# DON'T MONKEY WITH THE LOOP INDEX TO TERMINATE THE LOOP

Do not manipulate the value of a `for` loop index to make the loop terminate early.

## Java Example of Monkeying with a Loop Index

```java
for (int i = 0; i < 100; i++) {
    // some code
    ...
    if ( ... ) {
        i = 100; // Here is the monkeying.
    }
    // more code
    ...
}
```

Pop question: What checkstyle check is used for this purpose?

---

# DON'T MONKEY WITH THE LOOP INDEX TO TERMINATE THE LOOP: CONTINUED

Answer: `ModifiedControlVariable`

Checks that `for` loop control variables are not modified inside the `for` block. An example is:

```java
for (int i = 0; i < 1; i++) {
    i++; // violation
}
```

---

# CONSIDER USING SAFETY COUNTERS

A safety counter is a variable you increment each pass through a loop to determine whether a loop has been executed too many times.

## C++ Example of Using a Safety Counter

```cpp
safetyCounter = 0;
do {
    node = node->Next;
    ...
    safetyCounter++;
    if ( safetyCounter >= SAFETY_LIMIT ) {
        Assert( false, "Internal Error: Safety-Counter Violation." );
    }
    ...
} while ( node->Next != NULL );
```

---

# EXITING LOOPS EARLY: `break`

![Skeleton sitting on a bench meme with the caption "FORGOT TO BREAK".](image.png)

```python
# Example: Avoiding an infinite loop with proper condition handling
while True:
    if termination_condition_met:
        break # Exit the loop
    # Loop body
```

The `break` statement (or equivalent) causes a loop to terminate through the normal exit channel; the program resumes execution at the first statement following the loop.

---

# EXITING LOOPS EARLY: `continue`

The `continue` statement is similar to `break` in that it's an auxiliary loop-control statement.

```java
// Example: Looping through an array
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    if (num % 2 == 0) {
        continue
    }
}
```

---

# CONSIDER USING `break` STATEMENT RATHER THAN `boolean` FLAGS

```java
int i = 0;
boolean exitLoop = false;
while (!exitLoop) {
    System.out.println("Processing element: " + i);
    if (i >= 5 || i % 2 == 0) {
        exitLoop = true; // Set flag to exit loop
    }
    i++; // Increment loop variable
}
```

instead this would be safer and easier to read:

```java
int i = 0;
while (true) {
    System.out.println("Processing element: " + i);
    if (i >= 5) {
        break; // Exit loop if condition 1 is met
    }
    if (i % 2 == 0) {
        break; // Exit loop if condition 2 is met
    }
    i++; // Increment loop variable
}
```

---

# BE WARY OF `break` USAGE

![Buzz Lightyear "X, X Everywhere" meme. Top text: "BREAK'S". Bottom text: "BREAKS EVERYWHERE".](image.png)

---

# BE WARY OF `break` USAGE

A loop's containing a lot of breaks can indicate unclear thinking about the structure of the loop or its role in the surrounding code.

```java
// Example: Loop with multiple breaks indicating unclear structure
for (int i = 0; i < 10; i++) {
    if (i == 2) {
        System.out.println("Processing element 2");
        break; // First break
    }
    if (i == 5) {
        System.out.println("Processing element 5");
    } else {
        if (i == 8) {
            System.out.println("Processing element 8");
            break; // Third break
        }
    }
...
}
```

https://stackoverflow.com/questions/18670038/how-to-exit-nested-loops

---

# USE `continue` STATEMENTS AT THE TOP OF A LOOP

## Pseudocode Example of a Relatively Safe Use of `continue`

```
while ( not eof( file ) ) do
    read( record, file )
    if ( record.Type <> targetType ) then
        continue
    -- process record of targetType
    ...
end while
```

https://stackoverflow.com/questions/25926774/why-use-continue-statement-when-i-can-modify-if-condition

---

# USE `continue` STATEMENTS AT THE TOP OF A LOOP: CONTINUED

```
while ( not eof( file ) ) do
    ...
    if ( record.Type <> targetType ) then
        continue
    -- process record of targetType
    ...
end while
```

If the `continue` occurs toward the middle or end of the loop, use an `if` instead.

```
while ( not eof( file ) ) do
    read( record, file )
    if ( record.Type = targetType ) then
        -- process record of targetType
        ...
    end if
end while
```

https://softwareengineering.stackexchange.com/questions/434124/are-there-any-problems-with-using-continue-or-break

---

# Using Loop Variables

*   Use meaningful variable names
*   Limit the scope of loop-index variables

---

# USE MEANINGFUL VARIABLE NAMES

## Java Example of Bad Loop Variable Names

```java
for ( int i = 0; i < numPayCodes; i++ ) {
    for ( int j = 0; j < 12; j++ ) {
        for ( int k = 0; k < numDivisions; k++ ) {
            sum = sum + transaction[j][i][k];
        }
    }
}
```

Very difficult to interpret intentions of the code block.

Almost impossible to understand without checking data input or calculation logic through some kind of documentation.

---

# USE MEANINGFUL VARIABLE NAMES

## Java Example of Good Loop Variable Names

```java
for ( int payCodeIdx = 0; payCodeIdx < numPayCodes; payCodeIdx++ ) {
    for (int month = 0; month < 12; month++ ) {
        for ( int divisionIdx = 0;
              divisionIdx < numDivisions;
              divisionIdx++ ) {
            sum = sum + transaction[month][payCodeIdx][divisionIdx];
        }
    }
}
```

---

# LIMIT THE SCOPE OF LOOP-INDEX VARIABLES TO THE LOOP ITSELF

Other uses of loop indexes outside their scope is a significant problem.

## C++ Example of Declaring a Loop-Index Variable Within a `for` loop

```cpp
for ( int recordCount = 0; recordCount < MAX_RECORDS; recordCount++ ) {
    // looping code that uses recordCount
}
```

The variable `recordCount` should not be used outside the loop and should be re-used in another loop if necessary.

---

# LIMIT THE SCOPE OF LOOP-INDEX VARIABLES TO THE LOOP ITSELF: CONTINUED

## C++ Example of Declaring Loop-Indexes Within `for` loops and Reusing Them Safely— Maybe!

```cpp
for ( int recordCount = 0; recordCount < MAX_RECORDS; recordCount++ ) {
    // looping code that uses recordCount
}

// intervening code

for ( int recordCount = 0; recordCount < MAX_RECORDS; recordCount++ ) {
    // additional looping code that uses a different recordCount
}
```

---

# HOW LONG SHOULD A LOOP BE?

*   Make your loops short enough to view all at once:
*   Limit nesting to three levels: According to research (Yourdon 1986a), programmers ability to comprehends deteriorates beyond this point.
*   Move loop innards of long loops into routines: If loop is getting longer or getting nested, it would be better to move parts of it into a routine.

---

# HOW LONG SHOULD A LOOP BE?: CONTINUED

Should be viewable in a regular monitor therefore, it should be around 50 lines long.

![Screenshot of IntelliJ IDEA IDE showing a Java class with a main method containing a switch statement. The code is well under 50 lines.](image.png)

**OCR Text from Image:**
```java
package edu.yasar.se3314;

/**
 * Hello world!
 */
public class App {

    public static void main(String[] args) {
        GearType t1 = GearType.Automatic;

        GearType gearType = t1;
        switch (gearType) {
            case Automatic:
                System.out.println("Gear type is automatic");
                break;
            case Manual:
                System.out.println("Gear type is manual.");
                break;
            default:
                break;
        }
    }
}
```

---

# HOW LONG SHOULD A LOOP BE?: CONTINUED

According to research (Yourdon 1986a), programmers ability to comprehends deteriorates beyond this point.

```java
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        for (int k = 0; k < matrix[i][j].length; k++) {
            for (int l = 0; l < matrix[i][j][k].length; l++) {
                System.out.println(
                    "Element at index ("
                    + i + ", " + j + ", " + k
                    + ", " + l + "): "
                    + matrix[i][j][k][l]);
            }
        }
    }
}
```

---

# HOW LONG SHOULD A LOOP BE?: CONTINUED

If loop is getting longer or getting nested, it would be better to move parts of it into a routine.

```java
for ( int payCodeIdx = 0; payCodeIdx < numPayCodes; payCodeIdx++ ) {
    for (int month = 0; month < 12; month++ ) {
        for ( int divisionIdx = 0;
              divisionIdx < numDivisions;
              divisionIdx++ ) {
            sum = sum + transaction[month][payCodeIdx][divisionIdx];
        }
    }
}
```

---

# HOW LONG SHOULD A LOOP BE?: CONTINUED

It could have been split to a separate routine.

```java
public double process(transactionMonthByPayCode) {
    double sum = 0;
    for ( int divisionIdx = 0;
          divisionIdx < numDivisions;
          divisionIdx++ ) {
        sum = sum + transactionMonthByPayCode[divisionIdx];
    }
    return sum;
}

for ( int payCodeIdx = 0; payCodeIdx < numPayCodes; payCodeIdx++ ) {
    for (int month = 0; month < 12; month++ ) {
        process(transaction[month][payCodeIdx])
    }
}
```

---

End of Week 12

Thanks for listening