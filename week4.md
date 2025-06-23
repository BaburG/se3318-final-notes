# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

*   Design in Construction
*   Specifications in Construction

---

# DESIGN IN CONSTRUCTION

---

# DESIGN IN CONSTRUCTION

*   Design Challenges
*   Key Design Concepts
*   Design Building Blocks
    *   Heuristics

---

# DESIGN CHALLENGES: WHAT IS DESIGN?

*   Design is the activity that links requirements to coding and debugging.
*   A good top-level design provides a structure that can safely contain multiple lower-level designs.
*   Good design is useful on small projects and indispensable on large projects.

---

# DESIGN CHALLENGES: DESIGN ITSELF

> "..as one that could be clearly defined only by solving it, or by solving part of it (1973). This paradox implies, essentially, that you have to “solve” the problem once in order to clearly define it and then solve it again to create a solution that works."

---

# DESIGN CHALLENGES: DESIGN PROCESS

> *making mistakes is the point of design*

*   Cheaper to make mistakes on designs and correct them
*   than, build software and correct it later.

> *How much detail is enough?*
>
> *“When you’re out of time.”*

---

# DESIGN CHALLENGES: TRADEOFFS AND PRIORITIES

*   **Define clear goals:** Defining the project's goals and objectives.
*   **Identify stakeholders and their needs:** Understand the needs and priorities of all stakeholders.
*   **Evaluate design alternatives:** Consider effect of different design approaches on performance, security, usability, and maintainability.
*   **Weigh pros and cons:** Evaluate the trade-offs for development effort, cost and long-term maintenance.
*   **Communicate and document:** Clearly communicate your design decisions and the rationale behind them to all stakeholders.

---

# DESIGN CHALLENGES: RESTRICTIONS

*   **Technical Constraints:** Hardware limitations, software dependencies, programming language limitations.
*   **Project Constraints:** Time, budget, resources (e.g. developer skills, designers, testers).
*   **Non-functional Requirements:** Performance, security, usability.
*   **External Constraints:** Legal and regulatory requirements, industry standards and best practices, third-party integrations.

---

# DESIGN CHALLENGES: NON-DETERMINISM

*   **Define clear goals and constraints:** Establishing clear project goals, user needs, and technical constraints.
*   **Embrace iteration and feedback:** Utilize iterative design methodologies with continuous feedback loops to incorporate new information.
*   **Document design decisions:** Clearly document the rationale behind design choices, even if they are made through an iterative and non-deterministic process.
*   **Effective communication:** Maintain open communication with all stakeholders to manage expectations, address concerns, and ensure alignment on the evolving design direction.

---

# DESIGN CHALLENGES: HEURISTIC PROCESS

*   Since design is non-deterministic, design techniques tend to be heuristics.
*   Design involves trial and error.
*   A tool or technique works well on one job might not work on the next project.
*   No tool is right for everything.

---

# DESIGN CHALLENGES: EMERGENT

*   Don't spring fully formed out of someone.
*   Evolve and improve through
    *   design reviews,
    *   informal discussions,
    *   development process
    *   code revisions.

---

# KEY DESIGN CONCEPTS: MANAGING COMPLEXITY

*   **Accidental and Essential Difficulties** The properties a thing just happens to have
*   **Importance of Managing Complexity** *"When a project reaches the point at which no one completely understands the impact that code changes in one area will have on other areas, progress grinds to a halt."*

---

# KEY DESIGN CONCEPTS: MANAGING COMPLEXITY

*   Ineffective design arise from:
    *   A **complex** solution to a **simple** problem
    *   A **simple, incorrect** solution to a **complex** problem
    *   An **inappropriate, complex** solution to a **complex** problem
*   Two-prong approach to manage complexity:
    *   Minimize the amount of **essential complexity** that anyone has to deal with **at single time**.
    *   Keep **accidental complexity** from needlessly proliferating.

---

# KEY DESIGN CONCEPTS: DESIRABLE CHARACTERISTICS OF A DESIGN

