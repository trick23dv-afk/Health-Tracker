const form = document.getElementById('trackerForm');
const tableBody = document.querySelector('#recordsTable tbody');

// Load saved records
let records = JSON.parse(localStorage.getItem('healthRecords')) || [];
renderTable();

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const systolicValue = parseInt(document.getElementById('systolic').value, 10);
  const status = systolicValue > 130 ? "High" : "Normal";

  const record = {
    name: document.getElementById('name').value,
    systolic: systolicValue,
    diastolic: document.getElementById('diastolic').value,
    sugar: document.getElementById('sugar').value,
    status: status,
    remarks: document.getElementById('remarks').value || "",
    date: new Date().toLocaleString()
  };

  records.push(record);
  localStorage.setItem('healthRecords', JSON.stringify(records));
  renderTable();
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = '';
  records.forEach(r => {
    const row = `<tr>
      <td>${r.name}</td>
      <td>${r.systolic}</td>
      <td>${r.diastolic}</td>
      <td>${r.status}</td>
      <td>${r.sugar}</td>
      <td>${r.remarks}</td>
      <td>${r.date}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  function renderTable() {
    tableBody.innerHTML = '';
    records.forEach(r => {
      const statusClass = r.status === "High" ? "status-high" : "status-normal";
      const row = `<tr>
        <td>${r.name}</td>
        <td>${r.systolic}</td>
        <td>${r.diastolic}</td>
        <td><span class="${statusClass}">${r.status}</span></td>
        <td>${r.sugar}</td>
        <td>${r.remarks}</td>
        <td>${r.date}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }
}
