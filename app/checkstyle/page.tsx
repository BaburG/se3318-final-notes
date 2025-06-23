'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  SparklesIcon,
  BeakerIcon,
  CpuChipIcon,
  XMarkIcon,
  LightBulbIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

export default function CheckstyleReference() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const checkstyleSections = [
    {
      id: 'class-level',
      title: '1. Class-Level Checks',
      description: 'These checks apply to the overall structure, naming, and dependencies of classes.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50/80 to-cyan-50/80',
      textColor: 'text-blue-900',
      icon: DocumentTextIcon,
      rules: [
        {
          name: 'VisibilityModifier',
          whereUsed: 'Class Members',
          whatItChecks: 'Ensures proper visibility of class members. By default, fields should be private. Only static final or truly immutable fields may be public.',
          whyItMatters: 'Enforces good encapsulation; hides implementation details; reduces external dependencies.',
          commonViolations: [
            'int field1; // violation, must have a visibility modifier',
            'protected String field2; // violation, protected not allowed by default',
            'public int field3 = 42; // violation, not final'
          ],
          correctUsage: [
            'private int myPrivateField1;',
            'public static final int CONSTANT = 42;'
          ]
        },
        {
          name: 'FinalClass',
          whereUsed: 'Class Declaration',
          whatItChecks: 'Ensures that classes that can be effectively final are marked as such (e.g., classes with only private constructors).',
          whyItMatters: 'Prevents unnecessary or unsafe subclassing; signals design intent.',
          commonViolations: [
            'class B { // violation, should be final',
            '  private B() {}',
            '}'
          ],
          correctUsage: [
            'final class A { // OK',
            '  private A() {}',
            '}'
          ]
        },
        {
          name: 'HideUtilityClassConstructor',
          whereUsed: 'Utility Classes',
          whatItChecks: 'Utility classes (those with only static members) should have a private constructor to prevent instantiation.',
          whyItMatters: 'Prevents meaningless instantiation; clarifies design intent.',
          commonViolations: [
            'class Test { // violation, only has static method',
            '  public Test() {}',
            '  public static void fun() {}',
            '}'
          ],
          correctUsage: [
            'class Foo { // OK',
            '  private Foo() {}',
            '  static int n;',
            '}'
          ]
        },
        {
          name: 'DesignForExtension',
          whereUsed: 'Class Methods',
          whatItChecks: 'Checks that overridable methods in non-final classes are either abstract or have an empty implementation (hook).',
          whyItMatters: 'Protects superclasses from being broken by subclasses and forces a clear extension contract.',
          commonViolations: [
            'public abstract class Plant {',
            '  // violation, overridable method has implementation',
            '  protected void validate() {',
            '    if (roots == null) throw new ...;',
            '  }',
            '}'
          ],
          correctUsage: [
            'public abstract class Plant {',
            '  private void validate() {',
            '    // ... main logic',
            '    validateEx(); // call to hook',
            '  }',
            '  protected void validateEx() {} // empty hook for subclass',
            '}'
          ]
        },
        {
          name: 'AbstractClassName',
          whereUsed: 'Abstract Class Declaration',
          whatItChecks: 'Ensures abstract class names conform to a pattern, typically starting with "Abstract".',
          whyItMatters: 'Improves readability by making abstract base classes easily identifiable.',
          commonViolations: [
            'abstract class Second {} // violation, name does not match pattern'
          ],
          correctUsage: [
            'abstract class AbstractFirst {}'
          ]
        },
        {
          name: 'InterfaceIsType',
          whereUsed: 'Interface Declaration',
          whatItChecks: 'Ensures an interface defines a type by having methods, not just constants.',
          whyItMatters: 'Follows the principle that interfaces should define behavior (types), not just be constant holders.',
          commonViolations: [
            '// violation, no methods',
            'interface Test1 {',
            '  int a = 3;',
            '}'
          ],
          correctUsage: [
            'interface Test3 { // ok, has a method',
            '  int a = 3;',
            '  void test();',
            '}'
          ]
        },
        {
          name: 'ClassDataAbstractionCoupling',
          whereUsed: 'Class Body',
          whatItChecks: 'Measures the number of other classes instantiated within a given class, indicating coupling.',
          whyItMatters: 'High coupling makes a class harder to maintain and test, as it depends on many other types.',
          commonViolations: [
            'public class Test { // Violation if max=3',
            '  A a1 = new A1();',
            '  A a2 = new A2();',
            '  B b1 = new B();',
            '  C c1 = new C(); // 4th type',
            '}'
          ],
          correctUsage: [
            'public class Test { // OK if max=3',
            '  A a1 = new A1();',
            '  A a2 = new A2();',
            '  B b1 = new B();',
            '}'
          ]
        },
        {
          name: 'ClassFanOutComplexity',
          whereUsed: 'Class Dependencies',
          whatItChecks: 'Counts the number of other types a class relies on (imports, fields, etc.).',
          whyItMatters: 'High fan-out indicates high coupling, making the class brittle and hard to maintain.',
          commonViolations: [
            '// Class that imports and uses many different types',
            '// from various packages, exceeding the configured max (e.g., 20).'
          ],
          correctUsage: [
            '// Class with a limited, focused set of dependencies.'
          ]
        },
        {
          name: 'AvoidStarImport',
          whereUsed: 'Import Statements',
          whatItChecks: 'Checks that there are no import statements that use the `*` notation.',
          whyItMatters: 'Star imports can pull in unexpected classes, lead to naming conflicts, and obscure dependencies.',
          commonViolations: [
            'import java.util.*; // violation'
          ],
          correctUsage: [
            'import java.util.List;',
            'import java.util.ArrayList;'
          ]
        },
        {
          name: 'MissingCtor',
          whereUsed: 'Class Declaration',
          whatItChecks: 'Checks that non-abstract classes define a constructor instead of relying on the default one.',
          whyItMatters: 'Ensures that object creation is an explicit, considered action.',
          commonViolations: [
            'class InvalidExample { // violation',
            '  public void test() {}',
            '}'
          ],
          correctUsage: [
            'class ExampleOk {',
            '  ExampleOk(int a) { ... }',
            '}'
          ]
        },
        {
          name: 'InnerTypeLast',
          whereUsed: 'Class Body',
          whatItChecks: 'Ensures nested classes/interfaces are declared at the bottom of the class.',
          whyItMatters: 'Improves readability by placing primary class members (fields, constructors, methods) first.',
          commonViolations: [
            'class Test1 {',
            '  private String s;',
            '  class InnerTest1 {}',
            '  public void test() { } // violation, method after inner class',
            '}'
          ],
          correctUsage: [
            'class Example1 {',
            '  private String s;',
            '  public void test() {}',
            '  class InnerTest1 {}',
            '}'
          ]
        }
      ]
    },
    {
      id: 'method-level',
      title: '2. Method-Level Checks',
      description: 'These checks focus on method structure, naming, parameters, and implementation quality.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50/80 to-teal-50/80',
      textColor: 'text-emerald-900',
      icon: CodeBracketIcon,
      rules: [
        {
          name: 'MethodName',
          whereUsed: 'Method Declarations',
          whatItChecks: 'Method names should follow camelCase convention, starting with a lowercase letter.',
          whyItMatters: 'Consistency in naming improves readability; follows Java conventions.',
          commonViolations: [
            'public void Method3() {} // violation, starts with uppercase'
          ],
          correctUsage: [
            'public void method1() {}'
          ]
        },
        {
          name: 'MethodLength',
          whereUsed: 'Method Body',
          whatItChecks: 'Methods should not exceed a maximum number of lines (e.g., 4 lines in example).',
          whyItMatters: 'Long methods are harder to understand, test, and maintain; encourages refactoring.',
          commonViolations: [
            'public void firstMethod() { // violation if max=4',
            '  int index = 0;',
            '  if (index < 5) {',
            '    index++;',
            '  }',
            '}'
          ],
          correctUsage: [
            'public void secondMethod() { // ok if max=4',
            '  System.out.println("line 3");',
            '}'
          ]
        },
        {
          name: 'FinalParameters',
          whereUsed: 'Method Parameters',
          whatItChecks: 'Method, constructor, and catch block parameters should be declared final.',
          whyItMatters: 'Prevents accidental parameter modification (which is bad practice) and improves code clarity.',
          commonViolations: [
            'public void methodTwo(int x) { } // violation, x should be final'
          ],
          correctUsage: [
            'public void methodOne(final int x) { }'
          ]
        },
        {
          name: 'ParameterNumber',
          whereUsed: 'Method & Constructor Declaration',
          whatItChecks: 'Checks for a maximum number of parameters (default is 7).',
          whyItMatters: 'Methods with too many parameters can be a sign of poor cohesion and are hard to use. Consider parameter objects.',
          commonViolations: [
            '// violation, more than 7 parameters',
            'public void needsLotsOfParameters(int a,',
            '  int b, int c, int d, int e, int f, int g, int h) { ... }'
          ],
          correctUsage: [
            '// Use a parameter object for numerous parameters'
          ]
        },
        {
          name: 'MethodTypeParameterName',
          whereUsed: 'Generic Method Declaration',
          whatItChecks: 'Ensures generic type parameter names conform to a pattern (usually a single uppercase letter).',
          whyItMatters: 'Follows standard Java conventions for generics, improving readability.',
          commonViolations: [
            'public <a> void method2() {} // violation, should be uppercase'
          ],
          correctUsage: [
            'public <T> void method1() {}',
            'public <K, V> void method3() {}'
          ]
        },
        {
          name: 'OverloadedMethodsDeclarationOrder',
          whereUsed: 'Class Body',
          whatItChecks: 'Checks that overloaded methods are grouped together in the source file.',
          whyItMatters: 'Improves readability by keeping related methods physically close.',
          commonViolations: [
            'public void foo(int i) {}',
            'public void notFoo() {} // violation, separates overloads',
            'public void foo(String s) {}'
          ],
          correctUsage: [
            'public void foo(int i) {}',
            'public void foo(String s) {}',
            'public void notFoo() {}'
          ]
        },
        {
          name: 'ReturnCount',
          whereUsed: 'Method Body',
          whatItChecks: 'Restricts the number of return statements in a method.',
          whyItMatters: 'Promotes single-exit-point design, which can sometimes be easier to reason about and debug.',
          commonViolations: [
            '// violation if max is 2',
            'public int badSign(int x) {',
            '  if (x < -2) return -2;',
            '  if (x == 0) return 0;',
            '  if (x > 2) return 2;',
            '  return 1;',
            '}'
          ],
          correctUsage: [
            '// OK if max is 3',
            'public int sign(int x) {',
            '  if (x < 0) return -1;',
            '  if (x == 0) return 1;',
            '  return 0;',
            '}'
          ]
        },
        {
          name: 'RequireThis',
          whereUsed: 'Method Body',
          whatItChecks: 'Checks that references to instance variables and methods use `this.` explicitly.',
          whyItMatters: 'Avoids ambiguity, especially when local variables or parameters shadow instance fields.',
          commonViolations: [
            'public void foo(int c) {',
            '  // c is a parameter, this.c is the field',
            '  c = c; // violation, ambiguous assignment',
            '}'
          ],
          correctUsage: [
            'public Test(int a) {',
            '  this.a = a; // OK, this keyword used',
            '}'
          ]
        }
      ]
    },
    {
      id: 'variable-level',
      title: '3. Variable-Level Checks',
      description: 'These checks ensure proper variable declaration, naming, and usage patterns.',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50/80 to-violet-50/80',
      textColor: 'text-purple-900',
      icon: BeakerIcon,
      rules: [
        {
          name: 'MemberName',
          whereUsed: 'Instance Variables',
          whatItChecks: 'Instance variable names should follow camelCase, starting with a lowercase letter.',
          whyItMatters: 'Consistent naming improves code readability and maintainability.',
          commonViolations: [
            'public int NUM1; // violation'
          ],
          correctUsage: [
            'public int num1;'
          ]
        },
        {
          name: 'LocalVariableName',
          whereUsed: 'Local Variables',
          whatItChecks: 'Local variable names should follow camelCase convention.',
          whyItMatters: 'Maintains consistency with Java naming conventions.',
          commonViolations: [
            'for (int VAR = 1; VAR < 10; VAR++) { } // violation'
          ],
          correctUsage: [
            'for (int var = 1; var < 10; var++) {}'
          ]
        },
        {
          name: 'StaticVariableName',
          whereUsed: 'Static Variables',
          whatItChecks: 'Static, non-final variable names should follow camelCase. Static final constants should be UPPER_SNAKE_CASE.',
          whyItMatters: 'Distinguishes between mutable static state and immutable constants.',
          commonViolations: [
            'public static int ItStatic1 = 2; // violation, should be camelCase'
          ],
          correctUsage: [
            'public static int goodStatic = 2;',
            'public static final int GOOD_CONSTANT = 2;'
          ]
        },
        {
          name: 'LocalFinalVariableName',
          whereUsed: 'Local Final Variables',
          whatItChecks: 'Checks that local final variable names conform to a specified pattern (usually camelCase).',
          whyItMatters: 'Ensures consistent naming for all local variables, final or not.',
          commonViolations: [
            'final int VAR1 = 5; // violation, should be camelCase'
          ],
          correctUsage: [
            'final int var1 = 10;'
          ]
        },
        {
          name: 'UnusedLocalVariable',
          whereUsed: 'Method Body',
          whatItChecks: 'Finds local variables that are declared but never used.',
          whyItMatters: 'Removes dead code; improves readability; may indicate logic errors.',
          commonViolations: [
            'public void calculate() {',
            '  int unusedVar = 10; // declared but never used',
            '  System.out.println("Done");',
            '}'
          ],
          correctUsage: [
            'public void calculate() {',
            '  // Remove unused variables',
            '  System.out.println("Done");',
            '}'
          ]
        },
        {
          name: 'MultipleVariableDeclarations',
          whereUsed: 'Variable Declarations',
          whatItChecks: 'Checks that each variable is declared in its own statement.',
          whyItMatters: 'Improves readability and makes it easier to add comments for each variable.',
          commonViolations: [
            'int lower, higher; // violation'
          ],
          correctUsage: [
            'int lower;',
            'int higher;'
          ]
        },
        {
          name: 'ExplicitInitialization',
          whereUsed: 'Variable Initialization',
          whatItChecks: 'Checks if variables are explicitly initialized to their type\'s default value (e.g., `int x = 0;`).',
          whyItMatters: 'This is redundant as Java provides default initialization. Omitting it makes code cleaner.',
          commonViolations: [
            'private int intField1 = 0; // violation',
            'private Obj objField1 = null; // violation'
          ],
          correctUsage: [
            'private int intField3; // OK, relies on default init',
            'private Obj objField3; // OK, relies on default init'
          ]
        },
        {
          name: 'VariableDeclarationUsageDistance',
          whereUsed: 'Method Body',
          whatItChecks: 'Checks the distance (in lines) between a variable\'s declaration and its first use.',
          whyItMatters: 'Minimizing scope ("live time") makes code easier to understand and reduces the chance of bugs.',
          commonViolations: [
            'public void foo() {',
            '  int num; // violation, distance is too great',
            '  System.out.println("Statement 1");',
            '  System.out.println("Statement 2");',
            '  System.out.println("Statement 3");',
            '  num = 1;',
            '}'
          ],
          correctUsage: [
            'public void foo() {',
            '  System.out.println("Statement 1");',
            '  System.out.println("Statement 2");',
            '  System.out.println("Statement 3");',
            '  int num = 1;',
            '}'
          ]
        }
      ]
    },
    {
      id: 'control-flow',
      title: '4. Loop/Control-Flow Checks',
      description: 'These checks ensure proper control flow structures and loop management.',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50/80 to-amber-50/80',
      textColor: 'text-orange-900',
      icon: CpuChipIcon,
      rules: [
        {
          name: 'ModifiedControlVariable',
          whereUsed: 'for Loops',
          whatItChecks: 'Control variables in `for` loops should not be modified within the loop body.',
          whyItMatters: 'Prevents confusing loop behavior; makes loop bounds predictable and easy to understand.',
          commonViolations: [
            'for (int i = 0; i < 10; i++) {',
            '  i++; // violation, modifying control variable',
            '}'
          ],
          correctUsage: [
            'for (int i = 0; i < 10; i += 2) { // OK, modify in update clause',
            '  // ...',
            '}'
          ]
        },
        {
          name: 'MissingSwitchDefault',
          whereUsed: 'switch Statements',
          whatItChecks: 'All switch statements should have a `default` clause.',
          whyItMatters: 'Handles unexpected values; improves robustness; documents that all cases have been considered.',
          commonViolations: [
            'switch (dayOfWeek) {',
            '  case 1: return "Monday";',
            '  // missing default clause',
            '}'
          ],
          correctUsage: [
            'switch (dayOfWeek) {',
            '  case 1: return "Monday";',
            '  default: throw new ...;',
            '}'
          ]
        },
        {
          name: 'SimplifyBooleanExpression',
          whereUsed: 'Boolean Expressions',
          whatItChecks: 'Finds boolean expressions that can be simplified.',
          whyItMatters: 'Improves readability; reduces complexity; eliminates redundancy.',
          commonViolations: [
            'if (condition == true) { ... } // redundant == true',
            'boolean m = s > 1 ? true : false; // redundant ternary'
          ],
          correctUsage: [
            'if (condition) { ... } // simplified',
            'boolean m = s > 1;'
          ]
        },
        {
          name: 'SimplifyBooleanReturn',
          whereUsed: 'Return Statements',
          whatItChecks: 'Finds `if-else` blocks that can be simplified to a single boolean return statement.',
          whyItMatters: 'Reduces code complexity and line count; improves readability.',
          commonViolations: [
            'if (cond) {',
            '  return true;',
            '} else {',
            '  return false;',
            '}'
          ],
          correctUsage: [
            'return cond;'
          ]
        },
        {
          name: 'DefaultComesLast',
          whereUsed: 'switch Statements',
          whatItChecks: 'The `default` clause should be the last clause in switch statements.',
          whyItMatters: 'Follows conventional ordering; improves readability and predictability.',
          commonViolations: [
            'switch (value) {',
            '  default: handleDefault(); break;',
            '  case 1: handleOne(); break; // violation',
            '}'
          ],
          correctUsage: [
            'switch (value) {',
            '  case 1: handleOne(); break;',
            '  default: handleDefault(); break;',
            '}'
          ]
        },
        {
          name: 'NeedBraces',
          whereUsed: 'Control Flow Statements',
          whatItChecks: 'Ensures `if`, `else`, `for`, `while`, and `do-while` statements use curly braces `{}`.',
          whyItMatters: 'Prevents common bugs like the "dangling else" problem and improves code clarity.',
          commonViolations: [
            'if (obj.equals(num)) return true; // violation'
          ],
          correctUsage: [
            'if (obj.equals(num)) { return true; }'
          ]
        },
        {
          name: 'EmptyStatement',
          whereUsed: 'Anywhere',
          whatItChecks: 'Detects empty statements (a standalone semicolon `;`).',
          whyItMatters: 'Empty statements are often typos (e.g., `if(..);`) that create hard-to-find bugs.',
          commonViolations: [
            'if(i > 3); // violation'
          ],
          correctUsage: [
            'if(i > 3) { i++; }'
          ]
        },
        {
          name: 'EmptyBlock',
          whereUsed: 'Any Block',
          whatItChecks: 'Checks for empty blocks `{}`.',
          whyItMatters: 'Empty blocks can indicate unfinished code or a logical error. If intentional, a comment should explain why.',
          commonViolations: [
            'if ( SomeTest ) { //violation',
            '}'
          ],
          correctUsage: [
            'if ( SomeTest ) {',
            '  // do nothing, by design',
            '}'
          ]
        },
        {
          name: 'AvoidInlineConditionals',
          whereUsed: 'Ternary Operator',
          whatItChecks: 'Detects inline conditional (ternary) operators.',
          whyItMatters: 'Complex ternaries can be very hard to read. A standard `if-else` is often clearer.',
          commonViolations: [
            'b = (a != null && a.length() >= 1) ? a.substring(1) : null; // violation'
          ],
          correctUsage: [
            'if (a != null && a.length() >= 1) {',
            '  b = a.substring(1);',
            '} else {',
            '  b = null;',
            '}'
          ]
        },
        {
          name: 'BooleanExpressionComplexity',
          whereUsed: 'Boolean Expressions',
          whatItChecks: 'Restricts the number of boolean operators (`&&`, `||`, `&`, `|`, `^`) in an expression.',
          whyItMatters: 'Overly complex conditions are hard to read, debug, and maintain. They should be broken down.',
          commonViolations: [
            '// violation if max=3',
            'boolean d = (a & b) | (b ^ a) | (a ^ b);'
          ],
          correctUsage: [
            'boolean term1 = a & b;',
            'boolean term2 = b ^ a;',
            'boolean term3 = a ^ b;',
            'boolean d = term1 | term2 | term3;'
          ]
        },
        {
          name: 'FallsThrough',
          whereUsed: 'switch Statements',
          whatItChecks: 'Checks for fall-through in `switch` statements where a case lacks a `break`, `return`, etc.',
          whyItMatters: 'Accidental fall-through is a common source of bugs. Intentional fall-through must be documented.',
          commonViolations: [
            'case 1:',
            '  i++;',
            'case 2: // violation, fall through from case 1',
            '  i++;',
            '  break;'
          ],
          correctUsage: [
            'case 1:',
            '  i++;',
            '  // fall through',
            'case 2:',
            '  i++;',
            '  break;'
          ]
        },
        {
          name: 'NestedIfDepth',
          whereUsed: 'if Statements',
          whatItChecks: 'Restricts the depth of nested `if` statements.',
          whyItMatters: 'Deeply nested logic is extremely difficult to follow and is a sign of high cyclomatic complexity. It should be refactored.',
          commonViolations: [
            'if (c1) {',
            '  if (c2) {',
            '    if (c3) { // violation if max=2',
            '    }',
            '  }',
            '}'
          ],
          correctUsage: [
            '// Refactor using helper methods or guard clauses'
          ]
        }
      ]
    },
    {
      id: 'java-specific',
      title: '5. Java-Specific Checks',
      description: 'These checks address Java-specific patterns, conventions, and best practices.',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50/80 to-pink-50/80',
      textColor: 'text-rose-900',
      icon: SparklesIcon,
      rules: [
        {
          name: 'MissingOverride',
          whereUsed: 'Method Declarations',
          whatItChecks: 'Verifies that the `@Override` annotation is present when a method overrides a superclass method.',
          whyItMatters: 'Prevents subtle bugs from typos in method signatures and clearly communicates intent.',
          commonViolations: [
            '/** {@inheritDoc} */',
            'public void test2() { // violation, missing @Override',
            '}'
          ],
          correctUsage: [
            '/** {@inheritDoc} */',
            '@Override',
            'public void test1() { // OK',
            '}'
          ]
        },
        {
          name: 'CovariantEquals',
          whereUsed: 'equals() Methods',
          whatItChecks: 'Classes that define a covariant `equals(SomeType)` should also override `equals(Object)`.',
          whyItMatters: 'Ensures the `equals` contract is correctly implemented, preventing bugs when using collections (like HashMap, HashSet).',
          commonViolations: [
            'class Test {',
            '  public boolean equals(Test i) { // violation',
            '    return false;',
            '  }',
            '}'
          ],
          correctUsage: [
            'class Test {',
            '  public boolean equals(Test i) { ... }',
            '  @Override',
            '  public boolean equals(Object i) { ... }',
            '}'
          ]
        },
        {
          name: 'EqualsHashCode',
          whereUsed: 'Class Definitions',
          whatItChecks: 'Classes that override `equals()` must also override `hashCode()`.',
          whyItMatters: 'Maintains the `equals-hashCode` contract, which is essential for the correct functioning of hash-based collections.',
          commonViolations: [
            'public class Person {',
            '  @Override',
            '  public boolean equals(Object obj) { ... }',
            '  // missing hashCode() override',
            '}'
          ],
          correctUsage: [
            'public class Person {',
            '  @Override',
            '  public boolean equals(Object obj) { ... }',
            '  @Override',
            '  public int hashCode() { ... }',
            '}'
          ]
        },
        {
          name: 'SuperClone',
          whereUsed: 'clone() Method',
          whatItChecks: 'Checks that an overriding `clone()` method invokes `super.clone()`.',
          whyItMatters: 'Ensures the cloning process is correctly chained up the inheritance hierarchy.',
          commonViolations: [
            'public SuperCloneB clone() { // violation',
            '  SuperCloneB other = new SuperCloneB();',
            '  return other;',
            '}'
          ],
          correctUsage: [
            'public Object clone() throws CloneNotSupportedException {',
            '  return super.clone();',
            '}'
          ]
        },
        {
          name: 'SuperFinalize',
          whereUsed: 'finalize() Method',
          whatItChecks: 'Checks that an overriding `finalize()` method invokes `super.finalize()`.',
          whyItMatters: 'Ensures that cleanup logic in all superclasses is executed correctly. (Note: `finalize` is deprecated and should be avoided).',
          commonViolations: [
            'protected void finalize() throws Throwable { // violation',
            '  System.out.println("In finalize block");',
            '}'
          ],
          correctUsage: [
            'protected void finalize() throws Throwable {',
            '  System.out.println("In finalize block");',
            '  super.finalize(); // OK',
            '}'
          ]
        }
      ]
    },
    {
      id: 'formatting-whitespace',
      title: '6. Formatting & Whitespace',
      description: 'These checks enforce consistent code layout and style.',
      color: 'from-gray-500 to-slate-500',
      bgColor: 'from-gray-50/80 to-slate-50/80',
      textColor: 'text-gray-900',
      icon: PaintBrushIcon,
      rules: [
        {
          name: 'MethodParamPad',
          whereUsed: 'Method/Constructor Calls & Definitions',
          whatItChecks: 'Checks for whitespace padding around parentheses in method declarations and calls.',
          whyItMatters: 'Enforces a consistent, conventional style for code formatting.',
          commonViolations: [
            'public Example1 (int aParam) { // violation, space before (',
            '  super (); // violation, space before (',
            '}'
          ],
          correctUsage: [
            'public Example1(int aParam) {',
            '  super();',
            '}'
          ]
        },
        {
          name: 'EmptyLineSeparator',
          whereUsed: 'Between Code Elements',
          whatItChecks: 'Checks for empty lines between package, imports, fields, constructors, methods, etc.',
          whyItMatters: 'Improves readability by visually grouping related code blocks.',
          commonViolations: [
            'class Example1 {',
            '  int var1 = 1;',
            '  int var2 = 2; // violation, needs empty line separator',
            '}'
          ],
          correctUsage: [
            'class Example1 {',
            '  int var1 = 1;',
            '',
            '  int var2 = 2;',
            '}'
          ]
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: checkstyleSections.reduce((acc, section) => acc + section.rules.length, 0) },
    ...checkstyleSections.map(section => ({
      id: section.id,
      label: section.title.replace(/^\d+\.\s*/, ''),
      count: section.rules.length
    }))
  ];

  const filteredSections = checkstyleSections.filter(section => {
    if (selectedCategory !== 'all' && section.id !== selectedCategory) return false;
    if (!searchTerm) return true;
    
    return section.rules.some(rule => 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whatItChecks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whereUsed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).map(section => ({
    ...section,
    rules: section.rules.filter(rule =>
      !searchTerm || 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whatItChecks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whereUsed.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh"></div>
        <div className="relative glass-card border-0 rounded-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="nav-link text-slate-600 hover:text-slate-800 flex items-center"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back to Hub
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="floating-element">
                  <CheckCircleIcon className="h-10 w-10 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">Checkstyle Reference</h1>
                  <p className="text-lg text-slate-600">Complete rules guide with examples</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="glass-card px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-emerald-600">{categories[0].count}+ Rules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="sticky top-0 z-40 glass-card border-0 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search rules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white/60 hover:bg-white/80 text-slate-700 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredSections.length === 0 ? (
          <div className="text-center py-16">
            <ExclamationTriangleIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No rules found</h3>
            <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredSections.map((section) => (
              <div key={section.id} className="study-card">
                <div className="p-8 border-b border-slate-200/60">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${section.color} p-3`}>
                      <section.icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">{section.title}</h2>
                      <p className="text-lg text-slate-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid gap-8">
                    {section.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className={`study-section bg-gradient-to-br ${section.bgColor} border-white/40`}>
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className={`text-2xl font-bold ${section.textColor} mb-2`}>{rule.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-slate-600 bg-white/60 px-3 py-1 rounded-full">
                                {rule.whereUsed}
                              </span>
                            </div>
                          </div>
                          <LightBulbIcon className={`h-8 w-8 ${section.textColor} opacity-60`} />
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className={`text-lg font-semibold ${section.textColor} mb-3 flex items-center`}>
                              <DocumentTextIcon className="h-5 w-5 mr-2" />
                              What it checks
                            </h4>
                            <p className="text-slate-700 leading-relaxed">{rule.whatItChecks}</p>
                          </div>

                          <div>
                            <h4 className={`text-lg font-semibold ${section.textColor} mb-3 flex items-center`}>
                              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                              Why it matters
                            </h4>
                            <p className="text-slate-700 leading-relaxed">{rule.whyItMatters}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                                <XMarkIcon className="h-5 w-5 mr-2" />
                                Common Violations
                              </h4>
                              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <pre className="text-sm text-red-800 whitespace-pre-wrap font-mono">
                                  {Array.isArray(rule.commonViolations) ? rule.commonViolations.join('\n') : rule.commonViolations}
                                </pre>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                Correct Usage
                              </h4>
                              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                <pre className="text-sm text-emerald-800 whitespace-pre-wrap font-mono">
                                  {Array.isArray(rule.correctUsage) ? rule.correctUsage.join('\n') : rule.correctUsage}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Reference Tips */}
        <div className="mt-16 study-section bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/40">
          <div className="flex items-center mb-8">
            <SparklesIcon className="h-10 w-10 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-indigo-900">Quick Reference Tips</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <LightBulbIcon className="h-6 w-6 mr-2" />
                Understanding Rule Categories
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Class-Level:</strong> Focus on overall class design and structure</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Method-Level:</strong> Ensure good method design and implementation</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Variable-Level:</strong> Proper variable naming and usage patterns</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Control-Flow:</strong> Ensure clear and predictable program flow</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-2" />
                Study Strategy
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Focus on the "Why it matters" - understand the reasoning behind each rule</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Practice identifying violations in code examples</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Remember that these rules promote readability and maintainability</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Use the search function to quickly find specific rules during review</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-0 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-slate-600 text-lg">
              SE3318: Checkstyle Reference - Complete Rules Guide
            </p>
            <p className="text-slate-500 mt-2">
              Understanding the "why" behind each rule is key to writing better code! 🎯✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}