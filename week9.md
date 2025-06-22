# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# WORKING CLASSES

---

# WORKING CLASSES

*   Abstract Data Types
*   Liskov Substitution Principle
*   Law of Demeter
*   Good Encapsulation
*   Good Abstractions
*   Good Inheritance
*   Member Functions
*   Class Internals

---

# ABSTRACT DATA TYPES

*   ABSTRACTION
*   USER-DEFINED TYPES
*   LISKOV SUBSTITUTION PRINCIPLE (LSP)
*   LAF OF DEMETER

---

# ABSTRACT DATA TYPES: ABSTRACTION

*   **Abstraction.** Lets you omit or hide low-level details with a simpler, higher-level idea.
*   **Modularity.** System can be divided into components or modules, each can be designed, implemented, tested separately from the rest of the system.
*   **Encapsulation.** Hiding details of a module's implementation from the rest of the system, enforcing checks on how details change.
*   **Separation of concerns.** Making a feature the responsibility of a single module.

---

# ABSTRACT DATA TYPES: USER-DEFINED TYPES

*   A type provides an abstraction for real world object or a meta object that absorbs complexity of operations.
*   A type is characterized by the operations you can perform on it.

---

# ABSTRACT DATA TYPES: LISKOV SUBSTITUTION PRINCIPLE

*   Objects of a superclass shall be replaceable with objects of its subclasses without breaking the application.
*   An overridden method of a subclass needs to accept the same input parameter values as the method of the superclass. *(You can implement less restrictive validation rules, but you are not allowed to enforce stricter ones in your subclass.)*
*   The return value of a method of the subclass needs to comply with the same rules as the return value of the method of the superclass.

---

# ABSTRACT DATA TYPES: LSP AND PRECONDITION

An implementation that satisfies S2 can be used to satisfy S1 if
*   S2's precondition is weaker than or equal to S1's,

> From Liskov: You can implement less restrictive validation rules, but you are not allowed to enforce stricter ones in your subclass

---

# ABSTRACT DATA TYPES: LSP AND POSTCONDITION

An implementation that satisfies S2 can be used to satisfy S1 if
*   S2's postcondition is stronger than or equal to S1's, for the states that satisfy S1's precondition.

> From Liskov: The return value of a method of the subclass needs to comply with the same rules as the return value of the method of the superclass.

---

# LAW OF DEMETER

*   An object a can request a service (call a method) of an object instance b
*   The object a should not "reach through" object b to access yet another object, C, to request its services.

Doing so would mean that object a implicitly requires greater knowledge of object b's internal structure.

---

# LAW OF DEMETER

![Diagram illustrating the Law of Demeter. An object 'a:A' has two valid green arrows pointing to methods 'doB()' and 'dox()' on object 'b:B'. A red line with a perpendicular stop bar points from 'a:A' to method 'doC()' on an inner object 'c:C' within 'b:B', indicating an invalid call.](image.png)

**OCR Text from Image:**
*   a:A
*   b:B
*   c:C
*   doc()
*   doB()
*   dox()

---

# GOOD PROGRAMMING HABITS FOR CLASSES

*   GOOD ENCAPSULATION
*   GOOD ABSTRACTION
*   GOOD INHERITANCE
*   MEMBER FUNCTIONS

---

# GOOD ENCAPSULATION

*   `VisibilityModifier`
*   `FinalClass`
*   `HideUtilityClassConstructor`
*   `DesignForExtension`

---

# GOOD ENCAPSULATION: VisibilityModifier

*   Checks visibility of class members.
*   Only `static final`, immutable or specifically annotated members may be `public`.
*   All other class members must be `private` unless.

---

# GOOD ENCAPSULATION: VisibilityModifier

*   Enforces encapsulation.
*   Forcing all fields of class to have private modifier.
*   Protected disallowed by default, needs to be allowed explicitly.

---

# GOOD ENCAPSULATION: VisibilityModifier

