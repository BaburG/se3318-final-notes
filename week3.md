# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

# MEASURE TWICE, CUT ONCE

---

# PREREQUISITES OVERVIEW

*   Importance of Prerequisites
*   Problem-Definition Prerequisite
    *   Determine the Kind of Software
*   Requirements Prerequisite
*   Architecture Prerequisite

---

# IMPORTANCE OF PREREQUISITES

*   Plan a project
*   Create a business case
*   Develop comprehensive and accurate requirements
*   Design high-quality architectures

---

# WHAT TO DO TO NOT START WITHOUT PREREQUISITES?

1.  Refuse to do work in an ineffective order.
2.  Pretend to be coding when you're not.
3.  Educate your boss in the technical nuances.

---

# WHY SHOULD WE DO PREREQUISITES BEFORE CONSTRUCTION?

*   Appeal to logic
*   Appeal to analogy
*   Appeal to data

---

# APPEAL TO DATA

**Diagram Description:** A 3D graph showing the relationship between when a defect is introduced, when it's detected, and the cost to fix it.

*   **X-axis (front):** Phase in Which a Defect Is Detected
    *   Requirements
    *   Architecture
    *   Construction
    *   System Test
    *   Post-Release
*   **Y-axis (side):** Phase in Which a Defect Is Introduced
    *   Requirements
    *   Architecture
    *   Construction
*   **Z-axis (vertical):** Cost

The graph illustrates that the cost to fix a defect rises exponentially the later it is detected. A defect introduced during the "Requirements" phase costs very little to fix if found during the "Requirements" phase, but the cost grows dramatically if it's not found until "Construction," "System Test," or "Post-Release." The same pattern holds for defects introduced in "Architecture" and "Construction," but the cost increase is most severe for defects introduced in the earliest phases.

---

![A cartoon dog sitting on the ground with an arrow stuck in its rear end. Far in the distance is a target, which the arrow has clearly missed.](image.png)

---

# BOSS READINESS

*   "We'd better start coding right away because we're going to have a lot of debugging to do."
*   "We haven't planned much time for testing because we're not going to find many defects."
*   "We've investigated requirements and design so much that I can't think of any"

---

# PROBLEM-DEFINITION PREREQUISITE

---

# PROBLEM-DEFINITION PREREQUISITE

**Diagram:** A pyramid representing the hierarchy of software development activities.

*   **Top (in a cloud):** Future Improvements
*   **Level 5:** System testing
*   **Level 4:** Construction
*   **Level 3:** Architecture
*   **Level 2:** Requirements
*   **Base (Level 1):** Problem Definition

---

# POP QUIZ: PROBLEM DEFINITION

> *We can't keep up with orders for the Gigatron*

Is this a problem definition?

---

# POP ANSWER: PROBLEM DEFINITION

> *We can't keep up with orders for the Gigatron*

Yes, it states a problem.

---

# POP QUIZ: PROBLEM DEFINITION

> *We need to optimize our automated data-entry system to keep up with orders for the Gigatron.*

Is this a problem definition?

---

# POP ANSWER: PROBLEM DEFINITION

> *We need to optimize our automated data-entry system to keep up with orders for the Gigatron.*

No, it states a solution.

---

# POP QUIZ: PROBLEM DEFINITION

> *Our current software system is not compatible with our new hardware upgrades, leading to technical issues and delays in project completion.*

Is this a problem definition?

---

# POP QUIZ: PROBLEM DEFINITION

> *Our current software system is not compatible with our new hardware upgrades, leading to technical issues and delays in project completion.*

Yes, it states a problem.

---

# ITERATIVE APPROACHES AND PREREQUISITES

**Diagram:** A timeline showing overlapping development activities.

*   **Time** flows from left to right.
*   **Requirements:** Starts first and continues for a significant duration.
*   **Architecture:** Starts after Requirements has begun, overlaps with it, and continues.
*   **Detailed Design:** Starts after Architecture has begun, overlaps, and continues.
*   **Construction:** Starts after Detailed Design has begun, overlaps, and is the longest phase shown.
*   **Quality Assurance/System Testing:** Starts after Construction has begun, overlaps, and continues to the end.

The diagram shows that in iterative approaches, activities are not strictly sequential but overlap in time.

---

