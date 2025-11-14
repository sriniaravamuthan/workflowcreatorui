# Visual Designer

The workflow‑orchestration layer includes a **visual designer** that allows clinicians, informaticists and operations staff to assemble and configure workflows without programming.  A well‑designed user interface is essential for adoption: busy clinicians expect the experience to be intuitive and efficient, similar to how they select PowerPlans or order sets from within their EMR screens【925437338200957†L1935-L1946】.

## Canvas & Palette

The designer provides a **canvas** where users can drag and drop blocks to construct a workflow.  A **palette** lists domain‑specific blocks that represent the actions and constructs available.  These include:

* **Start and End:** Represent the beginning and termination of a workflow instance.
* **Order Block:** Represents a single order (lab, imaging, medication, procedure) to be placed at run time.
* **Task Block:** Represents a human task to be queued and completed (e.g., collect copay, draw specimen, counsel patient).
* **Instruction Block:** Represents informational guidance; may be blocking or non‑blocking.
* **Decision Block:** Encodes a rule or condition; branches to different paths depending on patient data, results or timers.  Decision logic can be based on IF‑THEN rules as used in clinical decision support systems【940019348011578†L228-L260】.
* **Parallel Block:** Splits the flow into concurrent branches that will later synchronize.
* **Wait/Event Block:** Waits for specific events (result ready, payment posted, IoT alert) or manual signals.  Waits include timeouts and specify what happens if events do not arrive.
* **Timer Block:** Triggers after a defined duration or calendar time, often used for reminders and escalations.
* **Subflow Block:** Embeds another workflow definition as a reusable module (e.g., specimen collection).
* **Gate/Checkpoint Block:** Enforces that certain prerequisites are satisfied before proceeding (e.g., pre‑operative checklist complete).

The canvas supports zooming, panning, alignment, grouping and multi‑select operations.  Blocks snap to a grid to keep diagrams neat, and connectors clearly indicate the flow of control.  Users can annotate connections with labels (e.g., *Yes*, *No*).  A minimap helps navigate large diagrams.

## Block Inspectors

Selecting a block opens an **inspector panel** that shows editable properties.  Key inspector features include:

* **Order Block Inspector:** Choose the catalog item (lab test, imaging study, medication, procedure), configure parameters (dosage, frequency), specify prerequisites (allergy checks, consent needed) and link compensation actions for cancellation.  For example, Cerner PowerPlans allow clinicians to rapidly choose which drug to prescribe along with dosing and length of treatment【925437338200957†L1935-L1944】; the inspector should make these parameters explicit.
* **Task Block Inspector:** Define assignee roles, input form fields, SLAs, escalation policies and outputs.  Inputs might include specimen IDs, payment amounts or counselling notes.  Outputs feed into downstream steps.
* **Instruction Block Inspector:** Enter instruction text and assign tags (e.g., fasting, isolation).  Indicate whether the instruction is blocking and whether acknowledgment is required from the patient or staff.
* **Decision Block Inspector:** Select a rule from a library or define new logic using IF‑THEN expressions.  Each branch has a label and target step; a default branch is mandatory to avoid dead ends.
* **Wait/Event Block Inspector:** Specify event names and correlation keys (patient ID, encounter ID, order ID) along with policies such as *any* vs. *all* events and timeout behavior.
* **Timer Block Inspector:** Configure duration (absolute or relative), escalation actions and target steps upon timer expiry.
* **Subflow Inspector:** Select a reusable workflow and map its inputs/outputs to the parent flow’s context.  This encourages reuse and reduces errors.
* **Gate/Checkpoint Inspector:** Name the gate, list the required flags/tasks/documents and choose the behavior when a requirement is not met (e.g., block progression or allow override with justification).

## Validation & Linting

Before publishing, the designer performs **linting** to identify issues such as:

* Orphaned nodes or dead branches (no incoming/outgoing connections).
* Cycles without waits (which could lead to infinite loops).
* Branches missing a default path.
* Missing compensations for steps with side effects.
* Mismatched data mappings (inputs/outputs inconsistent with block definitions).
* Unbounded waits (no timeout defined) which could lead to stalled workflows.
* SLAs missing where policy mandates them.

Validation errors and warnings are presented with hyperlinks to the offending block.  Users cannot publish workflows with unresolved errors; they may choose to publish with warnings but must acknowledge the potential risks.

## Versioning & Publishing

Workflow definitions and order sets are **versioned**.  Changes undergo the following lifecycle:

1. **Draft:** An author edits a definition in a personal workspace.  Multiple drafts can exist concurrently.
2. **Review:** The draft is submitted for review by peers or a governance committee.  Feedback is captured via comments.
3. **Approved:** Once reviewers approve, the definition moves to the approved state.  At this stage, final checks (e.g., translation, coding compliance) are performed.
4. **Published:** The definition becomes available for new workflow instances.  Existing running instances continue using the version they started with to avoid mid‑case changes.  Migration of running cases can occur at safe gates with validation.

The designer supports **diff views** between versions, highlighting added, removed or modified blocks and properties.  Authors can compare versions to understand the impact of changes.

## Preview & Simulation

Before deploying a workflow, authors can **simulate** its behavior using sample patient data.  Simulation features include:

* **Step‑through execution:** Authors can manually advance through each step, viewing which tasks, orders and events are generated.  They can change simulated inputs (e.g., lab results) to test branching logic.
* **Event and timer injection:** Authors can trigger events or let timers expire to observe escalation behavior.
* **Bottleneck analysis:** The simulator highlights the critical path and potential delays.  For example, if lab turnaround is slower than expected, the simulator shows how it affects the overall visit.
* **Checklists and gates:** Authors can test whether gates correctly block progression until all required tasks or documents are completed.

By providing a robust visual designer with inspectors, validation, versioning and simulation, the orchestration layer empowers clinicians to model complex workflows in a controlled and auditable manner, similar to how mature EMRs support building and managing order sets【925437338200957†L1935-L1946】【745034776155115†L919-L950】.
