import { NextResponse } from 'next/server';

// Interface untuk memastikan type safety tanpa menggunakan 'any'
interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  type: 'food' | 'drink';
}

interface ReviewItem {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface RestoDetail {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  logo: string;
  images: string[];
  menus: MenuItem[];
  reviews: ReviewItem[];
}

// Menggunakan tipe record yang spesifik, bukan 'any'
const restaurantDatabase: Record<string, RestoDetail> = {
  'burger-king': {
    id: 'burger-king',
    name: 'Burger King',
    rating: 4.9,
    reviewsCount: 24,
    location: 'Jakarta Selatan - 2.4 km',
    logo: '/Rectangle.png',
    images: [
      '/Image-detail.png',
      '/Image-detail2.png',
      '/Image-detail3.png',
      '/Image-detail4.png',
    ],
    menus: [
      {
        id: 1,
        name: 'Burger Premium',
        price: 50000,
        image: '/Detail-1.png',
        type: 'food',
      },
      {
        id: 2,
        name: 'Spaghetti Bolognese',
        price: 50000,
        image: '/Detail-2.png',
        type: 'food',
      },
      {
        id: 3,
        name: 'French Fries Extra Large',
        price: 50000,
        image: '/Detail-3.png',
        type: 'food',
      },
      {
        id: 4,
        name: 'Pizza',
        price: 50000,
        image: '/Detail-4.png',
        type: 'food',
      },
      {
        id: 5,
        name: 'Burger Chesse',
        price: 50000,
        image: '/Detail-5.png',
        type: 'food',
      },
      {
        id: 6,
        name: 'Coca Cola Fresh',
        price: 50000,
        image: '/Detail-6.png',
        type: 'drink',
      },
      {
        id: 7,
        name: 'Mocha Float',
        price: 50000,
        image: '/Detail-7.png',
        type: 'drink',
      },
      {
        id: 8,
        name: 'Hot Dog Premium',
        price: 50000,
        image: '/Detail-8.png',
        type: 'food',
      },
    ],
    reviews: [
      {
        id: 1,
        name: 'Michael Brown',
        date: '25 August 2025, 13:38',
        rating: 5,
        comment:
          'What a fantastic place! The food was delicious, and the ambiance was delightful. A must-visit for anyone looking for a great time!',
        avatar: '/Jhon doe.png',
      },
      {
        id: 2,
        name: 'Sarah Davis',
        date: '25 August 2025, 13:38',
        rating: 5,
        comment:
          "I can't say enough good things! The service was exceptional, and the menu had so many great options. Definitely a five-star experience!",
        avatar: '/Jhon doe.png',
      },
      {
        id: 3,
        name: 'David Wilson',
        date: '25 August 2025, 13:38',
        rating: 5,
        comment:
          'This place exceeded my expectations! The staff were welcoming, and the vibe was just right. I’ll be returning soon!',
        avatar: '/Jhon doe.png',
      },
      {
        id: 4,
        name: 'Emily Johnson',
        date: '25 August 2025, 13:38',
        rating: 5,
        comment:
          'Absolutely loved my visit! The staff were friendly and attentive, making sure everything was just right. Can’t wait to come back!',
        avatar: '/Jhon doe.png',
      },
      {
        id: 5,
        name: 'Jessica Taylor',
        date: '25 August 2025, 13:38',
        rating: 5,
        comment:
          'A wonderful experience overall! The food was exquisite, and the service was impeccable. Highly recommend for a special night out!',
        avatar: '/Jhon doe.png',
      },
      {
        id: 6,
        name: 'Alex Smith',
        date: '25 August 2025, 13:38',
        rating: 5,
        comment:
          'I had an amazing experience! The service was top-notch, and the atmosphere was perfect for a relaxing evening. Highly recommend!',
        avatar: '/Jhon doe.png',
      },
    ],
  },
};

// Named Export Handler untuk method GET (Sudah diperbarui menggunakan Async Params)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Menggunakan Promise untuk Next.js versi terbaru
) {
  try {
    // 1. Ambil ID restoran secara asynchronous menggunakan await
    const resolvedParams = await params;
    const restoId = resolvedParams.id;

    const currentResto = restaurantDatabase[restoId];

    // Jika id restoran tidak ditemukan di database mock
    if (!currentResto) {
      return NextResponse.json(
        { message: `Restoran dengan ID '${restoId}' tidak ditemukan` },
        { status: 404 }
      );
    }

    // 2. Ambil Query URL parameter (?limitMenu=X&limitReview=Y)
    const { searchParams } = new URL(request.url);
    const limitMenu = searchParams.get('limitMenu');
    const limitReview = searchParams.get('limitReview');

    // 3. Duplikat data dasar restoran agar data asli database tidak rusak
    const responseData = { ...currentResto };

    // 4. Lakukan filtrasi limit menu jika parameternya dikirim dari client
    if (limitMenu) {
      const limit = parseInt(limitMenu, 10);
      if (!isNaN(limit)) {
        responseData.menus = currentResto.menus.slice(0, limit);
      }
    }

    // 5. Lakukan filtrasi limit review jika parameternya dikirim dari client
    if (limitReview) {
      const limit = parseInt(limitReview, 10);
      if (!isNaN(limit)) {
        responseData.reviews = currentResto.reviews.slice(0, limit);
      }
    }

    // Kembalikan response JSON sukses ke client
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