# ITERATIVE APPROACHES AND PREREQUISITES

**Diagram:** A timeline showing sequential development activities.

*   **Time** flows from left to right.
*   **Requirements:** A long bar representing the full duration.
*   **Architecture:** A shorter bar, starting after Requirements.
*   **Detailed Design:** A shorter bar, starting after Architecture.
*   **Construction:** A long bar, starting after Detailed Design.
*   **Quality Assurance/System Testing:** A long bar, starting after Construction.

The diagram depicts a more traditional, sequential or waterfall-like model where each phase is completed before the next begins.

---

# WHAT KIND OF SOFTWARE YOU'RE WORKING ON?

| | **Kind of Software** | |
| :--- | :--- | :--- |
| | **Business Systems** | **Mission-Critical Systems** | **Embedded Life-Critical Systems** |
| **Typical applications** | Internet site<br>Intranet site<br>Inventory management<br>Games<br>Management information systems<br>Payroll system | Embedded software<br>Games<br>Internet site<br>Packaged software<br>Software tools<br>Web services | Avionics software<br>Embedded software<br>Medical devices<br>Operating systems<br>Packaged software |
| **Life-cycle models** | Agile development (Extreme Programming, Scrum, time-box development, and so on)<br>Evolutionary prototyping | Staged delivery<br>Evolutionary delivery<br>Spiral development | Staged delivery<br>Spiral development<br>Evolutionary delivery |

---

# EVOLUTIONARY DELIVERY

**Diagram:** A timeline showing an iterative development process called Evolutionary Delivery.

*   **Initial Phases:**
    *   Software Concept
    *   Preliminary Requirement Analysis
    *   Design of Architecture and System Core
*   **Iterative Cycles:** The process then enters a loop that repeats over several "Time Segments". Each cycle consists of:
    1.  Develop a Version
    2.  Deliver the Version
    3.  Elicit Customer Feedback
    4.  Incorporate Customer Feedback
*   A callout box highlights one full cycle, showing the steps: **Develop -> Deliver -> Elicit -> Incorporate**.
*   The process continues, delivering progressively refined versions of the software.

---

# EVOLUTIONARY DELIVERY

*   Reduces the risk of delivering a product that the **customer doesn't want**.
*   It makes **progress** visible.
*   Supports more **frequent product releases**.
*   Reduces **estimation error** by allowing for recalibration and re-estimation.
*   Reduces the risk of **integration problems** by integrating early.
*   Improves **morale**.

---

# POP QUIZ: ITERATIVE APPROACHES

Which software development process metaphor is the most similar to Evolutionary Delivery?

---

# POP ANSWER: ITERATIVE APPROACHES

System Accretion

---

# STAGED DELIVERY

**Diagram:** A timeline showing an iterative development process called Staged Delivery, with distinct release phases.

*   **Release Phases over Temporal Segments:** Alpha -> Beta -> RC (Release Candidate)
*   **Initial Phases:**
    *   Software Concept
    *   Requirement Analysis
    *   Architectural Design
*   **Iterative Cycles:** The process enters a loop, with each loop delivering a new stage of the product. Each cycle consists of:
    1.  Detailed Design
    2.  Code, Debug
    3.  Test
    4.  Delivery
*   A callout box highlights one full cycle, showing the steps: **Design -> Code & Debug -> Test -> Delivery**.
*   The final delivery is marked with a black circle at the end of the timeline.

---

# STAGED DELIVERY

*   Plan each delivery stage using **Miniature Milestones**.
*   Success depends on defining a **family of programs**.
*   **Less flexible** than Evolutionary Delivery
*   Trades **increased planning effort** for increased progress visibility

---

# Pop Quiz: Staged Delivery

Why success depends on defining a **family of programs**?

---

# Pop Answer: Staged Delivery

*   **Ecosystem Integration:** Features are part of the system that functions together.
*   **UX Improvement:** Features are updated together and maintains consistency.
*   **Scalability and Flexibility:** Easier to extend a functionality more flexibly.
*   **Quality Assurance:** Set of features tested together to test a function.

---

# Pop Quiz: Staged Delivery

What is the most obvious example for Staged Delivery life cycle model?

---

# Pop Answer: Staged Delivery

What is the most obvious software example for Staged Delivery life cycle model?

---

