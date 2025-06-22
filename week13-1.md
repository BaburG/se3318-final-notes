# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# USING CONDITIONALS

---

# USING CONDITIONALS

*   Plain `if-then` Statements
*   Chains of `if-then` Statements
*   `case` Statements

---

# Plain `if-then` Statements

*   Write the nominal path first; then write the unusual cases
*   Make sure that you branch correctly on equality
*   Check the normal case first in `if` rather than after in the `else`
*   Follow the `if` clause with a meaningful statement

---

# WRITE THE NOMINAL PATH FIRST; THEN WRITE THE UNUSUAL CASES

```java
public class OrderProcessor {
    public double calculateTotalPrice(List<Item> items) {
        double totalPrice = 0; // Nominal path

        for each item for (Item item : items) {
            totalPrice += item.getPrice();
        }

        if (items.size() > 5) { // Unusual case: Apply a discount for large orders
            totalPrice *= 0.9; // Apply a 10% discount for large orders
        }

        return totalPrice;
    }
}
```

---

# MAKE SURE THAT YOU BRANCH CORRECTLY ON EQUALITY

```java
// Checking if a value is within the specified range
if ((value > lowerbound || value == lowerBound) &&
    (value < upperBound || value == upperBound)) {
    System.out.println(
        value + " is within the range [" + lowerBound + ", " + upperBound + "]");
} else {
    System.out.println(
        value + " is outside the range [" + lowerBound + ", " + upperBound + "]");
}
```

instead, it should be

```java
// Checking if a value is within the specified range
if (value >= lowerBound && value <= upperBound) {
    System.out.println(
        value + " is within the range [" + lowerBound + ", " + upperBound + "]");
} else {
    System.out.println(
        value + " is outside the range [" + lowerBound + ", " + upperBound + "]");
}
```

---

# CHECK THE NORMAL CASE FIRST IN `if` RATHER THAN AFTER IN THE `else`

A **nominal case** is a normal working behavior. An **error case** is an exceptional case. Below example processes errors haphazardly.

```vb
OpenFile( inputFile, status )
If ( status = Status_Error ) Then
    errorType = FileOpenError // Error case
Else
    ReadFile( inputFile, fileData, status ) // Nominal case
    If ( status = Status_Success ) Then
        SummarizeFileData( fileData, summaryData, status ) // Nominal case
        If ( status = Status_Error ) Then
            errorType = ErrorType_DataSummaryError // Error case
        Else
            PrintSummary( summaryData ) // Nominal case
            SaveSummaryData( summaryData, status )
            If ( status = Status_Error ) Then
                errorType = ErrorType_SummarySaveError // Error case
            ...
```

---

# Visual Basic Example of Code That Processes a Lot of Errors Systematically

```vb
OpenFile( inputFile, status )
If ( status = Status_Success ) Then
    ReadFile( inputFile, fileData, status ) // Nominal case
    If ( status = Status_Success ) Then
        SummarizeFileData( fileData, summaryData, status ) // Nominal case
        If ( status = Status_Success ) Then
            PrintSummary( summaryData ) // Nominal case
            SaveSummaryData( summaryData, status )
            If ( status = Status_Success ) Then
                UpdateAllAccounts() // Nominal case
                EraseUndoFile()
                errorType = ErrorType_None
            Else
                errorType = ErrorType_SummarySaveError // Error case
            ...
```

The revision puts the focus on reading the **main flow** rather than on wading through the exceptional cases, so the code is easier to read overall. (Related checks: `NestedIfDepth`)

---

# NestedIfDepth

Nested if depth can be adjusted using checkstyle checks to prevent overcomplicated conditional blocks.

```xml
<module name="NestedIfDepth">
    <property name="max" value="3"></property>
</module>
```

```java
if (true) {
    if (true) {} // OK
    else {}
}
```

```java
if (true) {
    if (true) {
        if (true) { // violation, nested if-else depth is 2 (max allowed is 1)
        }
    }
}
```

---

# FOLLOW THE `if` CLAUSE WITH A MEANINGFUL STATEMENT

## Java Example of a Null `if` Clause

```java
if ( SomeTest );
else {
    // do something
}
```

## Java Example of a Converted Null `if` Clause

```java
if ( ! someTest ) {
    // do something
}
```

Related checks: `EmptyStatement`, `NeedBraces`, `EmptyBlock`, `AvoidInlineConditionals`.

---

# EmptyStatement

Detects empty statements (standalone "`;`" semicolon). Empty statements often introduce bugs that are hard to spot.

