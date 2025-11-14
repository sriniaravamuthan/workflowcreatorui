# Natural‑Language Authoring

The orchestration layer supports **natural‑language (NL) authoring** as an alternative to the visual designer.  Clinicians can type or dictate free‑form sentences describing the intended care plan (for example, *“For suspected sepsis, start IV fluids, draw CBC, lactate and blood cultures, administer broad‑spectrum antibiotics within one hour, and do not discharge until lactate clears or the intensivist reviews.”*).  The system transforms this narrative into a structured workflow with orders, tasks, instructions and decision logic.

## Authoring Experience

1. **Free‑text intake:** Users enter NL descriptions via a text box or voice input.  The system immediately performs entity recognition to identify potential orders, tasks and instructions.
2. **Highlighting entities:** Recognized entities are highlighted and categorized (e.g., tests, medications, procedures, timing statements, conditions).  Users can click on a highlight to view details or change the matched catalog item.
3. **Draft flow generation:** The system assembles a draft workflow with appropriate blocks.  Orders become order blocks; tasks become task blocks; phrases like *“within one hour”* become timers; conditional clauses become decision blocks.  The resulting flow can be previewed on the canvas.

## Disambiguation & Confirmation

Natural language can be ambiguous.  To ensure patient safety, the engine must resolve ambiguities before publishing an NL‑generated workflow.  The disambiguation process includes:

* **Clarification questions:** When multiple catalog items match a term (e.g., *“broad‑spectrum antibiotics”* could refer to different drugs), the system asks targeted questions (e.g., *“Which antibiotic and dose schema?”*).  Users choose from a list or specify new parameters.
* **Dose and schedule prompts:** For medications, the system prompts for dose, route, frequency and duration if they are missing.  Cerner PowerPlans let clinicians specify dosing and length of treatment when selecting a medication【925437338200957†L1935-L1944】; NL authoring must capture the same details.
* **Role assignment:** For tasks, the system asks which role should perform the work (nurse, lab tech, front desk) if not already specified.
* **Rule confirmation:** When the narrative implies conditional logic (e.g., *“if lactate > 2 mmol/L, consult intensivist”*), the system generates a decision block and asks the author to confirm the threshold and action.
* **Instruction flags:** The system determines whether an instruction is blocking; for instance, *“do not discharge until lactate clears”* implies a gate.

After clarifications, the engine presents a **confirmation UI** summarizing the orders, tasks, instructions, timers and decisions.  The author can accept, edit, or cancel each item.  Only confirmed items are added to the library.

## Repeatability & Templates

Once confirmed, the NL‑derived flow can be saved as a reusable order set or subflow.  Authors assign a name, tags (e.g., *sepsis*, *emergency*) and sharing scope (personal, team, department or hospital).  This mirrors how commercial EMR systems allow clinicians to save favorite order sets or PowerPlans【925437338200957†L1935-L1946】【745034776155115†L919-L950】.

Templates maintain version history and can be edited later either via the visual designer or by re‑invoking the NL authoring process.  Tags enable search and retrieval from the workflow library.

## Guardrails & Safety Checks

Natural‑language processing introduces the risk of misinterpretation or oversimplification.  To protect patients and clinicians, the following guardrails are applied:

* **Medical safety checks:** The engine performs allergy and interaction checks for medication orders.  Clinical decision support rules rely on knowledge‑based IF‑THEN logic to evaluate patient data and produce an action or alert【940019348011578†L228-L260】; similar mechanisms flag duplicates or contraindications.
* **Policy checks:** Before imaging or procedures, the system checks whether consent or prior authorization is required.  Unmet prerequisites result in tasks or gates.
* **Linting alignment:** The flow passes through the same validation as visually designed workflows (no orphaned nodes, defined compensations, bounded waits, etc.).
* **Transparency:** The engine displays all inferred actions for human review.  Non‑knowledge‑based AI can be opaque and hard to justify【940019348011578†L234-L242】; therefore, the NL authoring feature uses deterministic, rule‑driven parsing and requires user confirmation for every step.
* **Alert fatigue mitigation:** Clinical decision support literature warns that excessive alerts can cause providers to ignore important messages【940019348011578†L276-L279】.  The system groups clarifications and avoids interruptive pop‑ups unless essential.

By combining intuitive NL input, interactive disambiguation and rigorous safety checks, the orchestration layer democratizes workflow authoring while preserving the determinism and governance required for patient care.
