# SOFTWARE CONSTRUCTION
SE3318
Ali Mert Ceylan
SPRING 2024-2025

---

# HIGH QUALITY ROUTINES

---

# HIGH QUALITY ROUTINES
* Valid Reasons to Create a Routine
* Design at Routine Level
* Routine Names
* Routine Parameters

---

# VALID REASONS TO CREATE A ROUTINE
* Understandable Abstraction
* Avoid Duplicate Code
* Support Subclassing
* Improve Portability

---

# UNDERSTANDABLE ABSTRACTION

```
if (node <> NULL) then
  while (node.next <> NULL) do
    node = node.next
    leafName = node.name
  end while
else
  leafName = ""
end if
```

can be realized in single statement

```
leafName = GetLeafName(node)
```

---

# AVOID DUPLICATION & SUPPORT SUBCLASSING

![A diagram showing code refactoring. Two blocks of code with duplicated parts (represented by colored bars) are shown with red crosses over them. An arrow points to a new structure where the common code is moved into a parent class, and two child classes inherit from it, each containing their specific implementations.](image.png)

> Remember DesignForExtention!

---

# IMPROVE PORTABILITY
* Isolates non-portable capabilities
  * nonstandard language features
  * hardware dependencies
  * operating-system dependencies

---

# DESIGN AT ROUTINE LEVEL
* Functional Cohesion
* Sequential Cohesion
* Communicational Cohesion
* Temporal Cohesion
* Logical Cohesion

---

# FUNCTIONAL COHESION

When a routine performs one and only one operation.

![A diagram showing two code blocks. The first block, labeled 'dostuff(data)', contains a call to 'printReport(data)'. An arrow points to a second block, which is the implementation of 'printReport(data)'. Inside this implementation, there is a call to 'doPrintStuff...'. This illustrates that 'printReport' is doing more than just printing.](image.png)

**OCR Text from Image:**
* dostuff(data)
* printReport(data)
* printReport(data)
* doPrintStuff...

---

# COMMUNICATIONAL COHESION

Routines make use of the same data and aren't related in any other way.

![A diagram showing two code blocks. The first block, labeled 'dostuff(data)', contains calls to 'printReport(data)' and 'stuffSummary(data)'. An arrow points to the implementation of 'printReport(data)', which in turn calls 'doCalculation(stuffSummary(data))'. This shows that 'printReport' is also performing a calculation.](image.png)

**OCR Text from Image:**
* dostuff(data)
* printReport(data)
* stuffSummary(data)
* printReport(data)
* doCalculation( stuffSummary(data) )

---

# COMMUNICATIONAL COHESION

Instead, an intermediate type to relay that information to `printReport` method.

![A diagram showing a refactored version of the previous diagram. The 'dostuff(data)' block now first calls 'stuffSummary = stuffSummary(data)' and then calls 'printReport(stuffSummary)'. The implementation of 'printReport(StuffSummary stuffSummary)' now takes the summary object and calls 'doCalculation(stuffSummary)'.](image.png)

**OCR Text from Image:**
* dostuff(data)
* stuffSummary = stuffSummary(data)
* printReport(stuffSummary)
* printReport(StuffSummary stuffSummary)
* doCalculation( stuffSummary )

---

# SEQUENTIAL COHESION

Operations that must be performed in a specific order, that share data from step to step, and that don't make up a complete function when done together.

The routine calculates the age and then uses that result to calculate the employee's time to retirement.

![A diagram showing a code block for 'dostuff(birthDate)'. Inside, it first calculates 'age = currentDate() - birthDate' and then calls 'calculateRetirement(age)'.](image.png)

**OCR Text from Image:**
* dostuff(birthDate)
* age = currentDate() - birthDate
* calculateRetirement(age)

---

# POP QUIZ: QUESTION

Does the following routine `printReport` is functionally cohesive?

![A diagram showing two code blocks. The first block, labeled 'dostuff(data)', contains a call to 'printReport(data)'. An arrow points to the implementation of 'printReport(data)', which in turn calls 'doCalculation(stuffSummary(data))'.](image.png)

**OCR Text from Image:**
* printReport(data)
* doCalculation(
* dostuff(data)
* stuffSummary(data)
* printReport(data)
* )

---

# POP QUIZ: ANSWER

No. Because `printReport` was doing more than just printing.