```java
public class Example1 {
    public void foo() {
        int i = 5;
        if(i > 3); // violation
        i++;
        for (i = 0; i < 5; i++); // violation
        i++;
        while (i > 10)
            i++; // OK
    }
}
```

---

# NeedBraces

Checks for braces around code blocks.

```java
if (obj.equals(num)) return true;
// violation above, 'if' construct must use '{}'s.
if (true) {
    count = 2;
} else
// violation above, 'else' construct must use '{}'s.
    return false;
```

```java
do // violation, 'do' construct must use '{}'s.
    ++count;
while (false);
for (int j = 0; j < 10; j++);
// violation above, 'for' construct must use '{}'s.
for(int i = 0; i < 10; value.charAt(12));
// violation above, 'for' construct must use '{}'s.
while (counter < 10)
// violation above, 'while' construct must use '{}'s.
    ++count;
while (value.charAt(12) < 5);
// violation above, 'while' construct must use '{}'s.
```

---

# EmptyBlock

Checks for empty blocks.

```java
private void emptyBlock() {
    if ( SomeTest ) { //violation
    } else {
        // do something
    }
    for (int i = 0; i < 10; i++) { // violation 'Must have at least one statement'
    }
    try { // violation 'Must have at least one statement'
    } catch (Exception e) {
        // ignored
    }
}
```

---

# AvoidInlineConditionals

Detects inline conditionals. Inline conditionals may become hard to read, so usually coding standards forbid them.

```java
String a = getParameter("a");
String b = (a==null || a.length()<1) ? null : a.substring(1);
```

```java
int x = 5;
boolean foobar = (x == 5); // OK

String text;
text = (text == null) ? "" : text; // violation

String b;
if (a != null && a.length() >= 1) { // OK
    b = a.substring(1);
} else {
    b = null;
}

b = (a != null && a.length() >= 1) ? a.substring(1) : null; // violation
```

---

# Chains of `if-then-else` Statements

*   Using an `if-then-else` Chain
*   Simplify complicated tests with boolean function calls
*   Put the most common cases first
*   Make sure that all cases are covered

---

# USING AN IF-THEN-ELSE CHAIN

```cpp
if ( inputCharacter < SPACE ) {
    characterType = CharacterType_ControlCharacter;
}
else if (
    inputCharacter == '.' ||
    inputCharacter == ',' ||
    inputCharacter == '!' ||
    inputCharacter == '(' ||
    inputCharacter == ')' ||
    inputCharacter == ':' ||
    inputCharacter == ';' ||
    inputCharacter == '?' ||
    inputCharacter == '-' ) {
        characterType = CharacterType_Punctuation;
        ...
}
```

Related checks: `BooleanExpressionComplexity`, `SimplifyBooleanExpression`

---

# BooleanExpressionComplexity

Restricts the number of boolean operators (`&&`, `||`, `&`, `|` and `^`) in an expression. Too many conditions leads to code that is difficult to read and hence debug and maintain.

```java
public class Example1 {
    public static void main(String ... args){
        boolean a = true;
        boolean b = false;

        boolean c = (a & b) | (b ^ a); // OK, 1(&) + 1(|) + 1(^) = 3 (max 3)
        boolean d = (a & b) | (b ^ a) | (a ^ b);
        // violation above, 'Boolean expression complexity is 5 (max 3)'
        // 1(&) + 1(|) + 1(^) + 1(|) + 1(^) = 5
        boolean e = a ^ (a || b) ^ (b || a) & (a | b);
        // violation above, 'Boolean expression complexity is 6 (max 3)'
        // 1(^) + 1(||) + 1(^) + 1(||) + 1(&) + 1(|) = 6
    }
}
```

---

# SimplifyBooleanExpression

Checks for over-complicated boolean expressions. Currently, it finds code like `if (b == true)`, `b || true`, `!false`, `boolean a = q > 12 ? true : false`, etc.

```java
if (a == true) {};       // violation, can be simplified to a
if (a == b) {};          // OK
if (a == false) {};      // violation, can be simplified to !a
if (!(a != true)) {};    // violation, can be simplified to a

e = (a || b) ? c : d;    // OK
e = (a || false) ? c : d; // violation, can be simplified to a
e = (a && b) ? c : d;    // OK

int s = 12;
boolean m = s > 1 ? true : false; // violation, can be simplified to s > 1
boolean f = c == null ? false : c.someMethod(); // OK
```

---

# SIMPLIFY COMPLICATED TESTS WITH BOOLEAN FUNCTION CALLS

