
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  href: string;
}

const ContactCard = ({ icon: Icon, title, description, contact, href }: ContactCardProps) => {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="bg-pink-100 p-4 rounded-full mb-4">
          <Icon className="h-6 w-6 text-pink-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-sonic-600 mb-3">{description}</p>
        <a href={href} className="text-pink-600 hover:underline font-medium">
          {contact}
        </a>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
