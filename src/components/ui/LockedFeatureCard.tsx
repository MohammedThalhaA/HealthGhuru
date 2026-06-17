import React from 'react';
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface LockedFeatureCardProps {
  title: string;
  description: string;
  upgradeLink?: string;
  className?: string;
}

const LockedFeatureCard: React.FC<LockedFeatureCardProps> = ({
  title,
  description,
  upgradeLink = '/profile?tab=subscription',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-gray-50 border border-gray-200 rounded-2xl ${className}`}>
      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mb-4">
        <Lock className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4 max-w-md">{description}</p>
      <Link 
        href={upgradeLink}
        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
      >
        Upgrade to Pro →
      </Link>
    </div>
  );
};

export default LockedFeatureCard;