Dividing checks into functions would simplify the boolean conditions.

```cpp
if ( IsControl( inputCharacter ) ) {
    characterType = CharacterType_ControlCharacter;
} else if ( IsPunctuation( inputCharacter ) ) {
    characterType = CharacterType_Punctuation;
} else if ( IsDigit( inputCharacter ) ) {
    characterType = CharacterType_Digit;
} else if ( IsLetter( inputCharacter ) ) {
    characterType = CharacterType_Letter;
}
```

---

# SimplifyBooleanReturn

Checks for over-complicated boolean return statements.

```java
if (valid())
    return false;
else
    return true;
```

could be written as

```java
return !valid();
```

---

# SimplifyBooleanReturn: CONTINUED

```java
public boolean check1() {
    if (cond) { // violation, can be simplified
        return true;
    }
    else {
        return false;
    }
}
```

instead, it could be written as given below

```java
// Ok, simplified version of check1()
public boolean check1_better() {
    return cond;
}
```

---

# SimplifyBooleanReturn: CONTINUED

```java
// violations, can be simplified
public boolean check3() {
    if (cond == true) { // can be simplified to "if (cond)"
        return false;
    }
    else {
        return true; // can be simplified to "return !cond"
    }
}
```

instead, it could be written as given below,

```java
public boolean check3() {
    if (cond) { // can be simplified to "if (cond)"
        return !cond;
    }
}
```

---

# SimplifyBooleanReturn: CONTINUED

```java
// Ok, can be simplified but doesn't return a Boolean
public Foo choose1() {
    if (cond) {
        return a;
    }
    else {
        return b;
    }
}
```

it could have been simplified as given below,

```java
// Ok, simplified version of choose1()
public Foo choose1_better() {
    return cond ? a: b;
}
```

---

# PUT THE MOST COMMON CASES FIRST

Minimize the amount of exception-case handling code someone has to read to find the usual cases.

```cpp
if ( IsLetter( inputCharacter ) ) { // most common, done first
    characterType = CharacterType_Letter;
} else if ( IsPunctuation( inputCharacter ) ) {
    characterType = CharacterType_Punctuation;
} else if ( IsDigit( inputCharacter ) ) {
    characterType = CharacterType_Digit;
} else if ( IsControl( inputCharacter ) ) { // least common, done last.
    characterType = CharacterType_ControlCharacter;
}
```

---

# MAKE SURE THAT ALL CASES ARE COVERED

Code a final `else` clause with an error message or assertion to catch cases you didn't plan for.

```cpp
if ( IsLetter( inputCharacter ) ) {
    characterType = CharacterType_Letter;
} else if ( IsPunctuation( inputCharacter ) ) {
    characterType = CharacterType_Punctuation;
} else if ( IsDigit( inputCharacter ) ) {
    characterType = CharacterType_Digit;
} else if ( IsControl( inputCharacter ) ) {
    characterType = CharacterType_ControlCharacter;
} else {
    DisplayInternalError( "Unexpected type of character detected." );
}
```

---

# `case` Statements

*   Replace `if-then-else` chains with other constructs
*   Choosing the most effective ordering of Cases
*   Don't make up phony variables to be able to use the `case` statement
*   Use the `default` clause only to detect legitimate defaults
*   Clearly and unmistakably identify flow-throughs at the end of a `case` statement

---

# REPLACE IF-THEN-ELSE CHAINS WITH OTHER CONSTRUCTS

Some languages provide `case` statements.

```vb
Select Case inputCharacter
    Case "a" To "z"
        characterType = CharacterType_Letter
    Case ".", ",", "!", "(", ")", ":", ";", "?", "-"
        characterType = CharacterType_Punctuation
    Case "0" To "9"
        characterType = CharacterType_Digit
    Case FIRST_CONTROL_CHARACTER To LAST_CONTROL_CHARACTER
        characterType = CharacterType_Control
    Case Else
        DisplayInternalError( "Unexpected type of character detected." )
End Select
```

---

# SWITCH EXPRESSIONS AND EXHAUSTIVENESS

No `default` case put here because switch expression is exhaustive enough (but we are going to enforce it anyway in further slides)

```java
enum Status { ACTIVE, INACTIVE }

String result = switch (status) {
    case ACTIVE -> "Active status";
    case INACTIVE -> "Inactive status";
    //
};
```

---

# SWITCH EXPRESSIONS AND EXHAUSTIVENESS: CONTINUED

There may be wide variety of errors or responses...

