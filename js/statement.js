// ------------------------HW 24/5/2025---------------------

//Bai 1
function InKetQua() {
    // Lấy input
    let diem1 = +document.getElementById("subject1").value;
    let diem2 = +document.getElementById("subject2").value;
    let diem3 = +document.getElementById("subject3").value;
    let area = document.getElementById("area").value.toUpperCase(); // A/B/C/X
    let identify = +document.getElementById("identify").value; // 0/1/2/3

    let resultPanel = document.getElementById("ketQuaBai1");
    // Kiểm tra nhập điểm hợp lệ
    if (
        isNaN(diem1) || isNaN(diem2) || isNaN(diem3) ||
        diem1 < 0 || diem2 < 0 || diem3 < 0 || diem1 > 10 || diem2 > 10 || diem3 > 10
    ) {
        resultPanel.innerText = "Vui lòng nhập điểm hợp lệ từ 0 đến 10.";
        return;
    }

    // Nếu có môn nào 0 điểm => rớt luôn
    if (diem1 === 0 || diem2 === 0 || diem3 === 0) {
        resultPanel.innerText = "Bạn đã rớt vì có môn 0 điểm.";
        return;
    }

    // Điểm ưu tiên khu vực
    let diemKhuVuc = 0;
    switch (area) {
        case "A":
            diemKhuVuc = 2;
            break;
        case "B":
            diemKhuVuc = 1;
            break;
        case "C":
            diemKhuVuc = 0.5;
            break;
        case "X":
        default:
            diemKhuVuc = 0;
            break;
    }

    // Điểm ưu tiên đối tượng
    let diemDoiTuong = 0;
    switch (identify) {
        case 1:
            diemDoiTuong = 2.5;
            break;
        case 2:
            diemDoiTuong = 1.5;
            break;
        case 3:
            diemDoiTuong = 1;
            break;
        default:
            diemDoiTuong = 0;
            break;
    }

    // Tính điểm tổng kết
    let tongDiem = diem1 + diem2 + diem3 + diemKhuVuc + diemDoiTuong;

    // Điểm chuẩn hội đồng giả định (VD: 20)
    let diemChuan = 20;

    // Đánh giá kết quả
    let ketQua = tongDiem >= diemChuan
        ? `Bạn đã đậu với tổng điểm: ${tongDiem}`
        : `Bạn đã rớt với tổng điểm: ${tongDiem}`;

    // Hiển thị kết quả
    resultPanel.innerText = ketQua;
}


//Bai 2
function CalcElectBill() {
    let inputKw = +document.getElementById("electAmount").value;
    let total = 0;

    if (isNaN(inputKw) || inputKw < 0) {
        document.getElementById("electResult").innerText = "Vui lòng nhập số Kw hợp lệ.";
        return;
    }

    let remainingKw = inputKw;

    if (remainingKw > 0) {
        let used = Math.min(remainingKw, 50);
        total += used * 500;
        remainingKw -= used;
    }

    if (remainingKw > 0) {
        let used = Math.min(remainingKw, 50);
        total += used * 650;
        remainingKw -= used;
    }

    if (remainingKw > 0) {
        let used = Math.min(remainingKw, 100);
        total += used * 850;
        remainingKw -= used;
    }

    if (remainingKw > 0) {
        let used = Math.min(remainingKw, 150);
        total += used * 1100;
        remainingKw -= used;
    }

    if (remainingKw > 0) {
        total += remainingKw * 1300;
    }

    document.getElementById("electResult").innerText =
        `Tổng tiền điện: ${total.toLocaleString('vi-VN')}VND`;
}

//Bai 3
function CalcTax() {
    let name = document.getElementById("customeName").value.trim();
    let income = +document.getElementById("customeSalary").value; // triệu VND
    let dependents = +document.getElementById("amountDependPerson").value;

    let resultPanel = document.getElementById("calcTaxResult");
    // Kiểm tra đầu vào
    if (!name || isNaN(income) || isNaN(dependents) || income < 0 || dependents < 0) {
        resultPanel.innerText = "Vui lòng nhập thông tin hợp lệ.";
        return;
    }

    // Tính thu nhập chịu thuế
    let thuNhapChiuThue = income - 4 - dependents * 1.6;

    if (thuNhapChiuThue <= 0) {
        resultPanel.innerText = `${name} không phải đóng thuế.`;
        return;
    }

    let taxRate = 0;

    if (thuNhapChiuThue <= 60000000) {
        taxRate = 0.05;
    } else if (thuNhapChiuThue <= 120000000) {
        taxRate = 0.10;
    } else if (thuNhapChiuThue <= 210000000) {
        taxRate = 0.15;
    } else if (thuNhapChiuThue <= 384000000) {
        taxRate = 0.20;
    } else if (thuNhapChiuThue <= 624000000) {
        taxRate = 0.25;
    } else if (thuNhapChiuThue <= 960000000) {
        taxRate = 0.30;
    } else {
        taxRate = 0.35;
    }
    let tax = Math.ceil(thuNhapChiuThue * taxRate);

    resultPanel.innerText =
        `${name} phải đóng thuế: ${tax.toLocaleString()} VND`;
}


//Bai 4
function toggleConnectionField() {
  let type = document.getElementById('customerType').value;
  let connGroup = document.getElementById('connectionGroup');
  connGroup.style.display = (type === 'business') ? 'block' : 'none';
}

function calcCableBill() {
  let customerId = document.getElementById('customerId').value;
  let customerType = document.getElementById('customerType').value;
  let premiumChannels = Number(document.getElementById('premiumChannels').value);
  let connectionCount = Number(document.getElementById('connectionCount').value || 0);

  let bill = 0;

  if (customerType === 'residential') {
    bill = 4.5 + 20.5 + (premiumChannels * 7.5);
  } else if (customerType === 'business') {
    let baseConnectionFee = 75;
    let extraConnections = connectionCount > 10 ? (connectionCount - 10) * 5 : 0;
    bill = 15 + baseConnectionFee + extraConnections + (premiumChannels * 50);
  }

  document.getElementById('cableBillResult').innerText =
    `Mã KH: ${customerId} - Tiền cáp: $${bill.toLocaleString('en-US')}`;
}