![A diagram showing a refactored code flow. A block 'dostuff(data)' calls 'calcStuff=doCalculation(stuffSummary(data))' and then 'printReport(calcStuff)'. The 'printReport(calcStuff)' block then calls 'doPrintingStuff...'.](image.png)

**OCR Text from Image:**
* dostuff(data)
* calcStuff=doCalculation( stuffSummary(data) )
* printReport(calcstuff)
* printReport(calcstuff)
* doPrintingStuff...

---

# POP QUIZ: QUESTION

Is following method communicationally cohesive?

![A diagram showing two code blocks. The first, 'doStuff(birthDate)', calculates 'age = currentDate() - birthDate' and then calls 'calculateRetirement(age, birthDate)'. The second block, which is the implementation of 'calculateRetirement(age, birthDate)', calls 'checkBirthdate(birthDate)' and 'calculateStuff(age)'.](image.png)

**OCR Text from Image:**
* doStuff(birthDate)
* age = currentDate() - birthDate
* calculateRetirement(age, birthDate)
* calculateRetirement(age, birthDate)
* checkBirthdate(birthDate)
* calculateStuff(age)

---

# POP QUIZ: ANSWER

It would be more communicationally cohesive if it would only send `birthDate`.

![A diagram showing a refactored version of the previous quiz. The 'doStuff(birthDate)' block now only calls 'calculateRetirement(birthDate)'. The 'calculateRetirement(birthDate)' block now contains all the logic: 'checkBirthdate(birthDate)', 'age = currentDate() - birthDate', and 'calculateStuff(age)'.](image.png)

**OCR Text from Image:**
* doStuff(birthDate)
* calculateRetirement(birthDate)
* calculateRetirement(birthDate)
* checkBirthdate(birthDate)
* age = currentDate() - birthDate
* calculateStuff(age)

---

# POP QUIZ: QUESTION

From the last answer,

![A diagram showing a refactored code flow where 'doStuff(birthDate)' calls 'calculateRetirement(birthDate)'. The 'calculateRetirement(birthDate)' block then calls 'checkBirthdate(birthDate)', calculates 'age = currentDate() - birthDate', and then calls 'calculateStuff(age)'.](image.png)

How would it look if the routine given above were functionally cohesive?

---

# POP QUIZ: ANSWER

![A diagram showing a more functionally cohesive design. 'doStuff(birthDate)' calls 'calculateRetirement(birthDate)'. This block calls 'checkBirthdate(birthDate)' and 'calculateRetirementTime(birthDate)'. The 'calculateRetirementTime(birthDate)' block calculates 'age = currentDate() - birthDate' and then performs 'do calculationa with 'age''.](image.png)

**OCR Text from Image:**
* doStuff(birthDate)
* calculateRetirement(birthDate)
* calculateRetirement(birthDate)
* checkBirthdate(birthDate)
* calculateRetirementTime(birthDate)
* calculateRetirementTime(birthDate)
* age = currentDate() - birthDate
* do calculationa with `age`

---

# POP QUIZ: QUESTION

From last answer, is following design functionally cohesive enough?

![A diagram showing a functionally cohesive design. 'doStuff(birthDate)' calls 'calculateRetirement(birthDate)'. This block calls 'checkBirthdate(birthDate)' and 'calculateRetirementTime(birthDate)'. The 'calculateRetirementTime(birthDate)' block calculates 'age = currentDate() - birthDate' and then performs 'do calculationa with 'age''.](image.png)

---

# POP QUIZ: ANSWER

It is better to have age calculation in its own method `calculateAge`.

![The same diagram as the previous slide, but with one change. The 'calculateRetirementTime(birthDate)' block now calls 'age = calculateAge(birthDate)' instead of calculating it inline.](image.png)

**OCR Text from Image:**
* doStuff(birthDate)
* calculateRetirement(birthDate)
* calculateRetirement(birthDate)
* checkBirthdate(birthDate)
* calculateRetirementTime(birthDate)
* calculateRetirementTime(birthDate)
* age = calculateAge(birthDate)
* do calculationa with `age`

---

# ROUTINE NAMES
* Describe everything the routine does
* Avoid meaningless verbs
* Don't differentiate routine names by number
* Use description of the return value
* Use strong verb followed by an object

---

# AVOID MEANINGLESS VERBS

Avoid routines names like:
* `HandleCalculation()`,
* `PerformServices()`,
* `OutputUser()`,
* `ProcessInput()`,
* `DealWithOutput()`