```java
class Example1 {
    // violation below, must have a visibility modifier 'must be private'
    int field1;
    // violation below, protected not allowed 'must be private'
    protected String field2;
    // violation below, not final 'must be private'
    public int field3 = 42;
    // violation below, public immutable fields are not allowed 'must be private'
    public final int field5 = 42;
    // violation below, HashSet is mutable 'must be private'
    public final Set<String> mySet1 = new HashSet<>();
    // violations below, immutable type not in config 'must be private'
    public final ImmutableSet<String> mySet2 = null;
    public final ImmutableMap<String, Object> objects1 = null;
}
```

```java
private int myPrivateField1;

public static final int field4 = 42;
```

---

# GOOD ENCAPSULATION: FinalClass

*   Ensures that identified classes that can be effectively declared as `final` are explicitly marked as `final`.
*   Private classes with no declared constructors.
*   Classes with any modifier, and contains only private constructors.

---

# GOOD ENCAPSULATION: FinalClass

```java
public class Example1 { // ok, since it has a public constructor
    final class A { // OK
        private A() {
        }
    }

    class B { // violation, 'Class B should be declared as final.'
        private B() {
        }
    }
}
```

---

# GOOD ENCAPSULATION: FinalClass

```java
public class Example1 { // ok, since it has a public constructor
    class C { // ok, since it has a public constructor
        int field1;
        String field2;

        private C(int value) {
            this.field1 = value;
            this.field2 = "";
        }

        public C(String value) { // <-
            this.field2 = value;
            this.field1 = 0;
        }
    }
}
```

---

# GOOD ENCAPSULATION: FinalClass

```java
public class Example1 { // ok, since it has a public constructor
    class AnonymousInner { // ok, class has an anonymous inner class.
        public final AnonymousInner ONE
            = new AnonymousInner() {
        };
        private AnonymousInner() {
        }
    }
}
```

---

# GOOD ENCAPSULATION: FinalClass

```java
public class Example1 { // ok, since it has a public constructor
    class Class1 {
    }

    private class Class2 { // violation, 'Class Class2 should be declared as final'
    }

    public class Class3 {
    }
}
```

---

When do you need private constructors?

> Hint: Review design patterns.

---

# GOOD ENCAPSULATION: HideUtilityClassConstructor

*   Ensures that utility classes do not have a public constructor.
*   Instantiating utility classes does not make sense.
    *   The constructors should either be private,
    *   or if subclassing allowed protected.

---

# GOOD ENCAPSULATION: HideUtilityClassConstructor

> If subclassing allowed for utility classes, then exception should be thrown to disallow initialization.

```java
public class StringUtils // not final to allow subclassing
{
    protected StringUtils() {
        // prevents calls from subclass
        throw new UnsupportedOperationException();
    }

    public static int count(char c, String s) {
        // ...
    }
}
```

---

# GOOD ENCAPSULATION: HideUtilityClassConstructor

```java
class Test { // violation, class only has a static method and a constructor
    public Test() {
    }
    public static void fun() {
    }
}
```

---

# GOOD ENCAPSULATION: HideUtilityClassConstructor

```java
class Foo { // OK
    private Foo() {
    }
    static int n;
}
```

---

# GOOD ENCAPSULATION: HideUtilityClassConstructor

```java
class Bar { // OK
    protected Bar() {
        // prevents calls from subclass
        throw new UnsupportedOperationException();
    }
}
```

---

# GOOD ENCAPSULATION: HideUtilityClassConstructor

```java
class UtilityClass { // violation, class only has a static field
    static float f;
}
```

---

# GOOD ENCAPSULATION: DesignForExtension

*   Checks that classes are designed for extension (subclass creation).
*   Check finds classes that have overridable methods and have non-empty implementation.
*   Protects superclasses against being broken by subclasses.
*   Subclasses are limited in their flexibility.

> It enforces a programming style where superclasses provide empty "hooks" that can be implemented by subclasses.

---

# GOOD ENCAPSULATION: DesignForExtension

```java
public abstract class Plant {
    private String roots;
    private String trunk;

    protected void validate() {
        if (roots == null) throw new IllegalArgumentException("No roots!");
        if (trunk == null) throw new IllegalArgumentException("No trunk!");
    }
    public abstract void grow();
}
```

