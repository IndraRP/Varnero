export interface POData {
    nama: string;
    alamat: string;
    nohp:string;
    partner: string;
    size: string;
    qty:number;
    kota:string;
    file: File;
  }
  
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7rNi5CQBkl8y7eF9KtsO-Pc5XJpv44oCj23Idqcxhi2VaK2x87c2UYmJ44L52VNxV/exec";
  
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
  
      file: {
        name: data.file.name,
        mimeType: data.file.type,
        base64: base64
      }
    };
  
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
  
    return {
      success: true
    };
  }