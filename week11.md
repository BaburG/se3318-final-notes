# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# GENERAL ISSUES IN USING VARIABLES

---

# GENERAL ISSUES IN USING VARIABLES

*   Making Variable Declarations
*   Guidelines for Initializing Variables
*   Scope
*   Using each Variable for Exactly One Purpose

---

# MAKING VARIABLE DECLARATIONS

*   Use naming conventions

---

# GENERAL ISSUES IN USING VARIABLES: CHECKS

*   `MemberName`
*   `LocalVariableName`
*   `StaticVariableName`
*   `LocalFinalVariableName`
*   `FinalLocalVariable`

---

# MemberName

Checks that instance variable names conform to a specified pattern.

```java
class Example1 {
    public int num1;
    protected int num2;
    final int num3 = 3;
    private int num4;
    static int num5;
    public static final int CONSTANT = 1;
    public int NUM1; // violation
    protected int NUM2; // violation
    int NUM3; // violation
    private int NUM4; // violation
}
```

---

# MemberName: DETAILS

It is also possible set multiple `MemberName` checks that validate format for public, protected, private and package level.

```xml
<module name="Checker">
    <module name="TreeWalker">
        <module name="MemberName">
            <property name="format" value="^m[A-Z][a-zA-Z0-9]*$"></property>
            <property name="applyToProtected" value="false"></property>
            <property name="applyToPackage" value="false"></property>
        </module>
    </module>
</module>
```

---

# LocalVariableName

Checks that local, non-final variable names conform to a specified pattern. A catch parameter is considered to be a local variable.

```java
class Example1 {
    void MyMethod() {
        for (int var = 1; var < 10; var++) {}
        for (int VAR = 1; VAR < 10; VAR++) { } // violation
        for (int i = 1; i < 10; i++) {}
        for (int var_1 = 0; var_1 < 10; var_1++) { } // violation
    }
}
```

```java
class Example3 {
    void myMethod () {
        for(int i = 1; i < 10; i++) {}
        for(int K = 1; K < 10; K++) {} // violation
        List list = new ArrayList();
        for (Object o : list) {}
        for (Object O : list) {} // violation
    }
}
```

> Remember `MethodTypeParameterName` from last week.

---

---

# LocalVariableName: DETAILS

```xml
<module name="Checker">
    <module name="TreeWalker">
        <module name="LocalVariableName">
            <property name="format" value="^[a-z](_?[a-zA-Z0-9]+)*$"></property>
        </module>
    </module>
</module>
```

```java
class Example2 {
    void MyMethod() {
        for (int var = 1; var < 10; var++) {}
        for (int VAR = 1; VAR < 10; VAR++) { } // violation
        for (int i = 1; i < 10; i++) {}
        for (int var_1 = 0; var_1 < 10; var_1++) {}
    }
}
```

---

# StaticVariableName

Checks that static, non-final variable names conform to a specified pattern.

```java
class Example1 {
    public static int goodStatic = 2;
    private static int badStatic = 2;
    public static int ItStatic1 = 2; // violation, 'must match pattern'
    protected static int ItStatic2 = 2; // violation, 'must match pattern'
    private static int ItStatic = 2; // violation, 'must match pattern'
    public static int it_static = 2; // violation, 'must match pattern'
    public static int It_Static = 2; // violation, 'must match pattern'
    private static int It_Static1 = 2; // violation, 'must match pattern'
    static int It_Static2 = 2; // violation, 'must match pattern'
}
```

---

# StaticVariableName: DETAILS

```xml
<module name="Checker">
    <module name="TreeWalker">
        <module name="StaticVariableName">
            <property name="format" value="^[a-z](_?[a-zA-Z0-9]+)*$"></property>
            <property name="applyToPrivate" value="false"></property>
            <property name="applyToPackage" value="false"></property>
        </module>
    </module>
</module>
```

```java
class Example3 {
    public static int goodStatic = 2;
    private static int badStatic = 2;
    public static int ItStatic1 = 2; // violation, 'must match pattern'
    protected static int ItStatic2 = 2; // violation, 'must match pattern'
    private static int ItStatic = 2;
    public static int it_static = 2;
    public static int It_Static = 2; // violation, 'must match pattern'
    private static int It_Static1 = 2;
    static int It_Static2 = 2;
}
```

---

# LocalFinalVariableName

Checks that local final variable names conform to a specified pattern. A catch parameter and resources in try statements are considered to be a local, final variables.

```java
class Example1{
    void MyMethod() {
        try {
            final int VAR1 = 5; // violation
            final int var1 = 10;
        } catch (Exception ex) {
            final int VAR2 = 15; // violation
            final int var2 = 20;
        }
    }
}
```

---

# FinalLocalVariable

Checks that local variables that never have their values changed are declared `final`. The check can be configured to also check that unchanged parameters are declared final.

---

# FinalLocalVariable: DETAILS

```xml
<module name="Checker">
    <module name="TreeWalker">
        <module name="FinalLocalVariable">
            <property name="tokens" value="VARIABLE_DEF,PARAMETER_DEF"></property>
            <property name="validateEnhancedForLoopVariable" value="false"></property>
        </module>
    </module>
</module>
```