because they won't explain what the routine does.

---

# DON'T DIFFERENTIATE BY NUMBER

Avoid differentiating functionalities of routines by enumerating them like:
* `Part1`, `Part2`,
* `OutputUser`, `OutputUser1`, and `OutputUser2`

---

# DESCRIPTION OF RETURN VALUE

Indicating what function returns also could be good naming convention, for instance:
* `cos()`,
* `customerId.Next()`,
* `printer.IsReady()`,
* `pen.CurrentColor()`.

---

# USE STRONG VERB BEFORE OBJECT

The name should reflect what the procedure does, for instance:
* `PrintDocument()`,
* `CalcMonthlyRevenues()`,
* `CheckOrderInfo()`,
* `RepaginateDocument()`.

---

# USE STRONG VERB BEFORE OBJECT: RESHAPING DESIGN
* `PrintDocument` -> `print(Document d)`
* `PrintDocument` -> `d.print()` where d instance of Document

---

# USE STRONG VERB BEFORE OBJECT: RESHAPING DESIGN
* `CalcMonthlyRevenues` -> `calculate(MonthlyRevenues mr)`
* `CalcMonthlyRevenues` -> `calculate(Monthly(Revenues r))`
* `CalcMonthlyRevenues` -> `calculate(Revenues r.monthly())`

---

# USE STRONG VERB BEFORE OBJECT: RESHAPING DESIGN
* `CheckOrderInfo` -> `CheckInfo(Order o)`
* `CheckOrderInfo` -> `o.checkInfo()`

---

# USE STRONG VERB BEFORE OBJECT: RESHAPING DESIGN
* `RepaginateDocument` -> `repaginate(Document d)`
* `RepaginateDocument` -> `d.repaginate()`

---

# DESCRIBE EVERYTHING THE ROUTINE DOES
* Describe all the outputs and side effects

Assume a routine computes report totals and opens an output file
`ComputeReportTotals()` is not an adequate name for the routine.

whereas

`ComputeReportTotalsAndOpenOutputFile()` is adequate but long name.

---

# POP QUIZ: QUESTION

`CalculateAndDisplayMonthlySalesReport()`: Calculates the monthly sales report and displays it.

How would you simplify the routine name given above?

---

# POP QUIZ: ANSWER

Since the routine name obvious enough it can be shortened to `CalculateAndDisplay`. One can have it as given below:

```
CalculateAndDisplay(MonthlySalesReport mns)
```

---

# POP QUIZ: QUESTION

`UpdateInventoryAndGenerateReceipt()`: This routine updates the inventory after a purchase transaction and generates a receipt for the customer. It encapsulates both the inventory management and customer transaction aspects.

---

# POP QUIZ: ANSWER

A better verb can be used for naming such as `FinalizePurchase` and specification decription can be used for explaining the detail.

```java
/**
 * Does update inventory and generates a receipt.
 *
 * @param tr A realized transaction
 * @return Status code.
 */
finalizePurchase(Transaction tr)
```

---

# POP QUIZ: QUESTION

How can one simplify the following name?

`AuthenticateAndAuthorizeUser()`: Handles user authentication and authorization. It verifies user credentials and grants appropriate access rights if authentication is successful.

---

# POP QUIZ: ANSWER

Assuming the method belongs to some kind of data manager class,

```
authenticateAndAuthorize(User u)
```

or if it belongs to the `User` class one could omit the parameter entirely

```
authenticateAndAuthorize()
```

---

# ROUTINE PARAMETERS
* Use all the parameters
* Don't use routine parameters as working variables

---

# USE ALL THE PARAMETERS

If a parameter passed to a routine, it must be used. Otherwise, it should be removed.

---

# DON'T USE PARAMETERS AS WORKING VARIABLES

It is dangerous to use passed parameters as working variables.

```java
int Sample(int inputVal) {
    inputVal = inputVal * CurrentMultiplier(inputVal);
    inputVal = inputVal + CurrentAdder(inputVal);
    ...
    return inputVal;
}
```

whereas it should have been like;

```java
int Sample(int inputVal) {
    int workingVal = inputVal;
    workingVal = workingVal * CurrentMultiplier(workingVal);
    workingVal = workingVal + CurrentAdder(workingVal);
    ...
    return workingVal;
}
```

---

# CHECKS
* Naming and Definition
* Parameters
* Internals
* Java Specific Checks

