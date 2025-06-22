# **SE3318: Software Construction \- Study Notes**

## **Week 9: Working Classes**

This section focuses on fundamental principles for designing effective and maintainable software classes.

### **Abstract Data Types (ADTs)**

ADTs are a core concept in software design, emphasizing what an object *does* rather than how it *does* it.

* **Abstraction**: The process of simplifying complex details by hiding lower-level implementations and presenting a simpler, higher-level idea. This allows users to interact with objects without needing to know their internal workings.  
* **Modularity**: The ability to divide a system into independent components or modules. Each module can be designed, implemented, and tested separately, improving manageability.  
* **Encapsulation**: Hiding the internal details of a module's implementation from the rest of the system, enforcing controlled access and changes to the module's details.  
* **Separation of Concerns**: Making a specific feature or responsibility belong to a single module. This reduces interdependencies and increases maintainability.  
* **User-Defined Types**: A type that provides an abstraction for a real-world object or a meta-object, encapsulating the complexity of its operations. A type is defined by the operations that can be performed on it.

#### **Liskov Substitution Principle (LSP)**

**Concept**: This principle states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application. In simpler terms, if a program uses a base class, it should be able to use any of its derived classes without issues.

* **Key Idea**: An overridden method in a subclass needs to accept the same or less restrictive input parameter values as the method in the superclass.

#### **Law of Demeter**

**Concept**: This principle suggests that an object should only "talk" to its immediate friends. It limits the number of objects a given object interacts with.

* **Rule**: Within a method, you should only call methods on:  
  * The object itself (this).  
  * Objects passed as arguments to the method.  
  * Objects created within the method.  
  * Direct component objects of the current object.  
* **Example**: a.getB().getC().doSomething() violates the Law of Demeter because a is reaching through B to C. A better approach would be a.doSomethingWithC(), where a is responsible for interacting with B and C internally.

#### **Good Encapsulation**

Encapsulation focuses on controlling access to class members and hiding implementation details.

* **Hide Utility Class Constructor**: Utility classes (classes with only static methods) should have their constructors hidden to prevent instantiation. This prevents misuse and signals that the class is not meant to be instantiated.  
  * **Violation Example**: A utility class with a public constructor, allowing it to be instantiated.  
  * **Solution**: Declare the constructor as private.

#### **Good Abstractions**

Good abstractions make code easier to understand and use by providing clear, concise interfaces.

* **Return Empty Array Instead of Null**: Methods returning collections or arrays should return an empty collection/array instead of null when there are no results. This prevents NullPointerExceptions and simplifies client code.  
* **Avoid Primitive Wrapper Instantiation**: Do not explicitly instantiate primitive wrapper objects (e.g., new Integer(5)) as this can lead to unnecessary object creation. Use autoboxing or static factory methods (e.g., Integer.valueOf(5)) instead.  
* **Inner Type Last**: Nested classes/interfaces should be declared at the bottom of the top-level class, after all init/static init blocks, method, constructor, and field declarations. This improves readability and organization.  
  * **Violation Example**: A method declared after an inner class within the same top-level class.

#### **Good Inheritance**

Inheritance is a powerful tool, but it must be used correctly to maintain code quality.

* **No Finalizer**: Avoid using the finalize() method for resource cleanup. It is unpredictable and can lead to issues. Use try-with-resources or explicit close methods instead.  
* **No Redundant Array Init**: Do not explicitly initialize arrays with default values (e.g., new int\[\] {0, 0, 0}). Arrays are automatically initialized with default values.  
* **No Clone**: Avoid implementing clone() unless absolutely necessary, and if you do, ensure super.clone() is called. Consider using copy constructors or factory methods for object copying.

#### **Member Functions**

These rules focus on best practices for designing and implementing methods.

* **Parameter Number**: Restricts the number of parameters a method can have. A large number of parameters often indicates that the method is doing too much and should be refactored.  
  * **Violation Example**: A method with more than 7 parameters.  
* **Method Length**: Methods should be kept short and focused, typically no more than a few lines of code. Long methods are harder to understand, test, and maintain.  
  * **Violation Example**: A method exceeding a configured maximum line count (e.g., 4 lines).  
  * **Configuration**: The MethodLength check can be configured to count comments and empty lines, or only actual code lines.  
* **Method Name**: Method names should conform to a specified pattern, typically starting with a lowercase letter (camel case).  
  * **Violation Example**: A public method starting with a capital letter.  
* **Method Count Check**: Checks the number of methods declared in each type declaration by access modifier or total count.  
  * **Important Note**: Methods within nested enums or anonymous inner classes are *not* counted towards the enclosing class's method count for this check.  