```java
public class MyClass {
    static int foo(int x, int y) { //violations, parameters should be final
        return x+y;
    }
    public static void main (String []args) { //violation, parameters should be final
        for (String i : args) {
            System.out.println(i);
        }
        int result=foo(1,2); // violation
    }
}
```

Check `FinalParameters` from last week.

---

# GENERAL ISSUES IN USING VARIABLES

*   Initialize each variable as it's declared
*   Initialize each variable close to where it's first used
*   Ideally, declare and define each variable close to where it's first used

---

# GENERAL ISSUES IN USING VARIABLES: CHECKS

*   `MultipleVariableDeclarations`
*   `ExplicitInitialization`

---

# MultipleVariableDeclarations

Checks that each variable declaration is in its own statement and on its own line as the Java code conventions chapter 6.1 recommends that declarations should be one per line/statement.

```java
public class Test {
    public void myTest() {
        int mid;
        int high;
        // ...
        int lower, higher; // violation
        // ...
        int value,
            index; // violation
        // ...
        int place = mid, number = high; // violation
    }
}
```

---

# ExplicitInitialization

Checks if variables initialized to default for its type value (`null` for object references, zero for numeric types and `char` and `false` for `boolean`).

```java
private int intField1 = 0; // violation
private int intField2 = 1;
private int intField3;
private char charField1 = '0'; // violation
private char charField2 = 'b';
private char charField3;
private boolean boolField1 = false; // violation
private boolean boolField2 = true;
private boolean boolField3;
```

```java
private Obj objField1 = null; // violation
private Obj objField2 = new Obj();
private Obj objField3;
private int arrField1[] = null; // violation
private int arrField2[] = new int[10];
private int arrField3[];
```

---

*   Initialize a class's member data in its constructor
*   Use the compiler setting (for older versions of Java) that automatically initializes all variables

See `ExplicitInitialization` check.

---

# SCOPE

*   Keep Variables “Live” for as Short a Time as Possible
*   Measuring the Live Time of a Variable
*   General Guidelines for Minimizing Scope

---

# SCOPE: LIFE OF A VARIABLE

Variable span is variable “live time,” the total number of statements over which a variable is live.

![A diagram illustrating variable live time. The left column shows code with short spans, where variables are declared close to where they are used. The middle column shows a long span, where a variable is live for many lines of code. The right column shows how breaking code into smaller blocks results in shorter live times for variables.](image.png)

---

# SCOPE: MEASURING THE LIVE TIME OF A VARIABLE

`live time = last referenced line - declared line + 1`

`average live time = sum of live time of all variables / # of variables`

---

```java
1  // initialize all variables
2  recordIndex = 0;
3  total = 0;
4  done = false;
...
26 while ( recordIndex < recordCount ) {
27   ...
28   recordIndex = recordIndex + 1; // Last reference to `recordIndex`
...
64 while(!done){
...
69   if ( total > projectedTotal ) { // Last reference to `total`
70     done = true; // Last reference to `done`
```

| Variable          | Calculation           | Value |
| ----------------- | --------------------- | ----- |
| recordIndex       | line 28 - line 2 + 1  | 27    |
| total             | line 69 - line 3 + 1  | 67    |
| done              | line 70 - line 4 + 1  | 67    |
| **Average Live Time** | (27 + 67 + 67)/3      | 54    |

---

```java
...
25 recordIndex = 0;
26 while(recordIndex < recordCount) {
27   ...
28   recordIndex = recordIndex + 1; // Last reference to `recordIndex`
...
62 total = 0;
63 done = false;
64 while(!done) {
...
69   if(total > projectedTotal) { // Last reference to `total`
70     done = true; // Last reference to `done`
```

| Variable          | Calculation           | Value |
| ----------------- | --------------------- | ----- |
| recordIndex       | line 28 - line 25 + 1 | 4     |
| total             | line 69 - line 62 + 1 | 8     |
| done              | line 70 - line 63 + 1 | 8     |
| **Average Live Time** | (4 + 8 + 8)/3         | 7     |

---

# GENERAL GUIDELINES FOR MINIMIZING SCOPE

*   Initialize variables used in a loop immediately before the loop rather than back at the beginning of the routine containing the loop. (Pop Question: Which guidelines on variables are related to this?)
*   Don't modify a control variable inside `for` loop. (`ModifiedControlVariable`)
*   Don't assign a value to a variable until just before the value is used (`VariableDeclarationUsageDistance`)
*   Group related statements

---

# ModifiedControlVariable

Checks that `for` loop control variables are not modified inside the `for` block.

```java
for (int i = 0; i < 1; i++) {
    i++; // violation
}
```

---

# VariableDeclarationUsageDistance

Checks the distance between declaration of variable and its first usage.

```java
public void foo() {
    int num; // violation, distance = 4
    final double PI; // OK, final variables not checked
    System.out.println("Statement 1");
    System.out.println("Statement 2");
    System.out.println("Statement 3");
    num = 1;
    PI = 3.14;
}
```