# SPIRAL DELIVERY

**Diagram:** The Spiral Model of software development.

The model is depicted as a spiral starting from the center and moving outwards. Each loop of the spiral represents a phase of the software process and consists of four quadrants.

*   **Start:** The process begins at the center.
*   **First Loop (Innermost):**
    *   **Quadrant 1 (Top-Left):** Determine objectives, alternatives, and constraints.
    *   **Quadrant 2 (Top-Right):** Identify and resolve risks; Risk analysis; Evaluate alternatives.
    *   **Quadrant 3 (Bottom-Right):** Develop the deliverables (Prototype 1); Concept of operation.
    *   **Quadrant 4 (Bottom-Left):** Plan the next iteration; Requirements plan, lifecycle plan; Review.
*   **Subsequent Loops (Moving Outward):** The process repeats, building on the previous loop.
    *   **Quadrant 1:** Commit to an approach for the next iteration.
    *   **Quadrant 2:** Risk analysis; Operational prototype, Prototype 2, Prototype 3.
    *   **Quadrant 3:** Simulations, models, benchmarks; Software requirements, product design, detailed design, code, unit test, integration and test, acceptance test.
    *   **Quadrant 4:** Development plan, Integration and test plan; Release.

The cumulative cost increases as the spiral moves outwards. The core idea is to develop the deliverables for the iteration and verify that they are correct while managing risks at each stage.

---

# SPIRAL DELIVERY

*   One of the most important advantages of the spiral model is that as **costs increase, risks decrease**.
*   Since model is risk oriented, you have the **checkpoints** at the end of each iteration.
*   Complicated model, requires **conscientious, attentive, and knowledgeable management**.

---

# REQUIREMENTS PREREQUISITE

---

# REQUIREMENTS PREREQUISITE

*   Why Have Official Requirements?
    *   The user can **review** them and **agree** to them.
    *   Paying attention to requirements helps to **minimize changes** to a system after development begins.

---

# HANDLING REQUIREMENTS CHANGES DURING CONSTRUCTION

*   Use the **requirements checklist**
*   Make sure everyone knows the **cost of requirements changes**
*   Set up a **change-control procedure**
*   Use **development approaches** that accommodate changes
*   Keep your eye on the **business case** for the project

or dump the project and start over 😉

---

# SPECIFIC FUNCTIONAL REQUIREMENTS

*   Are all the **inputs to the system specified**, including their source, accuracy, range of values, and frequency?
*   Are all the **outputs from the system specified**, including their destination, accuracy, range of values, frequency, and format?
*   Are all the **external communication interfaces specified**, including **handshaking, error-checking,** and **communication protocols**?
*   Are all the **tasks the user wants to perform specified**?
*   Is the **data used in each task** and the **data resulting from each task** specified?

---

# SPECIFIC NONFUNCTIONAL (QUALITY) REQUIREMENTS

*   Is the **expected response time**, from the user's point of view, specified?
*   Are other **timing considerations** specified?
*   Is the **level of security** specified?
*   Is the **reliability** specified and the **strategy for error detection and recovery**?
*   Is the **maintainability** of the system specified?
*   Is the **definition of success** included? Of **failure**?

---

# ARCHITECTURE PREREQUISITE

---

# ARCHITECTURE PREREQUISITE

A well-thought-out architecture provides the structure to maintain,

*   **conceptual integrity** from the top levels down to the bottom
*   **provides guidance to programmers**—at a level of detail appropriate to the skills of the programmers and to the job at hand
*   **partitions the work** so that multiple developers or multiple development teams can work independently

---

# ARCHITECTURE PREREQUISITE

*   **Independent of frameworks.** System shouldn't be limited by the constraints imposed by the framework.
*   **Testable.** Business rules can be tested without UI, database, web server, or external dependencies.
*   **Independent of the UI.** Type or look of UI should **not** affect the business rules.
*   **Independent of the database.** Business rules should **not** be bound to a specific database technology.
*   **Independent of any external agency.** Business rules should **not** depend on any interfaces to outside world.

---

# ARCHITECTURE PREREQUISITE

**Diagram:** The Clean Architecture

