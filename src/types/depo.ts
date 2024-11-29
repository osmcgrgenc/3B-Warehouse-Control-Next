export interface Koli {
  id: string;
  name: string;
  color: string;
  content: string;
  weight: number;
  category: 'elektronik' | 'gıda' | 'kırılacak' | 'ağır' | 'diğer';
  createdAt: Date;
}

export interface Raf {
  id: string;
  position: [number, number, number];
  rotation: number;
  color: string;
  section: Section;
  level: 1 | 2 | 3;
  koli?: Koli;
}

export interface Section {
  id: 'A' | 'B' | 'C';
  name: string;
  description: string;
  maxCapacity: number;
} 