* **Method Param Pad**: Checks the spacing between the method identifier and the opening parenthesis (.  
  * **Violation Example**: A space preceding ( after the method name, or ( being on a new line.  
* **Method Type Parameter Name**: Checks that method type parameter names (for generics) conform to a specified pattern, usually single uppercase letters (e.g., T, K, V).  
  * **Violation Example**: Type parameters using lowercase letters or multiple characters.

#### **Class Internals**

These principles relate to the internal structure and organization of classes.

* **InnerTypeLast**: As mentioned under "Good Abstractions," nested classes/interfaces should be declared at the bottom of the top-level class.  
* **HideUtilityClassConstructor**: As mentioned under "Good Encapsulation," utility classes should have private constructors.

### **Summary and Revision List for Week 9**

* **ADTs**: Abstraction, Modularity, Encapsulation, Separation of Concerns, User-Defined Types.  
* **Liskov Substitution Principle**: Subclasses should be substitutable for their superclasses without issues.  
* **Law of Demeter**: Limit interactions to direct "friends" (the object itself, arguments, created objects, direct components). Avoid chaining many get() calls.  
* **Encapsulation**: Hide constructors for utility classes; declare inner types last.  
* **Inheritance**: Avoid finalize() and explicit array initialization. If implementing clone(), call super.clone().  
* **Method Design**:  
  * **Naming**: Meaningful, strong verb \+ object, avoid meaningless verbs or numbers, describe return value and side effects.  
  * **Length**: Keep methods short (refactor if too long).  
  * **Parameters**: Use all parameters, make them final (especially in Java), avoid using them as working variables. Limit the number of parameters.  
* **Checkstyle Rules (Examples for Exam Focus)**: MethodName, MethodLength, MethodParamPad, MethodTypeParameterName, FinalParameters, ParameterName, ParameterNumber, InnerTypeLast, HideUtilityClassConstructor. Understand why these rules exist (readability, maintainability, preventing common errors).

## ---

**Week 10: High Quality Routines**

This section delves into creating well-designed, high-quality routines (methods/functions) that are robust, readable, and maintainable.

### **Valid Reasons to Create a Routine**

Routines are not just for convenience; they serve several critical purposes in software development.

* **Understandable Abstraction**: Routines allow you to hide complex logic behind a simple, easy-to-understand name. This makes the code more readable and reduces cognitive load. For example, GetLeafName(node) is clearer than a multi-line if-else or while loop.  
* **Avoid Duplicate Code**: If the same block of code appears in multiple places, it should be extracted into a routine. This follows the "Don't Repeat Yourself" (DRY) principle, making code easier to maintain and update.  
* **Support Subclassing**: Routines can be designed to be overridden by subclasses, allowing for polymorphic behavior and supporting extensibility (Design for Extension).  
* **Improve Portability**: Routines can encapsulate non-portable aspects of the code, such as nonstandard language features, hardware dependencies, or operating system dependencies. This makes it easier to adapt the software to different environments.

### **Design at Routine Level**

The design of individual routines significantly impacts code quality. Cohesion is a key concept here.

* **Functional Cohesion**: A routine exhibits functional cohesion if it performs one and only one operation. This is the strongest and most desirable type of cohesion.  
  * **Example**: A printReport(data) routine that *only* prints the report, without also performing calculations or summaries.  
  * **Violation Example**: A printReport routine that also performs calculations; it's doing more than just printing.  
* **Sequential Cohesion**: Operations that must be performed in a specific order, share data from step to step, and don't make up a complete function when done together.  
  * **Example**: A routine that calculates age and then uses that result to calculate time to retirement.  
* **Communicational Cohesion**: Routines that make use of the same data but aren't related in any other way.  
  * **Example**: printReport(data) and stuffSummary(data) both operate on data.  
  * **Improvement**: Instead of passing raw data directly, use an intermediate type to relay information, making the dependency clearer and reducing direct data coupling.  
* **Temporal Cohesion**: Actions that are grouped together because they occur at the same time in program execution (e.g., initialization routines). This is generally considered weaker cohesion.  
* **Logical Cohesion**: Operations that are grouped because they fall into a certain logical category, even if they don't necessarily relate to each other functionally (e.g., a "utilities" routine with unrelated helper functions). This is generally considered weak cohesion.

### **Routine Names**

Good routine names are crucial for code readability and maintainability.

* **Describe Everything the Routine Does**: The name should accurately reflect all outputs and side effects of the routine. Avoid names that only describe part of the functionality.  
  * **Poor Example**: ComputeReportTotals() if it also opens an output file.  
  * **Better Example**: ComputeReportTotalsAndOpenOutputFile() (though this can become too long).  
  * **Simplification**: For long names, consider if the context makes parts of the name obvious (e.g., CalculateAndDisplay if it's clear what's being calculated and displayed). For complex routines, use a strong verb and provide detailed specification descriptions in comments.  
* **Avoid Meaningless Verbs**: Don't use vague verbs like Handle, Perform, Output, Process, DealWith. These names don't convey what the routine actually accomplishes.  
* **Don't Differentiate Routine Names by Number**: Avoid names like Part1, Part2, OutputUser1, OutputUser2. This indicates a lack of clear separation of concerns or a need for refactoring.  
* **Use Description of the Return Value**: For functions that return a value, the name can sometimes indicate what is returned (e.g., cos(), customerId.Next(), printer.IsReady(), pen.CurrentColor()).  
* **Use Strong Verb Followed by an Object**: This creates clear, action-oriented names.  
  * **Examples**: PrintDocument(), CalcMonthlyRevenues(), CheckOrderInfo(), RepaginateDocument().  
  * **Reshaping Design**: Often, a method name like PrintDocument() can be reshaped into a method on the Document object: d.print(). Similarly, CheckOrderInfo() becomes o.checkInfo().

### **Routine Parameters**

Parameters are how routines receive input. Proper parameter usage is vital.

* **Use All Parameters**: If a parameter is passed to a routine, it must be used within that routine. Unused parameters should be removed.  
* **Don't Use Routine Parameters as Working Variables**: It is dangerous and confusing to reassign the value of a parameter inside a routine, especially for primitive types. Instead, create a new local working variable to perform calculations or modifications.  
  * **Bad Example**: inputVal \= inputVal \* CurrentMultiplier(inputVal); then inputVal \= inputVal \+ CurrentAdder(inputVal);.  
  * **Good Example**: int workingVal \= inputVal; workingVal \= workingVal \* CurrentMultiplier(workingVal); workingVal \= workingVal \+ CurrentAdder(workingVal);.

### **Checkstyle for Routines**

Checkstyle is a tool used to enforce coding standards. Here are some checks related to routines:

#### **Naming and Definition Checks**

* **MethodName**: Enforces naming conventions for methods (e.g., camel case, starting with a lowercase letter).  
* **MethodLength**: Limits the maximum number of lines in a method, promoting shorter, more focused routines. Can be configured to count comments and empty lines.  
* **MethodParamPad**: Checks the spacing around method parameters and parentheses.  
* **MethodTypeParameterName**: Ensures generic type parameters in methods follow naming conventions (e.g., single uppercase letters like T, K, V).

#### **Parameter Checks**

* **FinalParameters**: Requires method parameters to be declared as final. This prevents accidental modification of parameters and can enforce the "don't use parameters as working variables" rule.  
* **ParameterName**: Enforces naming conventions for method parameters (e.g., camel case, starting with lowercase).  
* **ParameterNumber**: Limits the number of parameters a method or constructor can have, encouraging simpler interfaces.

#### **Internals Checks**

* **EmptyLineSeparator**: Enforces empty lines between different code blocks (package, imports, fields, constructors, methods, nested classes, initializers) to improve readability.  
* **RequireThis**: Checks that references to instance variables and methods of the current object explicitly use this.varName or this.methodName(args). This helps avoid ambiguity when local variables or method parameters have the same name as instance variables.  
* **ReturnCount**: Restricts the number of return statements in methods, constructors, and lambda expressions (e.g., maximum of 3 return statements). Too many return points can make control flow harder to follow.  
* **JavaNCSS (Non Commenting Source Statements)**: Determines the complexity of methods, classes, and files by counting lines of code that are not comments. A high NCSS count indicates a complex piece of code that might need refactoring.

#### **Java Specific Checks**

* **CovariantEquals**: Checks that if a class defines a equals() method with a covariant parameter type (e.g., public boolean equals(Test i)), it *also* overrides the standard equals(Object) method. Failure to do so can lead to unexpected behavior due to method overloading instead of overriding.  
* **SuperClone**: Ensures that an overriding clone() method invokes super.clone(). This is crucial for proper object cloning in Java's inheritance hierarchy.  
* **SuperFinalize**: Checks that an overriding finalize() method invokes super.finalize(). Similar to SuperClone, this ensures proper resource cleanup in the inheritance chain (though finalize() is generally discouraged).

### **Summary and Revision List for Week 10**

* **Reasons for Routines**: Understandable abstraction, avoiding duplicate code, supporting subclassing, improving portability.  
* **Routine Design (Cohesion)**:  
  * **Functional (Best)**: One specific operation.  
  * **Sequential**: Ordered operations sharing data.  
  * **Communicational**: Operations on the same data.  
  * Avoid Temporal and Logical where possible for better design.  
* **Routine Naming**: Descriptive, strong verbs \+ objects, avoid vague words, no numbering. Reflect return value and all side effects.  
* **Routine Parameters**: Use all parameters, make them final, and *do not* use them as working variables (use local variables instead). Limit parameter count.  
* **Checkstyle Rules (Examples for Exam Focus)**: Be familiar with the purpose and common violations of:  
  * **Naming/Definition**: MethodName, MethodLength, MethodParamPad, MethodTypeParameterName.  
  * **Parameters**: FinalParameters, ParameterName, ParameterNumber.  
  * **Internals**: EmptyLineSeparator, RequireThis, ReturnCount, JavaNCSS.  
  * **Java Specific**: CovariantEquals, SuperClone, SuperFinalize.

## ---

**Week 11: General Issues in Using Variables**

This section covers best practices for declaring, initializing, scoping, and using variables effectively to improve code quality.

### **Making Variable Declarations**

* **Use Naming Conventions**: Consistent naming conventions improve readability and understanding of variables.  
* **Checkstyle Checks for Naming Conventions**:  
  * **MemberName**: Checks that instance variable names conform to a specified pattern. For example, by default, they should typically start with a lowercase letter and follow camel case, not all uppercase like NUM1.  
  * **LocalVariableName**: Checks that local, non-final variable names conform to a specified pattern, usually starting with a lowercase letter. Catch parameters are considered local variables.  
  * **StaticVariableName**: Checks that static, non-final variable names conform to a specified pattern, often lowercase camel case.  
  * **LocalFinalVariableName**: Checks that local final variable names conform to a specified pattern, typically lowercase camel case. Catch parameters and resources in try statements are considered local, final variables.  
  * **FinalLocalVariable**: Checks that local variables that are never changed are declared final. This check can also be configured to ensure unchanged parameters are declared final.

### **Guidelines for Initializing Variables**

* **Initialize Each Variable as it's Declared**: Assign a value to a variable as soon as it's declared.  
* **Initialize Each Variable Close to Where it's First Used**: Declare and define variables as close as possible to their first point of use.  
* **Checkstyle Checks for Initialization**:  
  * **MultipleVariableDeclarations**: Enforces that each variable declaration is in its own statement and on its own line, as recommended by Java code conventions.  
  * **ExplicitInitialization**: Checks if variables are explicitly initialized to their default values (e.g., null for objects, 0 for numeric types, false for booleans). This is considered a violation because Java automatically initializes these variables to their defaults.  
  * **Recommendation**: Initialize a class's member data in its constructor.

### **Scope**

* **Keep Variables "Live" for as Short a Time as Possible**: "Live time" refers to the total number of statements over which a variable is actively used (from its declaration to its last reference). Minimizing live time reduces complexity and potential errors.  
* **General Guidelines for Minimizing Scope**:  
  * Initialize variables used in a loop immediately before the loop, not at the beginning of the routine containing the loop.  
  * **Don't Modify a Control Variable Inside a for Loop**: Modifying the loop control variable within the loop block is a violation of ModifiedControlVariable and can lead to unpredictable behavior.  
  * **Don't Assign a Value Until Just Before Use (VariableDeclarationUsageDistance)**: This check measures the distance between a variable's declaration and its first usage. A large distance (many lines of code) is a violation, as it makes code harder to follow. Final variables are typically not checked.  
  * **Group Related Statements**: Organize code so that related statements are grouped together, improving readability and understanding.  
  * **Break Groups of Related Statements into Separate Routines**: If a group of statements performs a coherent task, extract them into their own routine. Shorter routines generally lead to smaller variable spans and live times.  
  * **Keep Variables as Local as Possible**: Restrict variable access as much as possible. Start with the most restricted visibility (e.g., private) and expand only if necessary. This is related to the VisibilityModifier check.

### **Using Each Variable for Exactly One Purpose**

* **Use Each Variable for One Purpose Only**: Avoid reusing the same variable for multiple unrelated purposes. This makes code confusing and prone to errors.  
  * **Bad Example**: Using temp first for a quadratic equation discriminant and then later for swapping roots.  
  * **Good Example**: Using discriminant for the equation and oldRoot for swapping.  
* **Avoid Variables with Hidden Meanings**: A variable's value should not implicitly change its purpose. If different values signify different meanings, use separate variables or an enum/type.  
* **Make Sure That All Declared Variables Are Used**: Declared but unused variables are often a sign of errors or dead code. Compilers and tools like lint often report these as warnings.  
  * **Check**: UnusedLocalVariable checks for local variables that are declared and/or assigned but never used.

### **Summary and Revision List for Week 11**

* **Variable Declarations**:  
  * Follow naming conventions for members, local, static, and local final variables (MemberName, LocalVariableName, StaticVariableName, LocalFinalVariableName).  
  * Declare unused local variables as final (FinalLocalVariable).  
* **Variable Initialization**:  
  * Initialize variables upon declaration or close to first use.  
  * Declare variables one per line (MultipleVariableDeclarations).  
  * Avoid explicit initialization to default values (ExplicitInitialization).  
* **Scope**:  
  * Keep variable "live time" short.  
  * Don't modify for loop control variables (ModifiedControlVariable).  
  * Minimize distance between declaration and first use (VariableDeclarationUsageDistance).  
  * Group related statements and break into separate routines.  
  * Keep variables as local and restricted as possible (VisibilityModifier).  
* **Variable Purpose**:  
  * Use each variable for exactly one purpose.  
  * Avoid variables with "hidden meanings" (where the value changes the variable's interpretation).  
  * Ensure all declared variables are used (UnusedLocalVariable).

## ---

**Week 12: Controlling Loops**

This section focuses on different types of loops, how to control their execution, and best practices for their design and usage.

### **Selecting the Kind of Loop**

Different loops are suited for different tasks:

* **Counted Loop (for loop)**: Used when the number of iterations is known in advance. Ideal for iterating a specific number of times.  
  * **Example**: Summing numbers from 1 to 10\.  
* **Iterator Loop (for-each or enhanced for loop)**: Performs its action once for each element in a container class (e.g., collections, arrays). Simplifies iteration over collections.  
* **Continuously Evaluated Loop (while or do-while loop)**: The number of iterations is not known beforehand. It tests a condition on each iteration to determine if it should continue.  
* **Endless Loop**: Executes forever once started. Typically used only in specific scenarios like operating systems or embedded systems where continuous operation is required, or as a base for loops with internal exit conditions.

### **Controlling the Loop**

Effective loop control ensures correct and predictable execution.

* **Putting the Loop Control at the Top or Bottom of the Loop**:  
  * **Top (Pre-check)**: while loop. The condition is checked *before* the loop body executes. If the condition is initially false, the loop body never runs.  
  * **Bottom (Post-check)**: do-while loop. The loop body executes *at least once*, and then the condition is checked.  
* **Processing the Middle of the Loop (Loop-and-a-Half)**: This occurs when the decision to exit a loop is neither at the absolute beginning nor the absolute end, but somewhere in the middle of the loop's operations.  
  * **Typical Structure**: An infinite loop (while (true)) with an if condition and break statement inside.  
  * **Example**: Reading data until a specific end-of-file marker is found.  
  * **Advantages**: Reduces redundant code and can sometimes simplify complex exit conditions compared to pure while or do-while loops.  
  * **Disadvantages**: Can be less readable if not used carefully, as the exit point is not immediately obvious from the loop header.

### **Exiting the Loop**

* **Exiting from the Middle of a Loop**: Using break statements. While break can simplify some "loop-and-a-half" scenarios, overuse can make code harder to follow.  
* **Exiting a Loop with a goto**: Generally discouraged in modern languages due to unstructured control flow, making code difficult to read and debug.  
* **Exiting with a return**: A routine can return from inside a loop, exiting both the loop and the routine.  
* **Error Handling in Loops**: Use try-catch blocks within loops to handle exceptions without exiting the entire loop prematurely, or to perform cleanup before exiting.

### **Using Loop Variables**

Loop variables are essential for controlling iterations.

* **Initializing Loop Variables**: Initialize them immediately before the loop starts.  
* **Incrementing Loop Variables**: Increment them as part of the loop control (e.g., in the for loop update clause).  
* **Using for Loop Variables for One Purpose Only**: Similar to general variable usage, loop control variables (i, j, k) should ideally be used only for loop iteration.  
* **Watch Out for Off-by-One Errors**: A common mistake where a loop iterates one too many or one too few times. Carefully check boundary conditions (\< vs. \<=).

### **Loop Length**

* **How Long Should a Loop Be?**: No strict rule, but generally, shorter loops are easier to understand and verify.  
  * If a loop is becoming very long or deeply nested, it might be a sign that parts of it should be extracted into separate routines.  
  * Deeply nested loops (e.g., 4 or more levels) significantly reduce human comprehension. Consider refactoring such structures into separate, smaller routines.

### **Checkstyle for Loops**

* **ModifiedControlVariable**: Checks that the control variable of a for loop is not modified inside the loop body. Modifying it can lead to unexpected and hard-to-debug behavior.  
  * **Violation Example**: for (int i \= 0; i \< 10; i++) { i \= 5; }

### **Summary and Revision List for Week 12**

* **Loop Types**: for (counted), for-each (iterator), while/do-while (continuously evaluated), endless loops. Understand when to use each.  
* **Loop Control**: while (pre-check), do-while (post-check). "Loop-and-a-half" using while(true) and break.  
* **Exiting Loops**: break, return, error handling. Avoid goto.  
* **Loop Variables**: Initialize before loop, increment as part of control, use for one purpose only. Watch for off-by-one errors.  
* **Loop Length/Nesting**: Shorter loops are better. Refactor deeply nested loops into routines to improve readability and maintainability.  
* **Checkstyle**: ModifiedControlVariable (don't modify loop control variable inside the loop body).

## ---

**Week 13-1: Using Conditionals**

This section focuses on best practices for using if-then and switch statements to create clear, robust, and maintainable conditional logic.

### **Plain if-then Statements**

* **Write the Nominal Path First; Then Write the Unusual Cases**: Structure your if-then statements so that the most common, expected scenario (the "nominal path") is handled first. Less common or exception cases should follow. This improves readability by making the primary flow clear.  
  * **Example**: In an OrderProcessor calculating totalPrice, first sum up item prices (nominal), then apply a discount for large orders (unusual case).  
* **Make Sure That You Branch Correctly on Equality**: Pay careful attention to boundary conditions and whether you should use operators like \<, \<=, \>, \>= or \==. A common error is "off-by-one" in conditions.  
  * **Example**: Correctly checking if a value is within a range \[lowerBound, upperBound\] should use (value \>= lowerBound && value \<= upperBound). Incorrectly using \> or \< can exclude boundary values.  
* **Check the Normal Case First in if Rather Than After in the else**: Similar to writing the nominal path first, prioritize the most frequent or "normal" condition in the if block. This often leads to more natural and readable code flow.  
* **Follow the if Clause with a Meaningful Statement**: The action taken within an if block should be clear and directly related to the condition. Avoid empty or trivial if blocks unless they are part of a very specific, well-understood pattern.

### **Chains of if-then Statements**

* **Order if-then-else if Statements by Frequency**: When you have multiple conditions, order them from most likely to least likely. This can slightly improve performance by reducing the number of conditions checked for common cases and makes the most important cases immediately visible.  
* **Order if-then-else if Statements by Alphabetical Order**: If performance is not a concern and there's no clear frequency, ordering alphabetically or by some other logical criterion (e.g., range) can improve readability and maintainability.  
* **Order if-then-else if Statements by Single Test**: If conditions are mutually exclusive and can be evaluated with a single test (e.g., checking specific values), order them logically.  
* **Check Each Condition and Ensure All Cases are Covered**: Carefully review complex if-then-else if chains to ensure that no possible input or state falls through unintendedly. It's easy to miss a case, leading to bugs.  
* **Check for Correct Logic with else Clause**: The else clause should explicitly handle all cases not covered by the preceding if or else if conditions. If a default action is required, the else clause is essential.

### **case Statements (Switch Statements)**

* **Use case Statements for Mutually Exclusive Conditions**: switch statements are ideal when you have a single variable or expression that can take on several distinct, mutually exclusive values, and you want to execute different code blocks based on those values.  
* **Make Sure the default Clause is Always Present**: Even if you believe all possible cases are covered, always include a default clause in a switch statement.  
  * **Purpose**:  
    1. **Error Detection**: Catches unexpected or invalid values.  
    2. **Robustness**: Handles future changes to the input without crashing.  
    3. **Documentation**: Explicitly states what happens for unhandled cases, even if it's "do nothing."  
  * **Checkstyle**: MissingSwitchDefault checks that a switch statement has a default clause.  
* **Clearly and Unmistakably Identify Flow-Throughs at the End of a case Statement**: In languages like Java, if a case block does not end with break, return, yield, throw, or continue, execution will "fall through" to the next case block.  
  * **Best Practice**: Avoid fall-through unless it's explicitly intended and *clearly documented* with a comment (e.g., // falls through or // intentional fall-through). Unintentional fall-through is a common source of bugs.  
  * **Checkstyle**: FallsThrough checks for fall-through in switch statements and can be configured to recognize special comments that suppress warnings for intentional fall-throughs.  
* **Use enum Types When Appropriate for case Statements**: If your switch statement is based on a set of discrete, fixed values, using an enum is often more robust and readable than using integer constants or strings. Enums provide type safety and make the code self-documenting.

### **Checkstyle for Conditionals**

* **MissingSwitchDefault**: Checks that a switch statement has a default clause.  
* **FallsThrough**: Checks for fall-through in switch statements where a case does not explicitly exit, helping to identify unintentional fall-throughs.

### **Summary and Revision List for Week 13-1**

* **if-then Statements**:  
  * Handle nominal path first, then unusual cases.  
  * Ensure correct branching on equality (boundary conditions).  
  * Place normal case in if (not else).  
  * Follow if with a meaningful statement.  
* **if-then-else if Chains**:  
  * Order by frequency (most likely first) or logical criteria (alphabetical, range).  
  * Clearly check all conditions and ensure all cases are covered.  
  * Verify correct use of the else clause.  
* **switch Statements**:  
  * Use for mutually exclusive conditions.  
  * Always include a default clause (MissingSwitchDefault).  
  * Clearly document any intentional fall-throughs; avoid unintentional ones (FallsThrough).  
  * Consider using enum types for case values.  
* **Exam Focus**: Understand why default is always recommended in switch statements and the dangers of unintentional fall-throughs. Be familiar with the purpose of MissingSwitchDefault and FallsThrough Checkstyle checks.

## ---

**Week 13-2: Defensive Programming**

This section covers strategies for making your code more robust and resilient to errors by anticipating and handling unexpected conditions.

### **Barricade Your Program to Contain the Damage Caused by Errors**

The core idea of "barricading" is to divide your software into "safe" and "unsafe" areas to limit the spread of errors.

* **Concept**: Create a "barricade" or "firewall" around parts of your code that deal with "dirty" or untrusted data (e.g., input from users, external files, network feeds).  
  * **"Dirty" Data**: Data that comes from outside the program, such as user input, database queries, file reads, or network communications. This data is assumed to be potentially invalid or malformed.  
  * **"Clean" Data**: Data that has been validated and sanitized by the "barricade" classes. Internal classes can then trust this data.  
* **Implementation**:  
  * **Public Methods**: Public methods of a class (which are exposed to external input) should assume that all incoming data is unsafe. They are responsible for checking and sanitizing this data.  
  * **Private Methods**: Private methods within the "barricaded" class (or classes within the "clean" zone) can assume that the data they receive has already been validated and is safe. This simplifies their logic and improves performance.  
* **Role of Preconditions**: If public methods assume data is unsafe, then preconditions (conditions that must be true *before* a method is called) become essential for public methods to define what they expect after validation, or for internal methods to define what they expect from the "barricade."

### **Assertions**

Assertions are development-time tools used to check for conditions that *should always be true* if the program is working correctly. They are not typically used for handling anticipated runtime errors.

* **Purpose**:  
  * **Catch Programming Errors**: Assertions are designed to detect bugs during development and testing, indicating that the code has reached an impossible or unexpected state.  
  * **Document Assumptions**: They clearly state assumptions made by the programmer about the state of the program.  
* **Characteristics**:  
  * **Development-Time Only**: Assertions are typically compiled out of production code, meaning they have no performance impact on the released software.  
  * **Not for User Input Validation**: Do not use assertions to validate user input or other "dirty" data. That's a job for regular error handling (conditionals, exceptions). Assertions are for *internal consistency checks*.  
  * **Not for Recoverable Errors**: Assertions should not be used for conditions that are expected to happen and from which the program should recover (e.g., file not found, network timeout).  
* **Correct Usage**:  
  * **Preconditions**: Check conditions that must be true at the beginning of a method.  
  * **Postconditions**: Check conditions that must be true at the end of a method (before returning).  
  * **Parameters/Return Values**: Validate parameters that *should* be valid by definition (e.g., an internal ID that must be non-negative). Validate return values before they are used.  
  * **Never Put Executable Code in Assertions**: An assertion should only check a condition. It should not contain code that has side effects or changes the program's state. If an assertion is compiled out, any executable code within it would disappear, leading to different behavior in development vs. production.  
    * **Bad Example**: Debug.Assert(PerformAction()); (where PerformAction() has side effects).  
    * **Good Example**: boolean actionSucceeded \= PerformAction(); Debug.Assert(actionSucceeded); (separated into executable statement and a check on a status variable).

### **Exceptions**

Exceptions are a structured way to handle runtime errors that are *not* expected to be part of normal program flow but from which the program might be able to recover.

* **Purpose**: To signal that an unusual or erroneous condition has occurred and to transfer control to an error-handling block.  
* **When to Use Exceptions**:  
  * For errors that cannot be handled locally.  
  * For conditions that truly are "exceptional" and not part of normal operation.  
  * When the error occurs in a different part of the code from where it can be handled.  
* **Alternatives to Exceptions**:  
  * **Return a Neutral Value**: Return a value that indicates "no result" (e.g., null, empty string, 0, \-1). Suitable when a "no result" is a valid, common outcome.  
  * **Return an Error Code**: Return a specific code that indicates the type of error. Requires the calling code to explicitly check the error code. Can lead to verbose if-else chains.  
  * **Change return to boolean**: If a method's primary purpose is to perform an action and its success/failure is simple, it can return true/false.  
  * **Die (Crash)**: For severe, unrecoverable errors, the program might terminate. This is a last resort.  
* **When *Not* to Use Exceptions**:  
  * **For Normal Flow Control**: Do not use exceptions as a substitute for if-then-else statements for routine conditional logic. Exceptions are computationally expensive and make code harder to read.  
  * **For User Input Validation**: As with assertions, don't use exceptions for expected invalid user input. Handle these with if-then-else and prompt the user for correct input.

### **Error Handling Techniques**

Beyond assertions and exceptions, other techniques contribute to robust error handling.

* **Determine How to Handle Errors**: Decide on a strategy for each type of error:  
  * Return a neutral value.  
  * Substitute with the next piece of valid data.  
  * Return the same answer as the previous time.  
  * Substitute with the closest legal value.  
  * Log a warning message to a file.  
  * Call an error-processing routine/object.  
  * Display an error message to the user.  
  * Handle the error at a higher level (propagate).  
  * Shut down.  
* **Handle Errors Only Once**: An error should be detected at the lowest possible level, but handled at the highest level where information is available to make a decision about what to do. Avoid catching, logging, and then re-throwing the same exception without adding value.  
* **Report Errors and Don't Suppress Them**: Make errors visible. Suppressing errors (e.g., empty catch blocks) makes debugging impossible and hides underlying problems.  
* **Log Errors Appropriately**: Use logging frameworks to record error details, including timestamps, error types, and relevant context. This is crucial for debugging and monitoring production systems.  
* **Centralize Error Handling**: Create dedicated error handling routines or classes to standardize error reporting, logging, and recovery actions. This promotes consistency and maintainability.  
* **Consider What's Clean vs. Dirty**: Continuously apply the "barricade" principle by identifying what data is potentially untrusted (dirty) and where it needs to be cleaned for internal use (clean).

### **Summary and Revision List for Week 13-2**

* **Defensive Programming Concept**: Barricade your program to contain errors by distinguishing between "dirty" (untrusted external) and "clean" (validated internal) data. Public methods validate, private methods assume clean data.  
* **Assertions**:  
  * **Purpose**: Catch *programming errors* (bugs) during *development*. Document assumptions.  
  * **Key points**: Development-time only (no production overhead), NOT for user input or recoverable errors.  
  * **Crucial Rule**: Never put executable code (side effects) within an assertion.  
* **Exceptions**:  
  * **Purpose**: Handle *exceptional runtime errors* from which the program *might recover*.  
  * **When to Use**: Cannot be handled locally, truly exceptional, error occurs at a different level than handling.  
  * **When NOT to Use**: Normal flow control, user input validation.  
  * **Alternatives**: Return neutral value/error code, change return to boolean, die.  
* **Error Handling Techniques**:  
  * Develop a clear strategy for handling different error types.  
  * Handle errors once (detect low, handle high).  
  * Report errors; never suppress them.  
  * Log errors with context.  
  * Centralize error handling.  
  * Continuously identify and manage "clean" vs. "dirty" data.

## ---

**Week 14: Table-Driven Methods**

This section explores table-driven methods as an alternative to complex conditional logic, offering benefits in simplicity, modifiability, and efficiency.

### **General Considerations in Using Table-Driven Methods**

* **Simpler than Complicated Logic**: Table-driven methods replace intricate if-then-else if or switch statements with a data lookup. This can significantly reduce the complexity of code that processes many similar conditions.  
  * **Example**: Classifying characters (e.g., letter, punctuation, digit) using a lookup table instead of a long if-else if chain.  
* **Easier to Modify**: When new conditions or rules need to be added, modified, or removed, it's often simpler to update data in a table than to change the program's logic directly. This makes the code more adaptable to evolving requirements.  
* **More Efficient**: Depending on the specific case, table lookups can be more efficient in terms of compute time or memory usage compared to complex conditional branching, especially when dealing with a large number of conditions.

### **Direct Access Tables**

* **Concept**: A direct access table uses an input value directly as an index into an array or similar data structure to retrieve a corresponding output.  
* **Example**: Mapping character codes to character types. If character 'a' has an ASCII value of 97, charTypeTable\[97\] could directly give its type (e.g., LETTER).  
* **Advantages**: Very fast lookup (O(1) complexity).  
* **Disadvantages**:  
  * **Memory Usage**: Can be inefficient if the range of possible input values is very large but sparsely populated (many unused indices).  
  * **Input Range**: Requires input values to be within a contiguous, manageable range that can serve as array indices.  
* **Common Use Cases**: Translating ASCII codes, handling small, discrete sets of input.

### **Indexed Access Tables**

* **Concept**: Similar to direct access, but instead of using the input directly, it maps a range of inputs to an index. Often used when the input values are not contiguous or are too large to serve as direct indices.  
  * **Example**: Instead of charTypeTable\[inputChar\], you might have charTypeTable\[charToIndexMap\[inputChar\]\]. The charToIndexMap handles the translation to a smaller, valid index.  
* **Advantages**: More memory-efficient than direct access if the input range is sparse, as you only store entries for actual data points.  
* **Disadvantages**: Involves an extra lookup step (or calculation) to determine the index.  
* **Use Case**: When input values are non-contiguous or very large, but the number of distinct values is small enough for an index mapping.

### **Stair-Step Access Tables**

* **Concept**: Used when entries in a table are valid for *ranges* of data rather than for distinct data points. You iterate through the table until the input falls within a defined range, and then use the corresponding output.  
* **Example (Grading Program)**:  
  * A table might define grade ranges:  
    * \>= 90%: A  
    * \< 90% (but \>= 75%): B  
    * \< 75% (but \>= 65%): C  
    * \< 65% (but \>= 50%): D  
    * \< 50%: F  
  * To find a student's grade, you would check their score against these ranges sequentially until a match is found.  
* **Implementation**: Often implemented with two arrays: one for the rangeLimit (e.g., \[50.0, 65.0, 75.0, 90.0, 100.0\]) and another for the grade (e.g., \["F", "D", "C", "B", "A"\]). A loop iterates through rangeLimit until studentScore \< rangeLimit\[gradeLevel\] is true, then the corresponding grade\[gradeLevel\] is assigned.  
* **Advantages**: Handles continuous or range-based inputs efficiently without complex nested if-else if statements.  
* **Disadvantages**: Requires sequential searching, so not as fast as direct access (O(N) in worst case, where N is number of ranges).

### **Summary and Revision List for Week 14**

* **General Considerations**: Table-driven methods offer simplicity, easier modification, and potential efficiency gains over complex conditional logic.  
* **Direct Access Tables**:  
  * **Concept**: Input directly serves as an index.  
  * **Pros**: Fastest lookup (O(1)).  
  * **Cons**: Can use a lot of memory if input range is large and sparse; requires contiguous integer-like input.  
* **Indexed Access Tables**:  
  * **Concept**: Input is mapped to an internal index, which then accesses the table.  
  * **Pros**: More memory-efficient for sparse, large, or non-contiguous inputs.  
  * **Cons**: Slightly slower due to index mapping.  
* **Stair-Step Access Tables**:  
  * **Concept**: Table entries define ranges, not single values.  
  * **Pros**: Excellent for range-based logic (e.g., grading, tax brackets).  
  * **Cons**: Requires sequential search (O(N)), not as fast as direct access.  
* **Exam Focus**: Be able to identify scenarios where each type of table-driven method is most appropriate. Understand the trade-offs (simplicity vs. memory vs. speed) for each. Be able to differentiate between table-driven methods and complex if-else or switch statements.

