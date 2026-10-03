const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let students = [
  { id: 1, name: 'Rahul Sharma', roll: 'CSE-101', course: 'Computer Science' },
  { id: 2, name: 'Priya Verma', roll: 'AI-102', course: 'Artificial Intelligence' }
];

app.get('/', (req, res) => {
  let tableRows = students.map(s => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ccc;">${s.id}</td>
      <td style="padding: 8px; border: 1px solid #ccc;">${s.name}</td>
      <td style="padding: 8px; border: 1px solid #ccc;">${s.roll}</td>
      <td style="padding: 8px; border: 1px solid #ccc;">${s.course}</td>
      <td style="padding: 8px; border: 1px solid #ccc;">
        <form action="/delete/${s.id}" method="POST" style="margin: 0;">
          <button type="submit" style="background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; cursor: pointer;">Delete</button>
        </form>
      </td>
    </tr>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Student Management System</title></head>
    <body style="font-family: Arial, sans-serif; margin: 40px; background-color: #f9f9f9;">
      <h2>Student Management System (DevOps TAE-II)</h2>
      <div style="background: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px #ccc; margin-bottom: 20px;">
        <h3>Add New Student (CREATE)</h3>
        <form action="/add" method="POST">
          <input type="text" name="name" placeholder="Full Name" required style="padding: 8px; margin-right: 5px;" />
          <input type="text" name="roll" placeholder="Roll No" required style="padding: 8px; margin-right: 5px;" />
          <input type="text" name="course" placeholder="Course / Branch" required style="padding: 8px; margin-right: 5px;" />
          <button type="submit" style="padding: 8px 15px; background-color: #28a745; color: white; border: none; cursor: pointer;">Add Student</button>
        </form>
      </div>
      <div style="background: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px #ccc;">
        <h3>Student List (READ & DELETE)</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">ID</th>
              <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Name</th>
              <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Roll No</th>
              <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Course</th>
              <th style="padding: 8px; border: 1px solid #ccc; text-align: left;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows.length ? tableRows : '<tr><td colspan="5" style="padding: 8px; text-align: center;">No records found.</td></tr>'}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const { name, roll, course } = req.body;
  const newId = students.length ? students[students.length - 1].id + 1 : 1;
  students.push({ id: newId, name, roll, course });
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const targetId = parseInt(req.params.id);
  students = students.filter(s => s.id !== targetId);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Application active on port ${PORT}`));