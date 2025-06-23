# SOFTWARE CONSTRUCTION

SE3318

Ali Mert Ceylan

SPRING 2024-2025

---

*   Integration
*   Version Control

---

# INTEGRATION

*   Importance of the Integration Approach
*   Integration Frequency—Phased or Incremental?
*   Incremental Integration Strategies
*   Daily Build and Smoke Test
*   Checklist

---

# INTEGRATION: IMPORTANCE OF THE INTEGRATION APPROACH

![A black and white photo of a complex, chaotic-looking wooden or steel structure under construction, with a crane lifting a component.](image.png)

*   Easier defect diagnosis
    *   Fewer defects
*   Shorter development schedules
    *   Fast PoC
    *   Better customer relations
    *   More reliable schedule estimates
*   More accurate status reporting
*   Improved code quality

---

# INTEGRATION: INTEGRATION FREQUENCY

*   Phased Integration (Big-bang Integration)
*   Incremental Integration

---

# INTEGRATION FREQUENCY: PHASED INTEGRATION

1.  Design, code, test, and debug each class. This step is called “unit development.”
2.  Combine the classes into one whopping-big system (“system integration”).
3.  Test and debug the whole system. This is called “system dis-integration.” (Thanks to Meilir Page-Jones for this witty observation.)

---

# INTEGRATION FREQUENCY: PHASED INTEGRATION

![A diagram depicting "Big Bang Integration" as a chaotic explosion. Arrows point into the explosion, labeled with common problems: "Global variables", "Different error-handling assumptions", "Weak encapsulation", and "Poorly documented interfaces".](image.png)

---

# INTEGRATION FREQUENCY: INCREMENTAL INTEGRATION

1.  Develop a small, functional part of the system. It will serve as a skeleton on which to hang the muscles, nerves, and skin that make up the remaining parts of the system.
    *   It can be the smallest functional part, the hardest part, a key part, or some combination.
    *   Thoroughly test and debug it.
2.  Design, code, test, and debug a class.
3.  Integrate the new class with the skeleton. Test and debug the combination of skeleton and new class. Make sure the combination works before you add any new classes. If work remains to be done, repeat the process starting at step 2.

---

# INTEGRATION FREQUENCY: INCREMENTAL INTEGRATION

![A diagram showing "Incremental Integration" as a small cloud that grows into a larger cloud labeled "Snowballing Integration".](image.png)

*   Errors are easy to locate
*   The system succeeds early in the project
*   You get improved progress monitoring
*   You'll improve customer relations
*   The units of the system are tested more fully
*   You can build the system with a shorter development schedule

---

# INTEGRATION: INCREMENTAL INTEGRATION STRATEGIES

*   Top-Down Integration
*   Bottom-Up Integration
*   Sandwich Integration
*   Risk-Oriented Integration (Hard Part First Integration)
*   Feature Oriented Integration
*   T Shaped Integration

---

# INCREMENTAL INTEGRATION STRATEGIES: TOP-DOWN INTEGRATION

![A diagram showing a hierarchical tree structure. A line snakes through the tree, starting at the root ("Start"), moving down level by level, visiting all nodes, and ending at the last node on the bottom level ("Finish").](image.png)

---

# INCREMENTAL INTEGRATION STRATEGIES: TOP-DOWN INTEGRATION

*   Interface between classes must be carefully specified. ☝️
*   Conceptual design problems exposed quickly. 👍
*   Pure top-down integration leaves exercising the tricky system interfaces until last. 👎

> Interface specification isn't an integration activity, but making sure that interfaces have been specified well is!

---

# INCREMENTAL INTEGRATION STRATEGIES: BOTTOM-UP INTEGRATION

![A diagram showing a hierarchical tree structure. A line snakes through the tree, starting at the bottom-left nodes ("Start"), moving up level by level, visiting all nodes, and ending at the root node ("Finish").](image.png)

---

# INCREMENTAL INTEGRATION STRATEGIES: BOTTOM-UP INTEGRATION

*   Single class being integrated, so errors are easy to locate. 👍
*   Integration can start early in the project. 👍
*   Exercises potentially troublesome system interfaces early. 👍
*   Conceptual design problems won't be revealed until last parts. 👎
*   Low-level details drive the design contradicts information hiding and object-oriented design. 👎

