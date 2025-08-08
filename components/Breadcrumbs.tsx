"use client";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (route: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  const handleClick = (href: string, current: boolean) => {
    if (current || !onNavigate) return;
    onNavigate(href);
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50/80 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.ol 
          className="flex items-center space-x-2 py-3 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" aria-hidden="true" />
              )}
              
              {item.current ? (
                <span 
                  className="text-gray-900 font-medium"
                  aria-current="page"
                  itemProp="name"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1 inline" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : (
                <motion.button
                  onClick={() => handleClick(item.href || '/', false)}
                  className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  itemProp="name"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                  {item.label}
                </motion.button>
              )}
              
              {item.href && (
                <meta itemProp="item" content={`https://trufflesmacedonia.com${item.href}`} />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </nav>
  );
}