```java
switch (responseCode) {
    case HttpURLConnection.HTTP_OK:
        System.out.println("HTTP Response Code: 200 (OK)");
        break;
    case HttpURLConnection.HTTP_NOT_FOUND:
        System.out.println("HTTP Response Code: 404 (Not Found)");
        break;
    case HttpURLConnection.HTTP_INTERNAL_ERROR:
        System.out.println("HTTP Response Code: 500 (Internal Server Error)");
        break;
    default:
        System.out.println("HTTP Response Code: " + responseCode);
        break;
}
```

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: ALPHABETICALLY

Order cases alphabetically or numerically: If cases are equally important, putting them in alphabetic order improves readability.

```java
switch (fruit) {
    case "Apple":
        System.out.println("Selected Apple");
        break;
    case "Banana":
        System.out.println("Selected Banana");
        break;
    case "Cherry":
        System.out.println("Selected Cherry");
        break;
    default:
        System.out.println("Unknown fruit");
        break;
}
```

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: NUMERICALLY

```java
switch (number) {
    case 1:
        System.out.println("Number is 1");
        break;
    case 2:
        System.out.println("Number is 2");
        break;
    case 3:
        System.out.println("Number is 3");
        break;
    default:
        System.out.println("Number is not 1, 2, or 3");
        break;
}
```

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: NORMAL CASE FIRST

```java
switch (role) {
    case "admin":
        System.out.println("Admin privileges granted.");
        break;
    case "manager":
        System.out.println("Manager privileges granted.");
        break;
    case "employee":
        System.out.println("Employee privileges granted.");
        break;
    default:
        System.out.println("Unknown role.");
        break;
}
```

Pop Question: Does this ordering violate any rules?

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: NORMAL CASE FIRST

```java
switch (role) {
    case "admin":
        System.out.println("Admin privileges granted.");
        break;
    case "manager":
        System.out.println("Manager privileges granted.");
        break;
    case "employee":
        System.out.println("Employee privileges granted.");
        break;
    default:
        System.out.println("Unknown role.");
        break;
}
```

It is violating the alphabetic ordering of cases, however, this case is somewhat special. Because, cases are not equally important!

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: KEEP CASES SIMPLE

```java
switch(inputCharacter) {
    case '.':
    case ',':
    case '!':
    case '(':
    case ')':
    case ':':
    case ';':
    case '?':
    case '-':
        characterType = CharacterType.PUNCTUATION;
        break;
    ...
}
```

Pop question: Is this a good way of keeping case statements simple? What else could be done?

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: KEEP CASES SIMPLE

```java
switch(inputCharacter) {
    case '.':
    case ',':
    case '!':
    case '(':
    case ')':
    case ':':
    case ';':
    case '?':
    case '-':
        characterType = CharacterType.PUNCTUATION;
        break;
    ...
}
```

Actually, not much. Because, it is using fall through. (There are special cases...)

---

# CHOOSING THE MOST EFFECTIVE ORDERING OF CASES: KEEP CASES SIMPLE : ALTERNATIVES

```java
Set<Character> punctuationSet = Set.of(
    '.', ',', '!', '(', ')', ':', ';', '?', '-');

if (punctuationSet.contains(inputCharacter)) {
    characterType = CharacterType.PUNCTUATION;
}
```

or

```java
String punctuationPattern = "[.,!()\\[\\]:;?-]"; // Regular expression pattern
if (Pattern.matches(punctuationPattern, Character.toString(inputCharacter))) {
    ...
}
```

What is the disadvantage of the second one?

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE

## Java Example of Creating a Phony `case` Variable—Bad Practice

```java
switch ( action ) {
    case 'c':
        Copy();
        break;
    case 'd':
        DeleteCharacter();
        break;
    case 'f':
        Format();
        break;
    default:
        HandleUserInputError( ErrorType.InvalidUserCommand );
}
```

Pop question: What to do instead?

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: `if-else` CHAIN

## Using `if-then-else` Instead of a Phony `case` Variable—Good Practice

```java
if ( UserCommand.equals( COMMAND_STRING_COPY ) ) {
    Copy();
} else if ( UserCommand.equals( COMMAND_STRING_DELETE ) ) {
    DeleteCharacter();
} else if ( UserCommand.equals( COMMAND_STRING_FORMAT ) ) {
    Format();
} else if ( UserCommand.equals( COMMAND_STRING_HELP ) ) {
    Help();
}
...
else {
    HandleUserInputError( ErrorType_InvalidCommandInput );
}
```

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: ENUM TYPES