*   **Concentric Circles (from inside out):**
    1.  **Entities** (Yellow): Innermost circle.
    2.  **Use Cases** (Red): Surrounds Entities.
    3.  **Presenters, Controllers** (Green): Surrounds Use Cases.
    4.  **Web, UI, DB, Devices, External Interfaces** (Blue): Outermost circle.

*   **Legend:**
    *   **Enterprise Business Rules** (Entities)
    *   **Application Business Rules** (Use Cases)
    *   **Interface Adapters** (Presenters, Controllers, Gateways)
    *   **Frameworks & Drivers** (Web, UI, DB, Devices)

*   **Flow of Control Diagram:**
    *   Controller -> Use Case Input Port -> Use Case Interactor
    *   Use Case Interactor -> Use Case Output Port -> Presenter
    *   The flow of control moves from the controller, through the use case, and out to the presenter.

---

# ARCHITECTURE PREREQUISITE

*   **Entities.** Entities are the **business objects** of the application.
*   **Use cases.** Orchestrate the **flow of data to and from the entities**, and direct those entities to use their Critical Business Rules.
*   **Interface Adapters.** Convert data to the **data format most convenient for the use cases and entities**.
*   **Frameworks and Drivers.** The web is a detail. The database is a detail. **Details should be kept outside** where they can do little harm.

---

# ARCHITECTURE PREREQUISITE

*   As you move inward, the **level of abstraction** and **policy** increases.
*   Software **grows more abstract** and encapsulates **higher-level policies**.

---

# ARCHITECTURE PREREQUISITE

**Diagram:** A detailed component diagram of a clean architecture implementation.

*   **Left Side (UI/Presentation):**
    *   View -> View Model -> Presenter -> Output Boundary
    *   Controller -> Input Boundary
*   **Center (Application/Business Logic):**
    *   Input Boundary -> Use Case Interactor -> Output Boundary
    *   Use Case Interactor interacts with Entities.
    *   Use Case Interactor also interacts with a Data Access Interface.
*   **Right Side (Data):**
    *   Entities
    *   Data Access Interface -> Data Access -> Database

**Data Flow:**
*   Input Data (`<DS>`) flows to the Input Boundary.
*   Output Data (`<DS>`) flows from the Output Boundary to the Presenter.
*   Data structures (`<I>`) are used for boundaries and interfaces.

---

# KEY CONSTRUCTION DECISIONS

---

# CHOICE OF PROGRAMMING LANGUAGE

> *By relieving the brain of all unnecessary work, a good notation sets it free to concentrate on more advanced problems, and in effect increases the mental power of the race —Alfred North Whitehead*

---

# PROGRAMMING CONVENTIONS

*   Linter rules
*   Coding conventions
*   Design patterns
*   Writing specifications
*   Developer testing

---

# YOUR LOCATION ON THE TECHNOLOGY WAVE

*   Project requirements and goals.
*   Company toolset and team expertise.
*   Ecosystem and community.
*   Interoperability.
*   Security considerations.

---

# MAJOR CONSTRUCTION PRACTICES

---

# MAJOR CONSTRUCTION PRACTICES: CODING

*   How much design will be done up front. (Requirements policy)
*   Conventions for names, comments and software elements. (Coding policy)
*   What coding practices implied by the technology or architecture. (Construction policy)
*   How error conditions will be handled. (Error handling policy)
*   How security will be addressed. (Security policy)

---

# MAJOR CONSTRUCTION PRACTICES: TOOLS

*   Environment management.
*   Dependency management
    *   Language version, compiler version.
    *   Framework choice and version.
*   A version control tool.
*   Coding standards
    *   Policy on non-standard language features.
    *   Editor, linter, debugger, test framework.

---

# TOOLS : ENVIRONMENT/CONFIGURATION MANAGEMENT

*   **Development**
    *   Chocolatey
    *   Homebrew
    *   Aptitude
*   **Deployment**
    *   Ansible
    *   Docker
    *   LXC

---

# TOOLS : DEPENDENCY MANAGEMENT

*   **Java:** Maven
*   **Python:** pyenv+virtualenv, Pipenv
*   **Javascript:** npm

---

# TOOLS: VERSION CONTROL

*   **Subversion svn**
    *   Contributors **must be connected** to repository server.
    *   **Centralized;** Single repository server
    *   **Trunk-based development** Contributors create branches.
