# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# Table-Driven Methods

---

# Table-Driven Methods

*   General Considerations in Using Table-Driven Methods
*   Direct Access Tables
*   Indexed Access Tables
*   Stair-Step Access Tables

---

# General Considerations in Using Table-Driven Methods

*   Simpler than complicated logic
*   Easier to modify
*   More efficient (in terms of compute or memory depending on the case)

---

# GENERAL CONSIDERATIONS IN USING TABLE-DRIVEN METHODS

## Java Example of Using Complicated Logic to Classify a Character

```java
if ((( 'a' <= inputChar ) && ( inputChar <= 'z' )) ||
    (( 'A' <= inputChar ) && ( inputChar <= 'Z' ))) {
    charType = CharacterType.Letter;
} else if (( inputChar == '.' ) || ( inputChar == ',' ) ||
           ( inputChar == '!' ) || ( inputChar == '(' ) ||
           ( inputChar == ')' ) || ( inputChar == ':' ) ||
           ( inputChar == ';' ) || ( inputChar == '?' ) ||
           ( inputChar == '-' )) {
    charType = CharacterType.Punctuation;
} else if (( '0' <= inputChar ) && ( inputChar <= '9' )) {
    charType = CharacterType.Digit;
}
```

## Java Example of Using a Lookup Table to Classify a Character

```java
charType = charTypeTable[ inputChar ];
```

---

# Two Issues in Using Table-Driven Methods: First

You have to address the question of how to look up entries in the table.

---

# Two Issues in Using Table-Driven Methods: Second

Other data is too awkward to be used to look up a table entry directly.

*   Direct Access
*   Indexed Access
*   Stair-step Access

---

# DIRECT ACCESS TABLES

![A diagram showing a grid representing a lookup table. An arrow points from the bottom left towards the top right, ending at a specific cell labeled "(age, year)". The entire diagram is labeled "Lookup Table".](image.png)

---

# DIRECT ACCESS TABLES: DAYS IN MONTH EXAMPLE

## Visual Basic Example of a Clumsy Way to Determine the Number of Days in a Month

```vb
If ( month = 1 ) Then
    days = 31
ElseIf ( month = 2 ) Then
    days = 28
ElseIf ( month = 3 ) Then
    days = 31
ElseIf ( month = 4 ) Then
    days = 30
ElseIf ( month = 5 ) Then
    days = 31
ElseIf ( month = 6 ) Then
    days = 30
...
End If
```

---

# DIRECT ACCESS TABLES: DAYS IN MONTH EXAMPLE

## Visual Basic Example of an Elegant Way to Determine the Number of Days in a Month

```vb
' Initialize Table of "Days Per Month" Data
Dim daysPerMonth() As Integer = _
    { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }
```

One can just use a simple array access to find out the number of days in a month:

```vb
days = daysPerMonth( month-1 )
```

---

# DIRECT ACCESS TABLES: INSURANCE RATES EXAMPLE

```java
if ( gender == Gender.Female ) {
    if ( maritalStatus == MaritalStatus.Single ) {
        if ( smokingStatus == SmokingStatus.NonSmoking ) {
            if ( age < 18 ) {
                rate = 200.00;
            } else if ( age == 18 ) {
                rate = 250.00;
            } else if ( age == 19 ) {
                rate = 300.00;
            }
            ...
        }
        ...
    }
}
else if ( 65 < age ) {
    rate = 450.00;
}...
```

---

# DIRECT ACCESS TABLES: INSURANCE RATES EXAMPLE

```vb
Public Enum SmokingStatus
    SmokingStatus_First = 0
    SmokingStatus_Smoking = 0
    SmokingStatus_NonSmoking = 1
    SmokingStatus_Last = 1
End Enum
```

```vb
Public Enum Gender
    Gender_First = 0
    Gender_Male = 0
    Gender_Female = 1
    Gender_Last = 1
End Enum
```

---

# DIRECT ACCESS TABLES: INSURANCE RATES EXAMPLE

```vb
Public Enum MaritalStatus
    MaritalStatus_First = 0
    MaritalStatus_Single = 0
    MaritalStatus_Married = 1
    MaritalStatus_Last = 1
End Enum
```

```vb
Const MAX_AGE As Integer = 125

Dim rateTable ( _
    SmokingStatus_Last, _
    Gender_Last, _
    MaritalStatus_Last, _
    MAX_AGE ) As Double
```

