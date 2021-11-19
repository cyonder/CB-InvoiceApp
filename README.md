### Objective

Your challenge is to build out this invoicing application for Coinberry's accounting department and get it looking as close to the design as possible.

### Brief

Using TypeScript and React, your task is to build out the project to the design files provided in the `/designs` folder. The functionality outlined in **Expected Behaviour** is more important than implementing the designs pixel-perfect. You are only supposed to build out the desktop version of the assignment and it does not need to be responsive.

All the required assets for this project are in the `/assets` folder. The assets are already exported for the correct screen size and optimized. Some images are reusable at multiple screen sizes. So if you don't see an image in a specific folder, it will typically be in another folder for that page.

The design system file will give you more information about the various colors, fonts, and styles used in this project.

We provide the data in a local `data.json` file, so use that to populate the content on first load.

### Tasks

- Implement assignment using:
  - Language: **TypeScript**
  - Framework: **React**

Your users should be able to:

- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices

### Expected Behaviour

- Creating an invoice
  - When creating a new invoice, an ID needs to be created. Each ID should be 2 random uppercased letters followed by 4 random numbers.
  - Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
  - Changing the Payments Terms field should set the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms.
  - The `total` should be the sum of all items on the invoice.
- Editing an invoice
  - When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
  - If the invoice being edited is a "draft", the status needs to be updated to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.
- Users should be able to mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".
- **Bonus**: Users should receive a confirmation modal when trying to delete invoices.
- Feel free not to add custom styling for the date and dropdown form fields. The designs for those fields are optional extras and are mostly for illustration purposes.

### Evaluation Criteria

- **TypeScript** best practices
- Show us your work through your commit history
- We're looking for you to produce working code with enough room to demonstrate how to structure components in a small program
- Completeness: did you complete the features?
- Correctness: does the functionality act in sensible, thought-out ways?
- Maintainability: is it written in a clean, maintainable way?
- Testing: is the system adequately tested?

### CodeSubmit

Please organize, design, test, and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

**Have fun building!** 🚀

The Coinberry Team