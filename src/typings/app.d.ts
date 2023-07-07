import { Timestamp } from "firebase/firestore";

export interface MedicineType {
  product_id: string;
  application_id: string;
  class_id: string;
  product_register: string;
  product_date: string;
  product_name: string;
  product_brands: string;
  product_package: string;
  pendaftar: string;
  alamat_pendaftar: string;
  status: string;
  details: Details;
}

export interface Details {
  tanggal_terbit: string;
  diterbitkan_oleh: string;
  produk: string;
  bentuk_sediaan: string;
  komposisi: string[];
  merk: string;
  masa_berlaku: string;
}

export interface ScheduleType {
  id: string;
  title: string;
  description: string;
  time: Timestamp;
  isDone: boolean;
}
