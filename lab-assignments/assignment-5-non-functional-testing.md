# PA1417 Basic System Verification - Assignment 5: Non-functional Testing

## Team Information

- Team Member 1: Erik O.
- Team Member 2: Karl W.

## Work Distribution

- Team Member 1: Erik O. started and made a first draft.
- Team Member 2: Karl W. completed with additional details, esp. on the evaluation.

## Explanation why definition of quality is necessary

Different systems serve different purposes, so the concept of quality can vary widely depending on the context. In a game application, quality might relate to the user experience. For example, how engaging or enjoyable the game is, or to technical aspects such as frame rate (FPS) and responsiveness.s. On an online poker site, framerate does not matter. Quality would instead refer to perhaps stability, making sure that users are not disconnected during play.

Given that quality can take many different forms, it becomes essential to decide what it means. If you dont pin-point what quality is, testing becomes difficult since there is no clear aim for test-engineers to work with.

## Explanation of three qualities

### Reliability

Reliability is the ability of software to perform its tasks under certain conditions for a certain amount of time without failing. For example:

- **Probability of failure-free operation**: Depending on the context, the threshold for reliability can vary.

  - In a **video streaming platform**, a 90% success rate (0.9) might be considered acceptable, as occasional buffering or failure to load may not have critical consequences.

  - In a **flight navigation system** or a **medical monitoring device**, even a 99% success rate (0.99) could be unacceptable, since failures may lead to life-threatening situations.

- **The ability to recover from failures**: A reliable system should not crash or become unusable due to common or expected issues, such as invalid user input. Instead, it should handle such cases gracefully. For example:

  - If a user enters an invalid data type (e.g., text instead of a number), the system should display an error message and prompt for the correct input, rather than crashing.

  - In a payment processing system, if a network connection fails mid-transaction, the system should be able to detect the failure and either retry the request or roll back the transaction to ensure consistency.

  - In a web application, if a backend service is temporarily unavailable, the system might display a friendly error message and automatically attempt to reconnect.

### Maintainability

Maintainability refers to how easy it is to modify, correct,defect, improve performance etc. Some examples are:

- Code readability
- Component independence and modularity
- Documentation quality
- How difficult it is to identify and fix defects

To propose some explicit metrics related to above, some examples used in the DBWEBB courses are: linting compliance (compliance to certain code standards with regards to e.g. naming of variables / functions, required docstrings, avoiding certain code constructs, etc.), metric on cyclomatic complexity, cohesion / coupling metrics, code duplication metrics. Some courses have had a requirement for automatic testing with a CI pipeline.  

### Accessibility

Accessibility is the degree to which software can be used by people with the widest range of capabilities. This includes:

- Compliance with established accessibility standards (such as WCAG) to ensure inclusive design.
- Compatibility with tools like screen readers, speech recognition software, screen magnifiers, and alternative input devices.
- Clear, consistent, and simple UI design that supports keyboard navigation, high contrast modes, text resizing, not relying solely on color or visual cues.

### Potential Test Techniques for Each Quality

#### Test Technique for Reliabiltiy:

One way ot test the reliability of the system would be to introduce invalid inputs, trying to break the system. If the system is not taking inputs one might consider a stresstest, putting the system under a heavy workload to see where the breaking points are.

#### Test Technique for Maintainability:

There are various tools for testing this quality, such as, Scrutinizer. Used for code analysis, focusing on maintainability, complexity, duplication, and adherence to best practices. Scrutinizer supports multiple languages, but there are also language specific alternatives that one might choose.

#### Test Technique for Accesibility:

Google Lighthouse is an easy way to test accessability ang get quick feedback on how to improve it. Google Lighthouse can be runned in the browser, from command line or as a node module, making it possible to integrate in an automated testing environment. 

## 2. Static Testing

### Explanation of Static Test Techniques vs. Dynamic Test Techniques

**Static test techniques** are techniques applied to the system under test (SUT) without executing the code. This could be using tools like static code analyzers, linters, code review tools, and documentation reviewers. Specific examples include tools such as SonarQube, or code linters (ESlint etc). This type of analysis could also be done manually with code reviews.

**Dynamic test techniques** are applied to the SUT while the application is running. This could be tools like test execution frameworks, performance monitors, debuggers, coverage analyzers and accessibility checkers. Exploratory testing and user testing are examples of Dynamic Manual Techniques.

### Static Code Review of EduTask System

The assignment defines extensibility as "the ability of a system to be extended with new functionality with minimal or no effects on its internal structure and data flow". The task is to review the systems extensibility in regards to a proposed change, which is to add a different kind of resource (Medium-articles, on top of current YouTube videos). 

The system architecture consists of three parts: 1) mongoDB (database), 2) Flask (backend) and 3) React (frontend). 

This then implies that each of these components must be possible to extend with new functionality with minimal or no effects on its internal structure and data flow. 

The task is to conduct a preliminary code review. Thus, the analysis will stay high level. The conclusion of the evaluation is that the proposed change would be difficult to implement, as the code is not extensible.  

#### Backend

##### Extensibility Evaluation

The system makes consistent use of dependency injection in its controller layer. Each controller class receives its DAO(s) as constructor parameters, allowing different data access objects to be injected at runtime. This design improves testability, and reduces coupling, which in turn improves the extensibility. New controllers and resource types can be added with minimal changes to the existing architecture.

The DAO class is very nice, it allows for an easy way to store new types of resources in MongoDB. The system has a nice modularity with a lot of classes using dependency injection.

##### Evaluation of Adding Medium Articles as a Resource Type

As mentioned above the DAO class already allows for adding new types of resources.

Sadly, the TaskController logic is tightly coupled to Youtube videos.

```
            video = self.videos_dao.create({'url': data['url']})
            del data['url']
            data['video'] = ObjectId(video['_id']['$oid'])
```

This code from the create() method assumes a video Dao, stores the resource in a video field and so on. There is no support here for multiple resource types. Similar problems arise in the populate_task() method. This holds trie for other methods as well, such s the delete_of_user and so on. To support future resource types this section should be refactored to assume a resource and not a video. 

#### Frontend

There are several issues with the frontend and its extensibility. For example, the TaskView.js UI is focused on YouTube and assumes that the content is YouTube videos with Thumbnails. 

```
    <div>
      {tasks.length === 0 ?
        <p>Here you find the space to organize the educational videos you are interested in and associate them with todo items. Start by pasting the view key of a YouTube video as well as a title of the task in the form below.</p>
        : <p>Here you can find your {tasks.length} task{tasks.length === 1 ? '' : 's'}. Click on each thumbnail in the list to add, update, or delete the todo items you have associated to this video.</p>}
      <div className='container'>
        {tasks.map(task =>
          <div className='container-element' key={task.id}>
            <a onClick={() => { setTrigger(true); setFocus(task) }}>
              <img src={`http://i3.ytimg.com/vi/${task.url}/hqdefault.jpg`} alt='' />
              { task.done ? <div className="done-overlay"><div className="done-check"></div></div> : <div></div>}
              <div className="title-overlay">{task.title}</div>
            </a>
          </div>)}

        <div className='container-element' key='newtask'>
          <TaskCreator userid={props.user._id} setTasks={setTasks} />
        </div>
```

The Converter.js also assumes a video, as it attempts to access `taskobj.video.url`. 

#### Database

From an architectural point of view, in general, a document oriented database such as mongoDB could be strong in its capacity to be extensible. However, looking into the implementation here, taking an example of the validators (e.g. the task.json), they contain hard coded references to certain resource types (vidoes). This is not extensible.

## References

- On Google Lighthouse: https://developer.chrome.com/docs/lighthouse/overview