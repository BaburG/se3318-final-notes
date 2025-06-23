# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

*   Integration
*   Version Control

---

# DAILY BUILD AND SMOKE TEST

---

# DAILY BUILD AND SMOKE TEST: BOOK

Heavily influenced from Chapter 18.

![Book cover for "Rapid Development" by Steve McConnell. The cover has a black background with yellow and white text. It features an abstract image of hands working on a complex structure. The Microsoft Press logo is at the top. Text on the cover reads: "RAPID DEVELOPMENT", "Taming Wild Software Schedules", "Steve McConnell", "Author of Code Complete", and a checkmark with "Best Practices".](image.png)

---

# DAILY BUILD AND SMOKE TEST: CONCEPT

Every file is compiled, linked, and combined into an executable program every day the program is then put through a "smoke test".

> Basically testing system to check to see whether the product “smokes” when it runs.

---

# DAILY BUILD AND SMOKE TEST: CONCEPT

*   Reduces the risk of unsuccessful or problematic integration.
*   A construction-stage process.
*   Its success depends on developers taking the process seriously and on well-designed smoke tests.

---

# DAILY BUILD AND SMOKE TEST: INTERACTIONS AND TRADE-OFFS

*   Trades small increase in project overhead for large reduction in integration risk
*   Used in conjunction with Miniature Milestones
*   Provides support needed for incremental-development lifecycle models

---

# DAILY BUILD AND SMOKE TEST: HOW DOES IT HELP?

*   It minimizes integration risk.
*   It reduces the risk of low quality.
*   It supports easier defect diagnosis.
*   It supports progress monitoring.
*   It improves morale.

---

# DAILY BUILD AND SMOKE TEST

---

# USING THE DAILY BUILD AND SMOKE TEST

> The most fundamental part of the daily build is the “daily” part.
>
> **Jim McCarthy.**

---

# USING THE DAILY BUILD AND SMOKE TEST

*   Check for broken builds. A good build should:
    *   Link all files, libraries, and other components successfully
    *   Compile all files, libraries, and other components successfully
    *   Not contain any showstopper bugs that prevent the program from being launched or that make it hazardous to operate
    *   Pass the smoke test
*   Smoke test daily.

---

# USING THE DAILY BUILD AND SMOKE TEST

*   Require developers to smoke test their code before adding it to the system.
*   Create a holding area for code that's to be added to the build.

![A diagram illustrating a pull request workflow. A "feature" branch is created from the "main branch". A "pull request" is made from the feature branch. This enters a "discussion and deployment review" box before being merged back into the main branch.](image.png)

*   Create a penalty for breaking the build.

---

# USING THE DAILY BUILD AND SMOKE TEST

*   Nightly builds.
    *   Every pull request merged that day is smoke tested
    *   and, built.
*   Build and smoke even under pressure.

---

# USING THE DAILY BUILD AND SMOKE TEST: MANAGING RISKS

*   Developers should avoid making quick fixes that will work for a particular release.
*   Developers should spend less time responding to minor problems on an ad hoc basis.

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram showing a "main" branch and a "develop" branch. Two feature branches, "feature1" and "feature2", have been created from the "develop" branch.](image.png)

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram showing the progression of branches. The "feature1" branch is shown being merged into the "develop" branch through a pull request process that includes "discussion and review" and "smoke tests". The "feature2" branch is shown as still being in progress. An annotation points to the merge on the develop branch, saying "End of Day 1. Only one PR merged and build takes place". An arrow points to the feature2 branch, saying "Another developer still working on the feature 2."](image.png)

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram. The "develop" branch, which now includes "feature1", is merged into the "main" branch. An annotation says: "A release takes place. Integration tests passes so develop branch merged to main branch." The "feature2" branch is still separate.](image.png)

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram showing the state after the first release. The "main" and "develop" branches are aligned. The "feature2" branch is still in progress, and a new "feature3" branch has been created from the "develop" branch.](image.png)

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram showing the "feature3" branch being merged into the "develop" branch. An annotation points to this merge, saying "End of Day 2. Daily Build and Testing takes place." Another annotation points to the ongoing "feature2" branch, saying "Developer 2 keeps working on the feature 2."](image.png)

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram showing the "feature2" branch now being merged into the "develop" branch. An annotation points to this merge, saying "Day 3. Developer 2 merges to develop. Daily Build and Testing takes place."](image.png)

---

# DAILY BUILD AND SMOKE TEST: EXPLAINED VISUALLY

![A Git branching diagram showing the "develop" branch, which now contains all features, being merged into the "main" branch. An annotation says: "Release 2. Integration tests run and develop merged to main."](image.png)

---

# DAILY BUILD AND SMOKE TEST: KEY POINTS

*   Build every day.
*   Smoke test every day.
*   Grow the smoke test with the product.
    *   Be sure that the test remains meaningful as the product evolves.
    *   As design change specifications has to change. Remember update rules for specification changes.
