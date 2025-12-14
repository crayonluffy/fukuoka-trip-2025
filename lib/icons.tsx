'use client';

import {
  Plane,
  Train,
  UtensilsCrossed,
  Hotel,
  Castle,
  TreePine,
  Ship,
  Landmark,
  ShoppingBag,
  Camera,
  MapPin,
  Footprints,
  Car,
} from 'lucide-react';

export const iconMap: Record<string, React.ReactNode> = {
  plane: <Plane className="w-5 h-5" />,
  train: <Train className="w-5 h-5" />,
  food: <UtensilsCrossed className="w-5 h-5" />,
  hotel: <Hotel className="w-5 h-5" />,
  castle: <Castle className="w-5 h-5" />,
  park: <TreePine className="w-5 h-5" />,
  boat: <Ship className="w-5 h-5" />,
  shrine: <Landmark className="w-5 h-5" />,
  shopping: <ShoppingBag className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  walk: <Footprints className="w-5 h-5" />,
  taxi: <Car className="w-5 h-5" />,
};

export const defaultIcon = <MapPin className="w-5 h-5" />;
