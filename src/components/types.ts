export interface Stay {
  id: number;
  title: string;
  description: string;
  price: number;
  priceType: string;
  imgUrl: string;
  rating: number;
  location: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
}

export interface Reservation {
  id: number;
  userId: string;
  stayId: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface MyReservation {
  id: number;
  stay_id: number;
  user_id: number;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_price: string; 
  status: string;
  created_at: string;
  updated_at: string;
  title: string;       
  location: string;    
  img_url: string;     
}