---

# INCREMENTAL INTEGRATION STRATEGIES: SANDWICH INTEGRATION

![A diagram showing a hierarchical tree structure. A line starts at the root ("Start"), then moves in a seemingly chaotic path, integrating some top-level nodes, some bottom-level nodes, and then filling in the middle layers, eventually ending at a mid-level node ("Finish").](image.png)

---

# INCREMENTAL INTEGRATION STRATEGIES: SANDWICH INTEGRATION

*   First integrate the high-level business-object classes at the top of the hierarchy.☝️
*   Integrate the device-interface classes and widely used utility classes at the bottom.☝️
*   Leave the middle-level classes until later.☝️
*   Troublesome classes first and has the potential to minimize the amount of scaffolding.👍
*   Difficult to manage.👎

---

# INCREMENTAL INTEGRATION STRATEGIES: RISK-ORIENTED INTEGRATION

![A hierarchical tree diagram where nodes are shaded to indicate risk. A legend below shows that darker shaded boxes represent "Most risk: do first" and lighter shaded boxes represent "Least risk: do last". The darker, high-risk nodes are scattered at different levels of the tree.](image.png)

---

# INCREMENTAL INTEGRATION STRATEGIES: RISK-ORIENTED INTEGRATION

*   Identify the level of risk associated with each class.☝️
*   Tends to integrate the classes at the top and the bottom first, saving the middle-level classes for last.☝️
*   Implements challenging parts first.
*   Helps to reduce risk.👍
*   Must find a balance between top-down, bottom-up and sandwich integration. Or suffers from their downsides.👎

> A class implements a poorly understood algorithm or has ambitious performance goals are also considered most risk.

---

# INCREMENTAL INTEGRATION STRATEGIES: FEATURE ORIENTED INTEGRATION

![A hierarchical tree diagram where groups of nodes are circled and labeled as features. A large area at the top is "Feature 1 skeleton (menus, perhaps)". Other clusters of nodes lower down are labeled "Feature 2", "Feature 3", "Feature 4", "Feature 5", and "Feature 6".](image.png)

---

# INCREMENTAL INTEGRATION STRATEGIES: FEATURE ORIENTED INTEGRATION

*   Segment system into "feature"s. Involves incremental integration of small "feature"s.☝️
*   Eliminates scaffolding for "virtually everything" except low-level library classes.👍
*   Each newly integrated feature brings about an incremental addition in functionality.👍
*   Feature-oriented integration works well with object-oriented design.👍
*   Some parts of the skeleton might simply not be operational until particular features have been added.👎

---

# INCREMENTAL INTEGRATION STRATEGIES: T SHAPED INTEGRATION

![A hierarchical tree diagram with a large, shaded "T" shape overlaid. The horizontal bar of the T covers the top level of the hierarchy. The vertical bar of the T extends down through one complete vertical slice of the hierarchy, from the top level to the bottom.](image.png)

---

# INCREMENTAL INTEGRATION STRATEGIES: T SHAPED INTEGRATION

*   Specific vertical slice is selected for early development and integration.☝️
*   Slice should exercise the system end-to-end.☝️
*   Slice should be capable of flushing out any major problems in the system's design assumptions.☝️
*   Requires accurate design assumptions.☝️

---

# VERSION CONTROL

---

# INTRODUCTION

---

# WHY VERSION CONTROL IS IMPORTANT?

*   It is where
    *   **code changes** tracked,
    *   **integration** takes place,
    *   **Development Workflow** realized.

---

# CODE CHANGES?

*   Dropbox
*   Undo/redo buffer
*   Manual versioning

![A series of six Microsoft Word icons. Below them are filenames illustrating a chaotic manual versioning scheme: "Project Report", "Project Report v2", "Project Report v3", "Project Report final", "Project Report final-v2", "Project Report final-v2-fix-part-5".](image.png)

---

# COMMON VERSION CONTROL TOOLS IN COMPARISON

*   **Subversion svn**
    *   Contributors **must be connected** to repository server.
    *   **Centralized;** Single repository server
    *   **Trunk-based development** Contributors create branches.
*   **Git git**
    *   **Operates locally;** contributors work on clones of the main repository.
    *   **Distributed;** copies distributed to clones, less risk of failure on main repository.
    *   **Merge and Conflict resolution;** changes easier to integrate.