*   Make a healthy build the project's top priority.
*   Take steps to ensure that broken builds are the exception rather than the rule.
*   Don't abandon the process under pressure.

---

# SMOKE TESTS

---

# SMOKE TESTS

*   are unit tests (that integrate to code base, but not limited to that...)
*   are designed to test a method in an implementation-independent way as much as possible, as it is specified in design (declared in the interface class).
    *   One must remember that specifications should be strong or weak enough to satisfy a specific behavior.
    *   Because, smoke tests can't assume behavior as it cannot call the method in a way that violates the precondition.

---

# SMOKE TESTS: RECALL SPECIFICATIONS

```java
/**
 * An interface representing geometric shapes.
 *
 */
interface Shape {
    /**
     * Calculates the area of the shape.
     * _requires_: The shape's dimensions are set and valid.
     * _effects_: Returns the calculated area of the shape.
     */
    double calculateArea();
}
```

---

# SMOKE TESTS: RECALL SPECIFICATIONS

```java
interface Shape {
    /**
     * Calculates the area of the shape.
     * _requires_: The shape's dimensions are set and valid.
     * _effects_: Returns the calculated area of the shape.
     */
    double calculateArea();
}
```

```java
class Circle implements Shape {
    ...
    /**
     * Calculates the area of the circle.
     *
     * _requires_: The radius is a non-negative value.
     * _effects_: Returns the calculated area of the circle.
     **/
    @Override public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```

---

# SMOKE TESTS: RECALL SPECIFICATIONS

```java
interface Shape {
    /**
     * Calculates the area of the shape.
     * _requires_: The shape's dimensions are set and valid.
     * _effects_: Returns the calculated area of the shape.
     */
    double calculateArea();
}
```

```java
class Rectangle implements Shape {
    ...
    /**
     * Calculates the area of the circle.
     *
     * _requires_: The length and width are non-negative values.
     * _effects_: Returns the calculated area of the circle.
     **/
    @Override public double calculateArea() {
        return length * width;
    }
}
```

---

# SMOKE TESTS: RECALL SPECIFICATIONS

Pre-condition shifted to constructor in the implementation.

```java
/**
 * Constructs a Circle with a specified radius.
 *
 * @param radius, non-negative value. The radius of the circle.
 **/
public Circle(double radius) {
    this.radius = radius;
}
```

---

# SMOKE TESTS: RECALL SPECIFICATIONS

Post-condition remains on the method implementation as it processes and returns the value.

```java
class Circle implements Shape {
    ...
    /**
     * Calculates the area of the circle.
     *
     * @return Returns the calculated area of the circle.
     **/
    @Override public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```

---

# SMOKE TESTS

```java
static int find(int[] arr, int val)
_requires_: val occurs in arr
_effects_: returns index i such that arr[i] = val
```

*   has a strong precondition in the sense that `val` is required to be found
*   has a fairly weak postcondition in the sense that if `val` appears more than once in the array

---

# SMOKE TESTS

Considering the following specification,

```java
static int find(int[] arr, int val)
_requires_: val occurs in arr
_effects_: returns index i such that arr[i] = val
```

Does this statement good test case?

```java
assertEquals(0, find(array, 7));
```

---

# SMOKE TESTS

The following statement is not good as a "smoke test",

```java
assertEquals(0, find(array, 7)); // bad test case: violates the spec
```

*   precondition is satisfied
*   but postcondition check may not be satisfied if the implementation for find would search from last index to first index when there are multiple same elements!

Thus, test case can't cover the postcondition well enough!

---

# SMOKE TESTS

```java
int[] array = new int[] { 7, 7, 7 };
```

Good example for a "smoke test":

```java
assertEquals(7, array[find(array, 7)]);
```

*   precondition is satisfied
*   postcondition is satisfied even if find implemented to start search from first index or last index.

---

# SMOKE TESTS: POP QUIZ

What needs to be changed in the following specification

```java
static int find(int[] arr, int val)
_requires_: val occurs in arr
_effects_: returns index i such that arr[i] = val
```

in order to satisfy the following test case?

```java
assertEquals(0, find(array, 7));
```

---

# SMOKE TESTS: POP QUIZ ANSWER

```java
static int find(int[] arr, int val)
_requires_: val occurs in arr
_effects_: returns the first index i such that arr[i] = val in
           range 0..length(arr)
```

---

# SMOKE TESTS: POP QUIZ

If we change the specification as follows,

```java
static int find(int[] arr, int val)
_requires_: val occurs exactly once in arr
_effects_: returns index i such that arr[i] = val
```

would it satisfy the following test case?

```java
assertEquals(0, find(array, 7));
```

---

# SMOKE TESTS: POP QUIZ ANSWER

Yes it does but only if you change the input `array` to contain `val` once.

If you keep the input, then no! Because `array = { 7, 7, 7 }` does not satisfy the precondition!

---

End of Week 7

Thanks for listening