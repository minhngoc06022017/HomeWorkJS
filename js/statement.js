// HW 24/5/2025
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