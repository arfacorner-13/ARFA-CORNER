const prices = {
    "dimsumMentaiS": 10000,   // Harga Dimsum Mentai S
    "dimsumMentaiL": 20000,   // Harga Dimsum Mentai L
    "dimsumMentaiXL": 28000,  // Harga Dimsum Mentai XL
    "dimsumOriginalS": 8000,   // Harga Dimsum Original S
    "dimsumOriginalL": 15000,  // Harga Dimsum Original L
    "dimsumOriginalXL": 22000,  // Harga Dimsum Original XL
    "matcha": 10000,          // Harga Matcha 1 pcs = 10000
    "kopiSusu": 9000          // Harga Kopi Susu 1 pcs = 9000
};

let quantities = {
    "dimsumMentaiS": 0,
    "dimsumMentaiL": 0,
    "dimsumMentaiXL": 0,
    "dimsumOriginalS": 0,
    "dimsumOriginalL": 0,
    "dimsumOriginalXL": 0,
    "matcha": 0,
    "kopiSusu": 0
};

function updateQuantity(product, action) {
    if (action === 'increase') {
        quantities[product]++;
    } else if (action === 'decrease' && quantities[product] > 0) {
        quantities[product]--;
    }

    document.getElementById(`${product}Qty`).textContent = quantities[product];
    updateTotalPrice();
}

function updateTotalPrice() {
    let total = 0;
    let message = `Halo, saya ingin membeli Dimsum:\n`;
    const buyerName = document.getElementById("buyerName").value.trim();

    // Validasi jika nama pembeli kosong
    if (!buyerName) {
        alert("Nama pembeli harus diisi!");
        return;
    }

    message += `Nama Pembeli: ${buyerName}\n`; // Menambahkan nama pembeli

    // Menghitung total harga dan menambahkan item yang dipesan
    for (let product in quantities) {
        if (quantities[product] > 0) {  // Menambahkan produk yang dipesan
            total += quantities[product] * prices[product];
            message += `${product.replace(/([A-Z])/g, ' $1').trim()}: ${quantities[product]} pcs\n`; // Menambahkan nama produk dan kuantitas
        }
    }

    message += `Total Pembayaran: Rp ${total}`;

    // Membuat link WhatsApp dengan pesan
    const whatsappLink = `https://wa.me/6281381447246?text=${encodeURIComponent(message)}`;
    document.getElementById("whatsappLink").setAttribute("href", whatsappLink);

    // Menampilkan total harga di halaman
    document.getElementById("totalPrice").textContent = total;
}
