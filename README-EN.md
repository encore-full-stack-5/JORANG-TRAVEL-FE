# JORANG - Everything about Travel✈️

## <br> 📃 Key Features
### Writing and Sharing Travel Logs, Expenses, and Plans

- Writing and sharing travel logs and expenses by date
- Uploading and retrieving photos using Google Cloud Storage
- Implementing an image slider
- Visualizing expenses in a chart
- Sorting travel logs by recent date and likes, and filtering by travel duration
- Sending a temporary password via email when changing user ID or email

### <br> Full Project Introduction
https://github.com/jinho9482/JORANG-TRAVEL

### Main Server (Java with Spring Boot)
https://github.com/encore-full-stack-5/JORANG-TRAVEL-BE

### Langchain Server
https://github.com/encore-full-stack-5/JORANG_LANGCHAIN_SERVER

## <br> 📃 Screen Composition and Function Introduction (Video)
### 1. Check Travel Logs by Country ###

https://github.com/user-attachments/assets/a2ea9a2e-9f42-490c-aff8-9575c6e234fd

### <br> 2. Check All Travel Logs ###

https://github.com/user-attachments/assets/b5763e68-649d-4c56-b9f9-6a492f1f1b8f

### <br> 3. Writing and Sharing Travel Logs ###

https://github.com/user-attachments/assets/a62dcd25-fe13-4b7b-92ee-a55645de2555

### <br> 4. Temporary Saving and Editing Travel Logs ###

https://github.com/user-attachments/assets/bb1a542d-729c-4390-8eb5-7b50abc26043

### <br> 5. Travel Chatbot ###

https://github.com/user-attachments/assets/5277301b-6221-4451-9c30-7a4ac4897c13

## <br> ⚙️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)<br><br>

### 🔧 Troubleshooting

<br>

**1. When deleting expenses, savedExpenses are also deleted (∵ shallow copy)<br><br>**
> * Cause: When copying variables using shallow copy as shown below, arrays or objects inside point to the address of the copied variable.<br>
>```javascript
>   const savedExpenses = [...expenses]
>```
> * Solution: Use structuredClone() to create a copy that points to a different address.<br>
>```javascript
> ======================= Shallow copy ============================
>
>const original = { name: "Alice", address: { city: "Wonderland" } };
>
>// Shallow copy using the spread operator
>const shallowCopy = { ...original };
>
>shallowCopy.name = "Bob"; // Changes only shallowCopy
>shallowCopy.address.city = "Paris"; // This will change both shallowCopy and original
>
>console.log(original); 
>// Output: { name: "Alice", address: { city: "Paris" } } 
>// Notice how the `city` property of the `address` object has changed in `original`.
>
>======================= Deep copy ============================
>
>const original = { name: "Alice", address: { city: "Wonderland" } };
>
>// Deep copy using structuredClone (ES2021+)
>const deepCopy = structuredClone(original);
>
>deepCopy.name = "Bob"; // Changes only deepCopy
>deepCopy.address.city = "Paris"; // Only changes deepCopy, not the original
>
>console.log(original); 
>// Output: { name: "Alice", address: { city: "Wonderland" } } 
>// The original object remains unchanged.
>```

<br>

**2. Issues encountered while handling pagination<br><br>**
> 1. When selecting a period, it should be filtered on each page (the posts should not be duplicated on each page)<br>
> → Fetch all posts and filter on the front-end (if pagination is handled on the server, filtering cannot be done on all posts).
> 2. The current page should be maintained upon refreshing the page.<br>
> → Store the current page in localStorage.
> 3. Changing the page number is necessary when setting the period.<br>
> → Update the page number based on the new posts received.
> 4. The page number should be displayed from the first render.<br>
> → Use useEffect to handle this (if set as the default value in useState, it will not be displayed).
> 5. If the number of posts decreases after setting the period on page 2, it should move to page 1, but it remains on page 2.<br>
> → Change the current page to page 1 upon re-rendering after setting the period.
> 6. When returning from a different URL, it should stay on the original page.<br>
> → Delete the current page from localStorage when moving to another page.

<br>

**3. Issues encountered while structuring the page for writing travel logs (travel stories, expenses)<br><br>**
> 1. Difficulty in button placement.<br>
> → Since both travel stories and expenses are child tables of the travel log table, the parent table (travel log entity) must be created first.<br>
> → A separate page was created for generating travel logs before writing travel stories and expenses.<br>
> → However, since many users enter the page without writing travel stories or expenses, a lot of null values are inserted into the post_id row in the database.<br>
> → The API calls are structured to save in order from the parent table when saving or publishing.<br>
> **→ This issue arose from the misconception that only one API should be called per button.**<br>

> 2. Difficulty in implementing temporary saving and publishing.<br>
> → Publishing is possible with either travel stories or expenses, while temporary saving requires only the travel log title. Additionally, there are multiple cases of alerting empty fields.<br>
> → Both the temporary save and publish buttons can trigger either save (initial save) or update (temporary save followed by publishing or saving), requiring differentiation of API calls based on the server's ID for each travel story and expense.
>
> 3. Difficulty in implementing photo saving.<br>
> → When sending file types from the front-end, use FormData format, and the server handles it as Multipart type.<br>
> → When deleting photos, if they already exist in the database, all existing photos in the database and Google Cloud Storage must be deleted and saved anew. In cases where the delete button for travel logs is clicked, an attempt was made to automatically delete photos through cascading, but the photos in Google Cloud Storage were not deleted. As a solution, an additional photo deletion API was created and called.

**4. Issues encountered when retrieving travel logs with child entities (travel stories, expenses, photos) in a nested list structure<br><br>**
> * Cause: Since the parent and child tables are bidirectionally mapped, all child lists are retrieved when fetching the parent.
> * Solution Direction:
>   1) Separate states for travel stories, expenses, and photos from the retrieved list.<br>
>   2) Change the table to unidirectional mapping and remove the cascade processing from parent to child tables, creating an isDeleted column to control deletion instead of actual data removal.
<br>
