
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DescriptionProps {
  text: string;
}

const Description = ({ text }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 300;
  const displayText = shouldTruncate && !isExpanded ? text.slice(0, 300) + '...' : text;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Om det här boendet</h2>
      <div className="text-muted-foreground leading-relaxed">
        {displayText}
        {shouldTruncate && (
          <Button 
            variant="link" 
            className="p-0 h-auto font-medium underline text-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? ' Visa mindre' : ' Visa mer'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Description;
