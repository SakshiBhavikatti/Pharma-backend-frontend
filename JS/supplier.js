const fetchSuppliers = async () => {
    const response = await fetch("http://localhost:3000/api/supplier");
    const suppliers = await response.json();
    const tbody = document.getElementById("supplierTable").querySelector("tbody");
    
    suppliers.forEach(supplier => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${supplier.SupplierID}</td>
            <td>${supplier.SName}</td>
            <td>${supplier.Address}</td>
            <td>${supplier.ContactNumber}</td>
            <td>${supplier.Email}</td>
            <td>${supplier.Med_ID}</td>
        `;
        tbody.appendChild(row);
    });
};

fetchSuppliers();