*   **Git git**
    *   **Operates locally;** contributors work on clones of the main repository.
    *   **Distributed;** copies distributed to clones, less risk of failure on main repository.
    *   **Merge and Conflict resolution;** changes easier to integrate.

---

# MAJOR CONSTRUCTION PRACTICES: TEAMWORK

*   **Development framework**
    *   Code review tasks
    *   Sprint Review
    *   Retrospective
*   **Version control and integration workflow**
    *   Branch restrictions
    *   Integration rules
    *   Pull Request rules

---

# TEAMWORK : CODE REVIEW : ADVANTAGES

*   **Share knowledge:** Code reviews help junior developers learn from more senior team members.
*   **Discover bugs earlier:** Find and fix problems before customers ever see them.
*   **Maintain compliance:** Help everyone adhere to the same standards.
*   **Enhance security:** Help detect security issues and ensure compliance
*   **Increase collaboration:** Team members work together to create a solution.
*   **Improve code quality:** A human who knows your code base can notice code quality issues.

---

# TEAMWORK : CODE REVIEW : DISADVANTAGES

*   **Longer time to ship:** Code reviews help junior developers learn from more senior team members.
*   **Pull focus from other tasks:** A code review can pull their focus away from other high priority tasks
*   **Large reviews mean longer review times:** Large code reviews are challenging to assess.

---

# TEAMWORK: SPRINT REVIEW

*   Team presents the results of their work to **key stakeholders**.
*   Progress toward the **Product Goal** is discussed.
*   Inspect the **outcomes** of the Sprint and determine future adaptations.

---

# TEAMWORK : RETROSPECTIVE

**Image:** Screenshot of an online retrospective tool called "Retro Tool".

*   The interface is titled "Sprint Retro".
*   There are two main columns: "What went well?" and "What can be improved?".
*   Users can add cards to each column.
*   Below each main column is a "Private Section" where users can type notes before publishing them.
*   Header controls include: Timer (5:00), Participants, Action points, Export, Share, Options, and a Login button.

---

# TEAMWORK: RETROSPECTIVE

*   **What went well?** Section that all team members write cards about things went well.
*   **What can be improved?** Section that cards about things **didn't go smoothly** during sprint.
*   **Action points derived:** Cards are **voted** and **action points** derived from points to be improved and **stories written and assigned** to responsible team members.

---

# TEAMWORK: DEVELOPMENT FRAMEWORK: SCRUM

**Diagram:** A 10-day sprint timeline.

| Day | Activity |
| :--- | :--- |
| **Day 1** | Standup, Tricks and Issues |
| **Day 2** | Standup |
| **Day 3** | Standup |
| **Day 4** | Standup, Technical Review |
| **Day 5** | Standup |
| **Day 6** | Standup, Tricks and Issues |
| **Day 7** | Standup |
| **Day 8** | Standup |
| **Day 9** | Standup, Technical Review |
| **Day 10** | Standup, Sprint Review, Retrospective, Spring Planning |

---

# TEAMWORK : VC AND INTEGRATION : ENVIRONMENT BASED

**Diagram:** A swimlane chart showing a development and integration workflow.

*   **Lanes:** Tech Lead, Team Lead, Developer, Integration Server

*   **Workflow:**
    1.  **Tech Lead:** Determines Sprint Goals.
    2.  **Team Lead:** Receives Sprint Goals -> Writes Stories for Sprint Goals.
    3.  **Team Lead:** Assigns Developer to Story.
    4.  **Developer:** Receives assignment -> Forks Branch from DEV -> Formalizes Specifications -> Develops Feature -> Develops Smoke Tests.
    5.  **Developer:** Creates Pull Request to DEV.
    6.  **Integration Server:** Receives Pull Request -> Performs Static Code Analysis -> Merges Conflicts with DEV -> Merges into DEV -> Runs Unit Tests.
    7.  **Team Lead:** Plans Code Reviews -> Assigns Reviewer.
    8.  **Reviewer (Developer):** Receives Review Request -> Submits Review Vote.
    9.  Notifications are sent for review requests and votes.

This entire process is labeled "Development Procedure".

---

# LABORATORY : THIS WEEK ON LAB

*   Tools will be introduced.
    *   IDE
    *   maven
    *   Other setup and configurations

---

### End of Week 2

Thanks for listening