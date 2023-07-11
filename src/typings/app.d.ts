import { Timestamp } from "firebase/firestore";

export interface MedicineType {
  PRODUCT_ID: string;
  APPLICATION_ID: string;
  CLASS_ID: string;
  PRODUCT_REGISTER: string;
  PRODUCT_DATE: string;
  PRODUCT_NAME: string;
  PRODUCT_BRANDS: string;
  PRODUCT_PACKAGE: string;
  PENDAFTAR: string;
  ALAMAT_PENDAFTAR: string;
  STATUS: string;
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