```java
public enum GearType {
    Automatic("Automatic"), Manual("Manual");

    private String type;
    GearType(String _type) {
        type = _type;
    }

    @Override
    public String toString() {
        return type;
    }
}
```

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: ENUM TYPES

```java
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
```

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: INTERFACE AS TYPES

```java
public enum MyClassType {
    CLASSA, CLASSB
}
```

```java
public interface Discoverable {
    public MyClassType getType();
}
```

```java
public class ClassA implements Discoverable {
    private MyClassType type = MyClassType.CLASSA;
    public MyClassType getType() {
        return type;
    }
}
```

```java
public class ClassB implements Discoverable {
    private MyClassType type = MyClassType.CLASSB;
    public MyClassType getType() {
        return this.type;
    }
}
```

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: INTERFACE AS TYPES

```java
public static void main(String[] args) {
    Discoverable a = new ClassA();
    Discoverable b = new ClassB();

    switch (a.getType()) {
        case CLASSA:
            System.out.println("class a");
            break;
        case CLASSB:
            System.out.println("class b");
            break;
    }
}
```

Pop question: Do you think using switch-case to separate functionality feasible?

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: INTERFACE AS TYPES

Answer: If you are aiming to realize an operation based on the type of the class. Then it is not a feasible approach. Because it betrays polymorphism!

```java
public interface Discoverable {
    public void doWork();
}
```

```java
public class ClassA implements Discoverable {
    public void doWork() {
        System.out.println("class a");
    }
}
```

```java
public class ClassB implements Discoverable {
    public void doWork() {
        System.out.println("class b");
    }
}
```

---

# DON'T MAKE UP PHONY VARIABLES JUST TO USE SWITCH-CASE: INTERFACE AS TYPES

Then you can just call the method `doWork` and let the decision made by Java.

```java
public static void main(String[] args) {
    Discoverable a = new ClassA();
    Discoverable b = new ClassB();
    a.doWork();
}
```

It is important to use language features. Especially, Polymorphism is a strong one in OOP.

---

# USE THE DEFAULT CLAUSE ONLY TO DETECT LEGITIMATE DEFAULTS

automatic documentation provided by case-statement labels

```java
default:
    System.out.println("Unknown fruit");
    break;
```

```java
default:
    System.out.println("Unknown role.");
    break;
```

the ability to detect errors with the default clause.

```java
default:
    HandleUserInputError( ErrorType.InvalidUserCommand );
```

---

# DefaultComesLast

Check that the `default` is after all the cases in a `switch` statement.

```java
switch (i) {
    case 1:
        break;
    case 2:
        break;
    default: // OK
        break;
}
```

```java
switch (i) {
    case 1:
        break;
    case 2:
        break; // OK, no default
}
```

---

# DefaultComesLast: CONTINUED

Java allows `default` anywhere within the `switch` statement. But it is more readable if it comes after the last `case`.

```java
switch (i) {
    case 1:
        break;
    default: // violation, 'default' before 'case'
        break;
    case 2:
        break;
}
```

---

# MissingSwitchDefault

Checks that `switch` statement has a `default` clause.

```java
switch (i) { // violation
    case 1:
        break;
    case 2:
        break;
}
```

---

# CLEARLY AND UNMISTAKABLY IDENTIFY FLOW-THROUGHS AT THE END OF A `case` STATEMENT

```java
switch (i) {
    case 1:
        i++;
    case 2: // violation 'Fall through from previous branch of the switch'
        i++;
        break;
}
```

For an intentional drop through at the end of a `case`, clearly comment the place at which it happens and explain why.

```java
switch (i) {
    case 1:
        i++; //falls through, necessary to increase i by one.
    case 2: // no violation here
        i++;
        break;
}
```

---

# FallsThrough

Checks for fall-through in `switch` statements. Finds locations where a `case` contains Java code but lacks a `break`, `return`, `yield`, `throw` or `continue` statement.

The check honors special comments to suppress the warning. 👌 By default, the texts:

*   `fallthru`, `fall thru`, `fall-thru`, `fallthrough`, `fall through`, `fall-through`, `fallsthrough`, `falls through`, `falls-through` (case-sensitive).

---

# FallsThrough

```java
switch (i) {
    case 1:
        i++;
    case 2: // violation 'Fall through from previous branch of the switch'
        i++;
        break;
}
```

Below, a special comment added to allow fall through.

```java
switch (i) {
    case 1:
        i++; //falls through
    case 2: // no violation here
        i++;
        break;
}
```

---

End of Week 13

Thanks for listening.