---

# DIRECT ACCESS TABLES: INSURANCE RATES EXAMPLE

What is left: You have to figure out some way of putting data into it. (Read from a file, fetch from an external system...)

## Visual Basic Example of an Elegant Way to Determine an Insurance Rate

```vb
rate = rateTable( smokingStatus, gender, maritalStatus, age )
```

---

# DIRECT ACCESS TABLES: FLEXIBLE FORMAT EXAMPLE

![A yellow buoy with a solar panel on top, floating in the calm blue sea.](image.png)

---

# DIRECT ACCESS TABLES: FLEXIBLE FORMAT EXAMPLE

You can use a table to describe logic that's too dynamic to represent in code.

![A diagram showing a stream of data representing different buoy messages. The stream is labeled with message types like "BuoyTemperature", "BuoyLocation", "CircuitCheck", "BuoyDrift", etc. Arrows point from specific message types in the stream to three separate boxes on the right. Each box represents a parsed message with an ID and content, for example, "ID for Buoy Temperature Message" and "Message Contents".](image.png)

---

# DIRECT ACCESS TABLES: FLEXIBLE FORMAT EXAMPLE

| ID for Buoy Temperature Message |
| :--- |
| Average Temperature (floating point) |
| Temperature Range (floating point) |
| Number of Samples (integer) |
| Location (character string) |
| Time of Measurement (time of day) |

| ID for Buoy Drift Message |
| :--- |
| Change in Latitude (floating point) |
| Change in Longitude (floating point) |
| Time of Measurement (time of day) |

| ID for Buoy Location Message |
| :--- |
| Latitude (floating point) |
| Longitude (floating point) |
| Depth (integer) |
| Time of Measurement (time of day) |

---

# FLEXIBLE FORMAT EXAMPLE: LOGIC BASED APPROACH

```vb
While more messages to read
    Read a message header
    ' Decode the message ID from the message header
    If the message header is type 1 then
        Print a type 1 message
    Else if the message header is type 2 then
        Print a type 2 message
    ...
    Else if the message header is type 19 then
        Print a type 19 message
    Else if the message header is type 20 then
        Print a type 20 message
End While
```

Pop question: How would Object Oriented approach fit?

---

# FLEXIBLE FORMAT EXAMPLE: OBJECT ORIENTED APPROACH

The logic would be hidden in the object inheritance structure but the basic structure would be just as complicated.

1.  The message-reading routine consists of a loop that reads each message header,
2.  Decodes the ID,
3.  Looks up the message description in the Message array,
4.  Calls the same routine every time to decode the message.

```vb
While more messages to read
    Read a message header
    'Decode the message ID from the message he
    If the message header is type 1 then
        Instantiate a type 1 message object
    Else if the message header is type 2 then
        Instantiate a type 2 message object
    ...
    Else if the message header is type 19 then
        Instantiate a type 19 message object
    Else if the message header is type 20 then
        Instantiate a type 20 message object
    End if
End While
```

---

# DIRECT ACCESS TABLES: FLEXIBLE FORMAT EXAMPLE

## C++ Example of Setting Up Object Types

```cpp
class AbstractField {
    public:
        virtual void ReadAndPrint( string, FileStatus & ) = 0;
};

class FloatingPointField : public AbstractField {
    public:
        virtual void ReadAndPrint( string, FileStatus & ) {
            ...
        }
};

class IntegerField ...
class StringField ...
...
```

This code fragment declares a member routine for each class that has a string parameter and a `FileStatus` parameter.

---

# FLEXIBLE FORMAT EXAMPLE: OBJECT ORIENTED APPROACH

The final step required to set up the table of objects is to assign the names of specific objects to the `Field` array:

```cpp
field[ Field_FloatingPoint ] = new FloatingPointField();
field[ Field_Integer ]       = new IntegerField();
field[ Field_String ]        = new StringField();
field[ Field_TimeOfDay ]     = new TimeOfDayField();
field[ Field_Boolean ]       = new BooleanField();
field[ Field_BitField ]      = new BitFieldField();
```

---

# FLEXIBLE FORMAT EXAMPLE: OBJECT ORIENTED APPROACH

## C++ Example of Looking Up Objects and Member Routines in a Table