---

# RE-INVENTING VERSION CONTROL: NECESSITY

![A box showing "Version 1" with an icon for a person "Alice" and a file "Hello.java".](image.png)

*   Working on single file `Hello.java`
*   But at last minute you have breaking change!

---

# RE-INVENTING VERSION CONTROL: VERSIONING

![A box showing a progression of file versions: "Version 1 Hello.1.java", "Version 2 Hello.2.java", "Version 3 Hello.java". An arrow points to "Version 3" labeled "HEAD". All are associated with "Alice".](image.png)

---

# RE-INVENTING VERSION CONTROL: CLOUD

![A diagram showing two sets of file versions. One set is labeled "Cloud" and the other is labeled "Alice". Both show Version 1, 2, and 3 of Hello.java, implying a synchronization between a local copy and a cloud backup.](image.png)

---

# RE-INVENTING VERSION CONTROL: CLOUD

![A diagram showing a central "Cloud" icon. Arrows point down from the cloud to two separate user setups. One is "Version 5L" for "Alice on laptop" with "Hello.java". The other is "Version 5D" for "Alice on desktop" with "Hello.java", illustrating synchronization across multiple devices.](image.png)

---

# RE-INVENTING VERSION CONTROL: OPERATIONS

*   *reverting* to a past version
*   *comparing* two different versions
*   *pushing* full version history to another location
*   *pulling* history back from that location
*   *merging* versions that are offshoots of the same earlier version

---

# RE-INVENTING VERSION CONTROL: MULTIPLE CONTRIBUTORS

![A diagram showing a central "Cloud". On the left is "Alice" with "Version 5A" of "Hello.java" and "Greet.java". On the right is "Bob" with "Version 5B" of "Hello.java" and "Greet.java", illustrating multiple people working on the same project.](image.png)

---

# RE-INVENTING VERSION CONTROL: LOG MESSAGES

![The same diagram as the previous slide, but now with a "Log" on each side. Alice's log shows entries for Alice and Bob. Bob's log also shows entries for Alice and Bob, illustrating a shared history log.](image.png)

---

# GIT

---

# GIT: FOUNDATIONAL CONCEPTS

*   **Blob.**
*   **Tree.** Blob identifiers, pathnames, and a bit of metadata for all the files in one directory. It can also recursively reference other (sub)tree objects
*   **Commit.** Holds metadata for each change introduced into the repository, including the author, committer, commit date, and log message.
*   **Tag.** Presumably human-readable name (e.g. `Ver-1.0-Alpha`) to a specific object.
*   **Ignore List.**

---

# GIT: FOUNDATIONAL CONCEPTS: BLOB

*   Term for “binary large object,” is a term that's commonly used in computing to refer to some **variable** or **file** that can contain any data.

---

# GIT: FOUNDATIONAL CONCEPTS: TREE

*   Records the contents of a single level in the directory hierarchy.
*   Contents are blob identifiers, pathnames, and a bit of metadata for all the files in one directory.
*   Also recursively reference other (sub)tree objects.

---

# GIT: FOUNDATIONAL CONCEPTS: COMMIT

*   Points to a tree object that captures, in one complete snapshot, the state of the repository at the time the commit was performed.
*   A commit object holds metadata for each change introduced into the repository, including the author, committer, commit date, and log message.
*   The initial commit, or root commit, has no parent.

---

# GIT: FOUNDATIONAL CONCEPTS: TAG

*   A tag object assigns a yet presumably human-readable name to a specific object.
*   A tag name such as `Ver-1.0-Alpha` more human readable in comparison to commit hash `9da581d910c9c4ac93557ca4859e767f5caf5169`.

---

# GIT: FOUNDATIONAL CONCEPTS: INDEX

![Diagram of a Git repository. It shows three main areas: "Local history (.git/)", "Index/staging directory (.git.index)", and "Working directory". An arrow labeled "1. git add" points from "index.html" in the Working directory to "Cached index.html" in the Index. An arrow labeled "2. Alter methodically" points from "index.html" to a new version "Incremental changes to index.html" within the Working directory.](image.png)

---

# GIT: FOUNDATIONAL CONCEPTS: IGNORE LIST