```java
public class Tree extends Plant {
    private List leaves;

    @Overrides
    protected void validate() {
        super.validate();
        if (leaves == null) throw new IllegalArgumentException("No leaves!");
    }

    public void grow() {
        validate();
    }
}
```

---

# GOOD ENCAPSULATION: DesignForExtension

```java
public abstract class Plant {
    private String roots;
    private String trunk;

    private void validate() {
        if (roots == null) throw new IllegalArgumentException("No roots!");
        if (trunk == null) throw new IllegalArgumentException("No trunk!");
        validateEx();
    }

    protected void validateEx() {}

    public abstract void grow();
}
```

---

# GOOD ENCAPSULATION: DesignForExtension

```java
public abstract class Foo {
    private int bar;
    public int m1() {return 2;} // Violation. No javadoc.
    public int m2() {return 8;} // Violation. No javadoc.
    @Override
    public String toString() { // Violation. No javadoc for @Override method.
        return "";
    }
}
```

---

# GOOD ENCAPSULATION: DesignForExtension

```java
public abstract class Foo {
    private int bar;
    private void m3() {m4();} // OK. Private method.
    protected void m4() { } // OK. No implementation.
    public abstract void m5(); // OK. Abstract method.
}
```

```java
public abstract class Foo {
    private int bar;
    /**
     * This implementation ...
     * @return some int value.
     */
    public int m6() {return 1;} // OK. Have javadoc on overridable method.
    /**
     * This
     * implementation ...
     */
    public int m7() {return 2;} // OK. Have javadoc on overridable method.
}
```

---

# GOOD ABSTRACTION

*   `AbstractClassName`
*   `ClassDataAbstractionCoupling`
*   `InterfaceIsType`

---

# GOOD ABSTRACTION: AbstractClassName

*   Ensures that the names of abstract classes conforming to some pattern.
*   Check that abstract modifier exists.
*   Abstract classes are convenience base class implementations of interfaces.

---

# GOOD ABSTRACTION: AbstractClassName

```java
class Example1 {
    abstract class AbstractFirst {}
    abstract class Second {} // violation 'must match pattern'
    class AbstractThird {} // violation 'must be declared as 'abstract''
    class Fourth {}
    abstract class GeneratorFifth {}
    // violation above 'must match pattern'
    class GeneratorSixth {}
}
```

---

# GOOD ABSTRACTION: ClassDataAbstractionCoupling

*   Number of instantiations of other classes within the given class or record.

> Any data type with other data types as members or local variable that is an instantiation (object) of another class has Data Abstraction Coupling (DAC).

---

# GOOD ABSTRACTION: ClassDataAbstractionCoupling

```java
class InputClassCoupling {
    Set set = new HashSet(); // HashSet ignored due to default excludedClasses proper
    Map map = new HashMap(); // HashMap ignored due to default excludedClasses proper
    Date date = new Date(); // Counted, 1
    Time time = new Time(); // Counted, 2
    Place place = new Place(); // Counted, 3
}
```

---

# GOOD ABSTRACTION: ClassDataAbstractionCoupling

```java
class InputClassCoupling {
    Set set = new HashSet(); // HashSet ignored due to default excludedClasses proper
    Map map = new HashMap(); // HashMap ignored due to default excludedClasses proper
    Date date = new Date(); // Counted, 1
    Time time = new Time(); // Counted, 2
    // instantiation of 5 other user defined classes
    Place place = new Place(); // violation, total is 8
}
```

---

# GOOD ABSTRACTION: ClassDataAbstractionCoupling

```xml
<module name="ClassDataAbstractionCoupling">
    <property name="max" value="3"></property>
</module>
```

```java
public class Test { // OK
    A a1_1 = new A1(4, 5);
    A a1_2 = new A1(4, 5); // Instance of same class, does not count
    A a2 = new A2(4, 5);
    B b1 = new B(4, 5);
}
```

---

# GOOD ABSTRACTION: ClassDataAbstractionCoupling

```xml
<module name="ClassDataAbstractionCoupling">
    <property name="max" value="3"></property>
</module>
```