```cpp
fieldIdx = 1;
while ( ( fieldIdx <= numFieldsInMessage ) && ( fileStatus == OK ) ) {
    fieldType = fieldDescription[ fieldIdx ].FieldType;
    fieldName = fieldDescription[ fieldIdx ].FieldName;
    field[ fieldType ].ReadAndPrint( fieldName, fileStatus );
    fieldIdx++;
}
```

---

# DIRECT ACCESS TABLES: FUDGING LOOKUP KEYS

One could use the data to key into the table directly. That is, you could use `messageID` as a key without alteration, as you could use `month` in the days-per-month example and `gender`, `maritalStatus`, and `smokingStatus` in the insurance rates example.

But sometimes the data isn't cooperative.

---

# DIRECT ACCESS TABLES: FUDGING LOOKUP KEYS

The original logic had one rate for people under 18, individual rates for ages 18 through 65, and one rate for people over 65.

This meant that for ages 0 through 17 and 66 and over, you couldn't use the age to key directly into a table that stored only one set of rates for several ages.

---

## Duplicate information to make the key work directly

Duplicate the under-18 rates for each of the ages 0 through 17 and then use the age to key directly into the table.

*   The table structure itself is straightforward 👍
*   The table accesses are also straightforward 👍
*   The duplication would waste space for redundant information and increase the possibility of errors in the table—if only because the table would contain redundant data 👎

---

## Transform the key to make it work directly

Make `Age` work as a direct key is to apply a function to `Age`.

Pop question: Can you guess how?

---

## Transform the key to make it work directly

The function would have to change

*   all ages 0 through 17 to one key, say 17
*   all ages above 66 to another key, say 66

Pop question: What is the disadvantage?

---

## Transform the key to make it work directly

Creating the transformation function requires that you recognize a pattern in the data you want to use as a key and that's not always as simple. ☝️

---

## Isolate the key transformation in its own routine

A routine eliminates the possibility of using different transformations in different places.

It makes modifications easier when the transformation changes.☝️

A good name for the routine, like `KeyFromAge()`, also clarifies and documents the purpose of the mathematical use cases.

---

# INDEXED ACCESS TABLES

![A diagram illustrating an indexed access table. A tall, mostly empty vertical array is labeled "Array of Indexes into Lookup Table (mostly empty)". Arrows point from a few entries in this index array to a smaller, mostly full rectangular table on the right, labeled "Lookup Table (mostly full)".](image.png)

Pop question: Why do you think it is necessary?

---

# INDEXED ACCESS TABLES

*   It takes a lot less space to create an index array with a lot of wasted space than it does to create a main lookup table with a lot of wasted space.
*   Sometimes cheaper to manipulate entries in an index than entries in a main table.
*   Data encoded in tables is easier to maintain than data embedded in code.

---

# STAIR-STEP ACCESS TABLES

Entries in a table are valid for ranges of data rather than for distinct data points.

![A diagram showing a series of stacked horizontal bars of increasing length, resembling stairs. Arrows point horizontally into the left side of each bar, illustrating that values fall into ranges.](image.png)

---

# STAIR-STEP ACCESS TABLES

Imagine writing a grading program, the B entry range might be from 75 percent to 90 percent.

| Percentage | Letter Grade |
| :--- | :--- |
| ≥ 90% | A |
| < 90% | B |
| < 75% | C |
| < 65% | D |
| < 50% | F |

---

# STAIR-STEP ACCESS TABLES

## Visual Basic Example of a Stair-Step Table Lookup

```vb
' set up data for grading table
Dim rangeLimit() As Double = { 50.0, 65.0, 75.0, 90.0, 100.0 }
Dim grade() As String = { "F", "D", "C", "B", "A" }
maxGradeLevel = grade.Length - 1
...
' assign a grade to a student based on the student's score
gradeLevel = 0
studentGrade = "A"
While ( ( studentGrade = "A") and ( gradeLevel < maxGradeLevel ) )
    If ( studentScore < rangeLimit( gradeLevel ) ) Then
        studentGrade = grade( gradeLevel )
    End If
    gradeLevel = gradeLevel + 1
Wend
```

---

# STAIR-STEP ACCESS TABLES

*   Watch the endpoints.
*   Consider using a binary search rather then a sequential search
*   Consider using indexed access instead of the stair-step technique

Pop question: Why indexed access better than stair-step technique for some cases?

---

End of Week 14

Thanks for listening