---

# GENERAL GUIDELINES FOR MINIMIZING SCOPE: GROUP RELATED STATEMENTS

## C++ Example of Using Two Sets of Variables in a Confusing Way

```cpp
void SummarizeData(...) {
    ...
    GetOldData( oldData, &numOldData );
    GetNewData( newData, &numNewData );
    totalOldData = Sum( oldData, numOldData );
    totalNewData = Sum( newData, numNewData );
    PrintOldDataSummary( oldData, totalOldData, numOldData );
    PrintNewDataSummary( newData, totalNewData, numNewData );
    SaveOldDataSummary( totalOldData, numOldData );
    SaveNewDataSummary( totalNewData, numNewData );
    ...
}
```

---

# GENERAL GUIDELINES FOR MINIMIZING SCOPE: GROUP RELATED STATEMENTS

## C++ Example of Using Two Sets of Variables More Understandably

```cpp
void SummarizeData( ... ) {
    GetOldData( oldData, &numOldData );
    totalOldData = Sum( oldData, numOldData );
    PrintOldDataSummary( oldData, totalOldData, numOldData );
    SaveOldDataSummary( totalOldData, numOldData );
    ...
    GetNewData( newData, &numNewData );
    totalNewData = Sum( newData, numNewData );
    PrintNewDataSummary( newData, totalNewData, numNewData );
    SaveNewDataSummary( totalNewData, numNewData );
    ...
}
```

---

# GENERAL GUIDELINES FOR MINIMIZING SCOPE: BREAK GROUPS OF RELATED STATEMENTS INTO SEPARATE ROUTINES

A variable in a shorter routine will tend to have **smaller span** and **live time** than a variable in a longer routine.

Pop question: Which checkstyle checks from earlier weeks are related to the statement above?

---

Begin with most restricted visibility, and expand the variable's scope only if necessary

*   Keep variables as local as possible.
*   Keep variables access as restricted as possible.

Related check: `VisibilityModifier`

---

# VisibilityModifier

Checks visibility of class members. Only `static final`, immutable or annotated by specified annotation members may be public; other class members must be private unless the property `protectedAllowed` or `packageAllowed` is set.

```java
private int myPrivateField1;
int field1; // violation, must have a visibility modifier 'must be private'
protected String field2; // violation, protected not allowed 'must be private'
public int field3 = 42; // violation, not final 'must be private'
public long serialVersionUID = 1L;
public static final int field4 = 42;
// 2 violations below, public immutable fields are not allowed 'must be private'
public final int field5 = 42;
public final java.lang.String notes = null;
// violation below, HashSet is mutable 'must be private'
public final Set<String> mySet1 = new HashSet<>();
// violations below, immutable type not in config 'must be private'
public final ImmutableSet<String> mySet2 = null;
public final ImmutableMap<String, Object> objects1 = null;
```

---

# USING EACH VARIABLE FOR EXACTLY ONE PURPOSE

*   Use each variable for one purpose only
*   Avoid variables with hidden meanings
*   Make sure that all declared variables are used

---

# Use each variable for one purpose only

## C++ Example of Using One Variable for Two Purposes—Bad Practice

```cpp
// Compute roots of a quadratic equation.
// This code assumes that (b*b-4*a*c) is positive. temp = Sqrt( b*b - 4*a*c );
root[0] = ( -b + temp ) / ( 2 * a );
root[1] = ( -b - temp ) / ( 2 * a );
...
// swap the roots
temp = root[0];
root[0] = root[1];
root[1] = temp;
```

**Question:** What is the relationship between `temp` in the first few lines and `temp` in the last few?

---

# Use each variable for one purpose only

## C++ Example of Using Two Variables for Two Purposes—Good Practice

```cpp
// Compute roots of a quadratic equation.
// This code assumes that (b*b-4*a*c) is positive. discriminant = Sqrt( b*b - 4*a*c );
root[0] = ( -b + discriminant ) / ( 2 * a ); root[1] = ( -b - discriminant ) / ( 2 * a );
...
// swap the roots
oldRoot = root[0];
root[0] = root[1];
root[1] = oldRoot;
```

---

# Avoid variables with hidden meanings

*   The value in the variable `pageCount` might represent the number of pages printed, unless it equals –1, in which case it indicates that an error has occurred. 👎
*   The variable `customerId` might represent a customer number, unless its value is greater than 500,000, in which case you subtract 500,000 to get the number of a delinquent account. 👎
*   The variable `bytesWritten` might be the number of bytes written to an output file, unless its value is negative, in which case it indicates the number of the disk drive used for the output. 👎

---

# Make sure that all declared variables are used

*   Get in the habit of checking to be sure that all variables that are declared are used. ☝️
*   Some compilers and utilities (such as lint) report unused variables as a warning. ☝️

Related check: `UnusedLocalVariable`

---

# UnusedLocalVariable

Checks that a local variable is declared and/or assigned, but not used.

---

End of Week 11

Thanks for listening