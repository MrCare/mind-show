'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import PublishedMindMapItem from './PublishedMindMapItem';

interface PublishedMindMapListProps {
  data: {
    id: number;
    address: string | null;
    createdAt: string;
    transactionHash: string | null;
  }[];
  onOpenMindMap: (id: number) => void;
}

const PublishedMindMapList: React.FC<PublishedMindMapListProps> = ({ data, onOpenMindMap }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <CheckCircle className="h-4 w-4" />
        Your Published Mind Maps
      </h3>
      {data && data.length > 0 ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {data.map((item) => (
            <PublishedMindMapItem 
              key={item.id} 
              item={item} 
              onOpenMindMap={onOpenMindMap}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No published mind maps yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PublishedMindMapList;
