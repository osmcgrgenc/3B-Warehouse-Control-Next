'use client'

import { Section } from '../../types/depo'

interface BolumSecimiProps {
  sections: Section[];
  selectedSection: 'A' | 'B' | 'C';
  onSectionChange: (section: 'A' | 'B' | 'C') => void;
}

export function BolumSecimi({ sections, selectedSection, onSectionChange }: BolumSecimiProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Bölüm</label>
      <select 
        value={selectedSection}
        onChange={(e) => onSectionChange(e.target.value as 'A' | 'B' | 'C')}
        className="w-full p-2 border rounded"
      >
        {sections.map(section => (
          <option key={section.id} value={section.id}>
            {section.name}
          </option>
        ))}
      </select>
    </div>
  )
} 