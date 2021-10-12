//http://svcy.myclass.vn/

let studentList = [];
//function 1: get data/ student list from backend
const fetchStudents = () => {
  axios
    .get("http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien")
    .then((response) => {
      //console.log(response.data);
      studentList = response.data;
      // console.log(studentList);
      renderStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchStudents();
//function 2: show studentList on the browser/ html
const renderStudents = () => {
  let row = "";
  for (let student of studentList) {
    row += `
    <tr>
    <td>${student.MaSV}</td>
    <td>${student.HoTen}</td>
    <td>${student.Email}</td>
    <td>${student.SoDT}</td>
  <!--<td>${student.CMND}</td>-->
    <td>${student.DiemToan}</td>
    <td>${student.DiemLy}</td>
    <td>${student.DiemHoa}</td>
    <td>
      <button class="btn btn-danger btn-delete" onclick = "deleteStudent('${student.MaSV}' )"> Delete</button>
      <button class="btn btn-info btn-update" onclick = "getStudent('${student.MaSV}')" > Update</button>
    </td>
    </tr>
    `;
    document.querySelector("#studentListTable").innerHTML = row;
  }
  //console.log(row);
};
//function 3: add student
const addStudent = () => {
  const studentId = document.querySelector("#id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const idCard = document.getElementById("idCard").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  const newStudent = new Student(
    studentId,
    name,
    email,
    phone,
    idCard,
    math,
    physics,
    chemistry
  );
  console.log(newStudent);
  axios
    .post("http://svcy.myclass.vn/api/SinhVien/ThemSinhVien", newStudent)
    .then((res) => {
      console.log(res);
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};
document.querySelector(".btn-addStudent").addEventListener("click", addStudent);
//function 4: delete student
const deleteStudent = (id) => {
  axios
    .delete(`http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`)
    .then((res) => {
      console.log(res);
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

// document
//   .querySelector("#btn-delete")
//   .addEventListener("click", deleteStudent(id));

//function 5: get student's information that will be updated then show it on the updated form
const getStudent = (id) => {
  axios
    .get(`http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`)
    .then((res) => {
      // console.log(res);
      document.querySelector("#btnThem").click();
      document.querySelector("#id").value = res.data.MaSV;
      document.getElementById("name").value = res.data.HoTen;
      document.getElementById("email").value = res.data.Email;
      document.getElementById("phone").value = res.data.SoDT;
      document.getElementById("idCard").value = res.data.CMND;
      document.getElementById("math").value = res.data.DiemToan;
      document.getElementById("physics").value = res.data.DiemLy;
      document.getElementById("chemistry").value = res.data.DiemHoa;

      document.getElementById("id").setAttribute("disabled", true);
    })
    .catch((err) => {
      console.log(err);
    });
};

//function 6: update Student
const updateStudent = () => {
  //step 1: DOM to input, get infor that user just fixed
  const studentId = document.querySelector("#id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const idCard = document.getElementById("idCard").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;
  //step 2: create a new object with old id but other infor is new
  const newStudent = new Student(
    studentId,
    name,
    email,
    phone,
    idCard,
    math,
    physics,
    chemistry
  );
  axios
    .put(
      "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
      newStudent
    )
    .then((res) => {
      console.log(res);
      fetchStudents();
      //clear form
      document.getElementById("btnReset").click();
      //remove "disabled" attribute of id input
      document.getElementById("id").removeAttribute("disabled");
    })
    .catch((err) => {
      console.log(err);
    });
};