*   **Ease of maintenance.** Continually imagine the questions a maintainer would ask.
*   **Loose coupling.** Use good abstractions principles in class interfaces.
*   **Extensibility.** Enhance a system without causing violence to the underlying structure.
*   **Reusability.** Pieces of the system can be reused in other systems.
*   **High fan-in/Low-to-medium fan-out.** High number of classes that use a given class and class use a low-to-medium number of other classes.
*   **Stratification.** Design the layer so that it hides the poor quality of the old code.

---

# KEY DESIGN CONCEPTS: LEVEL OF DETAIL

*(Image: A series of diagrams showing the decomposition of a system)*

1.  The system
2.  Organization into subsystems.
3.  The subsystems are further divided into classes.
4.  The classes are divided into routines and data.
5.  The inside of each routine is also designed

---

# LEVEL OF DETAIL: LEVEL 1: SOFTWARE SYSTEM

*   Higher level combination of classes.
    *   Subsystems
    *   Packages
    *   Abstractions

---

# LEVEL OF DETAIL: LEVEL 2: DIVISION INTO SUBSYSTEMS OR PACKAGES

*(Image: A diagram showing six independent subsystems: User Interface, Graphics, Data Storage, Application Level Classes, Business Rules, Enterprise-Level Tools.)*

---

# LEVEL OF DETAIL: LEVEL 2: DIVISION INTO SUBSYSTEMS OR PACKAGES

*(Image: The same six subsystems are now connected by a complex web of arrows, indicating high coupling and a "spaghetti" architecture where everything depends on everything else.)*

---

# LEVEL OF DETAIL: LEVEL 2: DIVISION INTO SUBSYSTEMS OR PACKAGES

*(Image: The same six subsystems are now connected with a clear, layered set of dependencies, showing a well-structured architecture. For example, User Interface depends on Graphics and Application Level Classes. Application Level Classes depends on Business Rules and Enterprise-Level Tools. Data Storage is connected to Application Level Classes and Business Rules.)*

---

# LEVEL OF DETAIL: LEVEL 3: DIVISION INTO SUBSYSTEMS OR PACKAGES

*   **Business rules** High level restrictions and rules that govern the business system.
*   **User interface** A subsystem to isolate user-interface components so that the user interface can evolve without damaging the rest of the program.
*   **Database access** Centralize database operations in one place and reduce the chance of errors in working with the data.
*   **System dependencies** Package operating-system dependencies into a subsystem for the same reason you package hardware dependencies.

---

# LEVEL OF DETAIL: LEVEL 4: DIVISION INTO ROUTINES

*   Defining routines for class interface.
*   Writing specifications for routines.

---

# LEVEL OF DETAIL: LEVEL 5: INTERNAL ROUTINE DESIGN

*   Writing pseudocode.
*   Looking up algorithms in reference books.
*   Organize source code.

---

# SPECIFICATIONS IN CONSTRUCTION

---

# SPECIFICATIONS IN CONSTRUCTION: WHY SPECIFICATIONS?

*   Different programmers on a team have "different" specifications in mind.
*   When the program fails, it's hard to determine where the error is.
*   Precise specifications in the code spare you the agony of puzzling over where a fix should go.
*   Good for the client because they spare the task of reading code

---

# SPECIFICATIONS IN CONSTRUCTION: WHY SPECIFICATIONS?

**Specification Comment**

**add**

`public BigInteger add(BigInteger val)`

Returns a BigInteger whose value is (this + val).

**Parameters:**
`val` - value to be added to this BigInteger.

**Returns:**
`this + val`

**Implementation Code**

```java
1207 public BigInteger add(BigInteger val) {
1208     if (val.signum == 0)
1209         return this;
1210     if (signum == 0)
1211         return val;
1212     if (val.signum == signum)
1213         return new BigInteger(add(mag, val.mag), signum);
1214
1215     int cmp = compareMagnitude(val);
1216     if (cmp == 0)
1217         return ZERO;
1218     int[] resultMag = (cmp > 0 ? subtract(mag, val.mag)
1219                            : subtract(val.mag, mag));
1220     resultMag = trustedStripLeadingZeroInts(resultMag);
1221
1222     return new BigInteger(resultMag, cmp == signum ? 1 : -1);
1223 }
```

