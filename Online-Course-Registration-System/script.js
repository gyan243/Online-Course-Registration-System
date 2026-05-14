const loginBox = document.getElementById("loginBox");
const mainBox = document.getElementById("mainBox");
const studentTable = document.getElementById("studentTable");

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username !== "" && password !== "") {
    loginBox.style.display = "none";
    mainBox.style.display = "block";
    loadStudents();
  } else {
    alert("Please enter username and password");
  }
}

function logout() {
  mainBox.style.display = "none";
  loginBox.style.display = "block";
}

function selectCourse(courseName) {
  document.getElementById("selectedCourse").value = courseName;
  document.querySelector(".form-section").scrollIntoView({
    behavior: "smooth"
  });
}

function submitRegistration() {
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("email").value.trim();
  const course = document.getElementById("selectedCourse").value.trim();

  if (name === "" || email === "" || course === "") {
    alert("Please fill name, email and select course");
    return;
  }

  const student = { name, email, course };

  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);

  localStorage.setItem("students", JSON.stringify(students));

  alert("Registration Successful ✅");

  document.getElementById("studentName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("selectedCourse").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";

  loadStudents();
}

function loadStudents() {
  studentTable.innerHTML = "";

  let students = JSON.parse(localStorage.getItem("students")) || [];

  document.getElementById("totalStudents").innerText = students.length;

  students.forEach((student, index) => {
    studentTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td><span class="active-status">Registered</span></td>
        <td>
          <button class="delete-btn" onclick="deleteStudent(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  students.splice(index, 1);

  localStorage.setItem("students", JSON.stringify(students));

  loadStudents();
}

function searchStudent() {
  const input = document.getElementById("searchStudent").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTable tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}