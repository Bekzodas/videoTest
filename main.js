const myModal = new bootstrap.Modal(document.getElementById("myModal"), {
  keyboard: false,
});

const url = "https://jsonplaceholder.typicode.com/users";
const getUsers = async () => {
  try {
    const res = await axios.get(url);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Xatolik Yuz Berdi" + error);
    return { success: false, data: [] };
  }
};
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const table = document.getElementsByTagName("table")[0];
const tbody = document.getElementsByTagName("tbody")[0];

const setUsers = async () => {
  const res = await getUsers();
  loading.classList.add("d-none");
  if (res.success) {
    tbody.innerHTML = "";
    table.classList.remove("d-none");

    res.data.map((value, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${index + 1}</td>
      <td>${value.name}</td>
      <td>${value.email}</td>
      <td>
      ${value.address.city}  ${value.address.street}
        <a
          href="https://maps.google.com/maps/place/${value.address.geo.lat}${
        value.address.geo.lng
      }"
          target="blank"
          ><i class="fas fa-location"></i
        ></a>
      </td>
      <td>${value.phone}</td>
      <td><a href="https://www.${value.website}">${value.website}</a></td>
      <td>${value.company.name}</td>
      <td>
        <button class="btn btn-primary mr-2" onclick = "openModal('put', 
        ${value.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger">
          <i class="fas fa-trash"></i>
        </button>
      </td>`;
      tbody.appendChild(row);
    });
  } else {
    error.classList.remove("d-none");
  }
};
setUsers();

// add edit function

const title = document.getElementById("exampleModalLabel");
const saveData = async () => {
  const street = document.getElementById("street").value;
  const city = document.getElementById("city").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const company = document.getElementById("company").value;
  const name = document.getElementById("name").value;
  const website = document.getElementById("website").value;

  const obj = {
    // "id": 1,
    name,
    email,
    address: {
      city,
      street,
    },
    phone,
    website,
    company: {
      name: company,
    },
  };

  console.log(obj);
  const res = await postData(obj);
  if (res.success) {
    clearInputsAndHide();
    setUsers();
    alert("Qo'shildi");
  } else alert("Muammo Bo'ldi");

  setUsers();
  myModal.hide();
};
const clearInputsAndHide = () => {
  document.getElementById("street").value = "";
  document.getElementById("city").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("company").value = "";
  document.getElementById("name").value = "";
  document.getElementById("website").value = "";
};

// open modal
const openModal = (type, id) => {
  console.log(type);
  if (type === "post") {
    title.innerHTML = "Post User";
  } else if (title === "put") {
    title.innerHTML = "Post Usr";
  }
  myModal.show();
};

// post data
const postData = async (obj) => {
  try {
    const res = await axios.post(url, obj);
    console.log(res);
    return { success: true, res: res };
  } catch (error) {
    console.log("Xattolik Yuz Berdi: " + error);
    return { success: false, res: error };
  }
};

// put data
const putData = async (id) => {
  myModal.show();
  const res = await getUserById(id);
  if (res.success) {
    const data = res.data;
    document.getElementById("street").value = data.address.street;
    document.getElementById("city").value = data.address.city;
    document.getElementById("phone").value = data.phone;
    document.getElementById("email").value = data.email;
    document.getElementById("company").value = data.company.name;
    document.getElementById("name").value = data.name;
    document.getElementById("website").value = data.website;
  }
};

// get user by id
const getUserById = async (id) => {
  try {
    const res = await axios.get(url + "/" + id);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Xatolik Yuz Berdi" + error);
    return { success: false, data: [] };
  }
};