---

# SPECIFICATIONS IN CONSTRUCTION: WHY SPECIFICATIONS?

*(Image: A diagram showing a cycle. The 'client' provides 'input' which passes through a 'specification' firewall to the 'implementor'. The 'implementor' performs a 'computation' and produces 'output', which passes back through the 'acts as firewall' specification to the client.)*

*   They give the implementor **freedom** to change the implementation without telling clients.
*   Allow the implementor to skip an **expensive check** that is no longer necessary.
*   Acts as a **firewall** between client and implementor.
*   Shields the client from the details of the **workings** of the unit.
*   Shields the implementor from the details of the **usage** of the unit

---

# SPECIFICATIONS IN CONSTRUCTION: WHY SPECIFICATIONS?

```java
static int findFirst(int[] arr, int val) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == val) return i;
    }
    return arr.length;
}

static int findLast(int[] arr, int val) {
    for (int i = arr.length -1; i >= 0; i--) {
        if (arr[i] == val) return i;
    }
    return -1;
}
```

*   when `val` occurs at exactly one index of the array, the two methods behave the same
*   when `val` is missing, `findFirst` returns the length of `arr` and `findLast` returns -1
*   when `val` appears twice, `findFirst` returns the lower index and `findLast` returns the higher

---

# SPECIFICATIONS IN CONSTRUCTION: WHY SPECIFICATIONS?

*(Image: The firewall diagram now includes labels for 'satisfies precondition' on the input side and 'satisfies postcondition' on the output side.)*

*   **Requires:**
    *   `val` to occur exactly once in `arr`
*   **Effects:**
    *   Returns index `i` such that `arr[i]=val`

```
static int find(int[] arr, int val)
_requires_: val occurs exactly once in arr
_effects_: returns index i such that arr[i]
```

---

# SPECIFICATIONS IN CONSTRUCTION: SPECIFICATION STRUCTURE

*if the precondition holds when the method is called, then the postcondition must hold when the method completes.*

*(Image: The firewall diagram with precondition and postcondition labels.)*

*   a **precondition**, indicated by the keyword `requires`
    *   The precondition is an obligation on the **client**
*   a **postcondition**, indicated by the keyword `effects`
    *   The postcondition is an obligation on the **implementer** of the method.

---

# SPECIFICATIONS IN CONSTRUCTION: SPECIFICATION STRUCTURE

*(Image: A diagram showing that when the client's input 'does not satisfy precondition', the implementor's output is 'unconstrained', indicated by a question mark.)*

If the precondition does **not** hold when the method is called, the implementation is **not** bound by the postcondition.

---

# SPECIFICATIONS IN CONSTRUCTION: SPECIFICATION STRUCTURE

*(Image: A diagram showing the boundary between client and implementor. 'parameters', 'return value', and 'exceptions' are on the client side of the boundary. 'local variables', 'implementation details', and 'private fields' are on the implementor side.)*

*   A specification of a method can talk about the **parameters** and **return value** of the method,
*   It should never talk about **local variables** of the method or **private fields** of the method's class

---

# SPECIFICATION STRUCTURE: DETERMINISTIC VS UNDERDETERMINED

```java
static int findFirst(int[] arr, int val) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == val) return i;
    }
    return arr.length;
}
```

```java
static int findLast(int[] arr, int val) {
    for (int i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == val) return i;
    }
    return -1;
}
```

```java
static int findExactlyOne(int[] arr, int val)
_requires_: val occurs **exactly once** in arr
_effects_: returns index i such that arr[i] = val
```

---

# SPECIFICATION STRUCTURE: DETERMINISTIC

```java
static int findExactlyOne(int[] arr, int val)
_requires_: val occurs **exactly once** in arr
_effects_: returns index i such that arr[i] = val
```

*   Only one return value and one final state is possible.
*   One valid input per valid output.

