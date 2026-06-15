'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
  distance: string;
  setDistance: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
}

export default function FilterSidebar({
  distance,
  setDistance,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
}: FilterSidebarProps) {
  return (
    <div className='w-full bg-white md:border md:border-gray-100 rounded-2xl md:p-5 text-left'>
      <h3 className='text-xs font-black text-gray-400 tracking-wider uppercase mb-5 hidden md:block'>
        Filter
      </h3>

      {/* Distance */}
      <div className='mb-6'>
        <h4 className='text-sm font-bold text-gray-800 mb-3.5'>Distance</h4>
        <div className='flex flex-col gap-3 text-xs font-medium text-gray-600'>
          {[
            { id: 'nearby', label: 'Nearby' },
            { id: '1km', label: 'Within 1 km' },
            { id: '3km', label: 'Within 3 km' },
            { id: '5km', label: 'Within 5 km' },
          ].map((opt) => (
            <label
              key={opt.id}
              className='flex items-center gap-3 cursor-pointer group select-none'
            >
              <input
                type='radio'
                name='distance'
                checked={distance === opt.id}
                onChange={() => setDistance(opt.id)}
                className='w-4 h-4 rounded-sm text-red-600 border-gray-300 focus:ring-red-500 accent-red-600'
              />
              <span className='group-hover:text-gray-900 transition-colors'>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className='border-gray-100 my-5' />

      {/* Price */}
      <div className='mb-6'>
        <h4 className='text-sm font-bold text-gray-800 mb-3.5'>Price</h4>
        <div className='flex flex-col gap-2.5'>
          <div className='flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-xs gap-2 focus-within:border-red-500 transition-colors'>
            <span className='text-gray-400 font-bold'>Rp</span>
            <input
              type='number'
              placeholder='Minimum Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='w-full bg-transparent p-0 border-none outline-none focus:ring-0 text-gray-800 font-medium'
            />
          </div>
          <div className='flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-xs gap-2 focus-within:border-red-500 transition-colors'>
            <span className='text-gray-400 font-bold'>Rp</span>
            <input
              type='number'
              placeholder='Maximum Price'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='w-full bg-transparent p-0 border-none outline-none focus:ring-0 text-gray-800 font-medium'
            />
          </div>
        </div>
      </div>

      <hr className='border-gray-100 my-5' />

      {/* Rating */}
      <div>
        <h4 className='text-sm font-bold text-gray-800 mb-3.5'>Rating</h4>
        <div className='flex flex-col gap-3 text-xs font-medium text-gray-600'>
          {[5, 4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className='flex items-center gap-3 cursor-pointer group select-none'
            >
              <input
                type='checkbox'
                checked={selectedRating === star}
                onChange={() =>
                  setSelectedRating(selectedRating === star ? null : star)
                }
                className='w-4 h-4 rounded-md text-red-600 border-gray-300 focus:ring-red-500 accent-red-600'
              />
              <span className='flex items-center gap-1 font-bold text-gray-700 group-hover:text-gray-900 transition-colors'>
                {star}{' '}
                <Star className='w-3.5 h-3.5 fill-amber-500 text-amber-500 stroke-amber-500' />
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