```java
public class Test { // Violation
    A a1_1 = new A1(4, 5);
    //A a1_2 = new A1(4, 5); // Instance of same class, does not count
    A a2 = new A2(4, 5);
    B b1 = new B(4, 5);
    C c1 = new C(4, 5); // Fourth different type defined.
}
```

---

# GOOD ABSTRACTION: ClassDataAbstractionCoupling

```xml
<module name="Checker">
    <module name="TreeWalker">
        <module name="ClassDataAbstractionCoupling">
            <property name="excludedPackages" value="a.b"></property>
        </module>
    </module>
</module>
```

```java
package a.b;

import a.b.Bar;
import a.b.c.Baz;

class Foo {
    Bar bar; // Will be ignored, located inside ignored a.b package
    Baz baz; // Will not be ignored, located inside a.b.c package
    Data data; // Will not be ignored, same file

    class Data {
        Foo foo; // Will not be ignored, same file
    }
}
```

---

# GOOD ABSTRACTION: InterfaceIsType

An interface should describe a type.

> Joshua Bloch, Effective Java, Item 17 - Use Interfaces only to define types.

*   Inappropriate to define an interface that does not contain any methods but only constants.

---

# GOOD ABSTRACTION: InterfaceIsType

```java
// violation below, 'interfaces should describe a type and hence have methods.'
interface Test1 {
    int a = 3;
}
```

```java
// ok below, because marker interfaces are allowed by default.
interface Test2 {
}
```

```java
interface Test3 { // ok, because it has a method.
    int a = 3;
    void test();
}
```

---

# GOOD ABSTRACTION: InterfaceIsType

```xml
<module name="Checker">
    <module name="TreeWalker">
        <module name="InterfaceIsType">
            <property name="allowMarkerInterfaces" value="false"></property>
        </module>
    </module>
</module>
```

This disables marker interfaces and enforce that "interface should describe a type and have methods"

```java
// below example now violates, 'interfaces should describe a type and hence have me'
interface Test2 {
}
```

---

# GOOD INHERITANCE

*   `FinalClass` (WE HAVE SEEN IT IN GOOD ABSTRACTION)
*   `ClassFanOutComplexity`
*   `AvoidStarImport`
*   `MissingOverride`

---

# GOOD INHERITANCE: ClassFanOutComplexity

*   The number of other types a given class / record / interface / enum / annotation relies on.
*   The square of this has been shown to indicate the amount of maintenance required in functional programs (on a file basis) at least.

> If a class depends on 5 types then maintenance cost ~25 units (grows quadratically)

---

# GOOD INHERITANCE: ClassFanOutComplexity

> "Fan-out"; refers to the number of distinct classes or types that a class directly uses.

1.  Iterates over type references.
2.  Classes imported with direct import (e.g. `import java.math.BigDecimal`) or referenced over package name (e.g. `java.math.BigDecimal value`).
3.  If class name excluded it does not increase complexity.

---

# GOOD INHERITANCE: ClassFanOutComplexity

![Yoda meme with text overlay. Top text: LOOSE COUPLING. Bottom text: IN CLASS INTERFACES USE GOOD ABSTRACTION PRINCIPLES.](image.png)
*imgflip.com*

> High fan-out = High Coupling

A class that depends on many others is harder to maintain.

*   Changes in any of these classes might break your class.
*   It becomes harder to understand and test in isolation.

---

# GOOD INHERITANCE: ClassFanOutComplexity

```xml
<module name="ClassDataAbstractionCoupling">
    <property name="max" value="3"></property>
</module>
```

```java
public class Test { // Violation
    A a1_1 = new A1(4, 5);
    A a1_2 = new A1(4, 5); // Counts even though instance of same class
    A a2 = new A2(4, 5);
    B b1 = new B(4, 5);
}
```

---

# GOOD INHERITANCE: AvoidStarImport

![Bernie Sanders meme. Text overlay: "I am once again asking reduce coupling".](image.png)
*imgflip.com*

*   Checks that there are no import statements that use the `*` notation.
*   Importing all classes from a package or static members from a class leads to tight coupling.