Both `findFirst` and `findLast` satisfy the specification, the two implementations are equivalent and substitutable for one another.

---

# SPECIFICATION STRUCTURE: UNDERDETERMINED

```java
static int findOneOrMore,AnyIndex(int[] arr, int val)
requires: val occurs in arr
effects: returns index i such that arr[i] = val
```

This specification allows multiple valid outputs for the same input!

Both `findFirst` and `findLast` satisfy the specification, but returned index is for which one?

Will it search from left to right or right to left?

---

# SPECIFICATION STRUCTURE: DECLARATIVE VS OPERATIONAL

*   **Declarative** specifications
    *   don't give details of intermediate steps;
    *   give properties of the final outcome, and how it's related to the initial state.
*   **Operational** specifications
    *   give a series of steps that the method performs;
    *   pseudocode descriptions are operational.

> Don't use the specification comment to explain the implementation for a maintainer. Instead, use comments within the body of the method.

---

# SPECIFICATION STRUCTURE: DECLARATIVE EXAMPLES

```java
static boolean startsWith(String str, String prefix)
_effects_: returns true if and only if there exists String suffix
           such that prefix + suffix == str
```

```java
static boolean startsWith(String str, String prefix)
_effects_: returns true if and only if there exists integer i
           such that str.substring(0, i) == prefix
```

```java
static boolean startsWith(String str, String prefix)
_effects_: returns true if the first prefix.length() characters of str
           are the characters of prefix, false otherwise
```

---

# SPECIFICATION STRUCTURE: STRONGER VS WEAKER

When you want to change a method:

*   how its implementation behaves,
*   the specification itself.

---

# SPECIFICATION STRUCTURE: STRONGER VS WEAKER

An implementation that satisfies S2 can be used to satisfy S1 if

*   S2's precondition is weaker than or equal to S1's,
*   S2's postcondition is stronger than or equal to S1's, for the states that satisfy S1's precondition.

---

# SPECIFICATION STRUCTURE: STRONGER VS WEAKER

```java
static int findExactlyOne(int[] a, int val)
_requires_: val occurs **exactly once** in a
_effects_: returns index i such that a[i] = val
```

can be replaced with;

```java
static int findOneOrMore,AnyIndex(int[] a, int val)
_requires_: val occurs **at least once** in a
_effects_: returns index i such that a[i] = val
```

which has a weaker precondition.

---

# SPECIFICATION STRUCTURE: STRONGER VS WEAKER

```java
static int findOneOrMore,AnyIndex(int[] a, int val)
_requires_: val occurs **at least once** in a
_effects_: returns index i such that a[i] = val
```

can be replaced with;

```java
static int findOneOrMore,FirstIndex(int[] a, int val)
_requires_: val occurs **at least once** in a
_effects_: returns **lowest** index i such that a[i] = val
```

---

# SPECIFICATIONS IN CONSTRUCTION: MUTATING METHODS

```java
static boolean addAll(List<T> list1, List<T> list2)
_requires_: list1 != list2
_effects_: modifies list1 by adding the elements of list2 to the end of
           it, and returns true if list1 changed as a result of call
```

*   **Postcondition.** It gives two constraints: the first telling us how `list1` is modified, and the second telling us how the return value is determined.
*   **Precondition.** It tells us that the behavior of the method if you attempt to add the elements of a list to itself is undefined.

---

# SPECIFICATIONS IN CONSTRUCTION: EXAMPLES

A mutating method specification:

```java
static void sort(List<String> lst)
_requires_: nothing
_effects_: puts lst in sorted order, i.e. lst[i] <= lst[j]
           for all 0 <= i < j < lst.size()
```

and, a method that does not mutate its argument:

```java
static List<String> toLowerCase(List<String> lst)
_requires_: nothing
_effects_: returns a new list t where t[i] = lst[i].toLowerCase()
```

---

# SPECIFICATIONS IN CONSTRUCTION: SPECIFICATIONS IN JAVA

