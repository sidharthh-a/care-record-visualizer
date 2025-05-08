
import React from 'react';
import Layout from '../components/Layout';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
        <div className="mb-4 text-medical-blue/60">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xl font-medium mb-2">This functionality is coming soon</h2>
        <p className="text-gray-500">
          This section is currently under development. Please check back later!
        </p>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;
