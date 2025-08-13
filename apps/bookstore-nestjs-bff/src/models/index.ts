export interface ErrorMessage {
  message?: string;
  errors: ErrorDetail[];
  timestamp: string;
}

export interface ErrorDetail {
  reason: string;
  description: string;
  identifier?: string;
}

export interface Book {
  id: string;
  title: string;
  price?: number;
  onSale?: boolean;
  pageCount?: number;
  lastUpdated?: string;
  lastUpdatedBy?: string;
}

export interface BookCreate {
  title: string;
  onSale?: boolean;
  pageCount: number;
  price: number;
}

export interface BookUpdate {
  title: string;
  lastUpdated: number;
  onSale: boolean;
  pageCount: number;
  price: number;
}