`.gitignore` store file names and patterns to be ignored by git.

*   `*.log`: .log, important.log, file.log, dir/anotherfile.log
*   `*.[oa]`: file.o, file.a
*   `tmp/`: tmp/files.log, tmp/subdir/files.log, parent/tmp/files.log
*   `file.log`: file.log, /dir/file.log
*   `dir/**/file`: dir/file, dir/subdir/file, dir/subdir/subsubdir/file
*   `file?.log`: dir/file, anotherdir/file, file
*   `!important.log`: important.log dir/important.log will not be ignored.

---

# GIT: FUNDAMENTAL OPERATIONS

*   clone
*   add
*   commit
*   pull & push
*   merge
*   Ignore list

---

# GIT: FUNDAMENTAL OPERATIONS: clone

1.  Create an empty local directory `ps0`, and `ps0/.git`.

![Diagram showing a "local directory ps0" containing an empty ".git" database. A separate cloud icon labeled "Athena" contains a remote repository at "/mit/.../psets/ps0/bitdiddle.git" with an object graph inside.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: clone

2.  Copy the object graph from `ssh://.../psets/ps0/bitdiddle.git` into `ps0/.git`.

![The same diagram, but now an arrow labeled "clone: fetch" shows the object graph being copied from the "Athena" remote repository into the local ".git" database.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: clone

3.  Check out the current version of the **master** branch.

![The same diagram, but now an arrow labeled "clone: check out" points from the local ".git" database to the local working directory, which now contains files like "Turtle.java" and "TurtleSoup.java".](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: clone

![A commit history graph showing a series of commits linked by "parent" pointers. The "master" branch and "HEAD" both point to the latest commit.](image.png)

*   Each node in the history graph is a **commit**
*   A **commit** is a version of the project.
*   Only initial commit has no parent.
*   Only branch is **master** in the figure.
*   **HEAD** points to the current commit and eventually current branch.

---

# GIT: FUNDAMENTAL OPERATIONS: clone

![A more detailed commit history graph. Each commit now points to a "tree" object. Tree objects point to other files (like "hello.txt", "hello.scm") or other tree objects, showing how files are shared across commits.](image.png)

*   Git object graph stores each version of an individual file **once**.
*   It allows multiple commits to **share** that one copy.
*   Each commit also has log data — who, when, short log message.

---

# GIT: FUNDAMENTAL OPERATIONS: add

`git` is using the **staging area** as well as known as the **index**. One can view the changes by running `git status` command.

![Diagram showing the three areas of a git repository: "local directory" (working directory), "staging area", and ".git" (the repository database).](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: add

1.  If a change made to a file. For example, assume that `hello.txt` edited. Other changes might be creating a new file, or deleting a file.

![The same diagram, but the "hello.txt" file in the local directory is highlighted to indicate it has been modified.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: add

2.  **Stage** those changes using `git add`.

![The same diagram, but now an arrow labeled "add" shows the changes from "hello.txt" being copied from the local directory to the staging area.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: commit

3.  Create a new commit from the staged changes using `git commit`.

![The same diagram, but now an arrow labeled "commit" shows the contents of the staging area being used to create a new commit object (highlighted) in the .git repository database.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: push & pull

1.  When a repository cloned, a copy of the history graph obtained. Git remembers where it was cloned from as a **remote** repository called **origin**.

![Diagram showing a local repository and a remote "Athena" repository. An arrow labeled "clone" shows the initial copy. The local repo has a "configuration" area indicating the remote is named "origin".](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: push & pull

2.  Using `git commit`, we add new commits to the local history on the `master` branch.

![The diagram now shows a new commit has been added to the local repository's "master" branch. The remote repository remains unchanged.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: push & pull

3.  To send those changes back to the `origin` remote, use `git push origin master`.

![The diagram now shows an arrow labeled "push" copying the new commit from the local repository to the remote "Athena" repository, updating its master branch.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

1.  Both Alyssa and Ben **clone** the repository with two commits (`41c4b8f` and `1255f4e`).

![Diagram showing a central "Athena" repository. On either side are "Alyssa's local directory" and "Ben's local directory". Arrows labeled "clone" show both of them copying the repository from Athena.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

2.  Alyssa creates `hello.scm` and **commits** her change as `6400936`.

![The diagram now shows a new commit (highlighted in blue) in Alyssa's local repository. Ben's and Athena's repositories are unchanged.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

3.  At the same time, Ben creates `hello.rb` and **commits** his change as `82e049e`. At this point, both of their changes only exist in their local repositories. In each repo, `master` now points to a different commit.

![The diagram now shows a new commit in Ben's repository (highlighted in green). Both Alyssa's and Ben's master branches have diverged from the original state in Athena.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

4.  Let's suppose Alyssa is the first to **push** her change up to Athena.

![An arrow labeled "push" shows Alyssa's new commit being copied to the central Athena repository.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

5.  What happens if Ben tries to **push** now? The push will be rejected: if the server updates `master` to point to Ben's commit, Alyssa's commit will disappear from the project history!

![An arrow from Ben's repo to Athena is labeled "push fails" and is crossed out.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

6.  Ben must **merge** his changes with Alyssa's. To perform the merge, he **pulls** her commit from Athena, which does two things:
    (a) Downloads new commits into Ben's repository's object graph

![An arrow labeled "pull" and "(a) fetch" shows Alyssa's commit being copied from Athena into Ben's local repository. Ben's repo now contains both his and Alyssa's divergent commits.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

7.  (b) **Merges** Ben's history with Alyssa's, creating a new commit (`3e62e60`) that joins together the disparate histories. This commit is a snapshot like any other: a snapshot of the repository with both of their changes applied.

![In Ben's local repository, a new merge commit (highlighted in purple) has been created. It has two parents: Ben's original commit and Alyssa's commit. The master branch now points to this merge commit.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

8.  Now Ben can `git push`, because no history will go missing when he does.

![An arrow labeled "push" shows Ben's new merge commit being successfully copied to the Athena repository, updating its master branch.](image.png)

---

# GIT: FUNDAMENTAL OPERATIONS: merge

9.  And Alyssa can `git pull` to obtain Ben's work.

![An arrow labeled "pull" shows the merged history from Athena being copied into Alyssa's local repository, bringing her up to date.](image.png)

---

# GIT: VERSION CONTROL IN A TEAM

*   **Communication.** You and your teammates can **track** the development and stay up-to-date.
*   **Testing.** It allow teams to **run tests** so the **integration** of upcoming commits will be smoother.
*   **Automation.** Tests and static code validations can be automated, this is also known as **Continuous Integration** whereas the deployment can also be automated, and it is known as the **Continuous Delivery**.
*   **Management.** Allows enforcing a **development workflow**.

---

# GIT: BRANCHING STRATEGIES

*   Trunk based
*   Other strategies that exists but will not be covered in scope of this class:
    *   *Feature based*
    *   *Git Flow*
    *   *GitHub Flow*
    *   *GitLab Flow*
    *   *Environment based*

---

# GIT: BRANCHING STRATEGIES: TRUNK-BASED

![A diagram showing a central "main branch". Two feature branches, "feature1(local)" and "feature2(local)", branch off from the main branch, have a few commits, and then merge back into the main branch. The feature branches are short-lived.](image.png)

*   **main branch** (trunk) should always be in a releasable state.
*   Committing small changes frequently, preferably merged to main branch by developer daily.
*   Changes should be complete and tested before merge to main branch.

---

# GIT: BRANCHING STRATEGIES: TRUNK-BASED

*   **Pros:**
    *   **Less merge conflicts.** Since main branch will always be up-to-date, there will be lesser merge conflicts.
    *   **Code quality.** Since complete and tested code merged.
    *   **Faster releases.** Developers merge new features and bug fixes as soon as they are ready.
    *   **Improved collaboration.** Developers communicate more often since they commit frequently.
*   **Cons:**
    *   **Complexity.** Can be complex for teams that are new to Git.
    *   **Management.** Difficult to manage in large teams.

---

# GIT: COMMIT MESSAGE STANDARDS

*   Use an "Issue Tracker", it will assign issues/stories an identifier. GitHub has "Issue" where as JIRA has "Story".
*   For instance:
    *   `Bugfix - <Issue/Story>`
    *   `Refactoring - <Issue/Story>`
    *   `Feature - <Issue/Story>`

---

End of Week 5

Thanks for listening