---

# NAMING AND DEFINITION
* `MethodName`
* `MethodLength`
* `MethodParamPad`
* `MethodTypeParameterName`

---

# MethodName

Checks if method names conform to a specified pattern.

By default it is forbidden to start a method name with capital letter.

```java
class Example1 {
    public void method1() {}
    protected void method2() {}
    private void Method3() {} // violation
    public void Method4() {} // violation
}
```

---

# MethodLength

As a method becomes very long it is hard to understand. Therefore, long methods should usually be refactored into several individual methods

```xml
<module name="Checker">
  <module name="TreeWalker">
    <module name="MethodLength">
      <property name="max" value="4"></property>
    </module>
  </module>
</module>
```

---

# MethodLength

```java
public class Example1 {
    // violation below, 'Method Example1 length is 5 lines (max allowed is 4)'
    public Example1() {
        int var1 = 2;
        int var2 = 4;
        int sum = var1 + var2;
    }
}
```

```java
// ok, as it is less than 4 lines
public Example1(int a) {
    int var1 = 2;
    int sum = var1 + a;
}
```

---

# MethodLength

```java
// violation below, 'Method firstMethod length is 6 lines (max allowed is 4)'
public void firstMethod() {
    int index = 0;
    if (index < 5) {
        index++;
    }
}
```

```java
public void secondMethod() {
    // comments are counted by default
    System.out.println("line 3");
}
```

---

# MethodLength

```xml
<module name="Checker">
  <module name="TreeWalker">
    <module name="MethodLength">
      <property name="tokens" value="METHOD_DEF"></property>
      <property name="max" value="4"></property>
    </module>
  </module>
</module>
```

```java
public class Example2 {
    // ok, CTOR_DEF is not in configured tokens
    public Example2() {
        int var1 = 2;
        int var2 = 4;
        int sum = var1 + var2;
    }
}
```

---

# MethodLength

```xml
<module name="Checker">
  <module name="TreeWalker">
    <module name="MethodLength">
      <property name="tokens" value="METHOD_DEF"></property>
      <property name="max" value="4"></property>
    </module>
  </module>
</module>
```

```java
// violation below, 'Method thirdMethod length is 5 lines (max allowed is 4)'
public void thirdMethod() {

    // empty line above is counted by default, just like this comment
    System.out.println("line 4");
}
```

---

# MethodLength

```xml
<module name="Checker">
  <module name="TreeWalker">
    <module name="MethodLength">
      <property name="tokens" value="METHOD_DEF"></property>
      <property name="max" value="4"></property>
      <property name="countEmpty" value="false"></property>
    </module>
  </module>
</module>
```

```java
public void thirdMethod() {

    // countEmpty property is false, so this line and the line above don't count
    System.out.println("line 4");
}
```

---

# MethodParamPad

Checks the padding between the identifier of a method definition, constructor definition, method call, or constructor invocation.

If the identifier and left parenthesis are on the same line, checks whether a space is required immediately after the identifier or such a space is forbidden.

---

# MethodParamPad

```java
class Example1 {
    public Example1() {
        super();
    }

    public Example1 (int aParam) { // violation '(' is preceded with whitespace'
        super (); // violation '(' is preceded with whitespace'
    }

    public void method() {}

    public void methodWithVeryLongName
    () {} // violation '(' should be on the previous line.'
}
```

---

# MethodTypeParameterName

Checks that method type parameter names conform to a specified pattern.

```java
class Example1 {
    public <T> void method1() {}
    public <a> void method2() {} // violation
    public <K, V> void method3() {}
    public <k, V> void method4() { } // violation
}
```

---

# PARAMETERS
* `FinalParameters`
* `ParameterName`
* `ParameterNumber`

---

# FinalParameters

Checks that parameters for methods, constructors, catch and for-each blocks are final.

This will ultimately prevent use of routine parameters as intermediate variables.

```java
public class Example1 {
    public Example1() {}
    public Example1(final int m) { }
    public Example1(final int m, int n) { } // violation, 'n should be final'
    public void methodOne(final int x) { }
    public void methodTwo(int x) { } // violation, 'x should be final'
    public static void main(String[] args) { } // violation, 'args should be final'
}
```

---

# ParameterName

Checks that method parameter names conform to a specified pattern.

```java
class Example1 {
    void method1(int v1) {}
    void method2(int V2) { } // violation
}
```