---

# GOOD INHERITANCE: AvoidStarImport

```java
import java.util.Scanner;
import java.io.*;               // violation
import static java.lang.Math.*; // violation
import java.util.*;             // violation
import java.net.*;              // violation
```

---

# GOOD INHERITANCE: MissingOverride

*   Verifies that the `@Override` annotation is present when the `@inheritDoc` javadoc tag is present.

---

# GOOD INHERITANCE: MissingOverride

```java
class Example1 extends ParentClass1 {
    /** {@inheritDoc} */
    @Override
    public void test1() { // OK
    }
    
    /** {@inheritDoc} */
    public void test2() { // violation, 'include @java.lang.Override'
    }
}
```

```java
class Example1 extends ParentClass1 {
    /** {@inheritDoc} */
    // violation below '{@inheritDoc} tag is not valid at this location.'
    private void test3() {
    }

    /** {@inheritDoc} */
    // violation below '{@inheritDoc} tag is not valid at this location.'
    public static void test4() {
    }
}
```

---

# MEMBER FUNCTIONS

*   `MissingCtor`
*   `OverloadedMethodsDeclarationOrder`
*   `MethodCountCheck`

---

# MEMBER FUNCTIONS: MissingCtor

> Abstract classes serve as templates and cannot be instantiated on their own.
>
> Requiring abstract classes to have constructors would impose unnecessary constraints.

*   Checks that classes (except abstract ones) define a constructor and don't rely on the default one.

---

# MEMBER FUNCTIONS: MissingCtor

```java
class ExampleOk { // OK
    private int a;
    ExampleOk(int a) {
        this.a = a;
    }
}
```

```java
class ExampleDefaultCtor { // OK
    private String s;
    ExampleDefaultCtor() {
        s = "foobar";
    }
}
```

```java
abstract class AbstractExample { // OK
    public abstract void test() {}
}
```

```java
class InvalidExample { // violation, class must have a constructor.
    public void test() {}
}
```

---

# MEMBER FUNCTIONS: OverloadMethodsDeclarationOrder

*   Checks that overloaded methods are grouped together.

---

# MEMBER FUNCTIONS: OverloadMethodsDeclarationOrder

Correct grouping of overloaded methods example.

```java
public void foo(int i) {}
public void foo(String s) {}
public void foo(String s, int i) {}
public void foo(int i, String s) {}
public void notFoo() {}
```

---

# MEMBER FUNCTIONS: OverloadMethodsDeclarationOrder

Incorrect grouping of overloaded methods.

```java
public void foo(int i) { } // OK
public void foo(String s) {} // OK
public void notFoo() { } // violation. Have to be after foo(String s, int i)
public void foo(int i, String s) {}
public void foo(String s, int i) {}
```

---

# MEMBER FUNCTIONS: MethodCountCheck

*   Checks the number of methods declared in each type declaration by access modifier or total count.

---

# MEMBER FUNCTIONS: MethodCountCheck

```java
public class ExampleClass {
    public enum Colors {
        RED, GREEN, YELLOW;
        public String getRGB() { ... } // NOT counted towards ExampleClass
    }

    public void example() { // counted towards ExampleClass
        Runnable r = (new Runnable() {
            public void run() { ... } // NOT counted towards ExampleClass, won't produce
        });
    }
}
```

---

# CLASS INTERNALS

*   `InnerTypeLast`
*   `HideUtilityClassConstructor`(WE'VE SEEN THIS IN GOOD ENCAPSULATION)

---

# CLASS INTERNALS: InnerTypeLast

Checks nested (internal) classes/interfaces are declared at the bottom of the primary (top-level) class after all init and static init blocks, method, constructor and field declarations.

---

# CLASS INTERNALS: InnerTypeLast

```java
class Test1 {
    private String s;
    class InnerTest1 {}
    public void test() { } // violation
}
```

```java
class Test2 {
    static {};
    class InnerTest1 {}
    public Test2() {} // violation
}
```

```java
class Example1 {
    private String s;
    public void test() {}
    class InnerTest1 {}
}
```

---

End of Week 9

Thanks for listening