import React from 'react';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`rounded-lg border border-gray-200 bg-greyish text-gray-950 shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`flex space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 
      className={`text-xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`p-6 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default {
  Card,
  CardHeader,
  CardTitle,
  CardContent
};