---

# ParameterName

It is also possible to enforce camel case notation.

```xml
<module name="Checker">
  <module name="TreeWalker">
    <module name="ParameterName">
      <property name="format" value="^\[a-z\]\[a-zA-Z0-9\]+$"></property>
    </module>
  </module>
</module>
```

```java
class Example4 {
    void method1(int v1) {}
    void method2(int v_2) {} // violation
    void method3(int V3) {} // violation
}
```

---

# ParameterNumber

Checks the number of parameters of a method or constructor.

```java
//violation below, more than 7 parameters
public void needsLotsOfParameters(int a,
    int b, int c, int d, int e, int f, int g, int h) {
    ...
}
```

---

# INTERNALS
* `EmptyLineSeparator`
* `RequireThis`
* `ReturnCount`
* `JavaNCSS`

---

# EmptyLineSeparator

Checks for empty line separators before package, all import declarations,

```java
package com.puppycrawl.tools.checkstyle.checks.whitespace.emptylineseparator;
import java.io.Serializable;
// violation 2 lines above ''package' should be separated from previous line'
// violation 2 lines above ''import' should be separated from previous line'
```

---

# EmptyLineSeparator

fields, constructors,

```java
class Example1 {
    int var1 = 1;
    int var2 = 2; // violation ''VARIABLE_DEF' should be separated from previous line
}
```

---

# EmptyLineSeparator

methods, nested classes, static initializers and instance initializers.

```java
class Example1 {
    void method1() {}
    void method2() { // violation ''METHOD_DEF' should be separated from previous lin
    }
}
```

---

# RequireThis

Checks that references to instance variables and methods of the present object are explicitly of the form `this.varName` or `this.methodName(args)`.

```java
public class Test {
    private int a;
    private int b;
    private int c;

    public Test(int a) {
        // overlapping by constructor argument
        this.a = a; // OK, this keyword used
        b = 0;       // OK, no overlap
        foo(5);      // OK
    }
    ...
}
```

---

# RequireThis

```java
...
    public void foo(int c) {
        // overlapping by method argument
        c = c; // violation, reference to instance variable "c" requires "th"
    }
}
```

---

# ReturnCount

Restricts the number of return statements in methods, constructors and lambda expressions.

```java
public class MyClass {
    public int sign(int x) {
        if (x < 0)
            return -1;
        if (x == 0)
            return 1;
        return 0;
    } // OK

    public int badSign(int x) {
        if (x < -2)
            return -2;
        if (x == 0)
            return 0;
        if (x > 2)
```

---

# JavaNCSS

Determines complexity of methods, classes and files by counting the Non Commenting Source Statements (NCSS).

```java
public void test() {
    System.out.println("Line 1");
    // another 48 lines of code
    System.out.println("Line 50") // OK
    System.out.println("Line 51") // violation, the method crosses 50 non commented l
}
```

---

# JAVA SPECIFIC CHECKS
* `CovariantEquals`
* `SuperClone`
* `SuperFinalize`

---

# CovariantEquals

Checks that classes and records which define a covariant `equals()` method also override method `equals(Object)`.

```java
class Test {
    public boolean equals(Test i) { // violation
        return false;
    }
}
```

---

# CovariantEquals

```java
class Test {
    public boolean equals(Test i) { // no violation
        return false;
    }

    public boolean equals(Object i) {
        return false;
    }
}
```

---

# SuperClone

Checks that an overriding `clone()` method invokes `super.clone()`.

```java
class Example1 {
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

```java
class SuperCloneB {
    private int b;
    // violation below, "Method 'clone' should call 'super.clone'."
    public SuperCloneB clone() {
        SuperCloneB other = new SuperCloneB();
        other.b = this.b;
        return other;
    }
}
```

---

# SuperFinalize

Checks that an overriding `finalize()` method invokes `super.finalize()`. Does not check native methods, as they have no possible java defined implementation.

```java
public class A {
    protected void finalize() throws Throwable {
        System.out.println("In finalize block");
        super.finalize(); // OK, calls super.finalize()
    }
}
public class B {
    protected void finalize() throws Throwable { // violation
        System.out.println("In finalize block");
    }
}
```

---

# POP QUIZ

Which check from the (Week 9 - Working Classes) exists to ensure that `super` is called so that `SuperClone` and `SuperFinalize` does not required?

---

# End of Week 10

Thanks for listening