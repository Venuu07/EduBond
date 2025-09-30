import React from "react";
// client/src/components/ExchangeCard.js
import { ArrowRightLeft } from 'lucide-react'; // A nice icon for the exchange

export default function ExchangeCard({ exchange }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-3">
          {/* Placeholder for user avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <span className="font-semibold text-gray-700">{exchange.user.name}</span>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-green-100 rounded">
            <p className="text-xs text-green-700 font-semibold">OFFERING</p>
            <p className="font-bold text-green-900">{exchange.skillOffered}</p>
          </div>
          
          <div className="flex justify-center">
            <ArrowRightLeft size={20} className="text-gray-400" />
          </div>
          
          <div className="p-2 bg-blue-100 rounded">
            <p className="text-xs text-blue-700 font-semibold">SEEKING</p>
            <p className="font-bold text-blue-900">{exchange.skillSought}</p>
          </div>
        </div>
      </div>
      <button className="mt-4 w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
}