*   Static type declarations are effectively part of the precondition and postcondition of a method.
*   The rest of the contract must be described in a comment preceding the method.

---

# SPECIFICATIONS IN CONSTRUCTION: SPECIFICATIONS IN JAVA

```java
static int find(int[] arr, int val)
_requires_: val occurs exactly once in arr
_effects_: returns index i such that arr[i] = val
```

```java
/**
 * Find a value in an array.
 * @param arr array to search, requires that val occurs exactly once
 *            in arr
 * @param val value to search for
 * @return index i such that arr[i] = val
 */
static int find(int[] arr, int val)
```

*   Parameters are described by `@param` clauses
*   Results are described by `@return` and `@throws` clauses.
*   Put the preconditions into `@param` where possible, and postconditions into `@return` and `@throws`. (See Javadoc Comments and How to Write Doc Comments)

---

# SPECIFICATIONS IN CONSTRUCTION: GOOD SPECIFICATIONS

*   Coherent
*   Informative
*   Strong Enough
*   Weak Enough
*   Should use Abstract Types

---

# GOOD SPECIFICATIONS: COHERENT

The specification shouldn't have;

*   lots of different cases,
*   long arguments lists,
*   deeply nested conditions,
*   boolean flags.

---

# GOOD SPECIFICATIONS: COHERENT

```java
static int sumFind(int[] a, int[] b, int val)
_effects_: returns the sum of all indices in arrays a and b at which
           val appears
```

*   Finding in two arrays and summing the indexes are not really related. Better to split into two methods.

---

# GOOD SPECIFICATIONS: COHERENT

```java
public static int LONG_WORD_LENGTH = 5;
public static String longestWord;

/**
 * Update longestWord to be the longest element of words, and print
 * the number of elements with length > LONG_WORD_LENGTH to the console.
 * @param words list to search for long words
 */
public static void countLongWords(List<String> words)
```

*   Not coherent as well. It does two different things, even use global variables... Should have been split into two different methods.

---

# GOOD SPECIFICATIONS: INFORMATIVE

```java
static V put (Map<K,V> map, K key, V val)
_requires_: val may be null, and map may contain null values
_effects_: inserts (key, val) into the mapping,
           overriding any existing mapping for key, and
           returns old value for key, unless none,
           in which case it returns null
```

*   The precondition does not rule out `null` values so the map can store `null`'s.
*   The postcondition uses `null` as a special return value for a missing key.

If `null` is returned, one can't tell whether the **key was not bound previously**, or whether **it was in fact bound to null**.

This is not a very good design, because the return value is useless unless you know for sure that you didn't insert `null`'s.

---

# GOOD SPECIFICATIONS: STRONG ENOUGH

```java
static void addAll(List<T> list1, List<T> list2)
_effects_: adds the elements of list2 to list1,
           unless it encounters a null element,
           at which point it throws a NullPointerException
```

*   A client won't be able to determine what mutations have actually been made.
*   In the case a `NullPointerException` is thrown, the client is left to figure out on their own which elements of `list2` actually made it to `list1`.

---

# GOOD SPECIFICATIONS: WEAK ENOUGH

```java
static File open(String filename)
_effects_: opens a file named filename
```

*   Is the file opened for reading or writing?
*   Does it already exist or is it created?

And it's too strong, since there's no way it can guarantee to open a file!

Instead, the specification should say something much weaker: that it attempts to open a file, and if it succeeds, the file has certain properties.

---

# GOOD SPECIFICATIONS: ABSTRACT TYPES

*   Prefer abstract types in method signatures and specifications. (e.g. `List`, `Set`, `Map`, `Reader` instead of `ArrayList`, `HashSet`, `HashMap`, `FileReader`)

```java
static ArrayList<T> reverse(ArrayList<T> list)
_effects_: returns a new list which is the reversal of list, i.e.
           newList[i] == list[n-i-1]
           for all 0 <= i < n, where n = list.size()
```

If implementation does not specifically depend on `ArrayList` one should prefer the abstract type instead!

---

End of Week 4

Thanks for listening