export interface POData {
  nama: string;
  alamat: string;
  nohp: string;
  partner: string;
  size: string;
  qty: number;
  kota: string;
  status: string;
  file: File;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxU3MmY0pshjIExUDXxL7ZK1iY-hb9OPbJBgQZ6-_RK3pBHHlfFV0hDvMYdnIh6lF7J/exec";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];

      resolve(base64);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export async function submitPO(data: POData) {
  const base64 = await fileToBase64(data.file);

  const payload = {
    nama: data.nama,
    alamat: data.alamat,
    nohp: data.nohp,
    partner: data.partner,
    kota: data.kota,
    size: data.size,
    qty: data.qty,
    status: data.status,

    file: {
      name: data.file.name,
      mimeType: data.file.type,
      base64: base64,
    },
  };
  console.log("Payload yang dikirim:", payload);

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  console.log("Respon mentah dari Apps Script:", responseText);

  let result;
  try {
    result = JSON.parse(responseText);
  } catch (e) {
    throw new Error(`Google Apps Script merespon bukan JSON (Kemungkinan Error Script):\n${responseText.substring(0, 150)}...`);
  }

  if (!result.success) {
    throw new Error(result.message || "Gagal mengirim PO");
  }

  const nomorWA = "6285151069208";

  const message = `Halo Varnero, saya ingin konfirmasi Purchase Order:

No PO: ${result.noPO}
Nama: ${data.nama}
No HP: ${data.nohp}
Alamat: ${data.alamat}
Kota: ${data.kota}
Partner: ${data.partner}
Size: ${data.size}
Qty: ${data.qty}
Pembayaran: ${data.status}`;

  const waUrl = `https://wa.me/${nomorWA}?text=${encodeURIComponent(message)}`;

  return {
    success: true,
    noPO: result.noPO,
    waUrl,
  };
}